import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Card from "../../components/Card";
import { getData, insertData, deleteData } from "../lib/api";
import { FontAwesome } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AddGenreModal from "../../components/AddGenreModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useRouter } from "expo-router";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [newGenre, setNewGenre] = useState({
    nombre_genero: "",
  });
  const [genreToDelete, setGenreToDelete] = useState(null);
  const router = useRouter();

  // Función para navegar a editar genero
  const handleEditGenre = (id) => {
    router.push(`/edit/genres/${id}`);
  };

  // Función para obtener los datos de los generos
  const fetchGenres = async () => {
    setLoading(true);
    const { data, error } = await getData("genres");
    if (!error) {
      setGenres(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleAddGenre = async () => {
    if (!newGenre.nombre_genero) {
      return alert("Por favor, llena todos los campos");
    }

    setLoading(true);
    await insertData("genres", newGenre);
    await fetchGenres();
    setModalVisible(false);
    setLoading(false);
    setNewGenre({
      nombre_genero: "",
    });
  };

  const handleDeleteGenre = async (id) => {
    setGenreToDelete(id);
    setDeleteModalVisible(true);
  };

  const confirmDeleteGenre = async () => {
    setLoading(true);
    await deleteData("genres", genreToDelete);
    await fetchGenres();
    setDeleteModalVisible(false);
    setLoading(false);
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ExpoStatusBar style="light" />
      <LinearGradient
        colors={["#2a154a", "#46237a", "#8a5bcf"]}
        style={{ flex: 1 }}
        linearGradientProps={{
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 },
        }}
      >
        <View className="mt-2 flex-1">
          {genres.length > 0 ? (
            <FlatList
              data={genres}
              className="w-11/12 mx-auto mt-2"
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card
                  image={item.imagen}
                  onLongPress={() => handleDeleteGenre(item.id)}
                  icon={!item.imagen && <FontAwesome name="genre" size={64} />}
                  title={`${item.nombre_genero}`}
                  onPress={() => {
                    handleEditGenre(item.id);
                  }} // Navegar a editar
                  style="mb-2 w-11/12 mx-auto mt-2"
                />
              )}
            />
          ) : (
            <Text className="text-white text-center">No hay géneros</Text>
          )}
        </View>
      </LinearGradient>

      <CustomButton
        title="Agregar genero"
        isCircular={true}
        onPress={() => setModalVisible(true)}
        style="absolute bottom-10 right-10 rounded-full bg-primary"
        iconName={
          <FontAwesome
            name="plus"
            size={24}
            className="text-white text-center"
          />
        }
      />

      <ConfirmationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDeleteGenre}
        title="Eliminar genero"
        description="¿Estás seguro de eliminar este género?"
      />

      {/* Llamar al modal aquí */}
      <AddGenreModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddGenre}
        newGenre={newGenre}
        setNewGenre={setNewGenre}
      />
    </SafeAreaView>
  );
};

export default Genres;