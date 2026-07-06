import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuMedicale } from './MenuMedicale';

export class FormVar  extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
changeVariablesPhyNom =(e)=>{
    let X= this.props.selectedVariablesPhy;
    X.Nom_v = e.target.value
    this.setState({selectedVariablesPhy:X});
}
/////////////////////////Actions in API

createClick(){
    fetch(variables.API_URL+'Variable',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedVariablesPhy)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('VariablesPhyForm');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
updateClick(){
    fetch(variables.API_URL+'Variable',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedVariablesPhy)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('VariablesPhyForm');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
deleteClick(id){
    if(window.confirm('Are you sure?')){
    fetch(variables.API_URL+'Variable/'+id,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('VariablesPhyForm');
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
            selectedVariablesPhy,
            modalTitle,
        }=this.props;
        return(
            <div>
            <form className="modal fade" id="VariablesPhyForm" tabIndex="-1" aria-hidden="true">
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
                {selectedVariablesPhy.id!==0?
                    <div className=" mb-3">
                        <input type="text" value={selectedVariablesPhy.id}onChange={null}/>
                        <span>Numéro</span>
                    </div>:null}
                    <div className=" mb-3">
                        <input type="text" value={selectedVariablesPhy.Nom_v}onChange={this.changeVariablesPhyNom} required/>
                        <span>Name</span>
                    </div>
                </div>
                </div>

                {selectedVariablesPhy.id===0?
                    <button type="button"className="btn btn-primary float-start" onClick={()=>this.createClick()}>Create</button>
                    :null}

                {selectedVariablesPhy.id!==0?
                    <button type="button" className="btn btn-primary float-start" onClick={() => {
                        this.createClick();
                      
                      }}>Modifier</button>
                    :null}
            </div>

            </div>
            </div> 
        </form>
         </div>
        )
    }
}