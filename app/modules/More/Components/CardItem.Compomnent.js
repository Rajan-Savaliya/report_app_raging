/* eslint-disable radix */
import React, { memo } from "react";
import {
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  View,
  Text,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import Share from "react-native-share";
import AppConstants from "../../../appConstants/AppConstants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  addCardItemsAction,
  RemoveCardItemsAction,
  setRemarkModalValues,
  setSizeModalValues,
  setGroupModalValues,
  prodcutDataLogOut,
} from "../../../redux/actions/productActions.js";

import { LogOutAction } from "../../../redux/actions/authActons";

const CardItem = ({ item, navigation }) => {
  const dispatch = useDispatch();

  const { sizeListItems, groupListItems } = useSelector(
    (state) => state.productState
  );
  const { userFirstName, userLastName } = useSelector(
    (state) => state.authState
  );

  const Touchable =
    Platform.OS === "iOS" ? TouchableHighlight : TouchableNativeFeedback;

  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          overflow: "hidden",
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <TouchableNativeFeedback
          onPress={() => {
            if (item.name == "Log Out") {
              dispatch(prodcutDataLogOut());
            }
            if (item.name == "About Us") {
              navigation.navigate("AboutUs");
            }
            if (item.name == "Share App") {
              const share = async () => {
                try {
                  await Share.open({
                    title:
                      "Atender Application is designed for grow and maintain Business based on Services.",
                    url: `https://play.google.com/store/apps/details?id=${AppConstants.APP_TECHNICAL_ID}`,
                    message: `Atender Application is for all business who Provided services. It is very useful for Daily services. It is very helpful for maintain business Report and customers through this application. This application always provide Update for customer of his needs.`,
                  });
                } catch (err) {}
              };
              share();
            }
            if (item.name == "Rate Us") {
              Linking.openURL(
                `https://play.google.com/store/apps/details?id=${AppConstants.APP_TECHNICAL_ID}`
              );
            }
          }}
          underlayColor="#1845B2"
          background={TouchableNativeFeedback.Ripple("#1845B2")}
          style={{}}
        >
          <View
            style={{
              paddingVertical: 13,
              paddingHorizontal: 8,
              backgroundColor: "#e8ebed",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ marginLeft: 5 }}>
              {item.name == "About Us" ? (
                <Ionicons name="information-circle" size={25} color="#1845B2" />
              ) : item.name == "Contact Us" ? (
                <MaterialCommunityIcons
                  name="contacts"
                  size={25}
                  color="#1845B2"
                />
              ) : item.name == "Share App" ? (
                <MaterialCommunityIcons
                  name="share"
                  size={25}
                  color="#1845B2"
                />
              ) : item.name == "Log Out" ? (
                <MaterialCommunityIcons
                  name="logout"
                  size={25}
                  color="#1845B2"
                />
              ) : item.name == `${userFirstName} ${userLastName}` ? (
                <MaterialCommunityIcons
                  name="account"
                  size={25}
                  color="#1845B2"
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-star"
                  size={25}
                  color="#1845B2"
                />
              )}
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text>{item.name ? item.name : ""}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </>
  );
};

export default memo(CardItem);
