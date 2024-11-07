// app/series/[id].jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDataById, insertData, getData } from '../../lib/api';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../../../components/CustomButton';

const StarRating = ({ rating, setRating }) => (
  <View className="flex-row justify-center my-4">
    {[1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => setRating(star)}>
        <FontAwesome
          name={rating >= star ? 'star' : 'star-o'}
          size={30}
          color="#FFD700"
          style={{ marginHorizontal: 5 }}
        />
      </TouchableOpacity>
    ))}
  </View>
);

const ReviewsList = ({ reviews, averageRating }) => (
  <View className="bg-indigo-900 rounded-lg p-4 mb-4">
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-bold text-lg">Reseñas</Text>
      <Text className="text-white">
        Calificación promedio: {averageRating.toFixed(1)} ⭐
      </Text>
    </View>
    
    <ScrollView className="max-h-60">
      {reviews.map((review) => (
        <View key={review.id} className="bg-indigo-800 rounded-lg p-3 mb-2">
          <View className="flex-row justify-between mb-1">
            <Text className="text-yellow-400">
              {'⭐'.repeat(review.puntuacion)}
            </Text>
            <Text className="text-gray-300 text-xs">
              {new Date(review.created_at).toLocaleDateString()}
            </Text>
          </View>
          <Text className="text-white">{review.resena}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

export default function SerieDetail() {
  const { id } = useLocalSearchParams();
  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [actor, setActor] = useState(null);
  const [director, setDirector] = useState(null);
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('Loading serie ID:', id);
      const { data: serieData } = await getDataById('series', id);
      const serie = serieData[0];
      console.log('Serie data:', serie);

      if (serie) {
        const { data: actorData } = await getDataById('actores', serie.id_actores);
        const { data: directorData } = await getDataById('directores', serie.id_directores);
        const { data: genreData } = await getDataById('generos', serie.id_generos);
        const { data: languageData } = await getDataById('idiomas', serie.id_idiomas);

        console.log({
          actor: actorData[0],
          director: directorData[0],
          genre: genreData[0],
          language: languageData[0]
        });

        setSerie(serie);
        setActor(actorData[0]);
        setDirector(directorData[0]);
        setGenre(genreData[0]);
        setLanguage(languageData[0]);
        
        // Load reviews and calculate average
        const { data: criticasData } = await getData('critica');
        const serieReviews = criticasData?.filter(c => c.id_series === parseInt(id)) || [];
        setReviews(serieReviews);
        
        if (serieReviews.length > 0) {
          const avg = serieReviews.reduce((sum, rev) => sum + rev.puntuacion, 0) / serieReviews.length;
          setAverageRating(Math.round(avg * 10) / 10);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    try {
      // Validate inputs
      if (!rating || rating < 1 || rating > 5) {
        setError('Por favor selecciona una calificación entre 1 y 5 estrellas');
        return;
      }

      if (!review.trim()) {
        setError('Por favor escribe una reseña');
        return;
      }

      const serieId = parseInt(id);
      if (!serieId) {
        setError('ID de serie inválido');
        return;
      }

      // Prepare data matching table schema
      const criticaData = {
        puntuacion: rating,
        resena: review.trim(),
        id_series: serieId
      };

      await insertData('critica', criticaData);

      // Reset form on success
      setRating(0);
      setReview('');
      setError(null);
    } catch (error) {
      setError(error.message || 'Error al enviar la reseña');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  // Add InfoSection component
  const InfoSection = () => (
    <View className="bg-indigo-900 rounded-lg p-4 mb-4">
      <Text className="text-white font-bold text-lg mb-4">Información</Text>
      
      {/* Actor Info */}
      <View className="mb-4">
        <Text className="text-white font-bold mb-2">Actor Principal</Text>
        <Text className="text-white">Nombre: {actor?.nombre_actor} {actor?.apellido_actor}</Text>
        <Text className="text-white">Nacionalidad: {actor?.nacionalidad}</Text>
        <Text className="text-white">
          Fecha de nacimiento: {actor?.fecha_nacimiento ? new Date(actor.fecha_nacimiento).toLocaleDateString() : 'No disponible'}
        </Text>
      </View>

      {/* Director Info */}
      <View className="mb-4">
        <Text className="text-white font-bold mb-2">Director</Text>
        <Text className="text-white">Nombre: {director?.nombre_director} {director?.apellido_director}</Text>
        <Text className="text-white">Nacionalidad: {director?.nacionalidad}</Text>
        <Text className="text-white">
          Fecha de nacimiento: {director?.fecha_nacimiento ? new Date(director.fecha_nacimiento).toLocaleDateString() : 'No disponible'}
        </Text>
      </View>

      {/* Genre and Language */}
      <View>
        <Text className="text-white font-bold mb-2">Detalles</Text>
        <Text className="text-white">Género: {genre?.Nombre}</Text>
        <Text className="text-white">Idioma: {language?.nombre_idioma} ({language?.iso_code})</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-indigo-950">
      <Stack.Screen 
        options={{
          title: serie?.titulo || 'Detalle de Serie',
          headerStyle: { backgroundColor: '#1e1b4b' },
          headerTintColor: '#fff'
        }}
      />
      
      <ScrollView className="flex-1 p-4">
        {/* Serie Image */}
        {serie?.imagen && (
          <Image
            source={{ uri: serie.imagen }}
            className="w-full h-72 rounded-lg mb-4"
            style={{ resizeMode: 'cover' }}
          />
        )}
        
        {/* Info Section */}
        <InfoSection />
        
        {/* Reviews Section */}
        <ReviewsList reviews={reviews} averageRating={averageRating} />
        
        {/* Review Form */}
        <View className="bg-indigo-900 rounded-lg p-4">
          <Text className="text-white font-bold text-lg mb-2">Agregar Reseña</Text>
          <StarRating rating={rating} setRating={setRating} />
          <TextInput
            placeholder="Escribe tu reseña..."
            value={review}
            onChangeText={setReview}
            multiline
            numberOfLines={4}
            className="bg-white p-2 rounded-lg mb-4"
          />
          {error && <Text className="text-red-500 mb-2">{error}</Text>}
          <CustomButton
            text="Enviar Reseña"
            onPress={handleSubmitReview}
            style="bg-primary p-2"
            textStyles="text-white text-center"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}