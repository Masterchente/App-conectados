// src/screens/NuevoRecordatorio.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useRecordatorios } from "../context/RecordatoriosContext";
import { supabase } from "../lib/supabaseClient";

export default function NuevoRecordatorio() {
  const navigation = useNavigation();
  const { addRecordatorio } = useRecordatorios();

  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAdd = async () => {
    if (!description.trim() || !selectedDate || !selectedTime) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }

    const dateString = selectedDate.toLocaleDateString("es-MX", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const timeString = selectedTime.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth?.user?.id;

      const { error } = await supabase
        .from("recordatorios")
        .insert([
          {
            usuario_id: userId,
            texto: description,
            hora: `${dateString} a las ${timeString}`,
          },
        ]);

      if (error) throw error;

      addRecordatorio(description, `${dateString} a las ${timeString}`);
      Alert.alert("✅ Éxito", "Recordatorio guardado con éxito");
      navigation.goBack();
    } catch (err) {
      console.error("Error al guardar recordatorio:", err);
      Alert.alert("❌ Error", "No se pudo guardar el recordatorio.");
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
        <Text style={styles.title}>Nuevo Recordatorio</Text>

        <TextInput
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <TouchableOpacity style={styles.selector} onPress={() => setShowDatePicker(true)}>
          <Ionicons name="calendar" size={20} color="#2C3E50" />
          <Text style={styles.selectorText}>
            {selectedDate
              ? selectedDate.toLocaleDateString("es-MX", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "Seleccionar día"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}

        <TouchableOpacity style={styles.selector} onPress={() => setShowTimePicker(true)}>
          <Ionicons name="time" size={20} color="#2C3E50" />
          <Text style={styles.selectorText}>
            {selectedTime
              ? selectedTime.toLocaleTimeString("es-MX", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Seleccionar hora"}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime || new Date()}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, date) => {
              setShowTimePicker(false);
              if (date) setSelectedTime(date);
            }}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Agregar</Text>
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
  container: { padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  selectorText: { marginLeft: 10, color: "#2C3E50", fontWeight: "bold" },
  addButton: {
    backgroundColor: "#00D98E",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
