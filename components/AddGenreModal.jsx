import React from 'react';
import { View, Modal, Text, Pressable } from 'react-native';
import InputField from './InputField';

const AddGenreModal = ({
  visible,
  onClose,
  onSubmit,
  newGenre,
  setNewGenre,
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
            Agregar Genero
          </Text>

          {/* Formulario para el nombre del genero */}
          <InputField
            placeholder="Género"
            onChangeText={(text) =>
              setNewGenre({ ...newGenre, nombre_genero: text })
            }
            value={newGenre.nombre_genero}
          />

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

export default AddGenreModal;