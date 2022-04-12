/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  FlatList,
  View,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { placeOrderCardItemAction } from "../../redux/actions/productActions.js";
import AppConstants from "../../appConstants/AppConstants";

import CardItem from "./Components/CardItem.Compomnent.js";

const More = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userServiceType } = useSelector((state) => state.authState);

  const { serverPlaceServerLoadingError } = useSelector(
    (state) => state.productState
  );
  const { userFirstName, userLastName } = useSelector(
    (state) => state.authState
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation, serverPlaceServerLoadingError]);

  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

  const renderCardItem = ({ item }) => {
    return (
      <>
        <CardItem navigation={navigation} item={item} />
      </>
    );
  };

  const pressOrderCardAllItems = () => {
    dispatch(placeOrderCardItemAction());
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          marginTop: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/work.jpg")}
          style={{
            width: Dimensions.get("window").width - 30,
            height: Dimensions.get("window").height / 4,
            resizeMode: "contain",
          }}
        />
      </View>

      <FlatList
        removeClippedSubviews={true}
        maxToRenderPerBatch={15} // 5
        updateCellsBatchingPeriod={5} // 50
        initialNumToRender={10} // 3
        windowSize={5} // 5
        legacyImplementation={true}
        data={[
          { name: `${userFirstName} ${userLastName}` },
          { name: "About Us" },
          { name: "Share App" },
          { name: "Rate Us" },
          { name: "Log Out" },
        ]}
        renderItem={renderCardItem}
        contentContainerStyle={{
          paddingBottom: 100,
          marginBottom: 100,
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ alignItems: "center", top: -5 }}>
        <Text style={{ fontSize: 12 }}>
          {" "}
          Version : {AppConstants.APP_VERSION}
        </Text>
      </View>
    </View>
  );
};

export default More;
