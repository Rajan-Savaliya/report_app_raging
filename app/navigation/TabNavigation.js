import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useSelector } from "react-redux";

import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../modules/Home/Home.js";
import More from "../modules/More/More.js";
import News from "../modules/News/News.js";
import OneTimeReport from "../modules/OneTimeReport /OneTimeReport";
import Booking from "../modules/Booking/Booking";

import Report from "../modules/Report/Report";

import Delivery from "../modules/Delivery/Delivery";

import {
  TabNavigationMain,
  TabBarIconContainer,
} from "./TabNavigation.Style.js";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { isDarkTheme } = useSelector((state) => state.themeState);
  const { totalGrValue } = useSelector((state) => state.productState);
  const { userServiceType } = useSelector((state) => state.authState);

  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#1845B2",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const setItenValue = (label, isFocused) => {
            if (label === "Delivery") {
              return (
                <TouchableOpacity
                  onPress={onPress}
                  key={0}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name={
                      isFocused ? "truck-delivery" : "truck-delivery-outline"
                    }
                    size={29}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            } else if (label === "Booking") {
              return (
                <TouchableOpacity
                  key={1}
                  onPress={onPress}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name={isFocused ? "book-open" : "book-open-outline"}
                    size={29}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            } else if (label === "Home") {
              return (
                <TouchableOpacity
                  key={1}
                  onPress={onPress}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                    height: 60,
                  }}
                >
                  <Ionicons
                    name={isFocused ? "ios-settings-sharp" : "settings-outline"}
                    size={26}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            } else if (label === "News") {
              return (
                <TouchableOpacity
                  key={2}
                  onPress={onPress}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  {isFocused ? (
                    <Image
                      source={require("../assets/user.png")}
                      style={{ width: 35, height: 35, resizeMode: "cover" }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/user-o.png")}
                      style={{ width: 35, height: 35, resizeMode: "cover" }}
                    />
                  )}
                </TouchableOpacity>
              );
            } else if (label === "Report") {
              return (
                <TouchableOpacity
                  key={3}
                  onPress={onPress}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name={isFocused ? "card-bulleted" : "card-bulleted-outline"}
                    size={29}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            } else if (label === "OneTimeReport") {
              return (
                <TouchableOpacity
                  key={3}
                  onPress={onPress}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name={isFocused ? "card-bulleted" : "card-bulleted-outline"}
                    size={29}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            } else if (label === "More") {
              return (
                <TouchableOpacity
                  key={4}
                  onPress={onPress}
                  style={{
                    flex: 0.4,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <Ionicons
                    name={
                      isFocused
                        ? "information-circle"
                        : "information-circle-outline"
                    }
                    size={29}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={5}
                  onPress={onPress}
                  style={{
                    flex: 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}
                >
                  <Ionicons
                    name={isFocused ? "home" : "home-outline"}
                    size={24}
                    color={isFocused ? "#FFFFFF" : "#ffffff"}
                  />
                </TouchableOpacity>
              );
            }
          };

          return <>{setItenValue(label, isFocused)}</>;
        })}
      </View>
    );
  }

  return (
    <TabNavigationMain
      tabBar={(props) => <MyTabBar {...props} />}
      isDarkTheme={isDarkTheme}
      userServiceType={userServiceType}
    >
      {userServiceType == "Daily" ? (
        <Tab.Screen
          name="Delivery"
          component={Delivery}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIconContainer>
                <MaterialCommunityIcons
                  name={
                    focused
                      ? "truck-delivery-outline"
                      : "truck-delivery-outline"
                  }
                  size={28}
                  color={focused ? "#FFFFFF" : "#FFFFFF"}
                />
              </TabBarIconContainer>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Booking"
          component={Booking}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIconContainer>
                <MaterialCommunityIcons
                  name={"truck-delivery-outline"}
                  size={28}
                  color={"#FFFFFF"}
                />
              </TabBarIconContainer>
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconContainer>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#FFFFFF" : "#FFFFFF"}
              />
            </TabBarIconContainer>
          ),
        }}
      />

      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconContainer>
              <MaterialCommunityIcons
                name={focused ? "filter" : "filter-outline"}
                size={28}
                color={focused ? "#FFFFFF" : "#FFFFFF"}
              />
            </TabBarIconContainer>
          ),
        }}
      />

      {userServiceType == "Daily" ? (
        <Tab.Screen
          name="Report"
          component={Report}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIconContainer>
                <MaterialCommunityIcons
                  name={focused ? "filter" : "filter-outline"}
                  size={28}
                  color={focused ? "#FFFFFF" : "#FFFFFF"}
                />
              </TabBarIconContainer>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="OneTimeReport"
          component={OneTimeReport}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIconContainer>
                <MaterialCommunityIcons
                  name={focused ? "filter" : "filter-outline"}
                  size={28}
                  color={focused ? "#FFFFFF" : "#FFFFFF"}
                />
              </TabBarIconContainer>
            ),
          }}
        />
      )}

      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIconContainer>
              <Ionicons
                name={focused ? "ios-cart" : "ios-cart-outline"}
                size={28}
                color={focused ? "#FFFFFF" : "#FFFFFF"}
              />
            </TabBarIconContainer>
          ),
        }}
      />
    </TabNavigationMain>
  );
};

export default TabNavigation;
