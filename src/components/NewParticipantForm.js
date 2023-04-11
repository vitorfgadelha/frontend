import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewParticipantForm extends React.Component {
  state = {
    bib: "",
    name: "",
    gender: "",
    dob: "",
    cpf: "",
    course: "",
    shirt: "",
  };

  componentDidMount() {
    if (this.props.participant) {
      const { bib, name, gender, dob, cpf, course, shirt} = this.props.participant;
      this.setState({ bib, name, gender, dob, cpf, course, shirt});
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createParticipant = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editParticipant = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.bib + '/', this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.participant ? this.editParticipant : this.createParticipant}>
        <FormGroup>
          <Label for="bib">Bib:</Label>
          <Input
            type="number"
            name="bib"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.bib)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">Nome:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">Sexo: (F ou M)</Label>
          <Input
            type="text"
            name="gender"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.gender)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="dob">Data de Nascimento:</Label>
          <Input
            type="date"
            format="DD-MM-YYYY"
            name="dob"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.dob)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="cpf">CPF:</Label>
          <Input
            type="text"
            name="cpf"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.cpf)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="course">Prova:</Label>
          <Input
            type="text"
            name="course"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.course)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="shirt">Camisa:</Label>
          <Input
            type="text"
            name="shirt"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.shirt)}
          />
        </FormGroup>
        <Button>Enviar</Button>
      </Form>
    );
  }
}

export default NewParticipantForm;