import { View, Text, Button } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types"; // 👈 corrige según tu carpeta real

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-secondary">
      <Text className="text-2xl font-bold text-primary mb-4">
        Pantalla Perfil
      </Text>
      <Button title="Volver a Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
