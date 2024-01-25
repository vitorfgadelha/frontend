import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class ConfirmRemovalModal extends Component {
  state = {
    modal: false,
  };

  participant = {
    name: "",
    delivered: "",
    updated_at: "",
    obs: "",
  };

  toggle = () => {
    this.setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  getParticipantInfo = (id) => {
    axios.get(API_URL + id + "/").then((res) => {
      this.participant.name = res.data.name;
      this.participant.delivered = res.data.delivered;
      this.participant.obs = res.data.obs;
      this.participant.updated_at = this.formatInfo(res.data.updated_at);
    });
  };

  formatInfo(date) {
    const hour = date.substr(11, 5);
    const year = date.substr(0, 4);
    const month = date.substr(5, 2);
    const day = date.substr(8, 2);
    return hour + " " + day + "/" + month + "/" + year;
  }

  render() {
    return (
      <Fragment>
        <Button color="secondary" onClick={() => this.toggle()}>
          Check
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            isopen={this.getParticipantInfo(this.props.pk)}
            toggle={this.toggle}
          >
            Participante {this.participant.name} Tipo do Kit: Simples
          </ModalHeader>
          <div align="center">
            Kit {this.participant.delivered ? "Entregue" : "a entregar"}
          </div>
          <div align="center">Entregue para: {this.participant.obs}</div>
          <div align="center">
            Última Atualização: {this.participant.updated_at}
          </div>
          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ConfirmRemovalModal;
