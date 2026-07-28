import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import { launchImageLibrary } from "react-native-image-picker";

const amenitiesList = [
  {
    id: "pool",
    title: "Swimming Pool",
    image: require("../../../assets/amenities/swimming.png"),
  },
  {
    id: "gym",
    title: "Gym",
    image: require("../../../assets/amenities/dumbbell.png"),
  },
  {
    id: "parking",
    title: "Parking",
    image: require("../../../assets/amenities/parking-car.png"),
  },
  {
    id: "security",
    title: "Security",
    image: require("../../../assets/amenities/security-camera.png"),
  },
  {
    id: "garden",
    title: "Garden",
    image: require("../../../assets/amenities/flowers.png"),
  },
  {
    id: "lift",
    title: "Lift",
    image: require("../../../assets/amenities/elevator.png"),
  },
];

export default function StepFour({
  form,
  setForm,
}) {
  const toggleAmenity = (amenity) => {
    const exists =
      form.amenities.includes(amenity);

    if (exists) {
      setForm({
        ...form,
        amenities: form.amenities.filter(
          (item) => item !== amenity
        ),
      });
    } else {
      setForm({
        ...form,
        amenities: [
          ...form.amenities,
          amenity,
        ],
      });
    }
  };

  const pickImages = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 10,
      quality: 0.8,
    });

    if (result.didCancel) return;

    if (result.assets) {
      setForm({
        ...form,
        images: [
          ...form.images,
          ...result.assets,
        ],
      });
    }
  };

  const removeImage = (index) => {
    const images = [...form.images];

    images.splice(index, 1);

    setForm({
      ...form,
      images,
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* Amenities */}

      <Text style={styles.heading}>
        Amenities
      </Text>

      <View style={styles.chips}>
        {amenitiesList.map((item) => {
          const selected = form.amenities.includes(item.id);

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.chip,
                selected &&
                  styles.selectedChip,
              ]}
              onPress={() =>
                toggleAmenity(item.id)
              }
            >
              <Ionicons
                name={
                  selected
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={18}
                color={
                  selected
                    ? "#fff"
                    : "#64748B"
                }
              />

              <Text
                style={[
                  styles.chipText,
                  selected &&
                    styles.selectedText,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Images */}

      <Text style={styles.heading}>
        Property Images
      </Text>

      <TouchableOpacity
        style={styles.uploadBox}
        onPress={pickImages}
      >
        <Ionicons
          name="cloud-upload-outline"
          size={42}
          color="#4F46E5"
        />

        <Text style={styles.uploadTitle}>
          Upload Property Images
        </Text>

        <Text style={styles.uploadSubtitle}>
          JPG, PNG • Maximum 10 Images
        </Text>
      </TouchableOpacity>

      {form.images.length > 0 && (
        <>
          <Text style={styles.imageCount}>
            {form.images.length} Images
            Selected
          </Text>

          <View style={styles.grid}>
            {form.images.map(
              (image, index) => (
                <View
                  key={index}
                  style={styles.imageCard}
                >
                  <Image
                    source={{
                      uri: image.uri,
                    }}
                    style={styles.image}
                  />

                  <TouchableOpacity
                    style={styles.remove}
                    onPress={() =>
                      removeImage(index)
                    }
                  >
                    <Ionicons
                      name="close"
                      size={18}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              )
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",

    marginTop: 22,
    marginBottom: 14,
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    height: 42,

    borderRadius: 24,

    backgroundColor: "#F1F5F9",
  },

  selectedChip: {
    backgroundColor: "#4F46E5",
  },

  chipText: {
    marginLeft: 8,
    color: "#475569",
    fontWeight: "600",
  },

  selectedText: {
    color: "#fff",
  },

  uploadBox: {
    marginTop: 10,

    height: 180,

    borderRadius: 20,

    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F8FAFC",
  },

  uploadTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  uploadSubtitle: {
    marginTop: 6,
    color: "#64748B",
  },

  imageCount: {
    marginTop: 22,
    marginBottom: 12,

    fontWeight: "700",
    fontSize: 16,
    color: "#111827",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  imageCard: {
    width: "48%",
    height: 140,

    marginBottom: 14,

    borderRadius: 18,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  remove: {
    position: "absolute",
    top: 8,
    right: 8,

    width: 30,
    height: 30,

    borderRadius: 15,

    backgroundColor: "rgba(0,0,0,0.75)",

    justifyContent: "center",
    alignItems: "center",
  },
});