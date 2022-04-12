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

import DeliveryItem from "../Components/DeliveryItem.component";
import { getDeliveryAction } from "../../../redux/actions/productActions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DeliverTab = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getDeliveryAction());
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const {
    doneDeliveryOrder,
    loadingSpinner,
    deliveryItems,
    deliveryItemsError,
    deliveryItemsLoading,
  } = useSelector((state) => state.productState);
  const renderCardItem = ({ item }) => {
    return (
      <DeliveryItem navigation={navigation} item={item} typeItem="DELIVER" />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {deliveryItemsLoading ? (
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
      ) : deliveryItemsError ||
        (Array.isArray(doneDeliveryOrder) && doneDeliveryOrder.length === 0) ? (
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
              {Array.isArray(doneDeliveryOrder) &&
              doneDeliveryOrder.length === 0 ? (
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
                      {deliveryItemsError
                        ? deliveryItemsError
                        : "No Delivery Data Found"}
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
            data={doneDeliveryOrder}
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

export default DeliverTab;
