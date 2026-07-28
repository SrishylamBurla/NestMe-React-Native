import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import LeafletMapPicker from "../../../components/maps/LeafletMapPicker";

export default function StepThree({
  form,
  setForm,
}) {
  const update = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* ADDRESS */}

      <Text style={styles.heading}>
        Property Address
      </Text>

      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        placeholder="Enter complete address"
        placeholderTextColor="#94A3B8"
        value={form.address}
        onChangeText={(text) =>
          update("address", text)
        }
      />

      {/* CITY */}

      <Text style={styles.heading}>
        City
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Hyderabad"
        placeholderTextColor="#94A3B8"
        value={form.city}
        onChangeText={(text) =>
          update("city", text)
        }
      />

      {/* STATE */}

      <Text style={styles.heading}>
        State
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Telangana"
        placeholderTextColor="#94A3B8"
        value={form.state}
        onChangeText={(text) =>
          update("state", text)
        }
      />

      <Text style={styles.heading}>
        Pin Property Location
      </Text>

      <LeafletMapPicker
        latitude={Number(form.lat) || 17.385}
        longitude={Number(form.lng) || 78.4867}
        onLocationSelect={({ lat, lng }) => {
          update("lat", lat);
          update("lng", lng);
        }}
      />

      {/* LATITUDE */}
      <Text style={styles.heading}>
        Latitude
      </Text>

      <TextInput
        style={styles.input}
           placeholder="78.333"
        placeholderTextColor="#94A3B8"
        editable={false}
        value={String(form.lat || "")}
      />

      {/* LONGITUDE */}

      <Text style={styles.heading}>
        Longitude
      </Text>

      <TextInput
        style={styles.input}
        placeholder="78.333"
        placeholderTextColor="#94A3B8"
        editable={false}
        value={String(form.lng || "")}
      />

      {/* GPS BUTTON */}

      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => {
          // We'll implement GPS in the next step
        }}
      >
        <Text style={styles.locationText}>
          📍 Use Current Location
        </Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        You can manually enter the coordinates or
        use your current location.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },

  heading: {
    marginTop: 22,
    marginBottom: 10,

    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  input: {
    height: 56,

    borderRadius: 16,

    backgroundColor: "#FFFFFF",
    color: "#000",
    borderWidth: 1,
    borderColor: "#E2E8F0",

    paddingHorizontal: 18,

    fontSize: 16,
    color: "#111827",
  },

  textArea: {
    minHeight: 120,

    borderRadius: 16,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E2E8F0",

    paddingHorizontal: 18,
    paddingTop: 16,

    fontSize: 16,
    color: "#111827",
  },

  locationButton: {
    marginTop: 28,

    height: 56,

    borderRadius: 16,

    backgroundColor: "#4F46E5",

    justifyContent: "center",
    alignItems: "center",
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  info: {
    marginTop: 12,
    textAlign: "center",
    color: "#64748B",
    lineHeight: 22,
    fontSize: 14,
  },
});