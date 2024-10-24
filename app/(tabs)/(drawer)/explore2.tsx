import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function TabTwoScreen() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Button clicked ${count} times`);
  }, [count]);
  useEffect(() => {
    console.log("Screen is focused");
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen is focused");

      return () => {
        console.log("Screen is unfocused");
        // Perform any cleanup here
      };
    }, []),
  );

  return (
    <View>
      <Text>Button clicked {count} times</Text>
      <Button title="Click me" onPress={() => setCount(count + 1)} />
    </View>
  );
}
// Custom hook to log the count
/*
function useLogCount(count: number) {
  useEffect(() => {
    console.log(`Count value is ${count}`);
  }, [count]);
}

// Usage of the custom hook
useLogCount(count);
*/
