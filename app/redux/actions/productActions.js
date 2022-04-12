import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import { LogOutAction } from "../actions/authActons";
import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_ERROR,
  GET_FILTER_VALUE,
  GET_FILTER_VALUE_LOADING,
  GET_FILTER_VALUE_ERROR,
  GET_PRODUCT_LOADING,
  SET_GENDER_CHECK_VALUE,
  SET_SUB_CATEGORY_VALUE,
  SET_CATEGORY_VALUE,
  SET_ITEM_GROUP_VALUE,
  CLEAR_FILTERS,
  SET_FILTER,
  SET_LOADING_PAGINATION,
  SET_PAGINATION_LIST_END,
  GET_CARD_ITEMS,
  GET_CARD_ITEMS_LOADING,
  GET_CARD_ITEMS_ERROR,
  CARD_ITEM_INCREMENT,
  CARD_ITEM_DECREMENT,
  CARD_ITEM_VALUE_REMOVE,
  ADD_CARD_ITEM,
  CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_LOADING,
  CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_ERROR_OR_DONE,
  CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_LOADING,
  CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_ERROR_OR_DONE,
  GET_LIKE_ITEMS,
  GET_LIKE_ITEMS_LOADING,
  GET_LIKE_ITEMS_ERROR,
  LIKE_UNLIKE_SERVER_SIDE_LOADING,
  LIKE_UNLIKE_SERVER_SIDE_ERROR_DONE,
  LIKE_ITEM_VALUE_ADD,
  UNLIKE_ITEM_VALUE_REMOVE,
  LIST_ORDER_ITEM_LOADING,
  LIST_ORDER_ITEM,
  LIST_ORDER_ITEM_ERROR,
  PLACE_ORDER_ITEMS,
  PLACE_ORDER_ITEMS_LOADING,
  PLACE_ORDER_ITEMS_ERROR,
  EDIT_ORDER_ITEM_LOADING,
  EDIT_ORDER_ITEM_BY_ID,
  EDIT_ORDER_ITEM_ERROR,
  TOGGLE_SEARCH_MODEL,
  SET_SEARCH,
  GET_GROUP_SIZE_LOADING,
  GET_GROUP_SIZE_LIST,
  GET_GROUP_SIZE_LIST_ERROR,
  SET_REMARK_MODEL,
  REMARK_ITEM_STATE_CHANGE,
  SET_GROUP_MODEL,
  SET_SIZE_MODEL,
  SET_GROUP_ID_STATE_CHANGE,
  SET_SIZE_ID_STATE_CHANGE,
  ORDER_PDF_PAGE_HTML,
  ORDER_PED_PAGE_HTML_LOADING,
  ORDER_PDF_PAGE_HTML_ERROR,
  GET_CUSTOMER_ITEMS,
  GET_CUSTOMER_ITEMS_ERROR,
  GET_CUSTOMER_ITEMS_LOADING,
  SET_LOADING_SPINNER_ACTION,
  GET_DELIVERY_ITEMS_LOADING,
  GET_DELIVERY_ITEMS,
  GET_DELIVERY_ITEMS_ERROR,
  GET_DELIVERY_REPORTS_LOADING,
  GET_DELIVERY_REPORTS,
  GET_DELIVERY_REPORTS_ERROR,
  CUSTOMER_DELIVERY_DETAILS_LOADING,
  CUSTOMER_DELIVERY_DETAILS_ERROR,
  CUSTOMER_DELIVERY_DETAILS_LIST,
  DELIVERY_STATE_CAHNGE,
  PRODUCT_DATA_LOGOUT,
  PENDING_LIST_SELECTION,
  PENDING_ORDER_STATE_SELECTION_ADD,
  PENDING_ORDER_STATE_SELECTION_REMOVE,
  REMOVE_SELECTION_PENDING_LIST,
  GET_BOOKING_ITEMS_ERROR,
  GET_BOOKING_ITEMS,
  GET_BOOKING_ITEMS_LOADING,
  GET_PAYMENT_ITEMS_LOADING,
  GET_PAYMENT_ITEMS,
  GET_PAYMENT_ITEMS_ERROR,
  SELECTION_ALL_PENDING_SELECTION_LIST,
  GET_ONETIME_BOOKING_REPORT,
  GET_ONETIME_BOOKING_REPORT_ERROR,
  GET_ONETIME_BOOKING_REPORT_LOADING,
} from "./types";

export const getBackgrounfDeliveryAction = () => async (dispatch, getState) => {
  try {
    const {
      authState: { userToken },
    } = getState();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/delivery",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let response = JSON.parse(result);

        // if (
        //   response &&
        //   response.success == 0 &&
        //   response.message.includes("Invalid Api Token")
        // ) {
        //   dispatch(prodcutDataLogOut());
        // }

        if (response.success) {
          dispatch({
            type: GET_DELIVERY_ITEMS,
            payloadPending:
              response.data &&
              response.data.pending &&
              Array.isArray(response.data.pending) &&
              response.data.pending.length > 0
                ? response.data.pending
                : [],
            payloadDone:
              response.data &&
              response.data.delivered &&
              Array.isArray(response.data.delivered) &&
              response.data.delivered.length > 0
                ? response.data.delivered
                : [],
            payloadCancel:
              response.data &&
              response.data.cancelled &&
              Array.isArray(response.data.cancelled) &&
              response.data.cancelled.length > 0
                ? response.data.cancelled
                : [],
            payloadAdditional:
              response.data &&
              response.data.additional &&
              Array.isArray(response.data.additional) &&
              response.data.additional.length > 0
                ? response.data.additional
                : [],
          });
        } else {
          dispatch({
            type: GET_DELIVERY_ITEMS_ERROR,
            payload: response.message
              ? response.message
              : "server response failed",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_DELIVERY_ITEMS_ERROR,
          payload: "server response failed",
        });
      });
  } catch (e) {}
};

export const getBackGroundBookingAction = () => async (dispatch, getState) => {
  try {
    const {
      authState: { userToken },
    } = getState();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/onetime/booking",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let response = JSON.parse(result);

        // if (
        //   response &&
        //   response.success == 0 &&
        //   response.message.includes("Invalid Api Token")
        // ) {
        //   dispatch(prodcutDataLogOut());
        // }

        if (response.success) {
          dispatch({
            type: GET_BOOKING_ITEMS,
            payloadPending:
              response.data &&
              response.data.pending &&
              Array.isArray(response.data.pending) &&
              response.data.pending.length > 0
                ? response.data.pending
                : [],
            payloadDone:
              response.data &&
              response.data.completed &&
              Array.isArray(response.data.completed) &&
              response.data.completed.length > 0
                ? response.data.completed
                : [],
            payloadCancel:
              response.data &&
              response.data.cancelled &&
              Array.isArray(response.data.cancelled) &&
              response.data.cancelled.length > 0
                ? response.data.cancelled
                : [],
          });
        } else {
          dispatch({
            type: GET_BOOKING_ITEMS_ERROR,
            payload: response.message
              ? response.message
              : "server response failed",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_BOOKING_ITEMS_ERROR,
          payload: "server response failed",
        });
      });
  } catch (e) {}
};

export const removeSelectionListDeliveyAction = () => (dispatch) => {
  dispatch({
    type: REMOVE_SELECTION_PENDING_LIST,
  });
};

export const pendingOrderStateSelection =
  (value = false) =>
  (dispatch) => {
    dispatch({
      type: PENDING_LIST_SELECTION,
      payload: value,
    });
  };

export const selectionOrderSelectAddAction =
  (customerId = null, serviceId = null) =>
  (dispatch) => {
    if (customerId !== null && serviceId !== null) {
      dispatch({
        type: PENDING_ORDER_STATE_SELECTION_ADD,
        payloadCustomerId: customerId,
        payloadServiceId: serviceId,
      });
    }
  };
export const selectAllOrderSelectionAction = () => (dispatch) => {
  dispatch({
    type: SELECTION_ALL_PENDING_SELECTION_LIST,
  });
};

export const SelectionOrderRemoveAction =
  (customerId = null) =>
  (dispatch) => {
    if (customerId !== null) {
      dispatch({
        type: PENDING_ORDER_STATE_SELECTION_REMOVE,
        payloadCustomerId: customerId,
      });
    }
  };

export const prodcutDataLogOut = () => (dispatch) => {
  dispatch(LogOutAction());
  dispatch({
    type: PRODUCT_DATA_LOGOUT,
  });
};

export const setLoadingSpinerAction =
  (value = false) =>
  (dispatch) => {
    dispatch({
      type: SET_LOADING_SPINNER_ACTION,
      payload: value,
    });
  };

export const serverAddMethod =
  (name = "", price = "", info = "") =>
  (dispatch, getState) => {
    var myHeaders = new Headers();
    dispatch({
      type: SET_LOADING_SPINNER_ACTION,
      payload: true,
    });

    const {
      authState: { userToken },
    } = getState();

    myHeaders.append("Authorization", `Bearer ${userToken}`);

    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", info);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/services/addService",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        var response = JSON.parse(result);
        dispatch({
          type: SET_LOADING_SPINNER_ACTION,
          payload: false,
        });

        // if (
        //   response &&
        //   response.success == 0 &&
        //   response.message.includes("Invalid Api Token")
        // ) {
        //   dispatch(prodcutDataLogOut());
        // }

        if (response && response.success) {
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
        dispatch({
          type: SET_LOADING_SPINNER_ACTION,
          payload: false,
        });

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
  };

export const customerAddMethod =
  (
    name = "",
    mobile = "",
    address = "",
    service_id = "",
    type = "",
    bottle = "",
    week_days = ""
  ) =>
  (dispatch, getState) => {
    var myHeaders = new Headers();
    dispatch({
      type: SET_LOADING_SPINNER_ACTION,
      payload: true,
    });

    const {
      authState: { userToken },
    } = getState();

    myHeaders.append("Authorization", `Bearer ${userToken}`);

    var formdata = new FormData();
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("mobile", mobile);
    formdata.append("address", address);
    formdata.append("service_id", service_id);
    formdata.append("type", type);
    if (type === "custom") {
      formdata.append("week_days", week_days);
    }
    formdata.append("bottle", bottle);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/customer/addCustomer",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        dispatch({
          type: SET_LOADING_SPINNER_ACTION,
          payload: false,
        });

        var response = JSON.parse(result);

        // if (
        //   response &&
        //   response.success == 0 &&
        //   response.message.includes("Invalid Api Token")
        // ) {
        //   dispatch(prodcutDataLogOut());
        // }

        if (response && response.success) {
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
        dispatch({
          type: SET_LOADING_SPINNER_ACTION,
          payload: false,
        });

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
  };

export const serverUpdateAction =
  (id = "", name = "", price = "", info = "") =>
  (dispatch, getState) => {
    var myHeaders = new Headers();
    dispatch({
      type: SET_LOADING_SPINNER_ACTION,
      payload: true,
    });

    const {
      authState: { userToken },
    } = getState();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    var formdata = new FormData();
    formdata.append("service_id", id);
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", info);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/services/addService",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        var response = JSON.parse(result);
        dispatch({
          type: SET_LOADING_SPINNER_ACTION,
          payload: false,
        });
        // if (
        //   response &&
        //   response.success == 0 &&
        //   response.message.includes("Invalid Api Token")
        // ) {
        //   dispatch(prodcutDataLogOut());
        // }

        if (response && response.success) {
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
        dispatch({
          type: SET_LOADING_SPINNER_ACTION,
          payload: false,
        });

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
  };

export const customerUpdateMethod =
  (
    name = "",
    mobile = "",
    address = "",
    service_id = "",
    type = "",
    bottle = "",
    week_days = "",
    customerID = ""
  ) =>
  (dispatch, getState) => {
    var myHeaders = new Headers();
    dispatch({
      type: SET_LOADING_SPINNER_ACTION,
      payload: true,
    });

    const {
      authState: { userToken },
    } = getState();

    myHeaders.append("Authorization", `Bearer ${userToken}`);

    var formdata = new FormData();
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("mobile", mobile);
    formdata.append("address", address);
    formdata.append("service_id", service_id);
    formdata.append("type", type);
    if (type === "custom") {
      formdata.append("week_days", week_days);
    }
    formdata.append("bottle", bottle);
    formdata.append("customer_id", customerID);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/customer/updateCustomer",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        var response = JSON.parse(result);
        dispatch({
          type: SET_LOADING_SPINNER_ACTION,
          payload: false,
        });

        // if (
        //   response &&
        //   response.success == 0 &&
        //   response.message.includes("Invalid Api Token")
        // ) {
        //   dispatch(prodcutDataLogOut());
        // }

        if (response && response.success) {
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
        dispatch({
          type: SET_LOADING_SPINNER_ACTION,
          payload: false,
        });

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
  };

// state dilivery state
export const setDeliveryStatus =
  (customerId = "", serviceId = "", state = "") =>
  (dispatch, getState) => {
    if (state == "CANCELLED") {
      dispatch({
        type: SET_LOADING_SPINNER_ACTION,
        payload: true,
      });

      var {
        authState: { userToken },
      } = getState();

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userToken}`);

      var formdata = new FormData();

      formdata.append("customer_id", customerId);
      formdata.append("service_id", serviceId);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://rd.ragingdevelopers.com/atender/api/delivery/deliveryStatusCancelled",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          var response = JSON.parse(result);
          dispatch({
            type: SET_LOADING_SPINNER_ACTION,
            payload: false,
          });

          if (response && response.success) {
            dispatch(getBackgrounfDeliveryAction());

            Toast.show({
              text1: response.message
                ? response.message
                : "Delivery Status Updated Successfully.",
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
          dispatch({
            type: SET_LOADING_SPINNER_ACTION,
            payload: false,
          });

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
    } else {
      var myHeaders = new Headers();
      dispatch({
        type: SET_LOADING_SPINNER_ACTION,
        payload: true,
      });

      var {
        authState: { userToken },
        productState: {
          selectPendingOrderCustomerIdList,
          selectPendingOrderServiceIdList,
        },
      } = getState();

      myHeaders.append("Authorization", `Bearer ${userToken}`);

      var formdata = new FormData();
      formdata.append(
        "customer_id",
        selectPendingOrderCustomerIdList.toString()
      );
      formdata.append("service_id", selectPendingOrderServiceIdList.toString());

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      fetch(
        "https://rd.ragingdevelopers.com/atender/api/delivery/deliveryStatusDelivered",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          var response = JSON.parse(result);
          dispatch({
            type: SET_LOADING_SPINNER_ACTION,
            payload: false,
          });

          // if (
          //   response &&
          //   response.success == 0 &&
          //   response.message.includes("Invalid Api Token")
          // ) {
          //   dispatch(prodcutDataLogOut());
          // }

          if (response && response.success) {
            dispatch(getBackgrounfDeliveryAction());

            Toast.show({
              text1: response.message
                ? response.message
                : "Delivery Status Updated Successfully.",
              visibilityTime: 3000,
              autoHide: true,
              position: "top",
              type: "success",
            });
          } else {
            dispatch({
              type: SET_LOADING_SPINNER_ACTION,
              payload: false,
            });

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
          dispatch({
            type: SET_LOADING_SPINNER_ACTION,
            payload: false,
          });

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
  };

export const setBookingStatus =
  (bookingId = "", state = "") =>
  (dispatch, getState) => {
    if (bookingId) {
      dispatch({
        type: SET_LOADING_SPINNER_ACTION,
        payload: true,
      });

      var {
        authState: { userToken },
      } = getState();

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userToken}`);

      var formdata = new FormData();
      formdata.append("booking_id", bookingId);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        state === "CANCEL"
          ? "https://rd.ragingdevelopers.com/atender/api/onetime/booking/bookingCancellation"
          : "https://rd.ragingdevelopers.com/atender/api/onetime/booking/bookingCompleted",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          var response = JSON.parse(result);
          dispatch({
            type: SET_LOADING_SPINNER_ACTION,
            payload: false,
          });

          if (response && response.success) {
            dispatch(getBackGroundBookingAction());

            Toast.show({
              text1: response.message
                ? response.message
                : "Delivery Status Updated Successfully.",
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
          dispatch({
            type: SET_LOADING_SPINNER_ACTION,
            payload: false,
          });

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
  };

export const customerDeliveryDetailByID =
  (stateDate = "", endDate = "", customerId = "") =>
  (dispatch, getState) => {
    dispatch({
      type: CUSTOMER_DELIVERY_DETAILS_LOADING,
    });

    console.log(stateDate, endDate, customerId);

    const {
      authState: { userToken },
    } = getState();

    var data = JSON.stringify({
      from: stateDate,
      to: endDate,
      customer_id: customerId,
    });

    var config = {
      method: "post",
      url: "https://nt.dhyatiktok.com/ntapi/home/get_account_ledger",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    // myHeaders.append("Authorization", `Bearer ${userToken}`);

    // var formdata = new FormData();
    // formdata.append("start_date", stateDate);
    // formdata.append("end_date", endDate);
    // formdata.append("customer_id", customerId);

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: "follow",
    // };

    axios(config)
      .then(function (response) {
        // if (
        //   response &&
        //   response.success == 0 &&
        //   response.message.includes("Invalid Api Token")
        // ) {
        //   dispatch(prodcutDataLogOut());
        // }
        var serverReponseData = response.data;

        if (serverReponseData) {
          dispatch({
            type: CUSTOMER_DELIVERY_DETAILS_LIST,
            payload: serverReponseData.data ? serverReponseData.data : [],
            payloadFullData: serverReponseData,
          });
          Toast.show({
            text1: "Successfully get a customer report data",
            visibilityTime: 15000,
            autoHide: true,
            position: "top",
            type: "success",
          });
        } else {
          dispatch({
            type: CUSTOMER_DELIVERY_DETAILS_ERROR,
            payload:
              response.data && response.data.message
                ? response.data.message
                : "server response failed",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: CUSTOMER_DELIVERY_DETAILS_ERROR,
          payload: "server response failed",
        });
      });
  };

export const getCardItemsAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_CARD_ITEMS_LOADING,
  });

  try {
    const {
      authState: { userToken, userServiceType },
    } = getState();

    var config = {
      method: "get",
      url: "https://nt.dhyatiktok.com/ntapi/home/get_home_report",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios(config)
      .then(function (response) {
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          dispatch({
            type: GET_CARD_ITEMS,
            payloadCardList: response.data.data ? response.data.data : [],
            payloadTotalCardList:
              response.data.totalcredit || response.data.totalcredit == 0
                ? response.data.totalcredit
                : 0,
            payloadTotalDedit:
              response.data.totaldebit || response.data.totaldebit == 0
                ? response.data.totaldebit
                : 0,
          });
        } else {
          dispatch({
            type: GET_CARD_ITEMS_ERROR,
            payload:
              response.data && response.data.message
                ? response.data.message
                : "server response failed",
            payloadTotalCardList:
              response.data.totalcredit || response.data.totalcredit == 0
                ? response.data.totalcredit
                : 0,
            payloadTotalDedit:
              response.data.totaldebit || response.data.totaldebit == 0
                ? response.data.totaldebit
                : 0,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: GET_CARD_ITEMS_ERROR,
          payload: "server response failed",
          payloadTotalCardList: 0,
          payloadTotalDedit: 0,
        });
      });
  } catch (e) {}
};

export const getBookingAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_BOOKING_ITEMS_LOADING,
  });

  try {
    const {
      authState: { userToken },
    } = getState();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/onetime/booking",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let response = JSON.parse(result);

        // if (
        //   response &&
        //   response.success == 0 &&
        //   response.message.includes("Invalid Api Token")
        // ) {
        //   dispatch(prodcutDataLogOut());
        // }

        if (response.success) {
          dispatch({
            type: GET_BOOKING_ITEMS,
            payloadPending:
              response.data &&
              response.data.pending &&
              Array.isArray(response.data.pending) &&
              response.data.pending.length > 0
                ? response.data.pending
                : [],
            payloadDone:
              response.data &&
              response.data.completed &&
              Array.isArray(response.data.completed) &&
              response.data.completed.length > 0
                ? response.data.completed
                : [],
            payloadCancel:
              response.data &&
              response.data.cancelled &&
              Array.isArray(response.data.cancelled) &&
              response.data.cancelled.length > 0
                ? response.data.cancelled
                : [],
          });
        } else {
          dispatch({
            type: GET_BOOKING_ITEMS_ERROR,
            payload: response.message
              ? response.message
              : "server response failed",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_BOOKING_ITEMS_ERROR,
          payload: "server response failed",
        });
      });
  } catch (e) {}
};

export const getDeliveryAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_DELIVERY_ITEMS_LOADING,
  });

  try {
    const {
      authState: { userToken },
    } = getState();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://rd.ragingdevelopers.com/atender/api/delivery",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        let response = JSON.parse(result);

        // if (
        //   response &&
        //   response.success == 0 &&
        //   response.message.includes("Invalid Api Token")
        // ) {
        //   dispatch(prodcutDataLogOut());
        // }

        if (response.success) {
          dispatch({
            type: GET_DELIVERY_ITEMS,
            payloadPending:
              response.data &&
              response.data.pending &&
              Array.isArray(response.data.pending) &&
              response.data.pending.length > 0
                ? response.data.pending
                : [],
            payloadDone:
              response.data &&
              response.data.delivered &&
              Array.isArray(response.data.delivered) &&
              response.data.delivered.length > 0
                ? response.data.delivered
                : [],
            payloadCancel:
              response.data &&
              response.data.cancelled &&
              Array.isArray(response.data.cancelled) &&
              response.data.cancelled.length > 0
                ? response.data.cancelled
                : [],
            payloadAdditional:
              response.data &&
              response.data.additional &&
              Array.isArray(response.data.additional) &&
              response.data.additional.length > 0
                ? response.data.additional
                : [],
          });
        } else {
          dispatch({
            type: GET_DELIVERY_ITEMS_ERROR,
            payload: response.message
              ? response.message
              : "server response failed",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_DELIVERY_ITEMS_ERROR,
          payload: "server response failed",
        });
      });
  } catch (e) {}
};

export const getDeliveryReportAction =
  (sData, eDate) => async (dispatch, getState) => {
    dispatch({
      type: GET_DELIVERY_REPORTS_LOADING,
    });

    try {
      const {
        authState: { userToken },
      } = getState();

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userToken}`);

      var formdata = new FormData();
      formdata.append("start_date", sData);
      formdata.append("end_date", eDate);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://rd.ragingdevelopers.com/atender/api/delivery_details",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response = JSON.parse(result);
          // if (
          //   response &&
          //   response.success == 0 &&
          //   response.message.includes("Invalid Api Token")
          // ) {
          //   dispatch(prodcutDataLogOut());
          // }
          if (response.success) {
            dispatch({
              type: GET_DELIVERY_REPORTS,
              payload: response.data,
            });
          } else {
            dispatch({
              type: GET_DELIVERY_REPORTS_ERROR,
              payload: response.message
                ? response.message
                : "server response failed",
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_DELIVERY_REPORTS_ERROR,
            payload: "server response failed",
          });
        });
    } catch (e) {}
  };

export const getOneTimeBookingReportAction =
  (sData, eDate, sId = "") =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_ONETIME_BOOKING_REPORT_LOADING,
    });

    try {
      const {
        authState: { userToken },
      } = getState();

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userToken}`);

      var formdata = new FormData();

      formdata.append("start_date", sData);
      formdata.append("end_date", eDate);
      formdata.append("service_id", sId);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://rd.ragingdevelopers.com/atender/api/onetime/booking/booking_report_filter",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response = JSON.parse(result);
          // if (
          //   response &&
          //   response.success == 0 &&
          //   response.message.includes("Invalid Api Token")
          // ) {
          //   dispatch(prodcutDataLogOut());
          // }
          if (response.success) {
            dispatch({
              type: GET_ONETIME_BOOKING_REPORT,
              payload: response.data,
            });
          } else {
            dispatch({
              type: GET_ONETIME_BOOKING_REPORT_ERROR,
              payload: response.message
                ? response.message
                : "server response failed",
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_ONETIME_BOOKING_REPORT_ERROR,
            payload: "server response failed",
          });
        });
    } catch (e) {}
  };

export const getCustomerItemsAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_CUSTOMER_ITEMS_LOADING,
  });

  try {
    const {
      authState: { userToken, userServiceType },
    } = getState();

    var config = {
      method: "get",
      url: "https://nt.dhyatiktok.com/ntapi/home/get_only_customer",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.data && response.data.customers) {
          dispatch({
            type: GET_CUSTOMER_ITEMS,
            payloadCardList:
              response.data.customers && Array.isArray(response.data.customers)
                ? response.data.customers
                : [],
          });
        } else {
          dispatch({
            type: GET_CUSTOMER_ITEMS_ERROR,
            payload: response.message
              ? response.message
              : "server response failed",
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: GET_CUSTOMER_ITEMS_ERROR,
          payload: "server response failed",
        });
      });
  } catch (e) {}
};

export const getPaymentItemsAction =
  (bookingId = "") =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_PAYMENT_ITEMS_LOADING,
    });

    try {
      const {
        authState: { userToken },
      } = getState();

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userToken}`);

      var formdata = new FormData();
      formdata.append("booking_id", bookingId);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://rd.ragingdevelopers.com/atender/api/onetime/payment",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          let response = JSON.parse(result);
          // if (
          //   response &&
          //   response.success == 0 &&
          //   response.message.includes("Invalid Api Token")
          // ) {
          //   dispatch(prodcutDataLogOut());
          // }
          if (response.success) {
            dispatch({
              type: GET_PAYMENT_ITEMS,
              payloadCardList: response.data ? [response.data] : [],
            });
          } else {
            dispatch({
              type: GET_PAYMENT_ITEMS_ERROR,
              payload: response.message
                ? response.message
                : "something went wrong",
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_PAYMENT_ITEMS_ERROR,
            payload: "server response failed",
          });
        });
    } catch (e) {}
  };

export const setRemarkModalValues = (productObj, remark) => (dispatch) => {
  dispatch({
    type: SET_REMARK_MODEL,
    payloadProductObj: productObj,
    payloadRemark: remark,
  });
};

export const setSizeModalValues =
  (productObj, sizeId, isProduuctDetails = false) =>
  (dispatch) => {
    dispatch({
      type: SET_SIZE_MODEL,
      payloadProductObj: productObj,
      payloadSizeId: sizeId,
      payloadProductDetails: isProduuctDetails,
    });
  };

export const setGroupModalValues =
  (productObj, groupId, isProduuctDetails = false) =>
  (dispatch) => {
    dispatch({
      type: SET_GROUP_MODEL,
      payloadProductObj: productObj,
      payloadGroupId: groupId,
      payloadProductDetails: isProduuctDetails,
    });
  };

export const addToCardItem =
  ({ item }) =>
  (dispatch) => {
    dispatch({
      type: ADD_CARD_ITEM,
      payloadProductItem: item,
    });
  };

export const setGenderCheckValue = (itemId) => (dispatch) => {
  dispatch({
    type: SET_GENDER_CHECK_VALUE,
    payloadId: itemId,
  });
};

export const setSubCategoryCheckValue = (itemId) => (dispatch) => {
  dispatch({
    type: SET_SUB_CATEGORY_VALUE,
    payloadId: itemId,
  });
};

export const setCategoryCheckValue = (itemId) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_VALUE,
    payloadId: itemId,
  });
};

export const setItemGroupCheckValue = (itemId) => (dispatch) => {
  dispatch({
    type: SET_ITEM_GROUP_VALUE,
    payloadId: itemId,
  });
};

export const clearAllFilter = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTERS,
  });
};

export const applyFilterAction =
  (subCategory = null) =>
  (dispatch) => {
    dispatch({
      type: SET_FILTER,
      payloadNavigation: subCategory,
    });
  };

export const getProductsAction = () => (dispatch, getState) => {
  try {
    const {
      authState: { userToken, stoneValue },
      productState: {
        filterValue,
        paginationLoading,
        isListEndProduct,
        offsetProduct,
        searchTextState,
      },
    } = getState();

    if (!paginationLoading && !isListEndProduct) {
      dispatch({
        type: SET_LOADING_PAGINATION,
        payload: true,
      });

      var sendObj = JSON.stringify({
        offset: offsetProduct,
        limit: 10,
        sub_category: filterValue.subCategory,
        gender: filterValue.gender,
        item_group: filterValue.itemGroup,
        category: filterValue.category,
        search_text: searchTextState,
        from_stone_percentage: stoneValue[0],
        to_stone_percentage: stoneValue[1],
      });

      var config = {
        method: "post",
        url: "https://avgl.in/avira9api/items",
        headers: {
          "If-Range": userToken,
          "Content-Type": "application/json",
        },
        data: sendObj,
      };

      axios(config)
        .then(function (response) {
          if (response.data.data.length > 0) {
            dispatch({
              type: GET_PRODUCT_LIST,
              payload: response.data.data,
            });
          } else {
            dispatch({
              type: SET_LOADING_PAGINATION,
              payload: false,
            });
            dispatch({
              type: SET_PAGINATION_LIST_END,
              payload: true,
            });
          }
        })
        .catch(function (error) {
          dispatch({
            type: GET_PRODUCT_ERROR,
            payload: "server response failed",
          });
          dispatch({
            type: SET_LOADING_PAGINATION,
            payload: false,
          });
          dispatch({
            type: SET_PAGINATION_LIST_END,
            payload: true,
          });
        });
    }
  } catch (e) {
    dispatch({
      type: GET_PRODUCT_ERROR,
      payload: "server response failed",
    });
    dispatch({
      type: SET_LOADING_PAGINATION,
      action: false,
    });
    dispatch({
      type: SET_PAGINATION_LIST_END,
      action: true,
    });
  }
};

export const filterTypesAction = () => async (dispatch, getState) => {
  try {
    const {
      authState: { userToken },
    } = getState();

    var emptyObj = JSON.stringify({});

    var config = {
      method: "post",
      url: "https://avgl.in/avira9api/filter",
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: emptyObj,
    };

    axios(config)
      .then(function (response) {
        let genderAddCheck;
        let SubCategoryAddCheck;
        let CategoryAddCheck;
        let ItemGroupAddCheck;

        if (response && response.data && response.data.data) {
          genderAddCheck = response.data.data.gender
            ? response.data.data.gender.map((item) => ({
                ...item,
                check: false,
              }))
            : [];

          SubCategoryAddCheck = response.data.data.sub_category
            ? response.data.data.sub_category.map((item) => ({
                ...item,
                check: false,
              }))
            : [];

          CategoryAddCheck = response.data.data.category
            ? response.data.data.category.map((item) => ({
                ...item,
                check: false,
              }))
            : [];

          ItemGroupAddCheck = response.data.data.item_group
            ? response.data.data.item_group.map((item) => ({
                ...item,
                check: false,
              }))
            : [];
        } else {
          genderAddCheck = [];
          SubCategoryAddCheck = [];
          CategoryAddCheck = [];
          ItemGroupAddCheck = [];
        }

        dispatch({
          type: GET_FILTER_VALUE,
          payloadGender: genderAddCheck,
          payloadSubCategory: SubCategoryAddCheck,
          payloadCategory: CategoryAddCheck,
          payloadItemGroup: ItemGroupAddCheck,
        });
      })
      .catch(function (error) {});
  } catch (e) {}
};

export const getLikeCardItemsAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_LIKE_ITEMS_LOADING,
  });

  try {
    const {
      authState: { userToken },
    } = getState();

    var emptyObj = JSON.stringify({});

    var config = {
      method: "post",
      url: "https://avgl.in/avira9api/home/wishlist",
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: emptyObj,
    };

    axios(config)
      .then(function (response) {
        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.length !== 0
        ) {
          dispatch({
            type: GET_LIKE_ITEMS,
            payloadLikeItemsList: response.data.data,
          });
        } else {
          dispatch({
            type: GET_LIKE_ITEMS_ERROR,
            payload: "your wish list is empty",
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: GET_LIKE_ITEMS_ERROR,
          payload: "server response failed",
        });
      });
  } catch (e) {}
};

export const addRemoveLikeItemsAction =
  (projectId, type = "like") =>
  async (dispatch, getState) => {
    dispatch({
      type: LIKE_UNLIKE_SERVER_SIDE_LOADING,
    });

    if (type === "like") {
      dispatch({
        type: LIKE_ITEM_VALUE_ADD,
        payloadLikeId: projectId,
      });
    } else if (type === "unlike") {
      dispatch({
        type: UNLIKE_ITEM_VALUE_REMOVE,
        payloadUnLikeId: projectId,
      });
    }

    try {
      const {
        authState: { userToken },
      } = getState();

      var dataObj = JSON.stringify({ id: projectId });

      const likeUnlikeUrl =
        type === "like"
          ? "https://avgl.in/avira9api/home/add_wishlist"
          : "https://avgl.in/avira9api/home/remove_wishlist";

      var config = {
        method: "post",
        url: likeUnlikeUrl,
        headers: {
          "If-Range": userToken,
          "Content-Type": "application/json",
        },
        data: dataObj,
      };

      axios(config)
        .then(function (response) {
          if (response && response.data && response.data.status) {
            Toast.show({
              text1:
                type === "like"
                  ? "Item successfully added into wishlist"
                  : "Item successfully removed from wishlist",
              visibilityTime: 15000,
              autoHide: true,
              position: "top",
              type: "success",
            });
            dispatch({
              type: LIKE_UNLIKE_SERVER_SIDE_ERROR_DONE,
            });
          } else {
            Toast.show({
              text1: "something is wrong",
              visibilityTime: 15000,
              autoHide: true,
              position: "top",
              type: "error",
            });
            dispatch({
              type: LIKE_UNLIKE_SERVER_SIDE_ERROR_DONE,
            });
          }
        })
        .catch(function (error) {
          Toast.show({
            text1: "something is wrong",
            visibilityTime: 15000,
            autoHide: true,
            position: "top",
            type: "error",
          });
          dispatch({
            type: LIKE_UNLIKE_SERVER_SIDE_ERROR_DONE,
          });
        });
    } catch (e) {}
  };

// list of order get

export const getOrderListAction = () => async (dispatch, getState) => {
  dispatch({
    type: LIST_ORDER_ITEM_LOADING,
  });

  try {
    const {
      authState: { userToken },
    } = getState();

    var emptyObj = JSON.stringify({});

    var config = {
      method: "post",
      url: "https://avgl.in/avira9api/order/list_order",
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: emptyObj,
    };

    axios(config)
      .then(function (response) {
        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.length !== 0
        ) {
          dispatch({
            type: LIST_ORDER_ITEM,
            payloadOrderList: response.data.data,
          });
        } else {
          dispatch({
            type: LIST_ORDER_ITEM_ERROR,
            payloadOrderListError: "your order list is empty",
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: LIST_ORDER_ITEM_ERROR,
          payloadOrderListError: "server response failed",
        });
      });
  } catch (e) {}
};

export const placeOrderCardItemAction = () => async (dispatch, getState) => {
  dispatch({
    type: PLACE_ORDER_ITEMS_LOADING,
  });

  try {
    const {
      authState: { userToken },
    } = getState();

    var emptyObj = JSON.stringify({});

    var config = {
      method: "post",
      url: "https://avgl.in/avira9api/order",
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: emptyObj,
    };

    axios(config)
      .then(function (response) {
        if (
          response &&
          response.data &&
          response.data.status &&
          response.data.status === true
        ) {
          Toast.show({
            text1: response.data.message
              ? response.data.message
              : "Order Placed Successfully",
            visibilityTime: 15000,
            autoHide: true,
            position: "top",
            type: "success",
          });

          dispatch(getCardItemsAction());

          dispatch({
            type: PLACE_ORDER_ITEMS,
          });
        } else {
          Toast.show({
            text1:
              response.data && response.data.message
                ? response.data.message
                : "something is wrong, try again",
            visibilityTime: 15000,
            autoHide: true,
            position: "top",
            type: "error",
          });

          dispatch({
            type: PLACE_ORDER_ITEMS_ERROR,
          });
        }
      })
      .catch(function (error) {
        Toast.show({
          text1: "server response failed, try again",
          visibilityTime: 15000,
          autoHide: true,
          position: "top",
          type: "error",
        });

        dispatch({
          type: PLACE_ORDER_ITEMS_ERROR,
        });
      });
  } catch (e) {}
};

export const editOrderItemAction =
  (orderId = "0") =>
  async (dispatch, getState) => {
    dispatch({
      type: EDIT_ORDER_ITEM_LOADING,
    });

    try {
      const {
        authState: { userToken },
      } = getState();

      var emptyObj = JSON.stringify({});

      var config = {
        method: "post",
        url: `https://avgl.in/avira9api/order/edit_order/${orderId}`,
        headers: {
          "If-Range": userToken,
          "Content-Type": "application/json",
        },
        data: emptyObj,
      };

      axios(config)
        .then(function (response) {
          if (
            response &&
            response.data &&
            response.data.status &&
            response.data.status === true
          ) {
            dispatch(getCardItemsAction());

            Toast.show({
              text1: response.data.message
                ? response.data.message
                : "Order added into cart successfully",
              visibilityTime: 15000,
              autoHide: true,
              position: "top",
              type: "success",
            });

            dispatch({
              type: EDIT_ORDER_ITEM_BY_ID,
            });
          } else {
            Toast.show({
              text1: "something is wrong, try again",
              visibilityTime: 15000,
              autoHide: true,
              position: "top",
              type: "error",
            });

            dispatch({
              type: EDIT_ORDER_ITEM_ERROR,
            });
          }
        })
        .catch(function (error) {
          Toast.show({
            text1: "server response failed, try again",
            visibilityTime: 15000,
            autoHide: true,
            position: "top",
            type: "error",
          });

          dispatch({
            type: EDIT_ORDER_ITEM_ERROR,
          });
        });
    } catch (e) {}
  };

export const setSearchModelAction =
  (searchValue = "") =>
  (dispatch) => {
    dispatch({
      type: SET_SEARCH,
      payload: searchValue,
    });
  };

export const toggleSearchModelAction = () => (dispatch) => {
  dispatch({
    type: TOGGLE_SEARCH_MODEL,
  });
};

export const getGroupAndSizeId = () => async (dispatch, getState) => {
  dispatch({
    type: GET_GROUP_SIZE_LOADING,
  });

  try {
    const {
      authState: { userToken },
    } = getState();

    var objData = JSON.stringify({
      offset: 0,
      limit: 0,
      sub_category: "",
      gender: "",
      item_group: "",
      category: "",
      search_text: "",
    });

    var config = {
      method: "post",
      url: "https://avgl.in/avira9api//home/sizeandgroup",
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: objData,
    };

    axios(config)
      .then(function (response) {
        if (response && response.data && response.data.data) {
          dispatch({
            type: GET_GROUP_SIZE_LIST,
            sizeList:
              Array.isArray(response.data.data.size) && response.data.data.size
                ? response.data.data.size
                : [],
            groupListItems:
              Array.isArray(response.data.data.group) &&
              response.data.data.group
                ? response.data.data.group
                : [],
          });
        } else {
        }
      })
      .catch(function (error) {
        dispatch({
          type: GET_GROUP_SIZE_LIST_ERROR,
          payload: "server response failed",
        });
      });
  } catch (e) {}
};

export const getOrderWebViewPdfData = (orderId) => (dispatch, getState) => {
  try {
    const {
      authState: { userToken },
    } = getState();

    dispatch({
      type: ORDER_PED_PAGE_HTML_LOADING,
    });

    var sendObj = JSON.stringify({});

    var config = {
      method: "post",
      url: `https://avgl.in/avira9api/order/order_view/${orderId}`,
      headers: {
        "If-Range": userToken,
        "Content-Type": "application/json",
      },
      data: sendObj,
    };

    axios(config)
      .then(function (response) {
        dispatch({
          type: ORDER_PDF_PAGE_HTML,
          payload: response.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: ORDER_PDF_PAGE_HTML_ERROR,
        });
      });
  } catch (e) {}
};
