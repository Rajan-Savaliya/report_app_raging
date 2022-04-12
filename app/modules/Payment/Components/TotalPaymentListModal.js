import React from "react";
import { View, Text, ScrollView, Image, Linking } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { payMentModalToggle } from "../../../redux/actions/authActons";

const TotalPaymentListModal = () => {
  const dispatch = useDispatch();
  const { paymentModalShow, paymentListData } = useSelector(
    (state) => state.authState
  );

  return (
    <Modal
      onBackdropPress={() => {
        dispatch(payMentModalToggle(false, null));
      }}
      animationIn="slideInUp"
      isVisible={paymentModalShow}
    >
      <View
        style={{
          backgroundColor: "#F6F7FB",
          borderRadius: 10,
          marginHorizontal: 10,
          paddingBottom: 20,
          elevation: 2,
        }}
      >
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 17, color: "#000000" }}
            >
              {" "}
              Payment List
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 14, color: "#808080" }}
            >
              {" "}
              Amount :{" "}
              {paymentListData && paymentListData.amount
                ? paymentListData.amount
                : "-"}
            </Text>
          </View>

          {paymentListData &&
          Array.isArray(paymentListData.payment) &&
          paymentListData.payment.length > 0 ? (
            <View>
              {paymentListData.payment.map((item, index) => (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 10,
                      borderRadius: 5,
                      borderWidth: 0.3,
                      borederColor: "#dddddd",
                      marginHorizontal: 10,
                      marginVertical: 5,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <View style={{ flex: 0.4, alignSelf: "center" }}>
                      <Image
                        source={
                          item.image
                            ? {
                                uri: `https://rd.ragingdevelopers.com/atender/assets/images/services/${item.image}`,
                              }
                            : require("../../../assets/work.jpg")
                        }
                        style={{ width: "90%", height: 70 }}
                      />
                    </View>
                    <View style={{ flex: 0.6 }}>
                      <View>
                        <Text>Amount: {item.amount ? item.amount : "-"}</Text>
                      </View>
                      <View>
                        <Text>Remark: {item.remark ? item.remark : "-"}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : null}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default TotalPaymentListModal;
