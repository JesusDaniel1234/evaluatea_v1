import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { UserContext } from "../context/UserProvider";
import useLoadResultsTests from "../hooks/LoadResultsTests";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";
import { DataTable } from "react-native-paper";

export default function ResultsTests({ navigation, route }) {
  const { userToken } = useContext(UserContext);
  const test = route.params.test;
  const { respuestas, loading } = useLoadResultsTests(userToken, test);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage] = useState(15);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, respuestas.length);

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title numeric>Edad-Meses</DataTable.Title>
          <DataTable.Title numeric>Fecha</DataTable.Title>
        </DataTable.Header>

        {respuestas.slice(from, to).map((item) => (
          <TouchableOpacity key={item.id}>
            <DataTable.Row>
              <DataTable.Cell style={{ flex: 0.4 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DetallesResultados", {
                      token: userToken,
                      id: item.id,
                      test: test,
                    })
                  }
                >
                  <Text>{item.datos_personales.nombre_paciente}</Text>
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 0.3 }}>
                {item.datos_personales.edad_paciente_meses}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 0.3 }}>
                {item.fecha_corta}
              </DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))}

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
    </View>
  );
}
