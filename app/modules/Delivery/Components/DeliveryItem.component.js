/* eslint-disable radix */
import React, { memo } from "react";
import { TouchableOpacity, View, Text, Alert, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "react-native-paper";

import {
  setDeliveryStatus,
  selectionOrderSelectAddAction,
  SelectionOrderRemoveAction,
} from "../../../redux/actions/productActions";

const DeliveryItem = ({ item, navigation, typeItem = "" }) => {
  const dispatch = useDispatch();
  const {
    selectPendingOrderState,
    selectPendingOrderCustomerIdList,
    selectPendingOrderServiceIdList,
  } = useSelector((state) => state.productState);

  return (
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
          {selectPendingOrderState && typeItem == "PENDING" ? (
            <>
              {selectPendingOrderCustomerIdList.find(
                (itemValueCheck) => itemValueCheck == item.id
              ) ? (
                <Checkbox
                  onPress={() => {
                    dispatch(SelectionOrderRemoveAction(item.id));
                  }}
                  color="#1845B2"
                  status={"checked"}
                />
              ) : (
                <Checkbox
                  onPress={() => {
                    dispatch(
                      selectionOrderSelectAddAction(item.id, item.service_id)
                    );
                  }}
                  color="#1845B2"
                  status={"unchecked"}
                  uncheckedColor="#808080"
                />
              )}
            </>
          ) : null}

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", width: "70%" }}>
              <View style={{ marginLeft: 6 }}>
                <View>
                  {typeItem == "ADDITIONAL" ? (
                    <Text
                      adjustsFontSizeToFit
                      minimumFontScale={0.8}
                      style={{ color: "#1845B2", fontSize: 14 }}
                    >
                      Customer Name:{" "}
                      {item.customer_name ? item.customer_name : ""}
                    </Text>
                  ) : (
                    <Text
                      adjustsFontSizeToFit
                      minimumFontScale={0.8}
                      style={{ color: "#1845B2", fontSize: 16 }}
                    >
                      Name: {item.name ? item.name : ""}
                    </Text>
                  )}
                </View>
                <View style={{}}>
                  <Text style={{ fontSize: 12.5 }}>
                    {typeItem == "ADDITIONAL" ? (
                      <Text
                        adjustsFontSizeToFit
                        minimumFontScale={0.8}
                        style={{ color: "#6e2af7", fontSize: 13 }}
                      >
                        Delivery Date:{" "}
                        {item.delivery_date ? item.delivery_date : ""}
                      </Text>
                    ) : (
                      <Text
                        adjustsFontSizeToFit
                        minimumFontScale={0.8}
                        style={{ color: "#6e2af7", fontSize: 13 }}
                      >
                        Address: {item.address ? item.address : ""}
                      </Text>
                    )}
                  </Text>
                </View>
                <View>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.1}
                    style={{ color: "#808080" }}
                  >
                    {typeItem == "ADDITIONAL" ? (
                      <Text
                        adjustsFontSizeToFit
                        minimumFontScale={0.8}
                        style={{ color: "#898989", fontSize: 13 }}
                      >
                        Mo. {item.customer_mobile ? item.customer_mobile : ""}
                      </Text>
                    ) : (
                      <Text
                        adjustsFontSizeToFit
                        minimumFontScale={0.8}
                        style={{ color: "#898989", fontSize: 13 }}
                      >
                        Mo. {item.mobile ? item.mobile : ""}
                      </Text>
                    )}
                  </Text>
                </View>
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
                    Bottle: {item.bottle ? item.bottle : ""}
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
          {item.week_days ? (
            <View
              style={{
                flexDirection: "row",
                marginLeft: 5,
                marginTop: 5,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginRight: Dimensions.get("window").width / 4,
                flexWrap: "wrap",
              }}
            >
              {item.week_days.split(",").map((value) => {
                return (
                  <View
                    style={{
                      marginTop: 3,
                      paddingVertical: 3,
                      paddingHorizontal: 8,
                      backgroundColor: "#1845B2", // F05454
                      borderRadius: 3,
                      marginHorizontal: 2,
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        textAlign: "center",
                        textTransform: "capitalize",
                        fontSize: 13.4,
                      }}
                    >
                      {value ? value : ""}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
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
              <Text style={{ color: "#FFFFFF", fontSize: 13.4 }}> Regular</Text>
            </View>
          )}

          {item.status ? (
            <View
              style={{
                marginLeft: 5,
                marginTop: 5,
                borderRadius: 3,
                borderColor:
                  item.status.includes("pend") || item.status.includes("PEN")
                    ? "orange"
                    : item.status.includes("deli") ||
                      item.status.includes("DELI")
                    ? "green"
                    : item.status.includes("can") || item.status.includes("CAN")
                    ? "red"
                    : "orange",
                borderWidth: 1,
                alignSelf: "flex-start",
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  color:
                    item.status.includes("pend") || item.status.includes("PEN")
                      ? "orange"
                      : item.status.includes("deli") ||
                        item.status.includes("DELI")
                      ? "green"
                      : item.status.includes("can") ||
                        item.status.includes("CAN")
                      ? "red"
                      : "orange",
                  fontSize: 14,
                }}
              >
                {item.status ? item.status : ""}
              </Text>
            </View>
          ) : null}
          {typeItem && (typeItem === "PENDING" || typeItem === "DELIVER") ? (
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "",
                    "Are You Sure You Want To Cancel This Delivery ?",
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
                            setDeliveryStatus(
                              item.id ? item.id : "",
                              item.service_id ? item.service_id : "",
                              "CANCELLED"
                            )
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
                  marginHorizontal: 6.5,
                  borderRadius: 3,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>
                  {typeItem === "DELIVER" ? "NOT DELIVERED" : "CANCEL"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default memo(DeliveryItem);
