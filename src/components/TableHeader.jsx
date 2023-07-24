import { SContainer,
         IdDiv,
         NameDiv,
         DobDiv,
         CpfDiv,
         RaceDiv,
         ShirtDiv,
         BoxDiv,
         ButtonsDiv,
         GenderDiv,
        } from "../styles/TableHeader.style";

export default function TableHeader() {
return(
  <SContainer>
    <IdDiv>N°</IdDiv>
    <NameDiv>Nome</NameDiv>
    <DobDiv>DOB</DobDiv>
    <GenderDiv>Sexo</GenderDiv>
    <CpfDiv>CPF</CpfDiv>
    <RaceDiv>Prova</RaceDiv>
    <ShirtDiv>Camisa</ShirtDiv>
    <BoxDiv>Entregue</BoxDiv>
    <ButtonsDiv>Botões</ButtonsDiv>
  </SContainer>
  )
}
