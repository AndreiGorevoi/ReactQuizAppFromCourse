import axios from "axios";

export default axios.create({
    baseURL : 'https://quiz-project-30750-default-rtdb.europe-west1.firebasedatabase.app/'
  })