import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NotasScreen() {
  const navigation = useNavigation();

  const [notas] = useState([
    {
      id: 1,
      title: "Te quiero Pa, nos vemos el lunes",
      date: "10-06-2025",
      type: "text",
      color: "#E74C3C", // rojo
    },
    {
      id: 2,
      title: "Recuerda ir comprar aguacate",
      date: "10-06-2025",
      type: "text",
      color: "#27AE60", // verde
    },
    {
      id: 3,
      title: "Perejungito",
      date: "10-06-2025",
      type: "text",
      color: "#E67E22", // naranja
    },
    {
      id: 4,
      title: "Tu nieta te manda saludos",
      date: "",
      type: "image",
      color: "#7F8C8D",
    },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header tipo Dashboard */}
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
        <Text style={styles.title}>NOTAS</Text>
        <Text style={styles.subtitle}>
          Caja para escribir un mensaje breve o subir una foto.
        </Text>

        {/* Lista de notas */}
        <View style={{ marginTop: 20 }}>
          {notas.map((nota) => (
            <View key={nota.id} style={styles.noteCard}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.noteText, { color: nota.color }]}>
                  {nota.title}
                </Text>
                {nota.date ? (
                  <Text style={styles.noteDate}>{nota.date}</Text>
                ) : null}
              </View>

              {nota.type === "image" ? (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image" size={24} color="#7F8C8D" />
                </View>
              ) : (
                <TouchableOpacity>
                  <Ionicons name="settings" size={22} color="#7F8C8D" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Botones de acción */}
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Descargar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Concluir</Text>
          </TouchableOpacity>
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
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
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
  container: {
    padding: 16,
    paddingBottom: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#7F8C8D",
    textAlign: "center",
    marginTop: 4,
  },
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  noteText: {
    fontWeight: "600",
    fontSize: 14,
  },
  noteDate: {
    fontSize: 11,
    color: "#7F8C8D",
    marginTop: 2,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    backgroundColor: "#00D98E",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
