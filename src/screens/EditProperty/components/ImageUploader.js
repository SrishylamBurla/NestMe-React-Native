import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function ImageUploader({
    images,
    setImages,
}) {
    const pickImages = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            selectionLimit: 0, // unlimited
            quality: 0.9,
        });

        if (result.didCancel || !result.assets) return;

        setImages((prev) => [...prev, ...result.assets]);
    };

    const removeImage = (index) => {
        setImages((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    const renderItem = ({ item, index }) => {
        let imageUri = "";

        // Existing image from backend
        if (typeof item === "string") {
            imageUri = item;
        } else if (item?.url) {
            imageUri = item.url;
        }
        // Newly selected image
        else {
            imageUri = item.uri;
        }

        return (
            <View style={styles.imageCard}>
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                />

                {index === 0 && (
                    <View style={styles.coverBadge}>
                        <Text style={styles.coverText}>
                            Cover
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeImage(index)}
                >
                    <Ionicons
                        name="trash"
                        size={18}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Property Images
            </Text>

            <Text style={styles.subtitle}>
                Add or remove property photos.
            </Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={pickImages}
            >
                <Ionicons
                    name="images-outline"
                    size={22}
                    color="#fff"
                />

                <Text style={styles.addButtonText}>
                    Add Images
                </Text>
            </TouchableOpacity>

            {images.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons
                        name="image-outline"
                        size={55}
                        color="#CBD5E1"
                    />

                    <Text style={styles.emptyText}>
                        No Images Selected
                    </Text>
                </View>
            ) : (
                <FlatList
                    horizontal
                    data={images}
                    keyExtractor={(_, index) =>
                        index.toString()
                    }
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: 10,
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        color: "#0F172A",
    },

    subtitle: {
        marginTop: 4,
        color: "#64748B",
        marginBottom: 15,
    },

    addButton: {
        height: 52,
        backgroundColor: "#2563EB",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 15,
    },

    addButtonText: {
        color: "#fff",
        marginLeft: 8,
        fontWeight: "700",
        fontSize: 16,
    },

    emptyContainer: {
        height: 180,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#CBD5E1",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        marginTop: 10,
        color: "#94A3B8",
        fontWeight: "600",
    },

    imageCard: {
        width: 150,
        height: 150,
        marginRight: 12,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "#F1F5F9",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    deleteButton: {
        position: "absolute",
        right: 10,
        top: 10,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#EF4444",
        justifyContent: "center",
        alignItems: "center",
    },

    coverBadge: {
        position: "absolute",
        left: 10,
        top: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    coverText: {
        fontWeight: "700",
        fontSize: 12,
        color: "#111827",
    },
});