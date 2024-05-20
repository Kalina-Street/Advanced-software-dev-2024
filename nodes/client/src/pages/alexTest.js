import axios from "axios";

export default function Ahome() {

axios
.post(
  "http://localhost:8000/tasks",
  JSON.stringify({ id: 10,
    title: 'very important',
    description: 'do the work',
    category: 'work',
    startdate: '2024-03-28T00:00:00.000Z',
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