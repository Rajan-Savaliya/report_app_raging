import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

import Ionicons from "react-native-vector-icons/Ionicons";

import { TextInput as RNINPUT } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { setBgColor } from "../../redux/actions/themeActions.js";
import Spinner from "react-native-loading-spinner-overlay";
import { signInAction } from "../../redux/actions/authActons.js";

import Header from "../../components/Header.component";

const singInCheck = yup.object({
  name: yup.string().required("mobile number is required"),
});

const NumberVerfie = ({ navigation }) => {
  const dispatch = useDispatch();

  const [passwordHide, setPasswordHide] = useState(true);
  const [numberLoading, setNumberLoading] = useState(false);

  const { userToken, LoginInLoading } = useSelector((state) => state.authState);

  useEffect(() => {
    if (userToken) {
      navigation.navigate("Home");
    }
  }, [navigation, userToken]);

  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

  if (userToken) {
    dispatch(setBgColor("#CD9B46"));
  }

  return (
    <>
      <StatusBar backgroundColor={"#FFFFFF"} barStyle="light-content" />

      <Spinner
        visible={numberLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          <Header
            title="Mobile Number Verification"
            leftIcon="keyboard-backspace"
            rightIcon="plus"
            headerColor={"#FFFFFF"}
            titleColor={"#000000"}
            iconColor={"#000000"}
            leftIconPress={() => navigation.goBack()}
          />

          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={singInCheck}
            onSubmit={(values, actions) => {
              setNumberLoading(true);
              try {
                var myHeaders = new Headers();
                myHeaders.append(
                  "Authorization",
                  "Bearer sJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uS"
                );

                var formdata = new FormData();
                formdata.append("mobile", values.name);

                var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: formdata,
                  redirect: "follow",
                };

                fetch(
                  "https://rd.ragingdevelopers.com/atender/api/register/send_otp",
                  requestOptions
                )
                  .then((response) => response.text())
                  .then((result) => {
                    var response = JSON.parse(result);
                    setNumberLoading(false);
                    if (response && response.success) {
                      navigation.navigate("Otp", { number: values.name });
                      actions.resetForm();

                      Toast.show({
                        text1: response.message
                          ? response.message
                          : "OTP has been delivered to your Mobile",
                        visibilityTime: 3000,
                        autoHide: true,
                        position: "top",
                        type: "success",
                      });
                    } else {
                      Toast.show({
                        text1: response.message
                          ? response.message
                          : "something went wrong try again",
                        visibilityTime: 3000,
                        autoHide: true,
                        position: "top",
                        type: "error",
                      });
                    }
                  })
                  .catch((error) => {
                    setNumberLoading(false);

                    NetInfo.fetch().then((state) => {
                      if (state.isConnected) {
                        Toast.show({
                          text1: "server response failed try again",
                          visibilityTime: 3000,
                          autoHide: true,
                          position: "top",
                          type: "error",
                        });
                      } else {
                        Toast.show({
                          text1: "Check your Internet Connection",
                          visibilityTime: 3000,
                          autoHide: true,
                          position: "top",
                          type: "error",
                        });
                      }
                    });
                  });
              } catch (e) {}
            }}
          >
            {(props) => (
              <View style={{ marginHorizontal: 30 }}>
                <View
                  style={{
                    marginBottom: 0,
                    marginTop: 25,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 10,
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Mobile Number</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        zIndex: 5,
                        flex: 0.1,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      <Ionicons name="person" color="#1845B2" size={18} />
                    </View>

                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="+91 1234567890"
                      placeholderTextColor="#666666"
                      keyboardType="numeric"
                      style={{
                        color: "#000000",
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        flex: 0.9,
                      }}
                      onChangeText={props.handleChange("name")}
                      onBlur={props.handleBlur("name")}
                      value={props.values.name}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.touched.name && props.errors.name}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 3,
                  }}
                >
                  <Touchable
                    accessible={false}
                    background={TouchableNativeFeedback.Ripple("#ECECEC")}
                    onPress={() => {
                      Keyboard.dismiss();

                      props.handleSubmit();
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#1845B2",
                        marginTop: 30,
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
                        Get Otp
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            )}
          </Formik>

          <View
            style={{
              marginTop: 15,
              marginHorizontal: 30,
              paddingVertical: 0.4,
              elevation: 1,
              backgroundColor: "#DDDDDD",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#666666" }}>
              You have a already registered{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={{ color: "#1845B2" }}>here</Text>
              <View
                style={{
                  paddingVertical:
                    Dimensions.get("window").height < 600 ? 0.7 : 0.6,
                  backgroundColor: "#1845B2",
                }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default NumberVerfie;
