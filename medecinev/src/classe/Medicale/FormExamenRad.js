import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuMedicale } from './MenuMedicale';

export class FormRad  extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
changeExamenRadNom =(e)=>{
    let X= this.props.selectedExamenRad;
    X.Nom = e.target.value
    this.setState({selectedExamenRad:X});
}

/////////////////////////Actions in API
createClick(){
    fetch(variables.API_URL+'exradialogique',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedExamenRad)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('ExamenRadForm');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
updateClick(){
    fetch(variables.API_URL+'exradialogique',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedExamenRad)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('ExamenRadForm');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
deleteClick(id){
    if(window.confirm('Are you sure?')){
    fetch(variables.API_URL+'exradialogique/'+id,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('ExamenRadForm');
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
    render(){
        const {
            selectedExamenRad,
            modalTitle,
        }=this.props;
        return(
            <div>
            <form className="modal fade" id="ExamenRadForm" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                ></button>
            </div>

            <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-75 m-auto bd-highlight">
                {selectedExamenRad.id!==0?
                    <div className=" mb-3">
                        <input type="text" value={selectedExamenRad.id}onChange={null}/>
                        <span>Numéro</span>
                    </div>:null}
                    <div className=" mb-3">
                        <input type="text" value={selectedExamenRad.Nom}onChange={this.changeExamenRadNom} required/>
                        <span>Nom examen</span>
                    </div>
                </div>
                </div>

                {selectedExamenRad.id===0?
                    <button type="button"className="btn3 float-start" onClick={()=>this.createClick()}>Ajouter examen</button>
                    :null}

                {selectedExamenRad.id!==0?
                    <button type="button" className="btn3 float-start" onClick={()=>this.updateClick()}>Update</button>
                    :null}
            </div>

            </div>
            </div> 
        </form>
         </div>
        )
    }
}