/* eslint-disable radix */
import React, { memo } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const PaymentCard = ({ item, navigation }) => {
  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (Array.isArray(item.payment) && item.payment.length > 0) {
        } else {
          Toast.show({
            text1: "Payment data history not available",
            visibilityTime: 3000,
            autoHide: true,
            position: "top",
            type: "error",
          });
        }
      }}
    >
      <View>
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
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", width: "70%" }}>
                  <View style={{ marginLeft: 6 }}>
                    <View>
                      <Text style={{ color: "#1845B2", fontSize: 16 }}>
                        <Text style={{ fontSize: 14 }}>Customer Name: </Text>
                        <Text style={{ fontSize: 16 }}>
                          {" "}
                          {item.customer_name ? item.customer_name : ""}
                        </Text>
                      </Text>
                    </View>
                    <View>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.8}
                        style={{ color: "#808080" }}
                      >
                        Mo. {item.customer_mobile ? item.customer_mobile : ""}
                      </Text>
                    </View>

                    <View>
                      <View>
                        <Text style={{ fontSize: 12.5 }}>
                          Address:{" "}
                          {item.customer_address ? item.customer_address : ""}{" "}
                        </Text>
                      </View>
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
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Total Amount:</Text>
                </View>
                <View>
                  <Text>
                    {item.amount || item.amount == 0 ? item.amount : "-"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Received:</Text>
                </View>
                <View>
                  <Text>
                    {item.received || item.received == 0 ? item.received : "-"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Remaining:</Text>
                </View>
                <View>
                  <Text style={{ color: "#1845B2" }}>
                    {item.remaining || item.remaining == 0
                      ? item.remaining
                      : "-"}
                  </Text>
                </View>
              </View>
            </View>

            {/*  */}
          </View>
        </View>

        {Array.isArray(item.payment) && item.payment.length > 0 ? (
          <>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 17, color: "#808080" }}>
                {" "}
                Payment List
              </Text>
            </View>
          </>
        ) : null}

        {item && Array.isArray(item.payment) && item.payment.length > 0 ? (
          <View>
            {item.payment.map((itemValues, index) => (
              <View key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    borderRadius: 5,
                    borderWidth: 0.3,
                    borederColor: "#dddddd",
                    marginHorizontal: 10,
                    marginVertical: 5,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <View style={{ flex: 0.4, alignSelf: "center" }}>
                    <Image
                      source={
                        itemValues.image
                          ? {
                              uri: `https://rd.ragingdevelopers.com/atender/assets/images/services/${item.image}`,
                            }
                          : require("../../../assets/work.jpg")
                      }
                      style={{ width: "90%", height: 70 }}
                    />
                  </View>
                  <View style={{ flex: 0.6 }}>
                    <View>
                      <Text>
                        Amount: {itemValues.amount ? itemValues.amount : "-"}
                      </Text>
                    </View>
                    <View>
                      <Text>
                        Remark: {itemValues.remark ? itemValues.remark : "-"}
                      </Text>
                    </View>
                    <View>
                      <Text>
                        Date:{" "}
                        {itemValues.created_at
                          ? `${itemValues.created_at
                              .split(" ")[0]
                              .split("-")
                              .reverse()
                              .join("-")} ${
                              itemValues.created_at.split(" ")[1]
                            }`
                          : "-"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(PaymentCard);
