import React from "react";
import { Button, Text, View } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("Inicio")} />
    </View>
  );
}
