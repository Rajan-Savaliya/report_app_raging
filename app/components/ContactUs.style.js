import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";

export const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingVertical: 25,
  },
  emojiAlertStyle: {
    marginTop: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  redTextColor: {
    color: "red",
  },
  formTextErrorContainerStyle: {
    marginLeft: 5,
    marginTop: 0,
    marginBottom: -5,
  },
  formTextColorText: {
    fontSize: 13,
  },
  contactusnetworkContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  contactusEmailContainer: {
    borderRadius: 5,
    overflow: "hidden",
    elevation: 0.6,
  },
  contactusWebContainer: {
    borderRadius: 5,
    overflow: "hidden",
    elevation: 0.6,
    marginTop: 10,
  },
  contactusEmailContainerDark: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 40,
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: "#161616",
  },
  contactusEmailContainerLight: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 40,
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: "#000000",
  },
  marginLeft10: {
    marginLeft: 10,
  },
  socialLinkContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
  },
  faceBookContainer: {
    backgroundColor: "#4267B2",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 3,
  },
  faceBook2Container: {
    backgroundColor: "#EA462F",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 3,
  },
});

export const IconsContianer = styled.TouchableHighlight`
  background-color: ${(props) => props.bgColor};
  border-radius: 30px;
  padding: 10px;
  margin: 0px 3px;
`;
