import React,{Component} from 'react';
import { variables } from '../../Variables';
import { NavLink } from 'react-router-dom';

import { Formstock } from '../Stock/Formstock';
export class FormMedicamentStock  extends Component{

    constructor(props){
        super(props);
        this.state={
            Medicament:[],
            MedicamentWithoutFilter:[],
            ShowSelectMed:false,
            FilterMed:"",
            Med:{
                id:0,
                Quantite:1000,
            },
            
            MedS:{
                Quantite:0,
                Prix:0,
                Idcons:0,
                id_m:0,
                NomMed:""
            },
            MedToAdd:{
                Prixachat:0,
                Prixvente:0,
            },
            selectedMedicament:{
                id:0,
                Nom_med:"",
                Seuil:"",
                Quantite:"",
                Prixachat:"",
                Prixvente:"",
                Dateperemption:"",
                Description:"",
                categorie:"",
                type:"",
                code:"",
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
    handleChangeQuantite =(e)=>{
    let X= this.state.MedS;
    X.Quantite= parseInt(e.target.value);
    if(this.state.MedS.Quantite>this.state.Med.Quantite)alert("cet Quntite de se medicament n'est pas disponible");
    this.setState({MedS:X});
    };
    handleChangePrix =(e)=>{
    let X= this.state.MedS;
    X.Prix= parseInt(e.target.value)
    this.setState({MedS:X});
    };
    handleChangeMed=(P)=>{
        let X= this.state.MedS;
        X.id_m= P.id;
        X.NomMed=P.Nom_med;
        if(this.state.MedS.Quantite>P.Quantite)alert("cet Quntite de se medicament n'est pas disponible");
        this.state.Med = {
            id:P.id,
            Quantite:P.Quantite,
        };
        this.setState({MedToAdd : P})
        this.setState({MedS:X,FilterMed : P.Nom_med});
    }
    handleChangeFilterMed= (e) => {
        this.state.ShowSelectMed = true;
        this.state.FilterMed=e.target.value;
        this.FilterFn()
        this.setState({});
    };
    setPrix(PrixMed){
        let X= this.state.MedS;
        X.Prix= PrixMed;
        this.setState({MedS:X});
    }
/////////////////////////Actions in API
    Submit=(e)=>{ 
        e.preventDefault();
        if(this.state.MedS.id_m!==0){
        this.props.AddMedicament(this.state.MedS);
        this.setState({
            FilterMed:"",            
            MedS:{
                Quantite:0,
                Prix:0,
                Idcons:0,
                id_m:0,
                NomMed:""
            },
        })
        }else{
            alert("Sélectionner un médicament")
        }
    }
/////////////
    addClick(){
        this.setState({
            selectedMedicament:{
                id:0,
                Nom_med:"",
                Seuil:"",
                Quantite:"",
                Prixachat:"",
                Prixvente:"",
                Dateperemption:"",
                Description:"",
                categorie:"",
                type:"",
                code:"",
            },
        });
    }
//////////////////////////get data from API
    GetMedicament(){
        this.setState({});
        fetch(variables.API_URL+'Medicamment_Stock')
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
    render(){
        const {
            MedS,
            Medicament,
            ShowSelectMed,
            FilterMed,
            selectedMedicament,
            MedToAdd
        }=this.state;
        return(<>
                <div className="modal fade" id="MedicamentStockForm" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content w-75 m-auto">
                    <div className="modal-header">
                        <h5 className="modal-title">Ajouter Medicament Stock</h5>
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
                                            <button type='button' className='btn p-1 Openselect' onClick={()=>this.handleChangeMed(P)}>{P.Nom_med}</button>
                                        </>))}
                                        {Medicament.length===0?<>no options</>:null}
                                    </div>:null}
                                </div>
                                <button type='button' className='btn bnt-light Openselect' onClick={()=>this.cahngeShowSelectMed()}>
                                    {!ShowSelectMed?<i class="bi bi-caret-down-fill Openselect"></i>:<i class="bi bi-caret-up-fill Openselect"></i>}
                                </button>
                                <button type="button" className="btn3 p-0 float-end" 
                                data-bs-toggle="modal"data-bs-target="#StockForm" onClick={()=>this.addClick()}>
                                    Medicament
                                </button>
                            </div>
                            <div className='d-flex'>
                                <div className="p-1 mb-3">
                                    <input type="number" value={MedS.Quantite}onChange={this.handleChangeQuantite} required/>
                                    <span>Quantite</span>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className="p-1 mb-3">
                                    <input type="number" value={MedS.Prix}onChange={this.handleChangePrix} required/>
                                    <span>Prix</span>
                                </div>
                                <div className='d-block w-50'>
                                    <button className='btn6 h5 m-1' type='button' onClick={(e)=>this.setPrix(MedToAdd.Prixachat)}>Prix d'achat : {MedToAdd.Prixachat}</button>
                                    <button className='btn6 h5 m-1' type='button' onClick={(e)=>this.setPrix(MedToAdd.Prixvente)}>Prix de vente : {MedToAdd.Prixvente}</button>
                                </div>
                            </div>
                        </div>
                        </div>
                            <button type="submit"className="btn3 float-start">add</button>
                    </form>

                    </div>
                    </div> 
                </div>
                <Formstock selectedStock={selectedMedicament} modalTitle={"Ajouter Medicament"} refreshList={()=>this.GetMedicament()} GetDate={()=>this.props.GetDate()}/>
         </> 
        )
    }
}