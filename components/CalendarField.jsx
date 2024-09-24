import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from './CustomButton'; // Importamos el botón personalizado

const CalendarField = ({ label, onDateChange, initialDate }) => {
  const [date, setDate] = useState(initialDate ? new Date(initialDate) : null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Actualiza la fecha cuando cambia initialDate (por ejemplo, al cargar datos)
    if (initialDate) {
      setDate(new Date(initialDate));
    }
  }, [initialDate]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);

    // Validamos que la fecha no sea futura
    if (currentDate && currentDate <= new Date()) {
      setDate(currentDate);
      if (onDateChange) {
        onDateChange(currentDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
      }
    } else {
      Alert.alert("Fecha inválida", "No puedes seleccionar una fecha futura.");
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = (date) => {
    if (!date) return "Selecciona la fecha";
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
  };

  return (
    <View className="my-4 px-5">
      {label && <Text className="mb-2 text-lg font-bold text-gray-800">{label}</Text>}
      <CustomButton
        text={formatDate(date)}
        onPress={showDatepicker}
        style="bg-primary"
        textStyles="text-white"
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

export default CalendarField;
