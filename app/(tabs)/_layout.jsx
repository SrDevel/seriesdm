import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#CDCDE0',
          tabBarInactiveTintColor: '#CeCDe0',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#8a5bcf',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 64,
          }
        }}
      >
        <Tabs.Screen 
          name='actors'
          options={{
            title: 'Actores',
            tabBarIcon: ({ color }) => (
              <FontAwesome name='user' size={24} color={color} />
            )
          }}
        />
        <Tabs.Screen 
          name='platforms'
          options={{
            title: 'Plataformas',
            tabBarIcon: ({ color }) => (
              <FontAwesome name='tv' size={24} color={color} />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout