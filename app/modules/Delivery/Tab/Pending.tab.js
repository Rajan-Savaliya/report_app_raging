/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DeliveryItem from "../Components/DeliveryItem.component";
import {
  getWhisListData,
  pendingOrderStateSelection,
  setDeliveryStatus,
  removeSelectionListDeliveyAction,
  selectAllOrderSelectionAction,
} from "../../../redux/actions/productActions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const PendingTab = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getWhisListData());
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const {
    pendingDeliveryOrder,
    loadingSpinner,
    deliveryItems,
    deliveryItemsError,
    deliveryItemsLoading,
    selectPendingOrderState,
  } = useSelector((state) => state.productState);
  const renderCardItem = ({ item }) => {
    return (
      <DeliveryItem navigation={navigation} item={item} typeItem="PENDING" />
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
        (Array.isArray(pendingDeliveryOrder) &&
          pendingDeliveryOrder.length === 0) ? (
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
                    source={require("../../../assets/work.jpg")}
                  />
                  <View>
                    <Text style={{ top: 10, color: "#000000", fontSize: 17 }}>
                      {deliveryItemsError
                        ? deliveryItemsError
                        : "Not Any Pending Delivery Data Found"}
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
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={{ flexDirection: "row" }}>
              {selectPendingOrderState ? (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setDeliveryStatus("", "", ""));
                  }}
                  style={{
                    borderWidth: 0.9,
                    paddingHorizontal: 8,
                    borderColor: "green",
                    borderRadius: 5,
                    alignSelf: "flex-end",
                    marginLeft: 20,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "green",
                      fontSize: 14,
                    }}
                  >
                    Apply
                  </Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}

              {selectPendingOrderState ? (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(selectAllOrderSelectionAction());
                    // dispatch(setDeliveryStatus("", "", ""));
                  }}
                  style={{
                    borderWidth: 0.9,
                    paddingHorizontal: 8,
                    borderColor: "blue",
                    borderRadius: 5,
                    alignSelf: "flex-end",
                    marginLeft: 20,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "blue",
                      fontSize: 14,
                    }}
                  >
                    Select All
                  </Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(removeSelectionListDeliveyAction());
                dispatch(pendingOrderStateSelection(!selectPendingOrderState));
              }}
              style={{
                borderWidth: 0.9,
                paddingHorizontal: 8,
                borderColor: selectPendingOrderState ? "red" : "blue",
                borderRadius: 5,
                alignSelf: "flex-end",
                marginRight: 20,
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: selectPendingOrderState ? "red" : "blue",
                  fontSize: 14,
                }}
              >
                {!selectPendingOrderState ? "Select Order" : "Remove Selection"}
              </Text>
            </TouchableOpacity>
          </View>
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
    </View>
  );
};

export default PendingTab;
