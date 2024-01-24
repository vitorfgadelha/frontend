import { Content, HeaderBox, SContainer } from '../styles/DeliverWindow.style';

export default function DeliverWindow({ isOpen }) {
 return(
    isOpen? (
    <SContainer>
      <HeaderBox />
      <Content />Teste
    </SContainer>
    ) : null
  )
}
