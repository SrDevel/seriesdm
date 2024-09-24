import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

const ConfirmationModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      {/* Fondo negro con transparencia */}
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-10/12">
          <Text className="text-lg font-bold text-center mb-4">
            ¿Estás seguro de que deseas eliminar este actor?
          </Text>
          <View className="flex-row justify-around">
            <Pressable
              onPress={onCancel}
              className="bg-gray-300 p-3 rounded-lg w-1/3"
            >
              <Text className="text-center text-black">Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              className="bg-red-500 p-3 rounded-lg w-1/3"
            >
              <Text className="text-center text-white">Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
