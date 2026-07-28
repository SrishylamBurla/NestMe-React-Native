import React, {
    useEffect,
    useRef,
    useState,
    useCallback
} from "react";

import { useFocusEffect } from "@react-navigation/native";

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from "react-native";

import SupportHeader from "../../screens/support/components/SupportHeader"
// import ChatBubble from "../../screens/support/components/ChatBubble";
import ChatBubble from "../../components/admin/ChatBubble"
import ChatInput from "../../screens/support/components/ChatInput";

import {
    useGetAdminSupportTicketQuery,
    useReplyAdminSupportTicketMutation,
    useAssignSupportTicketMutation,
    useUpdateSupportStatusMutation,
} from "../../services/supportApi";

const STATUS_OPTIONS = [
    "open",
    "waiting",
    "resolved",
    "closed",
];

const AdminSupportChatScreen = ({
    navigation,
    route,
}) => {
    const { ticketId } = route.params;

    const flatListRef = useRef(null);

    const [message, setMessage] = useState("");

    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useGetAdminSupportTicketQuery(ticketId);

    const [
        replyTicket,
        { isLoading: sending },
    ] = useReplyAdminSupportTicketMutation();

    const [assignTicket] =
        useAssignSupportTicketMutation();

    const [updateStatus] =
        useUpdateSupportStatusMutation();

    const ticket = data?.ticket;

    const messages = data?.messages || [];

    useEffect(() => {
        if (messages.length) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({
                    animated: true,
                });
            }, 150);
        }
    }, [messages]);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    const sendHandler = async () => {
        if (!message.trim()) return;

        try {
            await replyTicket({
                ticketId,
                message,
            }).unwrap();

            setMessage("");

            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    const assignHandler = async () => {
        try {
            await assignTicket(ticketId).unwrap();
            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    const changeStatus = async (status) => {
        try {
            await updateStatus({
                ticketId,
                status,
            }).unwrap();

            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading || isFetching) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
                    color="#5B3DF5"
                />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : "height"
            }
            keyboardVerticalOffset={0}
        >
            <View style={styles.container}>
                <SupportHeader
                    title={ticket?.subject || "Support Ticket"}
                    subtitle={ticket?.status}
                    showBack
                    onBackPress={() =>
                        navigation.goBack()
                    }
                />

                <View style={styles.ticketCard}>
                    <Text style={styles.ticketNumber}>
                        {ticket?.ticketNumber}
                    </Text>

                    <Text style={styles.subject}>
                        {ticket?.subject}
                    </Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Customer
                        </Text>

                        <Text style={styles.value}>
                            {ticket?.user?.name}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Role
                        </Text>

                        <Text style={styles.value}>
                            {ticket?.user?.role?.toUpperCase()}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Priority
                        </Text>

                        <Text style={styles.priority}>
                            {ticket?.priority}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Status
                        </Text>

                        <Text style={styles.status}>
                            {ticket?.status}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Assigned
                        </Text>

                        <Text style={styles.value}>
                            {ticket?.assignedTo
                                ? ticket.assignedTo.name
                                : "Unassigned"}
                        </Text>
                    </View>

                    {!ticket?.assignedTo && (
                        <TouchableOpacity
                            style={styles.assignButton}
                            onPress={assignHandler}
                        >
                            <Text style={styles.assignText}>
                                Assign To Me
                            </Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.statusContainer}>
                        {STATUS_OPTIONS.map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[
                                    styles.statusButton,
                                    ticket?.status === status &&
                                    styles.activeStatus,
                                ]}
                                onPress={() =>
                                    changeStatus(status)
                                }
                            >
                                <Text
                                    style={[
                                        styles.statusButtonText,
                                        ticket?.status === status &&
                                        styles.activeStatusText,
                                    ]}
                                >
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={flatListRef}
                        style={{ flex: 1 }}
                        data={messages}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <ChatBubble message={item} />
                        )}
                        contentContainerStyle={{
                            flexGrow: 1,
                            padding: 18,
                            paddingBottom: 20,
                        }}
                        keyboardShouldPersistTaps="handled"
                        onRefresh={refetch}
                        refreshing={false}
                        showsVerticalScrollIndicator={false}
                    />

                    <ChatInput
                        value={message}
                        onChangeText={setMessage}
                        onSend={sendHandler}
                        loading={sending}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AdminSupportChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F7FC",
    },

    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    ticketCard: {
        margin: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 18,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
    },

    ticketNumber: {
        fontSize: 18,
        fontWeight: "700",
        color: "#5B3DF5",
        marginBottom: 5,
    },

    subject: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 16,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    label: {
        fontSize: 14,
        color: "#64748B",
        fontWeight: "600",
    },

    value: {
        fontSize: 14,
        color: "#0F172A",
        fontWeight: "600",
    },

    priority: {
        color: "#EF4444",
        fontWeight: "700",
        fontSize: 14,
        textTransform: "capitalize",
    },

    status: {
        color: "#16A34A",
        fontWeight: "700",
        fontSize: 14,
        textTransform: "capitalize",
    },

    assignButton: {
        marginTop: 16,
        backgroundColor: "#5B3DF5",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },

    assignText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15,
    },

    statusContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 16,
        gap: 8,
    },

    statusButton: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: "#EEF2FF",
        marginBottom: 8,
    },

    activeStatus: {
        backgroundColor: "#5B3DF5",
    },

    statusButtonText: {
        color: "#5B3DF5",
        fontWeight: "600",
        textTransform: "capitalize",
    },

    activeStatusText: {
        color: "#FFFFFF",
    },
});