import React, { useState } from 'react';
import { View, Modal, Text, Pressable, Image } from 'react-native';
import InputField from './InputField';
import { FontAwesome } from 'react-native-vector-icons';

const AddActorModal = ({
  visible,
  onClose,
  onSubmit,
  image,
  imageName,
  handlePickImage,
  newActor,
  setNewActor,
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
            Agregar Actor
          </Text>

          {/* Formulario */}
          <InputField
            placeholder="Nombre"
            onChangeText={(text) =>
              setNewActor({ ...newActor, nombre_actor: text })
            }
            value={newActor.nombre_actor}
          />
          <InputField
            placeholder="Apellido"
            onChangeText={(text) =>
              setNewActor({ ...newActor, apellido_actor: text })
            }
            value={newActor.apellido_actor}
          />
          <InputField
            placeholder="Nacionalidad"
            onChangeText={(text) =>
              setNewActor({ ...newActor, nacionalidad: text })
            }
            value={newActor.nacionalidad}
          />
          <InputField
            placeholder="Fecha de Nacimiento (AAAA-MM-DD)"
            onChangeText={(text) =>
              setNewActor({ ...newActor, fecha_nacimiento: text })
            }
            value={newActor.fecha_nacimiento}
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
            <Text className="text-center">No se ha seleccionado ninguna imagen</Text>
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

export default AddActorModal;
