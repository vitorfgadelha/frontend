import { React } from "react";
import { Table } from "reactstrap";
import DeliverModal from "./DeliverModal";
import { resetState } from "./Home"
import NewParticipantModal from "./NewParticipantModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

function ListingPageComponent({ onScroll, listInnerRef, userList }) {
  return (
    <div>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{height: "350px", overflowY: "auto" }}
      >
        {userList.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                // marginTop: "px",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                // flexDirection: "column"
              }}
            >
              <Table hover responsive>
                <tbody>
                <tr key={item.bib} >
                  <td colSpan="9" align="center"></td>
                    <td align="center" style={{width: "5%"}}>{item.bib}</td>
                    <td style={{width: "35%"}}>{item.name}</td>
                    <td align="center" style={{width: "5%"}}>{item.gender}</td>
                    <td align="center" style={{width: "10%"}}>{item.dob}</td>
                    <td align="center" style={{width: "12%"}}>{item.cpf}</td>
                    <td align="center" style={{width: "5%"}}>{item.course}</td>
                    <td align="center"  style={{width: "5%"}}>{item.shirt}</td>
                    <td align="center" style={{width: "5%"}}>
                      <DeliverModal
                        delivered={item.delivered}
                        pk={item.bib}
                        // resetState={this.props.resetState}
                        /></td>
                    <td align="center" style={{width: "15%"}}>
                      <NewParticipantModal
                        create={false}
                        participant={item}
                        // resetState={this.props.resetState}
                        />
                      &nbsp;&nbsp;
                      <ConfirmRemovalModal
                        pk={item.bib}/>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListingPageComponent;
