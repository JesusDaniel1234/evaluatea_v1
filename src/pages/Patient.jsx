import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularButton from "../components/common/CircularButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FlatList } from "react-native";
import PatientItem from "../components/patient/PatientItem";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";

const useLoadLocalBDdata = () => {
  const db = useSQLiteContext();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await db.getAllAsync("SELECT * FROM patient");
        setPatients(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [db]);

  return { db, patients, loading };
};

export default function Patient({ navigation }) {
  const { db, patients, loading } = useLoadLocalBDdata();

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <View style={{ flex: 1 }}>
      <CircularButton onPress={() => navigation.navigate("FromularioPaciente")}>
        <View style={styles.buttonStyle}>
          <Text style={styles.textoButton}>
            <AntDesign name="plus" size={30} color="white" />
          </Text>
        </View>
      </CircularButton>
      {patients.length === 0 && (
        <Text style={{ fontWeight: "500" }}>No hay Pacientes</Text>
      )}
      <FlatList
        data={patients}
        renderItem={({ item }) => (
          <PatientItem item={item} db={db} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          alignItems: "center",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textoButton: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
  },
  buttonStyle: {
    backgroundColor: "#181818",
    justifyContent: "center",
    width: 60,
    borderRadius: 50,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
});
