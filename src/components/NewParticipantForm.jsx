import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

const NewParticipantForm = (props) => {
  const [state, setState] = useState({
    bib: "",
    name: "",
    gender: "",
    dob: "",
    cpf: "",
    course: "",
    shirt: "",
    type: "",
    team: "",
  });

  useEffect(() => {
    if (props.participant) {
      const { bib, name, gender, dob, cpf, course, shirt, type, team } =
        props.participant;
      setState({ bib, name, gender, dob, cpf, course, shirt, type, team });
    }
  }, [props.participant]);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
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
    axios.put(API_URL + state.bib + "/", state).then(() => {
      props.resetState();
      props.toggle();
    });
  };

  const defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  return (
    <Form onSubmit={props.participant ? editParticipant : createParticipant}>
      <FormGroup>
        <Label for="bib">Bib:</Label>
        <Input
          type="number"
          name="bib"
          onChange={onChange}
          value={defaultIfEmpty(state.bib)}
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
        <Label for="gender">Sexo: (F ou M)</Label>
        <Input
          type="text"
          name="gender"
          onChange={onChange}
          value={defaultIfEmpty(state.gender)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="dob">Data de Nascimento:</Label>
        <Input
          type="date"
          format="DD-MM-YYYY"
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
        <Label for="course">Prova:</Label>
        <Input
          type="text"
          name="course"
          onChange={onChange}
          value={defaultIfEmpty(state.course)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="shirt">Camisa:</Label>
        <Input
          type="text"
          name="shirt"
          onChange={onChange}
          value={defaultIfEmpty(state.shirt)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="type">Tipo do Kit:</Label>
        <Input
          type="text"
          name="type"
          onChange={onChange}
          value={defaultIfEmpty(state.type)}
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

      <Button>Enviar</Button>
    </Form>
  );
};

export default NewParticipantForm;
