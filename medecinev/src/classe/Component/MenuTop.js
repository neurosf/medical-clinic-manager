import { NavLink } from "react-router-dom"
import { variables } from "../../Variables"

export function MenuTop({disconnect,log}){
    const PhotoPath=variables.PHOTO_URL
    function ShowMenuTop(){
        let Navbar = document.getElementById('navbarTop');
        console.log(Navbar)
        if (Navbar.getAttribute('open')==0){
            Navbar.classList.add('show')
            Navbar.setAttribute('open',1)
        }else {
            Navbar.classList.remove('show')
            Navbar.setAttribute('open',0)
        }
    }
    return(
    <>
        <header>
          <nav class="navbar navbar-expand-lg navbar-light">
            <NavLink className="LogoName navbar-brand " to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-virus" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v1.402c0 .511.677.693.933.25l.7-1.214a1 1 0 0 1 1.733 1l-.701 1.214c-.256.443.24.939.683.683l1.214-.701a1 1 0 0 1 1 1.732l-1.214.701c-.443.256-.262.933.25.933H15a1 1 0 1 1 0 2h-1.402c-.512 0-.693.677-.25.933l1.214.701a1 1 0 1 1-1 1.732l-1.214-.7c-.443-.257-.939.24-.683.682l.701 1.214a1 1 0 1 1-1.732 1l-.701-1.214c-.256-.443-.933-.262-.933.25V15a1 1 0 1 1-2 0v-1.402c0-.512-.677-.693-.933-.25l-.701 1.214a1 1 0 0 1-1.732-1l.7-1.214c.257-.443-.24-.939-.682-.683l-1.214.701a1 1 0 1 1-1-1.732l1.214-.701c.443-.256.261-.933-.25-.933H1a1 1 0 1 1 0-2h1.402c.511 0 .693-.677.25-.933l-1.214-.701a1 1 0 1 1 1-1.732l1.214.701c.443.256.939-.24.683-.683l-.701-1.214a1 1 0 0 1 1.732-1l.701 1.214c.256.443.933.261.933-.25V1a1 1 0 0 1 1-1Zm2 5a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM6 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm1 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5-3a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z"/>
            </svg>
                Cabinet Médical</NavLink>
            <button class="navbar-toggler" type="button" onClick={ShowMenuTop}>
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTop"  open='0'>
                <div class="navbar-nav ms-auto">
                    <div className="NavTopHome ">
                        <NavLink className="TopLink menuA nav-link d-flex" to="/Patient">Patient</NavLink>
                        <details className="detailsNavTop">
                            <summary className="sam menuA menuLink nav-link d-flex">Patient</summary>
                            <NavLink className="LinkIconNavTop" to="/Patient"><i className="fa fa-arrow-right text-light m-2"></i></NavLink>
                            <div className="detailsInfo">
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/RendezVous"><span><i class="fa-regular fa-calendar"></i>Rendez Vous</span></NavLink></li>
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/Salleattente"><span><i class="fa-regular fa-clock"></i>Salle d'attente</span></NavLink></li>
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/Consultation"><span><i class="fa-solid fa-file-prescription"></i>Consultation</span></NavLink></li>
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/Facture"><span><i class="fa-solid fa-file-lines"></i>Facture</span></NavLink></li>
                            </div>
                        </details>
                        <div className="NavTopHomeLinks">
                            <div className="p-3">
                                <li className='mt-3 Menuitem'><NavLink className="linkWS" to="/RendezVous"><span><i class="fa-regular fa-calendar"></i>Rendez Vous</span></NavLink></li>
                                <li className='mt-3 Menuitem'><NavLink className="linkWS" to="/Salleattente"><span><i class="fa-regular fa-clock"></i>Salle d'attente</span></NavLink></li>
                                <li className='mt-3 Menuitem'><NavLink className="linkWS" to="/Consultation"><span><i class="fa-solid fa-file-prescription"></i>Consultation</span></NavLink></li>
                                <li className='mt-3 Menuitem'><NavLink className="linkWS" to="/Facture"><span><i class="fa-solid fa-file-lines"></i>Facture</span></NavLink></li>
                            </div>
                            <NavLink to="/Patient" className="NavTopHomeLinksBot"><i className="fa fa-arrow-right text-light m-2"></i></NavLink>
                        </div>
                    </div>
                    {log===3?<>
                    <div className="NavTopHome ">
                        <NavLink className="TopLink menuA nav-link d-flex" to="/Medicale"><i class="bi bi-capsule"></i>Outils</NavLink>
                        <details className="detailsNavTop">
                            <summary className="sam menuA menuLink nav-link d-flex"><i class="bi bi-capsule"></i>Outils</summary>
                            <NavLink className="LinkIconNavTop" to="/Medicale"><i className="fa fa-arrow-right text-light m-2"></i></NavLink>
                            <div className="detailsInfo">
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/Medicament"><i class="fa-solid fa-tablets"></i><span>Médicament</span></NavLink></li>
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/Pathologies"><span><i class="bi bi-virus"></i>Pathologies</span></NavLink></li>
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/ExamenR"><i class="fa-solid fa-syringe"></i><span>Examen régulier</span></NavLink></li>
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/ExamenRad"><i class="fa-solid fa-x-ray"></i><span>Examen radiologie</span></NavLink></li>
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/VariablesPhy"><i class="fa-solid fa-prescription-bottle-medical"></i><span>Variables physiologique</span></NavLink></li>
                            </div>
                        </details>
                        <div className="NavTopHomeLinks">
                            <div className="p-3">
                                <li className='mt-1 Menuitem'><NavLink className="linkWS" to="/Medicament"><i class="fa-solid fa-tablets"></i><span>Médicament</span></NavLink></li>
                                <li className='mt-2 Menuitem'><NavLink className="linkWS" to="/Pathologies"><span><i class="fa-solid fa-virus"></i>Pathologies</span></NavLink></li>
                                <li className='mt-2 Menuitem'><NavLink className="linkWS" to="/ExamenR"><i class="fa-solid fa-syringe"></i><span>Examen régulier</span></NavLink></li>
                                <li className='mt-2 Menuitem'><NavLink className="linkWS" to="/ExamenRad"><i class="fa-solid fa-x-ray"></i><span>Examen radiologie</span></NavLink></li>
                                <li className='mt-2 Menuitem'><NavLink className="linkWS" to="/VariablesPhy"><i class="fa-solid fa-prescription-bottle-medical"></i><span>Variables physiologique</span></NavLink></li>
                            </div>
                            <NavLink to="/Medicale" className="NavTopHomeLinksBot"><i className="fa fa-arrow-right text-light m-2"></i></NavLink>
                        </div>
                    </div>
                    <div className="NavTopHome ">
                        <NavLink className="TopLink menuA nav-link d-flex" to="/Document"><i class="bi bi-capsule"></i>Document</NavLink>
                        <details className="detailsNavTop">
                            <summary className="sam menuA menuLink nav-link d-flex"><i class="bi bi-capsule"></i>Document</summary>
                            <NavLink className="LinkIconNavTop" to="/Document"><i className="fa fa-arrow-right text-light m-2"></i></NavLink>
                            <div className="detailsInfo">
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/Ordonnance"><span>Ordonnance</span></NavLink></li>
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/MedicaleCertificate"><span>Certificat</span></NavLink></li>
                                    <li className='mt-4 Menuitem'><NavLink className="linkWS" to="../Championne/"><span>Courrier</span></NavLink></li>
                            </div>
                        </details>
                        <div className="NavTopHomeLinks ">
                            <div className="p-3">
                                <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/Ordonnance"><span>Ordonnance</span></NavLink></li>
                                <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/MedicaleCertificate"><span>Certificat</span></NavLink></li>
                                <li className='mt-4 Menuitem'><NavLink className="linkWS" to="/Courrier"><span>Courrier</span></NavLink></li>
                            </div>
                            <NavLink to="/Document" className="NavTopHomeLinksBot DocumentsNav"><i className="fa fa-arrow-right text-light m-2"></i></NavLink>
                        </div>
                    </div></>:null}
                    {log===3?<><NavLink className="menuA nav-link d-flex" to="/Statistiques">Statistiques</NavLink></>:null}
                    {log>=2?<><NavLink className="menuA nav-link d-flex" to="/Stock">Stock</NavLink></>:null}
                    {log===3?<><NavLink className="menuA nav-link d-flex" to="/Medecin">Medecin</NavLink></>:null}
                    <NavLink className="menuA nav-link d-flex" to="/Contacts">Contacts</NavLink>
                    </div>
                    <div className="dropdown ms-auto p-2 text-end">
                        <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuEButton"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-person"></i>
                        </button>
                        <div className="dropdown-menu MenuInfoE" aria-labelledby="dropdownMenuEButton">
                            <NavLink className="h5 text-light nav-link d-flex" to="/Profile">Manage Info</NavLink>
                            <button className="btn text-light " onClick={()=>disconnect()}>disconnect</button>
                        </div>
                    </div>
            </div>
            </nav>
    </header>
    </>
    )
}