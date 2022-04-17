/* eslint-disable radix */
import {
  GET_FILTER_DATA,
  GET_PRODUCT_LIST,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_ERROR,
  GET_FILTER_VALUE,
  GET_FILTER_VALUE_LOADING,
  GET_FILTER_VALUE_ERROR,
  SET_GENDER_CHECK_VALUE,
  SET_SUB_CATEGORY_VALUE,
  SET_CATEGORY_VALUE,
  SET_ITEM_GROUP_VALUE,
  CLEAR_FILTERS,
  SET_FILTER,
  SET_LOADING_PAGINATION,
  SET_PAGINATION_OFFSET,
  SET_PAGINATION_LIST_END,
  GET_CARD_ITEMS,
  GET_CARD_ITEMS_LOADING,
  GET_CARD_ITEMS_ERROR,
  CARD_ITEM_INCREMENT,
  CARD_ITEM_DECREMENT,
  CARD_ITEM_VALUE_REMOVE,
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
  PLACE_ORDER_ITEMS_LOADING,
  PLACE_ORDER_ITEMS,
  PLACE_ORDER_ITEMS_ERROR,
  EDIT_ORDER_ITEM_LOADING,
  EDIT_ORDER_ITEM_BY_ID,
  EDIT_ORDER_ITEM_ERROR,
  TOGGLE_SEARCH_MODEL,
  SET_SEARCH,
  GET_GROUP_SIZE_LIST,
  GET_GROUP_SIZE_LOADING,
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
  CUSTOMER_DELIVERY_DETAILS_LIST,
  CUSTOMER_DELIVERY_DETAILS_ERROR,
  DELIVERY_STATE_CAHNGE,
  PRODUCT_DATA_LOGOUT,
  PENDING_LIST_SELECTION,
  PENDING_ORDER_STATE_SELECTION_ADD,
  PENDING_ORDER_STATE_SELECTION_REMOVE,
  PENDING_ORDER_STATE_SELECTION_EMPTY,
  REMOVE_SELECTION_PENDING_LIST,
  GET_BOOKING_ITEMS_LOADING,
  GET_BOOKING_ITEMS,
  GET_BOOKING_ITEMS_ERROR,
  GET_PAYMENT_ITEMS_LOADING,
  GET_PAYMENT_ITEMS,
  GET_PAYMENT_ITEMS_ERROR,
  SELECTION_ALL_PENDING_SELECTION_LIST,
  GET_ONETIME_BOOKING_REPORT,
  GET_ONETIME_BOOKING_REPORT_ERROR,
  GET_ONETIME_BOOKING_REPORT_LOADING,
  MAX_DEBIT_DATE,
  LIKE_UNLIKE_DONE,
  LIKE_UNLIKE_LOADING,
  REMOVE_FROM_LIKE_LIST,
  ADD_TO_WHISH_LIST_MODAL,
} from "../actions/types";

const initialState = {
  whishListModalShow: false,
  whishListCustomerId: "",
  likeUnlikeLoading: false,
  maxDebit: false,
  maxDays: false,
  totalDebit: 0,
  totalCredit: 0,
  selectPendingOrderState: false,
  selectPendingOrderCustomerIdList: [],
  selectPendingOrderServiceIdList: [],
  pendingDeliveryOrder: [],
  doneDeliveryOrder: [],
  cancelDeliveryOrder: [],
  additionalDeliveryOrder: [],
  customerDateDeliveryDetailsLoading: false,
  customerDateDeliveryDetailsList: [],
  customerDateDeliveryDetailsError: null,
  loadingSpinner: false,
  totalGrValue: 0,
  isProductDetailsState: false,
  deliveryItems: [],
  deliveryItemsLoading: false,
  deliveryItemsError: null,
  deliveryReportsError: null,
  deliveryReportsLoading: false,
  deliveryReports: [],
  cardItems: [],
  cardItemsError: null,
  cardItemsLoading: false,
  customerItems: [],
  customerItemsError: null,
  customerItemsLoading: false,
  likeItems: [],
  likeItemsError: null,
  likeItemsLoading: false,
  listOfProduct: [],
  listOfProductError: null,
  listOfProductLoading: false,
  filterGenderList: [],
  filterSubCategory: [],
  filterCategory: [],
  filterItemGroup: [],
  filterLoading: false,
  filterError: null,
  offsetProduct: 0,
  isListEndProduct: false,
  paginationLoading: false,
  filterValue: {
    subCategory: "",
    gender: "",
    itemGroup: "",
    category: "",
  },
  searchTextState: "",
  searchModalShow: false,
  incAndDecCardServerLoading: false,
  removeCardServerLoading: false,
  likeItemServerLoading: false,
  likeListIds: [],
  listOrderLoading: false,
  listOrderItems: [],
  listOrderError: null,
  serverPlaceServerLoadingError: false,
  serverEditOrderServerLoadingError: false,
  sizeListItems: [],
  groupListItems: [],
  groupSizeItemsLoading: false,
  groupSizeItemsError: null,
  remarKTextState: "",
  remarkModeState: false,
  remarkProjectObj: null,
  sizeSetId: null,
  sizeModelState: false,
  sizeProductObj: null,
  groupSetId: null,
  groupModelState: false,
  groupProjectObj: null,
  webviewOrder: "",
  webviewOrderLoading: false,
  webviewOrderError: null,
  bookingLoadingItem: false,
  bookingError: null,
  completeBookingList: [],
  cancelBookingList: [],
  pendingBookingList: [],
  paymentItemLoading: false,
  paymentItemList: [],
  paymentItemError: null,
  oneTimeReportsError: null,
  oneTimeReportsLoading: false,
  oneTimeReports: [],
  customerFullData: null,
  filterReportList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILTER_DATA:
      return {
        ...state,
        filterReportList: state.cardItems.filter(
          (itemValue) =>
            itemValue.customer_name &&
            itemValue.customer_name
              .toUpperCase()
              .indexOf(
                action.payloadSearchText
                  ? action.payloadSearchText.toUpperCase()
                  : ""
              ) > -1
        ),
      };
    case ADD_TO_WHISH_LIST_MODAL:
      return {
        ...state,
        whishListModalShow: action.payloadShow,
        whishListCustomerId: action.payloadId,
      };
    case LIKE_UNLIKE_LOADING:
      return {
        ...state,
        likeUnlikeLoading: true,
      };
    case LIKE_UNLIKE_DONE:
      return {
        ...state,
        likeUnlikeLoading: false,
      };
    case REMOVE_FROM_LIKE_LIST:
      return {
        ...state,
        pendingDeliveryOrder: state.pendingDeliveryOrder.filter(
          (item) => action.payloadUnLikeId != item.id
        ),
      };
    case MAX_DEBIT_DATE:
      var listOfItem = false;
      if (action.payloadMaxDay) {
        var listOfItem = state.cardItems;
        listOfItem.sort(function compare(a, b) {
          return b.only_day - a.only_day;
        });
      } else if (action.payloadMaxDbit) {
        var listOfItem = state.cardItems;

        listOfItem.sort(function compare(a, b) {
          return parseFloat(b.debit) - parseFloat(a.debit);
        });
      }

      return {
        ...state,
        maxDebit: action.payloadMaxDbit,
        maxDays: action.payloadMaxDay,
        cardItems: listOfItem ? listOfItem : state.cardItems,
      };
    case GET_PAYMENT_ITEMS_LOADING:
      return {
        ...state,
        paymentItemLoading: true,
        paymentItemError: null,
        paymentItemList: [],
      };
    case GET_PAYMENT_ITEMS:
      return {
        ...state,
        paymentItemError: null,
        paymentItemLoading: false,
        paymentItemList: action.payloadCardList,
      };
    case GET_PAYMENT_ITEMS_ERROR:
      return {
        ...state,
        paymentItemLoading: false,
        paymentItemError: action.payload
          ? action.payload
          : "server response failed",
        paymentItemList: [],
      };
    case GET_BOOKING_ITEMS_LOADING:
      return {
        ...state,
        bookingLoadingItem: true,
        bookingError: null,
      };
    case GET_BOOKING_ITEMS:
      return {
        ...state,
        bookingError: null,
        bookingLoadingItem: false,
        pendingBookingList: action.payloadPending,
        completeBookingList: action.payloadDone,
        cancelBookingList: action.payloadCancel,
      };
    case GET_BOOKING_ITEMS_ERROR:
      return {
        ...state,
        bookingLoadingItem: false,
        bookingError: action.payload
          ? action.payload
          : "server response failed",
        pendingBookingList: [],
        completeBookingList: [],
        cancelBookingList: [],
      };

    case REMOVE_SELECTION_PENDING_LIST:
      return {
        ...state,
        selectPendingOrderCustomerIdList: [],
        selectPendingOrderServiceIdList: [],
      };
    case SELECTION_ALL_PENDING_SELECTION_LIST:
      let tempCustomerId = [];
      let tempServiceId = [];

      if (
        state.pendingDeliveryOrder &&
        Array.isArray(state.pendingDeliveryOrder) &&
        state.pendingDeliveryOrder.length > 0
      ) {
        state.pendingDeliveryOrder.forEach((itemValue) => {
          tempCustomerId.push(itemValue.id);
          tempServiceId.push(itemValue.service_id);
        });
      }

      return {
        ...state,
        selectPendingOrderCustomerIdList: tempCustomerId,
        selectPendingOrderServiceIdList: tempServiceId,
      };
    case PENDING_ORDER_STATE_SELECTION_ADD:
      var tempPedingOrderCustomerId = state.selectPendingOrderCustomerIdList;
      tempPedingOrderCustomerId.push(parseInt(action.payloadCustomerId));

      var tempPedingOrderServveId = state.selectPendingOrderServiceIdList;
      tempPedingOrderServveId.push(parseInt(action.payloadServiceId));

      return {
        ...state,
        selectPendingOrderCustomerIdList: tempPedingOrderCustomerId,
        selectPendingOrderServiceIdList: tempPedingOrderServveId,
      };
    case PENDING_ORDER_STATE_SELECTION_REMOVE:
      let tempIndexNumberCustomer =
        state.selectPendingOrderCustomerIdList.findIndex(
          (itemValue) => itemValue == parseInt(action.payloadCustomerId)
        );

      var tempPendingOrderCustomerIdList =
        state.selectPendingOrderCustomerIdList;
      var tempPendingOrderServiceIdList = state.selectPendingOrderServiceIdList;
      if (tempIndexNumberCustomer > -1) {
        tempPendingOrderCustomerIdList.splice(tempIndexNumberCustomer, 1);

        tempPendingOrderServiceIdList.splice(tempIndexNumberCustomer, 1);
      }

      return {
        ...state,
        selectPendingOrderCustomerIdList: tempPendingOrderCustomerIdList,
        selectPendingOrderServiceIdList: tempPendingOrderServiceIdList,
      };
    case PENDING_LIST_SELECTION:
      return {
        ...state,
        selectPendingOrderState: action.payload,
      };
    case PRODUCT_DATA_LOGOUT:
      return {
        ...state,
        customerDateDeliveryDetailsLoading: false,
        customerDateDeliveryDetailsList: [],
        customerDateDeliveryDetailsError: null,
        loadingSpinner: false,
        totalGrValue: 0,
        isProductDetailsState: false,
        deliveryItems: [],
        deliveryItemsLoading: false,
        deliveryItemsError: null,
        deliveryReportsError: null,
        deliveryReportsLoading: false,
        deliveryReports: [],
        cardItems: [],
        cardItemsError: null,
        cardItemsLoading: false,
        customerItems: [],
        customerItemsError: null,
        customerItemsLoading: false,
        likeItems: [],
        likeItemsError: null,
        likeItemsLoading: false,
        listOfProduct: [],
        listOfProductError: null,
        listOfProductLoading: false,
        filterGenderList: [],
        filterSubCategory: [],
        filterCategory: [],
        filterItemGroup: [],
        filterLoading: false,
        filterError: null,
        offsetProduct: 0,
        isListEndProduct: false,
        paginationLoading: false,
        filterValue: {
          subCategory: "",
          gender: "",
          itemGroup: "",
          category: "",
        },
        searchTextState: "",
        searchModalShow: false,
        incAndDecCardServerLoading: false,
        removeCardServerLoading: false,
        likeItemServerLoading: false,
        likeListIds: [],
        listOrderLoading: false,
        listOrderItems: [],
        listOrderError: null,
        serverPlaceServerLoadingError: false,
        serverEditOrderServerLoadingError: false,
        sizeListItems: [],
        groupListItems: [],
        groupSizeItemsLoading: false,
        groupSizeItemsError: null,
        remarKTextState: "",
        remarkModeState: false,
        remarkProjectObj: null,
        sizeSetId: null,
        sizeModelState: false,
        sizeProductObj: null,
        groupSetId: null,
        groupModelState: false,
        groupProjectObj: null,
        webviewOrder: "",
        webviewOrderLoading: false,
        webviewOrderError: null,
      };
    case DELIVERY_STATE_CAHNGE:
      return {
        ...state,
        deliveryItems: state.deliveryItems.map((item) =>
          item.id === action.payloadId
            ? { ...item, status: action.payloadState }
            : item
        ),
      };
    case SET_LOADING_SPINNER_ACTION:
      return {
        ...state,
        loadingSpinner: action.payload,
      };

    case CUSTOMER_DELIVERY_DETAILS_LOADING:
      return {
        ...state,
        customerDateDeliveryDetailsLoading: true,
        customerDateDeliveryDetailsError: null,
        // customerDateDeliveryDetailsList: [],
      };
    case CUSTOMER_DELIVERY_DETAILS_LIST:
      return {
        ...state,
        customerDateDeliveryDetailsError: null,
        customerDateDeliveryDetailsLoading: false,
        customerDateDeliveryDetailsList: action.payload,
        customerFullData: action.payloadFullData,
      };
    case CUSTOMER_DELIVERY_DETAILS_ERROR:
      return {
        ...state,
        customerFullData: null,
        customerDateDeliveryDetailsLoading: false,
        customerDateDeliveryDetailsError: action.payload
          ? action.payload
          : "server response failed",
        customerDateDeliveryDetailsList: [],
      };

    case GET_DELIVERY_ITEMS_LOADING:
      return {
        ...state,
        deliveryItemsLoading: true,
        deliveryItemsError: null,
        // deliveryItems: [],
      };
    case GET_DELIVERY_ITEMS:
      return {
        ...state,
        deliveryItemsError: null,
        deliveryItemsLoading: false,
        pendingDeliveryOrder: action.payload,
        // deliveryItems: action.payload,
        // pendingDeliveryOrder: action.payloadPending,
        // doneDeliveryOrder: action.payloadDone,
        // cancelDeliveryOrder: action.payloadCancel,
        // additionalDeliveryOrder: action.payloadAdditional,
      };
    case GET_DELIVERY_ITEMS_ERROR:
      return {
        ...state,
        deliveryItemsLoading: false,
        deliveryItemsError: action.payload
          ? action.payload
          : "server response failed",
        pendingDeliveryOrder: [],
        doneDeliveryOrder: [],
        cancelDeliveryOrder: [],
        additionalDeliveryOrder: [],
      };

    case GET_DELIVERY_REPORTS_LOADING:
      return {
        ...state,
        deliveryReportsLoading: true,
        deliveryReportsError: null,
        // deliveryReports: [],
      };
    case GET_DELIVERY_REPORTS:
      return {
        ...state,
        deliveryReportsError: null,
        deliveryReportsLoading: false,
        deliveryReports: action.payload,
      };
    case GET_DELIVERY_REPORTS_ERROR:
      return {
        ...state,
        deliveryReportsLoading: false,
        deliveryReportsError: action.payload
          ? action.payload
          : "server response failed",
        deliveryReports: [],
      };

    case GET_ONETIME_BOOKING_REPORT_LOADING:
      return {
        ...state,
        oneTimeReportsLoading: true,
        oneTimeReportsError: null,
        // deliveryReports: [],
      };
    case GET_ONETIME_BOOKING_REPORT:
      return {
        ...state,
        oneTimeReportsError: null,
        oneTimeReportsLoading: false,
        oneTimeReports: action.payload,
      };
    case GET_ONETIME_BOOKING_REPORT_ERROR:
      return {
        ...state,
        oneTimeReportsLoading: false,
        oneTimeReportsError: action.payload
          ? action.payload
          : "server response failed",
        oneTimeReports: [],
      };

    case GET_CARD_ITEMS_LOADING:
      return {
        ...state,
        cardItemsLoading: true,
        cardItemsError: null,
        totalDebit: "Loading",
        totalCredit: "Loading",
        // cardItems: [],
      };
    case GET_CARD_ITEMS:
      return {
        ...state,
        totalDebit: action.payloadTotalDedit,
        totalCredit: action.payloadTotalCardList,
        cardItemsError: null,
        cardItemsLoading: false,
        cardItems: action.payloadCardList,
      };
    case GET_CARD_ITEMS_ERROR:
      return {
        ...state,
        totalDebit: action.payloadTotalDedit,
        totalCredit: action.payloadTotalCardList,
        cardItemsLoading: false,
        cardItemsError: action.payload
          ? action.payload
          : "server response failed",
        cardItems: [],
      };
    case GET_CUSTOMER_ITEMS_LOADING:
      return {
        ...state,
        customerItemsLoading: true,
        customerItemsError: null,
        // customerItems: [],
      };
    case GET_CUSTOMER_ITEMS:
      return {
        ...state,
        customerItemsError: null,
        customerItemsLoading: false,
        customerItems: action.payloadCardList,
      };
    case GET_CUSTOMER_ITEMS_ERROR:
      return {
        ...state,
        customerItemsLoading: false,
        customerItemsError: action.payload
          ? action.payload
          : "server response failed",
        customerItems: [],
      };

    case ORDER_PDF_PAGE_HTML:
      return {
        ...state,
        webviewOrder: action.payload,
        webviewOrderLoading: false,
        webviewOrderError: null,
      };
    case ORDER_PED_PAGE_HTML_LOADING:
      return {
        ...state,
        webviewOrder: null,
        webviewOrderLoading: true,
        webviewOrderError: null,
      };
    case ORDER_PDF_PAGE_HTML_ERROR:
      return {
        ...state,
        webviewOrder: null,
        webviewOrderLoading: false,
        webviewOrderError: action.payload
          ? action.payload
          : "server response failed",
      };
    case SET_GROUP_MODEL:
      return {
        ...state,
        groupSetId: action.payloadGroupId,
        groupProjectObj: action.payloadProductObj,
        groupModelState: !state.groupModelState,
        isProductDetailsState: action.payloadProductDetails,
      };
    case SET_REMARK_MODEL:
      return {
        ...state,
        remarkProjectObj: action.payloadProductObj,
        remarKTextState: action.payloadRemark,
        remarkModeState: !state.remarkModeState,
      };
    case SET_SIZE_MODEL: {
      return {
        ...state,
        sizeSetId: action.payloadSizeId,
        sizeProductObj: action.payloadProductObj,
        sizeModelState: !state.sizeModelState,
        isProductDetailsState: action.payloadProductDetails,
      };
    }
    case GET_GROUP_SIZE_LOADING:
      return {
        ...state,
        sizeListItems: [],
        groupListItems: [],
        groupSizeItemsLoading: true,
        groupSizeItemsError: null,
      };
    case GET_GROUP_SIZE_LIST:
      return {
        ...state,
        sizeListItems: action.sizeList,
        groupListItems: action.groupListItems,
        groupSizeItemsLoading: false,
        groupSizeItemsError: null,
      };
    case GET_GROUP_SIZE_LIST_ERROR:
      return {
        ...state,
        sizeListItems: [],
        groupListItems: [],
        groupSizeItemsLoading: false,
        groupSizeItemsError: "Server response failed",
      };
    case SET_SEARCH:
      return {
        ...state,
        searchTextState: action.payload,
        // listOfProduct: [],
        // listOfProductLoading: false,
        // listOfProductError: null,
        // paginationLoading: false,
        // offsetProduct: 0,
      };
    case TOGGLE_SEARCH_MODEL:
      return {
        ...state,
        searchModalShow: !state.searchModalShow,
      };
    case EDIT_ORDER_ITEM_LOADING:
      return {
        ...state,
        serverEditOrderServerLoadingError: true,
      };
    case EDIT_ORDER_ITEM_BY_ID:
      return {
        ...state,
        serverEditOrderServerLoadingError: false,
      };
    case EDIT_ORDER_ITEM_ERROR:
      return {
        ...state,
        serverEditOrderServerLoadingError: false,
      };
    case PLACE_ORDER_ITEMS_LOADING:
      return {
        ...state,
        serverPlaceServerLoadingError: true,
      };
    case PLACE_ORDER_ITEMS:
      return {
        ...state,
        serverPlaceServerLoadingError: false,
      };
    case PLACE_ORDER_ITEMS_ERROR:
      return {
        ...state,
        serverPlaceServerLoadingError: false,
      };

    case LIST_ORDER_ITEM_LOADING:
      return {
        ...state,
        listOrderLoading: true,
        listOrderItems: [],
        listOrderError: null,
      };
    case LIST_ORDER_ITEM:
      return {
        ...state,
        listOrderLoading: false,
        listOrderItems: action.payloadOrderList,
        listOrderError: null,
      };
    case LIST_ORDER_ITEM_ERROR:
      return {
        ...state,
        listOrderLoading: false,
        listOrderItems: [],
        listOrderError: action.payloadOrderListError
          ? action.payloadOrderListError
          : "server repose failed",
      };
    case LIKE_ITEM_VALUE_ADD:
      return {
        ...state,
        likeListIds: [...new Set([action.payloadLikeId, ...state.likeListIds])],
      };
    case UNLIKE_ITEM_VALUE_REMOVE:
      return {
        ...state,
        likeListIds: state.likeListIds.filter(
          (item) => action.payloadUnLikeId !== item
        ),
      };
    case LIKE_UNLIKE_SERVER_SIDE_LOADING:
      return {
        ...state,
        likeItemServerLoading: true,
      };
    case LIKE_UNLIKE_SERVER_SIDE_ERROR_DONE:
      return {
        ...state,
        likeItemServerLoading: false,
      };
    case CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_LOADING:
      return {
        ...state,
        incAndDecCardServerLoading: true,
      };
    case CARD_ITEM_INCREMENT_DECREMENT_SERVER_SIDE_ERROR_OR_DONE:
      return {
        ...state,
        incAndDecCardServerLoading: false,
      };
    case CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_LOADING:
      return {
        ...state,
        removeCardServerLoading: true,
      };
    case CARD_ITEM_VALUE_REMOVE_SERVER_SIDE_ERROR_OR_DONE:
      return {
        ...state,
        removeCardServerLoading: false,
      };
    case SET_LOADING_PAGINATION:
      return {
        ...state,
        paginationLoading: action.payload,
      };
    case SET_PAGINATION_OFFSET:
      return {
        ...state,
        offsetProduct: state.offsetProduct + 1,
      };
    case SET_PAGINATION_LIST_END:
      return {
        ...state,
        isListEndProduct: action.payload,
      };
    case SET_FILTER:
      let tempFilterValueObj;
      if (action && action.payloadNavigation) {
        tempFilterValueObj = {
          subCategory: action.payloadNavigation,
          category: "",
          itemGroup: "",
          gender: "",
        };
      } else {
        let tempListSubIds = [];
        state.filterSubCategory.forEach((item) => {
          if (item.check) {
            tempListSubIds.push(item.id);
          }
        });

        let tempListCategoryIds = [];
        state.filterCategory.forEach((item) => {
          if (item.check) {
            tempListCategoryIds.push(item.id);
          }
        });

        let tempListItemGroupIds = [];
        state.filterItemGroup.forEach((item) => {
          if (item.check) {
            tempListItemGroupIds.push(item.id);
          }
        });

        let tempListGenderNames = [];
        state.filterGenderList.forEach((item) => {
          if (item.check) {
            tempListGenderNames.push(item.name);
          }
        });

        tempFilterValueObj = {
          subCategory: Array.isArray(tempListSubIds)
            ? tempListSubIds.join(",")
            : "",
          category: Array.isArray(tempListCategoryIds)
            ? tempListCategoryIds.join(",")
            : "",
          itemGroup: Array.isArray(tempListItemGroupIds)
            ? tempListItemGroupIds.join(",")
            : "",
          gender: Array.isArray(tempListGenderNames)
            ? tempListGenderNames.join(",")
            : "",
        };
      }
      return {
        ...state,
        filterValue: tempFilterValueObj,
        offsetProduct: 0,
        isListEndProduct: false,
        paginationLoading: false,
        listOfProduct: [],
      };
    case CLEAR_FILTERS:
      let tempFilterGenderList = state.filterGenderList.map((item) =>
        item.check ? { ...item, check: false } : item
      );
      let tempFilterSubCategory = state.filterSubCategory.map((item) =>
        item.check ? { ...item, check: false } : item
      );
      let tempFilterCategory = state.filterCategory.map((item) =>
        item.check ? { ...item, check: false } : item
      );
      let tempFilterItemGroup = state.filterItemGroup.map((item) =>
        item.check ? { ...item, check: false } : item
      );
      return {
        ...state,
        searchTextState: "",
        filterGenderList: tempFilterGenderList,
        filterSubCategory: tempFilterSubCategory,
        filterCategory: tempFilterCategory,
        filterItemGroup: tempFilterItemGroup,
      };
    case SET_GENDER_CHECK_VALUE:
      return {
        ...state,
        filterGenderList: state.filterGenderList.map((item) =>
          item.id === action.payloadId ? { ...item, check: !item.check } : item
        ),
      };
    case SET_SUB_CATEGORY_VALUE:
      return {
        ...state,
        filterSubCategory: state.filterSubCategory.map((item) =>
          item.id === action.payloadId ? { ...item, check: !item.check } : item
        ),
      };
    case SET_CATEGORY_VALUE:
      return {
        ...state,
        filterCategory: state.filterCategory.map((item) =>
          item.id === action.payloadId ? { ...item, check: !item.check } : item
        ),
      };
    case SET_ITEM_GROUP_VALUE:
      return {
        ...state,
        filterItemGroup: state.filterItemGroup.map((item) =>
          item.id === action.payloadId ? { ...item, check: !item.check } : item
        ),
      };
    case GET_FILTER_VALUE_LOADING:
      return {
        ...state,
        filterGenderList: [],
        filterSubCategory: [],
        filterCategory: [],
        filterItemGroup: [],
        filterLoading: true,
        filterError: null,
      };
    case GET_FILTER_VALUE:
      return {
        ...state,
        filterGenderList: action.payloadGender,
        filterSubCategory: action.payloadSubCategory,
        filterCategory: action.payloadCategory,
        filterItemGroup: action.payloadItemGroup,
        filterLoading: false,
        filterError: null,
      };
    case GET_FILTER_VALUE_ERROR:
      return {
        ...state,
        filterGenderList: [],
        filterSubCategory: [],
        filterCategory: [],
        filterItemGroup: [],
        filterLoading: false,
        filterError: action.payload,
      };
    case GET_PRODUCT_LOADING:
      return {
        ...state,
        listOfProductLoading: true,
        listOfProduct: [],
        listOfProductError: null,
      };
    case GET_PRODUCT_LIST:
      return {
        ...state,
        listOfProduct: [...state.listOfProduct, ...action.payload],
        listOfProductLoading: false,
        listOfProductError: null,
        paginationLoading: false,
        offsetProduct: state.offsetProduct + 10,
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        listOfProduct: [],
        listOfProductLoading: false,
        listOfProductError: action.payload,
      };
    case GET_LIKE_ITEMS:
      return {
        ...state,
        likeItems: action.payloadLikeItemsList,
        likeItemsLoading: false,
        likeItemsError: null,
        likeListIds: action.payloadLikeItemsList.map((item) => item.id),
      };
    case GET_LIKE_ITEMS_LOADING:
      return {
        ...state,
        likeItemsLoading: true,
        likeItemsError: null,
        likeItems: [],
      };
    case GET_LIKE_ITEMS_ERROR:
      return {
        ...state,
        likeItemsLoading: false,
        likeItemsError: action.payload
          ? action.payload
          : "server response failed",
        likeItems: [],
      };
    case CARD_ITEM_INCREMENT:
      return {
        ...state,
        cardItems: state.cardItems.map((item) =>
          item.id === action.payloadProductId
            ? { ...item, cart_qty: parseInt(item.cart_qty) + 1 }
            : item
        ),
      };
    case CARD_ITEM_DECREMENT:
      return {
        ...state,
        cardItems: state.cardItems.map((item) =>
          item.id === action.payloadProductId
            ? { ...item, cart_qty: parseInt(item.cart_qty) - 1 }
            : item
        ),
      };
    case CARD_ITEM_VALUE_REMOVE:
      return {
        ...state,
        cardItems: state.cardItems.filter(
          (item) => item.id !== action.payloadProductId
        ),
      };
    case REMARK_ITEM_STATE_CHANGE:
      return {
        ...state,
        cardItems: state.cardItems.map((item) =>
          item.id === action.payloadProductId
            ? { ...item, remark: action.payloadRemark }
            : item
        ),
      };
    case SET_SIZE_ID_STATE_CHANGE:
      return {
        ...state,
        cardItems: state.cardItems.map((item) =>
          item.id === action.payloadProductId
            ? { ...item, size_id: action.payload }
            : item
        ),
      };
    case SET_GROUP_ID_STATE_CHANGE:
      return {
        ...state,
        cardItems: state.cardItems.map((item) =>
          item.id === action.payloadProductId
            ? { ...item, items_group_id: action.payload }
            : item
        ),
      };

    default:
      return state;
  }
};
