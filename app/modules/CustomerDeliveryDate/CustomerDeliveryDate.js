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

import CustomerDeliveryDateItem from "./Components/CustomerDeliveryDateItem.component";
import Moment from "moment";
import { customerDeliveryDetailByID } from "../../redux/actions/productActions.js";
import DateTimePicker from "@react-native-community/datetimepicker";

import Spinner from "react-native-loading-spinner-overlay";
import Header from "../../components/Header.component";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FAB } from "react-native-paper";

const { width } = Dimensions.get("window");

const CustomerDeliveryDate = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { sliderList, homeItemList } = useSelector((state) => state.authState);
  const {
    loadingSpinner,
    customerDateDeliveryDetailsList,
    customerDateDeliveryDetailsError,
    customerDateDeliveryDetailsLoading,
    customerFullData,
  } = useSelector((state) => state.productState);

  const [stateDate, setStateDate] = useState(null);

  const [endDate, setEndDate] = useState(Moment().format("DD-MM-YYYY"));

  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDate, setActiveDate] = useState(1); //1 state //2end
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    route.params && route.params.customerId ? route.params.customerId : ""
  );
  const [items, setItems] = useState(
    route.params &&
      route.params.customerList &&
      Array.isArray(route.params.customerList)
      ? route.params.customerList
      : []
  );

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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});

    return unsubscribe;
  }, [navigation]);

  const [text1, onChangeText1] = useState("OUR COLLECTION");

  const renderCardItem = ({ item }) => {
    return <CustomerDeliveryDateItem navigation={navigation} item={item} />;
  };

  const searchTheDateToDate = () => {
    const customerIdForRequest = value
      ? value
      : route && route.params && route.params.customerId
      ? route.params.customerId
      : "";

    const stateSelectionDate = stateDate
      ? stateDate.split("-").reverse().join("-")
      : "";
    const endSelectionDate = endDate
      ? endDate.split("-").reverse().join("-")
      : Moment().format("YYYY-MM-DD");

    dispatch(
      customerDeliveryDetailByID(
        stateSelectionDate,
        endSelectionDate,
        customerIdForRequest
      )
    );
  };

  return (
    <SafeView bgColor={"#FFFFFF"}>
      <StatusBar backgroundColor={"#26c957"} barStyle="light-content" />
      <Spinner
        visible={false}
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />
      <Header
        title="Customer Report"
        leftIcon="keyboard-backspace"
        rightIcon="file-pdf-box"
        headerColor={"#FFFFFF"}
        titleColor={"#000000"}
        iconColor={"#000000"}
        leftIconPress={() => navigation.goBack()}
        rightIconPress={() => {
          const customerIdForRequest = value
            ? value
            : route && route.params && route.params.customerId
            ? route.params.customerId
            : "";

          const stateSelectionDate = stateDate
            ? stateDate.split("-").reverse().join("-")
            : Moment().format("YYYY-MM-DD");
          const endSelectionDate = endDate
            ? endDate.split("-").reverse().join("-")
            : Moment().format("YYYY-MM-DD");

          navigation.navigate("PdfView", {
            item: {},
            pdfUrl: `https://nt.dhyatiktok.com/ntapi/home/get_account_ledger_pdf/${stateSelectionDate}/${endSelectionDate}/${customerIdForRequest}`,
          });
        }}
        righticonColor={"#26c957"}
        hide={false}
      />
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
          alignItems: "center",
          marginVertical: 5,
          marginHorizontal: 12,
        }}
      >
        <View style={{ marginBottom: 3, marginLeft: 5 }}>
          <Text style={{ fontSize: 15, color: "#808080" }}>
            Select Customer
          </Text>
        </View>
        <View>
          <DropDownPicker
            placeholder="Select Service"
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#dddddd",
              zIndex: 1000,
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      </View>

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

            if (stateDate) {
              let datePickerStateDate = stateDate.split("-");
              var datePickerStartDateDateObj = new Date(
                datePickerStateDate[2],
                datePickerStateDate[1] - 1,
                datePickerStateDate[0]
              );
            } else {
              let datePickerStateDate = Moment()
                .format("DD-MM-YYYY")
                .split("-");
              var datePickerStartDateDateObj = new Date(
                datePickerStateDate[2],
                datePickerStateDate[1] - 1,
                datePickerStateDate[0]
              );
            }

            setDatePickerDate(datePickerStartDateDateObj);
            setShowDatePicker(true);
          }}
          style={{
            backgroundColor: "#DDDDDD",
            paddingVertical: 2,
            paddingHorizontal: 8,
            borderRadius: 3,
            borderBottomWidth: 3,
            borderColor: "#26c957",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignSelf: "flex-end", paddingRight: 7 }}>
              <Feather name="calendar" color="#26c957" size={18} />
            </View>
            <View>
              <View>
                <Text style={{ fontSize: 12, color: "#808080" }}>
                  Start Date
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
                  {stateDate ? stateDate : "Select Start Date"}
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
            borderColor: "#26c957",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignSelf: "flex-end", paddingRight: 7 }}>
              <Feather name="calendar" color="#26c957" size={18} />
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
            searchTheDateToDate();
          }}
          style={{
            padding: 15,
            backgroundColor: "#26c957",
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

      {customerDateDeliveryDetailsLoading ? (
        <View
          style={{
            bottom: 30,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size={40} color="#26c957" />
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "#000000", fontSize: 17 }}>Loading</Text>
          </View>
        </View>
      ) : customerDateDeliveryDetailsError ||
        (Array.isArray(customerDateDeliveryDetailsList) &&
          customerDateDeliveryDetailsList.length === 0) ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            bottom: 65,
          }}
        >
          <View style={{ marginTop: 10 }}>
            {Array.isArray(customerDateDeliveryDetailsList) &&
            customerDateDeliveryDetailsList.length === 0 ? (
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
                    {customerDateDeliveryDetailsError
                      ? customerDateDeliveryDetailsError
                      : "No Data Found!"}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ color: "#000000", fontSize: 17 }}>
                {customerDateDeliveryDetailsError
                  ? customerDateDeliveryDetailsError
                  : "Something went wrong"}
              </Text>
            )}
          </View>
        </View>
      ) : (
        <>
          <FlatList
            ListHeaderComponent={() => (
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: "#FFFFFF",
                  marginHorizontal: 10,
                  marginTop: 10,
                  elevation: 3,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "#9C9C9C",
                        fontSize: 13,
                      }}
                    >
                      Name
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "flex-end",
                      alignSelf: "flex-end",
                      width: Dimensions.get("window").width / 1.4,
                    }}
                  >
                    <Text
                      adjustsFontSizeToFit
                      minimumFontScale={0.8}
                      style={{
                        color: "#000000",
                        fontSize: 13,
                      }}
                    >
                      {customerFullData && customerFullData.name
                        ? customerFullData.name
                        : "-"}{" "}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingVertical: 0.2,
                    elevation: 0.1,
                    backgroundColor: "#26c957",
                    width: "100%",
                    marginTop: 5,
                  }}
                />

                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.1}
                      style={{
                        color: "#9C9C9C",
                        fontSize: 13,
                      }}
                    >
                      Mobile
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 13,
                      }}
                    >
                      {customerFullData && customerFullData.mobile
                        ? customerFullData.mobile
                        : "-"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingVertical: 0.2,
                    elevation: 0.1,
                    backgroundColor: "#26c957",
                    width: "100%",
                    marginTop: 5,
                  }}
                />

                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.1}
                      style={{
                        color: "#9C9C9C",
                        fontSize: 13,
                      }}
                    >
                      Total Debit
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#ff3636",
                        fontSize: 13,
                      }}
                    >
                      {customerFullData && customerFullData.totaldebit
                        ? customerFullData.totaldebit
                        : "-"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingVertical: 0.2,
                    elevation: 0.1,
                    backgroundColor: "#26c957",
                    width: "100%",
                    marginTop: 5,
                  }}
                />

                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "#9C9C9C",
                        fontSize: 13,
                      }}
                    >
                      Total Credit
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#26c957",
                        fontSize: 13,
                      }}
                    >
                      {customerFullData && customerFullData.totalcredit
                        ? customerFullData.totalcredit
                        : "-"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingVertical: 0.2,
                    elevation: 0.1,
                    backgroundColor: "#26c957",
                    width: "100%",
                    marginTop: 5,
                  }}
                />
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "#9C9C9C",
                        fontSize: 13,
                      }}
                    >
                      Final Balance
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#cf9a1d",
                        fontSize: 13,
                      }}
                    >
                      {customerFullData && customerFullData.finalbalance
                        ? customerFullData.finalbalance
                        : "-"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingVertical: 0.2,
                    elevation: 0.1,
                    backgroundColor: "#26c957",
                    width: "100%",
                    marginTop: 5,
                  }}
                />
              </View>
            )}
            removeClippedSubviews={true}
            maxToRenderPerBatch={15} // 5
            updateCellsBatchingPeriod={5} // 50
            initialNumToRender={10} // 3
            windowSize={5} // 5
            legacyImplementation={true}
            data={customerDateDeliveryDetailsList}
            renderItem={renderCardItem}
            contentContainerStyle={{
              paddingBottom: 100,
              marginBottom: 100,
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <FAB
            style={{
              backgroundColor: "#26c957",
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            icon="phone"
            color="#ffffff"
            onPress={() => {
              if (customerFullData && customerFullData.mobile) {
                var messageString = `Are you sure you want to call ${
                  customerFullData.name
                    ? customerFullData.name
                    : "this customer"
                } (${customerFullData.mobile})`;
                Alert.alert("", messageString, [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      try {
                        Linking.openURL(`tel:${customerFullData.mobile}`);
                      } catch (e) {
                        ToastAndroid.show(
                          `number is not valid`,
                          ToastAndroid.LONG
                        );
                      }
                    },
                  },
                ]);
              } else {
                ToastAndroid.show(
                  `${
                    customerFullData.name ? customerFullData.name : "Customer"
                  } Mobile Number is not available`,
                  ToastAndroid.LONG
                );
              }
            }}
          />
        </>
      )}
    </SafeView>
  );
};

export default CustomerDeliveryDate;
