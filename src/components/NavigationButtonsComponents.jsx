import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { formCommonStyles } from "../constants/formCommonStyles";
import Feather from "@expo/vector-icons/Feather";

export const NavigationButtons = ({
  index,
  totalQuestions,
  onNext,
  onPrevious,
  openForm,
  returnToInit,
}) => (
  <View style={[formCommonStyles.buttonContainer, { marginTop: 30, justifyContent:"flex-end" }]}>
    {index > 0 && (
      <>
        <TouchableOpacity
          onPress={() => returnToInit()}
          style={styles.touchableStyles}
        >
          <AntDesign name="reload1" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPrevious()}
          style={[formCommonStyles.cancelButton, { flex: 0.45 }]}
        >
          <Text style={formCommonStyles.buttonTextCancel}>Anterior</Text>
        </TouchableOpacity>
      </>
    )}
    {index < totalQuestions - 1 ? (
      <TouchableOpacity
        onPress={() => onNext()}
        style={[formCommonStyles.submitButton, { flex: 0.45 }]}
      >
        <Text style={formCommonStyles.buttonTextSubmit}>Siguiente</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[formCommonStyles.submitButton, { flex: 0.45 }]}
        onPress={() => openForm()}
      >
        <Feather
          style={{ textAlign: "center" }}
          name="send"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  touchableStyles: {
    borderWidth: 1,
    borderColor: "red",
    padding: 12,
    borderRadius: 4,
    flex: 0.1,
  },
});
