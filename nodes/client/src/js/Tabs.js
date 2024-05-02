export default function Tabs() {
  function tabswitch(e) {
    e.preventDefault();
    document.querySelector("#tasktab").style.backgroundColor = "white";
    document.querySelector("#profiletab").style.backgroundColor = "white";
    e.target.style.backgroundColor = "black";
    if (e.target.innerText === "Tasks") {
      document.querySelector("#task").style.display = "block";
      document.querySelector("#profile").style.display = "none";
    } else if (e.target.innerText === "Profile") {
      document.querySelector("#profile").style.display = "block";
      document.querySelector("#task").style.display = "none";
    }
  }
  return (
    <div>
      <button id="tasktab" onClick={tabswitch}>
        Tasks
      </button>
      <button
        style={{ backgroundColor: "black" }}
        id="profiletab"
        onClick={tabswitch}
      >
        Profile
      </button>
    </div>
  );
}
