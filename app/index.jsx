import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <SafeAreaView className="h-full">
      <StatusBar style="light" backgroundColor="#2a154a" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={["#2a154a", "#46237a", "#8a5bcf"]}
          style={{ flex: 1 }}
          linearGradientProps={{
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
          }}
        >
          <View className="flex justify-center items-center h-full bg-transparent">
            <BlurView
              className="p-6 rounded-2xl bg-white/10 overflow-hidden"
              intensity={90}
            >
              <Text className="text-black text-5xl font-bold text-center mt-10">
                Bienvenido a
              </Text>
              <Text className="text-zinc-50 text-5xl pt-2 font-bold">
                SeriesDM
              </Text>
              <CustomButton
                text="Ingresar"
                onPress={() => router.push("/actors")}
                className="mt-10"
              />
            </BlurView>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}
