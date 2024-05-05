import { useEffect } from "react";
import Logout from "../js/Logout";
import Tabs from "../js/Tabs";
import Sprofile from "./Sprofile";
import Stask from "./Stask";
import axios from "axios";

export default function SHome() {
  return (
    <div id="outer">
      <Tabs id="tasktab" className="tabchanger" text="Tasks"></Tabs>
      <Tabs id="profiletab" className="tabchanger" text="Profile"></Tabs>
      <div id="rootx">
        <Stask></Stask>
        <Sprofile></Sprofile>
      </div>
      <Logout></Logout>
    </div>
  );
}
