import React,{Component} from 'react';
import { variables } from '../../Variables';
import { NavLink } from 'react-router-dom';

import { FormMedicament } from '../Medicale/FormMedicament';

export class FormMedicamentT  extends Component{

    constructor(props){
        super(props);
        this.state={
            Medicament:[],
            MedicamentWithoutFilter:[],
            ShowSelectMed:false,
            FilterMed:"",
            MedT:{
                description:"",
                Id_T:0,
                IdMed:0,
                NomMed:""
            },
            selectedMedicament:{
                id:0,
                Nom:"",
                Description:"",
                categorie:"",
                type:"",
                code:""
            },
        }
    }
////////////////////////////filter
    FilterFn(){
        var FilterMed=this.state.FilterMed;

        var filteredData=this.state.MedicamentWithoutFilter.filter(
            function(el){
                return el.Nom.toString().toLowerCase().includes(
                    FilterMed.toString().trim().toLowerCase()
                )||el.code.toString().toLowerCase().includes(
                    FilterMed.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Medicament:filteredData});
    }
//////////////////////set state var
    handleChangediscription =(e)=>{
    let X= this.state.MedT;
    X.description= e.target.value
    this.setState({MedT:X});
    };
    handleChangeMed=(M)=>{
        let X= this.state.MedT;
        X.IdMed= M.id;
        X.NomMed=M.Nom;
        X.description=M.Description;
        this.setState({MedT:X,FilterMed : M.Nom});
    }
    handleChangeFilterMed= (e) => {
        this.state.ShowSelectMed = true;
        this.state.FilterMed=e.target.value;
        this.FilterFn()
        this.setState({});
    };
/////////////////////////Actions in API
    Submit=(e)=>{ 
        e.preventDefault();
        if(this.state.MedT.IdMed!==0){
        this.props.AddMedicament(this.state.MedT);
        this.setState({
            FilterMed:"",            
            MedT:{
                description:"",
                Id_T:this.props.Traitement.id,
                IdMed:0,
                NomMed:""
            }
        })
        }else{
            alert("Sélectionner un médicament")
        }
    }
/////////////
    addClick(){
        this.setState({
            modalTitle:"Ajouter Medicament",
            selectedMedicament:{
                id:0,
                Nom:"",
                Description:"",
                categorie:"",
                type:"",
                code:""
            }
        });
    }
//////////////////////////get data from API
    GetMedicament(){
        this.setState({});
        fetch(variables.API_URL+'Medicammentgnrl')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Medicament:data,MedicamentWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.GetMedicament();
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }
    handleDocumentClick = (e) => {
        if ((!e.target.id==="selectMedicament" || !e.target.classList.contains('Openselect'))) {
            this.state.ShowSelectMed = false;
            this.setState({});
        }
    };
//////////////////////////////////////////
    cahngeShowSelectMed=()=>{
        this.state.ShowSelectMed=!this.state.ShowSelectMed;
        this.setState({})
    }
    componentDidUpdate(prevProps) {
        if (this.props.Traitement !== prevProps.Traitement) {
            this.state.Traitement = this.props.Traitement;
            this.setState({ 
                FilterMed:"",            
                MedT:{
                    description:"",
                    Id_T:this.props.Traitement.id,
                    IdMed:0,
                    NomMed:""
                }
            })
            }
    }
    render(){
        const {
            MedT,
            Medicament,
            ShowSelectMed,
            FilterMed,
            selectedMedicament,
        }=this.state;
        return(<>
                <div className="modal fade" id="MedicamentTForm" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content w-75 m-auto">
                    <div className="modal-header">
                        <h5 className="modal-title">Ajouter Medicament</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form className="modal-body" onSubmit={(e)=>this.Submit(e)}>
                        <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="p-2 w-100 m-auto bd-highlight">
                        <div className='d-flex justify-content-between'>
                        </div>
                            <div className='d-flex'>
                                <span className='m-2 h6'>Medicament</span>
                                <div className='d-block'>
                                    <input type="text" className="form-control Openselect"value={FilterMed} onChange={this.handleChangeFilterMed} required/>
                                    {ShowSelectMed?
                                    <div id="selectMedicament">
                                        {Medicament.map(P=>(<>
                                            <button type='button' className='btn p-1 Openselect' onClick={()=>this.handleChangeMed(P)}>{P.Nom}</button>
                                        </>))}
                                        {Medicament.length===0?<>no options</>:null}
                                    </div>:null}
                                </div>
                                <button type='button' className='btn bnt-light Openselect' onClick={()=>this.cahngeShowSelectMed()}>
                                    {!ShowSelectMed?<i class="bi bi-caret-down-fill Openselect"></i>:<i class="bi bi-caret-up-fill Openselect"></i>}
                                </button>
                                <button type="button" className="btn3 float-end p-1 m-1" 
                                    data-bs-toggle="modal"data-bs-target="#MedicamentForm" onClick={()=>this.addClick()}>
                                        Medicament
                                </button>
                            </div>
                            <div className='d-flex'>
                                <div className="p-1 mb-3">
                                    <input type="text"value={MedT.description}onChange={this.handleChangediscription} required/>
                                    <span>Discription</span>
                                </div>
                            </div>
                        </div>
                        </div>
                            <button type="submit"className="btn3 float-start">add</button>
                    </form>

                    </div>
                    </div> 
                </div>
                <FormMedicament selectedMedicament={selectedMedicament} modalTitle={"Ajouter Medicament"} refreshList={()=>this.GetMedicament()}/>
         </> 
        )
    }
}