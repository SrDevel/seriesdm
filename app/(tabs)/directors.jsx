import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Card from "../../components/Card";
import { getData, insertData, uploadImages } from "../lib/api";
import { FontAwesome } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AddDirectorModal from "../../components/AddDirectorModal";
import { pickImage } from "../../utils/imagePicker";
import { useRouter } from "expo-router";

const Directors = () => {
  const [director, setDirector] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [newDirector, setNewDirector] = useState({
    nombre_director: "",
    apellido_director: "",
    nacionalidad: "",
    fecha_nacimiento: "",
  });
  const router = useRouter(); // Hook para manejar la navegación

  const handleEditDirector = (id) => {
    router.push(`/edit/directors/${id}`);
  };

  useEffect(() => {
    const fetchDirectors = async () => {
      const { data, error } = await getData("directores");
      if (error) {
        console.error("Error en getData:", error);
      } else {
        setDirector(data);
      }
      setLoading(false);
    };

    fetchDirectors();
  }, []);

  const fetchDirectors = async () => {
    setLoading(true);
    const { data, error } = await getData("directores");
    if (!error) {
      setDirector(data);
    }
    setLoading(false);
  };

  const handleAddDirector = async () => {
    console.log(newDirector.fecha_nacimiento);
    
    if (
      !newDirector.nombre_director ||
      !newDirector.apellido_director ||
      !newDirector.nacionalidad
    ) {
      return alert("Por favor, llena todos los campos");
    }

    let imageUri = null;

    if (image) {
      imageUri = await uploadImages(image);
      if (!imageUri) return alert("Error subiendo la imagen");
    }

    const directorData = { ...newDirector, imagen: imageUri || null };

    setLoading(true);
    await insertData("directores", directorData);
    await fetchDirectors();
    setModalVisible(false);
    setLoading(false);
    setNewDirector({
      nombre_director: "",
      apellido_director: "",
      nacionalidad: "",
      fecha_nacimiento: "",
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
          {director.length > 0 ? (
            <FlatList
              data={director}
              className="w-11/12 mx-auto mt-2"
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card
                  image={item.imagen}
                  icon={!item.imagen && <FontAwesome name="user" size={64} />}
                  title={`${item.nombre_director} ${item.apellido_director}`}
                  onPress={() => {
                    handleEditDirector(item.id)
                  }} // Navegar a editar
                  text={`Es un director ${item.nacionalidad}, nació en el año ${
                    item.fecha_nacimiento.split("-")[0]
                  }`}
                  style="mb-2 w-11/12 mx-auto mt-2"
                />
              )}
            />
          ) : (
            <Text className="text-white text-center">No hay Directores</Text>
          )}
        </View>
      </LinearGradient>

      <CustomButton
        title="Agregar director"
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

      {/* Llamar al modal aquí */}
      <AddDirectorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddDirector}
        image={image}
        imageName={imageName}
        handlePickImage={handlePickImage}
        newDirector={newDirector}
        setNewDirector={setNewDirector}
      />
    </SafeAreaView>
  );
};

export default Directors;
