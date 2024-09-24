import { View, Text } from 'react-native'
import React from 'react'

const Alerts = ({ text, color, bgColor, style, onPress, ...props }) => {
  return (
    <View className="text-primary-500 bg-primary-100 p-4 rounded-lg" {...props}>
        <Text className="text-primary-500">{text}</Text>
    </View>
  )
}

export default Alerts