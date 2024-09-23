import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { COLORS, images, SIZES, FONT } from "../../constants";
import {
  Feather,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const GettingStartedPage = ({ item }) => {
  const width = useWindowDimensions().width;
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: FONT.InterBold,
          fontSize: SIZES.xLarge,

          color: COLORS.phantom,
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontFamily: FONT.InterBold,
          fontSize: SIZES.xLarge,
          color: COLORS.phantom,
        }}
      >
        {item.title2}
      </Text>
      <Image
        source={item.img}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3, width: width - 40 }}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: FONT.InterRegular,
            fontSize: SIZES.large,
          }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default GettingStartedPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { flex: 0.6, justifyContent: "center" },
  title: { fontSize: SIZES.large, fontFamily: FONT.InterBold, marginTop: 20 },
  description: {
    fontSize: SIZES.small,
    fontFamily: FONT.InterRegular,
    textAlign: "center",
  },
});
