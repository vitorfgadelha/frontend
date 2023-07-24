import Footnote from './Footnote';
import Header from './Header';
import ParticipantList from './ParticipantList';

import { SContainer } from '../styles/App.style';

export default function App() {
  return(
    <SContainer>
      <Header />
      <ParticipantList />
      <Footnote />
    </SContainer>
  )
}
