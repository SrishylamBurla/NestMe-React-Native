
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useGetMeQuery } from "../../services/authApi";

import HomeHeader from "./components/HomeHeader";
import HeroSection from "./components/HeroSection";
import CarouselSection from "./components/CarouselSection";
import BottomNav from "../../components/BottomNav";
import ListingOptionsSection from "./components/ListingOptionsSection";
import Footer from "../../components/Footer";
import NewsLetterCard from "../../components/NewsLetterCard";
import BrowsePropertyType from "./components/BrowsePropertyType";

export default function HomeScreen() {

  const { data } = useGetMeQuery()

  const user = data?.user
  
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView
       contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        // stickyHeaderIndices={[0]}
      >
        

        <HeroSection />

        <BrowsePropertyType />

        <CarouselSection
          title="Newly Added"
          sortType="latest"
          gradient={["#9ac2d3", "#f4f2f6"]}
        />

        <CarouselSection
          title="Trending This Week"
          sortType="views"
          gradient={["#dcdcc3", "#FFFFFF"]}
        />

        <CarouselSection
          title="Premium Picks"
          minPrice={20000000}
          gradient={["#e5cbab", "#FFFFFF"]}
        />

        <ListingOptionsSection />

        <NewsLetterCard />

        <Footer />
      </ScrollView>

      {user && <BottomNav active="home" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  content: {
    paddingBottom: 70,
  },
});