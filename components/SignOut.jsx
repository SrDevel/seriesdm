import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../app/lib/supabase';
import { Link, useNavigation } from 'expo-router';
import { router } from 'expo-router';

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Use router.replace() to navigate
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <Pressable 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent',
            zIndex: 999,
          }}
          onPress={() => setIsOpen(false)}
        />
      )}
      
      <View style={{ 
        position: 'absolute', 
        top: 40, 
        right: 20, 
        zIndex: 1000 
      }}>
        <TouchableOpacity 
          onPress={toggleDropdown}
          style={{ 
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: '#f0f0f0',
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Ionicons name="person-circle-outline" size={32} color="#666" />
        </TouchableOpacity>

        {isOpen && (
          <View style={{ 
            position: 'absolute',
            right: 0,
            top: 50,
            width: 200,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 10,
            zIndex: 1000,
            padding: 8,
          }}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Profile')}
              style={{ 
                padding: 12,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 16 }}>Editar perfil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => navigation.navigate('Settings')}
              style={{ 
                padding: 12,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <Ionicons name="settings-outline" size={20} color="#666" style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 16 }}>Configuración</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleSignOut}
              style={{ 
                padding: 12,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
                marginTop: 4,
                borderTopWidth: 1,
                borderTopColor: '#eee',
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#dc2626" style={{ marginRight: 8 }} />
              <Text style={{ color: '#dc2626', fontSize: 16 }}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

export default AccountMenu;