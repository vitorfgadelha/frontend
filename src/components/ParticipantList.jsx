import React from "react";
import { Table } from "reactstrap";
import NewParticipantModal from "./NewParticipantModal";
import DeliverModal from "./DeliverModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

const ParticipantList = (props) => {
  const participants = props.participants;

  return (
    <div>
      <Table hover responsive>
        <thead>
          <tr align="center">
            <th align="center">Nº</th>
            <th align="center">NOME</th>
            <th align="center">SEXO</th>
            <th align="center">DOB</th>
            <th align="center">CPF</th>
            <th align="center">PROVA</th>
            <th align="center">CAMISA</th>
            <th align="center">TIPO</th>
            <th align="center">EQUIPE</th>
            <th align="center">ENTREGUE</th>
          </tr>
        </thead>
        <tbody>
          {!participants || participants.length <= 0 ? (
            <tr>
              <td colSpan="10" align="center">
                <b>Nenhum atleta encontrado</b>
              </td>
            </tr>
          ) : (
            participants.map((participant) => (
              <tr key={participant.bib}>
                <td align="center">{participant.bib}</td>
                <td>{participant.name}</td>
                <td align="center">{participant.gender}</td>
                <td align="center">
                  {participant.dob == null
                    ? ""
                    : participant.dob.split("-")[2] +
                      "/" +
                      participant.dob.split("-")[1] +
                      "/" +
                      participant.dob.split("-")[0]}
                </td>
                <td align="center">
                  {participant.cpf === "0000000None" ? "" : participant.cpf}
                </td>
                <td align="center">{participant.course}</td>
                <td align="center">{participant.shirt}</td>
                <td align="center">{participant.type}</td>
                <td align="center">{participant.team}</td>
                <td align="center">
                  <DeliverModal
                    delivered={participant.delivered}
                    pk={participant.bib}
                    resetState={props.resetState}
                  />
                </td>
                <td align="center" style={{ width: "15%" }}>
                  <NewParticipantModal
                    create={false}
                    participant={participant}
                    resetState={props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal pk={participant.bib} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ParticipantList;
