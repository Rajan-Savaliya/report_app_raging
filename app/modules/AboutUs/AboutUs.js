import React, { useState } from "react";
import {
  View,
  StatusBar,
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "../../components/Header.component";

const AboutUs = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userToken, LoginInLoading, userServiceType } = useSelector(
    (state) => state.authState
  );

  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;
  return (
    <>
      <StatusBar backgroundColor={"#FFFFFF"} barStyle="light-content" />

      <Spinner
        visible={LoginInLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Header
            title={"About Us"}
            leftIcon="keyboard-backspace"
            rightIcon="plus"
            headerColor={"#FFFFFF"}
            titleColor={"#000000"}
            iconColor={"#000000"}
            leftIconPress={() => navigation.goBack()}
          />
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              ATENDER BUSINESS
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image
              style={{ width: 200, height: 200, borderRadius: 200 }}
              source={require("../../assets/logo_final_11.png")}
            />
          </View>
          <View style={{ marginHorizontal: 30, marginTop: 20 }}>
            <Text style={{ textAlign: "justify" }}>
              Atender Application is designed for grow and maintain Business
              based on Services.
            </Text>
          </View>
          <View style={{ marginHorizontal: 30, marginTop: 20 }}>
            <Text style={{ textAlign: "justify" }}>
              Atender Application is for all business who Provided services. It
              is very useful for Daily services. It is very helpful for maintain
              business Report and customers through this application. This
              application always provide Update for customer of his needs.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default AboutUs;
