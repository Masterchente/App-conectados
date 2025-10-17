// src/screens/ElderlyJoin.tsx
import { Alert } from "react-native";
import { supabase } from "../lib/supabaseClient";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ElderlyJoin() {
  const navigation = useNavigation();
  const [familyCode, setFamilyCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    const code = familyCode.trim().toUpperCase();
    if (!code) {
      Alert.alert("Código vacío", "Por favor ingresa un código válido.");
      return;
    }

    setLoading(true);
    const { data: familia, error } = await supabase
      .from("familias")
      .select("id, codigo, created_by")
      .eq("codigo", code)
      .single();
    setLoading(false);

    if (error || !familia) {
      Alert.alert("Código incorrecto", "No se encontró ninguna familia con ese código.");
      return;
    }

    Alert.alert(
      "✅ Conexión exitosa",
      "Código verificado correctamente.",
      [{ text: "Ir al panel", onPress: () => navigation.navigate("DashboardElderly" as never) }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <View style={styles.logoRow}>
          <Image
            source={require("../../assets/logo-conectados.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Conectados</Text>
        </View>

        <Text style={styles.title}>Unirse a una Familia</Text>

        <TextInput
          placeholder="Introduce el código de familia"
          value={familyCode}
          onChangeText={setFamilyCode}
          autoCapitalize="characters"
          maxLength={8}
          style={styles.textArea}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleJoin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verificando..." : "Unirme"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Regresar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    elevation: 6,
  },
  logoRow: { flexDirection: "row", alignItems: "center", marginBottom: 20, gap: 10 },
  logo: { width: 50, height: 50 },
  subtitle: { fontSize: 14, color: "#7F8C8D" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C3E50",
    marginBottom: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#E1E8ED",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 2,
  },
  button: {
    backgroundColor: "#00D98E",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  backText: { color: "#4A9FD8", textAlign: "center", fontSize: 14, marginTop: 10 },
});
