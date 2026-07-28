import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

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

export default function PropertyPricingSection({
    form,
    updateField,
}) {
    return (
        <View style={styles.card}>

            <Text style={styles.heading}>
                Pricing & Specifications
            </Text>

            <Text style={styles.subtitle}>
                Property pricing and specifications.
            </Text>

            {/* Price Label */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Price Label
                </Text>

                <TextInput
                    value={form.priceLabel}
                    onChangeText={(text) =>
                        updateField("priceLabel", text)
                    }
                    placeholder="₹ 1.25 Cr"
                    style={styles.input}
                />
            </View>

            {/* Price Value */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Price Value
                </Text>

                <TextInput
                    value={String(form.priceValue)}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                        updateField("priceValue", text)
                    }
                    placeholder="12500000"
                    style={styles.input}
                />
            </View>

            {/* Price Per SqFt */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Price Per SqFt
                </Text>

                <TextInput
                    value={String(form.pricePerSqFt)}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                        updateField("pricePerSqFt", text)
                    }
                    placeholder="8500"
                    placeholderTextColor={"#000"}
                    style={styles.input}
                />
            </View>

            {/* Beds */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Bedrooms
                </Text>

                <TextInput
                    value={String(form.beds)}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                        updateField("beds", text)
                    }
                    placeholder="2"
                    style={styles.input}
                />
            </View>

            {/* Baths */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Bathrooms
                </Text>

                <TextInput
                    value={String(form.baths)}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                        updateField("baths", text)
                    }
                    placeholder="2"
                    style={styles.input}
                />
            </View>

            {/* Area */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Area (SqFt)
                </Text>

                <TextInput
                    value={String(form.areaSqFt)}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                        updateField("areaSqFt", text)
                    }
                    placeholder="1500"
                    style={styles.input}
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
                            updateField("listingType", value)
                        }
                    >
                        {LISTING_TYPES.map((item) => (
                            <Picker.Item
                                key={item}
                                value={item}
                                label={
                                    item === "sale"
                                        ? "For Sale"
                                        : item === "rent"
                                            ? "For Rent"
                                            : "For Lease"
                                }
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            {/* Property Status */}

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
                            updateField("listingStatus", value)
                        }
                    >
                        {PROPERTY_STATUS.map((item) => (
                            <Picker.Item
                                key={item}
                                value={item}
                                label={item
                                    .replaceAll("_", " ")
                                    .replace(/\b\w/g, c =>
                                        c.toUpperCase()
                                    )}
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
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 20,
        padding: 18,
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
        height: 54,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 16,
        paddingHorizontal: 16,

        backgroundColor: "#FFFFFF",

        color: "#111827",

        fontSize: 16,

        includeFontPadding: false,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#fff",
    },
});