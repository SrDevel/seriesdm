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
import { getData, getDataById, updateData, uploadImages } from "../../../lib/api";
import { pickImage } from "../../../utils/imagePicker";
import { FontAwesome } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarField from "../../..//components/CalendarField";
import CustomButton from "../../../components/CustomButton";

const EditDirector = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [newDirector, setNewDirector] = useState({
    nombre_director: "",
    apellido_director: "",
    nacionalidad: "",
    fecha_nacimiento: "",
    imagen: "",
  });


  useEffect(() => {
    const fetchDirector = async () => {
        console.log("id", id);
        
      const { data, error } = await getDataById("directores", id);
      if (data) {
        setDirector(data[0]);
        setNewDirector(data[0]);
        if (data[0].imagen) {
          setImage(data[0].imagen); // Asigna la imagen desde los datos
        }
      }
      setLoading(false);
    };

    fetchDirector();
  }, [id]);

  const handleSave = async () => {
    console.log("newDirector", newDirector);
    
    await updateData("directores", { ...newDirector, id });
    router.back();
  };

  const handlePickImage = async () => {
    const selectedImage = await pickImage();
    setImage(selectedImage);
    if (selectedImage) {
      const uploadedImage = await uploadImages(selectedImage);
      console.log("uploadedImage", uploadedImage);
      
      setNewDirector({ ...newDirector, imagen: uploadedImage });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <SafeAreaView className="p-4 flex-1">
      <StatusBar barStyle="dark-content" />
      <Text className="text-2xl mb-4 text-primary-500 font-semibold text-center">Editar director: { `${director.nombre_director} ${director.apellido_director}` }</Text>
      <TextInput
        placeholder="Nombre"
        value={newDirector.nombre_director}
        onChangeText={(text) =>
          setNewDirector({ ...newDirector, nombre_director: text })
        }
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Apellido"
        value={newDirector.apellido_director}
        onChangeText={(text) =>
          setNewDirector({ ...newDirector, apellido_director: text })
        }
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Nacionalidad"
        value={newDirector.nacionalidad}
        onChangeText={(text) =>
          setNewDirector({ ...newDirector, nacionalidad: text })
        }
        className="border p-2 mb-2"
      />
      <CalendarField 
        label={"Fecha de Nacimiento"}
        initialDate={newDirector.fecha_nacimiento}
        onDateChange={(date) =>
          setNewDirector({ ...newDirector, fecha_nacimiento: date })
        }
      />

      {/* Renderiza la imagen si existe */}
      {image ? (
        <View className="items-center mt-2">
          <Image
            source={{ uri: image }} // Usa la URI directamente
            style={{ width: 100, height: 100 }} // Especifica el tamaño
            className="rounded-lg"
          />
          <Text className="mt-2 text-center">Imagen del director</Text>
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

export default EditDirector;