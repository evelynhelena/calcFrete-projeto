import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Form, Row, Card } from "react-bootstrap";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ValidaCampos from "../ValidaCompos/ValidaCampos";
import { Autocomplete } from "@mui/material";
function FormCalcFrete() {
  const [localEntrega, setLocalEntrega] = useState("");
  const [uf, setUF] = useState("");
  const [peso, setPeso] = useState("");
  const [valor, setValor] = useState(0.0);
  const [enviado, setEnviado] = useState(false);

  const ufs = [
    { id: 1, nomUF: "SP" },
    { id: 2, nomUF: "MG" },
    { id: 3, nomUF: "BH" },
    { id: 4, nomUF: "RJ" },
  ];

  const ufsParamns = {
    options: ufs,
    getOptionLabel: (option) => option.nomUF,
  };

  const handleChange = (event) => {
    setUF(event.target.value);
  };

  const handleSubmit = () => {
    console.log("ola mundo");
    const data = {};
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content">
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
                      disableCloseOnSelect
                      noOptionsText="Nenhum Registro"
                      renderInput={(params) => (
                        <TextField {...params} label="UF" variant="standard" />
                      )}
                    />
                  </Col>
                  <Col md={9} xs={9}>
                    <Autocomplete
                      {...ufsParamns}
                      id="city"
                      disableCloseOnSelect
                      noOptionsText="Nenhum Registro"
                      renderInput={(params) => (
                        <TextField {...params} label="Cidade" variant="standard" />
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
