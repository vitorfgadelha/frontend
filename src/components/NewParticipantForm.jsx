import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

const GENDER_CHOICES = [
  { value: "M", label: "M" },
  { value: "F", label: "F" },
];

const SHIRT_SIZES = [
  { value: "BL PP", label: "BL PP" },
  { value: "BL P", label: "BL P" },
  { value: "BL M", label: "BL M" },
  { value: "BL G", label: "BL G" },
  { value: "PP", label: "PP" },
  { value: "P", label: "P" },
  { value: "M", label: "M" },
  { value: "G", label: "G" },
  { value: "GG", label: "GG" },
  { value: "XG", label: "XG" },
];

const GROUP_CHOICES = [
  { value: "CADEIRANTE", label: "CADEIRANTE" },
  { value: "VISUAL", label: "VISUAL" },
  { value: "ELITE", label: "ELITE" },
  { value: "PUBLICO GERAL", label: "PUBLICO GERAL" },
  { value: "PCD", label: "PCD" },
];

const COURSE_CHOICES = [
  { value: "5K", label: "5K" },
  { value: "10K", label: "10K" },
  { value: "21K", label: "21K" },
  { value: "42K", label: "42K" },
  { value: "21K ELITE", label: "21K ELITE" },
  { value: "42K ELITE", label: "42K ELITE" },
];

const KIT_CHOICES = [
  { value: "VIP", label: "VIP" },
  { value: "SIMPLES", label: "SIMPLES" },
  { value: "TRADICIONAL", label: "TRADICIONAL" },
];

const NewParticipantForm = (props) => {
  const [state, setState] = useState({
    id: "",
    name: "",
    gender: "",
    dob: "",
    cpf: "",
    course: "",
    group: "",
    shirt: "",
    type: "",
    team: "",
    phone: "",
    email: "",
    nation: "",
    medal_record: false,
    finisher: "",
    fisio: false,
    extra_shirt: "",
  });

  useEffect(() => {
    if (props.participant) {
      const {
        id,
        name,
        gender,
        dob,
        cpf,
        course,
        group,
        shirt,
        type,
        team,
        phone,
        email,
        nation,
        medal_record,
        finisher,
        fisio,
        extra_shirt,
      } = props.participant;
      setState({
        id,
        name,
        gender,
        dob,
        cpf,
        course,
        group,
        shirt,
        type,
        team,
        phone,
        email,
        nation,
        medal_record,
        finisher,
        fisio,
        extra_shirt,
      });
    }
  }, [props.participant]);

  const onChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState({ ...state, [e.target.name]: value });
  };

  const createParticipant = (e) => {
    e.preventDefault();
    axios.post(API_URL, state).then(() => {
      props.resetState();
      props.toggle();
    });
  };

  const editParticipant = (e) => {
    e.preventDefault();
    axios.put(API_URL + state.id + "/", state).then(() => {
      props.resetState();
      props.toggle();
    });
  };

  const defaultIfEmpty = (value) => {
    return value === null || value === undefined ? "" : value;
  };

  return (
    <Form onSubmit={props.participant ? editParticipant : createParticipant}>
      <Row form>
        {/* First Column */}
        <Col md={6}>
          <FormGroup>
            <Label for="id">Número:</Label>
            <Input
              type="number"
              name="id"
              onChange={onChange}
              value={defaultIfEmpty(state.id)}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Nome:</Label>
            <Input
              type="text"
              name="name"
              onChange={onChange}
              value={defaultIfEmpty(state.name)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="gender">Sexo:</Label>
            <Input
              type="select"
              name="gender"
              onChange={onChange}
              value={defaultIfEmpty(state.gender)}
            >
              <option value="">Selecione o Sexo</option>
              {GENDER_CHOICES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="dob">Nascimento:</Label>
            <Input
              type="date"
              name="dob"
              onChange={onChange}
              value={defaultIfEmpty(state.dob)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="cpf">CPF:</Label>
            <Input
              type="text"
              name="cpf"
              onChange={onChange}
              value={defaultIfEmpty(state.cpf)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Telefone:</Label>
            <Input
              type="text"
              name="phone"
              onChange={onChange}
              value={defaultIfEmpty(state.phone)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="course">Percurso:</Label>
            <Input
              type="select"
              name="course"
              onChange={onChange}
              value={defaultIfEmpty(state.course)}
            >
              <option value="">Distância</option>
              {COURSE_CHOICES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="shirt">Camiseta:</Label>
            <Input
              type="select"
              name="shirt"
              onChange={onChange}
              value={defaultIfEmpty(state.shirt)}
            >
              <option value="">Tamanho</option>
              {SHIRT_SIZES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>

        {/* Second Column */}
        <Col md={6}>
          <FormGroup>
            <Label for="chip">Chip:</Label>
            <Input
              type="text"
              name="chip"
              onChange={onChange}
              value={defaultIfEmpty(state.chip)}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="team">Equipe:</Label>
            <Input
              type="text"
              name="team"
              onChange={onChange}
              value={defaultIfEmpty(state.team)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="group">Grupo:</Label>
            <Input
              type="select"
              name="group"
              onChange={onChange}
              value={defaultIfEmpty(state.group)}
            >
              <option value="">Grupo</option>
              {GROUP_CHOICES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="type">Kit:</Label>
            <Input
              type="select"
              name="type"
              onChange={onChange}
              value={defaultIfEmpty(state.type)}
            >
              <option value="">Tipo de Kit</option>
              {KIT_CHOICES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="finisher">Finisher:</Label>
            <Input
              type="select"
              name="finisher"
              onChange={onChange}
              value={defaultIfEmpty(state.finisher)}
            >
              <option value="">Tamanho</option>
              {SHIRT_SIZES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="extra_shirt">Extra Shirt:</Label>
            <Input
              type="select"
              name="extra_shirt"
              onChange={onChange}
              value={defaultIfEmpty(state.extra_shirt)}
            >
              <option value="">Tamanho</option>
              {SHIRT_SIZES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="nation">País:</Label>
            <Input
              type="text"
              name="nation"
              onChange={onChange}
              value={defaultIfEmpty(state.nation)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">E-mail:</Label>
            <Input
              type="email"
              name="email"
              onChange={onChange}
              value={defaultIfEmpty(state.email)}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="medal_record"
                onChange={onChange}
                checked={state.medal_record}
              />
              Gravação de Medalha
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="fisio"
                onChange={onChange}
                checked={state.fisio}
              />
              Fisioterapia
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <Button>Submit</Button>
    </Form>
  );
};

export default NewParticipantForm;
