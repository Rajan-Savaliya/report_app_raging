import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import Moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import Feather from "react-native-vector-icons/Feather";

import {
  addWhishListModalAction,
  addRemoveLikeItemsAction,
} from "../../../redux/actions/productActions";

const SeachModal = ({ navigation }) => {
  const dispatch = useDispatch();
  const { whishListModalShow, whishListCustomerId } = useSelector(
    (state) => state.productState
  );
  const [state, setState] = React.useState({ open: false });
  const [selectDate, setSelectDate] = useState(Moment().format("DD-MM-YYYY"));
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [text, onChangeText] = useState("");
  const inputRef = useRef(null);

  //   useEffect(() => {
  //     if (searchModalShow) {
  //       Platform.OS === "ios"
  //         ? inputRef.current.focus()
  //         : setTimeout(() => inputRef.current.focus(), 40);
  //     }
  //   }, [searchModalShow]);

  const SeachModelProductPress = () => {
    const stateSelectionDate = selectDate
      ? selectDate.split("-").reverse().join("-")
      : "";

    dispatch(
      addRemoveLikeItemsAction(
        whishListCustomerId,
        "",
        "like",
        text ? text : "",
        stateSelectionDate
      )
    );
    onChangeText("");
    dispatch(addWhishListModalAction(false, ""));
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);

    setSelectDate(Moment(currentDate).format("DD-MM-YYYY"));

    if (currentDate) {
      setSelectDate(Moment(currentDate).format("DD-MM-YYYY"));
    } else if (selectDate) {
      setSelectDate(selectDate);
    } else {
      setSelectDate(new Date());
    }
  };

  return (
    <Modal animationIn="slideInUp" isVisible={whishListModalShow}>
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
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          marginHorizontal: 10,
          paddingBottom: 20,
          elevation: 2,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17, color: "#000000" }}>
            {" "}
            Add To WishList
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 50,
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              let datePickerStateDate = selectDate.split("-");
              var datePickerStartDateDateObj = new Date(
                datePickerStateDate[2],
                datePickerStateDate[1] - 1,
                datePickerStateDate[0]
              );

              setDatePickerDate(datePickerStartDateDateObj);
              setShowDatePicker(true);
            }}
            style={{
              backgroundColor: "#FFFFFF",
              paddingVertical: 2,
              paddingHorizontal: 8,
              borderRadius: 3,
              borderBottomWidth: 3,
              borderColor: "#4287f5",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ alignSelf: "flex-end", paddingRight: 7 }}>
                <Feather name="calendar" color="#4287f5" size={18} />
              </View>
              <View>
                <View>
                  <Text style={{ fontSize: 12, color: "#808080" }}>
                    Select Date
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
                    {selectDate}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 30,
              marginBottom: 10,
            }}
          >
            <TextInput
              autoFocus={true}
              ref={inputRef}
              underlineColorAndroid="transparent"
              placeholder="Remark"
              placeholderTextColor="#000000"
              style={{
                borderWidth: 0,
                color: "#000000",
                fontSize: 16,
              }}
              onChangeText={onChangeText}
              value={text}
            />
            <View
              style={{
                marginTop: 7,
                marginBottom: 13,
                elevation: 4,
                backgroundColor: "#4287f5",
                paddingVertical: 0.5,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onChangeText("");

              dispatch(addWhishListModalAction(false, ""));
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 7,
              paddingHorizontal: 10,
              marginVertical: 0,
              marginHorizontal: 3,
              borderColor: "#4287f5",
              backgroundColor: "#F6F7FB",
              borderWidth: 1,
              borderRadius: 2,
              marginRight: 5,
              width: "35%",
            }}
          >
            <Text style={{ color: "#4287f5", fontSize: 13 }}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={SeachModelProductPress}
            style={{
              marginLeft: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#4287f5",
              paddingVertical: 7,
              paddingHorizontal: 10,
              marginVertical: 0,
              marginHorizontal: 3,
              borderColor: "#F6F7FB",
              borderWidth: 0.25,
              borderRadius: 2,
              width: "35%",
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={{ color: "#FFFFFF", fontSize: 13 }}
            >
              Add To WhishList
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SeachModal;
