import React,{Component} from 'react';
import { variables } from '../../Variables';


export class Formsalle  extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
changesallenom =(e)=>{
    let X= this.props.selectedsalle;
    X.Nom = e.target.value
    this.setState({selectedsalle:X});
}
changesalleprenom =(e)=>{
    let X= this.props.selectedsalle;
    X.Prenom = e.target.value
    this.setState({selectedsalle:X});
}
changesalletour =(e)=>{
    let X= this.props.selectedsalle;
    X.Tour = e.target.value
    this.setState({selectedsalle:X});
}
changesalledate =(e)=>{
    let X= this.props.selectedsalle;
    X.Date = e.target.value
    this.setState({selectedsalle:X});
}
changesalleetat=(e)=>{
    let X= this.props.selectedsalle;
    X.etat = e.target.value
    this.setState({selectedsalle:X});
}
changesallesexe=(e)=>{
    let X= this.props.selectedsalle;
    X.Sexe = e.target.value
    this.setState({selectedsalle:X});
}

/////////////////////////Actions in API
    Submitsalle=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedsalle.id===0){
        this.createClick()
        }
        else{
            this.updateClick()
        }
    }
    /////////////////////////Actions in API
createClick(){
    fetch(variables.API_URL+'Salle',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedsalle)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('Sallathetform');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
updateClick(){
    fetch(variables.API_URL+'Salle',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedsalle)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('Sallathetform');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
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
        this.CloseModel('Sallathetform');
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
            selectedsalle,
            modalTitle,
        }=this.props;
        return(
            
            <div>
            <form className="modal fade" id="Sallathetform" tabIndex="-1" aria-hidden="true" onSubmit={(e)=>this.Submitsalle(e)}>
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
                {modalTitle !== "Informations détaillées du patient"?<>
                <div className=" mb-3">
                    <input type="text"value={selectedsalle.Nom}onChange={this.changesallenom} required/>
                    <span>Nom</span>
                </div> 
                <div className=" mb-3">
                    <input type="text"value={selectedsalle.Prenom}onChange={this.changesalleprenom} required/>
                    <span>Prénom</span>
                </div> 
                <div className="w-50 mb-3">
                    <select className='form-control' value={selectedsalle.Sexe} onChange={this.changesallesexe} required>
                    <option value=""></option>
                    <option value="homme" >Homme</option>
                    <option value="femme">Femme</option>
                    </select>
                    <span>Choisir le sexe</span>
                </div>
                </>: <>
                  <div className='d-flex'>
                    <div className=" mb-3">
                        <input type="text"value={selectedsalle.Nom}onChange={null}/>
                        <span>Nom </span>
                    </div> 
                    <div className=" mb-3">
                        <input type="text"value={selectedsalle.Prenom}onChange={null}/>
                        <span>Prénom </span>
                    </div> 
                  </div>
                  <div className=" mb-3">
                        <input type="text"value={selectedsalle.Sexe}onChange={null}/>
                        <span>Sexe </span>
                    </div> 
                    <div className=" mb-3">
                        <input type="text"value={selectedsalle.Tour}onChange={null}/>
                        <span>tour </span>
                    </div> 

                    <div className=" mb-3">
                        <input type="text"value={selectedsalle.etat}onChange={null}/>
                        <span>Etat </span>
                    </div>   
                    <div className=" mb-3">
                        <input type="text"value={selectedsalle.Date}onChange={null}/>
                        <span>Date </span>
                    </div> 
                </>}
                </div>
                </div>

                {selectedsalle.id===0?
                    <button type="submit"className="btn3 float-start" >Ajouter patient</button>
                    :null}

                {selectedsalle.id !== 0 && modalTitle !== "Informations détaillées du patient" ? (
                <button type="submit" className="btn3 float-start">
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


