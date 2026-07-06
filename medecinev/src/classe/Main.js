import React,{Component} from 'react';
import {variables} from '../Variables';
import './Main.css'
import { NavLink } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { EffectCards } from "swiper";
import { Loader } from './Component/Loader';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-cards";


export class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            Dossiers:[],
            rendezvous_list:[],
            MedicamentStock:[],
            patientcount:0,
            Consultaioncount:0,
            patientcount_month:0,
            consultationcount_month:0,
            isLoading:false,

            PhotoPath:variables.PHOTO_URL,
        };
    }
    GetInfo = ()=>{
        fetch(variables.API_URL+'HomeInfo')
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                Dossiers:data.Dossiers,
                rendezvous_list:data.rendezvous_list,
                MedicamentStock:data.MedicamentStock,
                patientcount:data.patientcount,
                Consultaioncount:data.Consultaioncount,
                patientcount_month:data.patientcount_month,
                consultationcount_month:data.consultationcount_month,
                isLoading:false});
        });
    }
    componentDidMount(){
        this.GetInfo()
    }
    render(){
        {
            const {
                Dossiers,
                rendezvous_list,
                MedicamentStock,
                patientcount,
                Consultaioncount,
                patientcount_month,
                consultationcount_month,
                isLoading,
            }=this.state;
            const {
                log
            }=this.props;
            return(
                <div className='Home'>
                    <div className='TopHome'>
                    <br/><br/><br/><br/>
                    <div className='InTopHome'>
                    <h1 className='WSsay'>Cabinet <span>Médical</span><br/></h1>
                        <span className='subTextWS'>Dr.M CHIKH BAELHADJ</span>  <br/>
                        <span className='subsubtxtws subTextWS '>Médecin généraliste</span>  <br/>
                        <span className='subTextWS' style={{marginLeft: "98px",fontSize: "30px"}}>الحكيم: م الشيخ بالحاج</span>  <br/>
                        <span className='subTextWS' style={{marginLeft: "205px",fontSize: "30px"}}>طبيب عام</span>  <br/>
                        <div className='TitelMain'>
                            we provide <span>medical</span> services that you can <span>trust!</span>
                        </div>
                    </div>
                    </div>
                <div className='functionbtns'>
                    <div><NavLink to="/RendezVous" className='btn btn7 m-2'> Rendez vous</NavLink></div>
                    <div><NavLink to="/Salleattente" className='btn btn7 m-2'> Salle d'attente</NavLink></div>
                    <div><NavLink to="/patient" className='btn btn7 m-2'> Patient</NavLink></div>
                    <div><NavLink to="/Consultation" className='btn btn7 m-2'> Consultation</NavLink></div>
                    {log===2?<div><NavLink to="/Stock" className='btn btn7 m-2'> Stock</NavLink></div>:null}
                </div>
                {isLoading?<><Loader/></>:<>
                <h2 className='TitelMain'>Aujourd'hui</h2>
                <div className='today'>
                    <div class="todaycontainer">
                        <div class="inner">
                            <span class="pricing">
                                <span>
                                 <small><i class="fa-regular fa-calendar"></i></small>
                                </span>
                            </span>
                            <p class="title">Rendez vous</p>
                            <p class="infoP">les rendez vous d'aujourd'hui</p>
                            <ul class="features">
                            {rendezvous_list.map(R=>(
                                <li><span class="icon">
                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                            <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                        </svg>
                                    </span>
                                    <span><strong>{R.Id_D.Id_P.Nom+" "+R.Id_D.Id_P.Prenom}</strong> {R.dateR.split('T')[1].split('Z')}</span>
                                </li>))}
                            </ul>
                            <div class="action">
                            <NavLink to="/RendezVous" className='button'>Voir plus</NavLink>
                            </div>
                        </div>
                    </div>
                    <div class="todaycontainer">
                        <div class="inner">
                            <span class="pricing">
                                <span>
                                 <small><i class="fa-solid fa-hospital-user"></i></small>
                                </span>
                            </span>
                            <p class="title">Patient</p>
                            <p class="infoP">les Patients Ajouter d'aujourd'hui</p>
                            <ul class="features">
                            {Dossiers.map(R=>(
                                <li><span class="icon">
                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                            <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                        </svg>
                                    </span>
                                    <span><strong>{R.Id_P.Nom+" "+R.Id_P.Prenom}</strong> 
                                        <NavLink className="m-1 text-light" to={"/Patient/"+R.id}><i class="fa-solid fa-hand-pointer fa-rotate-90"></i></NavLink>
                                    </span>
                                </li>))}
                            </ul>
                            <div class="action">
                            <NavLink to="/patient" className='button'>Voir plus</NavLink>
                            </div>
                        </div>
                    </div>
                    <div class="todaycontainer">
                        <div class="inner">
                            <span class="pricing">
                                <span>
                                 <small><i class="fa-solid fa-tablets"></i></small>
                                </span>
                            </span>
                            <p class="title">Produit</p>
                            <p class="infoP">les Produits utilise d'aujourd'hui</p>
                            <ul class="features">
                            {MedicamentStock.map(R=>(
                                <li><span class="icon">
                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                            <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                        </svg>
                                    </span>
                                    <span><strong>{R.id_m.Nom_med}</strong> 
                                    </span>
                                </li>))}
                            </ul>
                            {log===2?<div class="action">
                            <NavLink to="/Stock" className='button'>Voir plus</NavLink>
                            </div>:null}
                        </div>
                    </div>
                </div>
                    <h1 className='TitelMain'>Statistiques Générales</h1>
                    <div className='StatWS'>
                            <section className='StatCountainer'>
                                <div className='StatTitle'>Patients </div>
                                <div className='StatNum'>{patientcount}</div>
                                <div className='Stattext'> ce mois {patientcount_month}</div>
                                <hr className='lineStat'/>
                            </section>
                            <section className='StatCountainer'>
                                <div className='StatTitle'>Consultation </div>
                                <div className='StatNum'>{Consultaioncount}</div>
                                <div className='Stattext'>ce mois {consultationcount_month}</div>
                                <hr className='lineStat'/>
                            </section>
                    </div>
                    {log===2?<div className='p-4'>
                        <NavLink to="/Statistiques" className="btn7 text-decoration-none ms-5">Voir plus</NavLink>
                    </div>:null}
                    </>}
                </div>
            )
    }
}
}