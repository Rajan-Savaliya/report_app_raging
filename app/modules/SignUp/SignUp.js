import React, { useState, useEffect } from "react";
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
  TouchableWithoutFeedback,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { dataSetCityServiceAdmin } from "../../redux/actions/authActons.js";
import DropDownPicker from "react-native-dropdown-picker";
import { RadioButton, Checkbox } from "react-native-paper";
import RNFS from "react-native-fs";

import Header from "../../components/Header.component";
import Modal from "react-native-modal";
import { launchImageLibrary } from "react-native-image-picker";

const singInCheck = yup.object({
  name: yup.string().required(""),
  fullname: yup.string().required("your first name is required"),
  lastname: yup.string().required("your last name is required"),
  email: yup.string().required("your business name is required"),
  password: yup.string().required("your password is required").min(6),
  address: yup.string().required("your address is required"),
  pin: yup.string().required("your pin is required"),
});

const SignUp = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [verificationphoto, setVerificationphoto] = useState(null);

  const [cityLoading, setCityLoading] = useState(false);

  const [photoSelectionError, setPhotoSelectionError] = useState("");

  const [checked, setChecked] = useState("first");

  const [dropDownError, setDropDownError] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    route &&
      route.params &&
      route.params.cityList &&
      route.params.cityList[0] &&
      route.params.cityList[0].value
      ? route.params.cityList[0].value
      : null
  );
  const [items, setItems] = useState(
    route && route.params && route.params.cityList ? route.params.cityList : []
  );

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(
    route &&
      route.params &&
      route.params.adminDropDownList &&
      route.params.adminDropDownList[0] &&
      route.params.adminDropDownList[0].value
      ? route.params.adminDropDownList[0].value
      : null
  );
  const [items1, setItems1] = useState(
    route && route.params && route.params.adminDropDownList
      ? route.params.adminDropDownList
      : []
  );

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([]);

  useEffect(() => {
    const requestCityDataFetch = () => {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer sJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uS"
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://rd.ragingdevelopers.com/atender/api/register/city",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response = JSON.parse(result);
          if (response.success) {
            let citySelectionList = [];

            if (Array.isArray(response.data)) {
              response.data.forEach((valuesitem) => {
                citySelectionList.push({
                  label: valuesitem.name,
                  value: valuesitem.id,
                });
              });
              dispatch(dataSetCityServiceAdmin("city", citySelectionList));
            }
          } else {
          }
        })
        .catch((error) => console.log("error", error));
    };

    const requestAdminDataFetch = () => {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer sJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uS"
      );

      var requestOptions = {
        method: "post",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://rd.ragingdevelopers.com/atender/api/register/adminservice",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response = JSON.parse(result);
          if (response.success) {
            let adminServiceSelectionList = [];

            if (Array.isArray(response.data)) {
              response.data.forEach((valuesitem) => {
                adminServiceSelectionList.push({
                  label: valuesitem.name,
                  value: valuesitem.id,
                });
              });

              setItems(adminServiceSelectionList);
              dispatch(
                dataSetCityServiceAdmin("service", adminServiceSelectionList)
              );
            }
          } else {
          }
        })
        .catch((error) => console.log("error", error));
    };
  });

  useEffect(() => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer sJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uS");
    myHeaders.append(
      "Cookie",
      "ci_session=b32ebceceb23ae1434ce1d2194c7873dab5f01f5"
    );

    var formdata = new FormData();
    formdata.append("city_id", value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/register/landmark",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let response = JSON.parse(result);
        if (response.success) {
          let landSelectionList = [];

          if (Array.isArray(response.data)) {
            response.data.forEach((valuesitem) => {
              landSelectionList.push({
                label: valuesitem.name,
                value: valuesitem.id,
              });
            });

            setItems2(landSelectionList);
            setValue2(
              landSelectionList &&
                landSelectionList[0] &&
                landSelectionList[0].value
                ? landSelectionList[0].value
                : ""
            );
          }
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [value]);

  useEffect(() => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer sJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uS");
    myHeaders.append(
      "Cookie",
      "ci_session=b32ebceceb23ae1434ce1d2194c7873dab5f01f5"
    );

    var formdata = new FormData();
    formdata.append("service_type", checked == "first" ? "Daily" : "One Time");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/register/adminservice",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let response = JSON.parse(result);
        if (response.success) {
          let adminServiceSelectionList = [];

          if (Array.isArray(response.data)) {
            response.data.forEach((valuesitem) => {
              adminServiceSelectionList.push({
                label: valuesitem.name,
                value: valuesitem.id,
              });
            });

            setItems1(adminServiceSelectionList);
            setValue1(
              adminServiceSelectionList &&
                adminServiceSelectionList[0] &&
                adminServiceSelectionList[0].value
                ? adminServiceSelectionList[0].value
                : ""
            );
          }
          setLoading(false);
        } else {
          setItems1([]);
          setValue1(null);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [checked]);

  const [passwordHide, setPasswordHide] = useState(true);
  const [place, setPlace] = useState([
    {
      id: "1",
      name: "Alkapuri",
      city_id: "1",
      created_at: "2021-11-26 11:50:29",
      updated_at: null,
    },
    {
      id: "2",
      name: "Akota",
      city_id: "1",
      created_at: "2021-11-26 11:50:45",
      updated_at: null,
    },
  ]);
  const [adminService, serAdminService] = useState([
    {
      id: "1",
      name: "Salon",
      created_at: "2021-12-01 11:18:51",
      updated_at: null,
    },
    {
      id: "2",
      name: "Bottle",
      created_at: "2021-12-01 11:19:09",
      updated_at: null,
    },
  ]);
  const [city, setCity] = useState([
    {
      id: "1",
      name: "Vadodara",
      created_at: "2021-11-26 10:14:15",
      updated_at: "2021-11-26 10:20:15",
    },
    {
      id: "2",
      name: "Ahmedabad",
      created_at: "2021-11-26 10:14:26",
      updated_at: "2021-11-26 10:20:29",
    },
    {
      id: "3",
      name: "Surat",
      created_at: "2021-11-26 10:14:26",
      updated_at: "2021-11-26 10:20:29",
    },
    {
      id: "4",
      name: "Gandhinagar",
      created_at: "2021-11-26 10:14:26",
      updated_at: "2021-11-26 10:20:29",
    },
  ]);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.didCancel) {
        return true;
      }
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleChoosePhotoVerifyImage = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.didCancel) {
        return true;
      }
      if (response) {
        setVerificationphoto(response);
      }
    });
  };

  const [selectCityId, setSelectCityId] = useState("0");
  const [selectPlaceId, setSelectPlaceId] = useState("0");
  const [selectAdminServiceId, setSelectAdminServiceId] = useState("0");

  const [cityModel, setCityModel] = useState(false);
  const [placeModel, setPlaceModel] = useState(false);
  const [placeAdminServiceModel, setAdminServiceModel] = useState(false);

  const [loading, setLoading] = useState(false);

  const { userToken } = useSelector((state) => state.authState);

  useEffect(() => {
    if (userToken) {
      navigation.navigate("Home");
    }
  }, [navigation, userToken]);

  const Touchable =
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback;

  return (
    <>
      <StatusBar backgroundColor={"#FFFFFF"} barStyle="light-content" />

      <Modal
        onBackdropPress={() => setCityModel(false)}
        animationIn="slideInUp"
        isVisible={cityModel}
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 17, color: "#000000" }}
            >
              {" "}
              Select City
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
                {city && Array.isArray(city) && city.length > 0 ? (
                  <>
                    {city.map((item, index) => (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setSelectCityId(item.id);
                        }}
                      >
                        <View
                          style={{
                            borderColor: "#1845B2",
                            backgroundColor:
                              selectCityId == item.id ? "#1845B2" : "#F6F7FB",
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
                              color: !(selectCityId == item.id)
                                ? "#1845B2"
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
                setCityModel((item) => !item);
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 7,
                paddingHorizontal: 10,
                marginVertical: 0,
                marginHorizontal: 3,
                borderColor: "#1845B2",
                backgroundColor: "#F6F7FB",
                borderWidth: 1,
                borderRadius: 2,
                marginRight: 5,
                width: "35%",
              }}
            >
              <Text style={{ color: "#1845B2" }}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCityModel(false);
              }}
              style={{
                marginLeft: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1845B2",
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

      <Modal
        onBackdropPress={() => setPlaceModel(false)}
        animationIn="slideInUp"
        isVisible={placeModel}
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 17, color: "#000000" }}
            >
              {" "}
              Select Your LandMark
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
              {/* list item */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  flexWrap: "wrap",
                }}
              >
                {place && Array.isArray(place) && place.length > 0 ? (
                  <>
                    {place.map((item, index) => (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setSelectPlaceId(item.id);
                        }}
                      >
                        <View
                          style={{
                            borderColor: "#1845B2",
                            backgroundColor:
                              selectPlaceId == item.id ? "#1845B2" : "#F6F7FB",
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
                              color: !(selectPlaceId == item.id)
                                ? "#1845B2"
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

              {/* end--ListItem */}
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
                setPlaceModel((item) => !item);
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 7,
                paddingHorizontal: 10,
                marginVertical: 0,
                marginHorizontal: 3,
                borderColor: "#1845B2",
                backgroundColor: "#F6F7FB",
                borderWidth: 1,
                borderRadius: 2,
                marginRight: 5,
                width: "35%",
              }}
            >
              <Text style={{ color: "#1845B2" }}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPlaceModel(false);
              }}
              style={{
                marginLeft: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1845B2",
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

      <Modal
        onBackdropPress={() => setAdminServiceModel(false)}
        animationIn="slideInUp"
        isVisible={placeAdminServiceModel}
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 17, color: "#000000" }}
            >
              {" "}
              Select Service
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
              {/* list item */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  flexWrap: "wrap",
                }}
              >
                {adminService &&
                Array.isArray(adminService) &&
                adminService.length > 0 ? (
                  <>
                    {adminService.map((item, index) => (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setSelectAdminServiceId(item.id);
                        }}
                      >
                        <View
                          style={{
                            borderColor: "#1845B2",
                            backgroundColor:
                              selectAdminServiceId == item.id
                                ? "#1845B2"
                                : "#F6F7FB",
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
                              color: !(selectAdminServiceId == item.id)
                                ? "#1845B2"
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
                setAdminServiceModel((item) => !item);
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 7,
                paddingHorizontal: 10,
                marginVertical: 0,
                marginHorizontal: 3,
                borderColor: "#1845B2",
                backgroundColor: "#F6F7FB",
                borderWidth: 1,
                borderRadius: 2,
                marginRight: 5,
                width: "35%",
              }}
            >
              <Text style={{ color: "#1845B2" }}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAdminServiceModel(false);
              }}
              style={{
                marginLeft: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1845B2",
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

      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />
      <Header
        title="Sign Up"
        leftIcon="keyboard-backspace"
        rightIcon="plus"
        headerColor={"#FFFFFF"}
        titleColor={"#000000"}
        iconColor={"#000000"}
        leftIconPress={() => navigation.goBack()}
      />

      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
        >
          {photo && photo.assets && photo.assets[0] && photo.assets[0].uri ? (
            <TouchableOpacity
              onPress={handleChoosePhoto}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Image
                source={{ uri: photo.assets[0].uri }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  marginLeft: 10,
                }}
              />
              <Image
                source={require("../../assets/upload.png")}
                style={{
                  width: 30,
                  height: 30,
                  left: 30,
                  bottom: 10,
                }}
              />

              <View>
                <Text style={{ color: "#000000" }}>
                  Change Your Profile Image
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleChoosePhoto}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Image
                source={{
                  uri: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  marginLeft: 10,
                }}
              />
              <Image
                source={require("../../assets/upload.png")}
                style={{
                  width: 30,
                  height: 30,
                  left: 30,
                  bottom: 10,
                }}
              />

              <View style={{}}>
                <Text style={{ color: "#000000" }}>Add Your Profile Image</Text>
              </View>
              <View>
                <Text style={{ color: "red" }}>
                  {photoSelectionError ? photoSelectionError : ""}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <Formik
            initialValues={{
              name:
                route && route.params && route.params.number
                  ? route.params.number
                  : "",
              fullname: "",
              lastname: "",
              email: "",
              password: "",
              address: "",
              pin: "",
            }}
            validationSchema={singInCheck}
            onSubmit={(values, actions) => {
              RNFS.readFile(photo.assets[0].uri, "base64")
                .then((PhotoUserImageBase4Image) => {
                  if (
                    verificationphoto &&
                    verificationphoto.assets &&
                    verificationphoto.assets[0] &&
                    verificationphoto.assets[0].uri
                  ) {
                    RNFS.readFile(verificationphoto.assets[0].uri, "base64")
                      .then((DocVerifyBase64Image) => {
                        if (!photo) {
                          setPhotoSelectionError("Select your photo");
                          return true;
                        }
                        setPhotoSelectionError("");

                        var myHeaders = new Headers();
                        myHeaders.append(
                          "Authorization",
                          "Bearer sJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uS"
                        );

                        var formdata = new FormData();
                        formdata.append(
                          "profile_photo",
                          PhotoUserImageBase4Image
                        );
                        formdata.append("verify_doc", DocVerifyBase64Image);

                        formdata.append("first_name", values.fullname);

                        formdata.append("last_name", values.lastname);
                        formdata.append("business_name", values.email);
                        formdata.append(
                          "mobile",
                          route && route.params && route.params.number
                            ? route.params.number
                            : ""
                        );
                        formdata.append("password", values.password);
                        formdata.append("city_id", value ? value : null);
                        formdata.append("landmark_id", value2 ? value2 : null);
                        formdata.append("pincode", values.pin);
                        formdata.append(
                          "service_type_id",
                          value1 ? value1 : null
                        );
                        formdata.append("address", values.address);

                        var requestOptions = {
                          method: "POST",
                          headers: myHeaders,
                          body: formdata,
                          redirect: "follow",
                        };

                        setLoading(true);

                        fetch(
                          "https://rd.ragingdevelopers.com/atender/api/register",
                          requestOptions
                        )
                          .then((response) => response.text())
                          .then((result) => {
                            setLoading(false);

                            var response = JSON.parse(result);
                            if (response && response.success) {
                              navigation.navigate("SignIn");
                              actions.resetForm();
                              Toast.show({
                                text1: response.message
                                  ? response.message
                                  : "Your Account successfully created",
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
                            setLoading(false);

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
                        setLoading(false);
                        Toast.show({
                          text1: "something went wrong try again",
                          visibilityTime: 3000,
                          autoHide: true,
                          position: "top",
                          type: "error",
                        });
                      });
                  } else {
                    if (!photo) {
                      setPhotoSelectionError("Select your photo");
                      return true;
                    }
                    setPhotoSelectionError("");

                    var myHeaders = new Headers();
                    myHeaders.append(
                      "Authorization",
                      "Bearer sJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uS"
                    );

                    var formdata = new FormData();
                    formdata.append("profile_photo", PhotoUserImageBase4Image);
                    // formdata.append("verify_doc", DocVerifyBase64Image);

                    formdata.append("first_name", values.fullname);

                    formdata.append("last_name", values.lastname);
                    formdata.append("business_name", values.email);
                    formdata.append(
                      "mobile",
                      route && route.params && route.params.number
                        ? route.params.number
                        : ""
                    );
                    formdata.append("password", values.password);
                    formdata.append("city_id", value ? value : null);
                    formdata.append("landmark_id", value2 ? value2 : null);
                    formdata.append("pincode", values.pin);
                    formdata.append("service_type_id", value1 ? value1 : null);
                    formdata.append("address", values.address);

                    var requestOptions = {
                      method: "POST",
                      headers: myHeaders,
                      body: formdata,
                      redirect: "follow",
                    };

                    setLoading(true);

                    fetch(
                      "https://rd.ragingdevelopers.com/atender/api/register",
                      requestOptions
                    )
                      .then((response) => response.text())
                      .then((result) => {
                        setLoading(false);

                        var response = JSON.parse(result);
                        if (response && response.success) {
                          navigation.navigate("SignIn");
                          actions.resetForm();
                          Toast.show({
                            text1: response.message
                              ? response.message
                              : "Your Account successfully created",
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
                        setLoading(false);

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
                })
                .catch((e) => {
                  setLoading(false);
                  Toast.show({
                    text1: "something went wrong try again",
                    visibilityTime: 3000,
                    autoHide: true,
                    position: "top",
                    type: "error",
                  });
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
                    <Text>First Name</Text>
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
                      <Ionicons name="person" color="#1845B2" size={18} />
                    </View>

                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="first name"
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
                      onChangeText={props.handleChange("fullname")}
                      onBlur={props.handleBlur("fullname")}
                      value={props.values.fullname}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.fullname && props.errors.fullname}
                    </Text>
                  </View>
                </View>

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
                    <Text>Last Name</Text>
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
                      <Ionicons name="person" color="#1845B2" size={18} />
                    </View>

                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="last name"
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
                      onChangeText={props.handleChange("lastname")}
                      onBlur={props.handleBlur("lastname")}
                      value={props.values.lastname}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.lastname && props.errors.lastname}
                    </Text>
                  </View>
                </View>

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
                    <Text>Business Name</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Your Business Name"
                      placeholderTextColor="#666666"
                      style={{
                        color: "#000000",
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        flex: 0.9,
                      }}
                      onChangeText={props.handleChange("email")}
                      onBlur={props.handleBlur("email")}
                      value={props.values.email}
                    />

                    <View
                      style={{
                        zIndex: 5,
                        flex: 0.1,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                      }}
                    >
                      <MaterialCommunityIcons
                        name={"card-account-details"}
                        color="#1845B2"
                        size={18}
                      />
                    </View>
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.email && props.errors.email}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 7,
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Mobile Number</Text>
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
                      <Ionicons name="call" color="#1845B2" size={18} />
                    </View>

                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="+91 1234567890"
                      placeholderTextColor="#666666"
                      keyboardType="numeric"
                      editable={false}
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
                      {props.touched.name && props.errors.name}
                    </Text>
                  </View>
                </View>

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
                    <Text>Password</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Password"
                      placeholderTextColor="#666666"
                      secureTextEntry={passwordHide ? true : false}
                      style={{
                        color: "#000000",
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        flex: 0.9,
                      }}
                      onChangeText={props.handleChange("password")}
                      onBlur={props.handleBlur("password")}
                      value={props.values.password}
                    />

                    <View
                      style={{
                        zIndex: 5,
                        flex: 0.1,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                      }}
                    >
                      <Ionicons
                        onPress={() => {
                          setPasswordHide((item) => !item);
                        }}
                        name={passwordHide ? "eye-off" : "eye"}
                        color="#1845B2"
                        size={18}
                      />
                    </View>
                  </View>
                  <View style={{ marginBottom: 10, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.password && props.errors.password}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <View
                    style={{
                      marginBottom: 7,
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Address</Text>
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
                      <FontAwesome
                        name="address-card"
                        color="#1845B2"
                        size={18}
                      />
                    </View>

                    <TextInput
                      multiline={true}
                      numberOfLines={4}
                      textAlignVertical={"top"}
                      underlineColorAndroid="transparent"
                      placeholder="Write your address"
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
                      onChangeText={props.handleChange("address")}
                      onBlur={props.handleBlur("address")}
                      value={props.values.address}
                    />
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.touched.address && props.errors.address}
                    </Text>
                  </View>
                </View>

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
                    <Text>PinCode</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Add Your PinCode"
                      placeholderTextColor="#666666"
                      keyboardType="numeric"
                      style={{
                        color: "#000000",
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        flex: 0.9,
                      }}
                      onChangeText={props.handleChange("pin")}
                      onBlur={props.handleBlur("pin")}
                      value={props.values.pin}
                    />

                    <View
                      style={{
                        zIndex: 5,
                        flex: 0.1,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                      }}
                    >
                      <MaterialCommunityIcons
                        name={"card-account-details"}
                        color="#1845B2"
                        size={18}
                      />
                    </View>
                  </View>
                  <View style={{ marginBottom: 5, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {props.errors.pin && props.errors.pin}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginBottom: 7,
                    color: "#333333",
                    fontWeight: "bold",
                  }}
                >
                  <Text>Service type</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 0,
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <View>
                      <RadioButton
                        value="first"
                        status={checked === "first" ? "checked" : "unchecked"}
                        onPress={() => setChecked("first")}
                        color="#1845B2"
                        uncheckedColor="#808080"
                      />
                    </View>
                    <View>
                      <Text>Every day</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      <RadioButton
                        value="second"
                        status={checked === "second" ? "checked" : "unchecked"}
                        onPress={() => setChecked("second")}
                        color="#1845B2"
                        uncheckedColor="#808080"
                      />
                    </View>
                    <View>
                      <Text>One time</Text>
                    </View>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      marginBottom: 7,
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Select Service</Text>
                  </View>

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
                    open={open1}
                    value={value1}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setItems1}
                  />
                  <View style={{ marginBottom: 2, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {dropDownError ? dropDownError : ""}
                    </Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      marginBottom: 7,
                      color: "#333333",
                      fontWeight: "bold",
                    }}
                  >
                    <Text>Select Your City</Text>
                  </View>

                  <DropDownPicker
                    placeholder="Select Your City"
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    style={{
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "#dddddd",
                      zIndex: 10,
                    }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                  />
                  <View style={{ marginBottom: 2, marginTop: 3 }}>
                    <Text style={{ color: "red" }}>
                      {dropDownError ? dropDownError : ""}
                    </Text>
                  </View>
                </View>

                {value2 && Array.isArray(items2) && items2.length > 0 ? (
                  <View>
                    <View
                      style={{
                        marginBottom: 7,
                        color: "#333333",
                        fontWeight: "bold",
                      }}
                    >
                      <Text>Select Your LandMark</Text>
                    </View>

                    <DropDownPicker
                      placeholder="Select Your LandMark"
                      listMode="SCROLLVIEW"
                      scrollViewProps={{
                        nestedScrollEnabled: true,
                      }}
                      style={{
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        zIndex: 1,
                      }}
                      open={open2}
                      value={value2}
                      items={items2}
                      setOpen={setOpen2}
                      setValue={setValue2}
                      setItems={setItems2}
                    />
                    <View style={{ marginBottom: 2, marginTop: 3 }}>
                      <Text style={{ color: "red" }}>
                        {dropDownError ? dropDownError : ""}
                      </Text>
                    </View>
                  </View>
                ) : null}

                <TouchableOpacity
                  onPress={handleChoosePhotoVerifyImage}
                  style={{
                    marginBottom: 7,
                    color: "#333333",
                    fontWeight: "bold",
                  }}
                >
                  <View>
                    <View style={{}}>
                      {verificationphoto &&
                      verificationphoto.assets &&
                      verificationphoto.assets[0] &&
                      verificationphoto.assets[0].uri ? (
                        <Image
                          source={{ uri: verificationphoto.assets[0].uri }}
                          style={{ width: 80, height: 80 }}
                        />
                      ) : null}
                    </View>
                    <View>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.7}
                        style={{
                          textDecorationLine: "underline",
                          textDecorationStyle: "solid",
                          textDecorationColor: "#1845B2",
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "#1845B2",
                        }}
                      >
                        {verificationphoto
                          ? "Change Verification Document Image"
                          : "Verification Document Image Upload"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 3,
                  }}
                >
                  <Touchable
                    accessible={false}
                    background={TouchableNativeFeedback.Ripple("#ECECEC")}
                    onPress={() => {
                      if (!photo) {
                        setPhotoSelectionError("Select your photo");
                      } else {
                        setPhotoSelectionError("");
                      }

                      if (!photo) {
                        return true;
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
                        Join Us
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            )}
          </Formik>

          <View
            style={{
              marginTop: 15,
              marginHorizontal: 30,
              paddingVertical: 0.4,
              elevation: 1,
              backgroundColor: "#DDDDDD",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#666666" }}>
              You have a already registered{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={{ color: "#1845B2" }}>here</Text>
              <View
                style={{
                  paddingVertical:
                    Dimensions.get("window").height < 600 ? 0.7 : 0.6,
                  backgroundColor: "#1845B2",
                }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignUp;
