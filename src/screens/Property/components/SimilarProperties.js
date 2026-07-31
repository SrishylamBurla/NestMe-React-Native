import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";
import CompactPropertyCard from "../components/CompactPropertyCard"

export default function SimilarProperties({
    properties = [],
}) {
    const navigation = useNavigation();

    if (!properties.length) return null;

    return (
        <View style={styles.container}>
            {/* HEADER */}

            <View style={styles.header}>
                <View>
                    <Text style={styles.subHeading}>
                        Discover More
                    </Text>

                    <Text style={styles.heading}>
                        Similar Properties
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.viewAll}
                    onPress={() =>
                        navigation.navigate("Properties")
                    }
                >
                    <Text style={styles.viewAllText}>
                        View All
                    </Text>

                    
                </TouchableOpacity>
            </View>

            {/* LIST */}

            <FlatList
                horizontal
                data={properties}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 18,
                    paddingBottom: 12,
                }}
                renderItem={({ item }) => (
                    <CompactPropertyCard
                        property={item}
                        onPress={() =>
                            navigation.push("PropertyDetails", {
                                id: item._id,
                            })
                        }
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        marginBottom: 30,
    },

    header: {
        paddingHorizontal: 18,

        marginBottom: 18,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    subHeading: {
        fontSize: 11,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: "#94A3B8",
        fontWeight: "700",
    },

    heading: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0F172A",
        marginTop: 4,
    },

    viewAll: {
        flexDirection: "row",
        alignItems: "center",
    },

    viewAllText: {
        fontWeight: "700",
        color: "#111827",
        marginRight: 2,
        borderWidth: 1,
        borderRadius: 5,
        padding:2
    },
});