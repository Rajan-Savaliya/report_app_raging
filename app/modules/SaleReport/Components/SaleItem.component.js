/* eslint-disable radix */
import React, { memo } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { setDeliveryStatus } from "../../../redux/actions/productActions";

const SaleItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const bgColorSet =
    item.type == "sale_invoice"
      ? "#dddddd"
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
          backgroundColor: "#dddddd",
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
                    {item.customer ? item.customer : ""}
                  </Text>
                </View>
                <View>
                  <Text adjustsFontSizeToFit minimumFontScale={0.8}>
                    Bill Number: {item.bill_no ? item.bill_no : "-"}
                  </Text>
                </View>
                {item.cash_party_name ? (
                  <View style={{ marginVertical: 7 }}>
                    <Text
                      style={{
                        fontSize: 17.5,
                        color: "#ffac12",
                        flex: 0.5,
                        flexWrap: "wrap",
                        fontWeight: "normal",
                      }}
                    >
                      <Text
                        style={{
                          color: "#ffac12",
                          fontWeight: "normal",
                          fontSize: 14.5,
                        }}
                      >
                        Cash party name :{" "}
                      </Text>
                      {item.cash_party_name ? `\n${item.cash_party_name}` : "-"}
                    </Text>
                  </View>
                ) : (
                  <View style={{ marginVertical: 3 }} />
                )}

                <View>
                  <Text
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                    style={{
                      color: "#cf0f08",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Total:
                    {item.total || item.total == 0 ? ` ${item.total}` : " -"}
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
                {item.qty || item.qty == 0 ? (
                  <View style={{}}>
                    <Text style={{ textAlign: "right", color: "#808080" }}>
                      Qty: {item.qty || item.qty == 0 ? item.qty : "-"}
                    </Text>
                  </View>
                ) : null}
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
      {item.invoice_id ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PdfView", {
              item: {},
              pdfUrl: `https://nt.dhyatiktok.com/ntapi/home/get_sales_pdf/${item.invoice_id}`,
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

export default memo(SaleItem);
