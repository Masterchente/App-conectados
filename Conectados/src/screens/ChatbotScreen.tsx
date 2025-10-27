import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/supabaseClient";
import * as Speech from "expo-speech"; // 🗣 voz

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "👋 ¡Hola! Soy ConectadBot. Puedo ayudarte a agregar notas, recordatorios o simplemente platicar contigo 💙",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [vozActiva, setVozActiva] = useState(true); // 🔊 control de voz

  // 📨 Enviar mensaje
  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMsg = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    const userText = input.trim().toLowerCase();
    const botReply = await getBotResponse(userText);
    setInput("");

    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: "bot",
      };
      setMessages((prev) => [...prev, reply]);

      // 🗣 solo hablar si está activada la voz
      if (vozActiva) {
        Speech.speak(botReply, {
          language: "es-MX",
          pitch: 1,
          rate: 0.95,
        });
      }
    }, 600);
  };

  // 🧠 Lógica del bot
  const getBotResponse = async (msg: string) => {
    try {
      // 📝 AGREGAR NOTA
      if (msg.includes("agregar nota") || msg.includes("nueva nota")) {
        const contenido = msg
          .replace("agregar nota", "")
          .replace("nueva nota", "")
          .trim();

        if (!contenido) return "¿Qué quieres anotar exactamente? 📝";

        const { data: auth } = await supabase.auth.getUser();
        const userId = auth?.user?.id;

        const { error } = await supabase
          .from("notas")
          .insert([{ usuario_id: userId, contenido, titulo: "Nota rápida" }]);

        if (error) {
          console.error("❌ Error al insertar nota:", error);
          return "❌ No pude guardar la nota 😞";
        }
        return "✅ ¡Nota agregada con éxito! Puedes verla en la sección de Notas.";
      }

      // ⏰ AGREGAR RECORDATORIO
      if (msg.includes("recordatorio") || msg.includes("recuérdame")) {
        const texto = msg
          .replace("recuérdame", "")
          .replace("recordatorio", "")
          .trim();

        if (!texto) return "¿Qué quieres que te recuerde y a qué hora? ⏰";

        try {
          // 🔍 Intentar obtener usuario desde sesión activa
          const { data: auth } = await supabase.auth.getUser();
          let userId = auth?.user?.id;

          // 🧠 Si no hay sesión, buscar en la tabla usuarios por correo
          if (!userId) {
            const { data: userSession } = await supabase.auth.getSession();
            const email = userSession?.session?.user?.email;

            if (email) {
              const { data: userDb, error: userError } = await supabase
                .from("usuarios")
                .select("id")
                .eq("correo", email)
                .single();

              if (userError) {
                console.error("❌ Error buscando usuario en tabla:", userError);
              } else if (userDb) {
                userId = userDb.id;
                console.log("✅ Usuario encontrado por correo:", userId);
              }
            }
          }

          // 🚨 Si todavía no hay userId, abortar
          if (!userId) {
            console.error("❌ No se encontró ningún usuario activo o en la BD.");
            return "⚠️ No hay usuario activo. Por favor inicia sesión antes de guardar recordatorios.";
          }

          // 🕐 Analizar fecha/hora simple
          let fecha = new Date();
          if (msg.includes("mañana")) {
            fecha.setDate(fecha.getDate() + 1);
          }

          const horaMatch = msg.match(/(\d{1,2})(?::(\d{2}))?\s?(am|pm)?/i);
          if (horaMatch) {
            let horas = parseInt(horaMatch[1]);
            const minutos = horaMatch[2] ? parseInt(horaMatch[2]) : 0;
            const meridiano = horaMatch[3]?.toLowerCase();

            if (meridiano === "pm" && horas < 12) horas += 12;
            if (meridiano === "am" && horas === 12) horas = 0;

            fecha.setHours(horas, minutos, 0, 0);
          }

          const fechaISO = new Date(
            fecha.getTime() - fecha.getTimezoneOffset() * 60000
          ).toISOString();

          // 🗄 Insertar recordatorio
          const { error } = await supabase
            .from("recordatorios")
            .insert([{ usuario_id: userId, texto, fecha: fechaISO }]);

          if (error) {
            console.error("❌ Error al insertar recordatorio:", error);
            return "❌ No pude guardar el recordatorio 😢";
          }

          return "🕒 ¡Listo! Tu recordatorio ha sido guardado correctamente.";
        } catch (error) {
          console.error("⚠️ Error general al crear recordatorio:", error);
          return "❌ Ocurrió un error inesperado al guardar el recordatorio.";
        }
      }

      // 💬 CONVERSACIONES NORMALES — más naturales y flexibles
if (
  msg.includes("hola") ||
  msg.includes("buenas") ||
  msg.includes("holi") ||
  msg.includes("hey") ||
  msg.includes("saludos")
) {
  const saludos = [
    "¡Hola! 😊 Qué gusto verte de nuevo.",
    "¡Hola, hola! ¿Cómo has estado últimamente?",
    "Hey 👋 ¿cómo va tu día?",
    "¡Qué alegría verte por aquí otra vez!",
    "Hola 👋 espero que tu día esté lleno de cosas buenas 💙",
    "¡Buenas! 🌞 ¿cómo te sientes hoy?",
  ];
  return saludos[Math.floor(Math.random() * saludos.length)];
}

if (
  msg.includes("cómo estás") ||
  msg.includes("como estas") ||
  msg.includes("que tal") ||
  msg.includes("como andas") ||
  msg.includes("cómo te va") ||
  msg.includes("como te va")
) {
  const respuestas = [
    "Estoy muy bien 💙 gracias por preguntar, ¿y tú?",
    "¡Todo genial! Tratando de hacer mi mejor versión cada día 😄 ¿tú qué tal?",
    "Muy bien 😊 hoy me siento con buena energía. ¿Tú cómo andas?",
    "Todo tranquilo por aquí 💫 ¿y tú, cómo va tu día?",
    "Estoy bien, gracias 💙 me alegra que lo preguntes.",
  ];
  return respuestas[Math.floor(Math.random() * respuestas.length)];
}

if (
  msg.includes("qué haces") ||
  msg.includes("que haces") ||
  msg.includes("haciendo") ||
  msg.includes("ocupado") ||
  msg.includes("en qué estás") ||
  msg.includes("en que estás")
) {
  const respuestas = [
    "Aquí, esperando poder ayudarte 😎",
    "Nada especial, solo listo para platicar contigo 💬",
    "Estoy organizando mis datos 🤓 y pensando en café ☕",
    "Viendo si alguien necesita que le recuerde algo 🕒",
    "Solo practicando cómo ser el mejor bot del mundo 💪",
  ];
  return respuestas[Math.floor(Math.random() * respuestas.length)];
}

if (
  msg.includes("gracias") ||
  msg.includes("te agradezco") ||
  msg.includes("mil gracias") ||
  msg.includes("gracioso")
) {
  const respuestas = [
    "¡De nada! 😊",
    "Para eso estoy 💙",
    "¡Qué amable! Gracias a ti por confiar en mí 💫",
    "Siempre es un gusto ayudarte 😄",
    "Cuando quieras, estoy aquí 👋",
  ];
  return respuestas[Math.floor(Math.random() * respuestas.length)];
}

if (
  msg.includes("adiós") ||
  msg.includes("bye") ||
  msg.includes("nos vemos") ||
  msg.includes("hasta luego") ||
  msg.includes("chao") ||
  msg.includes("me voy")
) {
  const despedidas = [
    "Hasta pronto 👋 ¡Cuídate mucho!",
    "Nos vemos pronto 💙",
    "Que tengas un excelente día 🌞",
    "Adiós 👋 recuerda hidratarte y sonreír 😄",
    "Hasta luego 💫 ¡no olvides tus pendientes!",
  ];
  return despedidas[Math.floor(Math.random() * despedidas.length)];
}

if (
  msg.includes("te quiero") ||
  msg.includes("te amo") ||
  msg.includes("me caes bien") ||
  msg.includes("eres genial")
) {
  const respuestas = [
    "Aww 💙 gracias, eso me alegra mucho.",
    "Yo también te tengo cariño 🤗",
    "¡Qué bonito! 💫 Gracias por decirlo.",
    "Tú también eres genial 😄",
  ];
  return respuestas[Math.floor(Math.random() * respuestas.length)];
}

if (
  msg.includes("qué puedes hacer") ||
  msg.includes("que puedes hacer") ||
  msg.includes("qué sabes hacer") ||
  msg.includes("que sabes hacer")
) {
  return "Puedo ayudarte a crear recordatorios ⏰, agregar notas 📝, o simplemente platicar contigo 💬. ¿Qué quieres hacer hoy?";
}

if (
  msg.includes("cuéntame algo") ||
  msg.includes("dime algo") ||
  msg.includes("chiste") ||
  msg.includes("aburrido") ||
  msg.includes("aburrida")
) {
  const chistes = [
    "¿Sabías que los humanos pasan 1/3 de su vida durmiendo? 😴 Yo no, porque nunca duermo 😎",
    "¿Qué hace una abeja en el gimnasio? ¡Zum-ba! 🐝😂",
    "¿Por qué el libro de matemáticas estaba triste? Porque tenía muchos problemas 📘😅",
    "¿Sabías que reír 10 minutos al día mejora tu memoria? 😄 ¡Así que ríete conmigo un rato!",
    "Yo antes era un chatbot tímido, pero ahora ya me conecto con todos 😏",
  ];
  return chistes[Math.floor(Math.random() * chistes.length)];
}

      // 🪄 Fallback
      const respuestas = [
        "No estoy seguro de haber entendido 🤔, ¿quieres que anote algo o te recuerde algo?",
        "Puedo ayudarte con recordatorios o notas. Dime, ¿qué necesitas?",
        "Mmm... aún estoy aprendiendo, pero dime más 😊",
      ];
      return respuestas[Math.floor(Math.random() * respuestas.length)];
    } catch (err) {
      console.error("Error en el bot:", err);
      return "❌ Hubo un error al procesar tu mensaje.";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 🔊 Header con control de voz */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ConectadBot 🤖</Text>
        <TouchableOpacity
          style={[
            styles.voiceButton,
            vozActiva ? styles.active : styles.inactive,
          ]}
          onPress={() => setVozActiva(!vozActiva)}
        >
          <Ionicons
            name={vozActiva ? "volume-high" : "volume-mute"}
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* 💬 Mensajes */}
        <View style={styles.chatContainer}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.message,
                  item.sender === "user" ? styles.userMsg : styles.botMsg,
                ]}
              >
                <Text
                  style={{
                    color: item.sender === "user" ? "#fff" : "#2C3E50",
                    fontSize: 15,
                  }}
                >
                  {item.text}
                </Text>
              </View>
            )}
            contentContainerStyle={{ padding: 16 }}
          />
        </View>

        {/* 📩 Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe algo..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 💅 ESTILOS
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4A9FD8",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  voiceButton: {
    padding: 10,
    borderRadius: 25,
  },
  active: {
    backgroundColor: "#00D98E",
  },
  inactive: {
    backgroundColor: "#7F8C8D",
  },
  keyboardContainer: { flex: 1 },
  chatContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  message: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "80%",
  },
  userMsg: {
    backgroundColor: "#4A9FD8",
    alignSelf: "flex-end",
  },
  botMsg: {
    backgroundColor: "#E8E8E8",
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E1E8ED",
    backgroundColor: "#fff",
    fontSize: 15,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#4A9FD8",
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
