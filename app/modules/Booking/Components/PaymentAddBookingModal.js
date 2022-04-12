import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import RNFS from "react-native-fs";

import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import Modal from "react-native-modal";
import {
  setLoadingSpinerAction,
  prodcutDataLogOut,
  getPaymentItemsAction,
} from "../../../redux/actions/productActions";

import { payMentMethodAddModalToggle } from "../../../redux/actions/authActons";

const singInCheck = yup.object({
  amount: yup.string().required("amount required"),
  remark: yup.string(),
});

const PaymentAddBookingModal = ({ bookingIdPass }) => {
  const dispatch = useDispatch();
  const {
    userToken,
    LoginInLoading,
    paymentAddModalShow,
    paymentModalBookingId,
  } = useSelector((state) => state.authState);

  const [addImage, setAddImage] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [addImageError, setAddImageError] = useState(null);
  const [editImageState, setEditImageState] = useState(false);

  useEffect(() => {
    setEditImage(null);
    setEditImageState(false);
  }, [paymentAddModalShow]);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.didCancel) {
        return true;
      }
      if (response) {
        setAddImage(response);
      }
    });
  };

  const handleChoosePhotoEditImage = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.didCancel) {
        return true;
      }
      if (response) {
        setEditImageState(true);
        setEditImage(response);
      }
    });
  };

  return (
    <Modal
      onBackdropPress={() => {
        dispatch(payMentMethodAddModalToggle(false, null));
      }}
      animationIn="slideInUp"
      isVisible={paymentAddModalShow}
    >
      <View
        style={{
          backgroundColor: "#F6F7FB",
          borderRadius: 10,
          marginHorizontal: 10,
          paddingBottom: 20,
          elevation: 2,
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            {editImageState &&
            editImage &&
            editImage.assets &&
            editImage.assets[0] &&
            editImage.assets[0].uri ? (
              <TouchableOpacity
                onPress={handleChoosePhotoEditImage}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  source={{ uri: editImage.assets[0].uri }}
                  style={{
                    width: Dimensions.get("window").width - 30,
                    height: Dimensions.get("window").height / 6,
                    resizeMode: "center",
                  }}
                />
                <Image
                  source={require("../../../assets/upload.png")}
                  style={{
                    width: 30,
                    height: 30,
                    left: 40,
                    bottom: 10,
                    // position: "absolute",
                  }}
                />

                <View style={{ marginTop: 5 }}>
                  <Text>Change Your Payment Proof Image</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleChoosePhotoEditImage}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  source={require("../../../assets/work.jpg")}
                  style={{
                    width: Dimensions.get("window").width - 30,
                    height: Dimensions.get("window").height / 6,
                    resizeMode: "center",
                  }}
                />

                <Image
                  source={require("../../../assets/upload.png")}
                  style={{
                    width: 30,
                    height: 30,
                    left: 80,
                    bottom: 20,
                    // position: "absolute",
                  }}
                />

                <View style={{ marginTop: 5 }}>
                  <Text>Add Your Payment Proof Image</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <Formik
            initialValues={{
              amount: "",
              remark: "",
            }}
            validationSchema={singInCheck}
            onSubmit={(values, actions) => {
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  // if new update is avaible then:
                  if (
                    editImageState &&
                    editImage &&
                    editImage.assets &&
                    editImage.assets[0] &&
                    editImage.assets[0].uri
                  ) {
                    dispatch(setLoadingSpinerAction(true));

                    RNFS.readFile(editImage.assets[0].uri, "base64")
                      .then((base64Image) => {
                        var myHeaders = new Headers();
                        myHeaders.append(
                          "Authorization",
                          `Bearer ${userToken}`
                        );

                        var formdata = new FormData();
                        formdata.append("amount", values.amount);
                        formdata.append("remark", values.remark);
                        formdata.append("booking_id", paymentModalBookingId);
                        formdata.append("image", base64Image);

                        var requestOptions = {
                          method: "POST",
                          headers: myHeaders,
                          body: formdata,
                          redirect: "follow",
                        };

                        fetch(
                          "https://rd.ragingdevelopers.com/atender/api/onetime/payment/addPayment",
                          requestOptions
                        )
                          .then((response) => response.text())
                          .then((result) => {
                            var response = JSON.parse(result);
                            // if (
                            //   response &&
                            //   response.success === 0 &&
                            //   response.message.includes("Invalid Api Token")
                            // ) {
                            //   dispatch(prodcutDataLogOut());
                            // }
                            dispatch(setLoadingSpinerAction(false));
                            if (response && response.success) {
                              actions.resetForm();
                              dispatch(getPaymentItemsAction(bookingIdPass));

                              dispatch(
                                payMentMethodAddModalToggle(false, null)
                              );

                              Toast.show({
                                text1: response.message
                                  ? response.message
                                  : "Payment Added Successfully",
                                visibilityTime: 3000,
                                autoHide: true,
                                position: "top",
                                type: "success",
                              });
                            } else {
                              dispatch(
                                payMentMethodAddModalToggle(false, null)
                              );

                              Toast.show({
                                text1: response.message
                                  ? response.message
                                  : "something went wrong try again",
                                visibilityTime: 3000,
                                autoHide: true,
                                position: "top",
                                type: "error",
                              });
                            }
                          })
                          .catch((error) => {
                            dispatch(setLoadingSpinerAction(false));
                            dispatch(payMentMethodAddModalToggle(false, null));

                            NetInfo.fetch().then((state) => {
                              if (state.isConnected) {
                                Toast.show({
                                  text1: "server response failed try again",
                                  visibilityTime: 3000,
                                  autoHide: true,
                                  position: "top",
                                  type: "error",
                                });
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
                          });
                      })
                      .catch((e) => {
                        dispatch(setLoadingSpinerAction(false));
                        dispatch(payMentMethodAddModalToggle(false, null));

                        Toast.show({
                          text1: "something went wrong try again",
                          visibilityTime: 1000,
                          autoHide: true,
                          position: "top",
                          type: "error",
                        });
                      });
                  } else {
                    var myHeaders = new Headers();
                    dispatch(setLoadingSpinerAction(true));
                    myHeaders.append("Authorization", `Bearer ${userToken}`);

                    var formdata = new FormData();
                    formdata.append("amount", values.amount);
                    formdata.append("remark", values.remark);
                    formdata.append("booking_id", paymentModalBookingId);

                    var requestOptions = {
                      method: "POST",
                      headers: myHeaders,
                      body: formdata,
                      redirect: "follow",
                    };

                    fetch(
                      "https://rd.ragingdevelopers.com/atender/api/onetime/payment/addPayment",
                      requestOptions
                    )
                      .then((response) => response.text())
                      .then((result) => {
                        var response = JSON.parse(result);
                        // if (
                        //   response &&
                        //   response.success === 0 &&
                        //   response.message.includes("Invalid Api Token")
                        // ) {
                        //   dispatch(prodcutDataLogOut());
                        // }
                        dispatch(setLoadingSpinerAction(false));
                        if (response && response.success) {
                          dispatch(getPaymentItemsAction(bookingIdPass));

                          actions.resetForm();
                          dispatch(payMentMethodAddModalToggle(false, null));

                          Toast.show({
                            text1: response.message
                              ? response.message
                              : "Payment Added Successfully",
                            visibilityTime: 3000,
                            autoHide: true,
                            position: "top",
                            type: "success",
                          });
                        } else {
                          dispatch(payMentMethodAddModalToggle(false, null));

                          Toast.show({
                            text1: response.message
                              ? response.message
                              : "something went wrong try again",
                            visibilityTime: 3000,
                            autoHide: true,
                            position: "top",
                            type: "error",
                          });
                        }
                      })
                      .catch((error) => {
                        dispatch(payMentMethodAddModalToggle(false, null));

                        dispatch(setLoadingSpinerAction(false));

                        NetInfo.fetch().then((state) => {
                          if (state.isConnected) {
                            Toast.show({
                              text1: "server response failed try again",
                              visibilityTime: 3000,
                              autoHide: true,
                              position: "top",
                              type: "error",
                            });
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
                      });
                  }
                } else {
                  dispatch(payMentMethodAddModalToggle(false, null));

                  Toast.show({
                    text1: "Check your Internet Connection",
                    visibilityTime: 3000,
                    autoHide: true,
                    position: "top",
                    type: "error",
                  });
                }
              });
            }}
          >
            {(props) => (
              <View style={{ marginHorizontal: 30 }}>
                <View
                  style={{
                    marginBottom: 0,
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 7,
                      fontWeight: "bold",
                    }}
                  >
                    <Text style={{ color: "#333333" }}> Amount</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        zIndex: 5,
                        flex: 0.1,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      <Ionicons
                        onPress={() => {}}
                        name={"pricetag"}
                        color="#1845B2"
                        size={18}
                      />
                    </View>

                    <TextInput
                      keyboardType="numeric"
                      underlineColorAndroid="transparent"
                      placeholder=" Amount"
                      placeholderTextColor="#666666"
                      style={{
                        color: "#000000",
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        flex: 0.9,
                      }}
                      onChangeText={props.handleChange("amount")}
                      onBlur={props.handleBlur("amount")}
                      value={props.values.amount}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.amount && props.errors.amount}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 2,
                      marginBottom: 7,
                      fontWeight: "bold",
                    }}
                  >
                    <Text style={{ color: "#333333" }}>Remark</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        zIndex: 5,
                        flex: 0.1,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      <Ionicons
                        onPress={() => {}}
                        name={"ios-pencil-sharp"}
                        color="#1845B2"
                        size={18}
                      />
                    </View>

                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Remark"
                      placeholderTextColor="#666666"
                      style={{
                        color: "#000000",
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        flex: 0.9,
                      }}
                      onChangeText={props.handleChange("remark")}
                      onBlur={props.handleBlur("remark")}
                      value={props.values.remark}
                    />
                  </View>
                </View>
                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 3,
                  }}
                >
                  <TouchableNativeFeedback
                    accessible={false}
                    background={TouchableNativeFeedback.Ripple("#ECECEC")}
                    onPress={() => {
                      Keyboard.dismiss();

                      props.handleSubmit();
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#1845B2",
                        marginTop: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 3,
                        paddingVertical: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 16,
                          fontFamily: "Cairo-Regular",
                        }}
                      >
                        Add Payment
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PaymentAddBookingModal;
