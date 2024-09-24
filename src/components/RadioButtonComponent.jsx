import { StyleSheet, View, Text } from "react-native";
import { RadioButton } from "react-native-paper";

export default RadioButtonComponent = ({ label, value }) => (
  <View style={styles.radioButtonContent}>
    <RadioButton value={value} />
    <Text style={styles.textRadioButon}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  radioButtonContent: { flexDirection: "row", alignItems: "center" },
  textRadioButon: { fontSize: 18 },
});
