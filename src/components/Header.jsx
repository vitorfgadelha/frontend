import { Logo, ParticipantsInfo, SContainer, SearchBar, Title, ParticipantsCount } from "../styles/Header.style";

import logo from "../assets/digitime.png"
export default function Header() {
 return(
    <SContainer>
      <Logo src={logo}/>
      <Title>Kits Delivery Service</Title>
      <ParticipantsInfo>
        <SearchBar placeholder="Pesquisar Nome ou CPF"></SearchBar>
        <ParticipantsCount>Kits Entregues: 1000</ParticipantsCount>
        <ParticipantsCount>Kits a entregar: 1000</ParticipantsCount>
      </ParticipantsInfo>
    </SContainer>
  )
}
