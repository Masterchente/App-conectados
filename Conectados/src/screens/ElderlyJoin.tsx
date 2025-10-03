// src/screens/ElderlyJoin.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ElderlyJoin() {
  const navigation = useNavigation();
  const [familyCode, setFamilyCode] = useState("");

  const handleJoin = () => {
    // Aquí puedes manejar la lógica de unión con código de familia
    navigation.navigate("Dashboard" as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoRow}>
          <Image
            source={require("../../assets/logo-conectados.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Conectados</Text>
        </View>

        {/* Título */}
        <Text style={styles.title}>Unirse</Text>

        {/* Input del código */}
        <TextInput
          placeholder="Introduce el código de la familia"
          value={familyCode}
          onChangeText={setFamilyCode}
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        {/* Botón */}
        <TouchableOpacity style={styles.button} onPress={handleJoin}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  subtitle: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C3E50",
    marginBottom: 30,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#E1E8ED",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00D98E",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
