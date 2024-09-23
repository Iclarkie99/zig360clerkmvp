import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import React from "react";
import FaqCard from "../../components/help/FaqCard";
import { useNavigation } from "@react-navigation/native";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";
//import styles from "../../components/global.style";

import { Feather } from "@expo/vector-icons";
import { faqs } from "../../utilities/data/faqs";

const Help = () => {
  const navigation = useNavigation();

  const sendEmail = () => {
    Linking.openURL("mailto:iainclarke@zig360.com");
  };
  console.log("faqs", faqs);
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            borderColor: COLORS.black,
            borderWidth: 1,
            padding: 4,
            borderRadius: 4,
          }}
        >
          <Feather name="arrow-left" size={SIZES.medium} color={COLORS.black} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 10,
            fontFamily: FONT.InterBold,
            fontSize: SIZES.large,
          }}
        >
          Get Help or Contact Us
        </Text>
      </View>

      <View style={{}}>
        <Text
          style={{
            marginLeft: 20,
            fontFamily: FONT.InterBold,
            fontSize: SIZES.large,
            marginBottom: 10,
          }}
        >
          FAQs
        </Text>
        <FlatList
          data={faqs}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <FaqCard item={item} />}
          keyExtractor={(item) => item?.id}
        />
      </View>
      <View>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 20,
            fontFamily: FONT.InterBold,
            fontSize: SIZES.large,
          }}
        >
          Contact Us
        </Text>
        <View style={{ backgroundColor: COLORS.white, marginHorizontal: 20 }}>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 20,
              fontFamily: FONT.InterRegular,
              fontSize: SIZES.medium,
            }}
          >
            Send the team an email, we would love to connect.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View
              style={{
                width: "80%",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: COLORS.actionButton,
                  marginVertical: 30,
                  width: "100%",
                  shadowColor: COLORS.phantom,
                  borderRadius: SIZES.xSmall,
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                }}
                onPress={() => {
                  sendEmail();
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.InterMedium,
                    fontSize: SIZES.medium,
                    color: COLORS.white,
                    textAlign: "center",
                  }}
                >
                  Send us an email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Help;
