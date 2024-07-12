import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

const ConfirmRemovalModal = ({ pk }) => {
  const [modal, setModal] = useState(false);
  const [participant, setParticipant] = useState({
    name: "",
    delivered: "",
    updated_at: "",
    name_delivered: "",
  });

  const toggle = () => {
    setModal(!modal);
  };

  const getParticipantInfo = (id) => {
    axios.get(`${API_URL}${id}/`).then((res) => {
      const formattedParticipant = {
        name: res.data.name,
        type: res.data.type,
        delivered: res.data.delivered,
        name_received: res.data.name_received,
        updated_at: formatInfo(res.data.updated_at),
      };
      setParticipant(formattedParticipant);
    });
  };

  useEffect(() => {
    if (modal) {
      getParticipantInfo(pk);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, pk]);

  const formatInfo = (date) => {
    if (!date) return "";
    const hour = date.substr(11, 5);
    const year = date.substr(0, 4);
    const month = date.substr(5, 2);
    const day = date.substr(8, 2);
    return `${hour} ${day}/${month}/${year}`;
  };

  return (
    <>
      <Button color="secondary" onClick={toggle}>
        Check
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="d-flex justify-content-center">
          <div className="text-center">
            {`${participant.name}`}
            <br />
            {`KIT ${participant.type}`}
          </div>
        </ModalHeader>
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          {`Kit ${participant.delivered ? "Entregue" : "a entregar"}`}
        </div>
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          Entregue para: {participant.name_received}
        </div>
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          Última Atualização: {participant.updated_at}
        </div>
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
