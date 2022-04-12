import React from "react";
import {
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  Text,
  ScrollView,
} from "react-native";
import AppConstants from "../../appConstants/AppConstants";

import Spinner from "react-native-loading-spinner-overlay";

const AuthCard = ({ navigation }) => {
  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

  return (
    <>
      <StatusBar backgroundColor={"#FFFFFF"} barStyle="light-content" />

      <Spinner
        visible={false}
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
          <View
            style={{
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/logo_final_11.png")}
              style={{
                width: Dimensions.get("window").width - 30,
                height: Dimensions.get("window").height / 3,
                resizeMode: "contain",
                borderRadius: 200,
              }}
            />
          </View>

          <View style={{ marginHorizontal: 30, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "Cairo-Regular",
                textAlign: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Atender
            </Text>
          </View>
          <View style={{ marginHorizontal: 30, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "Cairo-Regular",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Atender Application is designed for grow and maintain Business
              based on Services.
            </Text>
          </View>

          <View style={{ paddingVertical: 20 }} />

          <View
            style={{
              overflow: "hidden",
              borderRadius: 3,
            }}
          >
            <Touchable
              background={TouchableNativeFeedback.Ripple("#ECECEC")}
              onPress={() => {
                navigation.navigate("NumberVerfie");
              }}
            >
              <View
                style={{
                  backgroundColor: "#1845B2",
                  marginTop: 10,
                  marginHorizontal: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 3,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontFamily: "Cairo-Regular",
                  }}
                >
                  Join Us
                </Text>
              </View>
            </Touchable>
          </View>

          <View style={{ paddingVertical: 5 }} />

          <View
            style={{
              overflow: "hidden",
              borderRadius: 3,
            }}
          >
            <Touchable
              background={TouchableNativeFeedback.Ripple("#1845B2")}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <View
                style={{
                  backgroundColor: "#e8e8eb",
                  marginTop: 10,
                  marginHorizontal: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 3,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Cairo-Regular",
                    color: "#000000",
                    fontSize: 16,
                  }}
                >
                  Sign In
                </Text>
              </View>
            </Touchable>
          </View>
        </ScrollView>
        <View style={{ alignItems: "center", top: -5 }}>
          <Text style={{ fontSize: 12 }}>
            {" "}
            Version : {AppConstants.APP_VERSION}
          </Text>
        </View>
      </View>
    </>
  );
};

export default AuthCard;
