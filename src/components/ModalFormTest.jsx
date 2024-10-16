import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function ModalFormTest({ navigation, route }) {
  const props = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: "Formulario",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate(props.test)}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [props.test]);

  return (
    <View>
      <Text>ModalFormTest</Text>
    </View>
  );
}
