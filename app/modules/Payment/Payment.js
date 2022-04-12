/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import { SafeView } from "./Payment.Style.js";
import { FAB } from "react-native-paper";
import PaymentAddBookingModal from "../Booking/Components/PaymentAddBookingModal";

import {
  stoneValueChangeAction,
  payMentMethodAddModalToggle,
} from "../../redux/actions/authActons";

import PaymentCard from "./Components/PaymentCard.component";
import Header from "../../components/Header.component";

import TotalPaymentListModal from "./Components/TotalPaymentListModal";

const Payment = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { paymentItemList, paymentItemError, paymentItemLoading } = useSelector(
    (state) => state.productState
  );

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const renderCardItem = ({ item }) => {
    return <PaymentCard navigation={navigation} item={item} />;
  };

  return (
    <SafeView bgColor={"#FFFFFF"}>
      <Header
        title={"Payments"}
        leftIcon="keyboard-backspace"
        rightIcon="plus"
        headerColor={"#FFFFFF"}
        titleColor={"#000000"}
        iconColor={"#000000"}
        leftIconPress={() => navigation.goBack()}
      />
      <TotalPaymentListModal />
      <PaymentAddBookingModal
        bookingIdPass={
          route.params && route.params.item ? route.params.item : ""
        }
      />

      {paymentItemLoading ? (
        <View
          style={{
            bottom: 30,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size={40} color="#1845B2" />
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "#000000", fontSize: 17 }}>Loading</Text>
          </View>
        </View>
      ) : paymentItemError ||
        (Array.isArray(paymentItemError) && paymentItemList.length === 0) ? (
        <View
          style={{
            bottom: 30,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ marginTop: 10 }}>
            {Array.isArray(paymentItemList) && paymentItemList.length === 0 ? (
              <View>
                <Text style={{ top: 10, color: "#000000", fontSize: 17 }}>
                  No Any Payment Data Found
                </Text>
              </View>
            ) : (
              <Text style={{ color: "#000000", fontSize: 17 }}>
                {paymentItemError ? paymentItemError : "Something went wrong"}
              </Text>
            )}
          </View>
        </View>
      ) : (
        <>
          <FlatList
            removeClippedSubviews={true}
            maxToRenderPerBatch={15} // 5
            updateCellsBatchingPeriod={5} // 50
            initialNumToRender={10} // 3
            windowSize={5} // 5
            legacyImplementation={true}
            data={paymentItemList}
            renderItem={renderCardItem}
            contentContainerStyle={{
              paddingBottom: 100,
              marginBottom: 100,
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
      <FAB
        style={{
          backgroundColor: "#1845B2",
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        color="#ffffff"
        onPress={() => {
          dispatch(
            payMentMethodAddModalToggle(
              true,
              route.params && route.params.item ? route.params.item : ""
            )
          );
        }}
      />
    </SafeView>
  );
};

export default Payment;
