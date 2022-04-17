/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Linking,
  ToastAndroid,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";

import { SafeView } from "./Home.Style.js";

import WhishListItem from "./Components/WhishListItem";
import Moment from "moment";
import { getWhisListData } from "../../redux/actions/productActions.js";
import DateTimePicker from "@react-native-community/datetimepicker";

import Spinner from "react-native-loading-spinner-overlay";
import Header from "../../components/Header.component";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FAB } from "react-native-paper";

const { width } = Dimensions.get("window");

const WhishList = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { sliderList, homeItemList } = useSelector((state) => state.authState);
  const {
    loadingSpinner,
    pendingDeliveryOrder,
    deliveryItemsError,
    deliveryItemsLoading,
    customerFullData,
  } = useSelector((state) => state.productState);

  const [stateDate, setStateDate] = useState(null);

  const [endDate, setEndDate] = useState(Moment().format("DD-MM-YYYY"));

  const [value, setValue] = useState(
    route.params && route.params.customerId ? route.params.customerId : ""
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getWhisListData());
    });

    return unsubscribe;
  }, [navigation]);

  const renderCardItem = ({ item }) => {
    return <WhishListItem navigation={navigation} item={item} />;
  };

  return (
    <SafeView bgColor={"#FFFFFF"}>
      <StatusBar backgroundColor={"#4287f5"} barStyle="light-content" />
      <Spinner
        visible={false}
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />
      <Header
        title="Whish List"
        leftIcon="keyboard-backspace"
        rightIcon="file-pdf-box"
        headerColor={"#FFFFFF"}
        titleColor={"#000000"}
        iconColor={"#000000"}
        leftIconPress={() => navigation.goBack()}
      />

      {deliveryItemsLoading ? (
        <View
          style={{
            bottom: 30,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size={40} color="#4287f5" />
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "#000000", fontSize: 17 }}>Loading</Text>
          </View>
        </View>
      ) : deliveryItemsError ||
        (Array.isArray(pendingDeliveryOrder) &&
          pendingDeliveryOrder.length === 0) ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            bottom: 20,
          }}
        >
          <View style={{ marginTop: 10 }}>
            {Array.isArray(pendingDeliveryOrder) &&
            pendingDeliveryOrder.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 70, height: 70, resizeMode: "cover" }}
                  source={require("../../assets/work.jpg")}
                />
                <View>
                  <Text style={{ top: 10, color: "#000000", fontSize: 17 }}>
                    {deliveryItemsError ? deliveryItemsError : "No Data Found!"}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ color: "#000000", fontSize: 17 }}>
                {deliveryItemsError
                  ? deliveryItemsError
                  : "Something went wrong"}
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
            data={pendingDeliveryOrder}
            renderItem={renderCardItem}
            contentContainerStyle={{
              paddingBottom: 100,
              marginBottom: 100,
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </SafeView>
  );
};

export default WhishList;
