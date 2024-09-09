import React from "react";
import { Button, Text, View } from "react-native";

export default function QChat10({navigation}) {
  return (
    <View>
      <Text>QChat10</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("Inicio")} />
    </View>
  );
}
