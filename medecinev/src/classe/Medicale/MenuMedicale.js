import { NavLink } from "react-router-dom"
import './Medicale.css'

export function MenuMedicale({CloseMenuSide,MenuSideOpen}){
    return(
    <>
        <div className={MenuSideOpen?'MenuMedicale OpenMenu':'MenuMedicale'}>
            <div className="text-start">
                <button onClick={CloseMenuSide} className="btn ms-2 text-light"><i class="fa-solid fa-bars"></i></button>
            </div>
            <div><NavLink className="btn LinkMedicale m-2" to="/Medicament"><i class="fa-solid fa-tablets"></i><span  className={MenuSideOpen?'':'d-none'}>Médicament</span></NavLink></div>
            <div><NavLink className="btn LinkMedicale m-2" to="/Pathologies"><i class="fa-solid fa-virus"></i><span  className={MenuSideOpen?'':'d-none'}>Pathologies</span></NavLink></div>
            <div><NavLink className="btn LinkMedicale m-2" to="/ExamenR"><i class="fa-solid fa-syringe"></i><span  className={MenuSideOpen?'':'d-none'}>Examen / Vaccine</span></NavLink></div>
            <div><NavLink className="btn LinkMedicale m-2" to="/ExamenRad"><i class="fa-solid fa-x-ray"></i><span  className={MenuSideOpen?'':'d-none'}>Examen Radiologie</span></NavLink></div>
            <div><NavLink className="btn LinkMedicale m-2" to="/VariablesPhy"><i class="fa-solid fa-prescription-bottle-medical"></i><span  className={MenuSideOpen?'':'d-none'}>Variables physiologique</span></NavLink></div>
        </div>
    </>
    )
}