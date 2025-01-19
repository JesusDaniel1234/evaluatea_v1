import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";
import { DataTable } from "react-native-paper";
import { useGeneralResults } from "../hooks/LoadGeneralResults";
import { useState } from "react";
import { ColorComponentRisk } from "../components/ColorComponentRisk";
import TargetCustomContainer from "../components/TargetCustomContainer";
import { formCommonStyles } from "../constants/formCommonStyles";
import ErrorComponent from "../components/ErrorComponent";

export default function GeneralResults({ navigation }) {
  const { loading, respuestas, error, retry } = useGeneralResults();
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage] = useState(8);
  const [filtredPresponses, setFiltredResponses] = useState("");
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, respuestas.length);
  const filterResponsesByName = () => {
    return respuestas.filter((element) => {
      const patientName = element.nombre_paciente;
      return patientName
        .toLowerCase()
        .startsWith(filtredPresponses.toLowerCase());
    });
  };

  if (loading) return <LoadingSpinnerComponent />;
  if (error) return <ErrorComponent retry={retry} />;
  return (
    <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
      <TargetCustomContainer style={{ paddingHorizontal: 10 }}>
        <View style={[formCommonStyles.formGroup, { paddingHorizontal: 15 }]}>
          <Text style={formCommonStyles.subTitle}>Buscar por Nombre</Text>
          <TextInput
            style={formCommonStyles.inputStyles}
            onChangeText={(text) => setFiltredResponses(text)}
          />
        </View>
        <View
          style={[
            formCommonStyles.formGroup,
            {
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: "column",
              gap: 10,
              marginHorizontal: 15,
            },
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={[styles.colorStyle, { backgroundColor: "green" }]}
            ></View>
            <Text>Bajo Riesgo</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={[styles.colorStyle, { backgroundColor: "yellow" }]}
            ></View>
            <Text>Moderado Riesgo</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={[styles.colorStyle, { backgroundColor: "red" }]}
            ></View>
            <Text>Alto Riesgo</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={[styles.colorStyle, { backgroundColor: "white" }]}
            ></View>
            <Text>No Realizado</Text>
          </View>
        </View>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 2 }}>Nombre</DataTable.Title>
            <DataTable.Title numeric style={styles.cellContainer}>
              MChatR
            </DataTable.Title>
            <DataTable.Title numeric style={styles.cellContainer}>
              QChat
            </DataTable.Title>
            <DataTable.Title numeric style={styles.cellContainer}>
              QChat10
            </DataTable.Title>
            <DataTable.Title numeric style={styles.cellContainer}>
              Riesgo
            </DataTable.Title>
          </DataTable.Header>

          {filterResponsesByName()
            .slice(from, to)
            .map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("DetallesPaciente", { patient: item })
                }
              >
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 2 }}>
                    <Text>{item.nombre_paciente}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.cellContainer}>
                    <ColorComponentRisk value={item.respuestas_mchtr} />
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.cellContainer}>
                    <ColorComponentRisk value={item.respuestas_qchat} />
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.cellContainer}>
                    <ColorComponentRisk value={item.respuestas_qchat10} />
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.cellContainer}>
                    <ColorComponentRisk
                      value={item.riesgo}
                      styles={styles.riskStyle}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ))}
          {filterResponsesByName().length === 0 && (
            <Text style={styles.textStyle}>No hay resultados</Text>
          )}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(respuestas.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${respuestas.length}`}
            numberOfItemsPerPage={numberOfItemsPerPageList}
            onItemsPerPageChange={itemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </TargetCustomContainer>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  cellContainer: {
    flex: 1,
    justifyContent: "center",
  },
  riskStyle: {
    width: 25,
    height: 25,
    borderWidth: 2,
  },
  textStyle: {
    fontWeight: "500",
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 20,
  },
  colorStyle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "black",
  },
});
