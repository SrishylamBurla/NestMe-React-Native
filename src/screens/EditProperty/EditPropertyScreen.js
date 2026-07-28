import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import {
    useGetPropertyByIdQuery,
    useUpdatePropertyMutation,
} from "../../services/propertyApi";

import PropertyBasicSection from "./components/PropertyBasicSection";
import PropertyPricingSection from "./components/PropertyPricingSection";
import PropertyLocationSection from "./components/PropertyLocationSection";
import PropertyAmenitiesSection from "./components/PropertyAmenitiesSection";
import ImageUploader from "./components/ImageUploader";
import PropertySubmitButton from "./components/PropertySubmitButton";

export default function EditPropertyScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const { propertyId } = route.params;

    const {
        data: property,
        isLoading,
    } = useGetPropertyByIdQuery(propertyId);

    const [updateProperty, { isLoading: updating }] =
        useUpdatePropertyMutation();

    const [images, setImages] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",

        propertyType: "apartment",
        listingType: "sale",
        listingStatus: "available",

        priceLabel: "",
        priceValue: "",
        pricePerSqFt: "",

        beds: 2,
        baths: 2,
        areaSqFt: "",

        furnishing: "semi",
        facing: "",

        address: "",
        city: "",
        state: "",

        lat: 17.385,
        lng: 78.4867,

        amenities: [],
    });

    useEffect(() => {
        if (!property) return;

        setForm({
            title: property.title || "",
            description: property.description || "",

            propertyType:
                property.propertyType || "apartment",

            listingType:
                property.listingType || "sale",

            listingStatus:
                property.listingStatus || "available",

            priceLabel:
                property.priceLabel || "",

            priceValue:
                property.priceValue || "",

            pricePerSqFt:
                property.pricePerSqFt || "",

            beds: property.beds || 2,

            baths: property.baths || 2,

            areaSqFt:
                property.areaSqFt || "",

            furnishing:
                property.furnishing || "semi",

            facing:
                property.facing || "",

            address:
                property.address || "",

            city:
                property.city || "",

            state:
                property.state || "",

            lat:
                Number(property.location?.lat) ||
                17.385,

            lng:
                Number(property.location?.lng) ||
                78.4867,

            amenities:
                property.amenities || [],
        });

        setImages(property.images || []);
    }, [property]);

    const updateField = (key, value) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                if (key === "amenities") {
                    value.forEach(item =>
                        formData.append("amenities[]", item ));
                    return;
                }

                formData.append(key, value);
            });

            images.forEach(image => {
                if (image.uri) {
                    formData.append("images", {
                        uri: image.uri,
                        name:
                            image.fileName ||
                            `image-${Date.now()}.jpg`,
                        type:
                            image.type ||
                            "image/jpeg",
                    });
                } else {
                    formData.append(
                        "images",
                        JSON.stringify(image)
                    );
                }
            });

            await updateProperty({
                id: propertyId,
                data: formData,
            }).unwrap();

            Toast.show({
                type: "success",
                text1: "Property Updated",
                text2:
                    "Your property has been updated successfully.",
            });

            navigation.goBack();
        } catch (err) {
            console.log(err);

            Toast.show({
                type: "error",
                text1: "Update Failed",
                text2:
                    err?.data?.message ||
                    "Something went wrong.",
            });
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
                    color="#2563EB"
                />
            </View>
        );
    }

    return (
        <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right"]}
    >
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <ImageUploader
                images={images}
                setImages={setImages}
            />

            <PropertyBasicSection
                form={form}
                updateField={updateField}
            />

            <PropertyPricingSection
                form={form}
                updateField={updateField}
            />

            <PropertyLocationSection
                form={form}
                updateField={updateField}
            />

            <PropertyAmenitiesSection
                form={form}
                updateField={updateField}
            />

            <PropertySubmitButton
                title="Update Property"
                loading={updating}
                onPress={handleSubmit}
            />
        </ScrollView></SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    safeArea: {
    flex: 1,
  },content: {
    paddingBottom: 32,
  },
});