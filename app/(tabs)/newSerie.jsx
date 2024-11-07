import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import AddSerieModal from '../../components/addSerieModal';
import { pickImage } from "../../utils/imagePicker";

const NewSerie = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const handlePickImage = async () => {
    const imageUri = await pickImage();
    if (imageUri) {
      setImage(imageUri);
      setImageName(imageUri.split('/').pop());
    }
  };

  const handleSubmit = (serieData) => {
    console.log('Nueva serie:', { ...serieData, image });
    setModalVisible(false);
  };

  return (
    <View className="flex-1 p-4">
      <Pressable
        onPress={() => setModalVisible(true)}
        className="bg-primary p-4 rounded-lg"
      >
        <Text className="text-white text-center">Agregar Nueva Serie</Text>
      </Pressable>

      <AddSerieModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        image={image}
        imageName={imageName}
        handlePickImage={handlePickImage}
      />
    </View>
  );
};

export default NewSerie;