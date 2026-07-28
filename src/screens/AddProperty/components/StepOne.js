import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const listingTypes = [
  {
    label: "Sale",
    value: "sale",
  },
  {
    label: "Rent",
    value: "rent",
  },
  {
    label: "Lease",
    value: "lease",
  },
];

const propertyTypes = [
  "apartment",
  "villa",
  "plot",
  "commercial",
];

export default function StepOne({
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
      {/* LISTING TYPE */}

      <Text style={styles.heading}>
        Listing Type
      </Text>

      <View style={styles.row}>
        {listingTypes.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.chip,
              form.listingType === item.value &&
                styles.activeChip,
            ]}
            onPress={() =>
              update("listingType", item.value)
            }
          >
            <Text
              style={[
                styles.chipText,
                form.listingType === item.value &&
                  styles.activeChipText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PROPERTY TYPE */}

      <Text style={styles.heading}>
        Property Type
      </Text>

      <View style={styles.typesContainer}>
        {propertyTypes.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.typeChip,
              form.propertyType === item &&
                styles.activeTypeChip,
            ]}
            onPress={() =>
              update("propertyType", item)
            }
          >
            <Text
              style={[
                styles.typeText,
                form.propertyType === item &&
                  styles.activeTypeText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TITLE */}

      <Text style={styles.heading}>
        Property Title
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Luxury 3 BHK Apartment"
        placeholderTextColor="#94A3B8"
        value={form.title}
        onChangeText={(text) =>
          update("title", text)
        }
      />

      {/* DESCRIPTION */}

      <Text style={styles.heading}>
        Description
      </Text>

      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        placeholder="Describe your property..."
        placeholderTextColor="#94A3B8"
        value={form.description}
        onChangeText={(text) =>
          update("description", text)
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },

  heading: {
    marginTop: 22,
    marginBottom: 12,

    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  chip: {
    flex: 1,

    marginHorizontal: 4,

    height: 48,

    borderRadius: 14,

    backgroundColor: "#F1F5F9",

    justifyContent: "center",
    alignItems: "center",
  },

  activeChip: {
    backgroundColor: "#4F46E5",
  },

  chipText: {
    fontWeight: "600",
    color: "#475569",
  },

  activeChipText: {
    color: "#FFFFFF",
  },

  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  typeChip: {
    paddingHorizontal: 18,
    height: 42,

    borderRadius: 22,

    backgroundColor: "#F1F5F9",

    justifyContent: "center",
    alignItems: "center",
  },

  activeTypeChip: {
    backgroundColor: "#111827",
  },

  typeText: {
    color: "#475569",
    fontWeight: "600",
  },

  activeTypeText: {
    color: "#FFFFFF",
  },

  input: {
    height: 56,

    borderRadius: 16,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E2E8F0",

    paddingHorizontal: 18,

    fontSize: 16,
    color: "#111827",
  },

  textArea: {
    minHeight: 140,

    borderRadius: 16,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E2E8F0",

    paddingHorizontal: 18,
    paddingTop: 16,

    fontSize: 16,
    color: "#111827",
  },
});