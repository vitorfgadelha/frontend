import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, Button, ModalFooter, Input } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

const DeliverModal = (props) => {
  const [modal, setModal] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [participantState, setParticipantState] = useState({
    delivered: true,
    name_received: "",
  });

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal && props.pk) {
      fetchParticipantInfo(props.pk);
    }
  }, [modal, props.pk]);

  const fetchParticipantInfo = (id) => {
    axios.get(API_URL + id + "/").then((res) => {
      const formattedParticipant = {
        ...res.data,
        dob: formatDOB(res.data.dob),
      };
      setParticipant(formattedParticipant);
    });
  };

  const formatDOB = (dob) => {
    if (!dob) return "";
    const date = new Date(dob);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const deliverKit = () => {
    const { id, delivered, name_received } = participantState;
    axios
      .put(API_URL + props.pk + "/", {
        id,
        delivered,
        name_received,
      })
      .then(() => {
        if (alert(`Entrega realizada para ${participantState.name_received}`)) {
        } else window.location.reload();
        toggle();
        if (props.onDeliveryComplete) {
          props.onDeliveryComplete();
        }
      })
      .catch((error) => {
        console.error("Erro ao entregar kit:", error);
      });
  };

  const handleDelivery = (e) => {
    setParticipantState({ ...participantState, name_received: e.target.value });
  };

  return (
    <>
      <Button
        disabled={props.delivered}
        color={props.delivered ? "success" : "primary"}
        onClick={toggle}
      >
        {props.delivered ? "Entregue" : "Entregar"}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        {participant && (
          <>
            <ModalHeader>{`Entregar Kit para ${participant.name}`}</ModalHeader>
            <div style={styles.participantInfo}>
              <div>
                <strong>Número:</strong> {participant.id}
              </div>
              <div>
                <strong>Chip:</strong> {participant.chip}
              </div>
              <div>
                <strong>Sexo:</strong> {participant.gender}
              </div>
              <div>
                <strong>Data de Nascimento:</strong> {participant.dob}
              </div>
              <div>
                <strong>CPF:</strong> {participant.cpf}
              </div>
              <div>
                <strong>Modalidade:</strong> {participant.course}
              </div>
              <div>
                <strong>Grupo:</strong> {participant.group}
              </div>
              <div>
                <strong>Camiseta:</strong> {participant.shirt}
              </div>
              <div>
                <strong>Tipo do Kit:</strong> {participant.type}
              </div>
              <div>
                <strong>Equipe:</strong> {participant.team}
              </div>
              <div>
                <strong>País:</strong> {participant.nation}
              </div>
              <div>
                <strong>Gravação de Medalha:</strong>{" "}
                {participant.medal_record ? "Sim" : "Não"}
              </div>
              <div>
                <strong>Camiseta Finisher:</strong> {participant.finisher}
              </div>
              <div>
                <strong>Camiseta Extra:</strong> {participant.extra_shirt}
              </div>
              <div>
                <strong>Telefone:</strong> {participant.phone}
              </div>
              <div>
                <strong>Email:</strong> {participant.email}
              </div>
              {/* Add other fields as needed */}
            </div>
            <Input
              placeholder="Quem irá receber?"
              style={{ width: "auto", marginTop: "10px" }}
              value={participantState.name_received}
              onChange={handleDelivery}
            />
            <ModalFooter>
              <Button type="button" onClick={toggle}>
                Cancelar
              </Button>
              <Button type="button" color="primary" onClick={deliverKit}>
                Confirmar Entrega
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  );
};

const styles = {
  participantInfo: {
    padding: "15px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "15px",
  },
};

export default DeliverModal;
