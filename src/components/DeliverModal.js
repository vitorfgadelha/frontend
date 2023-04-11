import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import { Input } from "reactstrap";
import axios from "axios";

import { API_URL } from "../constants";

class DeliverModal extends Component {

  state = {
    modal: false,
  };

  participantState = {
    bib:"",
    name:"",
    dob: "",
    updated_at:"",
    delivered: true,
    obs:"",
  }

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deliverKit = bib => {
    axios.get(API_URL + bib + '/').then(res => {
      axios.put(API_URL + bib + '/', {bib: bib, name: res.data.name, delivered: this.participantState.delivered ,obs: this.participantState.obs, dob: res.data.dob})
      .then(() =>{
        if(alert("Entrega Realizada para " + this.participantState.obs)){}
        else
          window.location.reload(); 
      })
      this.toggle()
  })
  }

  handleDelivery(e) {
    this.participantState.obs = e.target.value
  }

  render() {
    return (
      <Fragment>
        <Button disabled={this.props.delivered ? true : false}
                color={this.props.delivered ? "success" : "primary"}
                onClick={() => this.toggle()}>
          {this.props.delivered ? "Entregue": "Entregar"}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Você deseja entregar esse Kit?
          </ModalHeader>
          <Input
          placeholder="Quem irá receber?"
          style = {{width: "400px"}}
          value={this.state.amount}
          onChange={(value) => this.handleDelivery(value)}
          ></Input>
          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancelar
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deliverKit(this.props.pk)}
            >
              Sim
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default DeliverModal;