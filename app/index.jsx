import { Redirect } from 'expo-router';
import { useAuth } from './contexts/AuthContext';

export default function Index() {
  const { usuario, cargando } = useAuth();
  
  if (cargando) return null;
  
  if (!usuario) {
    return <Redirect href="/(auth)/login" />;
  }
  
  return <Redirect href={usuario.es_admin ? '/(tabs)/actors' : '/series/series'} />;
}