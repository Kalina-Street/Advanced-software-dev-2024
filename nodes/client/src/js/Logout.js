import { useNavigate } from "react-router-dom"


export default function Logout () {
    const navi=useNavigate()
    function exi(e) {
        e.preventDefault();
        localStorage.setItem("user-token","")
        localStorage.setItem("auth-token","")
        localStorage.setItem("admin-token","")
        navi("/")
    }
    return(
    <button onClick={exi}>Logout</button>
    )
}
