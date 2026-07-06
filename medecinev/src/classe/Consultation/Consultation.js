import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import { variables } from '../../Variables';
import { MenuPatient } from '../Patient/MenuPatient';
import { FormConsultation } from './FormConsultation';
import  FormFacture  from './Facture';
import { Loader } from '../Component/Loader';

export class Consultation extends Component{

    constructor(props){
        super(props);

        this.state={
            ///Consultation
            Consultation:[],
            ConsultationWithoutFilter:[],
            NomFilter:"",
            ConsultationmodalTitle:"",
            selectedConsultation:{
                CommentaireC:"",
                DateC:"",
                Diagnostique:{
                    id: 0,
                    Nom_path: ''
                },
                ImportanceC:"",
                Prix:0,
                cr_rapideD:"",
                cr_rapideM:"",
                id:3,
                idD:{id: 3, Id_P: {
                    NSS:"",
                    Nom:"",
                    Prenom:"",
                    id:0
                }, DateD: ''},
                motif:{
                    id: 0,
                    Nom_path: ''
                }
            },
            FilterPathMotif:"",
            FilterPathDiagnostique:"",
            ///
            NumeroFilter:"",
            MotifFilter:"",
            DiagnostiqueFilter:"",
            DateCFilter:"",
            HeureFilter :"",
            PatientFilter:"",
            isLoading:false,
            PhotoPath:variables.PHOTO_URL,
        }
    }
    FilterFn(){
        var NumeroFilter=this.state.NumeroFilter;
        var MotifFilter=this.state.MotifFilter;
        var DiagnostiqueFilter=this.state.DiagnostiqueFilter;
        var DateCFilter=this.state.DateCFilter;
        var HeureFilter=this.state.HeureFilter;
        var PatientFilter=this.state.PatientFilter;

        var filteredData=this.state.ConsultationWithoutFilter.filter(
            function(el){
                let Date = el.DateC.split('T')[0];
                let Heure = el.DateC.split('T')[1].split('Z')[0];

                return el.id.toString().toLowerCase().includes(
                    NumeroFilter.toString().trim().toLowerCase()
                )&&el.motif.Nom_path.toString().toLowerCase().includes(
                    MotifFilter.toString().trim().toLowerCase()
                )&&el.Diagnostique.Nom_path.toString().toLowerCase().includes(
                    DiagnostiqueFilter.toString().trim().toLowerCase()
                )&&Date.toString().toLowerCase().includes(
                    DateCFilter.toString().trim().toLowerCase()
                )&&Heure.toString().toLowerCase().includes(
                    HeureFilter.toString().trim().toLowerCase()
                )&&(el.idD.Id_P.Nom+" "+el.idD.Id_P.Prenom).toString().toLowerCase().includes(
                    PatientFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Consultation:filteredData});
    }
    sortResult(prop,asc){
        var sortedData=this.state.ConsultationWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({Consultation:sortedData});
    }
    changeNumeroFilter = (e)=>{
        this.state.NumeroFilter=e.target.value;
        this.FilterFn();
    }
    changeMotifFilter = (e)=>{
        this.state.MotifFilter=e.target.value;
        this.FilterFn();
    }
    changeDiagnostiqueFilter = (e)=>{
        this.state.DiagnostiqueFilter=e.target.value;
        this.FilterFn();
    }
    changeDateCFilter = (e)=>{
        this.state.DateCFilter=e.target.value;
        this.FilterFn();
    }
    changeHeureFilter = (e)=>{
        this.state.HeureFilter =e.target.value;
        this.FilterFn();
    }
    changePatientFilter= (e)=>{
        this.state.PatientFilter =e.target.value;
        this.FilterFn();
    }
//////////////////////////get data from API
    GetCons=()=>{
        fetch(variables.API_URL+'ConsultationGetAll')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Consultation:data,ConsultationWithoutFilter:data,isLoading:false})
        });
    }
    componentDidMount(){
        this.GetCons();
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
    /////////////////////////Actions in API
    deleteClick(id){
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
            alert(result);
            window.history.back();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    ///////////////////////pompe data actions
    editClickConsultation(C){
        this.setState({
            ConsultationmodalTitle:"Modifier Consultation",
            selectedConsultation:{
                CommentaireC:C.CommentaireC,
                DateC:C.DateC.split('Z')[0],
                ImportanceC:C.ImportanceC,
                cr_rapideM:C.cr_rapideM,
                cr_rapideD:C.cr_rapideD,
                id:C.id,
                idD:C.idD,
                motif:C.motif.id,
                Prix:C.Prix,
                Prix_paye:C.Prix_paye,
                Prix_Totale:C.Prix_Totale,
                Diagnostique:C.Diagnostique.id
            },
            FilterPathMotif:C.motif.Nom_path,
            FilterPathDiagnostique:C.Diagnostique.Nom_path,
        });
    }
    ////////////////
    render(){
        const {
            Consultation,
            ConsultationmodalTitle,
            selectedConsultation,
            FilterPathMotif,
            FilterPathDiagnostique,
            isLoading,
        }=this.state;
        const {
            log
        }=this.props;
        return(
            <div>
            <br/>
            <MenuPatient CloseMenuSide={this.props.CloseMenuSide} MenuSideOpen={this.props.MenuSideOpen}/>
            <div className='Patient'>
                <br /><br /><br />
            <div className='Patientsfunc'>
                <button type="button" className="btnrefresh button2 m-2 float-end" onClick={this.GetCons}>
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                </button>
            </div>
           {!isLoading?<>
        <div className='FontTable'>
         <table className="table">
            <thead>
            <tr>
                <th className='thsideR'>
                    <div className="d-flex flex-row">
                        <input className="form-control" onChange={this.changeNumeroFilter} placeholder="Numero"/>
                        <button type="button" className="btn p-1 btn-light" onClick={()=>this.sortResult('id',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn p-1 btn-light" onClick={()=>this.sortResult('id',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                    </div>
                </th>
                <th>
                    <div className="d-flex flex-row">
                        <input className="form-control" onChange={this.changePatientFilter} placeholder="Patient"/>
                    </div>
                </th>
                <th>
                    <div className="d-flex flex-row">
                        <input className="form-control" onChange={this.changeMotifFilter} placeholder="Motif"/>
                    </div>
                </th>
                <th>
                    <div className="d-flex flex-row">
                        <input className="form-control" onChange={this.changeDiagnostiqueFilter} placeholder="Diagnostique"/>
                    </div>
                </th>
                <th>
                <div className="d-flex flex-row">
                        <input type='date' className="form-control" onChange={this.changeDateCFilter} placeholder="Date"/>
                        <button type="button" className="btn p-1 btn-light" onClick={()=>this.sortResult('DateC',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn p-1 btn-light" onClick={()=>this.sortResult('DateC',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                    </div>
                </th>
                <th>
                <div className="d-flex flex-row">
                        <input type='time' className="form-control" onChange={this.changeHeureFilter} placeholder="Heure"/>
                    </div>
                </th>
                <th className='thsideL'></th>
            </tr>
            </thead>
            <tbody>
            
                {Consultation.map(Cons=>
                    <tr key={Cons.id}>
                        <td className='lineTd'>
                            <NavLink to={"/Consultation/"+Cons.id}><i class="fa-solid fa-hand-pointer fa-rotate-90"></i></NavLink>
                            {Cons.id}
                        </td>
                        <td>{Cons.idD.Id_P.Nom+" "+Cons.idD.Id_P.Prenom}</td>
                        <td>{Cons.motif.Nom_path}</td>
                        <td>{Cons.Diagnostique.Nom_path}</td>
                        <td>{Cons.DateC.split('T')[0]}</td>
                        <td>{Cons.DateC.split('T')[1].split('Z')[0]}</td>
                        <td className='endTd'>
                        {log===3?<>
                        <button className='btn PatientMenuButton' onClick={()=>this.OpenPatientMenu(Cons.id)}><i class="bi bi-three-dots-vertical PatientMenuButton"></i></button>
                        <div className='MenuPatientfnc' open="0" id={"PatientFnctbtn"+Cons.id}>
                            <button type="button" className="btn btn-light mr-1"
                            data-bs-toggle="modal" data-bs-target="#ConsultationForm" onClick={()=>this.editClickConsultation(Cons)}>
                                <span className='m-2'>Modifier</span>
                                <i className="bi-pencil-square"></i>
                            </button>
                            <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(Cons.id)}>
                                <span className='m-2'>Supprime</span>
                                <i className="bi-trash"></i>
                            </button>
                            <button type="button" className="btn btn-light mr-1"
                            data-bs-toggle="modal" data-bs-target="#FactureForm" onClick={()=>this.editClickConsultation(Cons)}>
                                <span className='m-2'>Facture</span>
                            </button>
                        </div></>:null}
                        </td>
                    </tr>
                    )}
                
            </tbody>
            
            </table>
        </div>
            </>:<Loader/>}
            <FormConsultation selectedConsultation={selectedConsultation} modalTitle={ConsultationmodalTitle} FilterPathMotif={FilterPathMotif} FilterPathDiagnostique={FilterPathDiagnostique} refreshList={()=>this.GetCons()} GetDate={()=>this.props.GetDate()}/>      
            <FormFacture selectedConsultation={selectedConsultation} modalTitle={"Facture"} />      
            </div>
        </div>
        )
    }
}