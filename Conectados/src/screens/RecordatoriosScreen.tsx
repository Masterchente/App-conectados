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
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabaseClient";

export default function RecordatoriosScreen() {
  const navigation = useNavigation();
  const [recordatorios, setRecordatorios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Cargar recordatorios desde Supabase al entrar
  useEffect(() => {
    const fetchRecordatorios = async () => {
      try {
        setLoading(true);

        // Obtener usuario actual
        const { data: auth } = await supabase.auth.getUser();
        let userId = auth?.user?.id;

        // Si no hay sesión activa, buscar en usuarios
        if (!userId) {
          const { data: sessionData } = await supabase.auth.getSession();
          const email = sessionData?.session?.user?.email;
          if (email) {
            const { data: userDb } = await supabase
              .from("usuarios")
              .select("id")
              .eq("correo", email)
              .single();
            if (userDb) userId = userDb.id;
          }
        }

        if (!userId) {
          Alert.alert("Error", "No se encontró un usuario activo.");
          return;
        }

        // Consultar recordatorios de ese usuario
        const { data, error } = await supabase
          .from("recordatorios")
          .select("id, texto, fecha")
          .eq("usuario_id", userId)
          .order("fecha", { ascending: true });

        if (error) {
          console.error("❌ Error cargando recordatorios:", error);
          Alert.alert("Error", "No se pudieron cargar los recordatorios.");
        } else {
          setRecordatorios(data || []);
        }
      } catch (e) {
        console.error("⚠️ Error general:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordatorios();
  }, []);

  // 🗑 Eliminar recordatorio
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("recordatorios").delete().eq("id", id);
      if (error) throw error;
      setRecordatorios((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      Alert.alert("Error", "No se pudo eliminar el recordatorio.");
      console.error("❌ Error eliminando recordatorio:", err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
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
        <Text style={styles.title}>RECORDATORIOS</Text>
        <Text style={styles.subText}>Tus recordatorios guardados 💚</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#4A9FD8" style={{ marginTop: 40 }} />
        ) : recordatorios.length === 0 ? (
          <Text style={styles.noReminders}>No tienes recordatorios aún.</Text>
        ) : (
          recordatorios.map((r) => {
            const fecha = new Date(r.fecha);
            const fechaStr = fecha.toLocaleDateString("es-MX", {
              weekday: "long",
              day: "2-digit",
              month: "long",
            });
            const horaStr = fecha.toLocaleTimeString("es-MX", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <View key={r.id} style={styles.reminderCard}>
                <View style={styles.reminderInfo}>
                  <Ionicons name="notifications" size={22} color="#2C3E50" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.reminderText}>{r.texto}</Text>
                    <Text style={styles.reminderTime}>
                      {fechaStr} a las {horaStr}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleDelete(r.id)}>
                  <Ionicons name="trash" size={22} color="red" />
                </TouchableOpacity>
              </View>
            );
          })
        )}

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
  container: { padding: 16, paddingBottom: 100 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
  },
  subText: {
    textAlign: "center",
    color: "#4A9FD8",
    fontSize: 13,
    marginVertical: 6,
  },
  noReminders: {
    color: "#7F8C8D",
    textAlign: "center",
    marginTop: 30,
    fontStyle: "italic",
  },
  reminderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 1,
    marginBottom: 10,
  },
  reminderInfo: { flexDirection: "row", alignItems: "center" },
  reminderText: { fontWeight: "bold", color: "#2C3E50" },
  reminderTime: { fontSize: 12, color: "#7F8C8D" },
  addButton: {
    backgroundColor: "#00D98E",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
