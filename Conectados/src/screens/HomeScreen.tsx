import { View, Text, Button } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types"; // 👈 corrige según tu carpeta real

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
   <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "green" }}>
  <Text style={{ color: "white" }}>Home Screen</Text>
</View>

  );
}
