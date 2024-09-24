import React, { useState } from "react";
import { View, Modal, Text, Pressable, Image } from "react-native";
import InputField from "./InputField";
import { FontAwesome } from "react-native-vector-icons";
import CalendarField from "./CalendarField";

const AddDirectorModal = ({
  visible,
  onClose,
  onSubmit,
  image,
  imageName,
  handlePickImage,
  newDirector,
  setNewDirector,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <View className="bg-white rounded-t-xl p-6">
          <Text className="text-primary text-lg font-bold mb-4">
            Agregar Director
          </Text>

          {/* Formulario */}
          <InputField
            placeholder="Nombre"
            onChangeText={(text) =>
              setNewDirector({ ...newDirector, nombre_director: text })
            }
            value={newDirector.nombre_director}
          />
          <InputField
            placeholder="Apellido"
            onChangeText={(text) =>
              setNewDirector({ ...newDirector, apellido_director: text })
            }
            value={newDirector.apellido_director}
          />
          <InputField
            placeholder="Nacionalidad"
            onChangeText={(text) =>
              setNewDirector({ ...newDirector, nacionalidad: text })
            }
            value={newDirector.nacionalidad}
          />
          <InputField
            placeholder="Fecha de Nacimiento (AAAA-MM-DD)"
            onChangeText={(text) =>
              setNewDirector({ ...newDirector, fecha_nacimiento: text })
            }
            value={newDirector.fecha_nacimiento}
          />

          {/* Mostrar imagen seleccionada o nombre del archivo */}
          {image ? (
            <View className="items-center mt-2">
              <Image
                source={{ uri: image }}
                className="w-24 h-24 rounded-lg" // Tamaño de la imagen con Tailwind
              />
              <Text className="mt-2 text-center">{imageName}</Text>
            </View>
          ) : (
            <Text className="text-center">
              No se ha seleccionado ninguna imagen
            </Text>
          )}

          {/* Botón para subir imagen */}
          <Pressable
            onPress={handlePickImage}
            className="flex-row items-center justify-center border border-gray-300 rounded-lg p-2 mt-2"
          >
            <FontAwesome name="image" size={24} />
            <Text className="ml-2">Subir imagen</Text>
          </Pressable>

          {/* Botones del Modal */}
          <View className="flex-row justify-between mt-4">
            <Pressable
              onPress={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              <Text className="text-black">Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={onSubmit}
              className="px-4 py-2 bg-primary rounded-lg"
            >
              <Text className="text-white">Agregar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddDirectorModal;
