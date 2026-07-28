import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const FURNISHING_OPTIONS = [
    "unfurnished",
    "semi-furnished",
    "fully-furnished",
];

const FACING_OPTIONS = [
    "North",
    "South",
    "East",
    "West",
    "North-East",
    "North-West",
    "South-East",
    "South-West",
];

const AMENITIES = [
    "Lift",
    "Parking",
    "Power Backup",
    "Gym",
    "Swimming Pool",
    "Club House",
    "Children Play Area",
    "Security",
    "CCTV",
    "Garden",
    "Visitor Parking",
    "Internet",
    "Gas Pipeline",
    "Water Supply",
    "Balcony",
    "Air Conditioning",
    "Pet Friendly",
    "Fire Safety",
];

export default function PropertyAmenitiesSection({
    form,
    updateField,
}) {
    const toggleAmenity = (amenity) => {
        const exists = form.amenities.includes(amenity);

        if (exists) {
            updateField(
                "amenities",
                form.amenities.filter(
                    (item) => item !== amenity
                )
            );
        } else {
            updateField("amenities", [
                ...form.amenities,
                amenity,
            ]);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.heading}>
                Amenities & Details
            </Text>

            <Text style={styles.subtitle}>
                Add furnishing details and available amenities.
            </Text>

            {/* Furnishing */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Furnishing
                </Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        dropdownIconColor="#111827"
                        style={{
                            color: "#111827",
                            backgroundColor: "#FFFFFF",
                        }}
                        selectedValue={form.furnishing}
                        onValueChange={(value) =>
                            updateField(
                                "furnishing",
                                value
                            )
                        }
                    >
                        {FURNISHING_OPTIONS.map(
                            (item) => (
                                <Picker.Item
                                    key={item}
                                    value={item}
                                    label={item
                                        .replaceAll("-", " ")
                                        .replace(
                                            /\b\w/g,
                                            (c) =>
                                                c.toUpperCase()
                                        )}
                                />
                            )
                        )}
                    </Picker>
                </View>
            </View>

            {/* Facing */}

            <View style={styles.field}>
                <Text style={styles.label}>
                    Facing
                </Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        dropdownIconColor="#111827"
                        style={{
                            color: "#111827",
                            backgroundColor: "#FFFFFF",
                        }}
                        selectedValue={form.facing}
                        onValueChange={(value) =>
                            updateField(
                                "facing",
                                value
                            )
                        }
                    >
                        <Picker.Item
                            label="Select Facing"
                            value=""
                        />

                        {FACING_OPTIONS.map(
                            (item) => (
                                <Picker.Item
                                    key={item}
                                    value={item}
                                    label={item}
                                />
                            )
                        )}
                    </Picker>
                </View>
            </View>

            {/* Amenities */}

            <Text style={styles.label}>
                Amenities
            </Text>

            <View style={styles.chipsContainer}>
                {AMENITIES.map((item) => {
                    const selected =
                        form.amenities.includes(item);

                    return (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.chip,
                                selected &&
                                styles.selectedChip,
                            ]}
                            onPress={() =>
                                toggleAmenity(item)
                            }
                        >
                            <Text
                                style={[
                                    styles.chipText,
                                    selected &&
                                    styles.selectedChipText,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
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
        elevation: 3,
    },

    heading: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
    },

    subtitle: {
        marginTop: 4,
        marginBottom: 20,
        color: "#64748B",
        fontSize: 14,
    },

    field: {
        marginBottom: 18,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
        marginBottom: 8,
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },

    chipsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    chip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: "#F8FAFC",
    },

    selectedChip: {
        backgroundColor: "#2563EB",
        borderColor: "#2563EB",
    },

    chipText: {
        color: "#475569",
        fontWeight: "600",
        fontSize: 13,
    },

    selectedChipText: {
        color: "#FFFFFF",
    },
});