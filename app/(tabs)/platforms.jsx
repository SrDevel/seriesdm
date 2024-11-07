import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Card from "../../components/Card";
import { getData, insertData, uploadImages, deleteData } from "../lib/api";
import { FontAwesome } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AddPlatformModal from "../../components/AddPlatformModal";
import { pickImage } from "../../utils/imagePicker";
import { useRouter } from "expo-router";
import ConfirmationModal from "../../components/ConfirmationModal";

const Platforms = () => {
  const [plataform, setPlataform] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [newPlatform, setNewPlatform] = useState({
    nombre_plataforma: "",
  });
  const [platformToDelete, setPlatformToDelete] = useState(null);
  const router = useRouter();

  const handleEditPlatform = (id) => {
    router.push(`/edit/platforms/${id}`);
  };

  useEffect(() => {
    const fetchPlatforms = async () => {
      const { data, error } = await getData("plataformas");
      if (error) {
        console.error("Error en getData:", error);
      } else {
        setPlataform(data);
      }
      setLoading(false);
    };

    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    setLoading(true);
    const { data, error } = await getData("plataformas");
    if (!error) {
      setPlataform(data);
    }
    setLoading(false);
  };

  const handleAddPlatform = async () => {
    if (!newPlatform.nombre_plataforma) {
      return alert("Por favor, llena todos los campos");
    }

    let imageUri = null;

    if (image) {
      imageUri = await uploadImages(image);
      if (!imageUri) return alert("Error subiendo la imagen");
    }

    const platformData = { ...newPlatform, imagen: imageUri || null };

    setLoading(true);
    await insertData("plataformas", platformData);
    await fetchPlatforms();
    setModalVisible(false);
    setLoading(false);
    setNewPlatform({
      nombre_plataforma: "",
    });
    setImage(null); // Limpiar imagen seleccionada
  };

  const handlePickImage = async () => {
    const result = await pickImage();
    if (result) {
      setImage(result);
      setImageName(result.split("/").pop());
    }
  };

  const handleDeletePlatform = async (id) => {
    setPlatformToDelete(id);
    setDeleteModalVisible(true);
  };

  const confirmDeletePlatform = async () => {
    setLoading(true);
    await deleteData("plataformas", platformToDelete);
    await fetchPlatforms();
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
          {plataform.length > 0 ? (
            <FlatList
              data={plataform}
              className="w-11/12 mx-auto mt-2"
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card
                  image={item.imagen}
                  onLongPress={() => handleDeletePlatform(item.id)}
                  icon={!item.imagen && <FontAwesome name="user" size={64} />}
                  title={`${item.nombre_plataforma}`}
                  onPress={() => {
                    handleEditPlatform(item.id);
                  }} // Navegar a editar
                  style="mb-2 w-11/12 mx-auto mt-2"
                />
              )}
            />
          ) : (
            <Text className="text-white text-center">No hay plataformas</Text>
          )}
        </View>
      </LinearGradient>

      <CustomButton
        title="Agregar plataformas"
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
        onConfirm={confirmDeletePlatform}
        title="Eliminar plataforma"
        description="¿Estás seguro de eliminar esta plataforma?"
      />

      {/* Llamar al modal aquí */}
      <AddPlatformModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddPlatform}
        image={image}
        imageName={imageName}
        handlePickImage={handlePickImage}
        newPlatform={newPlatform}
        setNewPlatform={setNewPlatform}
      />
    </SafeAreaView>
  );
};

export default Platforms;