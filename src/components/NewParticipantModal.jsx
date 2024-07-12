import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewParticipantForm from "./NewParticipantForm";

const NewParticipantModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const create = props.create;
  let title = "Editar Participante";
  let button = <Button onClick={toggle}>Editar</Button>;

  if (create) {
    title = "Criar novo participante";
    button = (
      <Button
        color="primary"
        className="float-right"
        onClick={toggle}
        style={{ minWidth: "200px" }}
        disabled
      >
        Criar Novo Participante
      </Button>
    );
  }

  return (
    <Fragment>
      {button}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <NewParticipantForm
            resetState={props.resetState}
            toggle={toggle}
            participant={props.participant}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default NewParticipantModal;
