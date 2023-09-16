import Footnote from '../components/Footnote';
import Header from '../components/Header';
import ParticipantList from '../components/ParticipantList';

import { SContainer } from '../styles/Main.style';

export default function Main() {
  return(
    <SContainer>
      <Header />
      <ParticipantList />
      <Footnote />
    </SContainer>
  )
}
