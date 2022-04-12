import React, { memo } from "react";
import { Appbar } from "react-native-paper";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

const Header = ({
  leftIconPress,
  rightIconPress,
  headerColor,
  leftIcon,
  rightIcon,
  title,
  titleColor,
  iconColor,
  righticonColor = "#FFFFFF",
  showModalPress,
  hide = true,
  isDarkTheme = false,
}) => {
  const dispatch = useDispatch();

  return (
    <AppbarContainer headerColor={headerColor}>
      <AppbarIcon
        icon={leftIcon}
        onPress={leftIconPress}
        iconColor={iconColor}
      />
      <AppbarTitle title={title} titleColor={titleColor} />
      {rightIcon ? (
        <AppbarIcon
          icon={rightIcon}
          onPress={rightIconPress}
          iconColor={righticonColor}
          hide={hide}
        />
      ) : null}
    </AppbarContainer>
  );
};

export default memo(Header);

const AppbarContainer = styled(Appbar.Header)`
  background-color: ${(props) => props.headerColor};
  elevation: 0;
`;

const AppbarIcon = styled(Appbar.Action).attrs((props) => ({
  icon: props.icon,
  color: props.iconColor,
  size: props.icon === "chevron-left" ? 35 : 25,
}))`
  opacity: ${(props) => (props.hide ? 0 : 1)};
  height: ${(props) => (props.hide ? 0 : "auto")};
`;

const AppbarTitle = styled(Appbar.Content).attrs((props) => ({
  title: props.title,
  titleStyle: {
    textAlign: "center",
    color: props.titleColor,
    fontSize: 17,
    fontWeight: "normal",
  },
}))``;
