import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity, Animated, RefreshControl } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  representedSelector,
  fetchRepresented,
} from "../../store/representedSlice";

import HeaderButtons from "../../components/HeaderButtons/HeaderButtons";
import MonthlyStar from "../../components/MonthlyStar/MonthlyStar";
import RepresentedList from "../../components/RepresentedList/RepresentedList";
import Image from "../../components/Image/Image";

import { Container, StarsCategories, HeaderContainer } from "./Home.styles";

const categories = {
  דוגמן: "דוגמנים",
  משחק: "שחקנים",
  ביט: "ביטים",
  ניצב: "ניצבים",
  ילדים: "ילדים",
};

const showbizzHomeIcon = require("../../../assets/home-page-showbizzz-logo.png");

const AnimatedFlatList = Animated.createAnimatedComponent(StarsCategories);

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { represented, loading } = useSelector(representedSelector);
  const onRefresh = () => dispatch(fetchRepresented());

  return (
    <Container>
      <HeaderButtons
        leftText={
          <Image uri={showbizzHomeIcon} style={{ height: 38, width: 117 }} />
        }
        rightText={
          <HeaderContainer>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Feather name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
              style={{ marginLeft: 25 }}
            >
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
          </HeaderContainer>
        }
      />
      <MonthlyStar navigation={navigation} />
      <AnimatedFlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            title="משוך לרענון"
            tintColor="#fff"
            titleColor="#fff"
          />
        }
        data={Object.keys(categories)}
        keyExtractor={(category) => category}
        style={{ marginBottom: 65 }}
        renderItem={({ item }) =>
          typeof represented[item] !== "undefined" &&
          represented[item].length > 0 && (
            <RepresentedList
              title={categories[item]}
              key={item}
              disableMarginTop
              navigation={navigation}
              data={represented[item]}
            />
          )
        }
      />
    </Container>
  );
};

export default Home;
