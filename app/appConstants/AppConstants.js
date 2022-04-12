import {
  Dimensions,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";

export default {
  API_URL: "https://rd.ragingdevelopers.com",
  APP_VERSION: "1.0.0",
  APP_TECHNICAL_ID: "com.report",
  isiPhoneX: Platform.OS === "ios" && Dimensions.get("screen").height > 736,
  isSmallDevice: Dimensions.get("screen").height < 630,
  Touchable:
    Platform.OS === "ios" ? TouchableHighlight : TouchableNativeFeedback,
  TouchableFeed:
    Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback,
};
