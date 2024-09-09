import React from "react";
import { Button, Text, View } from "react-native";

export default function QChat({navigation}) {
  return (
    <View>
      <Text>QChat</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("Inicio")} />
    </View>
  );
}
