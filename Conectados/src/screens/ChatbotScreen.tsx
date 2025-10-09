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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChatbotScreen() {
  const navigation = useNavigation();

  const [messages, setMessages] = useState([
    { id: 1, text: "Hola", sender: "user" },
    { id: 2, text: "¿Cómo te sientes hoy?", sender: "bot" },
    { id: 3, text: "Bien", sender: "user" },
    { id: 4, text: "¡Me alegra escucharlo!", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = { id: Date.now(), text: inputText, sender: "user" };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simular respuesta del bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Entiendo 😊 Cuéntame más sobre tu día.",
          sender: "bot",
        },
      ]);
    }, 1000);
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

      {/* TÍTULO */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>CHATBOT</Text>
        <Text style={styles.subtitle}>¿Cómo te sientes hoy?</Text>
      </View>

      {/* CHAT */}
      <ScrollView
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.sender === "user"
                  ? styles.userText
                  : styles.botText,
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* INPUT */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Ionicons name="happy-outline" size={24} color="#7F8C8D" />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Escribe un mensaje..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />

          <TouchableOpacity>
            <Ionicons name="mic-outline" size={24} color="#7F8C8D" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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

  titleContainer: { padding: 16, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", color: "#4A9FD8" },
  subtitle: { color: "#7F8C8D", fontSize: 13, marginTop: 4 },

  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 18,
    marginVertical: 6,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2C3E50",
    borderBottomRightRadius: 0,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderBottomLeftRadius: 0,
  },
  messageText: { fontSize: 14 },
  userText: { color: "#fff" },
  botText: { color: "#2C3E50" },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#4A9FD8",
    borderRadius: 20,
    padding: 8,
  },
});
