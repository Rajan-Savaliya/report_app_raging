/* eslint-disable radix */
import React from "react";
import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";

import { customerDeliveryDetailByID } from "../../../redux/actions/productActions";
import Moment from "moment";

const ReportItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(
          customerDeliveryDetailByID(
            Moment().startOf("month").format("DD-MM-YYYY"),
            Moment().endOf("month").format("DD-MM-YYYY"),
            item.id
          )
        );
        navigation.navigate("CustomerDeliveryDate", { customerId: item.id });
      }}
    >
      <View
        style={{
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
          borderRadius: 10,
          overflow: "hidden",
          marginTop: 15,
          marginBottom: 5,
          // marginVertical: 10,
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", width: "70%" }}>
                <View style={{ marginLeft: 6 }}>
                  <View>
                    <Text style={{ color: "#1845B2", fontSize: 17 }}>
                      Name: {item.name ? item.name : ""}
                    </Text>
                  </View>
                  <View>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.8}
                      style={{ color: "#808080" }}
                    >
                      Mo. {item.mobile ? item.mobile : ""}
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
                <View style={{ marginRight: 5, marginLeft: 3 }}>
                  {item.bottle ? (
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
                  ) : null}
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
                        // flex: 1,
                        marginTop: 3,
                        paddingVertical: 3,
                        paddingHorizontal: 8,
                        backgroundColor: "#1845B2",
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
                <Text style={{ color: "#dddddd", fontSize: 13.4 }}>
                  {" "}
                  Regular
                </Text>
              </View>
            )}
          </View>

          {/*  */}

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
                <Text>Service price:</Text>
              </View>
              <View>
                <Text>{item.service_price ? item.service_price : "-"}</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text>Unit:</Text>
              </View>
              <View>
                <Text>{item.unit ? item.unit : "-"}</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text>Total price:</Text>
              </View>
              <View>
                <Text style={{ color: "#1845B2" }}>
                  {item.total ? item.total : "-"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ReportItem;
