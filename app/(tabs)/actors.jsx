import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Card from "../../components/Card";
import { getData, insertData, uploadImages, deleteData } from "../../lib/api";
import { FontAwesome } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AddActorModal from "../../components/AddActorModal";
import { pickImage } from "../../utils/imagePicker";
import { useRouter } from "expo-router";
import ConfirmationModal from "../../components/ConfirmationModal";

const Actors = () => {
  const [actor, setActor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [newActor, setNewActor] = useState({
    nombre_actor: "",
    apellido_actor: "",
    nacionalidad: "",
    fecha_nacimiento: "",
  });
  const router = useRouter(); // Hook para manejar la navegación
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedActorId, setSelectedActorId] = useState(null);

  const handleEditActor = (id) => {
    router.push(`/edit/${id}`);
  };

  useEffect(() => {
    const fetchActors = async () => {
      const { data, error } = await getData("actores");
      if (error) {
        console.error("Error en getData:", error);
      } else {
        setActor(data);
      }
      setLoading(false);
    };

    fetchActors();
  }, []);

  const fetchActors = async () => {
    setLoading(true);
    const { data, error } = await getData("actores");
    if (!error) {
      setActor(data);
    }
    setLoading(false);
  };

  const handleAddActor = async () => {
    if (
      !newActor.nombre_actor ||
      !newActor.apellido_actor ||
      !newActor.nacionalidad ||
      !newActor.fecha_nacimiento
    ) {
      return alert("Por favor, llena todos los campos");
    }

    let imageUri = null;

    if (image) {
      imageUri = await uploadImages(image);
      if (!imageUri) return alert("Error subiendo la imagen");
    }

    const actorData = { ...newActor, imagen: imageUri || null };

    setLoading(true);
    await insertData("actores", actorData);
    await fetchActors();
    setModalVisible(false);
    setLoading(false);
    setNewActor({
      nombre_actor: "",
      apellido_actor: "",
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

  const handleDeleteActor = async (id) => {
    setSelectedActorId(id);
    setConfirmVisible(true);
  };
  
  const confirmDelete = async () => {
    setConfirmVisible(false);
    setLoading(true);
    await deleteData("actores", selectedActorId);
    await fetchActors();
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
          {actor.length > 0 ? (
            <FlatList
              data={actor}
              className="w-11/12 mx-auto mt-2"
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card
                  onLongPress={() => handleDeleteActor(item.id)} // Aquí llamas a la función que activa el modal
                  image={item.imagen}
                  icon={!item.imagen && <FontAwesome name="user" size={64} />}
                  title={`${item.nombre_actor} ${item.apellido_actor}`}
                  onPress={() => {
                    handleEditActor(item.id);
                  }}
                  text={`Es un actor ${item.nacionalidad}, nació en el año ${
                    item.fecha_nacimiento.split("-")[0]
                  }`}
                  style="mb-2 w-11/12 mx-auto mt-2"
                />
              )}
            />
          ) : (
            <Text className="text-white text-center">No hay actores</Text>
          )}
        </View>
      </LinearGradient>
  
      <CustomButton
        title="Agregar actor"
        isCircular={true}
        onPress={() => setModalVisible(true)}
        style="absolute bottom-10 right-10 rounded-full bg-primary"
        iconName={
          <FontAwesome name="plus" size={24} className="text-white text-center" />
        }
      />
  
      {/* Aquí es donde se coloca el ConfirmationModal */}
      <ConfirmationModal
        visible={confirmVisible}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmVisible(false)}
      />
  
      {/* Llamar al modal para agregar actor */}
      <AddActorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddActor}
        image={image}
        imageName={imageName}
        handlePickImage={handlePickImage}
        newActor={newActor}
        setNewActor={setNewActor}
      />
    </SafeAreaView>
  );
};

export default Actors;
