// src/screens/SplashScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require("../../assets/logo-conectados.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Conectados</Text>
        <Text style={styles.subtitle}>Cargando...</Text>
        <ActivityIndicator size="large" color="#4A9FD8" style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.card}>
        <Image source={require("../../assets/logo-conectados.png")} style={styles.logoBig} resizeMode="contain" />
        <Text style={styles.titleBig}>Conectados</Text>
        <Text style={styles.welcomeText}>Bienvenido a Conectados</Text>
        <Text style={styles.quote}>"Porque la distancia no separa el cariño"</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login" as never)}>
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#E8F8F5",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    width: "100%",
    maxWidth: 350,
    elevation: 6,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  logoBig: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  subtitle: {
    color: "#7F8C8D",
    marginTop: 8,
  },
  titleBig: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C3E50",
  },
  quote: {
    fontSize: 13,
    color: "#7F8C8D",
    fontStyle: "italic",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00D98E",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
