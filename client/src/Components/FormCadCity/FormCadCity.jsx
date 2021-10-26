import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Card } from "react-bootstrap";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ValidaCampos from "../ValidaCompos/ValidaCampos";
import { Autocomplete } from "@mui/material";
import api from "../../services/Api.js";
import server from "../../Config/BaseURL";
function FormCadCity() {
    const [nonCity,setNonCity] = useState("");
    const [type,setType] = useState("");
    const [enviado,seEnviado] = useState(false);
    const [uf, setUF] = useState([]);
    const [ufsData, setUfsData] = useState([]);

    const resetValue = () =>{
        setNonCity("");
        setType("");
        setUF([]);
        seEnviado(false);
    }

    const getUF = async () => {
        try {
          const { data } = await api.get(`${server.url}uf`);
          if (data) setUfsData(data);
        } catch (err) {
          swal("Erro", "Erro ao carregar os usuários cadastrados", "error");
        }
      };
      useEffect(() => {
        getUF();
      }, []);

      const insertCity = async (newCity) => {
        try {
          const { data } = await api.post(`${server.url}cidade`,newCity);
          if (data){
              swal("Suceso", `${data.mensage}`, "success");
              resetValue();
          };
        } catch (err) {
          swal("Erro", "Erro ao inserir a cidade", "error");
        }
      };

      const ufsParamns = {
        options: ufsData,
        getOptionLabel: (option) => option.SIGLA_UF,
      };

      
  const handleSubmit = () => {
    seEnviado(true);
    if(nonCity.length > 0 && type.length > 0 && (null !== uf && uf.ID_UF) ){
        const data = {
            nomeCity:nonCity,
            tipoCity:type,
            idUF:uf.ID_UF,
        }
        insertCity(data);
    }

  };

    return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>Calcular Frete</Card.Header>
            <Card.Body>
              <Form noValidate autoComplete="off">
                <Row>
                  <Col md={2} xs={2}>
                    <Autocomplete
                      {...ufsParamns}
                      id="ufs"
                      clearOnBlur={true}
                      clearText="Limpar"
                      noOptionsText="Nenhum Registro"
                      onChange={(event, newValue) => {
                        setUF(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} 
                        label="UF*" 
                        variant="standard" 
                        error={(null === uf || !uf.ID_UF)  && enviado}
                        />
                      )}
                    />
                    {(null === uf || !uf.ID_UF)  && enviado ? (
                      <ValidaCampos value={"UF"}></ValidaCampos>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col md={4} xs={4}>
                  <TextField
                      id="type"
                      className="col-md-12"
                      label="Tipo*"
                      error={type.length === 0 && enviado}
                      autoComplete="current-siga"
                      value={type}
                      onChange={({ target }) => setType(target.value)}
                    />
                    {type.length === 0 && enviado ? (
                      <ValidaCampos value={"Tipo"}></ValidaCampos>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col md={6} xs={6}>
                  <TextField
                      id="nomCity"
                      className="col-md-12"
                      label="Nome Cidade*"
                      error={nonCity.length === 0 && enviado}
                      autoComplete="current-siga"
                      value={nonCity}
                      onChange={({ target }) => setNonCity(target.value)}
                    />
                    {nonCity.length === 0 && enviado ? (
                      <ValidaCampos value={"Nome Cidade"}></ValidaCampos>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
                <Row className="mt-5">
         
                </Row>
              </Form>
            </Card.Body>
            <Card.Footer className="text-right">
              <Button
                variant="contained"
                type="submit"
                color="primary"
                onClick={handleSubmit}
              >
                Cadastrar
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    )
}

export default FormCadCity
