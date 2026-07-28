import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { useRegisterMutation } from "../../services/authApi";

export default function RegisterScreen() {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [register, { isLoading }] =
        useRegisterMutation();

    const handleRegister = async () => {
        try {
            await register({
                name,
                email,
                password,
            }).unwrap();

            navigation.replace("Login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AuthLayout
            title="Create Your Nest"
            quote="Find the place where your story begins."
        >
            <View style={styles.form}>
                <AuthInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    icon="person-outline"
                    value={name}
                    onChangeText={setName}
                />

                <AuthInput
                    label="Email Address"
                    placeholder="Enter your email"
                    icon="mail-outline"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <AuthInput
                    label="Password"
                    placeholder="Create a password"
                    icon="lock-closed-outline"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <AuthButton
                    title="Create Account"
                    onPress={handleRegister}
                />

                <View style={styles.bottom}>
                    <Text style={styles.bottomText}>
                        Already have an account?
                    </Text>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Login")
                        }
                    >
                        <Text style={styles.login}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 5,
    },

    bottom: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    bottomText: {
        color: "#94A3B8",
        fontSize: 15,
    },

    login: {
        marginLeft: 6,
        color: "#60A5FA",
        fontWeight: "700",
        fontSize: 15,
    },
});