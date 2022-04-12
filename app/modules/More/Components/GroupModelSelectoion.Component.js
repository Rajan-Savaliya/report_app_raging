/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

import {
  addCardItemsAction,
  setGroupModalValues,
} from "../../../redux/actions/productActions";

const GroupModelSelectoion = ({ onChangeGroupValue }) => {
  const dispatch = useDispatch();
  const {
    isProductDetailsState,
    groupSetId,
    groupProjectObj,
    groupModelState,
    groupListItems,
  } = useSelector((state) => state.productState);
  const [selectionItemId, setSelectionItemID] = useState(groupSetId);

  useEffect(() => {
    setSelectionItemID(groupSetId);
  }, [groupSetId]);

  const setMarkValue = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (isProductDetailsState) {
          onChangeGroupValue(selectionItemId);
        } else {
          dispatch(
            addCardItemsAction(
              groupProjectObj.id,
              "0",
              "*",
              selectionItemId,
              groupProjectObj.size_id,
              groupProjectObj.remark,
              "group"
            )
          );
        }
        dispatch(setGroupModalValues({}, ""));
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
    <Modal animationIn="slideInUp" isVisible={groupModelState}>
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
            Select Group Size
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                flexWrap: "wrap",
              }}
            >
              {groupListItems &&
              Array.isArray(groupListItems) &&
              groupListItems.length > 0 ? (
                <>
                  {groupListItems.map((item, index) => (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setSelectionItemID(item.id);
                      }}
                    >
                      <View
                        style={{
                          borderColor: "#CD9B46",
                          backgroundColor:
                            selectionItemId == item.id ? "#CD9B46" : "#F6F7FB",
                          paddingVertical: 8,
                          paddingHorizontal: 6,
                          borderWidth: 1,
                          alignSelf: "flex-start",
                          borderRadius: 5,
                          margin: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: !(selectionItemId == item.id)
                              ? "#CD9B46"
                              : "#F6F7FB",
                            fontSize: 16,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </>
              ) : null}
            </View>
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
              dispatch(setGroupModalValues({}, ""));
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

export default GroupModelSelectoion;
