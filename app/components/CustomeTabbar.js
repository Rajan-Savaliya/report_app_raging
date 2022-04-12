import React, { memo } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { TabBar } from "react-native-tab-view";
import styled from "styled-components/native";
import { Badge } from "react-native-paper";

import { colors } from "../theme/colors.js";

const CustomeTabbar = ({
  props,
  isDarkTheme = false,
  scroll = false,
  TabTotalItem = 3,
  bookPendingNumber = 0,
  bookCompNumber = 0,
  bookCanNumber = 0,
}) => {
  const setTabBarColor = (SelectTabColor, isDarkTheme) => {
    if (isDarkTheme && SelectTabColor) {
      return "#000000";
    } else if (isDarkTheme && !SelectTabColor) {
      return "#FFFFFF";
    } else if (!isDarkTheme && SelectTabColor) {
      return "#FFFFFF";
    } else {
      return "#FFFFFF";
    }
  };

  const TabBarText = styled.Text`
    margin: 8px ${(props) => (props.scroll ? `0px` : `0px`)};
    font-size: ${Dimensions.get("window").width < 360 ? 13 : 14}px;
    color: ${(props) => setTabBarColor(props.focused, props.isDarkTheme)};
  `;

  const TabBarFocusIndicator = styled.View`
    top: 7.7px;
    align-self: center;
    width: ${Dimensions.get("window").width / TabTotalItem}px;
    padding: 1px;
    background-color: ${(props) =>
      setTabBarColor(props.focused, props.isDarkTheme)};
  `;
  const TabBarCustomerStyle = styled(TabBar).attrs((props) => ({
    tabStyle: {
      backgroundColor: props.isDarkTheme ? "#1845B2" : "#1845B2",
      elevation: 0,
      width: Dimensions.get("window").width / TabTotalItem,
    },
    indicatorStyle: { opacity: 0 },
  }))`
    elevation: 0;
    margin-top: 0px;
    background-color: ${(props) =>
      props.isDarkTheme ? colors.brand.primary : colors.brand.secondary};
  `;

  return (
    <View style={scroll && styles.centerTab}>
      <TabBarCustomerStyle
        scrollEnabled={scroll}
        TabTotalItem={TabTotalItem}
        values={scroll}
        {...props}
        isDarkTheme={isDarkTheme}
        renderLabel={({ route, focused }) => (
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <TabBarText
                  scroll={scroll}
                  focused={focused}
                  isDarkTheme={isDarkTheme}
                >
                  {route.title}
                </TabBarText>
              </View>
              <View>
                <Badge style={{ top: 1, left: 6, textAlign: "center" }}>
                  {route.title == "Pending"
                    ? bookPendingNumber
                    : route.title == "Completed"
                    ? bookCompNumber
                    : route.title == "Cancelled"
                    ? bookCanNumber
                    : 0}
                </Badge>
              </View>
            </View>

            {focused && (
              <TabBarFocusIndicator
                focused={focused}
                isDarkTheme={isDarkTheme}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default memo(CustomeTabbar);

const styles = StyleSheet.create({
  centerTab: {},
});
