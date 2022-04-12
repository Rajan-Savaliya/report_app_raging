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
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

import {
  setRemarkModalValues,
  addCardItemsAction,
} from "../../../redux/actions/productActions";

const RemarkModal = ({}) => {
  const dispatch = useDispatch();
  const { remarkProjectObj, remarKTextState, remarkModeState } = useSelector(
    (state) => state.productState
  );
  const [text, onChangeText] = useState(remarKTextState);
  const inputRef = useRef(null);

  useEffect(() => {
    if (remarkModeState) {
      Platform.OS === "ios"
        ? inputRef.current.focus()
        : setTimeout(() => inputRef.current.focus(), 40);
    }
  }, [remarkModeState]);

  const setMarkValue = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch(
          addCardItemsAction(
            remarkProjectObj.id,
            "0",
            "*",
            remarkProjectObj.items_group_id,
            remarkProjectObj.size_id,
            text,
            "remark"
          )
        );
        onChangeText("");
        dispatch(setRemarkModalValues({}, ""));
      } else {
        Toast.show({
          text1: "Check your Internet Connection",
          visibilityTime: 3000,
          autoHide: true,
          position: "top",
          type: "error",
        });
      }
    });
  };

  return (
    <Modal animationIn="slideInUp" isVisible={remarkModeState}>
      <View
        style={{
          backgroundColor: "#F6F7FB",
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
            Write Remark
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 50,
          }}
        >
          <View
            style={{
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <TextInput
              autoFocus={true}
              ref={inputRef}
              underlineColorAndroid="transparent"
              placeholder="Write your Remark"
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
                backgroundColor: "#CD9B46",
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
              dispatch(setRemarkModalValues({}, ""));
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 7,
              paddingHorizontal: 10,
              marginVertical: 0,
              marginHorizontal: 3,
              borderColor: "#CD9B46",
              backgroundColor: "#F6F7FB",
              borderWidth: 1,
              borderRadius: 2,
              marginRight: 5,
              width: "35%",
            }}
          >
            <Text style={{ color: "#CD9B46" }}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={setMarkValue}
            style={{
              marginLeft: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#CD9B46",
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
            <Text style={{ color: "#FFFFFF" }}>SET</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RemarkModal;
