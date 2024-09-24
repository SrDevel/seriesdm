import { Text, Pressable, Animated, View } from 'react-native';
import React, { useRef } from 'react';

export default function CustomButton({ text, onPress, style, isDisabled, isLoading, textStyles, iconName, isCircular }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const buttonStyles = isCircular
    ? 'w-16 h-16 rounded-full' // Botón circular
    : 'min-h-[62px] px-5 rounded-xl'; // Botón normal

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={isDisabled}
        className={`bg-white-800 justify-center items-center ${buttonStyles} ${style} ${isLoading ? 'opacity-50' : ''}`} 
      >
        {iconName && (
          <View className="justify-center items-center">
            {iconName} 
          </View>
        )}
        {text && (
          <Text className={`text-primary-800 text-lg font-bold ${textStyles}`}>{text}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
