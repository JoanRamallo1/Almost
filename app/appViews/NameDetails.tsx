import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

interface RouteParams {
  name?: string;
  calories?: number;
  fat?: number;
}

export default function NameDetails({ route }: { route: RouteParams }) {
  //const { name, calories, fat } = route?.params || {}; // Safe destructuring
  const { name, calories, fat } = useLocalSearchParams(); // This replaces route

  console.log(name, calories, fat);
  console.log(route);
  return (
    <View style={styles.container}>
      <Text>Naaaabcdaame: {name || "N/A"}</Text>
      <Text>Calories: {calories || "N/A"}</Text>
      <Text>Fat: {fat || "N/A"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
