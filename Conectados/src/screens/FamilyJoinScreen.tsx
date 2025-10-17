import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabaseClient";

export default function FamilyJoinScreen() {
  const navigation = useNavigation();
  const [codigoFamilia, setCodigoFamilia] = useState("");

  const handleJoin = async () => {
    if (!codigoFamilia.trim()) {
      Alert.alert("Código requerido", "Por favor ingresa un código de familia válido.");
      return;
    }

    try {
      // 1️⃣ Obtener usuario logueado
      const { data: auth } = await supabase.auth.getUser();
      const email = auth?.user?.email;
      if (!email) {
        Alert.alert("Error", "No se pudo obtener el usuario autenticado.");
        return;
      }

      // 2️⃣ Verificar que el código de familia exista
      const { data: familia, error: famError } = await supabase
        .from("familias")
        .select("codigo, nombre_adulto_mayor")
        .eq("codigo", codigoFamilia.trim())
        .maybeSingle();

      if (famError || !familia) {
        Alert.alert("Error", "No se encontró ninguna familia con ese código.");
        console.log("❌ Error buscando familia:", famError);
        return;
      }

      // 3️⃣ Actualizar el usuario para asignarlo a la familia
      const { error: updError } = await supabase
        .from("usuarios")
        .update({ codigo_familia: familia.codigo })
        .eq("correo", email);

      if (updError) {
        Alert.alert("Error", `No se pudo unir a la familia: ${updError.message}`);
        return;
      }

      Alert.alert(
        "✅ Te has unido a la familia",
        `Ahora perteneces a la familia de ${familia.nombre_adulto_mayor}.`,
        [
          {
            text: "Ir al panel",
            onPress: () => navigation.navigate("DashboardFamiliar" as never),
          },
        ]
      );
    } catch (err) {
      console.error("🚨 Error inesperado:", err);
      Alert.alert("Error inesperado", "Intenta nuevamente más tarde.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#4A9FD8" />
        </TouchableOpacity>

        <Image
          source={require("../../assets/logo-conectados.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Unirse a una Familia</Text>

        <TextInput
          placeholder="Código de familia"
          value={codigoFamilia}
          onChangeText={(t) => setCodigoFamilia(t.toUpperCase())}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleJoin}>
          <Text style={styles.buttonText}>Unirme</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: 6,
  },
  backButton: { position: "absolute", top: 20, left: 20, zIndex: 10 },
  logo: { width: 100, height: 100, alignSelf: "center", marginBottom: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E1E8ED",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 14,
    textAlign: "center",
    letterSpacing: 2,
  },
  button: {
    backgroundColor: "#00D98E",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
