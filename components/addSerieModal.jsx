import React, { useState, useEffect } from 'react';
import { View, Modal, Text, Pressable, Image, ScrollView } from 'react-native';
import InputField from './InputField';
import { FontAwesome } from 'react-native-vector-icons';
import { Picker } from '@react-native-picker/picker';
import { getData, insertData, uploadImages } from '../app/lib/api';

const AddSerieModal = ({
  visible,
  onClose,
  onSubmit
}) => {
  const [newSerie, setNewSerie] = useState({
    title: '',
    genre_id: '',
    actor_ids: [],
    director_id: '',
    language_ids: [],
    image_url: null
  });
  
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const { data: genresData } = await getData('generos');
      const { data: languagesData } = await getData('idiomas');
      const { data: directorsData } = await getData('directores');
      const { data: actorsData } = await getData('actores');

      setGenres(genresData || []);
      setLanguages(languagesData || []);
      setDirectors(directorsData || []);
      setActors(actorsData || []);
    };

    loadData();
  }, []);

  const handleSubmit = async () => {
    if (newSerie.image) {
      const imageUrl = await uploadImages(newSerie.image);
      if (imageUrl) {
        const serieData = {
          ...newSerie,
          image_url: imageUrl
        };
        await insertData('series', serieData);
        onSubmit(serieData);
      }
    }
  };

  const handleAddActor = () => {
    if (selectedActor && !newSerie.actor_ids.includes(selectedActor)) {
      setNewSerie({
        ...newSerie,
        actor_ids: [...newSerie.actor_ids, selectedActor]
      });
      setSelectedActor('');
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <ScrollView className="bg-white rounded-t-xl p-6 max-h-[90%]">
        <Text className="text-primary text-lg font-bold mb-4">Nueva Serie</Text>

        <InputField
          placeholder="Título"
          value={newSerie.title}
          onChangeText={(text) => setNewSerie({ ...newSerie, title: text })}
        />

        <View className="border border-gray-300 rounded-lg mt-2">
          <Picker
            selectedValue={newSerie.genre_id}
            onValueChange={(value) => setNewSerie({ ...newSerie, genre_id: value })}
          >
            <Picker.Item label="Seleccione género" value="" />
            {genres.map(genre => (
              <Picker.Item 
                key={genre.id} 
                label={genre.nombre} 
                value={genre.id} 
              />
            ))}
          </Picker>
        </View>

        <View className="border border-gray-300 rounded-lg mt-2">
          <Picker
            selectedValue={newSerie.director_id}
            onValueChange={(value) => setNewSerie({ ...newSerie, director_id: value })}
          >
            <Picker.Item label="Seleccione director" value="" />
            {directors.map(director => (
              <Picker.Item 
                key={director.id} 
                label={director.nombre} 
                value={director.id} 
              />
            ))}
          </Picker>
        </View>

        <View className="flex-row items-center mt-2">
          <View className="flex-1 border border-gray-300 rounded-lg">
            <Picker
              selectedValue={selectedActor}
              onValueChange={setSelectedActor}
            >
              <Picker.Item label="Seleccione actor" value="" />
              {actors.map(actor => (
                <Picker.Item 
                  key={actor.id} 
                  label={actor.nombre} 
                  value={actor.id} 
                />
              ))}
            </Picker>
          </View>
          <Pressable 
            onPress={handleAddActor}
            className="ml-2 bg-primary p-2 rounded-lg"
          >
            <Text className="text-white">+</Text>
          </Pressable>
        </View>

        <View className="flex-row flex-wrap mt-2">
          {newSerie.actor_ids.map(actorId => {
            const actor = actors.find(a => a.id === actorId);
            return (
              <Pressable 
                key={actorId}
                className="bg-gray-200 rounded-full px-3 py-1 m-1"
                onPress={() => {
                  setNewSerie({
                    ...newSerie,
                    actor_ids: newSerie.actor_ids.filter(id => id !== actorId)
                  });
                }}
              >
                <Text>{actor?.nombre} ×</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between mt-4">
          <Pressable
            onPress={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            <Text className="text-black">Cancelar</Text>
          </Pressable>
          <Pressable
            onPress={handleSubmit}
            className="px-4 py-2 bg-primary rounded-lg"
          >
            <Text className="text-white">Guardar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddSerieModal;