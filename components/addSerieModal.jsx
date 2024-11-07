import React, { useState, useEffect } from 'react';
import { View, Modal, Text, Pressable, Image, ScrollView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getData, insertData, uploadImages } from '../app/lib/api';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { pickImage } from '../utils/imagePicker';
const AddSerieModal = ({ visible, onClose, onSubmit, editSerie }) => {
  const [newSerie, setNewSerie] = useState({
    titulo: '',
    id_generos: '',
    id_actores: [],
    id_directores: '',
    id_idiomas: [],
    imagen: null
  });
  
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const genresRes = await getData('generos');
        const languagesRes = await getData('idiomas');
        const directorsRes = await getData('directores');
        const actorsRes = await getData('actores');

        setGenres(genresRes?.data || []);
        setLanguages(languagesRes?.data || []);
        setDirectors(directorsRes?.data || []);
        setActors(actorsRes?.data || []);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (editSerie) {
      setNewSerie(editSerie);
    }
  }, [editSerie]);

  const handlePickImage = async () => {
    const result = await pickImage();
    if (result) {
      setImage(result);
      setImageName(result.split('/').pop());
      setNewSerie({ ...newSerie, imagen: result });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (!newSerie.titulo || !newSerie.id_generos || !newSerie.id_directores) {
        throw new Error('Por favor complete los campos requeridos');
      }

      const serieData = {
        ...newSerie,
        id_actores: Array.isArray(newSerie.id_actores) ? 
          newSerie.id_actores[0] : newSerie.id_actores,
        id_idiomas: Array.isArray(newSerie.id_idiomas) ? 
          newSerie.id_idiomas[0] : newSerie.id_idiomas
      };

      let imageUri = null;
      if (image) {
        imageUri = await uploadImages(image);
        if (!imageUri) throw new Error('Error subiendo la imagen');
        serieData.imagen = imageUri;
      }

      await insertData('series', serieData);
      onSubmit();
      onClose();
    } catch (err) {
      console.error('Error submitting data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Modal visible={visible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-indigo-950">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#4338ca']}
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1 p-4">
          <View className="bg-white/10 p-6 rounded-3xl border border-white/20">
            <Text className="text-xl font-bold text-white mb-4">Nueva Serie</Text>

            <TextInput
              placeholder="Título"
              value={newSerie.titulo}
              onChangeText={(text) => setNewSerie({ ...newSerie, titulo: text })}
              className="bg-white/20 p-4 rounded-xl mb-4 text-white"
            />

            <View className="bg-white/20 rounded-xl mb-4">
              <Picker
                selectedValue={newSerie.id_generos}
                onValueChange={(value) => setNewSerie({ ...newSerie, id_generos: value })}
              >
                <Picker.Item label="Seleccione un género" value="" />
                {genres.map((genre) => (
                  <Picker.Item key={genre.id} label={genre.Nombre} value={genre.id} />
                ))}
              </Picker>
            </View>

            <View className="bg-white/20 rounded-xl mb-4">
              <Picker
                selectedValue={newSerie.id_directores}
                onValueChange={(value) => setNewSerie({ ...newSerie, id_directores: value })}
              >
                <Picker.Item label="Seleccione un director" value="" />
                {directors.map((director) => (
                  <Picker.Item 
                    key={director.id} 
                    label={`${director.nombre_director} ${director.apellido_director}`} 
                    value={director.id} 
                  />
                ))}
              </Picker>
            </View>

            <View className="bg-white/20 rounded-xl mb-4">
              <Picker
                selectedValue=""
                onValueChange={(value) => {
                  const selectedActors = [...newSerie.id_actores];
                  if (selectedActors.includes(value)) {
                    selectedActors.splice(selectedActors.indexOf(value), 1);
                  } else {
                    selectedActors.push(value);
                  }
                  setNewSerie({ ...newSerie, id_actores: selectedActors });
                }}
                mode="dropdown"
              >
                <Picker.Item label="Seleccione actores" value="" />
                {actors.map((actor) => (
                  <Picker.Item 
                    key={actor.id} 
                    label={`${actor.nombre_actor} ${actor.apellido_actor}`}
                    value={actor.id} 
                  />
                ))}
              </Picker>
              <View className="flex-row flex-wrap mt-2">
                {newSerie.id_actores.map((actorId) => {
                  const actor = actors.find(a => a.id === actorId);
                  return (
                    <View key={actorId} className="bg-white/20 p-2 rounded-xl mr-2 mb-2">
                      <Text className="text-white">{actor?.nombre_actor} {actor?.apellido_actor}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View className="bg-white/20 rounded-xl mb-4">
              <Picker
                selectedValue=""
                onValueChange={(value) => {
                  const selectedLanguages = [...newSerie.id_idiomas];
                  if (selectedLanguages.includes(value)) {
                    selectedLanguages.splice(selectedLanguages.indexOf(value), 1);
                  } else {
                    selectedLanguages.push(value);
                  }
                  setNewSerie({ ...newSerie, id_idiomas: selectedLanguages });
                }}
                mode="dropdown"
              >
                <Picker.Item label="Seleccione idiomas" value="" />
                {languages.map((language) => (
                  <Picker.Item 
                    key={language.id} 
                    label={language.nombre_idioma} 
                    value={language.id} 
                  />
                ))}
              </Picker>
              <View className="flex-row flex-wrap mt-2">
                {newSerie.id_idiomas.map((languageId) => {
                  const language = languages.find(l => l.id === languageId);
                  return (
                    <View key={languageId} className="bg-white/20 p-2 rounded-xl mr-2 mb-2">
                      <Text className="text-white">{language?.nombre_idioma}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {image && (
              <View className="items-center mt-2 mb-4">
                <Image
                  source={{ uri: image }}
                  style={{ width: 150, height: 150 }}
                  className="rounded-lg"
                />
                <Text className="mt-2 text-center text-white">{imageName}</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handlePickImage}
              className="flex-row items-center justify-center bg-white/20 rounded-xl p-4 mb-4"
            >
              <FontAwesome name="image" size={24} color="white" className="mr-2" />
              <Text className="text-white ml-2">
                {image ? 'Cambiar imagen' : 'Seleccionar imagen'}
              </Text>
            </TouchableOpacity>

            {error && (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-violet-600 to-blue-600 p-4 rounded-xl"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-bold text-lg">
                  Guardar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );
};

export default AddSerieModal;