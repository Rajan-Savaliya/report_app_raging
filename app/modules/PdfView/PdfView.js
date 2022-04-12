/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Linking,
  ToastAndroid,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Pdf from "react-native-pdf";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";
import styled from "styled-components/native";
import Moment from "moment";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Header from "../../components/Header.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

const PdfView = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [download, setDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  const { webviewOrder, webviewOrderLoading, webviewOrderError } = useSelector(
    (state) => state.productState
  );
  const { userToken } = useSelector((state) => state.authState);

  useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setDownload(true);
        } else {
          Alert.alert(
            "Permission Denied!",
            "You need to give storage permission to download the file"
          );
        }
      } catch (err) {}
    })();
  }, []);

  const actualDownload = () => {
    if (download) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          setLoading(true);
          const { dirs } = RNFetchBlob.fs;

          var downaldoFileString = `${Moment().format("YYYY-MM-DD")} ReportApp`;

          var downalodFileName = `REPORTAPP${downaldoFileString}.pdf`;

          RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              mediaScannable: true,
              title: downalodFileName,
              path: `${dirs.DownloadDir}/${downaldoFileString}.pdf`,
            },
          })
            .fetch("GET", `${route.params.pdfUrl}`, {
              Authorization: `Bearer ${userToken}`,
            })
            .then((res) => {
              setLoading(false);
              ToastAndroid.show(
                `${downalodFileName} PDF successfully downloaded`,
                ToastAndroid.SHORT
              );
            })
            .catch((e) => {
              setLoading(false);
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  Toast.show({
                    text1: "Something went wrong try again",
                    visibilityTime: 3000,
                    autoHide: true,
                    position: "bottom",
                    type: "error",
                  });
                } else {
                  Toast.show({
                    text1: "Check your Internet Connection",
                    visibilityTime: 3000,
                    autoHide: true,
                    position: "bottom",
                    type: "error",
                  });
                }
              });
            });
        } else {
          Toast.show({
            text1: "Check your Internet Connection",
            visibilityTime: 3000,
            autoHide: true,
            position: "bottom",
            type: "error",
          });
        }
      });
    } else {
      Alert.alert(
        "Permission Denied!",
        "You need to give storage permission to download the file",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  return (
    <SafeArea bgColor={"#F6F7FB"}>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0, 0.5)"
      />
      <View
        style={{
          paddingLeft: 15,
          paddingVertical: 10,
          backgroundColor: "#FFFFFF",
          borderBottomColor: "#26c957",
          borderBottomWidth: 0.2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="caret-back" size={20} color={"#26c957"} />

          <View>
            <Text
              style={{ color: "#26c957", fontWeight: "normal", fontSize: 19 }}
            >
              ORDER PDF
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => {
              actualDownload();
            }}
          >
            <MaterialIcons color="#26c957" name="file-download" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 15, marginLeft: 10 }}
            onPress={() => {
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  const { dirs } = RNFetchBlob.fs;

                  RNFetchBlob.config({
                    fileCache: true,
                  })
                    .fetch("GET", `${route.params.pdfUrl}`, {
                      Authorization: `Bearer ${userToken}`,
                    })
                    .then((res) => {
                      res.readFile("base64").then((basepdf) => {
                        let shareOptionsUrl = {
                          title: "App Pdf",
                          message: "PDF",
                          url: `data:application/pdf;base64,${basepdf}`,
                          subject: "Share information from your application",
                        };
                        Share.open(shareOptionsUrl);
                      });
                    })
                    .catch((e) => {
                      setLoading(false);
                      NetInfo.fetch().then((state) => {
                        if (state.isConnected) {
                          Toast.show({
                            text1: "Something went wrong try again",
                            visibilityTime: 3000,
                            autoHide: true,
                            position: "bottom",
                            type: "error",
                          });
                        } else {
                          Toast.show({
                            text1: "Check your Internet Connection",
                            visibilityTime: 3000,
                            autoHide: true,
                            position: "bottom",
                            type: "error",
                          });
                        }
                      });
                    });
                } else {
                  Toast.show({
                    text1: "Check your Internet Connection",
                    visibilityTime: 3000,
                    autoHide: true,
                    position: "bottom",
                    type: "error",
                  });
                }
              });
            }}
          >
            <MaterialCommunityIcons color="#26c957" name="share" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {route && route.params && route.params.pdfUrl ? (
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            // marginTop: 5,
          }}
        >
          <Pdf
            source={{
              uri: route.params.pdfUrl,
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }}
            onLoadComplete={(numberOfPages, filePath) => {}}
            onPageChanged={(page, numberOfPages) => {}}
            onError={(error) => {}}
            onPressLink={(uri) => {}}
            style={{
              flex: 1,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
          />
        </View>
      ) : (
        <View
          style={{
            bottom: 30,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Entypo color="#000000" name="emoji-sad" size={55} />
              </View>
              <View>
                <Text style={{ top: 10, color: "#000000", fontSize: 17 }}>
                  something is wrong try again
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeArea>
  );
};

export default PdfView;
