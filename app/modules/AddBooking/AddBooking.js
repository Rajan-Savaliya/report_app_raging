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
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import DropDownPicker from "react-native-dropdown-picker";
import Feather from "react-native-vector-icons/Feather";
import Moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

import Header from "../../components/Header.component";

import {
  setLoadingSpinerAction,
  prodcutDataLogOut,
} from "../../redux/actions/productActions";

const singInCheck = yup.object({
  amount: yup.string().required("booking amount required"),
  remark: yup.string(),
  advanceAmount: yup.string(),
});

const AddBooking = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userToken, LoginInLoading } = useSelector((state) => state.authState);

  const [addImage, setAddImage] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [addImageError, setAddImageError] = useState(null);
  const [editImageState, setEditImageState] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    route &&
      route.params &&
      route.params.update &&
      route.params.item &&
      route.params.item.service_id
      ? route.params.item.service_id
      : null
  );
  const [items, setItems] = useState(
    route && route.params && route.params.serviceList
      ? route.params.serviceList
      : []
  );

  const [selectServiceError, setSelectServiceError] = useState("");
  const [selectCustomerError, setSelectCustomerError] = useState("");

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(
    route &&
      route.params &&
      route.params.update &&
      route.params.item &&
      route.params.item.customer_id
      ? route.params.item.customer_id
      : null
  );
  const [items2, setItems2] = useState(
    route && route.params && route.params.customerList
      ? route.params.customerList
      : []
  );

  const [activeDate, setActiveDate] = useState(1); //
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [stateDate, setStateDate] = useState(
    route &&
      route.params &&
      route.params.update &&
      route.params.item &&
      route.params.item.start_date &&
      !route.params.item.start_date.includes("0000") &&
      route.params.item.start_date.split("-").reverse().join("-")
      ? route.params.item.start_date.split("-").reverse().join("-")
      : Moment().format("DD-MM-YYYY")
  );
  const [endDate, setEndDate] = useState(
    route &&
      route.params &&
      route.params.update &&
      route.params.item &&
      route.params.item.end_date &&
      !route.params.item.end_date.includes("0000") &&
      route.params.item.end_date.split("-").reverse().join("-")
      ? route.params.item.end_date.split("-").reverse().join("-")
      : Moment().format("DD-MM-YYYY")
  );
  const [endDataSelected, setEndDateSelectedFocus] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);

    if (endDataSelected) {
      if (currentDate) {
        setEndDate(Moment(currentDate).format("DD-MM-YYYY"));
      } else if (endDate) {
        setEndDate(endDate);
      } else {
      }
    } else {
      if (currentDate) {
        setStateDate(Moment(currentDate).format("DD-MM-YYYY"));
      } else if (stateDate) {
        setStateDate(stateDate);
      } else {
      }
    }
  };

  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

  return (
    <>
      <StatusBar backgroundColor={"#FFFFFF"} barStyle="light-content" />

      <Spinner
        visible={LoginInLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFFFFF" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />
      <Header
        title={route.params.update ? "Update Booking" : "Add Booking"}
        leftIcon="keyboard-backspace"
        rightIcon="plus"
        headerColor={"#FFFFFF"}
        titleColor={"#000000"}
        iconColor={"#000000"}
        leftIconPress={() => navigation.goBack()}
      />

      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Formik
            initialValues={{
              amount:
                route &&
                route.params &&
                route.params.update &&
                route.params.item &&
                route.params.item.amount
                  ? route.params.item.amount
                  : "",
              remark:
                route &&
                route.params &&
                route.params.update &&
                route.params.item &&
                route.params.item.remark
                  ? route.params.item.remark
                  : "",
              advanceAmount:
                route &&
                route.params &&
                route.params.update &&
                route.params.item &&
                route.params.item.advance_amount
                  ? route.params.item.advance_amount
                  : "",
            }}
            validationSchema={singInCheck}
            onSubmit={(values, actions) => {
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  if (route && route.params && route.params.update) {
                    var myHeaders = new Headers();
                    dispatch(setLoadingSpinerAction(true));

                    myHeaders.append("Authorization", `Bearer ${userToken}`);

                    var formdata = new FormData();
                    var formdata = new FormData();

                    formdata.append("customer_id", value2);
                    formdata.append("service_id", value);
                    formdata.append(
                      "start_date",
                      stateDate.split("-").reverse().join("-")
                    );
                    formdata.append(
                      "end_date",
                      endDate.split("-").reverse().join("-")
                    );
                    formdata.append("amount", values.amount);
                    formdata.append("remark", values.remark);
                    formdata.append(
                      "booking_id",
                      route &&
                        route.params &&
                        route.params.item &&
                        route.params.item.id
                        ? route.params.item.id
                        : ""
                    );

                    var requestOptions = {
                      method: "POST",
                      headers: myHeaders,
                      body: formdata,
                      redirect: "follow",
                    };

                    fetch(
                      "https://rd.ragingdevelopers.com/atender/api/onetime/booking/updateBooking",
                      requestOptions
                    )
                      .then((response) => response.text())
                      .then((result) => {
                        var response = JSON.parse(result);
                        // if (
                        //   response &&
                        //   response.success === 0 &&
                        //   response.message.includes("Invalid Api Token")
                        // ) {
                        //   dispatch(prodcutDataLogOut());
                        // }
                        dispatch(setLoadingSpinerAction(false));
                        if (response && response.success) {
                          actions.resetForm();
                          navigation.goBack();

                          Toast.show({
                            text1: response.message
                              ? response.message
                              : "Create new Booking Successfully",
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
                    var myHeaders = new Headers();
                    dispatch(setLoadingSpinerAction(true));

                    myHeaders.append("Authorization", `Bearer ${userToken}`);

                    var formdata = new FormData();
                    var formdata = new FormData();
                    formdata.append("customer_id", value2);
                    formdata.append("service_id", value);
                    formdata.append(
                      "start_date",
                      stateDate.split("-").reverse().join("-")
                    );
                    formdata.append(
                      "end_date",
                      endDate.split("-").reverse().join("-")
                    );
                    formdata.append("amount", values.amount);
                    formdata.append("remark", values.remark);
                    formdata.append("advance_amount", values.advanceAmount);

                    var requestOptions = {
                      method: "POST",
                      headers: myHeaders,
                      body: formdata,
                      redirect: "follow",
                    };

                    fetch(
                      "https://rd.ragingdevelopers.com/atender/api/onetime/booking/addBooking",
                      requestOptions
                    )
                      .then((response) => response.text())
                      .then((result) => {
                        var response = JSON.parse(result);
                        // if (
                        //   response &&
                        //   response.success === 0 &&
                        //   response.message.includes("Invalid Api Token")
                        // ) {
                        //   dispatch(prodcutDataLogOut());
                        // }
                        dispatch(setLoadingSpinerAction(false));
                        if (response && response.success) {
                          actions.resetForm();
                          navigation.goBack();

                          Toast.show({
                            text1: response.message
                              ? response.message
                              : "Update Booking Successfully",
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
                    marginBottom: 7,
                  }}
                >
                  <Text style={{ color: "#333333" }}>Select Service</Text>
                </View>
                <DropDownPicker
                  placeholder="Select Service"
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
                    {selectServiceError ? selectServiceError : ""}
                  </Text>
                </View>

                <View
                  style={{
                    marginBottom: 7,
                    fontWeight: "bold",
                    marginVertical: 3,
                  }}
                >
                  <Text style={{ color: "#333333" }}>Select Customer</Text>
                </View>
                <DropDownPicker
                  placeholder="Select Customer"
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
                  open={open2}
                  value={value2}
                  items={items2}
                  setOpen={setOpen2}
                  setValue={setValue2}
                  setItems={setItems2}
                />
                <View style={{ marginBottom: 1, marginTop: 3 }}>
                  <Text style={{ color: "red" }}>
                    {selectCustomerError ? selectCustomerError : ""}
                  </Text>
                </View>

                {showDatePicker ? (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={datePickerDate}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                  />
                ) : null}
                <View
                  style={{
                    marginBottom: 7,
                    fontWeight: "bold",
                    marginVertical: 3,
                  }}
                >
                  <Text style={{ color: "#333333" }}>
                    Select Booking Start Date
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setEndDateSelectedFocus(false);

                    let datePickerStateDate = stateDate.split("-");
                    var datePickerStartDateDateObj = new Date(
                      datePickerStateDate[2],
                      datePickerStateDate[1] - 1,
                      datePickerStateDate[0]
                    );

                    setDatePickerDate(datePickerStartDateDateObj);
                    setShowDatePicker(true);
                  }}
                  style={{
                    backgroundColor: "#DDDDDD",
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 3,
                    borderBottomWidth: 3,
                    borderColor: "#282dd1",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ alignSelf: "flex-end", paddingRight: 7 }}>
                      <Feather name="calendar" color="#282dd1" size={18} />
                    </View>
                    <View>
                      <View>
                        <Text style={{ fontSize: 12, color: "#808080" }}>
                          Booking Start Date
                        </Text>
                      </View>

                      <View>
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 14.5,
                            fontWeight: "bold",
                          }}
                        >
                          {stateDate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    marginTop: 7,
                    marginBottom: 7,
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ color: "#333333" }}>
                    Select Booking End Date
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setEndDateSelectedFocus(true);
                    let datePickerStateDate = endDate.split("-");
                    var datePickerStartDateDateObj = new Date(
                      datePickerStateDate[2],
                      datePickerStateDate[1] - 1,
                      datePickerStateDate[0]
                    );

                    setDatePickerDate(datePickerStartDateDateObj);
                    setShowDatePicker(true);
                  }}
                  style={{
                    backgroundColor: "#DDDDDD",
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 3,
                    borderBottomWidth: 3,
                    borderColor: "#282dd1",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ alignSelf: "flex-end", paddingRight: 7 }}>
                      <Feather name="calendar" color="#282dd1" size={18} />
                    </View>
                    <View>
                      <View>
                        <Text style={{ fontSize: 12, color: "#808080" }}>
                          Booking End Date
                        </Text>
                      </View>

                      <View>
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 14.5,
                            fontWeight: "bold",
                          }}
                        >
                          {endDate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    marginBottom: 0,
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 7,
                      fontWeight: "bold",
                    }}
                  >
                    <Text style={{ color: "#333333" }}>Booking Amount</Text>
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
                        onPress={() => {}}
                        name={"pricetag"}
                        color="#1845B2"
                        size={18}
                      />
                    </View>

                    <TextInput
                      keyboardType="numeric"
                      underlineColorAndroid="transparent"
                      placeholder="Booking Amount"
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
                      onChangeText={props.handleChange("amount")}
                      onBlur={props.handleBlur("amount")}
                      value={props.values.amount}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.amount && props.errors.amount}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 2,
                      marginBottom: 7,
                      fontWeight: "bold",
                    }}
                  >
                    <Text style={{ color: "#333333" }}>
                      Booking Advance Amount
                    </Text>
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
                        onPress={() => {}}
                        name={"pricetag"}
                        color="#1845B2"
                        size={18}
                      />
                    </View>

                    <TextInput
                      keyboardType="numeric"
                      underlineColorAndroid="transparent"
                      placeholder="Booking Advance Amount"
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
                      onChangeText={props.handleChange("advanceAmount")}
                      onBlur={props.handleBlur("advanceAmount")}
                      value={props.values.advanceAmount}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.advanceAmount && props.errors.advanceAmount}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: -2,
                      marginBottom: 7,
                      fontWeight: "bold",
                    }}
                  >
                    <Text style={{ color: "#333333" }}>Remark</Text>
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
                        onPress={() => {}}
                        name={"ios-pencil-sharp"}
                        color="#1845B2"
                        size={18}
                      />
                    </View>

                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Remark"
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
                      onChangeText={props.handleChange("remark")}
                      onBlur={props.handleBlur("remark")}
                      value={props.values.remark}
                    />
                  </View>

                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.remark && props.errors.remark}
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
                    background={TouchableNativeFeedback.Ripple("#ECECEC")}
                    onPress={() => {
                      if (!value || !value2) {
                        setSelectServiceError(
                          value ? "" : "Please Select Service"
                        );
                        setSelectCustomerError(
                          value2 ? "" : "Please Select Customer"
                        );
                        return true;
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
                          ? "Update Booking"
                          : "Add Booking"}
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

export default AddBooking;
