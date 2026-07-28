import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    Image,
    ActivityIndicator,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

import {
    launchImageLibrary,
} from "react-native-image-picker";

import {
    useGetMeQuery,
} from "../../services/authApi";

import {
    useUpdateProfileMutation,
    useUpdateAvatarMutation
} from "../../services/userApi";

export default function EditProfileScreen() {
    const navigation = useNavigation();

    /* ================= USER ================= */

    const {
        data,
        isLoading,
        refetch,
    } = useGetMeQuery();

    const user = data?.user;


    const [
        updateAvatar,
        {
            isLoading: avatarLoading,
        },
    ] = useUpdateAvatarMutation();
    /* ================= UPDATE ================= */

    const [
        updateProfile,
        {
            isLoading: updating,
        },
    ] = useUpdateProfileMutation();

    /* ================= FORM ================= */

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            phone: "",
        });

    const pickAvatar = async () => {
        const result =
            await launchImageLibrary({
                mediaType: "photo",
                quality: 0.8,
            });

        if (
            result.didCancel ||
            !result.assets?.length
        )
            return;

        const image = result.assets[0];

        const form = new FormData();

        form.append("avatar", {
            uri: image.uri,
            name:
                image.fileName ||
                "avatar.jpg",
            type:
                image.type ||
                "image/jpeg",
        });

        try {
            await updateAvatar(
                form
            ).unwrap();

            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!user) return;

        setForm({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
        });
    }, [user]);

    /* ================= AVATAR ================= */

    const avatar =
        user?.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
        )}&background=4F46E5&color=fff`;

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator
                    size="large"
                    color="#4F46E5"
                />

                <Text
                    style={styles.loadingText}
                >
                    Loading profile...
                </Text>
            </View>
        );
    }

    return (
        <>
            <StatusBar
                backgroundColor="#0F172A"
                barStyle="light-content"
            />

            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={
                        false
                    }
                    contentContainerStyle={{
                        paddingBottom: 50,
                    }}
                >
                    {/* ================= HEADER ================= */}

                    <View style={styles.header}>
                        <TouchableOpacity
                            style={
                                styles.backButton
                            }
                            onPress={() =>
                                navigation.goBack()
                            }
                        >
                            <Ionicons
                                name="chevron-back"
                                size={22}
                                color="#fff"
                            />
                        </TouchableOpacity>

                        <Text
                            style={
                                styles.headerTitle
                            }
                        >
                            Edit Profile
                        </Text>

                        <View
                            style={{
                                width: 42,
                            }}
                        />
                    </View>

                    {/* ================= PROFILE ================= */}

                    <View
                        style={
                            styles.profileCard
                        }
                    >
                        <Image
                            source={{
                                uri: avatar,
                            }}
                            style={
                                styles.avatar
                            }
                        />

                        <TouchableOpacity
                            style={styles.changeAvatarButton}
                            onPress={pickAvatar}
                        >
                            <Ionicons
                                name="camera"
                                size={18}
                                color="#fff"
                            />

                            <Text
                                style={
                                    styles.changeAvatarText
                                }
                            >
                                Change Photo
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* ================= FORM ================= */}

                    <View style={styles.form}>
                        {/* NAME */}

                        <Text
                            style={
                                styles.label
                            }
                        >
                            Full Name
                        </Text>

                        <View
                            style={
                                styles.inputContainer
                            }
                        >
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color="#64748B"
                            />

                            <TextInput
                                value={form.name}
                                onChangeText={(
                                    text
                                ) =>
                                    setForm({
                                        ...form,
                                        name: text,
                                    })
                                }
                                placeholder="Enter your name"
                                style={
                                    styles.input
                                }
                            />
                        </View>

                        {/* EMAIL */}

                        <Text
                            style={
                                styles.label
                            }
                        >
                            Email Address
                        </Text>

                        <View
                            style={
                                styles.inputContainer
                            }
                        >
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color="#64748B"
                            />

                            <TextInput
                                value={form.email}
                                onChangeText={(
                                    text
                                ) =>
                                    setForm({
                                        ...form,
                                        email: text,
                                    })
                                }
                                placeholder="Email address"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={
                                    styles.input
                                }
                            />
                        </View>

                        {/* PHONE */}

                        <Text
                            style={
                                styles.label
                            }
                        >
                            Phone Number
                        </Text>

                        <View
                            style={
                                styles.inputContainer
                            }
                        >
                            <Ionicons
                                name="call-outline"
                                size={20}
                                color="#64748B"
                            />

                            <TextInput
                                value={form.phone}
                                onChangeText={(
                                    text
                                ) =>
                                    setForm({
                                        ...form,
                                        phone: text,
                                    })
                                }
                                keyboardType="phone-pad"
                                placeholder="Phone number"
                                style={
                                    styles.input
                                }
                            />
                        </View>

                        {/* Continue with Part 2 */}


                        {/* ================= SAVE BUTTON ================= */}

                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                updating &&
                                styles.saveButtonDisabled,
                            ]}
                            disabled={updating}
                            onPress={async () => {
                                try {
                                    await updateProfile({
                                        name: form.name.trim(),
                                        email: form.email.trim(),
                                        phone: form.phone.trim(),
                                    }).unwrap();

                                    await refetch();

                                    navigation.goBack();
                                } catch (err) {
                                    console.log(err);
                                }
                            }}
                        >
                            {updating ? (
                                <ActivityIndicator
                                    color="#FFFFFF"
                                />
                            ) : (
                                <>
                                    <Ionicons
                                        name="save-outline"
                                        size={20}
                                        color="#FFFFFF"
                                    />

                                    <Text
                                        style={
                                            styles.saveButtonText
                                        }
                                    >
                                        Save Changes
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>

                        {/* ================= ACCOUNT INFO ================= */}

                        <View
                            style={styles.infoCard}
                        >
                            <Text
                                style={styles.infoTitle}
                            >
                                Account Information
                            </Text>

                            <View
                                style={styles.infoRow}
                            >
                                <Ionicons
                                    name="shield-checkmark"
                                    size={20}
                                    color="#4F46E5"
                                />

                                <Text
                                    style={styles.infoLabel}
                                >
                                    Role
                                </Text>

                                <Text
                                    style={styles.infoValue}
                                >
                                    {user?.role
                                        ?.charAt(0)
                                        .toUpperCase() +
                                        user?.role?.slice(
                                            1
                                        )}
                                </Text>
                            </View>

                            <View
                                style={styles.infoDivider}
                            />

                            <View
                                style={styles.infoRow}
                            >
                                <Ionicons
                                    name="checkmark-circle"
                                    size={20}
                                    color={
                                        user?.isVerified
                                            ? "#10B981"
                                            : "#F59E0B"
                                    }
                                />

                                <Text
                                    style={styles.infoLabel}
                                >
                                    Verification
                                </Text>

                                <Text
                                    style={styles.infoValue}
                                >
                                    {user?.isVerified
                                        ? "Verified"
                                        : "Not Verified"}
                                </Text>
                            </View>

                            <View
                                style={styles.infoDivider}
                            />

                            <View
                                style={styles.infoRow}
                            >
                                <Ionicons
                                    name="business-outline"
                                    size={20}
                                    color="#4F46E5"
                                />

                                <Text
                                    style={styles.infoLabel}
                                >
                                    Properties
                                </Text>

                                <Text
                                    style={styles.infoValue}
                                >
                                    {user?.propertiesPosted ||
                                        0}
                                </Text>
                            </View>

                            <View
                                style={styles.infoDivider}
                            />

                            <View
                                style={styles.infoRow}
                            >
                                <Ionicons
                                    name="calendar-outline"
                                    size={20}
                                    color="#4F46E5"
                                />

                                <Text
                                    style={styles.infoLabel}
                                >
                                    Joined
                                </Text>

                                <Text
                                    style={styles.infoValue}
                                >
                                    {user?.createdAt
                                        ? new Date(
                                            user.createdAt
                                        ).toLocaleDateString()
                                        : "--"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
    },

    loadingText: {
        marginTop: 14,
        color: "#64748B",
        fontSize: 15,
    },

    /* ================= HEADER ================= */

    header: {
        backgroundColor: "#0F172A",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingTop: StatusBar.currentHeight || 0,
        paddingBottom: 18,
        paddingHorizontal: 18,
    },

    backButton: {
        width: 42,
        height: 42,

        borderRadius: 21,

        backgroundColor: "rgba(255,255,255,0.12)",

        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "700",
    },

    /* ================= PROFILE ================= */

    profileCard: {
        alignItems: "center",

        marginHorizontal: 18,
        marginTop: 24,

        backgroundColor: "#FFFFFF",

        borderRadius: 24,

        paddingVertical: 28,

        elevation: 6,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 14,
        shadowOffset: {
            width: 0,
            height: 6,
        },
    },

    avatar: {
        width: 120,
        height: 120,

        borderRadius: 60,

        borderWidth: 4,
        borderColor: "#EEF2FF",
    },

    changeAvatarButton: {
        marginTop: 18,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#4F46E5",

        paddingHorizontal: 18,
        paddingVertical: 10,

        borderRadius: 22,
    },

    changeAvatarText: {
        color: "#FFFFFF",

        fontWeight: "700",

        marginLeft: 8,
    },

    /* ================= FORM ================= */

    form: {
        marginTop: 22,
        paddingHorizontal: 18,
    },

    label: {
        marginBottom: 8,
        marginTop: 18,

        color: "#334155",

        fontWeight: "700",

        fontSize: 14,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        borderRadius: 16,

        paddingHorizontal: 16,

        height: 56,

        elevation: 2,

        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 8,
    },

    input: {
        flex: 1,

        marginLeft: 12,

        fontSize: 15,

        color: "#111827",
    },

    /* ================= SAVE ================= */

    saveButton: {
        marginTop: 30,

        height: 56,

        borderRadius: 16,

        backgroundColor: "#4F46E5",

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        elevation: 4,
    },

    saveButtonDisabled: {
        opacity: 0.7,
    },

    saveButtonText: {
        marginLeft: 10,

        color: "#FFFFFF",

        fontWeight: "700",

        fontSize: 16,
    },

    /* ================= INFO CARD ================= */

    infoCard: {
        marginTop: 28,

        backgroundColor: "#FFFFFF",

        borderRadius: 22,

        padding: 20,

        marginBottom: 30,

        elevation: 3,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },

    infoTitle: {
        fontSize: 18,

        fontWeight: "700",

        color: "#111827",

        marginBottom: 20,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",

        paddingVertical: 10,
    },

    infoLabel: {
        flex: 1,

        marginLeft: 12,

        fontSize: 15,

        color: "#334155",
    },

    infoValue: {
        color: "#111827",

        fontWeight: "700",

        fontSize: 15,
    },

    infoDivider: {
        height: 1,

        backgroundColor: "#E5E7EB",

        marginVertical: 4,
    },
});