import React,{Component} from 'react';
import { variables } from '../../Variables';
import { Formmedecin } from './Formmedecin';

export class Medecin  extends Component{

    constructor(props){
        super(props);
        this.state={
        medecin:[],
        modalTitle:"",

        selectedmedecin:{
            id:0,
            UserName:"",
            PassWord:"",
            email:"",
            Nom :"",
            Prenom :"",
            Ntel :"",
            Type :""
        },
        PhotoPath:variables.PHOTO_URL,
           medecinnumFilter:"",
           medecinusernameFilter:"",
           medecinemailFilter:"",
           medecinnomFilter:"",
           medecinprenomFilter:"",
           medecinntelFilter:"",
           medecintypeFilter:"",
           medecinWithoutFilter:[],
    } 
}
    FilterFn(){
        var medecinnumFilter=this.state.medecinnumFilter;
        var medecinusernameFilter=this.state.medecinusernameFilter;
        var medecinnomFilter=this.state.medecinnomFilter;
        var medecinemailFilter=this.state.medecinemailFilter;
        var medecinprenomFilter=this.state.medecinprenomFilter;
        var medecinntelFilter=this.state.medecinntelFilter;
        var medecintypeFilter=this.state.medecinprenomFilter;

        var filteredData=this.state.medecinWithoutFilter.filter(
            function(el){
                return el.id.toString().toLowerCase().includes(
                    medecinnumFilter.toString().trim().toLowerCase()
                ) && el.UserName.toString().toLowerCase().includes(
                    medecinusernameFilter.toString().trim().toLowerCase()
                ) && el.Nom.toString().toLowerCase().includes(
                    medecinnomFilter.toString().trim().toLowerCase()
                )&& el.Prenom.toString().toLowerCase().includes(
                    medecinprenomFilter.toString().trim().toLowerCase()
                )&& el.email.toString().toLowerCase().includes(
                    medecinemailFilter.toString().trim().toLowerCase()
                )&& el.Type.toString().toLowerCase().includes(
                    medecintypeFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({medecin:filteredData});
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
    
        this.setState({medecin:sortedData});
    }

changemedecinnumFilter = (e)=>{
    this.state.medecinnumFilter=e.target.value;
    this.FilterFn();
}
changemedecinusernameFilter = (e)=>{
    this.state.medecinusernameFilter=e.target.value;
    this.FilterFn();
}
changemedecinNomFilter = (e)=>{
    this.state.medecinnomFilter=e.target.value;
    this.FilterFn();
}
changemedecinprenomFilter = (e)=>{
    this.state.medecinprenomFilter=e.target.value;
    this.FilterFn();
}
changemedecinntlFilter = (e)=>{
    this.state.medecinntelFilter=e.target.value;
    this.FilterFn();
}
changemedecinemailFilter = (e)=>{
    this.state.medecinemailFilter=e.target.value;
    this.FilterFn();
}
refreshList(){
    fetch(variables.API_URL+'Medecin')
    .then(response=>response.json())
    .then(data=>{
        this.setState({medecin:data,medecinWithoutFilter:data});
    });
}
componentDidMount(){
    this.refreshList();
}

///////////////////////pompe data actions
addClick(){
    this.setState({
        modalTitle:"Ajouter Médecin/Employé",
        selectedmedecin:{
            id:0,
            UserName:"",
            PassWord:"",
            email:"",
            Nom :"",
            Prenom :"",
            Ntel :"",
            Type :""
        },
    });
}
editClick(Med){
    this.setState({
        modalTitle:"Modifier info Medecin",
        selectedmedecin:{
            id:Med.id,
            UserName:Med.UserName,
            PassWord:Med.PassWord,
            email:Med.email,
            Nom :Med.Nom,
            Prenom :Med.Prenom,
            Ntel :Med.Ntel,
            Type :Med.Type
        }
        
    });
}
showMoreInfo(Med) {
    this.setState({
      modalTitle: "Informations détaillées du Medcin/employe",
      selectedmedecin:{
        id:Med.id,
        UserName:Med.UserName,
        PassWord:Med.PassWord,
        email:Med.email,
        Nom :Med.Nom,
        Prenom :Med.Prenom,
        Ntel :Med.Ntel,
        Type :Med.Type
    }
    });
  
  }

/////////////////////////Actions in API

deleteClick(id){
    if(window.confirm('Are you sure?')){
    fetch(variables.API_URL+'Medecin/'+id,{
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
render(){
    const {
        medecin,
        selectedmedecin,
        modalTitle,
    }=this.state;
    const {
        log
    }=this.props;
    return(
        <div>
        <br/>
        <div>
            <div className='Medicale'>
                <br /><br /><br /> 
            <div className='Patientsfunc'>
                <div></div>
                <button type="button" className="button2 m-2 float-end" 
                data-bs-toggle="modal"data-bs-target="#medecinform" onClick={()=>this.addClick()}>
                    Ajouter  Medecin/employe
                </button>
            </div>
            <div className='FontTable'>
            <table className="table">
            <thead>
            <tr>     
                    <th className='thsideR'>
                        <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changemedecinnumFilter} placeholder="Numéro"/>
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
                        <input className="form-control m-2" onChange={this.changemedecinNomFilter} placeholder="Nom"/>
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
                        <input className="form-control m-2" onChange={this.changemedecinprenomFilter} placeholder="Prénom"/>
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
                        <input className="form-control m-2" onChange={this.changemedecinemailFilter} placeholder="Email"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('email',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('email',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th>
                        <div className="d-flex">
                        <select className="form-control m-2" onChange={this.changecontactemail} placeholder="Fonction">
                            <option value="Medcine">Médecin</option>
                            <option value="Employe">Employe</option>
                            <option value="Employe stock">Employe stock</option>
                        </select>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Type',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Type',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th>
                    <div className="d-flex">
                        <input className="form-control m-2" onChange={this.changemedecinusernameFilter} placeholder="Username"/>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('UserName',true)}>
                            <i className="bi-arrow-down-circle-fill"></i>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>this.sortResult('UserName',false)}>
                            <i className="bi-arrow-up-circle-fill"></i>
                        </button>
                        </div>
                    </th>
                    <th className='thsideL'></th>
            </tr>
            </thead>
            <tbody>
                {medecin.map(Med=>
                    <tr key={Med.id}>
                        <td className='lineTd'>{Med.id}</td>
                        <td>{Med.Nom}</td>
                        <td>{Med.Prenom}</td>
                        <td>{Med.email}</td>
                        <td>{Med.Type}</td>
                        <td>{Med.UserName}</td>
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
                                className="dropdown-item" data-bs-toggle="modal"data-bs-target="#medecinform"
                                onClick={()=>this.editClick(Med)}
                                >
                                <i className="bi bi-pencil-square"></i> Modifier
                                </button>
                                <button
                                className="dropdown-item"
                                onClick={() => this.deleteClick(Med.id)}
                                >
                                <i className="bi bi-trash"></i> Supprimer
                                </button>
                                <button
                                className="dropdown-item" data-bs-toggle="modal"data-bs-target="#medecinform"
                                onClick={() => this.showMoreInfo(Med)}
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
            <Formmedecin log={log} selectedmedecin={selectedmedecin} modalTitle={modalTitle} refreshList={()=>this.refreshList()}/>

                </div>
            </div> 
        </div>

          
        )
    }
}