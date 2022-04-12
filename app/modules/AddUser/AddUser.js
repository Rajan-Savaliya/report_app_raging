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
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

import Header from "../../components/Header.component";

import {
  setLoadingSpinerAction,
  prodcutDataLogOut,
} from "../../redux/actions/productActions";

const AddUser = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [dropDownError, setDropDownError] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    route && route.params && route.params.userId
      ? route && route.params && route.params.serviceId
      : null
  );
  const [items, setItems] = useState(
    route && route.params && route.params.serviceList
      ? route.params.serviceList
      : []
  );

  const [checked, setChecked] = useState(
    route && route.params && route.params.days ? "second" : "first"
  );
  const [mon, setMon] = useState(
    route &&
      route.params &&
      route.params.days &&
      route.params.days.includes("mon")
      ? true
      : false
  );
  const [tue, setTue] = useState(
    route &&
      route.params &&
      route.params.days &&
      route.params.days.includes("tue")
      ? true
      : false
  );
  const [wed, setWed] = useState(
    route &&
      route.params &&
      route.params.days &&
      route.params.days.includes("wed")
      ? true
      : false
  );
  const [thu, setThu] = useState(
    route &&
      route.params &&
      route.params.days &&
      route.params.days.includes("thu")
      ? true
      : false
  );
  const [fir, setFir] = useState(
    route &&
      route.params &&
      route.params.days &&
      route.params.days.includes("fri")
      ? true
      : false
  );
  const [sat, setSat] = useState(
    route &&
      route.params &&
      route.params.days &&
      route.params.days.includes("sat")
      ? true
      : false
  );
  const [sun, setSun] = useState(
    route &&
      route.params &&
      route.params.days &&
      route.params.days.includes("sun")
      ? true
      : false
  );

  const { userToken, LoginInLoading, userServiceType } = useSelector(
    (state) => state.authState
  );

  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

  if (userServiceType == "Daily") {
    var singInCheck = yup.object({
      name: yup.string().required("name is required"),
      mobile: yup.string().required("mobile number is required"),
      address: yup.string().required("address is required"),
      bottle: yup.string().required("bottle value is required"),
    });
  } else {
    var singInCheck = yup.object({
      name: yup.string().required("name is required"),
      mobile: yup.string().required("mobile number is required"),
      address: yup.string().required("address is required"),
      bottle: yup.string(),
    });
  }

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
            title={
              route && route.params && route.params.update
                ? "Update Customer"
                : "Add Customer"
            }
            leftIcon="keyboard-backspace"
            rightIcon="plus"
            headerColor={"#FFFFFF"}
            titleColor={"#000000"}
            iconColor={"#000000"}
            leftIconPress={() => navigation.goBack()}
          />

          <Formik
            initialValues={{
              name:
                route && route.params && route.params.name
                  ? route.params.name
                  : "",
              mobile:
                route && route.params && route.params.mobile
                  ? route.params.mobile
                  : "",
              address:
                route && route.params && route.params.address
                  ? route.params.address
                  : "",
              bottle:
                route && route.params && route.params.bottle
                  ? route.params.bottle
                  : "",
            }}
            validationSchema={singInCheck}
            onSubmit={(values, actions) => {
              if (userServiceType == "Daily") {
                if (!value) {
                  alert("forget to select service");
                  return true;
                }
              }
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  if (route && route.params && route.params.update) {
                    let weeklist = [];
                    if (mon) {
                      weeklist.push("mon");
                    }
                    if (tue) {
                      weeklist.push("tue");
                    }
                    if (wed) {
                      weeklist.push("wed");
                    }
                    if (thu) {
                      weeklist.push("thu");
                    }
                    if (fir) {
                      weeklist.push("fri");
                    }
                    if (sat) {
                      weeklist.push("sat");
                    }
                    if (sun) {
                      weeklist.push("sun");
                    }

                    let weekString =
                      checked === "second" ? weeklist.join(",") : "";
                    var myHeaders = new Headers();

                    dispatch(setLoadingSpinerAction(true));

                    myHeaders.append("Authorization", `Bearer ${userToken}`);

                    var formdata = new FormData();
                    var formdata = new FormData();
                    formdata.append("name", values.name);
                    formdata.append("mobile", values.mobile);
                    formdata.append("address", values.address);
                    formdata.append(
                      "customer_id",
                      route && route.params && route.params.userId
                        ? route.params.userId + ""
                        : ""
                    );

                    if (userServiceType == "Daily") {
                      formdata.append("service_id", value + "");
                      formdata.append(
                        "type",
                        checked === "second" && weeklist.length !== 0
                          ? "custom"
                          : "regular"
                      );
                      if (
                        checked === "second" && weeklist.length !== 0
                          ? "custom"
                          : "regular" === "custom"
                      ) {
                        formdata.append("week_days", weekString);
                      }
                      formdata.append("bottle", values.bottle);
                    }

                    var requestOptions = {
                      method: "POST",
                      headers: myHeaders,
                      body: formdata,
                      redirect: "follow",
                    };

                    var updateCustomerUrl =
                      userServiceType == "Daily"
                        ? "https://rd.ragingdevelopers.com/atender/api/customer/updateCustomer"
                        : "https://rd.ragingdevelopers.com/atender/api/onetime/customer/updateCustomer";

                    fetch(updateCustomerUrl, requestOptions)
                      .then((response) => response.text())
                      .then((result) => {
                        var response = JSON.parse(result);

                        // if (
                        //   response &&
                        //   response.success == 0 &&
                        //   response.message.includes("Invalid Api Token")
                        // ) {
                        //   dispatch(prodcutDataLogOut());
                        // }

                        dispatch(setLoadingSpinerAction(false));

                        if (response && response.success) {
                          actions.resetForm();
                          navigation.navigate("News");

                          Toast.show({
                            text1: response.message
                              ? response.message
                              : "Service Saved Successfully",
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
                        dispatch(setLoadingSpinerAction(false));

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
                  } else {
                    let weeklist = [];
                    if (mon) {
                      weeklist.push("mon");
                    }
                    if (tue) {
                      weeklist.push("tue");
                    }
                    if (wed) {
                      weeklist.push("wed");
                    }
                    if (thu) {
                      weeklist.push("thu");
                    }
                    if (fir) {
                      weeklist.push("fri");
                    }
                    if (sat) {
                      weeklist.push("sat");
                    }
                    if (sun) {
                      weeklist.push("sun");
                    }

                    let weekString =
                      checked === "second" ? weeklist.join(",") : "";

                    var myHeaders = new Headers();
                    dispatch(setLoadingSpinerAction(true));

                    myHeaders.append("Authorization", `Bearer ${userToken}`);

                    var formdata = new FormData();
                    var formdata = new FormData();
                    formdata.append("name", values.name);
                    formdata.append("mobile", values.mobile);
                    formdata.append("address", values.address);

                    if (userServiceType == "Daily") {
                      formdata.append("service_id", value + "");
                      formdata.append(
                        "type",
                        checked === "second" && weeklist.length !== 0
                          ? "custom"
                          : "regular"
                      );
                      if (
                        checked === "second" && weeklist.length !== 0
                          ? "custom"
                          : "regular" === "custom"
                      ) {
                        formdata.append("week_days", weekString);
                      }
                      formdata.append("bottle", values.bottle);
                    }

                    var requestOptions = {
                      method: "POST",
                      headers: myHeaders,
                      body: formdata,
                      redirect: "follow",
                    };

                    var createCustomerUrl =
                      userServiceType == "Daily"
                        ? "https://rd.ragingdevelopers.com/atender/api/customer/addCustomer"
                        : "https://rd.ragingdevelopers.com/atender/api/onetime/customer/addCustomer";

                    fetch(createCustomerUrl, requestOptions)
                      .then((response) => response.text())
                      .then((result) => {
                        dispatch(setLoadingSpinerAction(false));

                        var response = JSON.parse(result);

                        // if (
                        //   response &&
                        //   response.success == 0 &&
                        //   response.message.includes("Invalid Api Token")
                        // ) {
                        //   dispatch(prodcutDataLogOut());
                        // }

                        if (response && response.success) {
                          actions.resetForm();
                          navigation.navigate("News");

                          Toast.show({
                            text1: response.message
                              ? response.message
                              : "Service Saved Successfully",
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
                        dispatch(setLoadingSpinerAction(false));

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
                  }
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
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 7,
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Full Name</Text>
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
                      placeholder="full name"
                      placeholderTextColor="#666666"
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
                      {props.errors.name && props.errors.name}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 7,
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
                      <Ionicons name="call" color="#1845B2" size={18} />
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
                      onChangeText={props.handleChange("mobile")}
                      onBlur={props.handleBlur("mobile")}
                      value={props.values.mobile}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.touched.mobile && props.errors.mobile}
                    </Text>
                  </View>
                </View>
                {userServiceType == "Daily" ? (
                  <>
                    <View
                      style={{
                        marginBottom: 7,
                        color: "#333333",
                        fontWeight: "bold",
                      }}
                    >
                      <Text>Select Customer Service</Text>
                    </View>

                    <DropDownPicker
                      placeholder="Select Customer Service"
                      listMode="SCROLLVIEW"
                      scrollViewProps={{
                        nestedScrollEnabled: true,
                      }}
                      style={{
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        zIndex: 1000,
                      }}
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                    />
                    <View style={{ marginBottom: 2, marginTop: 3 }}>
                      <Text style={{ color: "red" }}>
                        {dropDownError ? dropDownError : ""}
                      </Text>
                    </View>
                  </>
                ) : null}

                <View
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 7,
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Address</Text>
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
                      <FontAwesome
                        name="address-card"
                        color="#1845B2"
                        size={18}
                      />
                    </View>

                    <TextInput
                      multiline={true}
                      numberOfLines={4}
                      textAlignVertical={"top"}
                      underlineColorAndroid="transparent"
                      placeholder="Write your address"
                      placeholderTextColor="#666666"
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
                      onChangeText={props.handleChange("address")}
                      onBlur={props.handleBlur("address")}
                      value={props.values.address}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.touched.address && props.errors.address}
                    </Text>
                  </View>
                </View>

                {userServiceType == "Daily" ? (
                  <>
                    <View
                      style={{
                        marginBottom: 0,
                        marginTop: 0,
                      }}
                    >
                      <View
                        style={{
                          marginBottom: 7,
                          color: "#333333",
                          fontWeight: "bold",
                        }}
                      >
                        <Text>Water Bottle</Text>
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
                          <Ionicons
                            name={"settings"}
                            color="#1845B2"
                            size={18}
                          />
                        </View>

                        <TextInput
                          underlineColorAndroid="transparent"
                          keyboardType="numeric"
                          placeholder="Water Bottle"
                          placeholderTextColor="#666666"
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
                          onChangeText={props.handleChange("bottle")}
                          onBlur={props.handleBlur("bottle")}
                          value={props.values.bottle}
                        />
                      </View>
                      <View style={{ marginBottom: 10, marginTop: 3 }}>
                        <Text style={{ color: "red" }}>
                          {props.errors.bottle && props.errors.bottle}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: -10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 10,
                        }}
                      >
                        <View>
                          <RadioButton
                            value="first"
                            status={
                              checked === "first" ? "checked" : "unchecked"
                            }
                            onPress={() => setChecked("first")}
                            color="#1845B2"
                            uncheckedColor="#808080"
                          />
                        </View>
                        <View>
                          <Text>Regular</Text>
                        </View>
                      </View>

                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton
                            value="second"
                            status={
                              checked === "second" ? "checked" : "unchecked"
                            }
                            onPress={() => setChecked("second")}
                            color="#1845B2"
                            uncheckedColor="#808080"
                          />
                        </View>
                        <View>
                          <Text>Custom</Text>
                        </View>
                      </View>
                    </View>

                    {checked === "second" ? (
                      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                        <TouchableWithoutFeedback
                          onPress={() => {
                            setMon((value) => !value);
                          }}
                        >
                          <View
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 8,
                              marginHorizontal: 3,
                              marginVertical: 3,
                              backgroundColor: mon ? "#1845B2" : "#ffffff",
                              borderRadius: 5,
                              borderColor: "#1845B2",
                              borderWidth: 1,
                            }}
                          >
                            <Text
                              style={{ color: mon ? "#FFFFFF" : "#1845B2" }}
                            >
                              Mon
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                          onPress={() => {
                            setTue((value) => !value);
                          }}
                        >
                          <View
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 8,
                              marginHorizontal: 3,
                              backgroundColor: tue ? "#1845B2" : "#ffffff",
                              borderRadius: 5,
                              borderColor: "#1845B2",
                              borderWidth: 1,
                              marginVertical: 3,
                            }}
                          >
                            <Text
                              style={{ color: tue ? "#FFFFFF" : "#1845B2" }}
                            >
                              Tue
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                          onPress={() => {
                            setWed((value) => !value);
                          }}
                        >
                          <View
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 8,
                              marginHorizontal: 3,
                              backgroundColor: wed ? "#1845B2" : "#ffffff",
                              borderRadius: 5,
                              borderColor: "#1845B2",
                              borderWidth: 1,
                              marginVertical: 3,
                            }}
                          >
                            <Text
                              style={{ color: wed ? "#FFFFFF" : "#1845B2" }}
                            >
                              Wed
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                          onPress={() => {
                            setThu((value) => !value);
                          }}
                        >
                          <View
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 8,
                              marginHorizontal: 3,
                              backgroundColor: thu ? "#1845B2" : "#ffffff",
                              borderRadius: 5,
                              borderColor: "#1845B2",
                              borderWidth: 1,
                              marginVertical: 3,
                            }}
                          >
                            <Text
                              style={{ color: thu ? "#FFFFFF" : "#1845B2" }}
                            >
                              Thu
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                          onPress={() => {
                            setFir((value) => !value);
                          }}
                        >
                          <View
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 8,
                              marginHorizontal: 3,
                              backgroundColor: fir ? "#1845B2" : "#ffffff",
                              borderRadius: 5,
                              borderColor: "#1845B2",
                              borderWidth: 1,
                              marginVertical: 3,
                            }}
                          >
                            <Text
                              style={{ color: fir ? "#FFFFFF" : "#1845B2" }}
                            >
                              Fri
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                          onPress={() => {
                            setSat((value) => !value);
                          }}
                        >
                          <View
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 8,
                              marginHorizontal: 3,
                              backgroundColor: sat ? "#1845B2" : "#ffffff",
                              borderRadius: 5,
                              borderColor: "#1845B2",
                              borderWidth: 1,
                              marginVertical: 3,
                            }}
                          >
                            <Text
                              style={{ color: sat ? "#FFFFFF" : "#1845B2" }}
                            >
                              Sat
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                          onPress={() => {
                            setSun((value) => !value);
                          }}
                        >
                          <View
                            style={{
                              paddingVertical: 5,
                              paddingHorizontal: 8,
                              marginHorizontal: 3,
                              backgroundColor: sun ? "#1845B2" : "#ffffff",
                              borderRadius: 5,
                              borderColor: "#1845B2",
                              borderWidth: 1,
                              marginVertical: 3,
                            }}
                          >
                            <Text
                              style={{ color: sun ? "#FFFFFF" : "#1845B2" }}
                            >
                              Sun
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    ) : null}
                  </>
                ) : null}

                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 3,
                  }}
                >
                  <Touchable
                    background={TouchableNativeFeedback.Ripple("#ECECEC")}
                    onPress={() => {
                      if (userServiceType == "Daily") {
                        if (!value) {
                          setDropDownError("select your service");
                          return true;
                        } else {
                          setDropDownError("");
                        }
                      }
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
                        {route && route.params && route.params.update
                          ? "Update Customer"
                          : "Create Customer"}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </>
  );
};

export default AddUser;
