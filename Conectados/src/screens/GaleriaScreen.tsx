import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useGaleria } from "../context/GaleriaContext";

export default function GaleriaScreen() {
  const navigation = useNavigation();
  const { imagenes, agregarImagen } = useGaleria();

  const abrirGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      agregarImagen(result.assets[0].uri);
      Alert.alert("Imagen agregada", "Tu imagen se ha guardado en la galería compartida.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
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
        <Text style={styles.title}>Galería Compartida</Text>
        <Text style={styles.subtitle}>Aquí pueden subir y ver fotos juntos.</Text>

        {/* Botón para subir */}
        <TouchableOpacity style={styles.uploadButton} onPress={abrirGaleria}>
          <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
          <Text style={styles.uploadText}>Subir imagen</Text>
        </TouchableOpacity>

        {/* Galería */}
        <View style={styles.grid}>
          {imagenes.length === 0 ? (
            <Text style={styles.emptyText}>Aún no hay imágenes compartidas.</Text>
          ) : (
            imagenes.map((img) => (
              <View key={img.id} style={styles.imageBox}>
                <Image source={{ uri: img.uri }} style={styles.image} />
                <Text style={styles.imageDate}>{img.fecha}</Text>
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
  container: { padding: 16, paddingBottom: 60 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#4A9FD8",
    fontSize: 12,
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#00D98E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  uploadText: { color: "#fff", fontWeight: "bold", marginLeft: 8 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  imageBox: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    marginBottom: 10,
  },
  image: { width: "100%", height: 140 },
  imageDate: {
    fontSize: 11,
    color: "#7F8C8D",
    padding: 4,
    textAlign: "right",
  },
  emptyText: { textAlign: "center", color: "#7F8C8D", marginTop: 20 },
});
