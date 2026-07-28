import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";


export default function PropertyAgent({
    property,
    onEnquiry,
}) {
    const agent = property?.agent;
    const owner = property?.owner;

    const navigation = useNavigation();
    const openProfile = () => {
        const owner = property.owner;

        if (!owner) return;

        if (owner.role === "agent") {
            navigation.navigate("AgentProfile", {
                agentId: owner._id,
            });
        } else {
            navigation.navigate("UserProfile", {
                userId: owner._id,
            });
        }
    };
    const isAgentListing = !!agent;

    const personName =
        agent?.user?.name ||
        owner?.name ||
        "Unknown";

    const phone =
        agent?.phone ||
        agent?.user?.phone ||
        owner?.phone ||
        "";

    return (

        <View style={styles.container}>
            <Text style={styles.heading}>
                Contact
            </Text>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={openProfile}
            >
                <View style={styles.card}>
                    {/* Avatar */}

                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {personName.charAt(0).toUpperCase()}
                        </Text>
                    </View>

                    {/* Details */}

                    <View style={styles.info}>
                        <Text style={styles.name}>
                            {personName}
                        </Text>

                        <Text style={styles.role}>
                            {isAgentListing
                                ? "Verified Agent"
                                : "Property Owner"}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 18,
        marginTop: 28,
    },

    heading: {
        fontSize: 22,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 16,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        borderRadius: 22,

        padding: 18,

        elevation: 3,
    },

    avatar: {
        width: 64,
        height: 64,

        borderRadius: 32,

        backgroundColor: "#4F46E5",

        justifyContent: "center",
        alignItems: "center",
    },

    avatarText: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "700",
    },

    info: {
        marginLeft: 16,
        flex: 1,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },

    role: {
        marginTop: 4,
        color: "#64748B",
        fontSize: 14,
    },

    actions: {
        flexDirection: "row",
        marginTop: 18,
        justifyContent: "space-between",
    },

    callButton: {
        flex: 1,
        marginRight: 8,

        backgroundColor: "#111827",

        height: 48,

        borderRadius: 14,

        justifyContent: "center",
        alignItems: "center",

        flexDirection: "row",
    },

    whatsappButton: {
        flex: 1,
        marginHorizontal: 4,

        backgroundColor: "#22C55E",

        height: 48,

        borderRadius: 14,

        justifyContent: "center",
        alignItems: "center",

        flexDirection: "row",
    },

    enquiryButton: {
        flex: 1,
        marginLeft: 8,

        backgroundColor: "#4F46E5",

        height: 48,

        borderRadius: 14,

        justifyContent: "center",
        alignItems: "center",

        flexDirection: "row",
    },

    actionText: {
        color: "#fff",
        fontWeight: "700",
        marginLeft: 6,
    },
});