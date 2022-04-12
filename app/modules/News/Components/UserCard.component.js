/* eslint-disable radix */
import React, { memo } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";

const UserCard = ({ item, navigation }) => {
  const { cardItems } = useSelector((state) => state.productState);
  const { userServiceType } = useSelector((state) => state.authState);

  return (
    <View
      style={{
        marginTop: 15,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        position: "relative",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        overflow: "hidden",
        backgroundColor: "#F1F2F2",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", width: "70%" }}>
          <View style={{ marginLeft: 6 }}>
            <View>
              <Text style={{ color: "#1845B2", fontSize: 17 }}>
                Name: {item.name ? item.name : ""}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12.5 }}>
                Address: {item.address ? item.address : ""}
              </Text>
            </View>
            <View>
              <Text style={{ color: "#808080" }}>
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
            {userServiceType == "Daily" ? (
              <View style={{}}>
                <Text style={{ textAlign: "right", color: "#808080" }}>
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
      {item.week_days && userServiceType == "Daily" ? (
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
                  backgroundColor: "#1845B2",
                  borderRadius: 3,
                  marginHorizontal: 2,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: "#dddddd",
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
      ) : userServiceType == "Daily" ? (
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
          <Text style={{ color: "#dddddd", fontSize: 13.4 }}> Regular</Text>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={() => {
          let serviceSelectionList = [];

          cardItems.forEach((valuesitem) => {
            serviceSelectionList.push({
              label: valuesitem.name,
              value: valuesitem.id,
            });
          });

          navigation.navigate("AddUser", {
            userId: item.id,
            serviceId: item.service_id,
            name: item.name,
            address: item.address,
            mobile: item.mobile,
            bottle: item.bottle,
            service: item.service_name,
            days: item.week_days ? item.week_days : null,
            update: true,
            serviceList: serviceSelectionList,
          });
        }}
        style={{
          zIndex: 5,
          position: "absolute",
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#1845B2",
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
          right: "3%",
          top: "80%",
        }}
      >
        <MaterialIcons name={"edit"} color="#1845B2" size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(UserCard);
