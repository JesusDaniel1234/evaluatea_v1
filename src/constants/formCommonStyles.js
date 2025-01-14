import { StyleSheet } from "react-native";
import { constant } from "./constants";

export const formCommonStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleHeader: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
    color: constant.primaryColor,
  },
  formGroup: {
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 15,
    marginBottom: -9,
    zIndex: 10,
    backgroundColor: "white",
    marginLeft: 10,
    flexShrink: 1,
    alignSelf: "flex-start",
  },
  inputStyles: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    gap: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    width: "50%",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    width: "50%",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 4,
    width: "50%",
  },
  buttonTextSubmit: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextCancel: {
    fontSize: 18,
    color: "#007bff",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextDelete: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 2,
    marginLeft: 2,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontStyle: "italic",
  },
});
