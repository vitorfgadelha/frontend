import React, { Component } from "react";
import { Table } from "reactstrap";
import NewParticipantModal from "./NewParticipantModal";
import DeliverModal from "./DeliverModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

class ParticipantList extends Component {
  render() {
    const participants = this.props.participants;

    return (
      <><Table hover responsive>
        <thead align="center">
          <tr>
            <th align="center" style={{width: "5%"}}>N°</th>
            <th align="center" style={{width: "35%"}}>Nome</th>
            <th align="center" style={{width: "5%"}}>Sexo</th>
            <th align="center" style={{width: "10%"}}>Nascimento</th>
            <th align="center" style={{width: "12%"}}>CPF</th>
            <th align="center" style={{width: "5%"}}>Prova</th>
            <th align="center" style={{width: "5%"}}>Camisa</th>
            <th align="center" style={{width: "5%"}}>Entregue</th>
            <th align="center" style={{width: "15%"}}></th>
            <th></th>
          </tr>
        </thead>
      </Table>
      <div style={{height: "300px", overflowY: "auto"}}>
      <Table hover responsive onScroll={this.props.handleScroll}>
        <tbody>
          {!participants || participants.length <= 0 ? (
          <tr>
            <td colSpan="9" align="center">
              <b>Ops, no one here yet</b>
            </td>
          </tr>
          ) : (
            participants.map(participant => (
                <tr key={participant.bib} >
                  <td colSpan="9" align="center"></td>
                    <td align="center" style={{width: "5%"}}>{participant.bib}</td>
                    <td style={{width: "34%"}}>{participant.name}</td>
                    <td align="center" style={{width: "5%"}}>{participant.gender}</td>
                    <td align="center" style={{width: "10%"}}>{participant.dob}</td>
                    <td align="center" style={{width: "12%"}}>{participant.cpf  === '0000000None'? "" : participant.cpf}</td>
                    <td align="center" style={{width: "5%"}}>{participant.course}</td>
                    <td align="center"  style={{width: "5%"}}>{participant.shirt}</td>
                    <td align="center" style={{width: "5%"}}>
                      <DeliverModal
                        delivered={participant.delivered}
                        pk={participant.bib}
                        resetState={this.props.resetState} 
                        /></td>
                    <td align="center" style={{width: "15%"}}>
                      <NewParticipantModal
                        create={false}
                        participant={participant}
                        resetState={this.props.resetState}
                        />
                      &nbsp;&nbsp;
                      <ConfirmRemovalModal
                        pk={participant.bib}/>
                    </td>
                  </tr>
            ))
          )
            }
               </tbody>
              </Table>
              </div>
        </>
    );
  }
}

export default ParticipantList;
