import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

const SearchHeader = ({
  title = "Search Properties",
  resultCount = 0,
  showResultCount = true,
}) => {
  const navigation = useNavigation();

  return (
    <>
    
      <View style={[
        styles.container,
        // {
        //   paddingTop: (StatusBar.currentHeight || 0) + 12,
        // },
      ]}>
        
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color="#f6f3f3"
            />
          </TouchableOpacity>

          <Text
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </Text>

          {/* Keeps title perfectly centered */}
          <View style={styles.placeholder} />
        </View>

        {showResultCount && (
          <Text style={styles.resultText}>
            {resultCount} Properties Found
          </Text>
        )}
      </View></>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
  paddingHorizontal: 18,
  paddingBottom: 16,
  paddingTop: 12,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  backgroundColor: "#111827",
},

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    flex: 1,
    textAlign: "center",
    color: "#f8f0f0",
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 12,
  },

  placeholder: {
    width: 42,
  },

  resultText: {
  marginTop: 10,
  color: "#CBD5E1",
  fontSize: 14,
  fontWeight: "500",
  textAlign: "right"
},

});