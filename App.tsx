import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./src/config/firebase";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <BottomTabNavigator />
      <StatusBar style="light" />
    </NavigationContainer>
    </QueryClientProvider>
    </Provider>
  );
}