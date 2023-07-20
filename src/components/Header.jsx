import { Logo, SContainer, Title } from "../styles/Header.style";

import logo from "../assets/digitime.png"

export default function Header() {
  return(
    <SContainer>
      <Logo src={logo}/>
      <Title>Kits Delivery Service</Title>
    </SContainer>
  )
}
