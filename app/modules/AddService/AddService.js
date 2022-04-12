import React, { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { launchImageLibrary } from "react-native-image-picker";
import RNFS from "react-native-fs";

import Header from "../../components/Header.component";

import {
  setLoadingSpinerAction,
  prodcutDataLogOut,
} from "../../redux/actions/productActions";

const AddService = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [addImage, setAddImage] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [addImageError, setAddImageError] = useState(null);
  const [editImageState, setEditImageState] = useState(false);

  const { userToken, LoginInLoading, userServiceType } = useSelector(
    (state) => state.authState
  );

  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

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

  if (userServiceType == "Daily") {
    var singInCheck = yup.object({
      name: yup.string(),
      price: yup.string().required("price is required"),
      description: yup.string().required("description is required"),
    });
  } else {
    var singInCheck = yup.object({
      name: yup.string().required("service name is required"),
      price: yup.string(),
      description: yup.string().required("description is required"),
    });
  }

  return (
    <>
      <StatusBar backgroundColor={"#FFFFFF"} barStyle="light-content" />

      <Spinner
        visible={LoginInLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFFFFF" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />
      <Header
        title={
          route && route.params && route.params.update
            ? "Update Your Service"
            : "Add Your Service"
        }
        leftIcon="keyboard-backspace"
        rightIcon="plus"
        headerColor={"#FFFFFF"}
        titleColor={"#000000"}
        iconColor={"#000000"}
        leftIconPress={() => navigation.goBack()}
      />

      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {route && route.params && route.params.update ? (
            <View>
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
                      height: Dimensions.get("window").height / 5,
                      resizeMode: "contain",
                    }}
                  />
                  <Image
                    source={require("../../assets/upload.png")}
                    style={{ width: 35, height: 35, left: 50, bottom: 10 }}
                  />
                  <View style={{ marginTop: 10 }}>
                    <Text>Change Your Service Image</Text>
                  </View>
                </TouchableOpacity>
              ) : route && route.params && route.params.image ? (
                <TouchableOpacity
                  onPress={handleChoosePhotoEditImage}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={{
                      uri: `https://rd.ragingdevelopers.com/atender/assets/images/services/${route.params.image}`,
                    }}
                    style={{
                      width: Dimensions.get("window").width - 30,
                      height: Dimensions.get("window").height / 5,
                      resizeMode: "contain",
                    }}
                  />
                  <View style={{}}>
                    <Image
                      source={require("../../assets/upload.png")}
                      style={{ width: 35, height: 35, left: 50, bottom: 10 }}
                    />
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <Text>Change Your Service Image</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleChoosePhotoEditImage}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={require("../../assets/work.jpg")}
                    style={{
                      width: Dimensions.get("window").width - 30,
                      height: Dimensions.get("window").height / 4,
                      resizeMode: "contain",
                    }}
                  />
                  <Image
                    source={require("../../assets/upload.png")}
                    style={{ width: 40, height: 40, left: 0, bottom: 30 }}
                  />

                  <View style={{ marginTop: 10 }}>
                    <Text>Add Your Service Image</Text>
                  </View>
                  {addImageError ? (
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: "red" }}>{addImageError}</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View>
              {addImage &&
              addImage.assets &&
              addImage.assets[0] &&
              addImage.assets[0].uri ? (
                <TouchableOpacity
                  onPress={handleChoosePhoto}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={{ uri: addImage.assets[0].uri }}
                    style={{
                      width: Dimensions.get("window").width - 30,
                      height: Dimensions.get("window").height / 5,
                      resizeMode: "contain",
                    }}
                  />
                  <Image
                    source={require("../../assets/upload.png")}
                    style={{ width: 40, height: 40, left: 50, bottom: 30 }}
                  />

                  <View style={{ marginTop: 10 }}>
                    <Text>Change Your Service Image</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleChoosePhoto}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={require("../../assets/work.jpg")}
                    style={{
                      width: Dimensions.get("window").width - 30,
                      height: Dimensions.get("window").height / 4,
                      resizeMode: "contain",
                    }}
                  />
                  <Image
                    source={require("../../assets/upload.png")}
                    style={{ width: 40, height: 40, left: 0, bottom: 30 }}
                  />

                  <View style={{ marginTop: 10 }}>
                    <Text>Add Your Service Image</Text>
                  </View>
                  {addImageError ? (
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ color: "red" }}>{addImageError}</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              )}
            </View>
          )}

          <Formik
            initialValues={{
              name:
                route && route.params && route.params.name
                  ? route.params.name
                  : "",
              price:
                route && route.params && route.params.price
                  ? route.params.price
                  : "",
              description:
                route && route.params && route.params.description
                  ? route.params.description
                  : "",
            }}
            validationSchema={singInCheck}
            onSubmit={(values, actions) => {
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  if (route && route.params && route.params.update) {
                    if (route && route.params && route.params.id) {
                      // update image base64
                      if (
                        editImageState &&
                        editImage &&
                        editImage.assets &&
                        editImage.assets[0] &&
                        editImage.assets[0].uri
                      ) {
                        dispatch(setLoadingSpinerAction(true));

                        RNFS.readFile(editImage.assets[0].uri, "base64")
                          .then((Base64EditImage) => {
                            var myHeaders = new Headers();

                            var myHeaders = new Headers();
                            myHeaders.append(
                              "Authorization",
                              `Bearer ${userToken}`
                            );

                            var formdata = new FormData();
                            formdata.append("service_id", route.params.id);
                            formdata.append("name", values.name);
                            formdata.append("price", values.price);
                            formdata.append("description", values.description);
                            formdata.append("image", Base64EditImage);

                            var requestOptions = {
                              method: "POST",
                              headers: myHeaders,
                              body: formdata,
                              redirect: "follow",
                            };

                            var updateSerchiceUrl =
                              userServiceType == "Daily"
                                ? "https://rd.ragingdevelopers.com/atender/api/services/updateService"
                                : "https://rd.ragingdevelopers.com/atender/api/onetime/services/updateService";

                            fetch(updateSerchiceUrl, requestOptions)
                              .then((response) => response.text())
                              .then((result) => {
                                dispatch(setLoadingSpinerAction(false));

                                var response = JSON.parse(result);
                                // if (
                                //   response &&
                                //   response.success == 0 &&
                                //   response.message.includes("Invalid Api Token")
                                // ) {
                                //   dispatch(prodcutDataLogOut());
                                // }

                                if (response && response.success) {
                                  actions.resetForm();
                                  navigation.navigate("Home");

                                  Toast.show({
                                    text1: response.message
                                      ? response.message
                                      : "Service Updated Successfully",
                                    visibilityTime: 3000,
                                    autoHide: true,
                                    position: "top",
                                    type: "success",
                                  });
                                } else {
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

                        var myHeaders = new Headers();
                        myHeaders.append(
                          "Authorization",
                          `Bearer ${userToken}`
                        );

                        var formdata = new FormData();
                        formdata.append("service_id", route.params.id);
                        formdata.append("name", values.name);
                        formdata.append("price", values.price);
                        formdata.append("description", values.description);

                        var requestOptions = {
                          method: "POST",
                          headers: myHeaders,
                          body: formdata,
                          redirect: "follow",
                        };

                        var updateSrviceUrl =
                          userServiceType == "Daily"
                            ? "https://rd.ragingdevelopers.com/atender/api/services/updateService"
                            : "https://rd.ragingdevelopers.com/atender/api/onetime/services/updateService";

                        fetch(updateSrviceUrl, requestOptions)
                          .then((response) => response.text())
                          .then((result) => {
                            dispatch(setLoadingSpinerAction(false));

                            var response = JSON.parse(result);
                            // if (
                            //   response &&
                            //   response.success == 0 &&
                            //   response.message.includes("Invalid Api Token")
                            // ) {
                            //   dispatch(prodcutDataLogOut());
                            // }

                            if (response && response.success) {
                              actions.resetForm();
                              navigation.navigate("Home");

                              Toast.show({
                                text1: response.message
                                  ? response.message
                                  : "Service Updated Successfully",
                                visibilityTime: 3000,
                                autoHide: true,
                                position: "top",
                                type: "success",
                              });
                            } else {
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
                    }
                  } else {
                    if (
                      addImage &&
                      addImage.assets &&
                      addImage.assets[0] &&
                      addImage.assets[0].uri
                    ) {
                      dispatch(setLoadingSpinerAction(true));

                      RNFS.readFile(addImage.assets[0].uri, "base64")
                        .then((resBase64Image) => {
                          var myHeaders = new Headers();

                          myHeaders.append(
                            "Authorization",
                            `Bearer ${userToken}`
                          );

                          var formdata = new FormData();
                          formdata.append("name", values.name);
                          formdata.append("price", values.price);
                          formdata.append("description", values.description);
                          formdata.append("image", resBase64Image);

                          var requestOptions = {
                            method: "POST",
                            headers: myHeaders,
                            body: formdata,
                            redirect: "follow",
                          };

                          var addSerceUrl =
                            userServiceType == "Daily"
                              ? "https://rd.ragingdevelopers.com/atender/api/services/addService"
                              : "https://rd.ragingdevelopers.com/atender/api/onetime/services/addService";
                          fetch(addSerceUrl, requestOptions)
                            .then((response) => response.text())
                            .then((result) => {
                              dispatch(setLoadingSpinerAction(false));

                              var response = JSON.parse(
                                result,
                                "eeeeeeeeeeeeeeeeeeeeeeeee"
                              );
                              // if (
                              //   response &&
                              //   response.success === 0 &&
                              //   response.message.includes("Invalid Api Token")
                              // ) {
                              //   dispatch(prodcutDataLogOut());
                              // }
                              if (response && response.success) {
                                actions.resetForm();
                                navigation.navigate("Home");

                                Toast.show({
                                  text1: response.message
                                    ? response.message
                                    : "Service Saved Successfully",
                                  visibilityTime: 3000,
                                  autoHide: true,
                                  position: "top",
                                  type: "success",
                                });
                              } else {
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
                      formdata.append("name", values.name);
                      formdata.append("price", values.price);
                      formdata.append("description", values.description);

                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: formdata,
                        redirect: "follow",
                      };

                      var addServiceFetchUrl =
                        userServiceType == "Daily"
                          ? "https://rd.ragingdevelopers.com/atender/api/services/addService"
                          : "https://rd.ragingdevelopers.com/atender/api/onetime/services/addService";

                      fetch(addServiceFetchUrl, requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                          dispatch(setLoadingSpinerAction(false));

                          var response = JSON.parse(result);
                          // if (
                          //   response &&
                          //   response.success === 0 &&
                          //   response.message.includes("Invalid Api Token")
                          // ) {
                          //   dispatch(prodcutDataLogOut());
                          // }
                          if (response && response.success) {
                            actions.resetForm();
                            navigation.navigate("Home");

                            Toast.show({
                              text1: response.message
                                ? response.message
                                : "Service Saved Successfully",
                              visibilityTime: 3000,
                              autoHide: true,
                              position: "top",
                              type: "success",
                            });
                          } else {
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
                  }
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
            }}
          >
            {(props) => (
              <View style={{ marginHorizontal: 30 }}>
                <View
                  style={{
                    marginBottom: 0,
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 7,
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Write your service name</Text>
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
                        name={"settings"}
                        color="#1845B2"
                        size={18}
                      />
                    </View>

                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Your service"
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
                      onChangeText={props.handleChange("name")}
                      onBlur={props.handleBlur("name")}
                      value={props.values.name}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.name && props.errors.name}
                    </Text>
                  </View>
                </View>

                {userServiceType == "Daily" ? (
                  <View
                    style={{
                      marginBottom: 0,
                      marginTop: 0,
                    }}
                  >
                    <View
                      style={{
                        marginBottom: 7,
                        color: "#333333",
                        fontWeight: "bold",
                      }}
                    >
                      <Text>Your Service Price</Text>
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
                        underlineColorAndroid="transparent"
                        placeholder="Price"
                        placeholderTextColor="#666666"
                        keyboardType="numeric"
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
                        onChangeText={props.handleChange("price")}
                        onBlur={props.handleBlur("price")}
                        value={props.values.price}
                      />
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 3 }}>
                      <Text style={{ color: "red" }}>
                        {props.errors.price && props.errors.price}
                      </Text>
                    </View>
                  </View>
                ) : null}

                <View
                  style={{
                    marginBottom: 0,
                    marginTop: 0,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 7,
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Write About Your Service</Text>
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
                      <AntDesign name={"profile"} color="#1845B2" size={18} />
                    </View>

                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Description"
                      placeholderTextColor="#666666"
                      multiline={true}
                      numberOfLines={4}
                      textAlignVertical={"top"}
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
                      onChangeText={props.handleChange("description")}
                      onBlur={props.handleBlur("description")}
                      value={props.values.description}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.description && props.errors.description}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 3,
                  }}
                >
                  <Touchable
                    background={TouchableNativeFeedback.Ripple("#ECECEC")}
                    onPress={() => {
                      if (route && route.params && route.params.update) {
                      } else {
                        if (!addImage) {
                          setAddImageError("please select the service image");
                        } else {
                          setAddImageError("");
                        }
                      }

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
                        {route && route.params && route.params.update
                          ? "Update Service"
                          : "Create Service"}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </>
  );
};

export default AddService;
