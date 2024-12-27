import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./src/config/firebase";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <BottomTabNavigator />
      <StatusBar style="light" />
    </NavigationContainer>
    </QueryClientProvider>
  );
}