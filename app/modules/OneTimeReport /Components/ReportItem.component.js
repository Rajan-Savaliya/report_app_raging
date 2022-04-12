/* eslint-disable radix */
import React, { memo } from "react";
import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";

import { customerDeliveryDetailByID } from "../../../redux/actions/productActions";
import Moment from "moment";

const ReportItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback>
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
                </View>
              </View>
              <View style={{ width: "30%" }}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                ></View>
                <View style={{}}>
                  {item.status ? (
                    <View
                      style={{
                        marginTop: 2,
                        borderRadius: 3,
                        borderColor: item.status.includes("CAN")
                          ? "red"
                          : item.status.includes("DELI")
                          ? "green"
                          : item.status.includes("DONE")
                          ? "green"
                          : "orange",
                        borderWidth: 1,
                        alignSelf: "flex-end",
                        paddingHorizontal: 10,
                        left: -5,
                      }}
                    >
                      <Text
                        style={{
                          color: item.status.includes("CAN")
                            ? "red"
                            : item.status.includes("DELI")
                            ? "green"
                            : item.status.includes("DONE")
                            ? "green"
                            : "orange",
                          fontSize: 14,
                        }}
                      >
                        {item.status ? item.status : ""}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View style={{ marginRight: 5, marginTop: 3 }}>
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
          </View>

          <View
            style={{
              borderRadius: 10,
              borderColor: "#FFFFFF",
              borderWidth: 0.5,
              marginHorizontal: 5,
              marginVertical: 5,
              backgroundColor: "#DDDDDD",
              paddingVertical: 5,
              paddingHorizontal: 4,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text>Amount:</Text>
              </View>
              <View>
                <Text>{item.amount ? item.amount : "-"}</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text>Advance Amount</Text>
              </View>
              <View>
                <Text>{item.advance_amount ? item.advance_amount : "-"}</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text>Remark:</Text>
              </View>
              <View
                style={
                  item.remark && item.remark.length > 25
                    ? { width: "80%" }
                    : { margin: 0 }
                }
              >
                <Text style={{ color: "#1845B2" }}>
                  {item.remark ? item.remark : "-"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(ReportItem);
