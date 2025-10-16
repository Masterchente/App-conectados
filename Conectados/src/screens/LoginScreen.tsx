// src/screens/LoginScreen.tsx
import { Alert } from "react-native";
import { supabase } from "../lib/supabaseClient";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

const handleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    const user = data.user;

    const { data: perfil } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", user.id)
      .single();

    if (perfil?.rol === "familiar") {
      navigation.navigate("DashboardFamiliar" as never);
    } else {
      navigation.navigate("DashboardElderly" as never);
    }
  } catch (err) {
    Alert.alert("Error inesperado", String(err));
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/logo-conectados.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Logeate</Text>

        <TextInput
          placeholder="Usuario o Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
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

        {/* Botón de entrar */}
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Botón de registrarse */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Register" as never)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Registrate</Text>
        </TouchableOpacity>

        {/* Botón soy un adulto mayor */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ElderlyJoin" as never)}
          style={styles.button}
        >
        

          <Text style={styles.buttonText}>Soy un adulto mayor</Text>
        </TouchableOpacity>

        {/* Botón para registrar adulto mayor */}
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterElderly" as never)}
          style={[styles.button, { backgroundColor: "#4A9FD8" }]}
        >
          <Text style={styles.buttonText}>Registrar adulto mayor</Text>
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
