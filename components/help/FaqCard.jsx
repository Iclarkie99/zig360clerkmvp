import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

// UX Imports
import { COLORS, images, FONT, SIZES } from "../../constants";

import { Feather } from "@expo/vector-icons";

const FaqCard = ({ item }) => {
  const [expand, setExpand] = useState(false);

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        marginBottom: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontFamily: FONT.InterBold,
          fontSize: SIZES.medium,
          paddingLeft: 10,
          marginBottom: 5,
        }}
      >
        {item.question}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setExpand(!expand);
        }}
      >
        {!expand ? (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Feather
              name="chevron-down"
              color={COLORS.phantom}
              size={SIZES.xxLarge}
            />
          </View>
        ) : null}
      </TouchableOpacity>
      {expand ? (
        <>
          <Text
            style={{
              fontFamily: FONT.InterRegular,
              fontSize: SIZES.medium,
              paddingLeft: 10,
            }}
          >
            {item.answer}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setExpand(!expand);
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Feather
                name="chevron-up"
                color={COLORS.phantom}
                size={SIZES.xxLarge}
              />
            </View>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

export default FaqCard;
