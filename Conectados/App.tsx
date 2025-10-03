import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ElderlyJoinScreen from "./src/screens/ElderlyJoin";
import DashboardElderly from "./src/screens/DashboardElderly";
import DashboardFamiliar from "./src/screens/DashboardFamiliar";


export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  ElderlyJoin: undefined;
  DashboardFamiliar: undefined;
  DashboardElderly: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ElderlyJoin" component={ElderlyJoinScreen} />
        <Stack.Screen name="DashboardFamiliar" component={DashboardFamiliar} />
        <Stack.Screen name="DashboardElderly" component={DashboardElderly} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
