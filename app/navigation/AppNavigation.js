/* eslint-disable react-hooks/exhaustive-deps */
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import Home from "../modules/Home/Home.js";

import TabNavigation from "./TabNavigation.js";
import SignIn from "../modules/SignIn/SignIn.js";
import ContactUs from "../modules/ContactUs/ContactUs.js";
import { useSelector, useDispatch } from "react-redux";
import SignUp from "../modules/SignUp/SignUp";
import Otp from "../modules/Otp/Otp";
import AddUser from "../modules/AddUser/AddUser";
import AddService from "../modules/AddService/AddService";
import NumberVerfie from "../modules/NumberVerfie/NumberVerfie";
import AddAdditional from "../modules/AddAdditional/AddAdditional";
import AboutUs from "../modules/AboutUs/AboutUs";

import AddBooking from "../modules/AddBooking/AddBooking";

import CustomerDeliveryDate from "../modules/CustomerDeliveryDate/CustomerDeliveryDate";

import AuthCard from "../modules/AuthCard/AuthCard";

import Payment from "../modules/Payment/Payment";

import SaleReport from "../modules/SaleReport/SaleReport";

import PdfView from "../modules/PdfView/PdfView";
import WhishList from "../modules/WhishList/WhishList";
import {
  getCustomerItemsAction,
  getCardItemsAction,
  getWhisListData,
  getGroupItemAction,
} from "../redux/actions/productActions";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const dispatch = useDispatch();
  const { bgColorset } = useSelector((state) => state.themeState);
  const { userToken } = useSelector((state) => state.authState);

  // console.log(userToken);

  useEffect(() => {
    if (userToken) {
      dispatch(getCustomerItemsAction());
      dispatch(getCardItemsAction());
      dispatch(getWhisListData());
      dispatch(getGroupItemAction());
    }
  }, [userToken]);

  const NavigationAnimationType =
    CardStyleInterpolators.forRevealFromBottomAndroid;

  return (
    <StackNavigationContainer bgColor={"#FFFFFF"}>
      <Stack.Navigator>
        {userToken ? (
          <>
            {/* <Stack.Screen
              name="Delivery"
              component={TabNavigation}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            /> */}

            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="WhishList"
              component={WhishList}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />

            <Stack.Screen
              name="PdfView"
              component={PdfView}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />

            <Stack.Screen
              name="SaleReport"
              component={SaleReport}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />

            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="AddBooking"
              component={AddBooking}
              options={{
                headerShown: false,
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
            />

            <Stack.Screen
              name="AddUser"
              component={AddUser}
              options={{
                headerShown: false,
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="AddAdditional"
              component={AddAdditional}
              options={{
                headerShown: false,
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
            />

            <Stack.Screen
              name="CustomerDeliveryDate"
              component={CustomerDeliveryDate}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />

            <Stack.Screen
              name="AddService"
              component={AddService}
              options={{
                headerShown: false,
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
            />

            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{
                headerShown: false,
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
            />
          </>
        ) : (
          <>
            {/* <Stack.Screen
              name="AuthCard"
              component={AuthCard}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            /> */}

            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            {/* <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />

            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />
            <Stack.Screen
              name="NumberVerfie"
              component={NumberVerfie}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            />

            <Stack.Screen
              name="ContactUs"
              component={ContactUs}
              options={{
                headerShown: false,
                cardStyleInterpolator: NavigationAnimationType,
              }}
            /> */}
          </>
        )}
      </Stack.Navigator>
    </StackNavigationContainer>
  );
};

export const StackNavigationContainer = styled.View`
  background-color: ${(props) => props.bgColor};
  flex: 1;
`;

export default AppNavigation;
