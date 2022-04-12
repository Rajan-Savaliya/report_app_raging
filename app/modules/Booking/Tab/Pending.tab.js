/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import BookingItem from "../Components/BookingItem.component";
import { getBookingAction } from "../../../redux/actions/productActions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const PendingTab = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getBookingAction());
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const {
    pendingBookingList,
    loadingSpinner,
    deliveryItems,
    bookingError,
    bookingLoadingItem,
    selectPendingOrderState,
  } = useSelector((state) => state.productState);
  const renderCardItem = ({ item }) => {
    return (
      <BookingItem navigation={navigation} item={item} typeItem="PENDING" />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {bookingLoadingItem ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              bottom: 30,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginTop: (Dimensions.get("window").height - 200) / 2,
            }}
          >
            <ActivityIndicator size={40} color="#1845B2" />
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "#000000", fontSize: 17 }}>Loading</Text>
            </View>
          </View>
        </ScrollView>
      ) : bookingError ||
        (Array.isArray(pendingBookingList) &&
          pendingBookingList.length === 0) ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              marginTop: (Dimensions.get("window").height - 200) / 2,
              bottom: 30,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View style={{ marginTop: 10 }}>
              {Array.isArray(pendingBookingList) &&
              pendingBookingList.length === 0 ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 70, height: 70, resizeMode: "cover" }}
                    source={require("../../../assets/work.jpg")}
                  />
                  <View>
                    <Text style={{ top: 10, color: "#000000", fontSize: 17 }}>
                      {bookingError
                        ? bookingError
                        : "Not Any Pending Booking Data Found"}
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={{ color: "#000000", fontSize: 17 }}>
                  {bookingError ? bookingError : "Something went wrong"}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            removeClippedSubviews={true}
            maxToRenderPerBatch={15}
            updateCellsBatchingPeriod={5}
            initialNumToRender={10}
            windowSize={5}
            legacyImplementation={true}
            data={pendingBookingList}
            renderItem={renderCardItem}
            contentContainerStyle={{
              paddingBottom: 100,
              marginBottom: 100,
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

export default PendingTab;
