import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  TextInput,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
  StatusBar,
} from "react-native";
import { getDataById, updateData, uploadImages } from "../../../lib/api";
import { pickImage } from "../../../utils/imagePicker";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../components/CustomButton";

const EditPlatform = () => {
  const { id } = useLocalSearchParams(); // Obtener el ID dinámico de la URL
  const router = useRouter();
  const [platform, setPlatform] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [newPlatform, setNewPlatform] = useState({
    nombre_plataforma: "",
    descripcion: "",
    imagen: "",
  });

  useEffect(() => {
    const fetchPlatform = async () => {
      const { data, error } = await getDataById("plataformas", id);
      if (data) {
        setPlatform(data[0]);
        setNewPlatform(data[0]);
        if (data[0].imagen) {
          setImage(data[0].imagen); // Asigna la imagen desde los datos
        }
      }
      setLoading(false);
    };

    fetchPlatform();
  }, [id]);

  const handleSave = async () => {
    await updateData("plataformas", { ...newPlatform, id });
    router.back(); // Regresar a la vista anterior
  };

  const handlePickImage = async () => {
    const selectedImage = await pickImage();
    setImage(selectedImage);
    if (selectedImage) {
      const uploadedImage = await uploadImages(selectedImage);
      setNewPlatform({ ...newPlatform, imagen: uploadedImage });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <SafeAreaView className="p-4 flex-1">
      <StatusBar barStyle="dark-content" />
      <Text className="text-2xl mb-4 text-primary-500 font-semibold text-center">
        Editar Plataforma: {platform.nombre_plataforma}
      </Text>
      <TextInput
        placeholder="Nombre de la Plataforma"
        value={newPlatform.nombre_plataforma}
        onChangeText={(text) =>
          setNewPlatform({ ...newPlatform, nombre_plataforma: text })
        }
        className="border p-2 mb-2"
      />

      {image ? (
        <View className="items-center mt-2">
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100 }}
            className="rounded-lg"
          />
          <Text className="mt-2 text-center">Imagen de la Plataforma</Text>
        </View>
      ) : (
        <Text className="text-center">No se ha seleccionado ninguna imagen</Text>
      )}

      <Pressable
        onPress={handlePickImage}
        className="flex-row items-center justify-center border border-gray-300 rounded-lg p-2 mt-2 bottom-2"
      >
        <Text className="ml-2">Subir imagen</Text>
      </Pressable>

      <CustomButton
        text={"Guardar Cambios"}
        onPress={handleSave}
        style="bg-primary p-2 px-2"
        textStyles="text-white"
      />
    </SafeAreaView>
  );
};

export default EditPlatform;
