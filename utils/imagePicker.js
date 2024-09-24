import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const pickImage = async () => {
    // Verificar permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requiere permiso para acceder a la biblioteca de imágenes.');
        return null;
    }

    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log('Resultado de la selección de imagen:', result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            console.log('Imagen seleccionada:', uri);
            return uri;
        } else {
            console.log('Selección de imagen cancelada');
        }
    } catch (error) {
        console.error('Error en pickImage:', error);
    }
    return null;
};