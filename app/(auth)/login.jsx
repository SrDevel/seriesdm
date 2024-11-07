import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (!error) {
      const { data: profile } = await supabase
        .from('perfiles')
        .select('es_admin')
        .eq('id', data.user.id)
        .single();
      
        console.log(profile);
        
      // Redirect based on admin status
      if (profile?.es_admin) { // Check boolean instead of role string
        router.replace('/actors');
      } else {
        router.replace('(series)/series');
      }
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
            SeriesDM
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
            className="bg-white/20 p-4 rounded-xl mb-6 text-white"
            placeholder="Contraseña"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity
            className="bg-gradient-to-r from-violet-600 to-blue-600 p-4 rounded-xl mb-4"
            onPress={handleLogin}
          >
            <Text className="text-white text-center font-bold text-lg">
              Iniciar Sesión
            </Text>
          </TouchableOpacity>

          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text className="text-white/90 text-center">
                ¿No tienes una cuenta? 
                <Text className="font-bold text-blue-400"> Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}