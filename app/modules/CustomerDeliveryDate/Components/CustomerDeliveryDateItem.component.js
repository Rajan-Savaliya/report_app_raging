/* eslint-disable radix */
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { setDeliveryStatus } from "../../../redux/actions/productActions";

const DeliveryItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const bgColorSet =
    item.type == "sale_invoice"
      ? "#f5f5f5"
      : item.type == "Closing Balance"
      ? "#d6fffb"
      : item.type == "receipt"
      ? "#faefcf"
      : item.type == "payment"
      ? "#fce3e5"
      : "#f5f5f5";
  return (
    <View
      style={{
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 0.3,
        borderColor: "#DDDDDD",
      }}
    >
      <View
        style={{
          borderRadius: 10,
          backgroundColor: bgColorSet,
        }}
      >
        <View
          style={{
            paddingVertical: 10,
            position: "relative",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", width: "70%" }}>
              <View style={{ marginLeft: 6 }}>
                <View>
                  <Text style={{ color: "#1845B2", fontSize: 17 }}>
                    {item.type ? item.type : ""}
                  </Text>
                </View>
                <View>
                  <Text adjustsFontSizeToFit minimumFontScale={0.8}>
                    note: {item.note ? item.note : "-"}
                  </Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#26c957",
                      flex: 0.5,
                      flexWrap: "wrap",
                    }}
                  >
                    Credit:{"  "}
                    {item.credit || item.credit == 0 ? item.credit : "-"}
                  </Text>
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#ff3636",
                      flex: 0.5,
                      flexWrap: "wrap",
                    }}
                  >
                    Debit:{"  "}
                    {item.debit || item.debit == 0 ? ` ${item.debit}` : " -"}
                  </Text>
                </View>

                <View>
                  <Text
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                    style={{
                      color: "#cf9a1d",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Total:
                    {item.balance || item.balance == 0
                      ? ` ${item.balance}`
                      : " -"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ width: "30%" }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              ></View>
              <View style={{ marginRight: 7, marginLeft: 3 }}>
                <View style={{}}>
                  <Text style={{ textAlign: "right", color: "#808080" }}>
                    Invoice: {item.invoice ? item.invoice : "-"}
                  </Text>
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      textAlign: "right",
                      color: "#808080",
                      fontSize: 14,
                    }}
                  >
                    {" "}
                    {item.date ? item.date : ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {item.is_pdf && item.invoice ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PdfView", {
              item: {},
              pdfUrl: `https://nt.dhyatiktok.com/ntapi/home/get_sales_pdf/${item.invoice}`,
            });

            // callThePersonAction();
            // navigation.navigate("AddService", {
            //   id: item.id,
            //   name: item.name,
            //   description: item.description,
            //   price: item.price,
            //   image: item.image,
            //   update: true,
            // });
          }}
          style={{
            zIndex: 5,
            position: "absolute",
            borderRadius: 50,
            // borderWidth: 1,
            borderColor: "#4287f5",
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
            right: "3%",
            bottom: "10%",
          }}
        >
          <MaterialCommunityIcons
            name={"file-pdf-box"}
            color="#4287f5"
            size={25}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default DeliveryItem;
