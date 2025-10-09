import React, { useState } from "react";
import {
  SafeAreaView,
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
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function DiarioScreen() {
  const navigation = useNavigation();
  const [texto, setTexto] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);
  const [entradas, setEntradas] = useState<
    { id: number; texto: string; imagen?: string | null; fecha: string }[]
  >([]); // ✅ <-- aquí está la corrección

  const abrirGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const guardarEntrada = () => {
    if (!texto.trim() && !imagen) {
      Alert.alert("Campo vacío", "Escribe algo o sube una foto antes de guardar.");
      return;
    }
    const nueva = {
      id: Date.now(),
      texto,
      imagen,
      fecha: new Date().toLocaleDateString("es-MX"),
    };
    setEntradas([nueva, ...entradas]);
    setTexto("");
    setImagen(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header estilo Dashboard */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require("../../assets/logo-conectados.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>Conectados</Text>
        </View>

        <TouchableOpacity style={styles.avatar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Mi Diario</Text>
        <Text style={styles.subtitle}>
          Escribe cómo te sientes o comparte una foto del día.
        </Text>

        {/* Campo de texto */}
        <TextInput
          style={styles.textInput}
          placeholder="Escribe aquí..."
          value={texto}
          onChangeText={setTexto}
          multiline
        />

        {/* Imagen seleccionada */}
        {imagen && <Image source={{ uri: imagen }} style={styles.previewImage} />}

        {/* Botones */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.photoButton]} onPress={abrirGaleria}>
            <Ionicons name="image-outline" size={18} color="#2C3E50" />
            <Text style={styles.buttonTextDark}>Subir foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={guardarEntrada}>
            <Ionicons name="save-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>

        {/* Entradas previas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entradas recientes</Text>
          {entradas.length === 0 ? (
            <Text style={styles.emptyText}>Aún no has escrito nada en tu diario.</Text>
          ) : (
            entradas.map((item) => (
              <View key={item.id} style={styles.entryCard}>
                {item.imagen && (
                  <Image source={{ uri: item.imagen }} style={styles.entryImage} />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.entryText}>{item.texto}</Text>
                  <Text style={styles.entryDate}>{item.fecha}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
    elevation: 2,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logo: { width: 40, height: 40 },
  logoText: { color: "#7F8C8D", fontSize: 12 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4A9FD8",
    alignItems: "center",
    justifyContent: "center",
  },
  container: { padding: 16, paddingBottom: 80 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#4A9FD8",
    textAlign: "center",
    marginVertical: 8,
    textDecorationLine: "underline",
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 12,
    flex: 0.48,
  },
  photoButton: {
    backgroundColor: "#E1F5FE",
    borderWidth: 1,
    borderColor: "#4A9FD8",
  },
  saveButton: { backgroundColor: "#00D98E" },
  buttonTextDark: {
    color: "#2C3E50",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 6,
  },
  section: { marginTop: 20 },
  sectionTitle: {
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
    fontSize: 16,
  },
  emptyText: { color: "#7F8C8D", textAlign: "center" },
  entryCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 1,
  },
  entryImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  entryText: { color: "#2C3E50", fontWeight: "500" },
  entryDate: { fontSize: 11, color: "#7F8C8D", marginTop: 3 },
});
