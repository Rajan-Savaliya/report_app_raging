/* eslint-disable radix */
import React, { memo } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
  setBookingStatus,
  getPaymentItemsAction,
} from "../../../redux/actions/productActions";

const BookingItem = ({ item, navigation, typeItem = "" }) => {
  const dispatch = useDispatch();

  const { cardItems, customerItems } = useSelector(
    (state) => state.productState
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Payment", { item: item.id });
        dispatch(getPaymentItemsAction(item.id));
      }}
    >
      <View
        style={{
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 8,
          borderRadius: 10,
          overflow: "hidden",
          marginVertical: 10,
          marginHorizontal: 10,
          borderWidth: 0.3,
          borderColor: "#DDDDDD",
          position: "relative",
        }}
      >
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#F1F2F2",
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              position: "relative",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", width: "70%" }}>
                <View style={{ marginLeft: 6 }}>
                  <View>
                    <Text
                      adjustsFontSizeToFit
                      minimumFontScale={0.8}
                      style={{ color: "#1845B2", fontSize: 14 }}
                    >
                      Customer Name:{" "}
                      {item.customer_name ? item.customer_name : ""}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text style={{ fontSize: 12.5 }}>
                      <Text
                        adjustsFontSizeToFit
                        minimumFontScale={0.8}
                        style={{ color: "#6e2af7", fontSize: 13 }}
                      >
                        Address:{" "}
                        {item.customer_address ? item.customer_address : ""}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.1}
                      style={{ color: "#808080" }}
                    >
                      <Text
                        adjustsFontSizeToFit
                        minimumFontScale={0.8}
                        style={{ color: "#898989", fontSize: 13 }}
                      >
                        Mo. {item.customer_mobile ? item.customer_mobile : ""}
                      </Text>
                    </Text>
                  </View>
                  {item.remark ? (
                    <View style={{}}>
                      <Text style={{ fontSize: 12.5 }}>
                        <Text
                          adjustsFontSizeToFit
                          minimumFontScale={0.8}
                          style={{ color: "#1845B2", fontSize: 13 }}
                        >
                          Remark: {item.remark ? item.remark : ""}
                        </Text>
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <View style={{ width: "30%" }}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                ></View>
                <View style={{ marginRight: 5 }}>
                  <View style={{}}>
                    <Text
                      style={{
                        textAlign: "right",
                        color: "#808080",
                        fontSize: 15,
                      }}
                    >
                      {" "}
                      Amount: {item.amount ? item.amount : ""}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text style={{ textAlign: "right", color: "#808080" }}>
                      {item.service_name ? item.service_name : ""}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: 5,
                marginLeft: 5,
                alignSelf: "flex-start",
                paddingVertical: 3,
                paddingHorizontal: 8,
                backgroundColor: "#F05454",
                borderRadius: 3,
                marginHorizontal: 2,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {item.start_date && item.end_date ? (
                <Text style={{ color: "#FFFFFF", fontSize: 13.4 }}>
                  {item.start_date.split("-").reverse().join("-")} -{" "}
                  {item.end_date.split("-").reverse().join("-")}
                </Text>
              ) : item.state_date && !item.end_date ? (
                <Text style={{ color: "#FFFFFF", fontSize: 13.4 }}>
                  {item.start_date.split("-").reverse().join("-")}
                </Text>
              ) : !item.state_date && item.end_date ? (
                <Text style={{ color: "#FFFFFF", fontSize: 13.4 }}>
                  {item.end_date.split("-").reverse().join("-")}
                </Text>
              ) : null}
            </View>

            {item.status ? (
              <View
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  borderRadius: 3,
                  borderColor: "orange",
                  borderWidth: 1,
                  alignSelf: "flex-start",
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    color: "orange",
                    fontSize: 14,
                  }}
                >
                  {item.status ? item.status : ""}
                </Text>
              </View>
            ) : null}
            {typeItem && typeItem === "PENDING" ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setBookingStatus(item.id ? item.id : "", "DONE"));
                  }}
                  style={{
                    flex: 0.5,
                    alignItems: "center",
                    backgroundColor: "#63cf46",
                    marginHorizontal: 7,
                    borderRadius: 3,
                    paddingVertical: 5,
                  }}
                >
                  <Text style={{ color: "#FFFFFF" }}>COMPLETE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "",
                      "Are You Sure You Want To Cancel This Booking ?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => {
                            dispatch(
                              setBookingStatus(item.id ? item.id : "", "CANCEL")
                            );
                          },
                        },
                      ]
                    );
                  }}
                  style={{
                    flex: 0.5,
                    alignItems: "center",
                    backgroundColor: "#ed5045",
                    marginHorizontal: 7,
                    borderRadius: 3,
                    paddingVertical: 5,
                  }}
                >
                  <Text style={{ color: "#FFFFFF" }}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>

        <View
          style={{
            zIndex: 5,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            right: "3%",
            bottom: typeItem == "PENDING" ? "30%" : "10%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Payment", { item: item.id });
              dispatch(getPaymentItemsAction(item.id));
            }}
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#1845B2",
              padding: 5,
              marginRight: 5,
            }}
          >
            <Ionicons name={"pricetag"} color="#1845B2" size={18} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let serviceSelectionList = [];
              let customerSelectionList = [];

              cardItems.forEach((valuesitem) => {
                serviceSelectionList.push({
                  label: valuesitem.name,
                  value: valuesitem.id,
                });
              });

              customerItems.forEach((valueItemCustomer) => {
                customerSelectionList.push({
                  label: valueItemCustomer.name,
                  value: valueItemCustomer.id,
                });
              });

              navigation.navigate("AddBooking", {
                serviceList: serviceSelectionList,
                customerList: customerSelectionList,
                update: true,
                item: item,
              });
            }}
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#1845B2",
              padding: 5,
            }}
          >
            <MaterialIcons name={"edit"} color="#1845B2" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(BookingItem);
