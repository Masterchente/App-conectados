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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function NotasFamiliarScreen() {
  const navigation = useNavigation();

  // 📝 Estado de notas
  const [notas, setNotas] = useState<
    { id: number; title: string; type: "text" | "image"; image?: string }[]
  >([]);

  const [nuevaNota, setNuevaNota] = useState("");

  // 📸 Seleccionar imagen desde galería
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setNotas((prev) => [
        ...prev,
        { id: Date.now(), title: "Foto enviada", type: "image", image: uri },
      ]);
    }
  };

  // ➕ Agregar nota de texto
  const addNota = () => {
    if (!nuevaNota.trim()) {
      Alert.alert("Campo vacío", "Por favor escribe una nota antes de agregarla.");
      return;
    }
    setNotas((prev) => [
      ...prev,
      { id: Date.now(), title: nuevaNota, type: "text" },
    ]);
    setNuevaNota("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header tipo dashboard */}
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
        <Text style={styles.title}>Notas Familiares</Text>
        <Text style={styles.subtitle}>
          Escribe una nota breve o envía una foto al adulto mayor.
        </Text>

        {/* Campo de texto */}
        <TextInput
          placeholder="Escribe una nota..."
          value={nuevaNota}
          onChangeText={setNuevaNota}
          style={styles.input}
          multiline
        />

        {/* Botones de acción */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={addNota}>
            <Ionicons name="send" size={20} color="#fff" />
            <Text style={styles.actionText}>Enviar Nota</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <MaterialIcons name="photo-camera" size={22} color="#fff" />
            <Text style={styles.actionText}>Enviar Foto</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de notas enviadas */}
        <Text style={styles.sectionTitle}>Notas enviadas</Text>
        {notas.length === 0 ? (
          <Text style={styles.emptyText}>Aún no has enviado notas.</Text>
        ) : (
          notas.map((nota) => (
            <View key={nota.id} style={styles.noteCard}>
              {nota.type === "image" ? (
                <Image
                  source={{ uri: nota.image }}
                  style={styles.noteImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.noteText}>{nota.title}</Text>
              )}
            </View>
          ))
        )}
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
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#E5E7EB",
    borderWidth: 1.5,
    padding: 12,
    fontSize: 14,
    textAlignVertical: "top",
    minHeight: 70,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#00D98E",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginRight: 6,
  },
  imageButton: {
    flex: 1,
    backgroundColor: "#4A9FD8",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginLeft: 6,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2C3E50",
    marginVertical: 12,
  },
  emptyText: {
    color: "#7F8C8D",
    fontStyle: "italic",
    textAlign: "center",
  },
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
  },
  noteText: {
    fontSize: 14,
    color: "#2C3E50",
  },
  noteImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
});
