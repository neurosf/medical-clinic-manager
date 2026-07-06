import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuPatient } from './MenuPatient';
import './Patient.css'
import { NavLink } from 'react-router-dom';
import { FormPatient } from './FormPatient';
import { FormAntecedent } from './FormAntecedent';
import { FormRendezVous } from './FormRendezVous';
import { FormAlarm } from './FormAlarm';
import { FormConsultation } from '../Consultation/FormConsultation';
import { FormSuivi } from './FormSuivi';
import { FormExamenVac } from './FormExamenVac';
import { FormExamenBiologie } from './FormExamenBiologie';
import { FormExamenRadiologie } from './FormExamenRadiologie';
import { Loader } from '../Component/Loader';

export class Patient  extends Component{

    constructor(props){
        super(props);

        this.state={
            Dossier:[],
            modalTitle:"",
            nextDossier:0,
            OlsNSS:"",
            selectedDossier: {
                id: 0,
                Id_P: {
                    id: 0,
                    NSS: "",
                    Nom: "",
                    NomJF: "",
                    Prenom: "",
                    Sexe: "",
                    SF: "",
                    Date_naiss: this.props.GetDate().split('T')[0],
                    Lieu: "",
                    Adresse: "",
                    Ville: "",
                    Telephone: "",
                    Profession: "",
                    Nivdinst: "",
                    GrSanguin: "",
                    Nbreenfants: 0,
                    deg_dincapacite: "",
                    nbre_grosseuses: 0
                },
                DateD:  this.props.GetDate().split('T')[0]
            },
            Habitude:[],
            ///Antecedent
            Antecedent:[],
            selectedAntecedent:{
                CommentaireA:"",
                DateA:"",
                ImportanceA:"",
                familiale:"Personnel",
                id:0,
                idD:1,
                id_path:0
            },
            FilterPath:"",
            ///Rendez Vous
            selectedRendezVous:{
                etatR:"",
                dateR:"",
                Id_P:"",
                id:0,
            },
            ///Consultation
            selectedConsultation:{
                CommentaireC:"",
                DateC:"",
                ImportanceC:"",
                cr_rapideM:"",
                cr_rapideD:"",
                id:0,
                idD:1,
                motif:0,
                Diagnostique:0
            },
            ///Alarm
            selectedAlarm:{
                description:"",
                date:"",
                Id_P:"",
                id:0,
            },
            //Suivi
            selectedSuivi:{
                DateVar:"",
                Importance:"",
                Valeur:"",
                Commentaire:"",
                id:0,
                idD:1,
                id_v:0
            },
            //ExamenVac
            selectedExamenVac:{
                Date_deb:"",
                occurance:"",
                id:0,
                idD:1,
                id_x:0
            },
            Rappel:[],
            //Examen
            selectedexamenBiologie:{
                id:0,
                date:this.props.GetDate().split('T')[0],
                titre:"",
                Importance:"",
                resultat:false,
                dateres:"",
                Commentaire:"",
                Idcons:0
            },
            selectedexamenRadiologie:{
                id:0,
                date:this.props.GetDate().split('T')[0],
                Commentaire:"",
                Idex:0,
                Idcons:0
            },
            ////
            isLoading:false,
            PhotoPath:variables.PHOTO_URL,

            NomFilter:"",
            PrenomFilter:"",
            SexeFilter:"",
            NSSFilter:"",
            refFilter:"",

            DossierWithoutFilter:[],
        }
    }
////////////////////////////filter
    FilterFn(){
        var NomFilter=this.state.NomFilter;
        var PrenomFilter=this.state.PrenomFilter;
        var SexeFilter=this.state.SexeFilter;
        var NSSFilter=this.state.NSSFilter;
        var refFilter=this.state.refFilter;


        var filteredData=this.state.DossierWithoutFilter.filter(
            function(el){
                return (el.Id_P.Nom+" "+el.Id_P.NomJF).toString().toLowerCase().includes(
                    NomFilter.toString().trim().toLowerCase()
                )&&el.Id_P.Prenom.toString().toLowerCase().includes(
                    PrenomFilter.toString().trim().toLowerCase()
                )&&el.Id_P.NSS.toString().toLowerCase().includes(
                    NSSFilter.toString().trim().toLowerCase()
                )&&el.Id_P.Sexe.toString().toLowerCase().includes(
                    SexeFilter.toString().trim().toLowerCase()
                )&&el.id.toString().toLowerCase().includes(
                    refFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Dossier:filteredData});
    }
    sortResult(prop,asc){
        var sortedData=this.state.DossierWithoutFilter.sort(function(a,b){
            if(asc){
                return (a['Id_P'][prop]>b['Id_P'][prop])?1:((a['Id_P'][prop]<b['Id_P'][prop])?-1:0);
            }
            else{
                return (b['Id_P'][prop]>a['Id_P'][prop])?1:((b['Id_P'][prop]<a['Id_P'][prop])?-1:0);
            }
        });

        this.setState({Dossier:sortedData});
    }
    changeNomFilter = (e)=>{
        this.state.NomFilter=e.target.value;
        this.FilterFn();
    }
    changePrenomFilter =(e)=>{
        this.state.PrenomFilter=e.target.value;
        this.FilterFn();
    }
    changeSexeFilter =(e)=>{
        this.state.SexeFilter=e.target.value;
        this.FilterFn();
    }
    changeNSSFilter =(e)=>{
        this.state.NSSFilter=e.target.value;
        this.FilterFn();
    }
    changeRefFilter=(e)=>{
        this.state.refFilter=e.target.value;
        this.FilterFn();
    }
//////////////////////////get data from API
    refreshList=()=>{
        this.state.isLoading=true;
        this.setState({});
        fetch(variables.API_URL+'Dossier')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Dossier:data,DossierWithoutFilter:data,isLoading:false});
        });
    }
    GetHabitude=(ID_Patient)=>{
        this.state.Habitude=[];
        fetch(variables.API_URL+'HabitudeGet/'+ID_Patient)
        .then(response=>response.json())
        .then(data=>{
            data.map(H=>{   this.state.Habitude.push(H.habitude)    });
            this.setState({isLoading:false});
        });
    }
///////////////////////pompe data actions
    addClick(){
        this.setState({
            modalTitle:"Ajouter Nouveau Dossier",
            OlsNSS:"",
            nextDossier:this.NextDossier(),
            selectedDossier: {
                id: 0,
                Id_P: {
                    id: 0,
                    NSS: "",
                    Nom: "",
                    NomJF: "",
                    Prenom: "",
                    Sexe: "",
                    SF: "",
                    Date_naiss:  "",
                    Lieu: "",
                    Adresse: "",
                    Ville: "",
                    Telephone: "",
                    Profession: "",
                    Nivdinst: "",
                    GrSanguin: "",
                    Nbreenfants: 0,
                    deg_dincapacite: "",
                    nbre_grosseuses: 0
                },
                DateD:  this.props.GetDate().split('T')[0]
            },
            Habitude:[],
        });
    }
    editClick(Dos){
        this.GetHabitude(Dos.Id_P.id)
        this.setState({
            modalTitle:"Modifier Dossier",
            OlsNSS:Dos.Id_P.NSS,
            selectedDossier: {
                id: Dos.id,
                Id_P: {
                    id: Dos.Id_P.id,
                    NSS: Dos.Id_P.NSS,
                    Nom: Dos.Id_P.Nom,
                    NomJF: Dos.Id_P.NomJF,
                    Prenom: Dos.Id_P.Prenom,
                    Sexe: Dos.Id_P.Sexe,
                    SF: Dos.Id_P.SF,
                    Date_naiss: Dos.Id_P.Date_naiss,
                    Lieu: Dos.Id_P.Lieu,
                    Adresse: Dos.Id_P.Adresse,
                    Ville: Dos.Id_P.Ville,
                    Telephone: Dos.Id_P.Telephone,
                    Profession: Dos.Id_P.Profession,
                    Nivdinst: Dos.Id_P.Nivdinst,
                    GrSanguin: Dos.Id_P.GrSanguin,
                    Nbreenfants: Dos.Id_P.Nbreenfants,
                    deg_dincapacite: Dos.Id_P.deg_dincapacite,
                    nbre_grosseuses: Dos.Id_P.nbre_grosseuses
                },
                DateD: Dos.DateD
            },
        });
    }
    NextDossier(){
        if(this.state.Dossier.length!==0){
            var maxId = this.state.Dossier.reduce((arr, oId) => {
            return (arr = arr> oId.id ? arr : oId.id);
            });
        }else maxId = 0;
        return maxId + 1;
    }
    /////////////////////////Actions in API
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Dossier/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    ////////////////
    OpenPatientMenu=(id)=>{
        let Menu=document.getElementById('PatientFnctbtn'+id)
        if(Menu.getAttribute('open')!=='1'){
            const menuDivs = document.querySelectorAll('.MenuPatientfnc[open="1"]');

            Array.from(menuDivs).forEach((menu) => {
            menu.style.display = 'none';
            menu.setAttribute('open',0)
            });

            Menu.style.display = 'flex';
            Menu.setAttribute('open',1)
        }
        else{
            Menu.style.display = 'none';
            Menu.setAttribute('open',0)
        }
    }
    componentDidMount(){
        this.refreshList();
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }
    handleDocumentClick = (e) => {
        const isButtonClicked = e.target.classList.contains('PatientMenuButton');
      
        if (!isButtonClicked) {
            const menuDivs = document.querySelectorAll('.MenuPatientfnc[open="1"]');

            Array.from(menuDivs).forEach((menu) => {
              menu.style.display = 'none';
              menu.setAttribute('open',0)
            });
        }
    };
    //////////////////////
    setPatient(Dos){
        this.setState({
            selectedDossier: {
                Id_P: {
                    id: Dos.Id_P.id,
                    Nom: Dos.Id_P.Nom,
                    Prenom: Dos.Id_P.Prenom,
                },
            },
        });
    }
    addClickAntecedent(Dos){
        this.setPatient(Dos);
        this.setState({
            AntecedentmodalTitle:"Ajouter Antecedent",
            isFamilialeAntecedent:false,
            FilterPathAntecedent:"",
            selectedAntecedent:{
                CommentaireA:"",
                DateA:this.props.GetDate().split('T')[0],
                ImportanceA:"",
                familiale:"Personnel",
                id:0,
                idD:this.state.selectedDossier.id,
                id_path:0
            }
        });
    }
    addClickRendezVous(Dos){
        this.setPatient(Dos);
        this.setState({
            RendezVousmodalTitle:"Ajouter RendezVous",
            selectedRendezVous:{
                etatR:"NonPasse",
                dateR:this.props.GetDate().split('Z')[0],
                Id_P:this.state.selectedDossier.id,
                id:0,
            }
        });
    }
    addClickAlarm(Dos){
        this.setPatient(Dos);
        this.setState({
            AlarmmodalTitle:"Ajouter Alarm",
            selectedAlarm:{
                description:"",
                date:this.props.GetDate().split('T')[0],
                Id_P:this.state.selectedDossier.Id_P.id,
                id:0,
            }
        });
    }
    addClickConsultation(Dos){
        this.setPatient(Dos);
        this.setState({
            ConsultationmodalTitle:"Ajouter Consultation",
            selectedConsultation:{
                CommentaireC:"",
                DateC:this.props.GetDate().split('Z')[0],
                ImportanceC:"",
                cr_rapideM:"",
                cr_rapideD:"",
                id:0,
                idD:this.state.selectedDossier.id,
                motif:{
                    id: 0,
                    Nom_path: ''
                },
                Diagnostique:{
                    id: 0,
                    Nom_path: ''
                },
                Prix:1000,
                Prix_paye:0,
                Prix_Totale:0
            },
            FilterPathMotif:"",
            FilterPathDiagnostique:"",
        });
    }
    addClickSuivi(Dos){
        this.setPatient(Dos);
        this.setState({
            SuivimodalTitle:"Ajouter un Variable de suivi",
            selectedSuivi:{
                DateVar:this.props.GetDate().split('T')[0],
                Importance:"",
                Valeur:"",
                Commentaire:"",
                id:0,
                idD:this.state.selectedDossier.id,
                id_v:0
            },
            FilterVarSuivi:"",
        });
    }
    addClickExamenVac(Dos){
        this.setPatient(Dos);
        this.setState({
            ExamenVacmodalTitle:"Ajouter un Examen / Vaccine",
            FilterVarExamenVac:"",
            FilterTypeExameVac:"",
            selectedExamenVac:{
                Date_deb:this.props.GetDate().split('T')[0],
                occurance:1,
                id:0,
                idD:this.state.selectedDossier.id,
                id_x:0
            },
        });
    }
    addClickExamenBio(Dos){
        this.setPatient(Dos);
        this.setState({
            modalTitleExamen:"Ajouter Examen Biologique",
            selectedexamenBiologie:{
                id:0,
                date:this.props.GetDate().split('T')[0],
                titre:"",
                Importance:"",
                resultat:false,
                dateres:"",
                Commentaire:"",
                IdD:this.state.selectedDossier.id
            }
        });
    }
    addClickExamenRad(Dos){
        this.setPatient(Dos);
        this.setState({
            modalTitleExamen:"Ajouter Examen Radiologique",
            FilterRadio:"",
            selectedexamenRadiologie:{
                id:0,
                date:this.props.GetDate().split('T')[0],
                Commentaire:"",
                Idex:0,
                IdD:this.state.selectedDossier.id
            },
        });
    }
    render(){
        const {
            Dossier,
            nextDossier,
            OlsNSS,
            selectedDossier,
            selectedAntecedent,
            selectedRendezVous,
            selectedConsultation,
            selectedAlarm,
            Habitude,
            modalTitle,
            SexeFilter,
            selectedSuivi,
            selectedExamenVac,
            Rappel,
            selectedexamenBiologie,
            selectedexamenRadiologie,
            isLoading
        }=this.state;
        const {
            log
        }=this.props
        return(
            <div>
            <br/>
            <div>
                <MenuPatient  CloseMenuSide={this.props.CloseMenuSide} MenuSideOpen={this.props.MenuSideOpen}/>
                <div className='Patient'>
                    <br /><br /><br />
                <div className='Patientsfunc'>
                    <button type="button" className="btnrefresh button2 m-2 float-end" onClick={this.refreshList}>
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                    <div className='d-flex'>
                        <span className='TopText'>{Dossier.length} Patients </span>
                        {log===3?<><button type="button" className="btn button2 m-2 float-end" 
                            data-bs-toggle="modal"data-bs-target="#DossierForm" onClick={()=>this.addClick()}>
                            Nouveau Dossier
                        </button></>:null}
                    </div>
                </div>
               {!isLoading?<>
            <div className='FontTable'>
             <table className="table">
                <thead>
                <tr>
                    <th className='thsideR'>
                        <input className="form-control" onChange={this.changeRefFilter} placeholder="Référence"/>
                    </th>
                    <th>
                        <input className="form-control" onChange={this.changeNSSFilter} placeholder="NSS"/>
                    </th>
                    <th>
                        <div className="d-flex flex-row">
                            <input className="form-control" onChange={this.changeNomFilter} placeholder="Nom"/>
                            <button type="button" className="btn p-1 btn-light" onClick={()=>this.sortResult('Nom',true)}>
                                <i className="bi-arrow-down-circle-fill"></i>
                            </button>
                            <button type="button" className="btn p-1 btn-light" onClick={()=>this.sortResult('Nom',false)}>
                                <i className="bi-arrow-up-circle-fill"></i>
                            </button>
                        </div>
                    </th>
                    <th>
                        <div className="d-flex flex-row">
                            <input className="form-control" onChange={this.changePrenomFilter} placeholder="Prenom"/>
                            <button type="button" className="btn p-1 btn-light" onClick={()=>this.sortResult('Prenom',true)}>
                                <i className="bi-arrow-down-circle-fill"></i>
                            </button>
                            <button type="button" className="btn p-1 btn-light" onClick={()=>this.sortResult('Prenom',false)}>
                                <i className="bi-arrow-up-circle-fill"></i>
                            </button>
                        </div>
                    </th>
                    <th>
                        <div className="d-flex flex-row">
                            <select className="form-control"  value={SexeFilter} onChange={this.changeSexeFilter}>
                                <option value="">Sexe</option>
                                <option value="Homme">Homme</option>
                                <option value="Famme">Famme</option>
                            </select>
                        </div>
                    </th>
                    <th>Date de Naissance</th>
                    <th className='thsideL'></th>
                </tr>
                </thead>
                <tbody>
                
                    {Dossier.map(Dos=>
                        <tr key={Dos.id}>
                            <td className='lineTd'>
                                <NavLink to={"/Patient/"+Dos.Id_P.id}><i class="fa-solid fa-hand-pointer fa-rotate-90"></i></NavLink>
                                <span>{Dos.id}</span>
                            </td>
                            <td>{Dos.Id_P.NSS}</td>
                            <td>{Dos.Id_P.Nom+" "+Dos.Id_P.NomJF}</td>
                            <td>{Dos.Id_P.Prenom}</td>
                            <td>{Dos.Id_P.Sexe}</td>
                            <td>{Dos.Id_P.Date_naiss}</td>
                            <td className='endTd'>
                            {log===3?<>
                            <button className='btn PatientMenuButton' onClick={()=>this.OpenPatientMenu(Dos.id)}><i class="bi bi-three-dots-vertical PatientMenuButton"></i></button>
                            <div className='MenuPatientfnc' open="0" id={"PatientFnctbtn"+Dos.id}>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#DossierForm" onClick={()=>this.editClick(Dos)}>
                                    <span className='m-2'>Modifier</span>
                                    <i className="bi-pencil-square"></i>
                                </button>
                                <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(Dos.id)}>
                                    <span className='m-2'>Supprime</span>
                                    <i className="bi-trash"></i>
                                </button>
                                <hr/>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#AntecedentForm" onClick={()=>this.addClickAntecedent(Dos)}>
                                    <span className='m-2'>Antecedent</span>
                                    <i className="bi-pencil-square"></i>
                                </button>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#RendezVousForm" onClick={()=>this.addClickRendezVous(Dos)}>
                                    <span className='m-2'>Rendez Vous</span>
                                    <i className="bi-pencil-square"></i>
                                </button>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#AlarmForm" onClick={()=>this.addClickAlarm(Dos)}>
                                    <span className='m-2'>Alarm</span>
                                    <i className="bi-pencil-square"></i>
                                </button>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#ConsultationForm" onClick={()=>this.addClickConsultation(Dos)}>
                                    <span className='m-2'>Consultation</span>
                                    <i className="bi-pencil-square"></i>
                                </button>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#SuiviForm" onClick={()=>this.addClickSuivi(Dos)}>
                                    <span className='m-2'>Variable de Suivi</span>
                                    <i className="bi-pencil-square"></i>
                                </button>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#ExamenVacForm" onClick={()=>this.addClickExamenVac(Dos)}>
                                    <span className='m-2'>Examen Vaccine</span>
                                    <i className="bi-pencil-square"></i>
                                </button>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#examenBiologieForm" onClick={()=>this.addClickExamenBio(Dos)}>
                                    <span className='m-2'>Examen Biologie</span>
                                    <i className="bi-pencil-square"></i>
                                </button>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#ExamenRadiologieForm" onClick={()=>this.addClickExamenRad(Dos)}>
                                    <span className='m-2'>Examen Radiologie</span>
                                    <i className="bi-pencil-square"></i>
                                </button>
                            </div></>:null}
                            </td>
                        </tr>
                        )}
                    
                </tbody>
                
                </table>
            </div>
                </>:<Loader />}
                {log===3?<>
                  <FormPatient OldNSS={OlsNSS} nextDossier={nextDossier} selectedDossier={selectedDossier} modalTitle={modalTitle} Habitude={Habitude} refreshList={()=>this.refreshList()}/>      
                  <FormAntecedent selectedAntecedent={selectedAntecedent} modalTitle={"\""+selectedDossier.Id_P.Nom+" "+selectedDossier.Id_P.Prenom+"\" Ajouter Antecedent"} isFamiliale={false} FilterPath={""} refreshList={()=>this.refreshList()}/>  
                  <FormRendezVous selectedRendezVous={selectedRendezVous} modalTitle={"\""+selectedDossier.Id_P.Nom+" "+selectedDossier.Id_P.Prenom+"\" Ajouter Rendez Vous"} refreshList={()=>this.refreshList()}/>          
                  <FormAlarm selectedAlarm={selectedAlarm} modalTitle={"\""+selectedDossier.Id_P.Nom+" "+selectedDossier.Id_P.Prenom+"\" Ajouter Alarm"} refreshList={()=>this.refreshList()}/>  
                  <FormConsultation selectedConsultation={selectedConsultation} modalTitle={"\""+selectedDossier.Id_P.Nom+" "+selectedDossier.Id_P.Prenom+"\" Ajouter Consultation"} FilterPathMotif={""} FilterPathDiagnostique={""} refreshList={()=>this.refreshList()} GetDate={()=>this.props.GetDate()}/>  
                  <FormSuivi selectedSuivi={selectedSuivi} modalTitle={"\""+selectedDossier.Id_P.Nom+" "+selectedDossier.Id_P.Prenom+"\" Ajouter un Variable de Suivi"} Filtervar={""} refreshList={()=>this.refreshList()}/>  
                  <FormExamenVac selectedExamenVac={selectedExamenVac} modalTitle={"\""+selectedDossier.Id_P.Nom+" "+selectedDossier.Id_P.Prenom+"\" Ajouter Examen / Vaccine"} FilterExamenVac={""} Rappel={Rappel} FilterType={""} refreshList={()=>this.refreshList()} GetDate={()=>this.props.GetDate()}/>  
                  <FormExamenBiologie selectedexamenBiologie={selectedexamenBiologie} modalTitle={"\""+selectedDossier.Id_P.Nom+" "+selectedDossier.Id_P.Prenom+"\" Ajouter Examen Biologie"} refreshList={()=>this.refreshList()}/>
                  <FormExamenRadiologie selectedExamenRadiologie={selectedexamenRadiologie} modalTitle={"\""+selectedDossier.Id_P.Nom+" "+selectedDossier.Id_P.Prenom+"\" Ajouter Examen Radiologie"} FilterRadio={""} refreshList={()=>this.refreshList()}/>
                </>:null} 
           </div>
        </div>
    </div>
        )
    }
}