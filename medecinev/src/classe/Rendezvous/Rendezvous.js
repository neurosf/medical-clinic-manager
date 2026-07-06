import React,{Component} from 'react';
import { variables } from '../../Variables';
import {MenuPatient} from '../Patient/MenuPatient';
import { NavLink } from 'react-router-dom';

export class Rendezvous  extends Component{

    constructor(props){
        super(props);
        this.state={
        Rendezvous:[],
        modalTitle:"",
        date:this.props.GetDate().split("T")[0],

        selectedRendezvous:{"id": 0,
         "Id_D": {
            "id": 0,
             "Id_P": {
                "NSS": "",
                 "Nom": "",
                  "Prenom": "",
                   "id": 0},
                    "DateD": ""}
                    , "etatR": "",
                     "dateR": ""
                    },
        PhotoPath:variables.PHOTO_URL,
           RendezvousnumFilter:"",
           RendezvousetatFilter:"",
           RendezvousdateFilter:"",
           RendezvousnomFilter:"",
           RendezvousprenomFilter:"",
           RendezvousnssFilter:"",
           RendezvousTimeFilter:"",
           RendezvousWithoutFilter:[],
    } 
}
    FilterFn(){
        var RendezvousnumFilter=this.state.RendezvousnumFilter;
        var RendezvousetatFilter=this.state.RendezvousetatFilter;
        var RendezvousdateFilter=this.state.RendezvousdateFilter;
        var RendezvousnomFilter=this.state.RendezvousnomFilter;
        var RendezvousprenomFilter=this.state.RendezvousprenomFilter;
        var RendezvousnssFilter=this.state.RendezvousnssFilter;
        var RendezvousTimeFilter=this.state.RendezvousTimeFilter;

        var filteredData=this.state.RendezvousWithoutFilter.filter(
            function(el){
                return el.id.toString().toLowerCase().includes(
                    RendezvousnumFilter.toString().trim().toLowerCase()
                ) && el.etatR.toString().toLowerCase().includes(
                    RendezvousetatFilter.toString().trim().toLowerCase()
                ) && el.dateR.toString().toLowerCase().includes(
                    RendezvousdateFilter.toString().trim().toLowerCase()
                )&& el.Id_D.Id_P.Nom.toString().toLowerCase().includes(
                    RendezvousnomFilter.toString().trim().toLowerCase()
                )&& el.Id_D.Id_P.Prenom.toString().toLowerCase().includes(
                    RendezvousprenomFilter.toString().trim().toLowerCase()
                )&& el.Id_D.Id_P.NSS.toString().toLowerCase().includes(
                    RendezvousnssFilter.toString().trim().toLowerCase()
                )&& el.dateR.toString().toLowerCase().includes(
                    RendezvousTimeFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Rendezvous:filteredData});
    }
    sortResult(prop,asc){
        var sortedData=this.state.RendezvousWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });
    
        this.setState({Rendezvous:sortedData});
    }
    sortResultPatient(prop,asc){
        var sortedData=this.state.RendezvousWithoutFilter.sort(function(a,b){
            if(asc){
                return (a['Id_D']['Id_P'][prop]>b['Id_D']['Id_P'][prop])?1:((a['Id_D']['Id_P'][prop]<b['Id_D']['Id_P'][prop])?-1:0);
            }
            else{
                return (b['Id_D']['Id_P'][prop]>a['Id_D']['Id_P'][prop])?1:((b['Id_D']['Id_P'][prop]<a['Id_D']['Id_P'][prop])?-1:0);
            }
        });
    
        this.setState({Rendezvous:sortedData});
    }
changerendezvousnumFilter = (e)=>{
    this.state.RendezvousnumFilter=e.target.value;
    this.FilterFn();
}
changerendezvousetatFilter = (e)=>{
    this.state.RendezvousetatFilter=e.target.value;
    this.FilterFn();
}
changerendezvousdateFilter = (e)=>{
    this.state.RendezvousdateFilter=e.target.value;
    this.FilterFn();
}
changerendezvousprenomFilter = (e)=>{
    this.state.RendezvousprenomFilter=e.target.value;
    this.FilterFn();
}
changerendeznomFilter = (e)=>{
    this.state.RendezvousnomFilter=e.target.value;
    this.FilterFn();
}
changerendezvousnssFilter = (e)=>{
    this.state.RendezvousnssFilter=e.target.value;
    this.FilterFn();
}
changerendezvousTimeFilter= (e)=>{
    this.state.RendezvousTimeFilter=e.target.value;
    this.FilterFn();
}
refreshList=()=> {
    const currentDate = this.state.date;
    const url = variables.API_URL + 'rendezvous/' + currentDate;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ Rendezvous: data, RendezvousWithoutFilter: data });
      });
}
componentDidMount(){
    this.refreshList();
}
/////////////////////////////////dddd

changerendezvousdate =(e)=>{
    let X= this.selectedRendezvous;
    X.dateR = e.target.value
    this.setState({selectedRendezvous:X});
}
changerendezvousetat =(e)=>{
    let X= this.selectedRendezvous;
    X.etatR = e.target.value
    this.setState({selectedRendezvous:X});
}
changedate = (e) => {
    this.state.date = e.target.value
    this.refreshList();
}
///////////////////////pompe data actions

editClick(rend){
    this.setState({
        modalTitle:"Modifier info rendez vous",
        selectedRendezvous:{"id": rend.id,
        "Id_D": {
           "id": rend.Id_D.id,
            "Id_P": {
               "NSS": rend.Id_D.Id_P.NSS,
                "Nom": rend.Id_D.Id_P.Nom,
                 "Prenom": rend.Id_D.Id_P.Prenom,
                  "id": rend.Id_D.Id_P.id},
                   "DateD": rend.Id_D.DateD}
                   , "etatR": rend.etatR,
                    "dateR": rend.dateR
                   }
        
    });
}
showMoreInfo(rend) {
    this.setState({
      modalTitle: "Informations détaillées du rendezvous",
      selectedRendezvous:{"id": rend.id,
        "Id_D": {
           "id": rend.Id_D.id,
            "Id_P": {
               "NSS": rend.Id_D.Id_P.NSS,
                "Nom": rend.Id_D.Id_P.Nom,
                 "Prenom": rend.Id_D.Id_P.Prenom,
                  "id": rend.Id_D.Id_P.id},
                   "DateD": rend.Id_D.DateD}
                   , "etatR": rend.etatR,
                    "dateR": rend.dateR
                   }
    });
  
}

/////////////////////////Actions in API

deleteClick(id){
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
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })
    }
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
        Rendezvous,
        selectedRendezvous,
        modalTitle,
        date,
    }=this.state;
    return(
        <div>
        <br/>
        <MenuPatient CloseMenuSide={this.props.CloseMenuSide} MenuSideOpen={this.props.MenuSideOpen}/>
        <div>
            <div className='Medicale'>
                <br /><br /><br />
                <div className='Patientsfunc'>
                    <button type="button" className="btnrefresh button2 m-2 float-end" onClick={this.refreshList}>
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                    <div className='containerRendVusinput m-3'>
                        <h6 className='TextTopRendeVDate'>Rendez vous de</h6>
                        <input type="date" className="FilterInput" value= {date} onChange={this.changedate}  />
                    </div>
                </div>
                    <div className='FontTable'>
                    <table className="table">
                    <thead>
                    <tr>     
                    <th className='thsideR'>
                        <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changerendezvousnumFilter} placeholder="Numéro"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('id',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('id',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                                       
                    <th>
                        <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changerendezvousnssFilter} placeholder="NSS"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResultPatient('NSS',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResultPatient('NSS',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th>
                        <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changerendeznomFilter} placeholder="Nom"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResultPatient('Nom',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResultPatient('Nom',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th>
                        <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changemedecinprenomFilter} placeholder="Prénom"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResultPatient('Prenom',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResultPatient('Prenom',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th>
                    <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changerendezvousetatFilter} placeholder="Etat"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('etatR',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('etatR',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th>
                    <div className="d-flex">
                        <input type='time' className="form-control m-2" onChange={this.changerendezvousTimeFilter} placeholder="Time"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('dateR',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('dateR',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th className='thsideL'></th>
            </tr>
            </thead>
            <tbody>
                {Rendezvous.map(rend=>
                    <tr key={rend.id}> 
                    <td className='lineTd'>{rend.id}</td>
                    <td> {rend.Id_D.Id_P.NSS}</td>
                    <td>{rend.Id_D.Id_P.Nom}</td>
                    <td>{rend.Id_D.Id_P.Prenom}</td>
                    <td>{rend.etatR}</td>
                    <td>{rend.dateR.split('T')[1].split('Z')[0]}</td>
                    <td className='endTd'>
                        <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton" >
                            <button className="dropdown-item" onClick={() => this.deleteClick(rend.id)}>
                            <i className="bi bi-trash"></i> Supprimer
                            </button>
                            <button className="dropdown-item" data-bs-toggle="modal"data-bs-target="#medecinform"
                            onClick={() => this.showMoreInfo(rend)}>
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
            <div>
            <form className="modal fade" id="medecinform" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                ></button>
            </div>

            <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 bd-highlight m-auto">
                {selectedRendezvous.id!==0?
                    <div className=" mb-3">
                        <input type="text" value={selectedRendezvous.id}onChange={null}/>
                        <span>Numéro</span>
                </div>:null}
                  {modalTitle === "Informations détaillées du rendezvous"?
                <div className="input-group mb-3">
                        <input type="datetime-local" value={selectedRendezvous.dateR.split('Z')[0]}onChange={null}/>
                        <span>Date Rendezvous </span>
                </div> 
                :<div className="input-group mb-3">
                    <input type="datetime-local" value={selectedRendezvous.dateR.split('Z')[0]}onChange={this.changerendezvousdate}/>
                    <span>Date Rendezvous</span>
                </div> 
                 }
                 {modalTitle === "Informations détaillées du rendezvous"?  <div className="input-group mb-3">
                        <input type="text" value={selectedRendezvous.etatR}onChange={null}/>
                        <span>Etat rendez </span>
                    </div> 
                :    <div className="input-group mb-3">
                <input type="text" value={selectedRendezvous.etatR}onChange={this.changerendezvousetat} required/>
                <span>etat rendezvous</span>
                </div> 
                 }
                 <div className='d-flex'>
                     <h4>Information de patient</h4>
                     <NavLink className='text-decoration-none m-1' onClick={()=>this.CloseModel('medecinform')} to={"/Patient/"+selectedRendezvous.Id_D.Id_P.id}><i class="fa-solid fa-hand-pointer fa-rotate-90"></i> Voir Plus </NavLink>
                 </div>
                 <div className='d-flex'>
                 {modalTitle === "Informations détaillées du rendezvous"?  <div className="input-group mb-3">
                        <input type="text" value={selectedRendezvous.Id_D.Id_P.Nom}onChange={null}/>
                        <span>Nom du patient </span>
                    </div> 
                :    null
                 }
                  {modalTitle === "Informations détaillées du rendezvous"?  <div className="input-group mb-3">
                        <input type="text" value={selectedRendezvous.Id_D.Id_P.Prenom}onChange={null}/>
                        <span>Prénom du patient </span>
                    </div> 
                :    null
                 }
                 </div>
                </div>
                </div>
            </div>
            </div>
            </div> 
        </form>
        </div>
        <div>
        </div>
        </div>
        </div> 
        </div>
        )
    }
}