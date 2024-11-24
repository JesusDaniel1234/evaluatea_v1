import { Text, ScrollView } from "react-native";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";
import { DataTable } from "react-native-paper";
import { useGeneralResults } from "../hooks/LoadGeneralResults";
import { useState } from "react";

export default function GeneralResults() {
  const { loading, respuestas } = useGeneralResults();

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage] = useState(14);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, respuestas.length);

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 0.4 }}>Nombre</DataTable.Title>
          <DataTable.Title numeric style={{ flex: 0.15 }}>
            MChat
          </DataTable.Title>
          <DataTable.Title numeric style={{ flex: 0.15 }}>
            QChat
          </DataTable.Title>
          <DataTable.Title numeric style={{ flex: 0.15 }}>
            QChat10
          </DataTable.Title>
          <DataTable.Title numeric style={{ flex: 0.15 }}>
            %Riesgo
          </DataTable.Title>
        </DataTable.Header>

        {respuestas.slice(from, to).map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{ flex: 0.4 }}>
              <Text>{item.nombre_paciente}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric style={{ flex: 0.15 }}>
              {item.respuestas_mchtr}
            </DataTable.Cell>
            <DataTable.Cell numeric style={{ flex: 0.15 }}>
              {item.respuestas_qchat}
            </DataTable.Cell>
            <DataTable.Cell numeric style={{ flex: 0.15 }}>
              {item.respuestas_qchat10}
            </DataTable.Cell>
            <DataTable.Cell numeric style={{ flex: 0.15 }}>
              {item.riesgo}%
            </DataTable.Cell>
          </DataTable.Row>
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
    </ScrollView>
  );
}
