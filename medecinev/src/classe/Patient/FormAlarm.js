import React,{Component} from 'react';
import { variables } from '../../Variables';

export class FormAlarm  extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
    handleChangedescription = (e) => {
    let X = this.props.selectedAlarm;
    X.description = e.target.value;
    this.setState({ selectedAlarm: X });
    };
    handleChangedate = (e) => {
        let X = this.props.selectedAlarm;
        X.date = e.target.value;
        this.setState({ selectedAlarm: X });
    };
/////////////////////////Actions in API
    SubmitPatient=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedAlarm.id===0){
            this.createClick()
        }
        else{
            this.updateClick()
        }
    }
    createClick(){
        delete this.props.selectedAlarm.id;
        fetch(variables.API_URL+'Alarm',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedAlarm)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('AlarmForm')
            this.props.refreshList()
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'Alarm',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedAlarm)
        })
        .then(res=>res.json())
        .then((result)=>{
            
            this.CloseModel('AlarmForm')
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Alarm/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('AlarmForm');
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
            selectedAlarm,
            modalTitle,
        }=this.props;
        return(
                <div className="modal fade" id="AlarmForm" tabIndex="-1" aria-hidden="true">
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
                                {selectedAlarm.id!==0?
                                <button type="button" className="btn4 mr-1" onClick={()=>this.deleteClick(selectedAlarm.id)}>
                                    <i className="bi-trash"></i>
                                </button>:null}
                            </div>
                            <div className="p-1 mb-3 w-75">
                                <input type="date"value={selectedAlarm.date} onChange={this.handleChangedate}/>
                                <span>Date</span>
                            </div>
                            <div className="p-1 mb-3">
                                <input type="text"value={selectedAlarm.description} onChange={this.handleChangedescription} required/>
                                <span>description</span>
                            </div>
                        </div>
                        </div>

                        {selectedAlarm.id===0?
                            <button type="submit"className="btn4 float-start">Create</button>
                            :null}

                        {selectedAlarm.id!==0?
                            <button type="submit" className="btn4 float-start">Update</button>
                            :null}
                    </form>

                    </div>
                    </div> 
                </div>  
        )
    }
}