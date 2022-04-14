/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";
import { FAB } from "react-native-paper";

import { SafeView } from "./Home.Style.js";

import ServiceItem from "./Components/ServiceItem.component";

import {
  applyFilterAction,
  clearAllFilter,
  getProductsAction,
  getLikeCardItemsAction,
  getGroupAndSizeId,
  getCardItemsAction,
  getCustomerItemsAction,
  prodcutDataLogOut,
  reportItemSelection,
  getWhisListData,
} from "../../redux/actions/productActions.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Spinner from "react-native-loading-spinner-overlay";

const { width } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({ open: false });
  const [refreshing, setRefreshing] = useState(false);

  const { open } = state;

  const { sliderList, homeItemList } = useSelector((state) => state.authState);
  const {
    loadingSpinner,
    cardItems,
    totalDebit,
    totalCredit,
    cardItemsError,
    cardItemsLoading,
    maxDebit,
    maxDays,
    pendingDeliveryOrder,
  } = useSelector((state) => state.productState);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     dispatch(getCardItemsAction());
  //     dispatch(getCustomerItemsAction());
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    // dispatch(getCardItemsAction());
    // dispatch(getCustomerItemsAction());
    // dispatch(getWhisListData());
  }, []);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = () => {
    console.log("use callback runing");
    setRefreshing(true);
    dispatch(getCardItemsAction());
    // dispatch(getCustomerItemsAction());
    dispatch(getWhisListData());

    wait(1000).then(() => setRefreshing(false));
  };

  const [text1, onChangeText1] = useState("OUR COLLECTION");

  const renderCardItem = ({ item }) => {
    return <ServiceItem navigation={navigation} item={item} />;
  };

  return (
    <SafeView bgColor={"#FFFFFF"}>
      <StatusBar backgroundColor={"#4287f5"} barStyle="light-content" />
      <Spinner
        visible={loadingSpinner}
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />

      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
          paddingTop: 7,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 8,
          backgroundColor: "#4287f5",
          flexDirection: "row",
        }}
      >
        <View style={{ opacity: 0, height: 0 }}>
          <MaterialCommunityIcons name="logout" size={25} color="#1845B2" />
        </View>

        <View style={{}}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#FFFFFF" }}>
            Report
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            // console.log(pendingDeliveryOrder);
            dispatch(prodcutDataLogOut());
          }}
          style={{ left: -15 }}
        >
          <MaterialCommunityIcons name="logout" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      {cardItemsLoading ? (
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
      ) : cardItemsError ||
        (Array.isArray(cardItems) && cardItems.length === 0) ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{
            // bottom: 30,
            // justifyContent: "center",
            // alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              // marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: Dimensions.get("window").height / 2.8,
            }}
          >
            {Array.isArray(cardItems) && cardItems.length === 0 ? (
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
                  <Text style={{ color: "#000000", fontSize: 17 }}>
                    No Service Found
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ color: "#000000", fontSize: 17 }}>
                {cardItemsError ? cardItemsError : "Something went wrong"}
              </Text>
            )}
          </View>
        </ScrollView>
      ) : (
        <>
          <View
            style={{
              marginTop: 3,
              // marginHorizontal: 5,
              flexDirection: "row",
              justifyContent: "space-evenly",
              // flex: 1,
              // marginHorizontal: 5,
              // width: "100%",
            }}
          >
            <View
              style={{
                overflow: "hidden",
                borderRadius: 5,
                elevation: 2,
                borderColor: "#FFFFFF",
              }}
            >
              <TouchableNativeFeedback
                onPress={() => {
                  dispatch(reportItemSelection(maxDebit, "debit"));
                }}
              >
                <View
                  style={{
                    overflow: "hidden",
                    width: Dimensions.get("window").width / 2 - 20,
                    // flex: 0.5,
                    // marginHorizontal: 10,
                    backgroundColor: maxDebit ? "#4287f5" : "#FFFFFF",
                    paddingHorizontal: 30,
                    paddingVertical: 13,
                    alignItems: "center",
                    borderRadius: 5,
                    borderWidth: 3,
                    elevation: 3,
                    borderColor: "#FFFFFF",
                  }}
                >
                  <View>
                    <Text style={{ color: maxDebit ? "#FFFFFF" : "#4287f5" }}>
                      Max Dedit
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>

            <View
              style={{
                overflow: "hidden",
                borderRadius: 5,
                elevation: 2,
                borderColor: "#FFFFFF",
              }}
            >
              <TouchableNativeFeedback
                onPress={() => {
                  dispatch(reportItemSelection(maxDays, "date"));
                }}
              >
                <View
                  style={{
                    overflow: "hidden",
                    width: Dimensions.get("window").width / 2 - 20,
                    // flex: 0.5,
                    // marginHorizontal: 10,
                    borderWidth: 3,
                    backgroundColor: maxDays ? "#4287f5" : "#FFFFFF",
                    paddingHorizontal: 30,
                    paddingVertical: 13,
                    alignItems: "center",
                    borderRadius: 5,
                    elevation: 3,
                    borderColor: "#FFFFFF",
                  }}
                >
                  <View>
                    <Text style={{ color: maxDays ? "#FFFFFF" : "#4287f5" }}>
                      Max Date
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            removeClippedSubviews={true}
            // maxToRenderPerBatch={15} // 5
            // updateCellsBatchingPeriod={5} // 50
            // initialNumToRender={10} // 3
            // windowSize={5} // 5
            // legacyImplementation={true}
            data={cardItems}
            // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}]}
            renderItem={renderCardItem}
            contentContainerStyle={{
              paddingBottom: 100,
              marginBottom: 100,
            }}
            keyExtractor={(item, index) => index.toString()}
          />

          <View
            style={{
              // backgroundColor: "red",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
                backgroundColor: "#26c957",
                paddingHorizontal: 30,
                paddingVertical: 13,
                alignItems: "center",
                borderRadius: 5,
                elevation: 3,
              }}
            >
              <View>
                <Text style={{ color: "#FFFFFF" }}>Total Credit</Text>
              </View>
              <View>
                <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                  {totalCredit}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginHorizontal: 10,
                backgroundColor: "#ff3636",
                paddingHorizontal: 30,
                paddingVertical: 13,
                alignItems: "center",
                borderRadius: 5,
                elevation: 3,
              }}
            >
              <View>
                <Text style={{ color: "#FFFFFF" }}>Total Dedit</Text>
              </View>
              <View>
                <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                  {totalDebit}
                </Text>
              </View>
            </View>
          </View>

          {/* <FAB
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
              navigation.navigate("AddService");
            }}
          /> */}
        </>
      )}
    </SafeView>
  );
};

export default Home;
