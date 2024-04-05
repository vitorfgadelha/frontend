import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

const ConfirmRemovalModal = (props) => {
  const [modal, setModal] = useState(false);
  const [participant, setParticipant] = useState({
    name: "",
    delivered: "",
    updated_at: "",
    obs: "",
  });

  const toggle = () => {
    setModal(!modal);
  };

  const getParticipantInfo = (id) => {
    axios.get(API_URL + id + "/").then((res) => {
      const formattedParticipant = {
        name: res.data.name,
        delivered: res.data.delivered,
        obs: res.data.obs,
        updated_at: formatInfo(res.data.updated_at),
      };
      setParticipant(formattedParticipant);
    });
  };

  useEffect(() => {
    if (modal) {
      getParticipantInfo(props.pk);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, props.pk]);

  const formatInfo = (date) => {
    const hour = date.substr(11, 5);
    const year = date.substr(0, 4);
    const month = date.substr(5, 2);
    const day = date.substr(8, 2);
    return hour + " " + day + "/" + month + "/" + year;
  };

  return (
    <>
      <Button color="secondary" onClick={toggle}>
        Check
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{`Participante ${participant.name} Tipo do Kit: Simples`}</ModalHeader>
        <div align="center">
          {`Kit ${participant.delivered ? "Entregue" : "a entregar"}`}
        </div>
        <div align="center">Entregue para: {participant.obs}</div>
        <div align="center">Última Atualização: {participant.updated_at}</div>
        <ModalFooter>
          <Button type="button" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ConfirmRemovalModal;
