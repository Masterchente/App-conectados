// src/screens/DashboardFamiliar.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRecordatorios } from "../context/RecordatoriosContext";
import { supabase } from "../lib/supabaseClient";

export default function DashboardFamiliar() {
  const navigation = useNavigation();
  const { recordatorios } = useRecordatorios();
  const [nombreFamilia, setNombreFamilia] = useState<string | null>(null);
  const [tieneFamilia, setTieneFamilia] = useState<boolean>(false);

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        const email = auth?.user?.email;
        if (!email) return;

        // 1️⃣ Buscar usuario actual
        const { data: usuario } = await supabase
          .from("usuarios")
          .select("codigo_familia")
          .eq("correo", email)
          .single();

        if (!usuario?.codigo_familia) return;

        setTieneFamilia(true);

        // 2️⃣ Buscar familia directamente por el código
        const { data: familia } = await supabase
          .from("familias")
          .select("nombre_adulto_mayor")
          .eq("codigo", usuario.codigo_familia)
          .single();

        if (familia?.nombre_adulto_mayor) {
          console.log("✅ Adulto mayor:", familia.nombre_adulto_mayor);
          setNombreFamilia(familia.nombre_adulto_mayor);
        }
      } catch (err) {
        console.error("🚨 Error cargando familia:", err);
      }
    };

    fetchFamily();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
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

        <View style={styles.content}>
          {nombreFamilia && (
            <Text style={styles.familyLabel}>
              👨‍👩‍👧 Familia de{" "}
              <Text style={{ fontWeight: "bold" }}>{nombreFamilia}</Text>
            </Text>
          )}

          <Text style={styles.title}>Principal Familiar</Text>

          {!tieneFamilia && (
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => navigation.navigate("FamilyJoin" as never)}
            >
              <Text style={styles.joinText}>Unirse a una familia →</Text>
            </TouchableOpacity>
          )}

          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("ChatFamiliar" as never)}
            >
              <Ionicons name="chatbubble-ellipses" size={32} color="#2C3E50" />
              <Text style={styles.cardText}>CHAT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("ResumenFamiliar" as never)}
            >
              <MaterialIcons name="article" size={32} color="#2C3E50" />
              <Text style={styles.cardText}>RESUMEN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("NotasFamiliar" as never)}
            >
              <MaterialIcons name="note" size={32} color="#2C3E50" />
              <Text style={styles.cardText}>NOTAS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Galeria" as never)}
            >
              <Ionicons name="images" size={32} color="#2C3E50" />
              <Text style={styles.cardText}>GALERÍA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, { width: "100%" }]}
              onPress={() => navigation.navigate("Recordatorios" as never)}
            >
              <Ionicons name="time" size={32} color="#2C3E50" />
              <Text style={styles.cardText}>RECORDATORIOS</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Recordatorios actuales</Text>
          <View style={styles.remindersBox}>
            {recordatorios.map((r) => (
              <Text key={r.id} style={styles.reminderText}>
                • {r.text} ({r.time})
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F9FA" },
  container: { flexGrow: 1, backgroundColor: "#F8F9FA", paddingBottom: 50 },
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
  content: { padding: 16, maxWidth: 500, alignSelf: "center" },
  familyLabel: {
    textAlign: "center",
    color: "#2C3E50",
    marginBottom: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
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
  joinText: { fontWeight: "bold", color: "#2C3E50" },
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
  cardText: { marginTop: 8, fontWeight: "bold", color: "#2C3E50" },
  sectionTitle: { fontWeight: "bold", marginVertical: 15, color: "#2C3E50" },
  remindersBox: {
    backgroundColor: "#00D98E",
    borderRadius: 12,
    padding: 15,
  },
  reminderText: { color: "#fff", marginBottom: 5 },
});
