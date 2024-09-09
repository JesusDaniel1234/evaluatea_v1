import React from "react";
import { Button, Text, View } from "react-native";

export default function Tests({navigation}) {
  return (
    <View>
      <Text>Test</Text>
      <Button title="Go Back" onPress={()=> navigation.navigate("Inicio")} />
    </View>
  );
}
