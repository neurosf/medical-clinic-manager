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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Loader } from '../Component/Loader';

SwiperCore.use([Navigation, Pagination]);

export class PatientInfo  extends Component{

    constructor(props){
        super(props);

        this.state={
            ///Dossier
            ID_Dossier:0,
            OldNSS:"",
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
            AntecedentmodalTitle:"",
            isFamilialeAntecedent:false,
            selectedAntecedent:{
                CommentaireA:"",
                DateA:"",
                ImportanceA:"",
                familiale:"Personnel",
                id:0,
                idD:1,
                id_path:0
            },
            FilterPathAntecedent:"",
            ///Rendez Vous
            RendezVous:[],
            RendezVousmodalTitle:"",
            selectedRendezVous:{
                etatR:"",
                dateR:"",
                Id_D:"",
                id:0,
            },
            ///Consultation
            Consultation:[],
            ConsultationmodalTitle:"",
            selectedConsultation:{
                CommentaireC:"",
                DateC:"",
                ImportanceC:"",
                cr_rapideM:"",
                cr_rapideD:"",
                Prix:0,
                Prix_paye:0,
                id:0,
                idD:1,
                motif:0,
                Diagnostique:0
            },
            FilterPathMotif:"",
            FilterPathDiagnostique:"",
            Images:[],
            ///Paiment
            Paiment:[],
            Prix_Totale:0,
            Prix_paye:0,
            ///Alarm
            Alarm:[],
            AlarmmodalTitle:"",
            selectedAlarm:{
                description:"",
                date:"",
                Id_P:"",
                id:0,
            },
            //Suivi
            Suivi:[],
            SuivimodalTitle:"",
            selectedSuivi:{
                DateVar:"",
                Importance:"",
                Valeur:"",
                Commentaire:"",
                id:0,
                idD:1,
                id_v:0
            },
            FilterVarSuivi:"",
            //ExamenVac
            ExamenVac:[],
            ExamenVacmodalTitle:"",
            selectedExamenVac:{
                Date_deb:"",
                occurance:"",
                id:0,
                idD:1,
                id_x:0
            },
            FilterVarExamenVac:"",
            FilterTypeExameVac:"",
            Rappel:[],
            AllRappel:[],
            //Examen
            modalTitleExamen:"",
            ExamenRadiologie:[],
            ExamenBiologie:[],
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
            FilterRadio:"",
            selectedexamenRadiologie:{
                id:0,
                date:this.props.GetDate().split('T')[0],
                Commentaire:"",
                Idex:0,
                Idcons:0
            },
            //// Filter
            FilterConsult:"",
            FilterSuivi:"",
            FilterEx:"",
            FilterExRad:"",
            FilterExBio:"",
            WithOutFilterConsult:[],
            WithOutFilterSuivi:[],
            WithOutFilterEx:[],
            WithOutFilterExRad:[],
            WithOutFilterExBio:[],
            ///
            isLoading:false,
            numslides:2
        }
    }
//////////Filter
    changeFilterConsult =(e)=>{
        this.state.FilterConsult=e.target.value;
        this.FilterConsult();
    }
    changeFilterSuivi =(e)=>{
        this.state.FilterSuivi=e.target.value;
        this.FilterSuivi();
    }
    changeFilterEx =(e)=>{
        this.state.FilterEx=e.target.value;
        this.FilterEx();
    }
    changeFilterExRad =(e)=>{
        this.state.FilterExRad=e.target.value;
        this.FilterExRad();
    }
    changeFilterExBio =(e)=>{
        this.state.FilterExBio=e.target.value;
        this.FilterExBio();
    }
    FilterConsult(){
        var FilterConsult=this.state.FilterConsult;

        var filteredData=this.state.WithOutFilterConsult.filter(
            function(el){
                return el.DateC.toString().toLowerCase().includes(
                    FilterConsult.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Consultation:filteredData});
    }
    FilterSuivi(){
        var FilterSuivi=this.state.FilterSuivi;

        var filteredData=this.state.WithOutFilterSuivi.filter(
            function(el){
                return el.DateVar.toString().toLowerCase().includes(
                    FilterSuivi.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Suivi:filteredData});
    }
    FilterEx(){
        var FilterEx=this.state.FilterEx;

        var filteredData=this.state.WithOutFilterEx.filter(
            function(el){
                return el.Date_deb.toString().toLowerCase().includes(
                    FilterEx.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({ExamenVac:filteredData});
    }
    FilterExRad(){
        var FilterExRad=this.state.FilterExRad;

        var filteredData=this.state.WithOutFilterExRad.filter(
            function(el){
                return el.date.toString().toLowerCase().includes(
                    FilterExRad.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({ExamenRadiologie:filteredData});
    }
    FilterExBio(){
        var FilterExBio=this.state.FilterExBio;

        var filteredData=this.state.WithOutFilterExBio.filter(
            function(el){
                return el.DateC.toString().toLowerCase().includes(
                    FilterExBio.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({ExamenBiologie:filteredData});
    }
//////////////////////////get data from API
    GetPatient=()=>{
        const pathname = window.location.pathname; 
        const ID_Dossier  = pathname.split('/')[2]
        this.state.isLoading=true;
        this.setState({});
        fetch(variables.API_URL+'DossierGet/'+ID_Dossier)
        .then(response=>response.json())
        .then(data=>{
            this.state.selectedDossier=data;
            this.state.OldNSS=this.state.selectedDossier.Id_P.NSS;
            this.GetHabitude(this.state.selectedDossier.Id_P.id);
            this.GetAntecedent(this.state.selectedDossier.id);
            this.GetRendezVous(this.state.selectedDossier.Id_P.id);
            this.GetAlarm(this.state.selectedDossier.Id_P.id);
            this.GetConsultation(this.state.selectedDossier.id);
            this.GetSuivi(this.state.selectedDossier.id);
            this.GetExamenVac(this.state.selectedDossier.id);
            this.GetExamenBiologie(this.state.selectedDossier.id);
            this.GetExamenRadiologie(this.state.selectedDossier.id);
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
    GetAntecedent=(ID_Patient)=>{
        fetch(variables.API_URL+'AntecedentGet/'+ID_Patient)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Antecedent:data});
        });
    }
    GetRendezVous=(ID_Patient)=>{
        fetch(variables.API_URL+'rendezvousGet/'+ID_Patient)
        .then(response=>response.json())
        .then(data=>{
            this.setState({RendezVous:data});
        });
    }
    GetAlarm=(ID_Patient)=>{
        fetch(variables.API_URL+'AlarmGet/'+ID_Patient)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Alarm:data});
        });
    }
    GetConsultation=(ID_Patient)=>{
        fetch(variables.API_URL+'ConsultationGet/'+ID_Patient)
        .then(response=>response.json())
        .then(data=>{
            this.state.Paiment=[];
            this.state.Prix_Totale=0;
            this.state.Prix_paye=0;
            data.map(C=>{
                this.state.Paiment.push({
                    id:C.id,
                    Date:C.DateC.split('T')[0]+" "+C.DateC.split('T')[1].split('Z')[0],
                    Prix_Totale:C.Prix_Totale,
                    Prix_paye:C.Prix_paye
                })
                this.state.Prix_Totale+=C.Prix_Totale;
                this.state.Prix_paye+=C.Prix_paye;
            })
            this.state.Consultation = data;
            this.state.WithOutFilterConsult = data;
            this.setState({});
            this.GetImages()
        });
    }
    GetSuivi=(ID_Patient)=>{
        fetch(variables.API_URL+'Variable_de_suivieGet/'+ID_Patient)
        .then(response=>response.json())
        .then(data=>{
            this.setState({Suivi:data,WithOutFilterSuivi:data});
        });
    }
    GetExamenVac=(ID_Patient)=>{
        fetch(variables.API_URL+'ExamenRegulier_vaccinGet/'+ID_Patient)
        .then(response=>response.json())
        .then(data=>{
            this.state.ExamenVac = data;
            this.state.WithOutFilterEx = data;
            this.setState({});
            this.GetAllRappel();
        });
    }
    GetAllRappel=()=>{
        let ID_ExamenVac=[];
        this.state.ExamenVac.map(EV=>{ID_ExamenVac.push(EV.id)})
        fetch(variables.API_URL+'RappelGet',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(ID_ExamenVac)
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({AllRappel:data});
        });
    }
    GetExamenBiologie=(ID_patient)=>{
        fetch(variables.API_URL+'exbiologiqueGet/'+ID_patient)
        .then(response=>response.json())
        .then(data=>{
            this.setState({ExamenBiologie:data,WithOutFilterExRad:data});
        });
    }
    GetExamenRadiologie=(ID_patient)=>{
        fetch(variables.API_URL+'examenRadiologiqueGet/'+ID_patient)
        .then(response=>response.json())
        .then(data=>{
            this.setState({ExamenRadiologie:data,WithOutFilterExRad:data});
        });
    }
    GetImages=()=>{
        let ConsultationIDs = [];
        this.state.Consultation.map(C=>{
            ConsultationIDs.push(C.id)
        }) 
        fetch(variables.API_URL+'GetImagePatient',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(ConsultationIDs)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.setState({Images:result});
        });
    }
    componentDidMount(){
        this.GetPatient();
        if(window.innerWidth<580){
            this.setState({numslides:1})
        }else{
            this.setState({numslides:2})
        }
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
            window.history.back();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    deleteClickAntecedent(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Antecedent/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.GetAntecedent(this.state.selectedDossier.id);
        },(error)=>{
            alert('Failed');
        })
        }
    }
    deleteClickRendezVous(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'rendezvous/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.GetRendezVous(this.state.selectedDossier.Id_P.id);
        },(error)=>{
            alert('Failed');
        })
        }
    }
    deleteClickAlarm(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Alarm/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.GetAlarm(this.state.selectedDossier.Id_P.id);
        },(error)=>{
            alert('Failed');
        })
        }
    }
    deleteClickConsultation(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Consultation/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.GetConsultation(this.state.selectedDossier.id);
        },(error)=>{
            alert('Failed');
        })
        }
    }
    deleteClickSuivi(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Variable_de_suivie/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.GetSuivi(this.state.selectedDossier.id);
        },(error)=>{
            alert('Failed');
        })
        }
    }
    deleteClickExamenVac(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'ExamenRegulier_vaccin/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.GetExamenVac(this.state.selectedDossier.id);
        },(error)=>{
            alert('Failed');
        })
        }
    }
    deleteClickExamenBio(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'exbiologique/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.GetExamenBiologie(this.state.selectedDossier.id);
        },(error)=>{
            alert('Failed');
        })
        }
    }
    deleteClickExamenRad(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'examenRadiologique/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.GetExamenRadiologie(this.state.selectedDossier.id);
        },(error)=>{
            alert('Failed');
        })
        }
    }
    ///////////////////////pompe data actions
    addClickAntecedent(){
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
    editClickAntecedent(A){
        this.setState({
            AntecedentmodalTitle:"Modifier Antecedent",
            isFamilialeAntecedent:(A.familiale!=='Personnel'),
            FilterPathAntecedent:A.id_path.Nom_path,
            selectedAntecedent:{
                CommentaireA:A.CommentaireA,
                DateA:A.DateA,
                ImportanceA:A.ImportanceA,
                familiale:A.familiale,
                id:A.id,
                idD:A.idD,
                id_path:A.id_path.id
            }
        });
    }
    addClickRendezVous(){
        this.setState({
            RendezVousmodalTitle:"Ajouter Rendez Vous",
            selectedRendezVous:{
                etatR:"NonPasse",
                dateR:this.props.GetDate().split('Z')[0],
                Id_D:this.state.selectedDossier.id,
                id:0,
            }
        });
    }
    editClickRendezVous(R){
        this.setState({
            RendezVousmodalTitle:"Modifier RendezVous",
            selectedRendezVous:{
                etatR:R.etatR,
                dateR:R.dateR.split('Z')[0],
                Id_D:R.Id_P,
                id:R.id,
            }
        });
    }
    addClickAlarm(){
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
    editClickAlarm(A){
        this.setState({
            AlarmmodalTitle:"Modifier Alarm",
            selectedAlarm:{
                description:A.description,
                date:A.date,
                Id_P:A.Id_P,
                id:A.id,
            }
        });
    }
    addClickConsultation(){
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
    addClickSuivi(){
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
    editClickSuivi(S){
        this.setState({
            SuivimodalTitle:"Modifier le Variable de suivi",
            selectedSuivi:{
                DateVar:S.DateVar,
                Importance:S.Importance,
                Valeur:S.Valeur,
                Commentaire:S.Commentaire,
                id:S.id,
                idD:S.idD,
                id_v:S.id_v.id
            },
            FilterVarSuivi:S.id_v.Nom_v,
        });
    }
    addClickExamenVac(){
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
    editClickExamenVac(EV){
        var ExamenvacID=EV.id;

        var filteredData=this.state.AllRappel.filter(
            function(el){
                return (el.Id_EXR===ExamenvacID)
            }
        );
        this.setState({Rappel:filteredData});
        this.setState({
            ExamenVacmodalTitle:"Modifier l'Examen / Vaccine",
            FilterVarExamenVac:EV.id_x.NomX,
            FilterTypeExameVac:EV.id_x.type,
            selectedExamenVac:{
                Date_deb:EV.Date_deb,
                occurance:EV.occurance,
                id:EV.id,
                idD:EV.idD,
                id_x:EV.id_x.id
            },
        });
    }
    addClickExamenBio(){
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
    editClickExamenBio(ExBio){
        this.setState({
            modalTitleExamen:"Modifie Examen Biologique",
            selectedexamenBiologie:{
                id:ExBio.id,
                date:ExBio.date,
                titre:ExBio.titre,
                Importance:ExBio.Importance,
                resultat:ExBio.resultat,
                dateres:ExBio.dateres,
                Commentaire:ExBio.Commentaire,
                IdD:ExBio.IdD
            }
        });
    }
    addClickExamenRad(){
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
    editClickExamenRad(ExRad){
        this.setState({
            modalTitleExamen:"Modifie Examen Radiologique",
            FilterRadio:ExRad.Idex.Nom,
            selectedexamenRadiologie:{
                id:ExRad.id,
                date:ExRad.date,
                Commentaire:ExRad.Commentaire,
                Idex:ExRad.Idex.id,
                IdD:ExRad.IdD
            },
        });
    }
    ////////////////
    openImage=(e)=>{
        const printableWindow = window.open('', '_blank');
        const style = printableWindow.document.createElement('style');
        style.innerHTML = `
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          
          .fullscreen-image {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
          }
        `;
        printableWindow.document.write(style.outerHTML);
        printableWindow.document.write(e.target.outerHTML);
    }
    render(){
        const {
            OldNSS,
            selectedDossier,
            selectedAntecedent,
            Habitude,
            Antecedent,
            AntecedentmodalTitle,
            isFamilialeAntecedent,
            FilterPathAntecedent,
            RendezVous,
            RendezVousmodalTitle,
            selectedRendezVous,
            Alarm,
            AlarmmodalTitle,
            selectedAlarm,
            Consultation,
            selectedConsultation,
            ConsultationmodalTitle,
            FilterPathMotif,
            FilterPathDiagnostique,
            Images,
            Paiment,
            Prix_Totale,
            Prix_paye,
            selectedSuivi,
            SuivimodalTitle,
            FilterVarSuivi,
            Suivi,
            FilterTypeExameVac,
            ExamenVacmodalTitle,
            selectedExamenVac,
            FilterVarExamenVac,
            ExamenVac,
            AllRappel,
            Rappel,
            ExamenRadiologie,
            ExamenBiologie,
            selectedexamenBiologie,
            selectedexamenRadiologie,
            FilterRadio,
            modalTitleExamen,
            isLoading,
            numslides
        }=this.state;
        const {
            log
        }=this.props
        return(
            <div>
            <br/>
            <div>
                <MenuPatient P={1} log={log} CloseMenuSide={this.props.CloseMenuSide} MenuSideOpen={this.props.MenuSideOpen}/>
                <div className='Patient'>
                    <br /><br /><br />
                <div className='Patientsfunc'>
                    <button type="button" className="button2 p-2 m-2 float-end" onClick={this.GetPatient}>
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                    <div>
                    {log===3?<>
                        <button type="button" className="button2 p-2 m-2 float-end" 
                            data-bs-toggle="modal"data-bs-target="#DossierForm">
                            Modifier Dossier <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button type="button" className="button2 p-2 m-2 float-end" 
                            onClick={()=>this.deleteClick(selectedDossier.id)}>
                                Supprimer<i className="bi-trash"></i>
                        </button>
                        </>:null}
                    </div>
                </div>
                {!isLoading?<div className='PatientIn'>
                        <div className='PatientInfo' id='InfoPatient'>
                            <div className='d-flex justify-content-between'>
                                <div className='DosierTitle' >Dossier <span>#{selectedDossier.id}</span></div>
                                <div className='DosierTitle'>{selectedDossier.DateD}</div>
                            </div>
                            <div className='PersonelInfo'>
                                <div>
                                    <img className='ProfileImg' src="../static/PIC/anonymous.png"/>
                                </div>
                                <h3 className=' text-center'>Information Personnel</h3>
                                <div className='IntpresonelInfo'>
                                    <div className='PerInfo'>
                                        <div>
                                        {selectedDossier.Id_P.NSS!==''?
                                            <div className="d-flex p-1 mb-1">
                                                <span className="InfoLable">#NSS:</span>
                                                <span className="InfoP" >{selectedDossier.Id_P.NSS}</span>
                                            </div>:null}
                                            <div className='d-flex'>
                                                <span className="InfoLable">Nom:</span>
                                                <span className="InfoP">{selectedDossier.Id_P.Nom}</span>
                                                <span className="InfoP">{selectedDossier.Id_P.Prenom}</span>
                                                {selectedDossier.Id_P.SF==='Marie'&&selectedDossier.Id_P.Sexe==='Famme'?
                                                    <span className="InfoP">{selectedDossier.Id_P.NomJF}</span>
                                                :null}
                                            </div>
                                            <div>
                                                <span className="InfoLable">Sexe:</span>
                                                <span className="InfoP mb-1">{selectedDossier.Id_P.Sexe}</span>
                                            </div>
                                            {selectedDossier.Id_P.SF!==''?
                                            <div>
                                                <span className="InfoLable">Situation Familiale:</span>
                                                <span className="InfoP mb-1 ">{selectedDossier.Id_P.SF}</span>
                                            </div>:null}
                                            <div className="p-1 mb-1">
                                                <span className="InfoLable">Naissance:</span>
                                                <span className="InfoP">{selectedDossier.Id_P.Date_naiss}</span>
                                            {selectedDossier.Id_P.Lieu!==''?<>
                                                <span className="InfoLable">a</span>
                                                <span className="InfoP">{selectedDossier.Id_P.Lieu}</span>
                                                </>:null}
                                            </div>
                                            {selectedDossier.Id_P.Adresse!==''?<>
                                            <div className="d-flex p-1 mb-1">
                                                <span className="InfoLable">Adresse:</span>
                                                <span className="InfoP">{selectedDossier.Id_P.Adresse}</span>
                                            </div></>:null}
                                            {selectedDossier.Id_P.Ville!==''?<>
                                            <div className="d-flex p-1 mb-1">
                                                <span className="InfoLable">Ville:</span>
                                                <span className="InfoP">{selectedDossier.Id_P.Ville}</span>
                                            </div></>:null}
                                            {selectedDossier.Id_P.Telephone!==''?<>
                                            <div className="d-flex p-1 mb-1">
                                                <span className="InfoLable">Telephone:</span>
                                                <span className="InfoP">{selectedDossier.Id_P.Telephone}</span>
                                            </div></>:null}
                                        </div>
                                        <div>
                                            {log===3?<>
                                                {selectedDossier.Id_P.Profession!==''?<>
                                                <div className="p-1 mb-1">
                                                    <span className="InfoLable">Profession:</span>
                                                    <span className="InfoP">{selectedDossier.Id_P.Profession}</span>
                                                </div></>:null}
                                                {selectedDossier.Id_P.Nivdinst!==''?<>
                                                <div className="p-1 mb-1">
                                                    <span className="InfoLable">Niveau d'inst:</span>
                                                    <span className="InfoP mb-1">{selectedDossier.Id_P.Nivdinst}</span>
                                                </div></>:null}
                                                {selectedDossier.Id_P.deg_dincapacite!==''?<>
                                                <div className="p-1 mb-1">
                                                    <span className="InfoLable">degre d'incapacite:</span>
                                                    <span className="InfoP mb-1">{selectedDossier.Id_P.deg_dincapacite}</span>
                                                </div></>:null}
                                                {selectedDossier.Id_P.GrSanguin!==''?<>
                                                <div className="p-1 mb-1">
                                                    <span className="InfoLable">Groupe Sanguin:</span>
                                                    <span className="InfoP mb-1">{selectedDossier.Id_P.GrSanguin}</span>
                                                </div></>:null}
                                                <div className="p-1 mb-1">
                                                    <span className="InfoLable">Nombre enfants</span>
                                                    <span className="InfoP">{selectedDossier.Id_P.Nbreenfants}</span>
                                                </div>
                                            {selectedDossier.Id_P.Sexe==='Famme'?
                                                <div className="p-1 mb-1">
                                                    <span className="InfoLable">Nombre grossesses</span>
                                                    <span className="InfoP">{selectedDossier.Id_P.nbre_grosseuses}</span>
                                                </div>:null}
                                            </>:null}  
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className='AntHab'>
                                   {log===3?<section className='d-block' id='Habitude'>
                                        <h4 className='TitelInfoP' id='Habitude'>Habitude</h4>
                                            <div className='d-flex'>
                                                <input type="checkbox" className="m-2" value={1} checked={Habitude.includes(1)} onChange={null}/>
                                                <span className='m-2 InfoPer'>Tabac</span>
                                            </div>
                                            <div className='d-flex'>
                                                <input type="checkbox" className="m-2" value={2} checked={Habitude.includes(2)} onChange={null}/>
                                                <span className='m-2 InfoPer'>Alcool</span>
                                            </div>
                                            <div className='d-flex'>
                                                <input type="checkbox" className="m-2" value={3} checked={Habitude.includes(3)} onChange={null}/>
                                                <span className='m-2 InfoPer'>La chique</span>
                                            </div>
                                        </section>:null}
                                    {log===3?<>
                                        <section id='Antecedent'>
                                            <h4 className='TitelInfoP'>
                                                <label>Antécédent</label>
                                                <button type="button" className="btn btn3 float-end" 
                                                    data-bs-toggle="modal"data-bs-target="#AntecedentForm" onClick={()=>this.addClickAntecedent()}>
                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                </button>
                                            </h4>
                                            <div className='AntContainer'>
                                                {Antecedent.map(A=>(
                                                    <div className="AntecedentIn">
                                                        <div className='contAntecedentIn'>
                                                            <span className='NomAntecedent'>
                                                                {selectedDossier.Id_P.Prenom}
                                                                {A.familiale!=='Personnel'?<>{"'s "+A.familiale}</>:null}
                                                                {" a "}<span className='nomPathAnt'>{A.id_path.Nom_path}</span>
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className='ImportanceAntencedent'>Importance {A.ImportanceA}</span>
                                                        </div>
                                                        <div>
                                                            <span className='CmntAntecedent'>{A.CommentaireA}</span>
                                                        </div>
                                                        <div className='contAntIn'>
                                                            <button type="button" className="btn3 float-end p-1 m-1" 
                                                                data-bs-toggle="modal"data-bs-target="#AntecedentForm" onClick={()=>this.editClickAntecedent(A)}>
                                                                    <i className="fa fa-pencil"></i>
                                                            </button>
                                                            <button type="button" className="btn3 float-end p-1 m-1" 
                                                                onClick={()=>this.deleteClickAntecedent(A.id)}>
                                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                            </button>
                                                            <span className='DateAnt'>{A.DateA}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section></>:null}   
                                </div>
                        </div>
                        <section className='ContainerRAP'>
                            <section>
                                <div className='ContainMoreInfo' id='RendezVous'>
                                    <h4 className='TitelInfoP'>
                                    <span><i class="fa-regular fa-calendar"></i>Rendez Vous</span>
                                    {log===3?
                                        <button type="button" className="btn btn4 float-end" 
                                            data-bs-toggle="modal"data-bs-target="#RendezVousForm" onClick={()=>this.addClickRendezVous()}>
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                        </button>:null}
                                    </h4>
                                    <section>
                                        {RendezVous.map(R=>(<>
                                            <div className='d-flex'>
                                                <div className='DateRenv'>{R.dateR.split('T')[0]+" "+R.dateR.split('T')[1].split('Z')[0]}</div>
                                                <button type="button" className="btn4 p-0 m-1 float-end" 
                                                    data-bs-toggle="modal"data-bs-target="#RendezVousForm" onClick={()=>this.editClickRendezVous(R)}>
                                                        <i className="fa fa-pencil"></i>
                                                </button>
                                                <button type="button" className="btn4 p-0 m-1 float-end" 
                                                    data-bs-toggle="modal"data-bs-target="#RendezVousForm" onClick={()=>this.deleteClickRendezVous(R.id)}>
                                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </>))}
                                    </section>
                                </div>
                                {log===3?<>
                                <div className='ContainMoreInfo' id='Alarms'>
                                    <h4 className='TitelInfoP'>
                                    <span><i class="fa-sharp fa-solid fa-bell"></i>Alarms</span>
                                    <button type="button" className="btn btn4 float-end" 
                                            data-bs-toggle="modal"data-bs-target="#AlarmForm" onClick={()=>this.addClickAlarm()}>
                                                <i class="fas fa-plus"></i>
                                        </button>
                                    </h4>
                                    <div className='AlarmContainer'>
                                        {Alarm.map(A=>(
                                            <div className='AlarmIn'>
                                                <div><span className='NomAlarm'>{A.description}</span></div>
                                                <div className='contAntIn'>
                                                    <button type="button" className="btn4  float-end p-0 m-1" 
                                                        data-bs-toggle="modal"data-bs-target="#AlarmForm" onClick={()=>this.editClickAlarm(A)}>
                                                            <i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button type="button" className="btn4  float-end p-0 m-1" 
                                                        onClick={()=>this.deleteClickAlarm(A.id)}>
                                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                    <span className='DateAnt'>{A.date}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div></>:null}
                                {log===3?<>
                                <div className='ContainMoreInfo' id='Paiement'>
                                    <h4 className='TitelInfoP'><span><i class="fa-solid fa-credit-card"></i>Paiement</span></h4>
                                <section>   
                                    <div>
                                        <div className="d-flex p-1 mb-1">
                                            <span className="InfoLable">Prix Totale des consultation:</span>
                                            <span className="InfoPer">{(Prix_Totale+" Da")}</span>
                                        </div>
                                        <div className="d-flex p-1 mb-1">
                                            <span className="InfoLable">Prix payé:</span>
                                            <span className="InfoPer">{Prix_paye+" Da"}</span>
                                        </div>
                                        <div className="d-flex p-1 mb-1">
                                            <span className="InfoLable">Le montant restant à payer:</span>
                                            <span className="InfoPer">{(Prix_Totale-Prix_paye)+" Da"}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h5>Paiement par consultation</h5>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Date</th>
                                                    <th>Prix Totale</th>
                                                    <th>Prix Paye</th>
                                                    <th>Prix restant</th>
                                                </tr>
                                            </thead>
                                    {Paiment.map((P,i)=>(
                                        <tr>
                                            <td><NavLink to={"/Consultation/"+P.id}><i class="bi bi-file-plus h5"></i></NavLink></td>
                                            <td className='h6 m-1'>{P.Date}</td>
                                            <td className='Medicamentdisc'>{P.Prix_Totale+" Da"}</td>
                                            <td className='Medicamentdisc'>{P.Prix_paye+" Da"}</td>
                                            <td className='Medicamentdisc'>{(P.Prix_Totale-P.Prix_paye)+" Da"}</td>
                                        </tr>
                                        ))} </table>
                                    </div>
                                </section> 
                                </div></>:null}
                            </section>
                        </section>
                        <div className='ContainerCS'>
                            <div className='ContainMoreInfo' id='Consultation'>
                                <h4 className='TitelInfoP'>
                                <span><i class="fa-sharp fa-solid fa-file-waveform"></i>Consultation</span>
                                <input type="text" className="FilterInput w-25" onChange={this.changeFilterConsult} placeholder="Date"/>
                                {log===3?<>
                                <button type="button" className="btn btn3 float-end" 
                                        data-bs-toggle="modal"data-bs-target="#ConsultationForm" onClick={()=>this.addClickConsultation()}>
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                    </button></>:null}
                                </h4>
                                <Swiper
                                slidesPerView={numslides} spaceBetween={30} pagination={{clickable: true,}}
                                navigation={true} modules={[Pagination, Navigation]} className="mySwiper" >
                                    {Consultation.map(C=>
                                    <SwiperSlide> 
                                        <div>
                                        <NavLink className="text-decoration-none m-auto" to={"/Consultation/"+C.id}>
                                            <div className='ConsultationIn'>
                                                <div className='contAntIn'>
                                                    <span></span>
                                                    <span className='ImportanceCons'>
                                                        {C.ImportanceC}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className='ConsultationMotif'>Motif : <span className='nomPathAnt'>{C.motif.Nom_path}</span></div>
                                                    <div className='TextCons'> {C.cr_rapideM}</div>
                                                </div>
                                                <div>
                                                    <div className='ConsultationMotif'>Diagnostique : <span className='nomPathAnt'>{C.Diagnostique.Nom_path}</span></div>
                                                    <div className='TextCons'> {C.cr_rapideD}</div>
                                                </div>   
                                                <span className='CmntCons'>{C.CommentaireC}</span>
                                                <div className='contAntIn'>
                                                    <span className='DateAnt'>{C.DateC.split('T')[0]+" "+C.DateC.split('T')[1].split('Z')[0]}</span>
                                                </div>
                                            </div>
                                        </NavLink>
                                        </div> 
                                        </SwiperSlide>
                                        )}
                                        <br/><br/>
                            </Swiper>
                            </div>
                        {log===3?<>
                        <div className='ContainMoreInfo' id='Suivi'>
                            <h4 className='TitelInfoP'>
                            <span><i class="fa-solid fa-hand-holding-medical"></i>Suivie</span>
                            <input type="text" className="FilterInput w-25" onChange={this.changeFilterSuivi} placeholder="Date"/>
                            <button type="button" className="btn btn3 float-end" 
                                    data-bs-toggle="modal"data-bs-target="#SuiviForm"onClick={()=>this.addClickSuivi()}>
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </h4>
                            <Swiper
                                slidesPerView={numslides} spaceBetween={30} pagination={{clickable: true,}}
                                navigation={true} modules={[Pagination, Navigation]} className="mySwiper" >
                            {Suivi.map(A=>(
                                <SwiperSlide>
                                    <div className="SuiviIn">
                                        <div className='contAntIn'>
                                            <span></span>
                                            <span className='ImportanceSuivi'>
                                                {A.Importance}
                                            </span>
                                        </div>
                                        <div className='TypeSuivi nomPathAnt'>{A.id_v.Nom_v}</div>
                                        <div className='NomSuivi'>Valeur {A.Valeur}</div>
                                        <div className='CmntSuivi'>{A.Commentaire}</div>
                                        <div className='contAntIn'>
                                            <button type="button" className="btn3 float-end p-1 m-1" 
                                                data-bs-toggle="modal"data-bs-target="#SuiviForm" onClick={()=>this.editClickSuivi(A)}>
                                                    <i className="fa fa-pencil"></i>
                                            </button>
                                            <button type="button" className="btn3 float-end p-1 m-1" 
                                                onClick={()=>this.deleteClickSuivi(A.id)}>
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                            <span className='DateAnt'>{A.DateVar}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                ))}
                                <br/><br/>
                            </Swiper>                                
                        </div></>:null}
                        </div>
                        <section className='ContainerRAP'>
                            {log===3?<>
                            <div className='ContainMoreInfo' id='Examen'>
                                <h4 className='TitelInfoP'>
                                    <span><i class="fa-solid fa-syringe"></i>Examen</span>
                                    <input type="text" className="FilterInput w-25" onChange={this.changeFilterEx} placeholder="Date"/>
                                    <button type="button" className="btn4 float-end" 
                                            data-bs-toggle="modal"data-bs-target="#ExamenVacForm" onClick={()=>this.addClickExamenVac()}>
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                </h4>
                                <Swiper
                                    slidesPerView={numslides} spaceBetween={30} pagination={{clickable: true,}}
                                    navigation={true} modules={[Pagination, Navigation]} className="mySwiper" >
                    {ExamenVac.map(A=>(
                                    <SwiperSlide>
                                        <div className="ExamenCons">
                                            <div className='contAntIn'>
                                                <span className='TirteConstExamen InfoExamenCons'>{A.id_x.NomX}</span>
                                                <span className='ImportanceExamen'>
                                                    {A.id_x.type}
                                                </span>
                                            </div>
                                            <span className='OccureceEx'>occurance {A.occurance}</span>
                                            <h5>Les Rappel</h5>
                                            <ul className='RappelList'>
                                                {AllRappel.map(R=>(<>{R.Id_EXR===A.id?<>
                                                <il className='RappelEx'>
                                                    <span> #{R.Num_Rappel}</span>
                                                    <span> {R.Date.split('T')[0]+" "+R.Date.split('T')[1].split('Z')[0]}</span>
                                                </il></>:null}</>
                                                ))}
                                            </ul>
                                            <div className='contAntIn'>
                                                <button type="button" className="btn4 float-end p-1 m-1" 
                                                    data-bs-toggle="modal" data-bs-target="#ExamenVacForm" onClick={()=>this.editClickExamenVac(A)}>
                                                        <i className="fa fa-pencil"></i>
                                                </button>
                                                <button type="button" className="btn4 float-end p-1 m-1" 
                                                    onClick={()=>this.deleteClickExamenVac(A.id)}>
                                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                                <span className='DateAnt'>{A.Date_deb}</span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    ))}
                                    <br/><br/>
                                </Swiper>
                            </div></>:null}
                            <div className='gridContainer'>
                                {log===3?<>
                                <div className='ContainMoreInfo' id='ExamenRad'>
                                    <h4 className='TitelInfoP'><span><i class="fa-solid fa-x-ray"></i>Examen radiologique</span></h4>
                                    <h4 className='TitelInfoP'>
                                        <input type="text" className="FilterInput w-25" onChange={this.changeFilterExRad} placeholder="Date"/>
                                        <button className='btn4 float-end' type='button'data-bs-toggle="modal"data-bs-target="#ExamenRadiologieForm" onClick={()=>this.addClickExamenRad()}>
                                            <i class="fa fa-plus m-1"></i></button>
                                    </h4>
                                    <div className='AntContainer'>
                                        {ExamenRadiologie.map((Examen,i)=>(
                                            <div className='ExamenCons ExamenBR'>
                                            <div className='contAntIn'>
                                                <span className='TirteConstExamen InfoExamenCons '>{Examen.Idex.Nom}</span>
                                            </div>
                                            <div className="input-group">
                                                <span className='LabelExamenCons'></span>
                                                <span className='InfoExamenCons'>{Examen.Commentaire}</span>
                                            </div>
                                            <div className='contAntIn m-1'>
                                                <button type="button" className="btn4 float-end p-0 m-1" 
                                                    data-bs-toggle="modal"data-bs-target="#ExamenRadiologieForm" onClick={()=>this.editClickExamenRad(Examen)}>
                                                        <i className="fa fa-pencil"></i>
                                                </button>
                                                <button type="button" className="btn4 float-end p-0 m-1" 
                                                    onClick={()=>this.deleteClickExamenRad(Examen.id)}>
                                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                                <span className='DateAnt'>{Examen.date}</span>
                                            </div>
                                        </div>
                                            ))}
                                    </div>
                                </div></>:null}
                                {log===3?<>
                                <div className='ContainMoreInfo' id='ExamenBio'>
                                <h4 className='TitelInfoP'><span><i class="fa-solid fa-dna"></i>Examen biologique</span></h4>
                                    <h4 className='TitelInfoP'>
                                        <input type="text" className="FilterInput w-25" onChange={this.changeFilterExBio} placeholder="Date"/>
                                        <button className='btn4 float-end' type='button'data-bs-toggle="modal"data-bs-target="#examenBiologieForm" onClick={()=>this.addClickExamenBio()}>
                                            <i class="fa fa-plus m-1"></i></button>
                                    </h4>
                                    <div className='AntContainer'>
                                        {ExamenBiologie.map((Examen,i)=>(
                                            <div className='ExamenCons ExamenBR'>
                                                    <div className='contAntIn'>
                                                        <span className='TirteConstExamen InfoExamenCons '>{Examen.titre}</span>
                                                        <span className='ImportanceExamen'>
                                                            {Examen.Importance}
                                                        </span>
                                                    </div>
                                                    {Examen.resultat?<>
                                                    <div className="input-group">
                                                        <span className='LabelExamenCons'>Résultat</span>
                                                        <span className='InfoExamenCons'>{Examen.dateres}</span>
                                                    </div>
                                                    <div className="input-group">
                                                        <span className='LabelExamenCons'></span>
                                                        <span className='InfoExamenCons'>{Examen.Commentaire}</span>
                                                    </div>
                                                    </>:null}
                                                    <div className='contAntIn m-1 '>
                                                        <button type="button" className="btn4 float-end p-0 m-1" 
                                                            data-bs-toggle="modal"data-bs-target="#examenBiologieForm" onClick={()=>this.editClickExamenBio(Examen)}>
                                                                <i className="fa fa-pencil"></i>
                                                        </button>
                                                        <button type="button" className="btn4 float-end p-0 m-1" 
                                                            onClick={()=>this.deleteClickExamenBio(Examen.id)}>
                                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                                        </button>
                                                        <span className='DateAnt'>{Examen.date}</span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div></>:null}
                            </div>
                        </section>
                        <section className='ContainerCS'>
                            {log===3?<>
                            <div className='ContainMoreInfo' id='Photos'>
                                <h4 className='TitelInfoP'><span><i class="fa-sharp fa-solid fa-image"></i>Photos</span></h4>
                                <seciton className='PhotosPatient'>
                                    {Images.map((Img) => (
                                        <div key={Img.id} className='ImgIn'>
                                            <div className='buttons'>
                                                <div className='buttons'>
                                                    <div className='d-flex'>
                                                    <NavLink className='btn7 m-1 p-1' to={"/Consultation/"+Img.Idcons.id}>
                                                     <i class="fa-sharp fa-solid fa-file-waveform"></i>
                                                    </NavLink>
                                                    <a href={variables.Server_URL+Img.image} target="_blank" className='btn7 m-1 p-1'><i class="fa-solid fa-eye"></i></a>
                                                    </div>
                                                    <div className='imgdate'>{Img.Idcons.DateC.split('T')[0]}</div>
                                                </div>
                                            </div>
                                            <img className='fullscreen-image' src={variables.Server_URL+Img.image} alt={`Image ${Img.id}`}/>
                                        </div>
                                    ))}
                                </seciton>
                            </div></>:null}
                        </section>
                    </div>:<Loader/>}
                    {log===3?<>
                  <FormPatient OldNSS={OldNSS} selectedDossier={selectedDossier} modalTitle={"Modifier Dossier"} Habitude={Habitude} refreshList={()=>this.GetPatient()}/>      
                  <FormAntecedent selectedAntecedent={selectedAntecedent} modalTitle={AntecedentmodalTitle} isFamiliale={isFamilialeAntecedent} FilterPath={FilterPathAntecedent} refreshList={()=>this.GetAntecedent(selectedDossier.id)}/>  
                  <FormRendezVous selectedRendezVous={selectedRendezVous} modalTitle={RendezVousmodalTitle} refreshList={()=>this.GetRendezVous(selectedDossier.id)}/>          
                  <FormAlarm selectedAlarm={selectedAlarm} modalTitle={AlarmmodalTitle} refreshList={()=>this.GetAlarm(selectedDossier.id)}/>  
                  <FormConsultation selectedConsultation={selectedConsultation} modalTitle={ConsultationmodalTitle} FilterPathMotif={FilterPathMotif} FilterPathDiagnostique={FilterPathDiagnostique} refreshList={()=>this.GetConsultation(selectedDossier.id)} GetDate={()=>this.props.GetDate()}/>          
                  <FormSuivi selectedSuivi={selectedSuivi} modalTitle={SuivimodalTitle} Filtervar={FilterVarSuivi} refreshList={()=>this.GetSuivi(selectedDossier.id)}/>  
                  <FormExamenVac selectedExamenVac={selectedExamenVac} modalTitle={ExamenVacmodalTitle} FilterExamenVac={FilterVarExamenVac} Rappel={Rappel} FilterType={FilterTypeExameVac} refreshList={()=>this.GetExamenVac(selectedDossier.id)} GetDate={()=>this.props.GetDate()}/>  
                  <FormExamenBiologie selectedexamenBiologie={selectedexamenBiologie} modalTitle={modalTitleExamen} refreshList={()=>this.GetExamenBiologie(selectedDossier.id)}/>
                 <FormExamenRadiologie selectedExamenRadiologie={selectedexamenRadiologie} modalTitle={modalTitleExamen} FilterRadio={FilterRadio} refreshList={()=>this.GetExamenRadiologie(selectedDossier.id)}/>
                </>:null}
            </div>
        </div>
    </div>
        )
    }
}