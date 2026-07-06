import { NavLink } from "react-router-dom"
import { Link, Element } from 'react-scroll';

export function MenuPatient({P=0,log,CloseMenuSide,MenuSideOpen}){
    return(
    <>
        <div className={MenuSideOpen?'Menuside OpenMenu':'Menuside'}>
        <br/>
            <div className={'text-start'}>
                <button onClick={CloseMenuSide} className="btn ms-2 text-light"><i class="fa-solid fa-bars"></i></button>
            </div>
                <div><NavLink className="btn Linkside m-2 my-0" to="/RendezVous"><i class="fa-regular fa-calendar"></i><span>Rendez vous</span></NavLink></div>
                <div><NavLink className="btn Linkside m-2 my-0" to="/Salleattente"><i class="fa-regular fa-clock"></i><span>Salle d'attente</span></NavLink></div>
                <div><NavLink className="btn Linkside m-2 my-0" to="/Patient"><i class="fa-solid fa-hospital-user"></i><span>Patient</span></NavLink></div>
                <div><NavLink className="btn Linkside m-2 my-0" to="/Consultation"><i class="fa-sharp fa-solid fa-file-waveform"></i><span>Consultation</span></NavLink></div>
                <div><NavLink className="btn Linkside m-2 my-0" to="/Facture"><i class="fa-solid fa-file-lines"></i><span>Facture</span></NavLink></div>
            <hr/>
            {log===3?<>
            {P===1?<>
                <div><Link className="btn Linkside m-2 my-0" to="InfoPatient" smooth={true} offset={-100} duration={500} ><i class="fa-solid fa-user"></i><span>Info</span></Link></div>
                <div><Link className="btn Linkside m-2 my-0" to="RendezVous" smooth={true} offset={-100} duration={500} ><i class="fa-regular fa-calendar"></i><span>Rendez Vous</span></Link></div>
                <div><Link className="btn Linkside m-2 my-0" to="Alarms" smooth={true} offset={-100} duration={500} ><i class="fa-sharp fa-solid fa-bell"></i><span>Alarms</span></Link></div>
                <div><Link className="btn Linkside m-2 my-0" to="Paiement" smooth={true} offset={-100} duration={500} ><i class="fa-solid fa-credit-card"></i><span>Paiement</span></Link></div>
                <div><Link className="btn Linkside m-2 my-0" to="Consultation" smooth={true} offset={-100} duration={500} ><i class="fa-sharp fa-solid fa-file-waveform"></i><span>Consultation</span></Link></div>
                <div><Link className="btn Linkside m-2 my-0" to="Suivi" smooth={true} offset={-100} duration={500} ><i class="fa-solid fa-hand-holding-medical"></i><span>Suivi</span></Link></div>
                <div><Link className="btn Linkside m-2 my-0" to="Examen" smooth={true} offset={-100} duration={500} ><i class="fa-solid fa-syringe"></i><span>Examen</span></Link></div>
                <div><Link className="btn Linkside m-2 my-0" to="ExamenRad" smooth={true} offset={-100} duration={500} ><i class="fa-solid fa-x-ray"></i><span>Examen radiologique</span></Link></div>
                <div><Link className="btn Linkside m-2 my-0" to="ExamenBio" smooth={true} offset={-100} duration={500} ><i class="fa-solid fa-dna"></i><span>Examen biollogique</span></Link></div>
            </>:null}
            {P===2?<>
                <div><Link className="btn Linkside m-2 my-0" to="InfoConsultation" smooth={true} offset={-100} duration={500} ><i class="fa-sharp fa-solid fa-file-waveform"></i><span>Info</span></Link></div>
                <div><Link className="btn Linkside m-2 my-0" to="Paiement" smooth={true} offset={-100} duration={500} ><i class="fa-solid fa-credit-card"></i><span>Paiement</span></Link></div>
            </>:null}
            {P>0?<>
                <div><Link className="btn Linkside m-2 my-0" to="Photos" smooth={true} offset={-100} duration={500} ><i class="fa-sharp fa-solid fa-image"></i><span>Photos</span></Link></div>
            </>:null}
            </>:null}
            <br></br>
        </div>
    </>
    )
}