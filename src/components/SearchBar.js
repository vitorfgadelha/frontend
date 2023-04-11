import React, { Component } from "react";
import { Col, Container, Input, Row } from "reactstrap";
import ParticipantList from "./ParticipantList";
import NewParticipantModal from "./NewParticipantModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    participants: []
  };

  componentDidMount() {
    this.resetState();
  }

  getParticipants = () => {
    axios.get(API_URL).then(res => this.setState({ participants: res.data }));
  };

  resetState = () => {
    this.getParticipants();
  };

  render() {
    return (
        <Input></Input>
    );
  }
}

export default Home;