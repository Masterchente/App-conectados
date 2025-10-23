// src/screens/NotasScreen.tsx
import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabaseClient";

export default function NotasScreen() {
  const navigation = useNavigation();
  const [notas, setNotas] = useState<any[]>([]);

  // 🔄 Cargar notas reales del usuario
  useEffect(() => {
    const fetchNotas = async () => {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth?.user?.id;

      const { data, error } = await supabase
        .from("notas")
        .select("id, titulo, contenido, fecha")
        .eq("usuario_id", userId)
        .order("fecha", { ascending: false });

      if (error) {
        console.error("Error al cargar notas:", error);
      } else {
        setNotas(data);
      }
    };

    fetchNotas();
  }, []);

  // 🗑️ Eliminar nota
  const deleteNota = async (id: number) => {
    try {
      const { error } = await supabase.from("notas").delete().eq("id", id);
      if (error) throw error;
      setNotas((prev) => prev.filter((n) => n.id !== id));
      Alert.alert("✅ Nota eliminada");
    } catch (err) {
      console.error("Error al eliminar nota:", err);
      Alert.alert("❌ No se pudo eliminar la nota.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <Text style={styles.subtitle}>Mensajes y recordatorios guardados 💬</Text>

        {notas.length === 0 ? (
          <Text style={styles.noNotas}>No hay notas todavía.</Text>
        ) : (
          notas.map((nota) => (
            <View key={nota.id} style={styles.noteCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.noteTitle}>{nota.titulo}</Text>
                <Text style={styles.noteText}>{nota.contenido}</Text>
                <Text style={styles.noteDate}>
                  {new Date(nota.fecha).toLocaleString("es-MX")}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteNota(nota.id)}>
                <Ionicons name="trash" size={22} color="red" />
              </TouchableOpacity>
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
  container: { padding: 16, paddingBottom: 50 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#4A9FD8",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  noNotas: { textAlign: "center", color: "#7F8C8D", marginTop: 20 },
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  noteTitle: { fontWeight: "bold", fontSize: 15, color: "#2C3E50" },
  noteText: { color: "#34495E", marginTop: 4 },
  noteDate: { fontSize: 11, color: "#7F8C8D", marginTop: 6 },
});
