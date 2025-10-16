// src/screens/RegisterElderlyScreen.tsx
import { supabase } from "../lib/supabaseClient";
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

export default function RegisterElderlyScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    telefono: "",
    direccion: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

const handleRegister = async () => {
  if (!formData.nombre || !formData.password) {
    Alert.alert("Campos incompletos", "Por favor llena todos los campos obligatorios.");
    return;
  }

  // Aquí pide el código de familia
  Alert.prompt(
    "Código Familiar",
    "Introduce el código que te dio tu familiar:",
    async (codigo) => {
      const { data: familia, error } = await supabase
        .from("familias")
        .select("*")
        .eq("codigo", codigo)
        .single();

      if (error || !familia) {
        Alert.alert("Código inválido", "Verifica el código familiar.");
        return;
      }

      // Crea usuario anónimo (sin email)
      const { data: anonUser, error: anonError } = await supabase.auth.signUp({
        email: `${formData.nombre.replace(/\s+/g, "")}@adulto.com`,
        password: formData.password,
      });

      if (anonError) {
        Alert.alert("Error", anonError.message);
        return;
      }

      await supabase.from("usuarios").insert([
        {
          id: anonUser.user?.id,
          nombre: formData.nombre,
          rol: "adulto_mayor",
          codigo_familia: codigo,
        },
      ]);

      Alert.alert("✅ Registro exitoso", "Adulto mayor vinculado correctamente.");
      navigation.navigate("Login" as never);
    }
  );
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
        <Text style={styles.title}>Registrar Adulto Mayor</Text>

        <TextInput
          placeholder="Nombre completo"
          value={formData.nombre}
          onChangeText={(text) => setFormData({ ...formData, nombre: text })}
          style={styles.input}
        />

        <TextInput
          placeholder="Edad"
          keyboardType="numeric"
          value={formData.edad}
          onChangeText={(text) => setFormData({ ...formData, edad: text })}
          style={styles.input}
        />

        <TextInput
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={formData.telefono}
          onChangeText={(text) => setFormData({ ...formData, telefono: text })}
          style={styles.input}
        />

        <TextInput
          placeholder="Dirección"
          value={formData.direccion}
          onChangeText={(text) => setFormData({ ...formData, direccion: text })}
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            style={[styles.input, { flex: 1 }]}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#7F8C8D"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
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
    padding: 20,
    elevation: 6,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
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
    marginBottom: 15,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  button: {
    backgroundColor: "#00D98E",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
