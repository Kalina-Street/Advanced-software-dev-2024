//Admin Home Page//
//Calls the other tabs from Admin side - Kamil//
import { useEffect } from "react";
import Logout from "../js/Logout";
import Tabs from "../js/Tabs";
import Aprofile from "./Aprofile";
import Addstaff from "./Addstaff";
import Staffsearch from "./Staffsearch";
import Atask from "./Atask";
import axios from "axios";


//creates function to combine all tabs/files

export default function AHome() {
  return (
    <div id="outer">
      <Tabs id="tasktab" className="tabchanger" text="Tasks"> </Tabs>
      <Tabs id="profiletab" className="tabchanger" text="Profile"></Tabs>
      <Tabs id="searchstafftab" className="tabchanger" text="Search Staff"></Tabs>
      <Tabs id="addstafftab" className="tabchanger" text="Add Staff"></Tabs>
      <div id="rootx">
        <Atask></Atask>
        <Aprofile></Aprofile>
        <Staffsearch></Staffsearch>
        <Addstaff></Addstaff>
      </div>
      <Logout></Logout>
    </div>
  );
}