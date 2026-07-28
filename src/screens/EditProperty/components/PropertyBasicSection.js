import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const PROPERTY_TYPES = [
    "apartment",
    "villa",
    "plot",
    "independent_house",
    "commercial",
];

const LISTING_TYPES = [
    "sale",
    "rent",
    "lease",
];

const PROPERTY_STATUS = [
    "available",
    "sold",
    "rented",
    "leased",
    "under_review",
];

export default function PropertyBasicSection({
    form,
    updateField,
}) {
    return (
        <View style={styles.card}>

            <Text style={styles.heading}>
                Basic Information
            </Text>

            <Text style={styles.subtitle}>
                Update your property's basic details.
            </Text>

            {/* Property Title */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Property Title
                </Text>

                <TextInput
                    value={form.title}
                    onChangeText={(text) =>
                        updateField("title", text)
                    }
                    placeholder="Luxury Villa in Hyderabad"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                />
            </View>

            {/* Property Type */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Property Type
                </Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        dropdownIconColor="#111827"
                        style={{
                            color: "#111827",
                            backgroundColor: "#FFFFFF",
                        }}
                        selectedValue={form.propertyType}
                        onValueChange={(value) =>
                            updateField(
                                "propertyType",
                                value
                            )
                        }
                    >
                        {PROPERTY_TYPES.map((item) => (
                            <Picker.Item
                                key={item}
                                label={item
                                    .replaceAll("_", " ")
                                    .replace(/\b\w/g, (c) =>
                                        c.toUpperCase()
                                    )}
                                value={item}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            {/* Description */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Description
                </Text>

                <TextInput
                    multiline
                    value={form.description}
                    onChangeText={(text) =>
                        updateField(
                            "description",
                            text
                        )
                    }
                    placeholder="Describe your property..."
                    placeholderTextColor="#94A3B8"
                    style={styles.textArea}
                    textAlignVertical="top"
                />
            </View>

            {/* Listing Type */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Listing Type
                </Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        dropdownIconColor="#111827"
                        style={{
                            color: "#111827",
                            backgroundColor: "#FFFFFF",
                        }}
                        selectedValue={form.listingType}
                        onValueChange={(value) =>
                            updateField(
                                "listingType",
                                value
                            )
                        }
                    >
                        {LISTING_TYPES.map((item) => (
                            <Picker.Item
                                key={item}
                                label={
                                    item === "sale"
                                        ? "For Sale"
                                        : item === "rent"
                                            ? "For Rent"
                                            : "For Lease"
                                }
                                value={item}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            {/* Listing Status */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Property Status
                </Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        dropdownIconColor="#111827"
                        style={{
                            color: "#111827",
                            backgroundColor: "#FFFFFF",
                        }}
                        selectedValue={form.listingStatus}
                        onValueChange={(value) =>
                            updateField(
                                "listingStatus",
                                value
                            )
                        }
                    >
                        {PROPERTY_STATUS.map((item) => (
                            <Picker.Item
                                key={item}
                                label={item
                                    .replaceAll("_", " ")
                                    .replace(/\b\w/g, (c) =>
                                        c.toUpperCase()
                                    )}
                                value={item}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 20,
        padding: 18,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },

    heading: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
    },

    subtitle: {
        marginTop: 4,
        marginBottom: 18,
        color: "#64748B",
        fontSize: 14,
    },

    field: {
        marginBottom: 18,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
        color: "#334155",
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
        color: "#0F172A",
        fontSize: 15,
    },

    textArea: {
        minHeight: 120,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingTop: 14,
        backgroundColor: "#FFFFFF",
        color: "#0F172A",
        fontSize: 15,
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },
});