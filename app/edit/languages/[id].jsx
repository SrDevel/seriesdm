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
import { getDataById, updateData, uploadImages } from "../../lib/api";
import { pickImage } from "../../../utils/imagePicker";
import { FontAwesome } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../components/CustomButton";

const EditLanguage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [newLanguage, setNewLanguage] = useState({
    nombre_idioma: "",
    iso_code: "",
    imagen: "",
  });

  useEffect(() => {
    const fetchLanguage = async () => {
      console.log("id", id);
      
      const { data, error } = await getDataById("idiomas", id);
      if (data) {
        setLanguage(data[0]);
        setNewLanguage(data[0]);
        if (data[0].imagen) {
          setImage(data[0].imagen); // Asigna la imagen desde los datos
        }
      }
      setLoading(false);
    };

    fetchLanguage();
  }, [id]);

  const handleSave = async () => {
    console.log("newLanguage", newLanguage);
    
    await updateData("idiomas", { ...newLanguage, id });
    router.back();
  };

  const handlePickImage = async () => {
    const selectedImage = await pickImage();
    setImage(selectedImage);
    if (selectedImage) {
      const uploadedImage = await uploadImages(selectedImage);
      console.log("uploadedImage", uploadedImage);
      
      setNewLanguage({ ...newLanguage, imagen: uploadedImage });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <SafeAreaView className="p-4 flex-1">
      <StatusBar barStyle="dark-content" />
      <Text className="text-2xl mb-4 text-primary-500 font-semibold text-center">Editar Idioma: { `${language.nombre_idioma} (${language.iso_code})` }</Text>
      <TextInput
        placeholder="Nombre del Idioma"
        value={newLanguage.nombre_idioma}
        onChangeText={(text) =>
          setNewLanguage({ ...newLanguage, nombre_idioma: text })
        }
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Código ISO"
        value={newLanguage.iso_code}
        onChangeText={(text) =>
          setNewLanguage({ ...newLanguage, iso_code: text })
        }
        className="border p-2 mb-2"
      />

      {/* Renderiza la imagen si existe */}
      {image ? (
        <View className="items-center mt-2">
          <Image
            source={{ uri: image }} // Usa la URI directamente
            style={{ width: 100, height: 100 }} // Especifica el tamaño
            className="rounded-lg"
          />
          <Text className="mt-2 text-center">Imagen del Idioma</Text>
        </View>
      ) : (
        <Text className="text-center">No se ha seleccionado ninguna imagen</Text>
      )}

      {/* Botón para subir imagen */}
      <Pressable
        onPress={handlePickImage}
        className="flex-row items-center justify-center border border-gray-300 rounded-lg p-2 mt-2 bottom-2"
      >
        <FontAwesome name="image" size={24} />
        <Text className="ml-2">Subir imagen</Text>
      </Pressable>

      <CustomButton text={"Guardar Cambios"} onPress={handleSave} style="bg-primary p-2 px-2" textStyles="text-white" />
    </SafeAreaView>
  );
};

export default EditLanguage;