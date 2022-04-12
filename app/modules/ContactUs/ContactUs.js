import React from "react";
import {
  TouchableNativeFeedback,
  Platform,
  TouchableHighlight,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import { SafeArea } from "./ContactUs.Style.js";
import { Formik } from "formik";
import * as yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import { contcatUsAction } from "../../redux/actions/authActons.js";

const contactusSchema = yup.object({
  name: yup.string().required("name is required").min(4),
  email: yup
    .string()
    .required("email is required")
    .email("enter a valid email address"),
  message: yup.string().required("message is required").min(10),
  contactNumber: yup.string().required("contact No is required"),
  address: yup.string().required("address is required"),
  pincode: yup.string().required("pincode is required"),
  city: yup.string().required("city is required"),
  state: yup.string().required("state is required"),
});

const ContactUs = ({ navigation }) => {
  const dispatch = useDispatch();

  const Touchable =
    Platform.OS === "iOS" ? TouchableHighlight : TouchableNativeFeedback;

  return (
    <SafeArea bgColor={"#F7F6F2"}>
      <StatusBar backgroundColor={"#F7F6F2"} barStyle="dark-content" />

      <View
        style={{
          paddingLeft: 15,
          paddingVertical: 10,
          backgroundColor: "#F7F6F2",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="caret-back" size={20} color={"#CD9b46"} />

          <View>
            <Text
              style={{ color: "#cd9b46", fontWeight: "normal", fontSize: 19 }}
            >
              Contact Us
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: 40, paddingBottom: 40 }}
      >
        <Formik
          initialValues={{
            name: "",
            email: "",
            message: "",
            contactNumber: "",
            address: "",
            pincode: "",
            city: "",
            state: "",
          }}
          validationSchema={contactusSchema}
          onSubmit={(values, actions) => {
            NetInfo.fetch().then((state) => {
              if (state.isConnected) {
                actions.resetForm();
                dispatch(
                  contcatUsAction(
                    values.name,
                    values.contactNumber,
                    values.message
                  )
                );
              } else {
                Toast.show({
                  text1: "Check your Internet Connection",
                  visibilityTime: 3000,
                  autoHide: true,
                  position: "top",
                  type: "error",
                });
              }
            });
          }}
        >
          {(props) => (
            <View>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: "#FFFFFF",
                  marginHorizontal: 20,
                  marginTop: 10,
                  elevation: 0.5,
                }}
              >
                <View style={{}}>
                  <Text style={{ color: "#cd9b46", fontSize: 18 }}>
                    Submit Your Query
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 0.3,
                    elevation: 0.4,
                    backgroundColor: "#DDDDDD",
                    width: "100%",
                    marginTop: 5,
                  }}
                />

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Name"
                    placeholderTextColor="#666666"
                    onChangeText={props.handleChange("name")}
                    onBlur={props.handleBlur("name")}
                    value={props.values.name}
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#DDDDDD",
                      paddingVertical: 1,
                      paddingBottom: 5,
                      marginTop: 8,
                      color: "#000000",
                    }}
                  />
                </View>
                <View>
                  <Text style={{ color: "red" }}>
                    {props.touched.name && props.errors.name}
                  </Text>
                </View>
                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Email ID"
                    placeholderTextColor="#666666"
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#DDDDDD",
                      paddingVertical: 1,
                      paddingBottom: 5,
                      marginTop: 4,
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("email")}
                    onBlur={props.handleBlur("email")}
                    value={props.values.email}
                  />
                </View>
                <View>
                  <Text style={{ color: "red" }}>
                    {props.touched.email && props.errors.email}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Contact No."
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#DDDDDD",
                      paddingVertical: 1,
                      paddingBottom: 5,
                      marginTop: 4,
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("contactNumber")}
                    onBlur={props.handleBlur("contactNumber")}
                    value={props.values.contactNumber}
                  />
                </View>
                <View>
                  <Text style={{ color: "red" }}>
                    {props.touched.contactNumber && props.errors.contactNumber}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Your Message"
                    placeholderTextColor="#666666"
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#DDDDDD",
                      paddingVertical: 1,
                      paddingBottom: 5,
                      marginTop: 4,
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("message")}
                    onBlur={props.handleBlur("message")}
                    value={props.values.message}
                  />
                </View>
                <View>
                  <Text style={{ color: "red" }}>
                    {props.touched.message && props.errors.message}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Address"
                    placeholderTextColor="#666666"
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#DDDDDD",
                      paddingVertical: 1,
                      paddingBottom: 5,
                      marginTop: 4,
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("address")}
                    onBlur={props.handleBlur("address")}
                    value={props.values.address}
                  />
                </View>
                <View>
                  <Text style={{ color: "red" }}>
                    {props.touched.address && props.errors.address}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Pin code"
                    keyboardType="numeric"
                    placeholderTextColor="#666666"
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#DDDDDD",
                      paddingVertical: 1,
                      paddingBottom: 5,
                      marginTop: 4,
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("pincode")}
                    onBlur={props.handleBlur("pincode")}
                    value={props.values.pincode}
                  />
                </View>
                <View>
                  <Text style={{ color: "red" }}>
                    {props.touched.pincode && props.errors.pincode}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="City"
                    placeholderTextColor="#666666"
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#DDDDDD",
                      paddingVertical: 1,
                      paddingBottom: 5,
                      marginTop: 4,
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("city")}
                    onBlur={props.handleBlur("city")}
                    value={props.values.city}
                  />
                </View>
                <View>
                  <Text style={{ color: "red" }}>
                    {props.touched.city && props.errors.city}
                  </Text>
                </View>

                <View style={{}}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="State"
                    placeholderTextColor="#666666"
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#DDDDDD",
                      paddingVertical: 1,
                      paddingBottom: 5,
                      marginTop: 4,
                      color: "#000000",
                    }}
                    onChangeText={props.handleChange("state")}
                    onBlur={props.handleBlur("state")}
                    value={props.values.state}
                  />
                </View>
                <View>
                  <Text style={{ color: "red" }}>
                    {props.touched.state && props.errors.state}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 50,
                    marginLeft: 5,
                    marginRight: 20,
                    marginBottom: 10,
                  }}
                >
                  <Touchable
                    background={TouchableNativeFeedback.Ripple("#ECECEC")}
                    onPress={() => {
                      props.handleSubmit();
                    }}
                  >
                    <View
                      style={{
                        marginTop: 10,
                        paddingHorizontal: 70,
                        borderRadius: 50,
                        paddingVertical: 15,
                        backgroundColor: "#CD9B46",
                        fontFamily: "Play-Regular",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#ECECEC",
                          fontSize: 14,
                        }}
                      >
                        SUBMIT
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeArea>
  );
};

export default ContactUs;
