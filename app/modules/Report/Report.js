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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

import { SafeView } from "./Home.Style.js";

import ReportItem from "./Components/ReportItem.component";

import { getDeliveryReportAction } from "../../redux/actions/productActions.js";

import Spinner from "react-native-loading-spinner-overlay";

const { width } = Dimensions.get("window");

const Report = ({ navigation }) => {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({ open: false });
  const [stateDate, setStateDate] = useState(
    Moment().startOf("month").format("DD-MM-YYYY")
  );
  const [endDate, setEndDate] = useState(
    Moment().endOf("month").format("DD-MM-YYYY")
  );
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDate, setActiveDate] = useState(1); //1 state //2end

  const { open } = state;

  const { sliderList, homeItemList } = useSelector((state) => state.authState);
  const {
    loadingSpinner,
    deliveryReports,
    deliveryReportsError,
    deliveryReportsLoading,
  } = useSelector((state) => state.productState);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setStateDate(Moment().startOf("month").format("DD-MM-YYYY"));
      setEndDate(Moment().endOf("month").format("DD-MM-YYYY"));
      dispatch(getDeliveryReportAction(stateDate, endDate));
    });

    return unsubscribe;
  }, [navigation]);

  const [text1, onChangeText1] = useState("OUR COLLECTION");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);

    if (activeDate === 1) {
      if (currentDate) {
        setStateDate(Moment(currentDate).format("DD-MM-YYYY"));
      } else if (stateDate) {
        setStateDate(stateDate);
      } else {
        setStateDate(new Date());
      }
    } else {
      setEndDate(Moment(currentDate).format("DD-MM-YYYY"));

      if (currentDate) {
        setEndDate(Moment(currentDate).format("DD-MM-YYYY"));
      } else if (endDate) {
        setEndDate(endDate);
      } else {
        setEndDate(new Date());
      }
    }
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
    return <ReportItem navigation={navigation} item={item} />;
  };

  return (
    <SafeView bgColor={"#FFFFFF"}>
      <StatusBar backgroundColor={"#1845B2"} barStyle="light-content" />
      <Spinner
        visible={false}
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
            Report
          </Text>
        </View>
      </View>
      {showDatePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={datePickerDate}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      ) : null}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 5,
          marginHorizontal: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setActiveDate(1);

            let datePickerStateDate = stateDate.split("-");
            var datePickerStartDateDateObj = new Date(
              datePickerStateDate[2],
              datePickerStateDate[1] - 1,
              datePickerStateDate[0]
            );

            setDatePickerDate(datePickerStartDateDateObj);
            setShowDatePicker(true);
          }}
          style={{
            backgroundColor: "#DDDDDD",
            paddingVertical: 2,
            paddingHorizontal: 8,
            borderRadius: 3,
            borderBottomWidth: 3,
            borderColor: "#282dd1",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignSelf: "flex-end", paddingRight: 7 }}>
              <Feather name="calendar" color="#282dd1" size={18} />
            </View>
            <View>
              <View>
                <Text style={{ fontSize: 12, color: "#808080" }}>
                  State Date
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 14.5,
                    fontWeight: "bold",
                  }}
                >
                  {stateDate}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>-</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setActiveDate(2);
            let datePickerEndDate = endDate.split("-");
            var datePickerEndDateDateObj = new Date(
              datePickerEndDate[2],
              datePickerEndDate[1] - 1,
              datePickerEndDate[0]
            );

            setDatePickerDate(datePickerEndDateDateObj);
            setShowDatePicker(true);
          }}
          style={{
            backgroundColor: "#DDDDDD",
            paddingVertical: 2,
            paddingHorizontal: 8,
            borderRadius: 3,
            borderBottomWidth: 3,
            borderColor: "#282dd1",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignSelf: "flex-end", paddingRight: 7 }}>
              <Feather name="calendar" color="#282dd1" size={18} />
            </View>
            <View>
              <View>
                <Text style={{ fontSize: 12, color: "#808080" }}>End Date</Text>
              </View>

              <View>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 14.5,
                    fontWeight: "bold",
                  }}
                >
                  {endDate}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dispatch(getDeliveryReportAction(stateDate, endDate));
          }}
          style={{
            padding: 15,
            backgroundColor: "#1845B2",
            borderRadius: 50,
          }}
        >
          <MaterialCommunityIcons
            name="file-search-outline"
            color="#ffffff"
            size={18}
          />
        </TouchableOpacity>
      </View>

      {deliveryReportsLoading ? (
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
      ) : deliveryReportsError ||
        (Array.isArray(deliveryReports) && deliveryReports.length === 0) ? (
        <View
          style={{
            bottom: 30,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ marginTop: 10 }}>
            {Array.isArray(deliveryReports) && deliveryReports.length === 0 ? (
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
                    No Report Data Found
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ color: "#000000", fontSize: 17 }}>
                {deliveryReportsError
                  ? deliveryReportsError
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
            data={deliveryReports}
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

export default Report;
