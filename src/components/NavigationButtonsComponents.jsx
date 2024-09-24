import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export const NavigationButtons = ({
  index,
  totalQuestions,
  onNext,
  onPrevious,
}) => (
  <View style={styles.buttonsContainer}>
    {index > 0 && (
      <TouchableOpacity
        onPress={() => onPrevious()}
        style={styles.touchableStyles}
      >
        <Text style={styles.textColor}>Anterior</Text>
      </TouchableOpacity>
    )}
    {index < totalQuestions - 1 ? (
      <TouchableOpacity onPress={() => onNext()} style={styles.touchableStyles}>
        <Text style={styles.textColor}>Siguiente</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.touchableStyles}>
        <Text style={styles.textColor}>Guardar Resultados</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 4,
    marginTop: 20,
  },
  touchableStyles: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  textColor: {
    color: "#fff",
  },
});
