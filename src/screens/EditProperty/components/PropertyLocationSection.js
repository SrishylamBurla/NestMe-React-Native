import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from "react-native";
import LeafletMapPicker from "../../../components/maps/LeafletMapPicker"
export default function PropertyLocationSection({
    form,
    updateField,
}) {
    const [region, setRegion] = useState({
        latitude: Number(form.lat) || 17.385,
        longitude: Number(form.lng) || 78.4867,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const updateLocation = (coordinate) => {
        updateField("lat", coordinate.latitude);
        updateField("lng", coordinate.longitude);

        setRegion({
            ...region,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
    };

    return (
        <View style={styles.card}>
            <Text style={styles.heading}>
                Property Location
            </Text>

            <Text style={styles.subtitle}>
                Select the exact location of your property.
            </Text>

            <LeafletMapPicker
                latitude={Number(form.lat) || 17.385}
                longitude={Number(form.lng) || 78.4867}
                onLocationSelect={({ lat, lng }) => {
                    updateField("lat", lat);
                    updateField("lng", lng);
                }}
            />
            <View style={styles.field}>
                <Text style={styles.label}>
                    Address
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={form.address}
                    onChangeText={(text) =>
                        updateField(
                            "address",
                            text
                        )
                    }
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>
                    City
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={form.city}
                    onChangeText={(text) =>
                        updateField("city", text)
                    }
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>
                    State
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="State"
                    value={form.state}
                    onChangeText={(text) =>
                        updateField("state", text)
                    }
                />
            </View>

            <View style={styles.row}>

                <View style={styles.half}>
                    <Text style={styles.label}>
                        Latitude
                    </Text>

                    <TextInput
                        editable={true}
                        value={String(form.lat)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.half}>
                    <Text style={styles.label}>
                        Longitude
                    </Text>

                    <TextInput
                        editable={true}
                        value={String(form.lng)}
                        style={styles.input}
                    />
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
        color: "#111827",
    },

    subtitle: {
        marginTop: 4,
        marginBottom: 18,
        color: "#64748B",
    },

    map: {
        height: 260,
        borderRadius: 16,
        marginBottom: 20,
    },

    field: {
        marginBottom: 16,
    },

    label: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: "600",
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
    }
    ,
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    half: {
        width: "48%",
    },
});