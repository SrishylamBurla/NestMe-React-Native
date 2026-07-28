import React, {
  useMemo,
  useCallback,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BottomSheet, {
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

export default function FilterBottomSheet({
  sheetRef,
  filters,
  setFilters,
  onApply,
  onReset,
}) {
  const snapPoints = useMemo(
    () => ["70%"],
    []
  );

  const propertyTypes = [
    "apartment",
    "villa",
    "plot",
    "commercial",
  ];

  const bedrooms = [1, 2, 3, 4];

  const toggleBedroom = useCallback(
    (bed) => {
      setFilters((prev) => ({
        ...prev,
        beds: prev.beds.includes(bed)
          ? prev.beds.filter(
              (b) => b !== bed
            )
          : [...prev.beds, bed],
      }));
    },
    [setFilters]
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: "transparent",
      }}
    >
      <LinearGradient
    colors={["#89dce9", "#0d0c10", "#947adb" ]}
    start={{ x: 0, y: 0 ,z:0}}
    end={{ x: 1, y: 1, z: 1 }}
    style={styles.gradient}
  >
      <BottomSheetScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text style={styles.heading}>
          Filters
        </Text>

        <Text style={styles.title}>
          Property Type
        </Text>

        <View style={styles.row}>
          {propertyTypes.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                filters.propertyType ===
                  item &&
                  styles.activeChip,
              ]}
              onPress={() =>
                setFilters((prev) => ({
                  ...prev,
                  propertyType: item,
                }))
              }
            >
              <Text
                style={[
                  styles.chipText,
                  filters.propertyType ===
                    item &&
                    styles.activeChipText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.title}>
          Bedrooms
        </Text>

        <View style={styles.row}>
          {bedrooms.map((bed) => (
            <TouchableOpacity
              key={bed}
              style={[
                styles.chip,
                filters.beds.includes(
                  bed
                ) && styles.activeChip,
              ]}
              onPress={() =>
                toggleBedroom(bed)
              }
            >
              <Text
                style={[
                  styles.chipText,
                  filters.beds.includes(
                    bed
                  ) &&
                    styles.activeChipText,
                ]}
              >
                {bed} BHK
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.reset}
            onPress={onReset}
          >
            <Text
              style={styles.resetText}
            >
              Reset
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.apply}
            onPress={onApply}
          >
            <Text
              style={styles.applyText}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView></LinearGradient>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
    color: "#fff"
  },
  gradient: {
  flex: 1,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
},

  title: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#E2E8F0",
    marginRight: 10,
    marginBottom: 10,
  },

  activeChip: {
    backgroundColor: "#4F46E5",
  },

  chipText: {
    color: "#334155",
    fontWeight: "600",
  },

  activeChipText: {
    color: "#fff",
  },

  buttons: {
    flexDirection: "row",
    marginTop: 20,
  },

  reset: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  apply: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
  },

  resetText: {
    fontWeight: "700",
    color: "#334155",
  },

  applyText: {
    color: "#fff",
    fontWeight: "700",
  },
});