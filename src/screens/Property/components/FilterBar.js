import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Picker } from "@react-native-picker/picker";

export default function FilterBar({
  filters,
  setFilters,
}) {
  return (
    <View style={styles.container}>
      {/* Search */}

      <View style={styles.inputContainer}>
        <Ionicons
          name="search"
          size={18}
          color="#64748B"
        />

        <TextInput
          placeholder="Search properties..."
          placeholderTextColor="#94A3B8"
          value={filters.q}
          onChangeText={(text) =>
            setFilters((prev) => ({
              ...prev,
              page: 1,
              q: text,
            }))
          }
          style={styles.input}
        />
      </View>

      {/* City + Sort */}

      <View style={styles.row}>
        {/* City */}

        <View style={[styles.inputContainer, styles.half]}>
          <Ionicons
            name="location-outline"
            size={18}
            color="#64748B"
          />

          <TextInput
            placeholder="City"
            placeholderTextColor="#94A3B8"
            value={filters.city}
            onChangeText={(text) =>
              setFilters((prev) => ({
                ...prev,
                page: 1,
                city: text,
              }))
            }
            style={styles.input}
          />
        </View>

        {/* Sort */}

        <View style={[styles.pickerContainer, styles.half]}>
          <Picker
            selectedValue={filters.sort}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                page: 1,
                sort: value,
              }))
            }
          >
            <Picker.Item label="Latest" value="latest" />
            <Picker.Item label="Oldest" value="oldest" />
            <Picker.Item label="Price ↑" value="priceHigh" />
            <Picker.Item label="Price ↓" value="priceLow" />
          </Picker>
        </View>
      </View>

      {/* Reset */}

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() =>
          setFilters({
            page: 1,
            limit: 12,
            q: "",
            city: "",
            sort: "latest",
            listingType: "",
            propertyType: "",
            beds: "",
            maxPrice: "",
          })
        }
      >
        <Ionicons
          name="refresh"
          size={18}
          color="#fff"
        />

        <Text style={styles.resetText}>
          Reset Filters
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F8FAFC",
  },
  row: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 14,
  marginTop: 10
},

half: {
  flex: 1,
},

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    paddingHorizontal: 14,

    elevation: 1,
  },

  input: {
    flex: 1,
    height: 48,
    marginLeft: 10,
    color: "#111827",
    fontSize: 15,
  },

  pickerContainer: {
    backgroundColor: "#FFFFFF",
    color: '#000',
    borderRadius: 14,
    marginLeft: 12,
    overflow: "hidden",
    elevation: 1,
  },

  resetButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: "#111827",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  resetText: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});