// src/screens/Dashboard.tsx
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Dashboard() {
  const navigation = useNavigation();
  const [reminders] = useState([
    { id: 1, text: "Recordatorio 1" },
    { id: 2, text: "Recordatorio 2" },
    { id: 3, text: "Recordatorio 3" },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Principal Familiar</Text>

        {/* Botón para unirse a familia */}
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => navigation.navigate("ElderlyJoin" as never)}
        >
          <Text style={styles.joinText}>Unirse a una familia →</Text>
        </TouchableOpacity>

        {/* Acciones principales */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="chatbubble-ellipses" size={32} color="#2C3E50" />
            <Text style={styles.cardText}>Chatbot</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="article" size={32} color="#2C3E50" />
            <Text style={styles.cardText}>Resumen</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="note" size={32} color="#2C3E50" />
            <Text style={styles.cardText}>Notas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Ionicons name="images" size={32} color="#2C3E50" />
            <Text style={styles.cardText}>Galería</Text>
          </TouchableOpacity>
        </View>

        {/* Recordatorios */}
        <Text style={styles.sectionTitle}>Recordatorios actuales</Text>
        <View style={styles.remindersBox}>
          {reminders.map((reminder) => (
            <Text key={reminder.id} style={styles.reminderText}>
              • {reminder.text}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    paddingBottom: 40, // un poco más de espacio abajo
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  joinButton: {
    backgroundColor: "#B8D4E6",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  joinText: {
    fontWeight: "bold",
    color: "#2C3E50",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  cardText: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginVertical: 15,
    color: "#2C3E50",
  },
  remindersBox: {
    backgroundColor: "#00D98E",
    borderRadius: 12,
    padding: 15,
  },
  reminderText: {
    color: "#fff",
    marginBottom: 5,
  },
});
