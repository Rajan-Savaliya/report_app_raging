import React, { useState } from "react";
import {
  View,
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
  Image,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import AppConstants from "../../appConstants/AppConstants";

import Ionicons from "react-native-vector-icons/Ionicons";

import { TextInput as RNINPUT } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { setBgColor } from "../../redux/actions/themeActions.js";
import Spinner from "react-native-loading-spinner-overlay";
import { signInAction } from "../../redux/actions/authActons.js";

import Header from "../../components/Header.component";

const singInCheck = yup.object({
  name: yup.string().required("mobile number is required"),
  password: yup.string().required("password is required"),
});

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();

  const [passwordHide, setPasswordHide] = useState(true);

  const { userToken, LoginInLoading } = useSelector((state) => state.authState);

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
      {/* <Header
        title="Sign In"
        leftIcon="keyboard-backspace"
        rightIcon="plus"
        headerColor={"#FFFFFF"}
        titleColor={"#000000"}
        iconColor={"#000000"}
        leftIconPress={() => navigation.goBack()}
      /> */}

      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, flexGrow: 1 }}
        >
          <View
            style={{
              marginTop: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Image
              source={require("../../assets/logo_final_11.png")}
              style={{
                width: 200,
                height: 200,
                resizeMode: "contain",
                borderRadius: 200,
              }}
            />
          </View>
          <View style={{ marginHorizontal: 30, marginTop: 0 }}>
            <Text
              style={{
                // fontFamily: "Cairo-Regular",
                textAlign: "center",
                fontSize: 25,
                fontWeight: "bold",
                color: "#4287f5",
              }}
            >
              SIGN IN
            </Text>
          </View>

          <Formik
            initialValues={{
              name: "",
              password: "",
            }}
            validationSchema={singInCheck}
            onSubmit={(values, actions) => {
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  dispatch(signInAction(values.name, values.password));
                  actions.resetForm();
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
                    <Text>User Name</Text>
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
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        paddingHorizontal: 5,
                      }}
                    >
                      <Ionicons name="person" color="#4287f5" size={18} />
                    </View>

                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="User Name"
                      placeholderTextColor="#666666"
                      style={{
                        color: "#000000",
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        flex: 0.9,
                        paddingLeft: 10,
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
                    marginBottom: 0,
                    marginTop: 0,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 10,
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Password</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Password"
                      placeholderTextColor="#666666"
                      secureTextEntry={passwordHide ? true : false}
                      style={{
                        color: "#000000",
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        flex: 0.9,
                        paddingLeft: 20,
                      }}
                      onChangeText={props.handleChange("password")}
                      onBlur={props.handleBlur("password")}
                      value={props.values.password}
                    />

                    <View
                      style={{
                        zIndex: 5,
                        flex: 0.1,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        paddingHorizontal: 5,
                      }}
                    >
                      <Ionicons
                        onPress={() => {
                          setPasswordHide((item) => !item);
                        }}
                        name={passwordHide ? "eye-off" : "eye"}
                        color="#4287f5"
                        size={18}
                      />
                    </View>
                  </View>
                  <View style={{ marginBottom: 10, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.touched.password && props.errors.password}
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
                        backgroundColor: "#4287f5",
                        marginTop: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 30,
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
                        Sign In
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
              marginHorizontal: 50,
              paddingVertical: 0.4,
              elevation: 1,
              backgroundColor: "#DDDDDD",
            }}
          />
          <View style={{ alignItems: "center", top: 10 }}>
            <Text style={{ fontSize: 12 }}>
              {" "}
              Version : {AppConstants.APP_VERSION}
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignIn;
