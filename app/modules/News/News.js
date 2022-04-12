/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import { SafeView } from "./News.Style.js";
import { getCustomerItemsAction } from "../../redux/actions/productActions";
import { FAB } from "react-native-paper";

import UserCard from "./Components/UserCard.component";

const News = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cardItems, customerItemsError, customerItemsLoading, customerItems } =
    useSelector((state) => state.productState);

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getCustomerItemsAction());
    });

    return unsubscribe;
  }, [navigation]);

  const renderCardItem = ({ item }) => {
    return <UserCard navigation={navigation} item={item} />;
  };

  return (
    <SafeView bgColor={"#FFFFFF"}>
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
            Customers
          </Text>
        </View>
      </View>
      {customerItemsLoading ? (
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
      ) : customerItemsError ||
        (Array.isArray(customerItems) && customerItems.length === 0) ? (
        <View
          style={{
            bottom: 30,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ marginTop: 10 }}>
            {Array.isArray(customerItems) && customerItems.length === 0 ? (
              <View>
                <Text style={{ top: 10, color: "#000000", fontSize: 17 }}>
                  No Customer Found
                </Text>
              </View>
            ) : (
              <Text style={{ color: "#000000", fontSize: 17 }}>
                {customerItemsError
                  ? customerItemsError
                  : "Something went wrong"}
              </Text>
            )}
          </View>
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

              cardItems.forEach((valuesitem) => {
                serviceSelectionList.push({
                  label: valuesitem.name,
                  value: valuesitem.id,
                });
              });

              navigation.navigate("AddUser", {
                serviceList: serviceSelectionList,
              });
            }}
          />
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
            data={customerItems}
            renderItem={renderCardItem}
            contentContainerStyle={{
              paddingBottom: 100,
              marginBottom: 100,
            }}
            keyExtractor={(item, index) => index.toString()}
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

              cardItems.forEach((valuesitem) => {
                serviceSelectionList.push({
                  label: valuesitem.name,
                  value: valuesitem.id,
                });
              });

              navigation.navigate("AddUser", {
                serviceList: serviceSelectionList,
              });
            }}
          />
        </>
      )}
    </SafeView>
  );
};

export default News;
