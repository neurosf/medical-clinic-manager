import React,{Component} from 'react';
import { variables } from '../../Variables';
import { NavLink } from 'react-router-dom';

export class FormRendezVous  extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
    handleChangeetatR = (e) => {
    let X = this.props.selectedRendezVous;
    X.etatR= e.target.value;
    this.setState({ selectedRendezVous: X });
    };
    handleChangedateR = (e) => {
    let X = this.props.selectedRendezVous;
    X.dateR = e.target.value;
    this.setState({ selectedRendezVous: X });
    };
/////////////////////////Actions in API
    SubmitPatient=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedRendezVous.id===0){
        this.createClick()
        }
        else{
            this.updateClick()
        }
    }
    createClick(){
        delete this.props.selectedRendezVous.id;
        fetch(variables.API_URL+'rendezvous',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedRendezVous)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.props.refreshList()
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'rendezvous',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedRendezVous)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
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
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    render(){
        const {
            selectedRendezVous,
            modalTitle,
        }=this.props;
        return(
                <div className="modal fade" id="RendezVousForm" tabIndex="-1" aria-hidden="true">
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
                            <div></div>
                            {selectedRendezVous.id!==0?
                            <button type="button" className="btn4 p-1 mr-1" onClick={()=>this.deleteClick(selectedRendezVous.id)}>
                                <i className="bi-trash"></i>
                            </button>:null}
                            </div>
                            <div className="w-75 p-1 mb-3">
                                <input type="datetime-local"value={selectedRendezVous.dateR} onChange={this.handleChangedateR} required/>
                                <span>Date</span>
                            </div>
                            {selectedRendezVous.id!==0?
                            <div>
                                <select className="form-control mb-3 w-50"  value={selectedRendezVous.etatR} onChange={this.handleChangeetatR} required>
                                    <option value=""></option>
                                    <option value="Passe">Passe</option>
                                    <option value="NonPasse">Non Passe</option>
                                    {/* complite etats */}
                                </select>
                                <span>Etat</span>
                            </div>:null}
                        </div>
                        </div>

                        {selectedRendezVous.id===0?
                            <button type="submit"className="btn4 float-start"data-bs-dismiss="modal" aria-label="Close">Create</button>
                            :null}

                        {selectedRendezVous.id!==0?
                            <button type="submit" className="btn4 float-start"data-bs-dismiss="modal" aria-label="Close">Update</button>
                            :null}
                    </form>

                    </div>
                    </div> 
                </div>  
        )
    }
}