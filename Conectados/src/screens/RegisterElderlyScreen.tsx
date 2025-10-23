// src/screens/RegisterElderlyScreen.tsx
import { generarCodigoFamilia } from "../utils/generarCodigoFamilia";
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
    email: "",
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

    // 1️⃣ Crear usuario en auth
    const emailFinal =
      formData.email.trim() !== ""
        ? formData.email.trim()
        : `${formData.nombre.replace(/\s+/g, "")}@adulto.com`;

    const { data: authRes, error: authErr } = await supabase.auth.signUp({
      email: emailFinal,
      password: formData.password,
    });

    if (authErr || !authRes.user) {
      Alert.alert("Error", authErr?.message ?? "No se pudo crear el usuario.");
      return;
    }

    const userId = authRes.user.id;

    // 2️⃣ Insertar en usuarios
    const { error: userErr } = await supabase.from("usuarios").insert([
      {
        id: userId,
        nombre: formData.nombre,
        correo: emailFinal,
        rol: "adulto_mayor",
        telefono: formData.telefono || null,
      },
    ]);

    if (userErr) {
      Alert.alert("Error", `No se pudo guardar el perfil: ${userErr.message}`);
      return;
    }

    // 3️⃣ Generar código único y crear familia (con nombre_adulto_mayor)
    let codigoFamilia = generarCodigoFamilia();
    let famErr;

    for (let i = 0; i < 3; i++) {
      const { error } = await supabase.from("familias").insert([
        {
          codigo: codigoFamilia,
          created_by: userId,
          nombre_adulto_mayor: formData.nombre, // ✅ se guarda el nombre del adulto mayor
        },
      ]);
      famErr = error;
      if (!error) break;
      if (!String(error.message).includes("duplicate")) break;
      codigoFamilia = generarCodigoFamilia();
    }

    if (famErr) {
      Alert.alert("Error", `No se pudo crear la familia: ${famErr.message}`);
      return;
    }

    // 4️⃣ Vincular el código a su usuario
    await supabase.from("usuarios").update({ codigo_familia: codigoFamilia }).eq("id", userId);

    Alert.alert(
      "✅ Registro exitoso",
      `Tu código de familia es: ${codigoFamilia}\n\nGuárdalo, tus familiares lo usarán para unirse.`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login" as never),
        },
      ]
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
          onChangeText={(t) => setFormData({ ...formData, nombre: t })}
          style={styles.input}
        />
        <TextInput
          placeholder="Correo electrónico (opcional)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(t) => setFormData({ ...formData, email: t })}
          style={styles.input}
        />
        <TextInput
          placeholder="Edad"
          keyboardType="numeric"
          value={formData.edad}
          onChangeText={(t) => setFormData({ ...formData, edad: t })}
          style={styles.input}
        />
        <TextInput
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={formData.telefono}
          onChangeText={(t) => setFormData({ ...formData, telefono: t })}
          style={styles.input}
        />
        <TextInput
          placeholder="Dirección"
          value={formData.direccion}
          onChangeText={(t) => setFormData({ ...formData, direccion: t })}
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(t) => setFormData({ ...formData, password: t })}
            style={[styles.input, { flex: 1 }]}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#7F8C8D" />
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
    marginBottom: 15,
    fontSize: 14,
  },
  passwordContainer: { flexDirection: "row", alignItems: "center" },
  eyeIcon: { position: "absolute", right: 15 },
  button: {
    backgroundColor: "#00D98E",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
