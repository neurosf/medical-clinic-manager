import { NavLink } from "react-router-dom"
import './Medicale.css'
import { MenuMedicale } from "./MenuMedicale"

export function Medicale({CloseMenuSide,MenuSideOpen}){
    return(
    <>
        <br/>
            <div className="d-flex">
                <MenuMedicale CloseMenuSide={CloseMenuSide} MenuSideOpen={MenuSideOpen}/>
                <div className="homeMedicale">
                    <br/><br/><br/><br/>
                    <img src="./static/PIC/pills.png" height='200px'/>
                    <h2>Les outils médicale</h2>
                </div>
            <div>
            </div>
        </div>
    </>
    )
}