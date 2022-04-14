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

import { SafeView } from "./Home.Style.js";

import { TabView } from "react-native-tab-view";
import { getWhisListData } from "../../redux/actions/productActions.js";

import Spinner from "react-native-loading-spinner-overlay";

import CustomeTabbarDelivery from "../../components/CustomeTabbarDelivery";
import CancelTab from "./Tab/Cancel.tab";
import DeliverTab from "./Tab/Deliver.tab";
import PendingTab from "./Tab/Pending.tab";

import AdditionalTab from "./Tab/additional.tab.js";

const { width } = Dimensions.get("window");

const Delivery = ({ navigation }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({ open: false });

  const { open } = state;

  const {
    loadingSpinner,
    pendingDeliveryOrder,
    doneDeliveryOrder,
    cancelDeliveryOrder,
    additionalDeliveryOrder,
  } = useSelector((state) => state.productState);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getWhisListData());
    });

    return unsubscribe;
  }, [navigation]);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "four", title: "Additional" },
    { key: "first", title: "Pending" },
    { key: "second", title: "Delivered" },
    { key: "third", title: "Cancelled" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <PendingTab navigation={navigation} />;
      case "second":
        return <DeliverTab navigation={navigation} />;
      case "third":
        return <CancelTab navigation={navigation} />;
      case "four":
        return <AdditionalTab navigation={navigation} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => {
    return (
      <CustomeTabbarDelivery
        deliveryPendingNumber={
          pendingDeliveryOrder &&
          Array.isArray(pendingDeliveryOrder) &&
          pendingDeliveryOrder.length > 0
            ? pendingDeliveryOrder.length
            : 0
        }
        deliveryDoneNumber={
          doneDeliveryOrder &&
          Array.isArray(doneDeliveryOrder) &&
          doneDeliveryOrder.length > 0
            ? doneDeliveryOrder.length
            : 0
        }
        deliveryCanNumber={
          cancelDeliveryOrder &&
          Array.isArray(cancelDeliveryOrder) &&
          cancelDeliveryOrder.length > 0
            ? cancelDeliveryOrder.length
            : 0
        }
        deliveryAddNumber={
          additionalDeliveryOrder &&
          Array.isArray(additionalDeliveryOrder) &&
          additionalDeliveryOrder.length > 0
            ? additionalDeliveryOrder.length
            : 0
        }
        TabTotalItem={4}
        props={props}
        isDarkTheme={false}
        scroll={true}
      />
    );
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
            Delivery
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
    </SafeView>
  );
};

export default Delivery;
