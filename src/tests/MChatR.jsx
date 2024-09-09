import React from "react";
import { Button, Text, View } from "react-native";

export default function MChatR({navigation}) {
  return (
    <View>
      <Text>MChatR</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("Inicio")} />
    </View>
  );
}
