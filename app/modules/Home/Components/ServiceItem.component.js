/* eslint-disable radix */
import React, { memo } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  Alert,
  Linking,
  ToastAndroid,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Moment from "moment";

import {
  applyFilterAction,
  clearAllFilter,
  getProductsAction,
  getLikeCardItemsAction,
  getGroupAndSizeId,
  getCardItemsAction,
  getCustomerItemsAction,
  customerDeliveryDetailByID,
} from "../../../redux/actions/productActions";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ServiceItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const {
    loadingSpinner,
    cardItems,
    totalDebit,
    totalCredit,
    cardItemsError,
    customerItems,
  } = useSelector((state) => state.productState);

  const callThePersonAction = () => {
    if (item.customer_mobile) {
      var messageString = `Are you sure you want to call ${
        item.customer_name ? item.customer_name : "this customer"
      } (${item.customer_mobile})`;
      Alert.alert("", messageString, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            try {
              Linking.openURL(`tel:${item.customer_mobile}`);
            } catch (e) {
              ToastAndroid.show(`number is not valid`, ToastAndroid.LONG);
            }
          },
        },
      ]);
    } else {
      ToastAndroid.show(
        `${
          item.customer_name ? item.customer_name : "Customer"
        } Mobile Number is not available`,
        ToastAndroid.LONG
      );
      // Alert.alert("", "Customer Mobile Number is not available", [
      //   {
      //     text: "Cancel",
      //     onPress: () => console.log("Cancel Pressed"),
      //     style: "cancel",
      //   },
      //   { text: "OK", onPress: () => console.log("OK Pressed") },
      // ]);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        let customerSelectionList = [];

        customerItems.forEach((valueItemCustomer) => {
          customerSelectionList.push({
            label: valueItemCustomer.customer_name,
            value: valueItemCustomer.customer_id,
          });
        });

        dispatch(
          customerDeliveryDetailByID("", Moment().format("YYYY-MM-DD"), "24")
        );
        navigation.navigate("CustomerDeliveryDate", {
          customerId: item.customer_id,
          customerList: customerSelectionList,
        });
      }}
      style={{
        paddingVertical: 10,
        paddingTop: 10,
        marginTop: 10,
        marginHorizontal: 15,
        marginBottom: 5,
        borderRadius: 5,
        position: "relative",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      <View style={{ flexDirection: "row", elevation: 1 }}>
        <View
          style={{
            marginLeft: 10,
            justifyContent: "space-between",
            flex: 0.8,
          }}
        >
          <View style={{ marginBottom: 5 }}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#1845B2",
                  flex: 0.5,
                  flexWrap: "wrap",
                }}
              >
                {item.customer_name ? item.customer_name : ""}{" "}
              </Text>
            </View>
            {item.customer_mobile ? (
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 12.5,
                    color: "#808080",
                    flex: 0.5,
                    flexWrap: "wrap",
                  }}
                >
                  {item.customer_mobile ? item.customer_mobile : ""}{" "}
                </Text>
              </View>
            ) : null}

            <View style={{ marginTop: 5 }}>
              <Text
                style={{
                  fontSize: 15,
                  color: "#26c957",
                  flex: 0.5,
                  flexWrap: "wrap",
                }}
              >
                Credit: {item.credit || item.credit == 0 ? item.credit : "-"}
              </Text>
            </View>

            <View style={{}}>
              <Text
                style={{
                  fontSize: 15,
                  color: "#ff3636",
                  flex: 0.5,
                  flexWrap: "wrap",
                }}
              >
                Debit: {item.debit || item.debit == 0 ? ` ${item.debit}` : " -"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginLeft: 10,
            justifyContent: "space-between",
            flex: 0.2,
          }}
        >
          <View style={{ marginBottom: 5 }}>
            <View
              style={{
                marginRight: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#808080",
                  flex: 0.2,
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  alignSelf: "flex-end",
                }}
              >
                {item.days ? item.days : ""}{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          callThePersonAction();
          // navigation.navigate("AddService", {
          //   id: item.id,
          //   name: item.name,
          //   description: item.description,
          //   price: item.price,
          //   image: item.image,
          //   update: true,
          // });
        }}
        style={{
          zIndex: 5,
          position: "absolute",
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#26c957",
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
          right: "3%",
          bottom: "10%",
        }}
      >
        <MaterialIcons name={"call"} color="#26c957" size={18} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default memo(ServiceItem);
