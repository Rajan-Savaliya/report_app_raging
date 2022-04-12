import {
  LOG_OUT,
  LOGIN_ERROR,
  CHECK_UPDATE,
  CITY_DATA_SET,
  LAND_DATA_SET,
  LOGIN_LOADING,
  ONCHANGE_STONE_VALUE,
  LOGIN_TO_GET_A_TOKEN,
  PAYMENT_MODAL_TOGGLE,
  GET_HOME_PAGE_DETAILS,
  ADMIN_SERVICE_DATA_SET,
  GET_HOME_PAGE_DETAILS_ERROR,
  GET_HOME_PAGE_DETAILS_LOADING,
  PAYMENT_ADD_METHOD_BOOKING_MODAL_TOGGLE,
} from "../actions/types";

const initialState = {
  userToken: null,
  userFirstName: null,
  userLastName: null,
  UserNumber: null,
  userName: null,
  userServiceType: null,
  AllowedDays: null,
  userCity: null,
  userType: null,
  userEmail: null,
  userNumber: null,
  userOpeningBalance: null,
  userOpeningBalanceType: null,
  userOpeningFine: null,
  userOpeningFindType: null,
  userPaid: null,
  userServiceProvider: null,
  LoginInLoading: false,
  LoadingError: null,
  sliderList: [],
  homeItemList: [],
  homePageDetailsLoading: false,
  homePageDetailsError: null,
  updateModal: false,
  forceUpdateModal: false,
  stoneValue: [0, 40],
  cityDataList: [],
  landDataList: [],
  adminServiceList: [],
  paymentModalShow: false,
  paymentListData: null,
  paymentAddModalShow: false,
  paymentModalBookingId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_ADD_METHOD_BOOKING_MODAL_TOGGLE:
      return {
        ...state,
        paymentAddModalShow: action.payloadModalShow,
        paymentModalBookingId: action.payloadModalDataPass,
      };

    case PAYMENT_MODAL_TOGGLE:
      return {
        ...state,
        paymentModalShow: action.payloadModalShow,
        paymentListData: action.payloadModalDataPass,
      };
    case CITY_DATA_SET:
      return {
        ...state,
        cityDataList: action.payload,
      };
    case LAND_DATA_SET:
      return {
        ...state,
        landDataList: action.payload,
      };
    case ADMIN_SERVICE_DATA_SET:
      return {
        ...state,
        adminServiceList: action.payload,
      };

    case ONCHANGE_STONE_VALUE:
      return {
        ...state,
        stoneValue: action.payload,
      };
    case CHECK_UPDATE:
      return {
        ...state,
        updateModal: action.payload,
        forceUpdateModal: action.payload2,
      };
    case LOG_OUT:
      return {
        ...state,
        userFirstName: null,
        userLastName: null,
        UserNumber: null,
        userToken: null,
        userName: null,
        AllowedDays: null,
        userCity: null,
        userType: null,
        userEmail: null,
        userNumber: null,
        userOpeningBalance: null,
        userOpeningBalanceType: null,
        userOpeningFine: null,
        userOpeningFindType: null,
        userPaid: null,
        userServiceProvider: null,
        LoginInLoading: false,
        LoadingError: null,
        sliderList: [],
        homeItemList: [],
        homePageDetailsLoading: false,
        homePageDetailsError: null,
      };
    case GET_HOME_PAGE_DETAILS:
      return {
        ...state,
        sliderList: action.payload,
        homeItemList: action.payload2,
        homePageDetailsLoading: false,
        homePageDetailsError: null,
      };
    case GET_HOME_PAGE_DETAILS_LOADING:
      return {
        ...state,
        sliderList: [],
        homeItemList: [],
        homePageDetailsLoading: true,
        homePageDetailsError: null,
      };
    case GET_HOME_PAGE_DETAILS_ERROR:
      return {
        ...state,
        sliderList: [],
        homeItemList: [],
        homePageDetailsError: action.payload,
      };
    case LOGIN_TO_GET_A_TOKEN:
      return {
        ...state,
        userFirstName: action.PayloadUserFirstName,
        userLastName: action.PayloadUserLastName,
        UserNumber: action.PayloadUserMobile,
        userToken: action.payloadUserToken,
        LoginInLoading: false,
        userServiceType: action.PayloadServiceUserType,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        LoginInLoading: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        LoginInLoading: false,
      };
    default:
      return state;
  }
};
