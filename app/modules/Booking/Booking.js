/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";
import { FAB } from "react-native-paper";
import { SafeView } from "./Home.Style.js";

import DeliveryItem from "./Components/BookingItem.component";
import { TabView } from "react-native-tab-view";
import { getBookingAction } from "../../redux/actions/productActions.js";

import Spinner from "react-native-loading-spinner-overlay";

import CustomeTabbar from "../../components/CustomeTabbar";

import CancelTab from "./Tab/Cancel.tab";
import BookingTab from "./Tab/Booking.tab";
import PendingTab from "./Tab/Pending.tab";

import AdditionalTab from "./Tab/additional.tab.js";

const { width } = Dimensions.get("window");

const Booking = ({ navigation }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({ open: false });

  const { open } = state;

  const {
    loadingSpinner,
    cardItems,
    customerItems,
    pendingBookingList,
    completeBookingList,
    cancelBookingList,
  } = useSelector((state) => state.productState);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getBookingAction());
    });

    return unsubscribe;
  }, [navigation]);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Pending" },
    { key: "second", title: "Completed" },
    { key: "third", title: "Cancelled" },
    // { key: "four", title: "Additional" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <PendingTab navigation={navigation} />;
      case "second":
        return <BookingTab navigation={navigation} />;
      case "third":
        return <CancelTab navigation={navigation} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => {
    return (
      <CustomeTabbar
        bookPendingNumber={
          pendingBookingList &&
          Array.isArray(pendingBookingList) &&
          pendingBookingList.length > 0
            ? pendingBookingList.length
            : 0
        }
        bookCompNumber={
          completeBookingList &&
          Array.isArray(completeBookingList) &&
          completeBookingList.length > 0
            ? completeBookingList.length
            : 0
        }
        bookCanNumber={
          cancelBookingList &&
          Array.isArray(cancelBookingList) &&
          cancelBookingList.length > 0
            ? cancelBookingList.length
            : 0
        }
        props={props}
        isDarkTheme={false}
        scroll={true}
      />
    );
  };

  const SilderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <FastImage
        style={{ width, flex: 1 }}
        source={{
          uri: item.image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
    </View>
  );

  const renderCardItem = ({ item }) => {
    return <DeliveryItem navigation={navigation} item={item} />;
  };

  return (
    <SafeView bgColor={"#FFFFFF"}>
      <StatusBar backgroundColor={"#1845B2"} barStyle="light-content" />
      <Spinner
        visible={loadingSpinner}
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 7,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 8,
          backgroundColor: "#1845B2",
        }}
      >
        <View style={{}}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}>
            Booking
          </Text>
        </View>
      </View>

      <TabView
        scrollEnabled={true}
        isDarkTheme={false}
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

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
          });
        }}
      />
    </SafeView>
  );
};

export default Booking;
