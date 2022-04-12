/* eslint-disable radix */
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import {
  GET_HOME_PAGE_DETAILS,
  GET_HOME_PAGE_DETAILS_LOADING,
  GET_HOME_PAGE_DETAILS_ERROR,
  LOGIN_TO_GET_A_TOKEN,
  LOGIN_LOADING,
  LOGIN_ERROR,
  LOG_OUT,
  CHECK_UPDATE,
  CITY_DATA_SET,
  LAND_DATA_SET,
  ADMIN_SERVICE_DATA_SET,
  ONCHANGE_STONE_VALUE,
  PAYMENT_MODAL_TOGGLE,
  PAYMENT_ADD_METHOD_BOOKING_MODAL_TOGGLE,
} from "./types";

import AppConstants from "../../appConstants/AppConstants.js";

export const payMentModalToggle =
  (modalShowValue = false, modalDataPass = null) =>
  (dispatch) => {
    dispatch({
      type: PAYMENT_MODAL_TOGGLE,
      payloadModalShow: modalShowValue,
      payloadModalDataPass: modalDataPass,
    });
  };

export const payMentMethodAddModalToggle =
  (modalShowValue = false, modalDataPass = null) =>
  (dispatch) => {
    dispatch({
      type: PAYMENT_ADD_METHOD_BOOKING_MODAL_TOGGLE,
      payloadModalShow: modalShowValue,
      payloadModalDataPass: modalDataPass,
    });
  };

export const dataSetCityServiceAdmin =
  (type = "", listData = "") =>
  (dispatch) => {
    if (type === "city") {
      dispatch({
        type: CITY_DATA_SET,
        payload: listData,
      });
    } else if (type === "land") {
      dispatch({
        type: LAND_DATA_SET,
        payload: listData,
      });
    } else if (type === "service") {
      dispatch({
        type: ADMIN_SERVICE_DATA_SET,
        payload: listData,
      });
    }
  };

export const LogOutAction = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("@user_token");
    await AsyncStorage.removeItem("@user_obj");

    dispatch({
      type: LOG_OUT,
    });
  } catch (e) {}
};

export const LogUpAction = (response) => async (dispatch) => {
  if (response.data.token) {
    let localUserObject = JSON.stringify(
      response.data.info ? response.data.info : ""
    );
    (async () => {
      await AsyncStorage.setItem("@user_token", response.data.token);
      await AsyncStorage.setItem("@user_obj", localUserObject);
    })();
  }
  dispatch({
    type: LOGIN_TO_GET_A_TOKEN,
    payloadUserToken:
      response && response.data && response.data.token
        ? response.data.token
        : null,
    PayloadUserFirstName:
      response && response.data && response.data.info.first_name
        ? response.data.info.first_name
        : null,
    PayloadUserLastName:
      response && response.data && response.data.info.last_name
        ? response.data.info.last_name
        : null,
    PayloadUserMobile:
      response && response.data && response.data.info.mobile
        ? response.data.info.mobile
        : null,
    PayloadServiceUserType:
      response && response.data && response.data.info.service_type
        ? response.data.info.service_type
        : null,
  });
};

export const VerificationMobile =
  (number = "") =>
  async (dispatch) => {};

export const stoneValueChangeAction = (listValue) => (dispatch) => {
  dispatch({
    type: ONCHANGE_STONE_VALUE,
    payload: listValue,
  });
};

export const signInAction =
  (mobileNumber = "", Password = "") =>
  (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    });

    var data = JSON.stringify({ username: mobileNumber, password: Password });

    var config = {
      method: "post",
      url: "https://nt.dhyatiktok.com/ntapi/register/login",
      headers: {
        Authorization: "Bearer thsJ4[pR3=bM5^gJ0]pS6.gI2$hV5*uSwq",
        "Content-Type": "application/json",
      },
      data: data,
    };

    console.log("Request Going To be send ====>>>>>>");

    axios(config)
      .then(function (response) {
        var serverResponse = response;
        debugger;
        if (
          serverResponse &&
          serverResponse.data &&
          serverResponse.data.status
        ) {
          if (serverResponse.data.token) {
            console.log("TOKEN ===>", response.data.token);
            let localUserObject = JSON.stringify(
              serverResponse.data.data ? serverResponse.data.data : ""
            );
            (async () => {
              await AsyncStorage.setItem("@user_token", response.data.token);
              await AsyncStorage.setItem("@user_obj", localUserObject);
            })();
          }

          dispatch({
            type: LOGIN_TO_GET_A_TOKEN,
            payloadUserToken:
              serverResponse && serverResponse.data && serverResponse.data.token
                ? serverResponse.data.token
                : null,
            PayloadUserFirstName:
              serverResponse &&
              serverResponse.data &&
              serverResponse.data.data &&
              serverResponse.data.data.name
                ? serverResponse.data.data.name
                : null,
            PayloadUserLastName: null,
            PayloadUserMobile: null,
            PayloadServiceUserType:
              serverResponse &&
              serverResponse.data &&
              serverResponse.data.data &&
              serverResponse.data.data.user_id
                ? serverResponse.data.data.user_id
                : null,
          });
        } else {
          dispatch({
            type: LOGIN_ERROR,
          });
          NetInfo.fetch().then((state) => {
            if (state.isConnected) {
              Toast.show({
                text1:
                  serverResponse &&
                  serverResponse.data &&
                  serverResponse.data.message
                    ? serverResponse.data.message
                    : "Your Username or password is wrong",
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
        }
      })
      .catch(function (error) {
        dispatch({
          type: LOGIN_ERROR,
        });
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            Toast.show({
              text1: "Your Username or password is wrong",
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
  };

export const HomePageAction = () => async (dispatch, getState) => {
  try {
    const {
      authState: { userToken },
    } = getState();
    var emptyObj = JSON.stringify({});

    var config = {
      method: "post",
      url: "https://avgl.in/avira9api/home",
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: emptyObj,
    };

    axios(config)
      .then(function (response) {
        let homeSliderImage =
          response.data &&
          response.data.data &&
          response.data.data.slider &&
          Array.isArray(response.data.data.slider) &&
          response.data.data.slider.length > 0
            ? response.data.data.slider
            : [];

        let homeCategory =
          response.data &&
          response.data.data &&
          response.data.data.sub_category &&
          Array.isArray(response.data.data.sub_category) &&
          response.data.data.sub_category.length > 0
            ? response.data.data.sub_category
            : [];

        let appVersionObj = response.data.data.app.find(
          (o) => o.key === "AppVersion"
        );

        if (
          appVersionObj &&
          appVersionObj.value &&
          parseInt(appVersionObj.value.replace(".", "")) >
            parseInt(AppConstants.APP_VERSION.replace(".", ""))
        ) {
          let IsForceUpdateObj = response.data.data.app.find(
            (o) => o.key === "IsForceUpdate"
          );

          dispatch({
            type: CHECK_UPDATE,
            payload: true,
            payload2:
              IsForceUpdateObj && parseInt(IsForceUpdateObj.value) === 1
                ? true
                : false,
          });
        }

        dispatch({
          type: GET_HOME_PAGE_DETAILS,
          payload: homeSliderImage,
          payload2: homeCategory,
        });
      })
      .catch(function (error) {});
  } catch (err) {}
};

export const LaterUpdate = () => (dispatch) => {
  dispatch({
    type: CHECK_UPDATE,
    payload: false,
    payload2: false,
  });
};

export const contcatUsAction =
  (Name = "", mobileNumber = "", description = "") =>
  async (dispatch) => {
    var contactValue = {
      name: Name ? Name : "",
      mobile: mobileNumber ? mobileNumber : "",
      description: description ? description : "",
    };

    var config = {
      method: "post",
      url: "https://avgl.in/avira9api/ContactInquiry",
      headers: {
        "If-Match": "CONTACT_INQUIRY",
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://avgl.in/avira9api/ContactInquiry",
      contactValue,
      config
    );
    if (data.status) {
      Toast.show({
        text1: "Inquiry Submitted Successfully",
        visibilityTime: 3000,
        autoHide: true,
        position: "top",
        type: "success",
      });
    }
  };

export const setTokenValueAction = (userToken, userObjValues) => (dispatch) => {
  dispatch({
    type: LOGIN_TO_GET_A_TOKEN,
    payloadUserToken: userToken ? userToken : null,
    PayloadUserFirstName: userObjValues.first_name
      ? userObjValues.first_name
      : null,
    PayloadUserLastName: userObjValues.last_name
      ? userObjValues.last_name
      : null,
    PayloadUserMobile: userObjValues.mobile ? userObjValues.mobile : null,
    PayloadServiceUserType: userObjValues.service_type
      ? userObjValues.service_type
      : null,
  });
};
