import axios from "axios"

const participantsUrl = '127.0.0.1:8000/participants/'

export const getParticipantsInfo = () => {
  axios.get(participantsUrl + 'participants_info/')
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
}
