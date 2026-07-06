import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuPatient } from './MenuPatient';
import './Patient.css'
import { NavLink } from 'react-router-dom';

export class FormPatient  extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
    handleChangeNom =(e)=>{
    let X= this.props.selectedDossier;
    X.Id_P.Nom = e.target.value
    this.setState({selectedDossier:X});
    };
    handleChangeIdP = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.id = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeNSS = (e) => {
    let X = this.props.selectedDossier;
    if(/[0-9]/.test(e.target.value)||e.target.value==='') X.Id_P.NSS = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeNom = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.Nom = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeNomJF = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.NomJF = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangePrenom = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.Prenom = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeSexe = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.Sexe = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeSF = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.SF = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeDateNaiss = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.Date_naiss = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeLieu = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.Lieu = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeAdresse = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.Adresse = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeVille = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.Ville = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeTelephone = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.Telephone = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeProfession = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.Profession = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeNivdinst = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.Nivdinst = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeGrSanguin = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.GrSanguin = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeNbreenfants = (e) => {
    let X = this.props.selectedDossier;
    if(/^\d*$/.test(e.target.value)||e.target.value==='') X.Id_P.Nbreenfants = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeDegDincapacite = (e) => {
    let X = this.props.selectedDossier;
    X.Id_P.deg_dincapacite = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeNbreGrosseuses = (e) => {
    let X = this.props.selectedDossier;
    if(/^\d*$/.test(e.target.value)||e.target.value==='')X.Id_P.nbre_grosseuses = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeDateD = (e) => {
    let X = this.props.selectedDossier;
    X.DateD = e.target.value;
    this.setState({ selectedDossier: X });
    };
    handleChangeHabitude = (e)=>{
       if(e.target.checked){
        this.props.Habitude.push(parseInt(e.target.value));
       }else{
        let index = this.props.Habitude.findIndex((val) => val === parseInt(e.target.value));
        if (index > -1) {this.props.Habitude.splice(index, 1);}
       }
       this.setState({})
    }
/////////////////////////Actions in API
    SubmitPatient=(e)=>{ // att oubligatoire??
        e.preventDefault(); 
        if(this.props.selectedDossier.id===0){
            if(this.props.selectedDossier.Id_P.NSS!=="")
            fetch(variables.API_URL+'patientGet/'+this.props.selectedDossier.Id_P.NSS+'/')
            .then(res=>res.json())
            .then((result)=>{ 
                if(!result.VRF){
                    this.createClick()
                }else{
                    alert('NSS déjà utilisé')
                }
            },(error)=>{
                alert('Failed');
            })
            else this.createClick()
        }
        else{
            if(this.props.selectedDossier.Id_P.NSS!==this.props.OldNSS&&this.props.selectedDossier.Id_P.NSS!=="")
            fetch(variables.API_URL+'patientGet/'+this.props.selectedDossier.Id_P.NSS+'/')
            .then(res=>res.json())
            .then((result)=>{ 
                if(!result.VRF){
                    this.updateClick()
                }else{
                    alert('NSS déjà utilisé')
                }
            },(error)=>{
                alert('Failed');
            })
            else this.updateClick()
        }
    }
    createClick(){
        delete this.props.selectedDossier.id;
        delete this.props.selectedDossier.Id_P.id;

        fetch(variables.API_URL+'Dossier',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedDossier)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.AddHabitude(result.ID);
            this.CloseModel('DossierForm');
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'Dossier',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedDossier)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('DossierForm');
            this.UpdateHabitude()
        },(error)=>{
            alert('Failed');
        })
    }
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
            this.CloseModel('DossierForm');
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    AddHabitude(ID){
        let Habitude = []
        this.props.Habitude.map(H=>{Habitude.push({habitude:H,Id_P:ID})})
        fetch(variables.API_URL+'Habitude',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(Habitude)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        }) 
    }
    UpdateHabitude(){
        fetch(variables.API_URL+'Habitude/'+this.props.selectedDossier.Id_P.id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify()
        })
        .then(res=>res.json())
        .then((result)=>{
            this.AddHabitude(this.props.selectedDossier.Id_P.id)
        },(error)=>{
            alert('Failed');
        }) 
    }
    ////
    CloseModel(Modelid){
        const modal = document.getElementById(Modelid);
        modal.style.display = 'none';
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.remove();
        }
        document.body.classList.remove('modal-open');
        document.body.removeAttribute('style');
    }
    render(){
        const {
            nextDossier,
            selectedDossier,
            Habitude,
            modalTitle,
        }=this.props;
        return(
                <div className="modal fade" id="DossierForm" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className="modal-body" onSubmit={(e)=>this.SubmitPatient(e)}>
                        <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="p-2 w-100 m-auto bd-highlight">
                        <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                            <h5>Dossier</h5>
                            </div>
                            {selectedDossier.id!==0?
                            <button type="button" className="btn btn3 mr-1 p-1" onClick={()=>this.deleteClick(selectedDossier.id)}>
                                <i className="bi-trash"></i>
                            </button>:null}
                        </div>
                         <div className='flex'>
                            {selectedDossier.id!==0?
                            <div>
                                <input type="text" value={selectedDossier.id} onChange={null}/>
                                <span>Référence</span>
                            </div>:
                            <div >
                                <input type="text" value={nextDossier} onChange={null}/>
                                <span>Référence</span>
                            </div>
                            }
                            <div>
                                <input type="date" value={selectedDossier.DateD} onChange={this.handleChangeDateD} required/>
                                <span>Date</span>
                            </div>
                        </div>
                         <h5>Patient</h5>
                            <div>
                                <input type="text" value={selectedDossier.Id_P.NSS}onChange={this.handleChangeNSS}/>
                                <span>NSS</span>
                            </div>
                            <div className='flex treaple'>
                                <div>
                                    <input type="text" value={selectedDossier.Id_P.Nom}onChange={this.handleChangeNom} required/>
                                    <span>Nom</span>
                                </div>
                                <div>
                                    <input type="text" value={selectedDossier.Id_P.Prenom}onChange={this.handleChangePrenom} required/>
                                    <span>Prenom</span>
                                </div>
                                {selectedDossier.Id_P.Sexe==='Femme'?
                                <div>
                                    <input type="text" value={selectedDossier.Id_P.NomJF}onChange={this.handleChangeNomJF}/>
                                    <span>Nom jeun fille</span>
                                </div>:null}
                            </div>
                            <div className='w-50'>
                                <select className="form-control"  value={selectedDossier.Id_P.Sexe} onChange={this.handleChangeSexe} required>
                                    <option value=""></option>
                                    <option value="Homme">Homme</option>
                                    <option value="Femme">Femme</option>
                                </select>
                                <span>Sexe</span>
                            </div>
                            <div className='w-50'>
                                <select className="form-control"  value={selectedDossier.Id_P.SF} onChange={this.handleChangeSF} required>
                                    <option value=""></option>
                                    <option value="Marie">Marie</option>
                                    <option value="divorcée">divorcée</option>
                                    <option value="célibataire">célibataire</option>
                                    <option value="veuve">veuve</option>
                                </select>
                                <span>Situation Familiale</span>
                            </div>
                            <div className='flex'>
                                <div>
                                    <input type="date" value={selectedDossier.Id_P.Date_naiss}onChange={this.handleChangeDateNaiss} required/>
                                    <span>Date de naissance</span>
                                </div>
                                <div>
                                    <input type="text" value={selectedDossier.Id_P.Lieu}onChange={this.handleChangeLieu}/>
                                    <span>Lieu</span>
                                </div>
                            </div>
                            <h5>coordonnées</h5>
                            <div>
                                <input type="text" value={selectedDossier.Id_P.Adresse}onChange={this.handleChangeAdresse}/>
                                <span>Adresse</span>
                            </div>
                            <div className='flex'>
                                <div>
                                    <input type="text" value={selectedDossier.Id_P.Ville}onChange={this.handleChangeVille}/>
                                    <span>Ville</span>
                                </div>
                                <div>
                                    <input type="text" value={selectedDossier.Id_P.Telephone}onChange={this.handleChangeTelephone}/>
                                    <span>Telephone</span>
                                </div>
                            </div>
                            <h5>auter</h5>
                            <div className='flex'>
                                <div>
                                    <input type="text" value={selectedDossier.Id_P.Profession}onChange={this.handleChangeProfession}/>
                                    <span>Profession</span>
                                </div>
                                <div>
                                    <select className="form-control"  value={selectedDossier.Id_P.Nivdinst} onChange={this.handleChangeNivdinst}>
                                        <option value=""></option>
                                        <option value="scolaire">scolaire</option>
                                        <option value="moyenne">moyenne</option>
                                        <option value="Lycée">Lycée</option>
                                        <option value="universitaire">universitaire</option>
                                    </select>
                                    <span>Niveau d'inst</span>
                                </div>
                            </div>
                            <div className='flex'>
                                <div>
                                    <select className="form-control"  value={selectedDossier.Id_P.GrSanguin} onChange={this.handleChangeGrSanguin}>
                                        <option value=""></option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="o+">o+</option>
                                        <option value="o-">o-</option>
                                    </select>
                                    <span>Groupe Sanguin</span>
                                </div>
                                <div>
                                    <input type='text' value={selectedDossier.Id_P.deg_dincapacite} onChange={this.handleChangeDegDincapacite}/>
                                    <span>degré dincapacit</span>
                                </div>
                            </div>
                            <div className='flex'>
                                <div>
                                    <input type="text" value={selectedDossier.Id_P.Nbreenfants}onChange={this.handleChangeNbreenfants} required/>
                                    <span>Nombre enfants</span>
                                </div>
                            {selectedDossier.Id_P.Sexe==='Femme'?
                                <div>
                                    <input type="text" value={selectedDossier.Id_P.nbre_grosseuses}onChange={this.handleChangeNbreGrosseuses}/>
                                    <span>Nombre grossesses</span>
                                </div>:null}
                            </div>
                            <div className='flex'>
                                <h5>Habitude:</h5>
                                <input type="checkbox" className="m-2" value={1} onClick={this.handleChangeHabitude}  checked={Habitude.includes(1)} onChange={null}/>
                                <label className='m-2 h6'>Tabac</label>
                                <input type="checkbox" className="m-2" value={2} onClick={this.handleChangeHabitude}  checked={Habitude.includes(2)} onChange={null}/>
                                <label className='m-2 h6'>Alcool</label>
                                <input type="checkbox" className="m-2" value={3} onClick={this.handleChangeHabitude}  checked={Habitude.includes(3)} onChange={null}/>
                                <label className='m-2 h6'>La chique</label>
                            </div>
                        </div>
                        </div>

                        {selectedDossier.id===0?
                            <button type="submit"className="btn btn3 float-start">Create</button>
                            :null}

                        {selectedDossier.id!==0?
                            <button type="submit" className="btn btn3 float-start">Update</button>
                            :null}
                    </form>

                    </div>
                    </div> 
                </div>  
        )
    }
}