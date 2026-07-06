import React,{Component} from 'react';
import { variables } from '../../Variables';


export class Formmedecin  extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
changemedecinnom =(e)=>{
    let X= this.props.selectedmedecin;
    X.Nom = e.target.value
    this.setState({selectedmedecin:X});
}
changemedecinprenom =(e)=>{
    let X= this.props.selectedmedecin;
    X.Prenom = e.target.value
    this.setState({selectedmedecin:X});
}
changemedecintype =(e)=>{
    let X= this.props.selectedmedecin;
    X.Type = e.target.value
    this.setState({selectedmedecin:X});
}
changemedecinusername =(e)=>{
    let X= this.props.selectedmedecin;
    X.UserName = e.target.value
    this.setState({selectedmedecin:X});
}
changemedecinntel =(e)=>{
    let X= this.props.selectedmedecin;
    X.Ntel = e.target.value
    this.setState({selectedmedecin:X});
}
changemedecinemail =(e)=>{
    let X= this.props.selectedmedecin;
    X.email = e.target.value
    this.setState({selectedmedecin:X});
}
changemedecinpassword =(e)=>{
    let X= this.props.selectedmedecin;
    X.PassWord = e.target.value
    this.setState({selectedmedecin:X});
}
/////////////////////////Actions in API
    Submitmedecin=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedmedecin.id===0){
        this.createClick()
        }
        else{
            this.updateClick()
        }
    }
    /////////////////////////Actions in API
createClick(){
    fetch(variables.API_URL+'Medecin',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedmedecin)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('medecinform');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
updateClick(){
    fetch(variables.API_URL+'Medecin',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedmedecin)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('medecinform');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
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
        this.CloseModel('medecinform');
        this.props.refreshList();
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
///
Passwodvision=(e)=>{
    let password= document.getElementById(e.target.getAttribute('eye1'));
    if(password.type==='text'){password.type = 'password';
        e.target.classList.remove("bi-eye-fill");
        e.target.classList.add("bi-eye-slash-fill");
    }
    else{ password.type = 'text';
        e.target.classList.add("bi-eye-fill");
        e.target.classList.remove("bi-eye-slash-fill");
    }
}
    render(){
        const {
            selectedmedecin,
            modalTitle,
            log
        }=this.props;
        return(
            <div>
        <form className="modal fade" id="medecinform" tabIndex="-1" aria-hidden="true" onSubmit={(e)=>this.Submitmedecin(e)}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                ></button>
            </div>

            <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-100 bd-highlight">
                {selectedmedecin.id!==0?
                    <div className="mb-3">
                        <input type="text" value={selectedmedecin.id}onChange={null}/>
                        <span>Numéro</span>
                    </div>:null}
                  {modalTitle === "Informations détaillées du Medcin/employe"?<>
                    <div className='d-flex'>
                        <div className="mb-3">
                            <input type="text" value={selectedmedecin.Nom}onChange={null}/>
                            <span>Nom </span>
                        </div>
                        <div className="mb-3">
                            <input type="text" value={selectedmedecin.Prenom}onChange={null}/>
                            <span>Prénom </span>
                        </div> 
                    </div>
                    <div className='d-flex'>
                        <div className="mb-3">
                            <input type="email" value={selectedmedecin.email}onChange={null}/>
                            <span>Gmail</span>
                        </div>
                        <div className="mb-3">
                            <input type="text" value={selectedmedecin.UserName}onChange={null}/>
                            <span>Username</span>
                        </div>
                    </div>
                    <div className="w-75 mb-3">
                        <input type="text" value={selectedmedecin.Ntel}onChange={null}/>
                        <span>Numéro de telephone</span>
                    </div>
                    <div className="w-50 mb-3">
                        <input type="text" value={selectedmedecin.Type}onChange={null} required/>
                        <span>Fonction</span>
                    </div>
                    <div className="w-75 mb-3">
                        <i className="bi bi-eye-slash-fill logI"eye1="logpass1" onClick={this.Passwodvision}></i>
                        <input id="logpass1" type="password" value={selectedmedecin.PassWord}onChange={null}/>
                        <span>Mot de passe</span>
                    </div>
                    </>
                :<>
                    <div className='d-flex'>
                        <div className="mb-3">
                            <input type="text" value={selectedmedecin.Nom}onChange={this.changemedecinnom} required/>
                            <span>Nom</span>
                        </div> 
                        <div className="mb-3">
                            <input type="text" value={selectedmedecin.Prenom}onChange={this.changemedecinprenom} required/>
                            <span>Prénom</span>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className="mb-3">
                            <input type="email" value={selectedmedecin.email}onChange={this.changemedecinemail} required/>
                            <span>Gmail</span>
                        </div>
                        <div className="mb-3">
                            <input type="tel" value={selectedmedecin.UserName}  onChange={this.changemedecinusername} required/>
                            <span>Useername</span>
                        </div>
                    </div>
                    <div className="w-75 mb-3">
                        <input type="tel" value={selectedmedecin.Ntel}pattern="[0-9]*"onChange={this.changemedecinntel} required/>
                        <span>Ntel</span>
                    </div>
                    {log===3?<div>
                    <select className="form-control mb-3 w-50"  value={selectedmedecin.Type} onChange={this.changemedecintype} required>
                        <option value=""></option>
                        <option value="Medecin">Medecin</option>
                        <option value="Employe">Employe</option>
                        <option value="Employe stock">Employe stock</option>
                    </select>
                    <span>Fonction</span>
                    </div>:null}
                    <div className="w-75 mb-3">
                        <i className="bi bi-eye-slash-fill logI"eye1="logpass2" onClick={this.Passwodvision}></i>
                        <input type="password" id='logpass2' value={selectedmedecin.PassWord}onChange={this.changemedecinpassword} required/>
                        <span>Mot de passe </span>
                    </div>
                    </>}
                </div>
                </div>

                {selectedmedecin.id===0?
                    <button type="submit"className="btn4 float-start">Create</button>
                    :null}
                {selectedmedecin.id !== 0 && modalTitle !== "Informations détaillées du Medcin/employe" ? (
                <button type="submit" className="btn4 float-start">
                Update
                </button>
                ) : null}

            </div>
            </div>
            </div> 
        </form>
        </div>
        )
    }
}


