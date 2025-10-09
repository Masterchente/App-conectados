import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRecordatorios } from "../context/RecordatoriosContext"; // ✅ Importa el contexto

export default function RecordatoriosScreen() {
  const navigation = useNavigation();
  const { recordatorios } = useRecordatorios(); // ✅ Obtenemos los recordatorios globales

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

        <TouchableOpacity
          style={styles.avatar}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>RECORDATORIOS</Text>
        <Text style={styles.subText}>Para que no olvides.</Text>

        {/* Lista de recordatorios activos */}
        <View style={styles.reminderList}>
          {recordatorios.length === 0 ? (
            <Text style={styles.noReminders}>No hay recordatorios todavía.</Text>
          ) : (
            recordatorios.map((r) => (
              <View key={r.id} style={styles.reminderCard}>
                <View style={styles.reminderInfo}>
                  <Ionicons name="notifications" size={20} color="#2C3E50" />
                  <View>
                    <Text style={styles.reminderText}>{r.text}</Text>
                    <Text style={styles.reminderTime}>{r.time}</Text>
                  </View>
                </View>
                <View style={styles.reminderActions}>
                  <TouchableOpacity>
                    <Ionicons name="volume-high" size={20} color="#7F8C8D" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Recordatorios vencidos */}
        <Text style={styles.sectionTitle}>Recordatorios vencidos</Text>
        <View style={styles.completedBox}>
          <Text style={styles.completedText}>• Recordatorio vencido 1</Text>
          <Text style={styles.completedText}>• Recordatorio vencido 2</Text>
        </View>

        {/* Botón para agregar nuevo */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("NuevoRecordatorio" as never)}
        >
          <Text style={styles.addButtonText}>+ Agregar Recordatorio</Text>
        </TouchableOpacity>

        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F9FA" },

  // HEADER estilo dashboard
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

  // CONTENIDO PRINCIPAL
  container: { padding: 16, paddingBottom: 80 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 5,
  },
  subText: {
    textAlign: "center",
    color: "#4A9FD8",
    fontSize: 12,
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  reminderList: { gap: 10 },
  reminderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 1,
  },
  reminderInfo: { flexDirection: "row", gap: 10, alignItems: "center" },
  reminderText: { fontWeight: "bold", color: "#2C3E50" },
  reminderTime: { fontSize: 12, color: "#7F8C8D" },
  reminderActions: { flexDirection: "row", gap: 8 },
  noReminders: {
    color: "#7F8C8D",
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#2C3E50",
    marginVertical: 15,
  },
  completedBox: {
    backgroundColor: "#00D98E",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  completedText: { color: "#fff", marginBottom: 5 },
  addButton: {
    backgroundColor: "#00D98E",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

 
});
