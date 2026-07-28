import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

const steps = [
    "Basic",
    "Details",
    "Location",
    "Images",
    "Preview",
];

export default function StepIndicator({
    step,
}) {

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* HEADER */}

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color="#111827"
                    />
                </TouchableOpacity>

                <View>
                    <Text style={styles.title}>
                        Post Property
                    </Text>

                    <Text style={styles.subtitle}>
                        Step {step} of {steps.length}
                    </Text>
                </View>
            </View>

            {/* PROGRESS BAR */}

            <View style={styles.progressContainer}>
                <View style={styles.progressBackground} />

                <View
                    style={[
                        styles.progressFill,
                        {
                            width: `${((step - 1) /
                                (steps.length - 1)) *
                                100
                                }%`,
                        },
                    ]}
                />
            </View>

            {/* STEPS */}

            <View style={styles.stepsRow}>
                {steps.map((label, index) => {
                    const active =
                        index + 1 <= step;

                    return (
                        <View
                            key={label}
                            style={styles.stepWrapper}
                        >
                            <View
                                style={[
                                    styles.circle,
                                    active &&
                                    styles.activeCircle,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.circleText,
                                        active &&
                                        styles.activeCircleText,
                                    ]}
                                >
                                    {index + 1}
                                </Text>
                            </View>

                            <Text
                                style={[
                                    styles.label,
                                    active &&
                                    styles.activeLabel,
                                ]}
                            >
                                {label}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",

        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 22,

        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: "#64748B",
    },

    progressContainer: {
        marginTop: 22,
        marginBottom: 20,
        position: "relative",
        height: 6,
    },

    progressBackground: {
        height: 6,
        borderRadius: 10,
        backgroundColor: "#E5E7EB",
    },

    progressFill: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,

        borderRadius: 10,

        backgroundColor: "#4F46E5",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#F3F4F6",

        justifyContent: "center",
        alignItems: "center",

        marginRight: 14,
    },

    stepsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    stepWrapper: {
        alignItems: "center",
        width: 60,
    },

    circle: {
        width: 36,
        height: 36,

        borderRadius: 18,

        backgroundColor: "#E5E7EB",

        justifyContent: "center",
        alignItems: "center",
    },

    activeCircle: {
        backgroundColor: "#4F46E5",
    },

    circleText: {
        color: "#64748B",
        fontWeight: "700",
    },

    activeCircleText: {
        color: "#FFFFFF",
    },

    label: {
        marginTop: 8,
        fontSize: 12,
        textAlign: "center",
        color: "#94A3B8",
        fontWeight: "600",
    },

    activeLabel: {
        color: "#111827",
        fontWeight: "700",
    },
});