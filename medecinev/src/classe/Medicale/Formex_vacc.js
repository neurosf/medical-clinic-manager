import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuMedicale } from './MenuMedicale';


export class Formex_vacc extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
changeExamenRNom =(e)=>{
    let X= this.props.selectedExamenR;
    X.NomX = e.target.value
    this.setState({selectedExamenR:X});
}
changeExamenRNbreRappel =(e)=>{
    let X= this.props.selectedExamenR;
    X.NbreRappel = e.target.value
    this.setState({selectedExamenR:X});
}
changeExamentype =(e)=>{
    let X= this.props.selectedExamenR;
    X.type = e.target.value
    this.setState({selectedExamenR:X});
}
Submitex_vacc=(e)=>{ 
    e.preventDefault(); 
    if(this.props.selectedExamenR.id===0){
    this.createClick()
    }
    else{
        this.updateClick()
    }
}
/////////////////////////Actions in API
createClick(){
    delete this.props.selectedExamenR.id
    fetch(variables.API_URL+'Ex_Vacc',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedExamenR)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('ExamenRForm');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
updateClick(){
    fetch(variables.API_URL+'Ex_Vacc',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedExamenR)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('ExamenRForm');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
deleteClick(id){
    if(window.confirm('Confirmez la suppression!')){
    fetch(variables.API_URL+'Ex_Vacc/'+id,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('ExamenRForm');
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
        selectedExamenR,
        modalTitle,
    }=this.props;
    return(
        <div>
        <form className="modal fade" id="ExamenRForm" tabIndex="-1" aria-hidden="true" onSubmit={(e)=>this.Submitex_vacc(e)}>
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
            {selectedExamenR.id!==0?
                <div className=" mb-3">
                    <input type="text" value={selectedExamenR.id}onChange={null}/>
                    <span>Numéro</span>
                </div>:null}
                <div className=" mb-3">
                    <input type="text" value={selectedExamenR.NomX}onChange={this.changeExamenRNom} required/>
                    <span>Nom</span>
                </div>
                <div className=" mb-3">
                    <input type="text" value={selectedExamenR.NbreRappel}onChange={this.changeExamenRNbreRappel} required/>
                    <span>NbreRappel</span>
                </div>
                <div className="w-50 mb-3">
                 <select className="form-control" value={selectedExamenR.type} onChange={this.changeExamentype} required>
                             <option value=""></option>
                               <option value="vaccin">Vaccin</option>
                               <option value="examen">Examen</option>
                      </select>
                  <span>Type</span>
                </div>
            </div>
            </div>
            {selectedExamenR.id===0?
                <button type="submit"className="btn3 float-start">Create</button>
                :null}

            {selectedExamenR.id!==0?
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