import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, Button, ModalFooter, Input } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

const DeliverModal = (props) => {
  const [modal, setModal] = useState(false);
  const [participant, setParticipant] = useState({ name: "", type: "" });
  const [participantState, setParticipantState] = useState({
    bib: "",
    name: "",
    dob: "",
    updated_at: "",
    delivered: true,
    obs: "",
  });

  const toggle = () => {
    setModal(!modal);
  };

  const deliverKit = (bib) => {
    axios.get(API_URL + bib + "/").then((res) => {
      axios
        .put(API_URL + bib + "/", {
          bib: bib,
          name: res.data.name,
          delivered: participantState.delivered,
          obs: participantState.obs,
          dob: res.data.dob,
        })
        .then(() => {
          if (alert("Entrega Realizada para " + participantState.obs)) {
          } else window.location.reload();
        });
      toggle();
    });
  };

  const handleDelivery = (e) => {
    setParticipantState({ ...participantState, obs: e.target.value });
  };

  useEffect(() => {
    if (modal) {
      getParticipantInfo(props.pk);
    }
  }, [modal, props.pk]);

  const getParticipantInfo = (id) => {
    axios.get(API_URL + id + "/").then((res) => {
      setParticipant({ name: res.data.name, type: res.data.type });
    });
  };

  return (
    <>
      <Button
        disabled={props.delivered ? true : false}
        color={props.delivered ? "success" : "primary"}
        onClick={toggle}
      >
        {props.delivered ? "Entregue" : "Entregar"}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{`Você deseja entregar kit ${participant.type} para ${participant.name}?`}</ModalHeader>
        <Input
          placeholder="Quem irá receber?"
          style={{ width: "400px" }}
          value={participantState.obs}
          onChange={handleDelivery}
        ></Input>
        <ModalFooter>
          <Button type="button" onClick={toggle}>
            Cancelar
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => deliverKit(props.pk)}
          >
            Sim
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeliverModal;
