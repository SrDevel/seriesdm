import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            es_admin: false
          }
        }
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert('Revisa tu email para verificar tu cuenta');
      router.replace('/(auth)/login');
      
    } catch (error) {
      console.error('Error en registro:', error.message);
      alert('Error al registrar usuario');
    }
  };

  return (
    <LinearGradient
      colors={['#1e1b4b', '#1e40af', '#000']}
      className="flex-1"
    >
      <View className="flex-1 justify-center p-6">
        <View className="bg-white/10 p-8 rounded-3xl border border-white/20">
          <Text className="text-4xl font-bold text-white text-center mb-8">
            Registro
          </Text>
          
          <TextInput
            className="bg-white/20 p-4 rounded-xl mb-4 text-white"
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          
          <TextInput
            className="bg-white/20 p-4 rounded-xl mb-4 text-white"
            placeholder="Contraseña"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            className="bg-white/20 p-4 rounded-xl mb-6 text-white"
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#94a3b8"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          <TouchableOpacity
            className="bg-gradient-to-r from-violet-600 to-blue-600 p-4 rounded-xl mb-4"
            onPress={handleRegister}
          >
            <Text className="text-white text-center font-bold text-lg">
              Registrarse
            </Text>
          </TouchableOpacity>

          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className="text-white/90 text-center">
                ¿Ya tienes una cuenta? 
                <Text className="font-bold text-blue-400"> Inicia Sesión</Text>
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}