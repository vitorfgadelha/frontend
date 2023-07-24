import { Button , Cpf, Delivered, Dob, Gender, Id, Name, Race, SContainer, Shirt } from "../styles/Participant.style";
import ButtonsUtils from "./ButtonsUtils";

export default function Participant({id, name, age}) {
  return(
    <SContainer>
      <Id>{id}</Id>
      <Name>{name}</Name>
      <Dob>{age}</Dob>
      <Gender>M</Gender>
      <Cpf>Teste</Cpf>
      <Race>teste</Race>
      <Shirt>teste</Shirt>
      <Delivered>
        <Button>Entregar</Button>
      </Delivered>
      <ButtonsUtils />
    </SContainer>
  )
}
