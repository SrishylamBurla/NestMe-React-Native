import React from "react";
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function PropertySubmitButton({
    title = "Save Property",
    loading = false,
    onPress,
    disabled = false,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            disabled={loading || disabled}
            onPress={onPress}
            style={[
                styles.button,
                (loading || disabled) && styles.disabledButton,
            ]}
        >
            {loading ? (
                <ActivityIndicator
                    color="#FFFFFF"
                    size="small"
                />
            ) : (
                <>
                    <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="#FFFFFF"
                    />

                    <Text style={styles.buttonText}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 16,
        marginVertical: 24,
        height: 56,
        borderRadius: 16,
        backgroundColor: "#2563EB",

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        elevation: 5,

        shadowColor: "#2563EB",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },

    disabledButton: {
        opacity: 0.65,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 10,
    },
});