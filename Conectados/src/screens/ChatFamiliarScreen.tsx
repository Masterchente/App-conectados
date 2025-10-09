import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChatFamiliarScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola", sender: "yo", time: "10:30" },
    { id: 2, text: "¿Quién lleva a la abuela al doctor?", sender: "otro", time: "10:31" },
    { id: 3, text: "Yo puedo mañana", sender: "yo", time: "10:32" },
    { id: 4, text: "Perfecto, gracias", sender: "otro", time: "10:33" },
  ]);

  const quickReplies = ["¿Cómo está hoy?", "Ya tomó sus medicinas", "Voy a visitarla"];

  const handleSend = () => {
    if (!message.trim()) return;
    const nuevo = { id: Date.now(), text: message, sender: "yo", time: "Ahora" };
    setMessages([...messages, nuevo]);
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#4A9FD8" />
        </TouchableOpacity>
        <Text style={styles.title}>Chat Familiar</Text>
        <View style={{ width: 22 }} /> {/* Espacio simétrico */}
      </View>

      {/* Mensajes */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageWrapper,
              msg.sender === "yo" ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.sender === "yo" ? styles.myText : styles.otherText,
              ]}
            >
              {msg.text}
            </Text>
            <Text style={styles.timeText}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Respuestas rápidas */}
      <View style={styles.quickReplies}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickReplies.map((reply, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setMessage(reply)}
              style={styles.replyButton}
            >
              <Text style={styles.replyText}>{reply}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input */}
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
            value={message}
            onChangeText={setMessage}
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
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    elevation: 2,
  },
  backButton: { padding: 4 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A9FD8",
    textAlign: "center",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FA",
  },
  messageWrapper: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 16,
    marginVertical: 6,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2C3E50",
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderBottomLeftRadius: 0,
  },
  messageText: { fontSize: 14 },
  myText: { color: "#fff" },
  otherText: { color: "#2C3E50" },
  timeText: {
    fontSize: 10,
    color: "#7F8C8D",
    marginTop: 4,
    textAlign: "right",
  },
  quickReplies: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  replyButton: {
    backgroundColor: "#E1F5FE",
    borderColor: "#4A9FD8",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },
  replyText: { color: "#2C3E50", fontSize: 12, fontWeight: "500" },
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
