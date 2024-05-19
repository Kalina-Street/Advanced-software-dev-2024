import axios from "axios";

export default function Ahome() {

axios
.post(
  "http://localhost:8000/tasks",
  JSON.stringify({ id: 10,
    title: 'very important',
    description: 'do the work',
    category: 'work',
    startdate: '2024-05-19',
    duration: 1,
    organisation: 9,
    complete: 0 }),
  { mode: "cors" }
)
.then((data) => {
  closer();
})
.catch((error) => {
  consolel.log("There has been an error");
});

};