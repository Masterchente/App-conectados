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

export default function ResumenFamiliarScreen() {
  const navigation = useNavigation();

  // Datos simulados de estados
  const [estados, setEstados] = useState([
    { label: "Hoy se siente: Normal", date: "13/10/2025", status: "normal" },
    { label: "Hoy se siente: Triste", date: "12/10/2025", status: "warning" },
    { label: "Hoy no comió bien", date: "12/10/2025", status: "alert" },
  ]);

  const [nuevaObs, setNuevaObs] = useState("");

  const agregarObservacion = () => {
    if (!nuevaObs.trim()) {
      Alert.alert("Campo vacío", "Por favor escribe una observación antes de agregarla.");
      return;
    }
    const nueva = {
      label: nuevaObs,
      date: new Date().toLocaleDateString("es-MX"),
      status: "normal",
    };
    setEstados((prev) => [nueva, ...prev]);
    setNuevaObs("");
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
        <Text style={styles.title}>Resumen Familiar</Text>
        <Text style={styles.subtitle}>
          Últimos estados del adulto mayor y observaciones familiares.
        </Text>

        {/* Estados registrados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Último estado registrado</Text>
          {estados.map((estado, index) => (
            <View key={index} style={styles.stateCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.stateLabel}>{estado.label}</Text>
                <Text
                  style={[
                    styles.stateDate,
                    estado.status === "warning"
                      ? { color: "#E67E22" }
                      : estado.status === "alert"
                      ? { color: "#E74C3C" }
                      : { color: "#27AE60" },
                  ]}
                >
                  {estado.date}
                </Text>
              </View>

              {estado.status === "warning" && (
                <Ionicons name="warning" size={24} color="#E67E22" />
              )}
              {estado.status === "alert" && (
                <Ionicons name="alert-circle" size={24} color="#E74C3C" />
              )}
            </View>
          ))}
        </View>

        {/* Agregar observación */}
        <Text style={styles.sectionTitle}>Agregar observación</Text>
        <TextInput
          placeholder="Escribe una observación..."
          value={nuevaObs}
          onChangeText={setNuevaObs}
          style={styles.input}
          multiline
        />

        <TouchableOpacity style={styles.addButton} onPress={agregarObservacion}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Agregar al resumen</Text>
        </TouchableOpacity>

        {/* Sección para contenido adicional */}
        <View style={styles.extraBox}>
          <Text style={styles.extraText}>Contenido adicional o comentarios generales</Text>
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
  section: { marginTop: 10, marginBottom: 20 },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2C3E50",
    marginBottom: 10,
  },
  stateCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stateLabel: { fontSize: 14, color: "#2C3E50", fontWeight: "500" },
  stateDate: { fontSize: 11, marginTop: 4 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#E5E7EB",
    borderWidth: 1.5,
    padding: 12,
    fontSize: 14,
    textAlignVertical: "top",
    minHeight: 70,
    marginBottom: 10,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#00D98E",
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  extraBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E1E8ED",
    borderWidth: 1,
  },
  extraText: { color: "#BDC3C7", fontSize: 13, textAlign: "center" },
});
