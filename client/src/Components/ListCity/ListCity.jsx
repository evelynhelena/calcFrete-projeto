import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { FaAngleUp } from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';
import DataTable from "react-data-table-component";
import api from "../../services/Api.js";
import server from "../../Config/BaseURL";
import swal from "sweetalert";
import IconButton from "@mui/material/IconButton";
function ListCity() {
  const [cities, setCities] = useState([]);
  const columns = [
    {
      name: "ID",
      selector:  row => `${ row.ID }`,
      sortable: true,
    },
    {
      name: "Cidade",
      selector: row => `${ row.NOME_CIDADE }`,
      sortable: false,
    },
    {
      name: "Tipo Cidade",
      selector:  row => `${ row.TIPO_CIDADE }`,
      sortable: false,
    },
    {
      name: "Estado",
      selector:  row => `${ row.SIGLA_UF }`,
      sortable: false,
    },
    {
      name: "Ações",
      cell: (data) => (
        <>
          <IconButton color="secondary" aria-label="add an alarm" onClick={() => deleteVend(data.ID)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const getCities = async () => {
    try {
      const { data } = await api.get(`${server.url}cidade`);
      if (data) setCities(data);
    } catch (err) {
      swal("Erro", "Erro ao carregar os usuários cadastrados", "error");
    }
  };
  useEffect(() => {
    getCities();
  }, []);


  const deleteVend = (idCity) => {
    swal({
      title: "Atenção !",
      text: "Deseja deletar está Cidade ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const { data } = await api.delete(
            `${server.url}cidade/` + idCity,
          );
          if (data) {
            swal("Sucesso", "Cidade deletada com sucesso", "success");
            getCities();
          }
        } catch {
          swal("Erro ao deletar a cidade", {
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <Container className="mt-5 mb-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card>
            <Card.Header>Listagem de Cidades</Card.Header>
            <Card.Body>
              <DataTable
                columns={columns}
                data={cities}
                defaultSortFieldId={1}
                sortIcon={<FaAngleUp />}
                noDataComponent="Nenhum Registro Encontrado"
                pagination
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ListCity;
