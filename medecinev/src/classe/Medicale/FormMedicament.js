import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuMedicale } from './MenuMedicale';

export class FormMedicament  extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
    changeMedicamentNom =(e)=>{
        let X= this.props.selectedMedicament;
        X.Nom = e.target.value
        this.setState({selectedMedicament:X});
    }
    changeMedicamentDescription =(e)=>{
        let X= this.props.selectedMedicament;
        X.Description = e.target.value
        this.setState({selectedMedicament:X});
    }
    changeMedicamentcategorie =(e)=>{
        let X= this.props.selectedMedicament;
        X.categorie = e.target.value
        this.setState({selectedMedicament:X});
    }
    changeMedicamenttype =(e)=>{
        let X= this.props.selectedMedicament;
        X.type = e.target.value
        this.setState({selectedMedicament:X});
    }
    changeMedicamentcode =(e)=>{
        let X= this.props.selectedMedicament;
        X.code = e.target.value
        this.setState({selectedMedicament:X});
    }
/////////////////////////Actions in API
    SubmitMedicament=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedMedicament.id===0){
        this.createClick()
        }
        else{
            this.updateClick()
        }
    }
    createClick(){
        fetch(variables.API_URL+'Medicammentgnrl',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedMedicament)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('MedicamentForm');
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'Medicammentgnrl',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedMedicament)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('MedicamentForm');
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Medicammentgnrl/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('MedicamentForm');
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
            selectedMedicament,
            modalTitle,
        }=this.props;
        return(
        <div>
        <form className="modal fade" id="MedicamentForm" tabIndex="-1" aria-hidden="true" onSubmit={(e)=>this.SubmitMedicament(e)}>
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
                {selectedMedicament.id!==0?
                    <div className=" mb-3">
                        <input type="text" value={selectedMedicament.id}onChange={null}/>
                        <span>id</span>
                    </div>:null}
                    <div className='d-flex m-0'>
                        <div className=" mb-3">
                            <input type="text" value={selectedMedicament.Nom}onChange={this.changeMedicamentNom} required/>
                            <span>Name</span>
                        </div>
                        <div className=" mb-3">
                            <input type='text' value={selectedMedicament.code}onChange={this.changeMedicamentcode} required/>
                            <span>Code</span>
                        </div>
                    </div>
                    <div className='d-flex m-0'>
                        <div className=" mb-3">
                            <input type="text" value={selectedMedicament.categorie}onChange={this.changeMedicamentcategorie} />
                            <span>categorie</span>
                        </div>
                        <div className=" mb-3">
                            <input type='text' value={selectedMedicament.type}onChange={this.changeMedicamenttype} />
                            <span>Type</span>
                        </div>
                    </div>
                    <div className="w-100 mb-3">
                        <input value={selectedMedicament.Description}onChange={this.changeMedicamentDescription} />
                        <span>Description</span>
                    </div>
                </div>
                </div>

                {selectedMedicament.id===0?
                    <button type="submit"className="btn3 float-start" >Create</button>
                    :null}

                {selectedMedicament.id!==0?
                    <button type="submit" className="btn3 float-start" >Update</button>
                    :null}
            </div>

            </div>
            </div> 
        </form>
    </div>
        )
    }
}