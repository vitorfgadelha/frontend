import React, { Component } from "react";
import { Col, Container, Input, Row } from "reactstrap";
import ParticipantList from "./ParticipantList";
import NewParticipantModal from "./NewParticipantModal";

import axios from "axios";

import { API_URL } from "../constants";
import ListingPageContainer from "./ListingPageContainer";

class Home extends Component {
  state = {
    participants: []
  };

  count = {
    delivered: 0,
    not_delivered: 0,
  };

  componentDidMount() {
    this.resetState();
    axios.get(API_URL + 'count_delivered/').then(res => {
      this.count.delivered = res.data
  })
    axios.get(API_URL + 'count_not_delivered/').then(res => {
    this.count.not_delivered = res.data
  })
}

  getParticipants = () => {
    axios.get(API_URL).then(res =>this.setState({ participants: res.data.results }));
    };

  resetState = () => {
    this.getParticipants();
  };

  onChange(e) {
    axios.get(API_URL + '?search=' + e.target.value).then(res => this.setState({ participants: res.data.results }));
  }

  handleScroll() {

  }

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
        <Input align="center"
                placeholder="Pesquisar Nome ou CPF"
                style={{ width:"500px"}}
                value={this.state.amount}
                onChange={(value) => this.onChange(value)}
                ></Input>
          </Col>
          <Col>
          <div>Kits Entregues: {this.count.delivered}</div>
          </Col>
          <Col>
          <div>Kits a entregar: {this.count.not_delivered}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <ParticipantList
              participants={this.state.participants}
              resetState={this.resetState}>
            </ParticipantList>
          </Col>
        </Row>
        <Row>
          <Col>
            <NewParticipantModal create={true} resetState={this.resetState}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;