import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecordatoriosProvider } from "./src/context/RecordatoriosContext";

import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ElderlyJoinScreen from "./src/screens/ElderlyJoin";
import DashboardElderly from "./src/screens/DashboardElderly";
import DashboardFamiliar from "./src/screens/DashboardFamiliar";
import RecordatoriosScreen from "./src/screens/RecordatoriosScreen";
import NuevoRecordatorio from "./src/screens/NuevoRecordatorio";
import NotasScreen from "./src/screens/NotasScreen";
import NotasFamiliarScreen from "./src/screens/NotasFamiliarScreen";
import ResumenFamiliarScreen from "./src/screens/ResumenFamiliarScreen";
import DiarioScreen from "./src/screens/DiarioScreen";
import { GaleriaProvider } from "./src/context/GaleriaContext";
import GaleriaScreen from "./src/screens/GaleriaScreen";
import ChatbotScreen from "./src/screens/ChatbotScreen";
import ChatFamiliarScreen from "./src/screens/ChatFamiliarScreen";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  ElderlyJoin: undefined;
  DashboardFamiliar: undefined;
  DashboardElderly: undefined;
  Recordatorios: undefined;
  NuevoRecordatorio: undefined;
  Notas: undefined;
  NotasFamiliar: undefined;
  ResumenFamiliar: undefined;
  Diario: undefined;
  Galeria: undefined;
  Chatbot: undefined;
  ChatFamiliar: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (

    <RecordatoriosProvider>
      <GaleriaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ElderlyJoin" component={ElderlyJoinScreen} />
          <Stack.Screen name="DashboardFamiliar" component={DashboardFamiliar} />
          <Stack.Screen name="DashboardElderly" component={DashboardElderly} />
          <Stack.Screen name="Recordatorios" component={RecordatoriosScreen} />
          <Stack.Screen name="NuevoRecordatorio" component={NuevoRecordatorio} />
          <Stack.Screen name="Notas" component={NotasScreen} />
          <Stack.Screen name="NotasFamiliar" component={NotasFamiliarScreen} />
          <Stack.Screen name="ResumenFamiliar" component={ResumenFamiliarScreen} />
          <Stack.Screen name="Diario" component={DiarioScreen} />
          <Stack.Screen name="Galeria" component={GaleriaScreen} />
          <Stack.Screen name="Chatbot" component={ChatbotScreen} />
          <Stack.Screen name="ChatFamiliar" component={ChatFamiliarScreen} />

        </Stack.Navigator>
       </NavigationContainer>
  </GaleriaProvider>
</RecordatoriosProvider>
  );
}
