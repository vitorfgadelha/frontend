import { SContainer } from "../styles/TableContent.style";

import Participant from "./Participant";

const data = [
  { id: 1, name: "Vitor Fernando de Souza Gadelha", age: '01/04/1997', gender: "Male" },
  { id: 2, name: "Megha koasdioa oaisdhoaisnd oiashdoahsdio", age: 19, gender: "Female" },
  { id: 3, name: "Subham", age: 25, gender: "Male" },
]


export default function TableContent() {
return(
  <SContainer>
    {data.map(participant => (
      <Participant key={participant.id} id={participant.id} name={participant.name} age={participant.age}/>
    ))}
  </SContainer>
)
}
