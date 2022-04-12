import React from "react";
import { View, Text, Modal, Image, Dimensions, StyleSheet } from "react-native";

const NoNetwork = () => {
  return (
    <Modal>
      <View style={noNetworkStyles.noNetWorkContainer}>
        <View style={noNetworkStyles.noNetworkImageContainer}>
          <Image
            style={noNetworkStyles.noNetworkImageStyle}
            source={require("../assets/sad.png")}
          />
        </View>
        <View style={noNetworkStyles.noNetworkTextContianer}>
          <Text style={noNetworkStyles.nonetworkTextStyle}>
            No Internet Connection
          </Text>
        </View>
        <View style={noNetworkStyles.nonetworkInfoContianer}>
          <Text style={noNetworkStyles.nonetworkInfoText}>
            Please check your internet connection and try again
          </Text>
        </View>
        <View style={noNetworkStyles.noNetworkTryAgainContainer}>
          <Text style={noNetworkStyles.tryAgainText}>Try again</Text>
        </View>
      </View>
    </Modal>
  );
};

export default NoNetwork;

const noNetworkStyles = StyleSheet.create({
  headerComponentStyle: {
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.027285129604365622,
    marginBottom: Dimensions.get("window").height * 0.0068212824010914054,
  },
  noNetWorkContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noNetworkImageContainer: {
    backgroundColor: "#fff2f2",
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 30 * 2,
  },
  noNetworkImageStyle: {
    zIndex: 1,
    width: 40,
    height: 40,
  },
  noNetworkTextContianer: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  nonetworkTextStyle: {
    textAlign: "center",
    color: "#000000",
    fontSize: 28,
    fontWeight: "bold",
  },
  nonetworkInfoContianer: {
    marginHorizontal: 30,
    marginTop: 5,
  },
  nonetworkInfoText: {
    textAlign: "center",
    color: "#000000",
    fontSize: 16,
  },
  noNetworkTryAgainContainer: {
    marginTop: 30,
    backgroundColor: "#000000",
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 4,
  },
  tryAgainText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
