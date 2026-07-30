

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

import { useAddPropertyMutation } from "../../services/propertyApi";

import StepIndicator from "./components/StepIndicator";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";

export default function AddPropertyScreen() {
  const navigation = useNavigation();

  const [step, setStep] = useState(1);

  const [addProperty, { isLoading }] = useAddPropertyMutation();

  const [form, setForm] = useState({
    listingType: "sale",
    propertyType: "",
    title: "",
    description: "",
    priceValue: "",
    priceLabel: "",
    pricePerSqFt: "",
    beds: "",
    baths: "",
    areaSqFt: "",
    furnishing: "",
    facing: "",
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
    amenities: [],
    images: [],
  });

  // -----------------------------
  // Modal State
  // -----------------------------

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
    return false;
  };

  // -----------------------------
  // Step Validation
  // -----------------------------

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!form.listingType)
          return showModal(
            "Listing Type",
            "Please select Sale, Rent or Lease."
          );

        if (!form.propertyType)
          return showModal(
            "Property Type",
            "Please select the property type."
          );

        if (!form.title.trim())
          return showModal(
            "Property Title",
            "Please enter a property title."
          );

        if (!form.description.trim())
          return showModal(
            "Description",
            "Please enter the property description."
          );

        return true;

      case 2:
        if (!form.priceValue)
          return showModal(
            "Price",
            "Please enter the property price."
          );

        if (!form.areaSqFt)
          return showModal(
            "Area",
            "Please enter the built-up area."
          );

        return true;

      case 3:
        if (!form.address.trim())
          return showModal(
            "Address",
            "Please enter the property address."
          );

        if (!form.city.trim())
          return showModal(
            "City",
            "Please enter the city."
          );

        if (!form.state.trim())
          return showModal(
            "State",
            "Please enter the state."
          );

        return true;

      case 4:
        if (form.images.length === 0)
          return showModal(
            "Property Images",
            "Upload at least one property image."
          );

        return true;

      default:
        return true;
    }
  };

  // -----------------------------
  // Navigation
  // -----------------------------

  const next = () => {
    const valid = validateStep();

    if (valid && step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const previous = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  // -----------------------------
  // Submit Property
  // -----------------------------

  const submit = async () => {
    if (!validateStep()) return;

    try {
      const formData = new FormData();

      // Basic Info
      formData.append("listingType", form.listingType);
      formData.append("propertyType", form.propertyType);
      formData.append("title", form.title);
      formData.append("description", form.description);

      // Price
      formData.append("priceLabel", form.priceLabel);
      formData.append("priceValue", form.priceValue);
      formData.append("pricePerSqFt", form.pricePerSqFt);

      // Details
      formData.append("beds", form.beds);
      formData.append("baths", form.baths);
      formData.append("areaSqFt", form.areaSqFt);
      formData.append("furnishing", form.furnishing);
      formData.append("facing", form.facing);

      // Location
      formData.append("address", form.address);
      formData.append("city", form.city.trim());
      formData.append("state", form.state.trim());
      formData.append("lat", form.lat);
      formData.append("lng", form.lng);

      // Required
      formData.append("listingStatus", "available");

      // Amenities
      form.amenities.forEach((item) => {
        formData.append("amenities[]", item);
      });

      // Images
      form.images.forEach((image, index) => {
        formData.append("images", {
          uri: image.uri,
          name: image.fileName || `image_${index}.jpg`,
          type: image.type || "image/jpeg",
        });
      });

      await addProperty(formData).unwrap();

      showModal(
        "Property Submitted",
        "Your property has been submitted successfully."
      );

      setTimeout(() => {
        setModalVisible(false);
        navigation.replace("MyProperties");
      }, 1800);
    } catch (err) {
      console.error(err);

      showModal(
        "Submission Failed",
        err?.data?.message ||
          "Something went wrong while submitting your property."
      );
    }
  };

  return (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" />

    <StepIndicator step={step} />

    <View style={styles.content}>
      {step === 1 && (
        <StepOne
          form={form}
          setForm={setForm}
        />
      )}

      {step === 2 && (
        <StepTwo
          form={form}
          setForm={setForm}
        />
      )}

      {step === 3 && (
        <StepThree
          form={form}
          setForm={setForm}
        />
      )}

      {step === 4 && (
        <StepFour
          form={form}
          setForm={setForm}
        />
      )}

      {step === 5 && (
        <StepFive
          form={form}
        />
      )}
    </View>

    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={previous}
      >
        <Text style={styles.backText}>
          {step === 1 ? "Cancel" : "Previous"}
        </Text>
      </TouchableOpacity>

      {step < 5 ? (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={next}
        >
          <Text style={styles.nextText}>
            Next
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.nextButton,
            isLoading && { opacity: 0.7 },
          ]}
          disabled={isLoading}
          onPress={submit}
        >
          <Text style={styles.nextText}>
            {isLoading
              ? "Posting..."
              : "Submit Property"}
          </Text>
        </TouchableOpacity>
      )}
    </View>

    {/* Premium Modal */}
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>

          <View style={styles.modalIconContainer}>
            <Ionicons
              name={
                modalTitle === "Property Submitted"
                  ? "checkmark-circle"
                  : "alert-circle"
              }
              size={70}
              color={
                modalTitle === "Property Submitted"
                  ? "#22C55E"
                  : "#4F46E5"
              }
            />
          </View>

          <Text style={styles.modalTitle}>
            {modalTitle}
          </Text>

          <Text style={styles.modalMessage}>
            {modalMessage}
          </Text>

          {modalTitle !== "Property Submitted" && (
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>
                Got it
              </Text>
            </TouchableOpacity>
          )}

        </View>
      </View>
    </Modal>

  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#F8FAFC",
},

content: {
  flex: 1,
  paddingHorizontal: 18,
  paddingTop: 18,
},

footer: {
  flexDirection: "row",
  paddingHorizontal: 18,
  paddingVertical: 16,
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#E5E7EB",
},

backButton: {
  flex: 1,
  height: 54,
  borderRadius: 16,
  backgroundColor: "#E5E7EB",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},

nextButton: {
  flex: 1,
  height: 54,
  borderRadius: 16,
  backgroundColor: "#4F46E5",
  justifyContent: "center",
  alignItems: "center",
  elevation: 3,
},

backText: {
  fontSize: 16,
  fontWeight: "700",
  color: "#111827",
},

nextText: {
  fontSize: 16,
  fontWeight: "700",
  color: "#FFFFFF",
},

/* -----------------------------
   Premium Modal
------------------------------*/

modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(15,23,42,0.55)",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 24,
},

modalCard: {
  width: "100%",
  backgroundColor: "#FFFFFF",
  borderRadius: 24,
  paddingHorizontal: 24,
  paddingVertical: 30,
  alignItems: "center",
  elevation: 12,
},

modalIconContainer: {
  width: 90,
  height: 90,
  borderRadius: 45,
  backgroundColor: "#F8FAFC",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 18,
},

modalTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#111827",
  textAlign: "center",
},

modalMessage: {
  marginTop: 12,
  fontSize: 15,
  color: "#64748B",
  textAlign: "center",
  lineHeight: 24,
},

modalButton: {
  marginTop: 28,
  width: "100%",
  height: 52,
  borderRadius: 14,
  backgroundColor: "#4F46E5",
  justifyContent: "center",
  alignItems: "center",
},

modalButtonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "700",
},

})