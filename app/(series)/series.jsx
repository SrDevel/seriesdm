import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Platform } from 'react-native';
import { getData } from '../lib/api';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import AccountMenu from '../../components/SignOut';

export default function SeriesScreen() {
  const [series, setSeries] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [groupedSeries, setGroupedSeries] = useState({});
  const { width } = Dimensions.get('window');
  const router = useRouter();
  const scrollRefs = useRef({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: seriesData } = await getData('series');
      const { data: genresData } = await getData('generos');
      
      setSeries(seriesData || []);
      setGeneros(genresData || []);

      // Group by id_generos instead of id_genero
      const grouped = {};
      seriesData?.forEach(serie => {
        if (!grouped[serie.id_generos]) {
          grouped[serie.id_generos] = [];
        }
        grouped[serie.id_generos].push(serie);
      });
      setGroupedSeries(grouped);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const getGenreName = (generoId) => {
    const foundGenre = generos.find(g => g.id === parseInt(generoId));
    return foundGenre?.Nombre || 'Género sin nombre';
  };

  const SeriesCard = ({ serie }) => (
    <TouchableOpacity 
      className="mr-4 rounded-xl overflow-hidden"
      style={{ width: width * 0.4 }}
      onPress={() => router.push(`/serieDetail/${serie.id}`)}
    >
      <View>
        <Image
          source={{ uri: serie.imagen }}
          className="w-full h-56 rounded-xl"
          style={{ resizeMode: 'cover' }}
        />
        <View className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
          <Text className="text-white font-bold">{serie.titulo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1e1b4b' }}>
      <Stack.Screen 
        options={{
          title: 'Series',
          headerStyle: { 
            backgroundColor: '#1e1b4b',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity 
              onPress={handleLogout}
              className="mr-4 p-2"
            >
              <FontAwesome name="user-circle" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerSafeAreaInsets: { top: 0 },
          contentStyle: { 
            backgroundColor: '#1e1b4b'
          }
        }} 
      />
      
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1e1b4b' }}>
        <AccountMenu />
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{
            paddingTop: Platform.OS === 'ios' ? 0 : 20
          }}
        >
          {Object.entries(groupedSeries).map(([generoId, seriesList]) => (
            <View key={generoId} className="mb-8">
              <Text className="text-white text-2xl font-bold mb-4 px-4 mt-4">
                {getGenreName(generoId)}
              </Text>
              <ScrollView 
                ref={ref => scrollRefs.current[generoId] = ref}
                horizontal 
                showsHorizontalScrollIndicator={false} 
                className="pl-4"
              >
                {seriesList.map(serie => (
                  <SeriesCard 
                    key={serie.id} 
                    serie={serie}
                  />
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}