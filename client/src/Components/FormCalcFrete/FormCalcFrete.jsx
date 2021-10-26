import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Form, Row, Card } from "react-bootstrap";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ValidaCampos from "../ValidaCompos/ValidaCampos";
import { Autocomplete } from "@mui/material";
import api from "../../services/Api.js";
import server from "../../Config/BaseURL";
function FormCalcFrete() {
  const [localEntrega, setLocalEntrega] = useState("");
  const [uf, setUF] = useState([]);
  const [ufsData, setUfsData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [city, setCity] = useState([]);
  const [peso, setPeso] = useState("");
  const [valor, setValor] = useState(0.0);
  const [enviado, setEnviado] = useState(false);

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

  const getCityByName = async (name) => {
    try {
      const { data } = await api.get(`${server.url}cidade/name/${name}`);
      if (data) setCityData(data);
    } catch (err) {
      swal("Erro", "Erro ao carregar os usuários cadastrados", "error");
    }
  };

  const ufsParamns = {
    options: ufsData,
    getOptionLabel: (option) => option.SIGLA_UF,
  };

  const cityParams = {
    options: cityData,
    getOptionLabel: (option) => `${option.ID} -  ${option.NOME_CIDADE}`,
  };


  const handleSubmit = () => {
    console.log("ola mundo");
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
                  <Col md={3} xs={3}>
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
                        <TextField {...params} label="UF" variant="standard" />
                      )}
                    />
                  </Col>
                  <Col md={9} xs={9}>
                    <Autocomplete
                      {...cityParams}
                      id="city"
                      clearOnBlur={true}
                      clearText="Limpar"
                      noOptionsText="Nenhum Registro"
                      onChange={(event, newValue) => {
                        setCity(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Cidade" variant="standard"  
                        onChange={({target}) => {
                          getCityByName(target.value);
                      }} />
                      )}
                    />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col md={6} xs={6}>
                    <TextField
                      id="siga"
                      className="col-md-12"
                      label="Peso"
                      autoComplete="current-siga"
                      value={peso}
                      onChange={({ target }) => setPeso(target.value)}
                    />
                    {peso.length === 0 && enviado ? (
                      <ValidaCampos value={"Peso"}></ValidaCampos>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col md={6} xs={6}>
                    <TextField
                      id="siga"
                      className="col-md-12"
                      label="Valor (R$)"
                      autoComplete="current-siga"
                      value={valor}
                      onChange={({ target }) => setValor(target.value)}
                    />
                    {valor.length === 0 && enviado ? (
                      <ValidaCampos value={"Valor"}></ValidaCampos>
                    ) : (
                      ""
                    )}
                  </Col>
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
                Calcular
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FormCalcFrete;
