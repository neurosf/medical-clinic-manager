import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuMedicale } from './MenuMedicale';

export class FormPathologies  extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
changePathologiesNom =(e)=>{
    let X= this.props.selectedPathologies;
    X.Nom_path = e.target.value
    this.setState({selectedPathologies:X});
}
Submit=(e)=>{ 
    e.preventDefault(); 
    if(this.props.selectedPathologies.id===0){
    this.createClick()
    }
    else{
        this.updateClick()
    }
}
createClick(){
    fetch(variables.API_URL+'Pathologie',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedPathologies)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel(this.props.idpath);
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
updateClick(){
    fetch(variables.API_URL+'Pathologie',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedPathologies)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel(this.props.idpath);
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
deleteClick(id){
    if(window.confirm('Confirmez la suppression ?')){
    fetch(variables.API_URL+'Pathologie/'+id,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel(this.props.idpath);
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
            idpath,
            selectedPathologies,
            modalTitle,
        }=this.props;
        return(
            <div>
            <form className="modal fade" id={idpath} tabIndex="-1" aria-hidden="true" onSubmit={(e)=>this.Submit(e)}>
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
                {selectedPathologies.id!==0?
                    <div className=" mb-3">
                        <input type="text"value={selectedPathologies.id}onChange={null}/>
                        <span>Numéro</span>
                    </div>:null}
                    <div className=" mb-3">
                        <input type="text"value={selectedPathologies.Nom_path}onChange={this.changePathologiesNom} required/>
                        <span>Nom</span>
                    </div>
                </div>
                </div>

                {selectedPathologies.id===0?
                    <button type="submit"className="btn3 float-start">Create</button>
                    :null}

                {selectedPathologies.id!==0?
                    <button type="submit" className="btn3 float-start">Update</button>
                    :null}
            </div>

            </div>
            </div> 
        </form>
        </div>
        )
    }
}