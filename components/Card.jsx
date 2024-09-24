import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, Pressable } from "react-native";
import { FontAwesome } from "react-native-vector-icons";

const Card = ({ image, title, text, onPress, style, onLongPress }) => {
  // Referencia para la animación
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación para que aparezca la tarjeta
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
        className={`p-4 bg-white rounded-xl shadow-md items-center justify-center border-2 border-primary-300 ${style}`}
        onPress={onPress}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-24 h-24 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="w-24 h-24 justify-center items-center rounded-lg">
            <FontAwesome name="user" size={96} className="text-primary-300" />
          </View>
        )}

        {/* Texto de título */}
        <Text className="text-primary-400 text-lg font-bold mt-4 text-center">
          {title}
        </Text>

        {/* Texto descriptivo */}
        <Text className="text-sm text-gray-500 mt-2 text-center">{text}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default Card;
