import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Card from "../../components/Card";
import { getData, insertData, deleteData } from "../../lib/api";
import { FontAwesome } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AddLanguageModal from "../../components/AddLanguageModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useRouter } from "expo-router";

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [newLanguage, setNewLanguage] = useState({
    nombre_idioma: "",
    iso_code: "",
  });
  const [languageToDelete, setLanguageToDelete] = useState(null);
  const router = useRouter();

  // Función para navegar a editar idioma
  const handleEditLanguage = (id) => {
    router.push(`/edit/languages/${id}`);
  };

  // Función para obtener los datos de los idiomas
  const fetchLanguages = async () => {
    setLoading(true);
    const { data, error } = await getData("idiomas");
    if (!error) {
      setLanguages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleAddLanguage = async () => {
    if (!newLanguage.nombre_idioma || !newLanguage.iso_code) {
      return alert("Por favor, llena todos los campos");
    }

    setLoading(true);
    await insertData("idiomas", newLanguage);
    await fetchLanguages();
    setModalVisible(false);
    setLoading(false);
    setNewLanguage({
      nombre_idioma: "",
      iso_code: "",
    });
  };

  const handleDeleteLanguage = async (id) => {
    setLanguageToDelete(id);
    setDeleteModalVisible(true);
  };

  const confirmDeleteLanguage = async () => {
    setLoading(true);
    await deleteData("idiomas", languageToDelete);
    await fetchLanguages();
    setDeleteModalVisible(false);
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
          {languages.length > 0 ? (
            <FlatList
              data={languages}
              className="w-11/12 mx-auto mt-2"
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card
                  image={item.imagen}
                  onLongPress={() => handleDeleteLanguage(item.id)}
                  icon={!item.imagen && <FontAwesome name="language" size={64} />}
                  title={`${item.nombre_idioma} (${item.iso_code})`}
                  onPress={() => {
                    handleEditLanguage(item.id);
                  }} // Navegar a editar
                  style="mb-2 w-11/12 mx-auto mt-2"
                />
              )}
            />
          ) : (
            <Text className="text-white text-center">No hay idiomas</Text>
          )}
        </View>
      </LinearGradient>

      <CustomButton
        title="Agregar idioma"
        isCircular={true}
        onPress={() => setModalVisible(true)}
        style="absolute bottom-10 right-10 rounded-full bg-primary"
        iconName={
          <FontAwesome
            name="plus"
            size={24}
            className="text-white text-center"
          />
        }
      />

      <ConfirmationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDeleteLanguage}
        title="Eliminar idioma"
        description="¿Estás seguro de eliminar este idioma?"
      />

      {/* Llamar al modal aquí */}
      <AddLanguageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddLanguage}
        newLanguage={newLanguage}
        setNewLanguage={setNewLanguage}
      />
    </SafeAreaView>
  );
};

export default Languages;