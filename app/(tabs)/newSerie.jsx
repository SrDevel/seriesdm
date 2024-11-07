import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import AddSerieModal from '../../components/addSerieModal';
import Card from '../../components/Card';
import { getData, insertData } from '../lib/api';
import { StatusBar } from 'expo-status-bar';

const NewSerie = () => {
  const [series, setSeries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSerie, setSelectedSerie] = useState(null);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      setLoading(true);
      const { data } = await getData('series');
      setSeries(data || []);
    } catch (error) {
      console.error('Error fetching series:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSerie = (serie) => {
    setSelectedSerie(serie);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-indigo-950 h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-indigo-950 h-full">
      <StatusBar style="light" />
      <LinearGradient
        colors={["#1e1b4b", "#312e81", "#4338ca"]}
        style={{ flex: 1 }}
      >
        <View className="flex-1">
          <FlatList
            data={series}
            className="w-11/12 mx-auto mt-2"
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card
                image={item.imagen}
                title={item.titulo}
                text={`Género: ${item.id_generos}`}
                onPress={() => handleEditSerie(item)}
                style="mb-2"
              />
            )}
          />
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="absolute bottom-10 left-10 rounded-full bg-indigo-600 w-14 h-14 items-center justify-center"
        >
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>

        <AddSerieModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={fetchSeries}
          editSerie={selectedSerie}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default NewSerie;