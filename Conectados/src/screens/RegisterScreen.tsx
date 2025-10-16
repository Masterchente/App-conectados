
// src/screens/RegisterScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabaseClient";
import { generarCodigoFamilia } from "../utils/generarCodigoFamilia";


export default function RegisterScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    const user = data.user;
    const codigoFamilia = generarCodigoFamilia();

    await supabase.from("familias").insert([
      {
        codigo: codigoFamilia,
        created_by: user?.id,
      },
    ]);

    await supabase.from("usuarios").insert([
      {
        id: user?.id,
        nombre: `${formData.nombre} ${formData.apellidos}`,
        correo: formData.email,
        rol: "familiar",
        codigo_familia: codigoFamilia,
      },
    ]);

    Alert.alert(
      "✅ Registro exitoso",
      `Tu código de familia es: ${codigoFamilia}\n\nAnótalo o memorízalo, lo necesitará el adulto mayor para ingresar.`
    );

    navigation.navigate("Login" as never);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={require("../../assets/logo-conectados.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Regístrate</Text>

        <TextInput placeholder="Nombre" style={styles.input} value={formData.nombre} onChangeText={(t) => setFormData({ ...formData, nombre: t })} />
        <TextInput placeholder="Apellidos" style={styles.input} value={formData.apellidos} onChangeText={(t) => setFormData({ ...formData, apellidos: t })} />
        <TextInput placeholder="Email" style={styles.input} value={formData.email} onChangeText={(t) => setFormData({ ...formData, email: t })} />
        <TextInput placeholder="Teléfono" style={styles.input} value={formData.telefono} onChangeText={(t) => setFormData({ ...formData, telefono: t })} />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            style={[styles.input, { flex: 1 }]}
            value={formData.password}
            onChangeText={(t) => setFormData({ ...formData, password: t })}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#7F8C8D" />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Confirmar contraseña"
          secureTextEntry
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(t) => setFormData({ ...formData, confirmPassword: t })}
        />

        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          ¿Ya tienes cuenta?{" "}
          <Text style={styles.link} onPress={() => navigation.navigate("Login" as never)}>
            Inicia sesión
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F8F9FA", justifyContent: "center", padding: 20 },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 20, elevation: 6 },
  logo: { width: 90, height: 90, alignSelf: "center", marginBottom: 15 },
  title: { fontSize: 22, fontWeight: "bold", color: "#2C3E50", textAlign: "center", marginBottom: 20 },
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
  passwordContainer: { flexDirection: "row", alignItems: "center" },
  eyeIcon: { position: "absolute", right: 15 },
  button: { backgroundColor: "#00D98E", borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  footerText: { fontSize: 12, textAlign: "center", color: "#7F8C8D", marginTop: 15 },
  link: { color: "#4A9FD8", fontWeight: "bold" },
});
