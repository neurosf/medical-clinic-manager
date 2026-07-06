import React,{Component} from 'react';
import { variables } from '../../Variables';
import { Formsalle } from './Formsalle';
import{MenuPatient} from '../Patient/MenuPatient';
export class Salleattente  extends Component{

    constructor(props){
        super(props);
        this.state={
        salle:[],
        modalTitle:"",
        patientData:0,
        numA:0,
        date:this.props.GetDate().split("T")[0],
        selectedsalle:{
            id:0,
            Nom :"",
            Prenom :"",
            Tour:"",
            Date:"",
            etat:"",
            Sexe:""
        },
        PhotoPath:variables.PHOTO_URL,
        sallenumFilter:"",
         sallenomFilter:"",
         salleprenomFilter:"",
         salletourFilter:"",
         SalledateFilter:"",
         salleetatFilter:"",
         sallesexefilter:"",
         salleWithoutFilter:[],
    } 
}
    FilterFn(){
        var sallenumFilter=this.state.sallenumFilter;
        var sallenomFilter=this.state.sallenomFilter;
        var salleprenomFilter=this.state.salleprenomFilter;
        var salletourFilter=this.state.salletourFilter;
        var SalledateFilter=this.state.SalledateFilter;
        var salleetatFilter=this.state.salleetatFilter;
        var sallesexefilter=this.state.sallesexefilter; 
        var filteredData=this.state.salleWithoutFilter.filter(
            function(el){
                return el.id.toString().toLowerCase().includes(
                    sallenumFilter.toString().trim().toLowerCase()
                )  && el.Nom.toString().toLowerCase().includes(
                   sallenomFilter.toString().trim().toLowerCase()
                )&& el.Prenom.toString().toLowerCase().includes(
                   salleprenomFilter.toString().trim().toLowerCase()
                )&& el.Tour.toString().toLowerCase().includes(
                    salletourFilter.toString().trim().toLowerCase()
                 )&& el.Date.toString().toLowerCase().includes(
                    SalledateFilter.toString().trim().toLowerCase()
                 )&& el.etat.toString().toLowerCase().includes(
                    salleetatFilter.toString().trim().toLowerCase()
                 )&& el.Sexe.toString().toLowerCase().includes(
                    sallesexefilter.toString().trim().toLowerCase()
                 )
            }
        );
        this.setState({salle:filteredData});
    }
    sortResult(prop,asc){
        var sortedData=this.state.contactWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });
    
        this.setState({salle:sortedData});
    }

changesallenumFilter = (e)=>{
    this.state.sallenumFilter=e.target.value;
    this.FilterFn();
}

changesalleNomFilter = (e)=>{
    this.state.sallenomFilter=e.target.value;
    this.FilterFn();
}
changesalleprenomFilter = (e)=>{
    this.state.salleprenomFilter=e.target.value;
    this.FilterFn();
}

changesalletourFilter = (e)=>{
    this.state.salletourFilter=e.target.value;
    this.FilterFn();
}
changesalledateFilter = (e)=>{
    this.state.SalledateFilter=e.target.value;
    this.FilterFn();
}
changesalleetatFilter = (e)=>{
    this.state.salleetatFilter=e.target.value;
    this.FilterFn();
}
changesallesexeFilter = (e)=>{
    this.state.sallesexefilter=e.target.value;
    this.FilterFn();
}
refreshList=()=>{
    fetch(variables.API_URL+'salleaujourdhui')
    .then(response=>response.json())
    .then(data=>{
        this.setState({salle:data,salleWithoutFilter:data});
        this.fetchPatientData();
    });
}
refreshListdate=()=> {
  const currentDate = this.state.date;
  const url = variables.API_URL + 'salle/' + currentDate;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({ salle: data, salleWithoutFilter: data });
      this.fetchPatientData();
    });
}

componentDidMount(){
    this.refreshList();
}

///////////////////////pompe data actions
addClick(){
    this.setState({
        modalTitle:"Ajouter patient",
        selectedsalle:{
            id:0,      
            Nom :"",
            Prenom :"",
            Tour:this.getLastTour(),
            Date:this.props.GetDate().split("T")[0] ,
            etat:false ,
            Sexe:""
        },
    });
}
editClick(sal){
    this.setState({
        modalTitle:"Modifier  patient",
        selectedsalle:{
            id:sal.id,
            Nom :sal.Nom,
            Prenom :sal.Prenom,
            Tour:sal.Tour,
            Date:sal.Date,
            etat:sal.etat ,
            Sexe:sal.Sexe 
            
        }
        
    });
}
updateClick() {
    fetch(variables.API_URL+'Salle',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.state.selectedsalle)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.refreshList();
        this.fetchPatientData();
    },(error)=>{
        alert('Failed');
    })
}
editClicketat(sal){
        this.state.selectedsalle={
            id:sal.id,
            Nom :sal.Nom,
            Prenom :sal.Prenom,
            Tour:sal.Tour,
            Date:sal.Date,
            etat:!sal.etat ,
            Sexe:sal.Sexe 
        }
       this.updateClick();
      if(this.state.selectedsalle.etat){
        this.setCookie('numA', this.state.selectedsalle.Tour, 1); 
      }
}
showMoreInfo(sal) {
    this.setState({
      modalTitle: "Informations détaillées du patient",
      selectedsalle:{
        id:sal.id,
        Nom :sal.Nom,
        Prenom :sal.Prenom,
        Tour:sal.Tour,
        Date:sal.Date,
        etat:sal.etat ,
        Sexe:sal.Sexe 
    }
    });
}

/////////////////////////Actions in API

deleteClick(id){
    if(window.confirm('Are you sure?')){
    fetch(variables.API_URL+'Salle/'+id,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((result)=>{
        this.refreshList();
        this.fetchPatientData();
    },(error)=>{
        alert('Failed');
    })
    }
}
getLastTour() {
    const { salle } = this.state;
    if (salle.length === 0) {
      return 1; // Si la liste est vide, retourne 1
    } 
    const lastTour = salle[salle.length - 1].Tour;
    return lastTour + 1; // Retourne le dernier tour + 1
  }
  
  fetchPatientData = async () => {
    try {
      const response = await fetch(variables.API_URL+'sallecount');

      const data = await response.json();
      this.setState({ patientData: data });
    } catch (error) {
    }
  };

// Fonction pour stocker un cookie
 setCookie = (name, value, days) => {
  const currentDate = new Date();
  const endOfToday = new Date(currentDate);
  endOfToday.setDate(currentDate.getDate() + 1);
  endOfToday.setHours(0, 0, 0, 0);
  const cookieValue = encodeURIComponent(value) + `; expires=${endOfToday.toUTCString()}`;
  document.cookie = name+`=${cookieValue}; path=/;`;
  this.setState({})
};

// Fonction pour récupérer la valeur d'un cookie
 getCookie = (name) => {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};

updatenumA(id){
  this.setState({ numA: id });
};
changedate = (e) => {
  this.state.date= e.target.value;
  this.refreshListdate();
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
        salle,
        selectedsalle,
        modalTitle,
        patientData,
        numA,
        date,
    }=this.state;
    return(
        <div>           
        <br/>
        <MenuPatient CloseMenuSide={this.props.CloseMenuSide} MenuSideOpen={this.props.MenuSideOpen}/>
        <div>
            <div className='Medicale'>
                <br />   
              <div className='gridContainerSall'>
                <div class="cardSall">
                  <div class="cardSall-img">
                    <img src='./static/PIC/advice.png'></img>
                  </div>
                  <div class="cardSall-title">Numéro de patient en cours</div>
                  <div class="cardSall-footer">
                      <div class="cardSall-price">{this.getCookie('numA')|0}</div>
                  </div>
                </div>
                <div class="cardSall">
                  <div class="cardSall-img">
                   <img src='./static/PIC/patient.png'></img>
                  </div>
                  <div class="cardSall-title">Nombre de patients en attente</div>
                  <div class="cardSall-footer">
                      <div class="cardSall-price">{patientData.all_patients_count}</div>
                  </div>
                </div>
                <div class="cardSall">
                  <div class="cardSall-img">
                    <img src='./static/PIC/patientmal.png'></img>
                  </div>
                  <div class="cardSall-title">Patients de homme en attente</div>
                  <div class="cardSall-footer">
                      <div class="cardSall-price">{patientData.male_patients_count}</div>
                  </div>
                </div>
                <div class="cardSall">
                  <div class="cardSall-img">
                    <img src='./static/PIC/capsule.png'></img>
                  </div>
                  <div class="cardSall-title">Patients de Femme en attente</div>
                  <div class="cardSall-footer">
                      <div class="cardSall-price">{patientData.femal_patients_count}</div>
                  </div>
                </div>
              </div>
              <div className='Patientsfunc'>
                    <div>
                      <button type="button" className="button2 m-2 float-end" style={{height:"50px"}}
                      data-bs-toggle="modal"data-bs-target="#Sallathetform" onClick={()=>this.addClick()}>
                          Ajouter  Patient
                      </button>
                      <button type="button" className="btnrefresh button2 m-2 float-end" onClick={this.refreshList}>
                            <i class="fa fa-refresh" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className='containerRendVusinput m-3'>
                        <h6 className='TextTopRendeVDate'>Salle d'attente de</h6>
                        <input type="date" className="FilterInput" value= {date} onChange={this.changedate}  />
                    </div>
                </div>
                <div className='FontTable'>
                <table className="table">
                <thead>
                <tr>   
                  <th className='thsideR'></th>  
                  <th>
                        <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changesalletourFilter} placeholder="Tour"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Tour',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Tour',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                                       
                    <th>
                        <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changesalleNomFilter} placeholder="Nom"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th>
                        <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changesalleprenomFilter} placeholder="Prénom"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Prenom',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Prenom',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th>
                        <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changesallesexeFilter} placeholder="Sexe"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Sexe',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Sexe',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th>
                        <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changesalleetatFilter} placeholder="etat"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('etat',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('etat',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th className='thsideL'></th>
            </tr>
            </thead>
            <tbody>
                {salle.map(sal=>
                    <tr key={sal.id}>
                        { !sal.etat?  
                        <td className='lineTd'>
                          <button className="btn5" style={{'--Colorbtn':"#b45e5e"}}   onClick={()=>
                            this.editClicketat(sal)
                            }>
                          <i className="bi bi-arrow-right-circle-fill me-1"></i> Passer
                        </button>
                          </td> : (sal.etat && this.getCookie('numA')==sal.Tour)?
                        <td className='lineTd'><button className="btn5"style={{'--Colorbtn':"#4baabc"}} >En cours</button></td>
                        :  <td className='lineTd'>
                        <button className="btn5" style={{ '--Colorbtn':"#66cf86" }} onClick={() => this.editClicketat(sal)}>
                        <i className="bi bi-check-circle-fill me-1"></i> Passer
                        </button>
                        </td>}
                        <td>{sal.Tour}</td>
                        <td>{sal.Nom}</td>
                        <td>{sal.Prenom}</td>
                        <td>{sal.Sexe}</td>
                        <td>{sal.etat ? "Passer" : "Attente"}</td>
                        <td className='endTd'>
                      <div className="dropdown">
                        <button
                          className="btn btn-light dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <button
                            className="dropdown-item" data-bs-toggle="modal"data-bs-target="#Sallathetform"
                            onClick={()=>this.editClick(sal)}
                          >
                            <i className="bi bi-pencil-square"></i> Modifier
                          </button>
                          <button
                            className="dropdown-item"
                            onClick={() => this.deleteClick(sal.id)}
                          >
                            <i className="bi bi-trash"></i> Supprimer
                          </button>
                          <button
                            className="dropdown-item" data-bs-toggle="modal"data-bs-target="#Sallathetform"
                            onClick={() => this.showMoreInfo(sal)}
                          >
                            <i className="bi bi-info-circle"></i> Voir plus
                          </button>
                          
                        </div>
                      </div>
                    </td>
                    </tr>
                    )}
            </tbody>
            </table>
          </div>
            <Formsalle selectedsalle={selectedsalle} modalTitle={modalTitle} refreshList={()=>this.refreshList()}/>
            <div>
          </div>
          </div>
          </div> 
        </div>

          
        )
    }
}