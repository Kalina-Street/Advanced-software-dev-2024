import { useEffect } from "react";
import Logout from "../js/Logout";
import Tabs from "../js/Tabs";
import Aprofile from "./Aprofile";
import Newstaff from "./Newstaff";
import Staffsearch from "./Staffsearch";
import Atask from "./Atask";
import axios from "axios";
export default function Ahome() {
    return (
        <div id="outer">
          <Tabs></Tabs>
          <div id="rootx">
            {/*<Atask></Atask>
            <Staffsearch></Staffsearch>
    <Newstaff></Newstaff>*/}
          </div>
          <Logout></Logout>
        </div>
      );
    }