import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRecordatorios } from "../context/RecordatoriosContext";

export default function DashboardElderly() {
  const navigation = useNavigation();
  const { recordatorios } = useRecordatorios(); // ✅ Recordatorios globales compartidos

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
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

          <TouchableOpacity style={styles.avatar}>
            <Ionicons name="person" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Principal Adulto</Text>

          {/* Cards */}
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.card}>
              <Ionicons name="chatbubble-ellipses" size={32} color="#2C3E50" />
              <Text style={styles.cardText}>CHATBOT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Diario" as never)}
            >
              <MaterialIcons name="menu-book" size={32} color="#2C3E50" />
              <Text style={styles.cardText}>DIARIO</Text>
            </TouchableOpacity>
                
            {/* 🔹 Botón que navega a Notas */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Notas" as never)}
            >
              <MaterialIcons name="note" size={32} color="#2C3E50" />
              <Text style={styles.cardText}>NOTAS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <Ionicons name="images" size={32} color="#2C3E50" />
              <Text style={styles.cardText}>GALERÍA</Text>
            </TouchableOpacity>

            {/* Botón Recordatorios */}
            <TouchableOpacity
              style={[styles.card, { width: "100%" }]}
              onPress={() => navigation.navigate("Recordatorios" as never)}
            >
              <Ionicons name="time" size={32} color="#2C3E50" />
              <Text style={styles.cardText}>RECORDATORIOS</Text>
            </TouchableOpacity>
          </View>

          {/* Recordatorios actuales */}
          <View style={styles.remindersBox}>
            <View style={styles.reminderHeader}>
              <Ionicons name="time" size={20} color="#2C3E50" />
              <Text style={styles.reminderTitle}>Recordatorios actuales</Text>
            </View>

            {recordatorios.length === 0 ? (
              <Text style={styles.reminderText}>
                No hay recordatorios todavía.
              </Text>
            ) : (
              recordatorios.map((r) => (
                <Text key={r.id} style={styles.reminderText}>
                  • {r.text} ({r.time})
                </Text>
              ))
            )}
          </View>

          {/* Ondas decorativas */}
          <View style={styles.waveBox}>
            <View style={styles.wave1} />
            <View style={styles.wave2} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    backgroundColor: "#F8F9FA",
    flexGrow: 1,
    paddingBottom: 50,
  },
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
  logo: {
    width: 40,
    height: 40,
  },
  logoText: {
    color: "#7F8C8D",
    fontSize: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4A9FD8",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
    maxWidth: 500,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },
  cardText: {
    marginTop: 8,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  remindersBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    marginBottom: 40,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  reminderTitle: {
    fontWeight: "bold",
    color: "#2C3E50",
  },
  reminderText: {
    color: "#2C3E50",
    marginBottom: 5,
  },
  waveBox: {
    height: 80,
    position: "relative",
    marginTop: 20,
  },
  wave1: {
    position: "absolute",
    width: "100%",
    height: 40,
    backgroundColor: "#25D366", // Verde WhatsApp oficial
    opacity: 0.5,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  wave2: {
    position: "absolute",
    width: "100%",
    height: 40,
    top: 20,
    backgroundColor: "#4A9FD8", // Azul que combina
    opacity: 0.3,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
});
