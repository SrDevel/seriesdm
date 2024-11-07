import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import AccountMenu from '../../components/SignOut'
import { StatusBar } from 'expo-status-bar'

const TabsLayout = () => {
  return (
    <>
    <AccountMenu />
      <StatusBar barStyle='light-content' backgroundColor='#8a5bcf' />
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
        <Tabs.Screen
          name='directors'
          options={{
            title: 'Directores',
            tabBarIcon: ({ color }) => (
              <FontAwesome name='users' size={24} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name='languages'
          options={{
            title: 'Idiomas',
            tabBarIcon: ({ color }) => (
              <FontAwesome name='language' size={24} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name='genres'
          options={{
            title: 'Géneros',
            tabBarIcon: ({ color }) => (
              <FontAwesome name='tags' size={24} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name='newSerie'
          options={{
            title: 'Series',
            tabBarIcon: ({ color }) => (
              <FontAwesome name='film' size={24} color={color} />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout