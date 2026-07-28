import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const furnishingTypes = [
  "none",
  "semi",
  "full",
];

const facingDirections = [
  "East",
  "West",
  "North",
  "South",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
];

export default function StepTwo({
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
      {/* PRICE */}

      <Text style={styles.heading}>
        Price (₹)
      </Text>



      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 12500000"
        placeholderTextColor="#94A3B8"
        value={String(form.priceValue)}
        onChangeText={(text) =>
          update("priceValue", text)
        }
      />

      <Text style={styles.heading}>
        Price Label
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 1.25Cr"
        placeholderTextColor="#94A3B8"
        value={String(form.priceLabel)}
        onChangeText={(text) =>
          update("priceLabel", text)
        }
      />

      {/* PRICE PER SQFT */}

      <Text style={styles.heading}>
        Price / Sq.Ft
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 6500"
        placeholderTextColor="#94A3B8"
        value={String(form.pricePerSqFt)}
        onChangeText={(text) =>
          update("pricePerSqFt", text)
        }
      />

      {/* AREA */}

      <Text style={styles.heading}>
        Area (Sq.Ft)
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 1800"
        placeholderTextColor="#94A3B8"
        value={String(form.areaSqFt)}
        onChangeText={(text) =>
          update("areaSqFt", text)
        }
      />

      {/* BEDS */}

      <Text style={styles.heading}>
        Bedrooms
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 3"
        placeholderTextColor="#94A3B8"
        value={String(form.beds)}
        onChangeText={(text) =>
          update("beds", text)
        }
      />

      {/* BATHS */}

      <Text style={styles.heading}>
        Bathrooms
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 2"
        placeholderTextColor="#94A3B8"
        value={String(form.baths)}
        onChangeText={(text) =>
          update("baths", text)
        }
      />

      {/* FURNISHING */}

      <Text style={styles.heading}>
        Furnishing
      </Text>

      <View style={styles.chips}>
        {furnishingTypes.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              form.furnishing === item &&
                styles.activeChip,
            ]}
            onPress={() =>
              update("furnishing", item)
            }
          >
            <Text
              style={[
                styles.chipText,
                form.furnishing === item &&
                  styles.activeChipText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FACING */}

      <Text style={styles.heading}>
        Facing Direction
      </Text>

      <View style={styles.chips}>
        {facingDirections.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              form.facing === item &&
                styles.activeChip,
            ]}
            onPress={() =>
              update("facing", item)
            }
          >
            <Text
              style={[
                styles.chipText,
                form.facing === item &&
                  styles.activeChipText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    paddingHorizontal: 18,

    fontSize: 16,
    color: "#111827",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    paddingHorizontal: 18,

    height: 42,

    borderRadius: 22,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F1F5F9",
  },

  activeChip: {
    backgroundColor: "#4F46E5",
  },

  chipText: {
    color: "#475569",
    fontWeight: "600",
  },

  activeChipText: {
    color: "#FFFFFF",
  },
});