import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import AppConstant from "../appConstants/AppConstants";

import { LaterUpdate } from "../redux/actions/authActons.js";

const UpdateAppModal = () => {
  const dispatch = useDispatch();

  const { updateModal, forceUpdateModal } = useSelector(
    (state) => state.authState
  );

  return (
    <Modal animationIn="slideInUp" isVisible={updateModal}>
      <View
        style={{
          backgroundColor: "#F6F7FB",
          borderRadius: 10,
          marginHorizontal: 10,
          paddingBottom: 20,
          elevation: 2,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: -5,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17, color: "#333333" }}>
            {" "}
            New Version of App is Available
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {!forceUpdateModal ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(LaterUpdate());
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 7,
                paddingHorizontal: 10,
                marginVertical: 0,
                marginHorizontal: 3,
                borderColor: "#CD9B46",
                backgroundColor: "#F6F7FB",
                borderWidth: 1,
                borderRadius: 2,
                marginRight: 5,
                width: "35%",
              }}
            >
              <Text style={{ color: "#CD9B46" }}>Later</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              if (AppConstant.APP_TECHNICAL_ID) {
                try {
                  Linking.openURL(
                    `https://play.google.com/store/apps/details?id=${AppConstant.APP_TECHNICAL_ID}`
                  );
                } catch (e) {}
              }
            }}
            style={{
              marginLeft: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#CD9B46",
              paddingVertical: 7,
              paddingHorizontal: 10,
              marginVertical: 0,
              marginHorizontal: 3,
              borderColor: "#F6F7FB",
              borderWidth: 0.25,
              borderRadius: 2,
              width: "35%",
            }}
          >
            <Text style={{ color: "#FFFFFF" }}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateAppModal;
