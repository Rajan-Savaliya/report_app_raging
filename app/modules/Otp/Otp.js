import React, { useState, useEffect, useRef } from "react";
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
import { Formik } from "formik";
import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { TextInput as RNINPUT } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { setBgColor } from "../../redux/actions/themeActions.js";
import Spinner from "react-native-loading-spinner-overlay";

import Header from "../../components/Header.component";
const CELL_COUNT = 4;

const Otp = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [otpLoading, setOtpLoading] = useState(false);

  const [text1, setText1] = useState(null);
  const [text2, setText2] = useState(null);
  const [text3, setText3] = useState(null);
  const [text4, setText4] = useState(null);

  const [cityDropDown, setCityDropDown] = useState([]);
  const [adminDropDown, setAdminDropDown] = useState([]);

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();

  const [passwordHide, setPasswordHide] = useState(true);

  const { userToken, LoginInLoading } = useSelector((state) => state.authState);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer sJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uS");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/register/city",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let response = JSON.parse(result);
        if (response.success) {
          let citySelectionList = [];

          if (Array.isArray(response.data)) {
            response.data.forEach((valuesitem) => {
              citySelectionList.push({
                label: valuesitem.name,
                value: valuesitem.id,
              });
            });

            setCityDropDown(citySelectionList);
          }
        } else {
        }
      })
      .catch((error) => console.log("error", error));
  }, [navigation]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer sJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uS");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/register/adminservice",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let response = JSON.parse(result);
        if (response.success) {
          let adminServiceSelectionList = [];

          if (Array.isArray(response.data)) {
            response.data.forEach((valuesitem) => {
              adminServiceSelectionList.push({
                label: valuesitem.name,
                value: valuesitem.id,
              });
            });

            setAdminDropDown(adminServiceSelectionList);
          }
        } else {
        }
      })
      .catch((error) => console.log("error", error));
  }, [navigation]);

  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

  return (
    <>
      <StatusBar backgroundColor={"#FFFFFF"} barStyle="light-content" />

      <Spinner
        visible={otpLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <Header
            title="Otp"
            leftIcon="keyboard-backspace"
            rightIcon="plus"
            headerColor={"#FFFFFF"}
            titleColor={"#000000"}
            iconColor={"#000000"}
            leftIconPress={() => navigation.goBack()}
          />

          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/work.jpg")}
              style={{
                width: Dimensions.get("window").width - 30,
                height: Dimensions.get("window").height / 3,
                resizeMode: "contain",
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
              Enter OTP
            </Text>
          </View>

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={{
              marginTop: 20,
              width: 280,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[
                  {
                    width: 60,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#ccc",
                    borderWidth: 1,
                    borderRadius: 12,
                  },
                  isFocused && {
                    borderColor: "#007AFF",
                    borderBottomWidth: 2,
                  },
                ]}
              >
                <Text
                  style={{ color: "#000", fontSize: 36, textAlign: "center" }}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />

          <View
            style={{
              overflow: "hidden",
              borderRadius: 3,
            }}
          >
            <Touchable
              background={TouchableNativeFeedback.Ripple("#ECECEC")}
              onPress={() => {
                if (value.length !== 4) {
                  Toast.show({
                    text1: "please enter 4 digit otp",
                    visibilityTime: 3000,
                    autoHide: true,
                    position: "top",
                    type: "info",
                  });
                  return true;
                }
                setOtpLoading(true);
                var myHeaders = new Headers();
                myHeaders.append(
                  "Authorization",
                  "Bearer sJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uS"
                );
                myHeaders.append(
                  "Cookie",
                  "ci_session=de79d284707920af3e0a473bab2cdc6b4994a8cc"
                );

                var formdata = new FormData();
                formdata.append(
                  "mobile",
                  route && route.params && route.params.number
                    ? route.params.number
                    : ""
                );
                formdata.append("otp", `${value}`);

                var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: formdata,
                  redirect: "follow",
                };

                fetch(
                  "https://rd.ragingdevelopers.com/atender/api/register/verify_otp",
                  requestOptions
                )
                  .then((response) => response.text())
                  .then((result) => {
                    setOtpLoading(false);

                    var response = JSON.parse(result);

                    if (response && response.success) {
                      navigation.navigate("SignUp", {
                        number:
                          route && route.params && route.params.number
                            ? route.params.number
                            : "",
                        cityList: cityDropDown,
                        adminDropDownList: adminDropDown,
                      });

                      Toast.show({
                        text1: response.message
                          ? response.message
                          : "OTP Verify successfully",
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
                    setOtpLoading(false);

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
              }}
            >
              <View
                style={{
                  backgroundColor: "#1845B2",
                  marginTop: 30,
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
                  OTP SUBMIT
                </Text>
              </View>
            </Touchable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Otp;
