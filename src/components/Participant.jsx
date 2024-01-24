import { useState } from 'react';
import { Button , Cpf, Delivered, Dob, Gender, Id, Name, Race, SContainer, Shirt } from "../styles/Participant.style";
import ButtonsUtils from "./ButtonsUtils";
import DeliverWindow from "./DeliverWindow";

export default function Participant({id, name, age}) {
  const [showDeliverWindow, setShowDeliverWindow] = useState(false);

  const handleClick = () => {
    setShowDeliverWindow(!showDeliverWindow);
    console.log("Abriu")
  }

  return(
    <SContainer>
      <Id>{id}</Id>
      <Name>{name}</Name>
      <Dob>{age}</Dob>
      <Gender>M</Gender>
      <Cpf>00921285213</Cpf>
      <Race>teste</Race>
      <Shirt>M</Shirt>
      <Delivered>
        <Button onClick={handleClick}>Entregar</Button>
      </Delivered>
      <ButtonsUtils />
      <DeliverWindow isOpen={showDeliverWindow}/>
    </SContainer>
  )
}
