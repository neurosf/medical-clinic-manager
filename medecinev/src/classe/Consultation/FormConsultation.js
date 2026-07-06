import React,{Component} from 'react';
import { variables } from '../../Variables';
import { NavLink } from 'react-router-dom';
import { FormMedicamentT } from './FormMedicamentT'; 
import { FormMedicamentStock } from './FormMedicamentStock';

import { FormPathologies } from '../Medicale/FormPathologie';

export class FormConsultation  extends Component{

    constructor(props){
        super(props);
        this.state={
            ///Pathologies
            PathologiesMotif:[],
            PathologiesDiagnostique:[],
            PathologiesWithoutFilter:[],
            ShowSelectPathMotif:false,
            ShowSelectPathDiagnostique:false,
            FilterPathMotif:"",
            FilterPathDiagnostique:"",
            ///
            Medicament:[],
            ///Traitement
            Traitement:null,
            MedicamentT:[],
            ///Medicament utiliser
            MedicamentUsed:[],
            MedicamentStockUsed:[],
            /// pathologie
            selectedPathologies:{
                id:0,
                Nom_path:"",
            },
        }
    }
////////////////////////////filter
    FilterFnMotif(){
        var FilterPathMotif=this.state.FilterPathMotif;

        var filteredData=this.state.PathologiesWithoutFilter.filter(
            function(el){
                return el.Nom_path.toString().toLowerCase().includes(
                    FilterPathMotif.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({PathologiesMotif:filteredData});
    }
    FilterFnDiagnostique(){
        var FilterPathDiagnostique=this.state.FilterPathDiagnostique;

        var filteredData=this.state.PathologiesWithoutFilter.filter(
            function(el){
                return el.Nom_path.toString().toLowerCase().includes(
                    FilterPathDiagnostique.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({PathologiesDiagnostique:filteredData});
    }
//////////////////////set state var
    handleChangeDateC = (e) => {
    let X = this.props.selectedConsultation;
    X.DateC = e.target.value;
    this.setState({ selectedConsultation: X });
    };
    handleChangecr_rapideM = (e) => {
        let X = this.props.selectedConsultation;
        X.cr_rapideM= e.target.value;
        this.setState({ selectedConsultation: X });
    };
    handleChangecr_rapideD = (e) => {
        let X = this.props.selectedConsultation;
        X.cr_rapideD= e.target.value;
        this.setState({ selectedConsultation: X });
    };
    handleChangeImportanceC = (e)  => {
        let X = this.props.selectedConsultation;
        X.ImportanceC= e.target.value;
        this.setState({ selectedConsultation: X });
    };
    handleChangeCommentaireC =(e)=>{
    let X= this.props.selectedConsultation;
    X.CommentaireC= e.target.value
    this.setState({selectedConsultation:X});
    };
    handleChangePrix =(e)=>{
    let X= this.props.selectedConsultation;
    X.Prix=parseInt(e.target.value)
    this.setState({selectedConsultation:X});
    };
    handleChangePrix_paye=(e)=>{
    let X= this.props.selectedConsultation;
    X.Prix_paye= parseInt(e.target.value)
    this.setState({selectedConsultation:X});
    };
    handleChangePathMotif=(e)=>{
        let X= this.props.selectedConsultation;
        X.motif.id= parseInt(e.target.getAttribute('Key-Path'));
        this.setState({selectedConsultation:X,FilterPathMotif : e.target.value});
    }
    handleChangeFilterPathMotif= (e) => {
        this.state.ShowSelectPathMotif = true;
        this.state.FilterPathMotif=e.target.value;
        this.FilterFnMotif()
        this.setState({});
    };
    handleChangePathDiagnostique=(e)=>{
        let X= this.props.selectedConsultation;
        X.Diagnostique.id= parseInt(e.target.getAttribute('Key-Path'));
        this.setState({selectedConsultation:X,FilterPathDiagnostique : e.target.value});
    }
    handleChangeFilterPathDiagnostique= (e) => {
        this.state.ShowSelectPathDiagnostique = true;
        this.state.FilterPathDiagnostique=e.target.value;
        this.FilterFnDiagnostique()
        this.setState({});
    };
/////////////////////////Actions in API
    SubmitConsultation=(e)=>{ 
        e.preventDefault();
        if(this.props.selectedConsultation.motif.id!==0&&this.props.selectedConsultation.Diagnostique.id!==0){
            let X = {...this.props.selectedConsultation};
            X.Prix_Totale = X.Prix;
            this.state.MedicamentUsed.map(M=>{
                X.Prix_Totale += M.Quantite*M.Prix;
            })
            this.setState({selectedConsultation:X});
            if(this.props.selectedConsultation.id===0){
            this.createClick(X)
            }
            else{
                this.updateClick(X)
            }
        }else{
            alert("Sélectionner une Pathologie")
        }
    }
    createClick(selectedConsultation){
        delete selectedConsultation.id;
        selectedConsultation.motif=selectedConsultation.motif.id;
        selectedConsultation.Diagnostique=selectedConsultation.Diagnostique.id;
        fetch(variables.API_URL+'Consultation',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(selectedConsultation)
        })
        .then(res=>res.json())
        .then((result)=>{
            if(this.state.Traitement!==null)this.createTraitement(result.ID);
            this.createMedicamentStock(result.ID);
            this.UpdateStock();
            this.CloseModel('ConsultationForm');
        },(error)=>{
            alert('Failed to add try again');
            this.props.refreshList();
        })
    }
    updateClick(selectedConsultation){
        if(!(/[0-9]/.test(selectedConsultation.idD))){
            selectedConsultation.idD=selectedConsultation.idD.id;
            selectedConsultation.motif=selectedConsultation.motif.id;
            selectedConsultation.Diagnostique=selectedConsultation.Diagnostique.id;
        } 
        fetch(variables.API_URL+'Consultation',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(selectedConsultation)
        })
        .then(res=>res.json())
        .then((result)=>{
            if(this.state.Traitement!==null){
                if(this.state.Traitement.id===0)this.createTraitement(this.state.selectedConsultation.id)
                else this.UpdateTraitement()
            }else {
                this.props.refreshList()
            }
            this.createMedicamentStock(this.state.selectedConsultation.id);
            this.UpdateStock();
            this.CloseModel('ConsultationForm');
        },(error)=>{
            alert('Failed');
        })
    }
    createTraitement(ID_C){
        this.state.Traitement.Idcons=ID_C;
        delete this.state.Traitement.id;
        fetch(variables.API_URL+'Traitement',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Traitement:this.state.Traitement,
                Medicament:this.state.MedicamentT
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        }) 
    }
    createMedicamentStock(ID_C){
        let MedicamentUsed=[]
        this.state.MedicamentUsed.map(M=>{
            MedicamentUsed.push({
                Quantite:M.Quantite,
                Prix:M.Prix,
                Idcons:ID_C,
                id_m:M.id_m,
            })
        })
        fetch(variables.API_URL+'Medicamment_consultation/'+ID_C,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(MedicamentUsed)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        }) 
    }
    UpdateTraitement(){
        let Medicament = this.state.MedicamentT;
        Medicament.map(m=>delete m.NomMed);
        fetch(variables.API_URL+'Traitement',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Traitement:this.state.Traitement,
                Medicament:Medicament
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        }) 
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Consultation/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('ConsultationForm');
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    UpdateStock(){
        fetch(variables.API_URL+'Medicamment_StockGet',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.MedicamentStockUsed)
        })
        .then(res=>res.json())
        .then((result)=>{
        },(error)=>{
            alert('Failed');
        }) 
    }
//////////////////////////get data from API
    GetTraitement=(ID_Cons)=>{
        fetch(variables.API_URL+'Traitement/'+ID_Cons)
        .then(response=>response.json())
        .then(data=>{
            if(data.length>0){
                this.setState({Traitement:data[0]})
                this.GetMedicamentT(data[0].id);
            }else{
                this.setState({MedicamentT:[]})
            }
        });
    }
    GetMedicamentT=(ID_Traitement)=>{
        fetch(variables.API_URL+'Medicament_TraitementGet/'+ID_Traitement)
        .then(response=>response.json())
        .then(data=>{
            this.state.MedicamentT=[];
            data.map(D=>{this.state.MedicamentT.push({
                description:D.description,
                Id_T:D.Id_T,
                IdMed:D.IdMed.id,
                NomMed:D.IdMed.Nom
            })})
            this.setState({});
        });
    }
    GetMedicamentUsed=(ID_Cons)=>{
        fetch(variables.API_URL+'Medicamment_consultationGet/'+ID_Cons)
        .then(response=>response.json())
        .then(data=>{
            this.state.MedicamentUsed=[];
            data.map(D=>{this.state.MedicamentUsed.push({
                Quantite:D.Quantite,
                Prix:D.Prix,
                Idcons:D.Idcons,
                id_m:D.id_m.id,
                NomMed:D.id_m.Nom_med
            })})
            this.setState({});
        });
    }
    GetPathologies(){
        this.setState({});
        fetch(variables.API_URL+'Pathologie')
        .then(response=>response.json())
        .then(data=>{
            this.setState({PathologiesDiagnostique:data,PathologiesMotif:data,PathologiesWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.GetPathologies();
        this.GetMedicamentUsed(this.props.selectedConsultation.id);
        if(this.props.selectedConsultation.id!==0)this.GetTraitement(this.props.selectedConsultation.id);
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }
    handleDocumentClick = (e) => {
        if ((!e.target.id==="selectPAthoogieMotif" || !e.target.classList.contains('OpenselectMotif'))) {
            this.state.ShowSelectPathMotif = false;
            this.setState({});
        }
        if ((!e.target.id==="selectPAthoogieDiagnostique" || !e.target.classList.contains('OpenselectDiagnostique'))) {
            this.state.ShowSelectPathDiagnostique = false;
            this.setState({});
        }
    };
////////////////////// Sous Consultation
    AddTraitement=(e)=> {
        this.state.Traitement={
            id:0,
            date:this.props.GetDate().split('T')[0],
            Idcons:this.props.selectedConsultation.id,
        }
    }
    AddMedicament=(Med)=>{
        this.state.MedicamentT.push(Med)
        this.setState({})
    }
    AddMedicamentStock=(MedS)=>{
        this.state.MedicamentUsed.push(MedS);
        let IDM=this.state.MedicamentStockUsed.findIndex((item) => item.id==MedS.id_m);
        if(IDM===-1){
            this.state.MedicamentStockUsed.push({
                id:MedS.id_m,
                Quantite:(-MedS.Quantite)
            });
        }else{
            this.state.MedicamentStockUsed[IDM].Quantite-=MedS.Quantite;
        }
        this.setState({})
    }
    deletMedicament=(i)=>{
        this.state.MedicamentT.splice(i,1);
        this.setState({})
    }
    deletMedicamentStock=(i)=>{
        let IDM=this.state.MedicamentStockUsed.findIndex((item) => item.id==this.state.MedicamentUsed[i].id_m);
        if(IDM===-1){
            this.state.MedicamentStockUsed.push({
                id:this.state.MedicamentUsed[i].id_m,
                Quantite:this.state.MedicamentUsed[i].Quantite
            });
        }else{
            this.state.MedicamentStockUsed.splice(IDM,1);
        }
        this.state.MedicamentUsed.splice(i,1);
        this.setState({})
    }
///////////////////////pompe data actions
    addClickPathologie(){
    this.setState({
        selectedPathologies:{
            id:0,
            Nom_path:"",
        }
    });
    }
//////////////////////////////////////////
    cahngeShowSelectPathMotif=()=>{
        this.state.ShowSelectPathMotif=!this.state.ShowSelectPathMotif;
        this.setState({})
    }
    cahngeShowSelectPathDiagnostique=()=>{
        this.state.ShowSelectPathDiagnostique=!this.state.ShowSelectPathDiagnostique;
        this.setState({})
    }
    componentDidUpdate(prevProps) {
        if (this.props.FilterPathMotif !== prevProps.FilterPathMotif
            ||this.props.FilterPathDiagnostique !== prevProps.FilterPathDiagnostique
            ||this.props.selectedConsultation!==prevProps.selectedConsultation) {
            this.state.FilterPathMotif = this.props.FilterPathMotif;
            this.state.FilterPathDiagnostique = this.props.FilterPathDiagnostique;
            if(this.props.selectedConsultation.id!==0)this.GetTraitement(this.props.selectedConsultation.id);
            this.GetMedicamentUsed(this.props.selectedConsultation.id);
            this.state.MedicamentStockUsed=[];
            let X = this.props.selectedConsultation;
            this.setState({ selectedConsultation: X });
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
            selectedConsultation,
            modalTitle,
        }=this.props;
        const {
            PathologiesMotif,
            ShowSelectPathMotif,
            FilterPathMotif,
            PathologiesDiagnostique,
            ShowSelectPathDiagnostique,
            FilterPathDiagnostique,
            Traitement,
            MedicamentT,
            MedicamentUsed,
            selectedPathologies,

        }=this.state;
        return(<>
                <div className="modal fade" id="ConsultationForm" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form className="modal-body" onSubmit={(e)=>this.SubmitConsultation(e)}>
                        <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="p-2 w-100 m-auto bd-highlight">
                        <div className='d-flex justify-content-between'>
                         <h4></h4>
                         {selectedConsultation.id!==0?
                         <button type="button" className="btn3 mr-1" onClick={()=>this.deleteClick(selectedConsultation.id)}>
                            <i className="bi-trash"></i>
                         </button>:null}
                        </div>
                            <div className='d-flex'>
                                <div className="p-1 mb-3">
                                    <input type="datetime-local"value={selectedConsultation.DateC} onChange={this.handleChangeDateC}/>
                                    <span>Date</span>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <span className='m-2 h6'>Motif</span>
                                <div className='d-block'>
                                    <input type="text" className="form-control OpenselectMotif"value={FilterPathMotif} onChange={this.handleChangeFilterPathMotif}/>
                                    {ShowSelectPathMotif?
                                    <div id="selectPAthoogieMotif">
                                        {PathologiesMotif.map(P=>(<>
                                            <button type='button' className='btn p-1 OpenselectMotif' value={P.Nom_path} Key-Path={P.id} onClick={this.handleChangePathMotif}>{P.Nom_path}</button>
                                        </>))}
                                        {PathologiesMotif.length===0?<>no options</>:null}
                                    </div>:null}
                                </div>
                                <button type='button' className='btn bnt-light OpenselectMotif' onClick={()=>this.cahngeShowSelectPathMotif()}>
                                    {!ShowSelectPathMotif?<i class="bi bi-caret-down-fill OpenselectMotif"></i>:<i class="bi bi-caret-up-fill OpenselectMotif"></i>}
                                </button>
                                <button type="button" className="btn3 float-end p-1 m-1" 
                                    data-bs-toggle="modal"data-bs-target="#PathologiesFormConsultation" onClick={()=>this.addClickPathologie()}>
                                        Pathologie
                                </button>
                            </div>
   
                            <div className="p-1 mb-3">
                                <input type="text" className=" OpenselectMotif" value={selectedConsultation.cr_rapideM} onChange={this.handleChangecr_rapideM} required/>
                                <span>(Cr. Rapide)</span>
                            </div>
                            <div>
                                <select className="form-control mb-3 w-50"  value={selectedConsultation.ImportanceC} onChange={this.handleChangeImportanceC} required>
                                    <option value=""></option>
                                    <option value="Basse">Basse</option>
                                    <option value="Normale">Normale</option>
                                    <option value="Haute">Haute</option>
                                </select>
                                <span>Importance</span>
                            </div>
                            <div className='d-flex'>
                                <span className='m-2 h6'>Diagnostique</span>
                                <div className='d-block'>
                                    <input type="text" className="form-control OpenselectDiagnostique"value={FilterPathDiagnostique} onChange={this.handleChangeFilterPathDiagnostique}/>
                                    {ShowSelectPathDiagnostique?
                                    <div id="selectPAthoogieDiagnostique">
                                        {PathologiesDiagnostique.map(P=>(<>
                                            <button type='button' className='btn p-1 OpenselectDiagnostique' value={P.Nom_path} Key-Path={P.id} onClick={this.handleChangePathDiagnostique}>{P.Nom_path}</button>
                                        </>))}
                                        {PathologiesDiagnostique.length===0?<>no options</>:null}
                                    </div>:null}
                                </div>
                                <button type='button' className='btn bnt-light OpenselectDiagnostique' onClick={()=>this.cahngeShowSelectPathDiagnostique()}>
                                    {!ShowSelectPathDiagnostique?<i class="bi bi-caret-down-fill OpenselectDiagnostique"></i>:<i class="bi bi-caret-up-fill OpenselectDiagnostique"></i>}
                                </button>
                                <button type="button" className="btn3 float-end p-1 m-1" 
                                    data-bs-toggle="modal"data-bs-target="#PathologiesFormConsultation" onClick={()=>this.addClickPathologie()}>
                                        Pathologie
                                </button>
                            </div>
                            <div className="p-1 mb-3">
                                <input type="text" className=" OpenselectMotif" value={selectedConsultation.cr_rapideD} onChange={this.handleChangecr_rapideD} required/>
                                <span>(Cr. Rapide)</span>
                            </div>
                                <div className="p-1 mb-3">
                                    <input type="text" value={selectedConsultation.CommentaireC } onChange={this.handleChangeCommentaireC}/>
                                    <span>Commentaire</span>
                                </div>
                            <div className='d-flex'>
                                <div className="p-1 mb-3">
                                    <input type="number" value={selectedConsultation.Prix } onChange={this.handleChangePrix}/>
                                    <span>Prix</span>
                                </div>
                                <div className="p-1 mb-3">
                                    <input type="number" value={selectedConsultation.Prix_paye } onChange={this.handleChangePrix_paye}/>
                                    <span>Prix payé</span>
                                </div>
                            </div>
                            {Traitement===null?
                            <div className='d-flex'>
                                <button className='btn' type='button' onClick={()=>this.AddTraitement()}>
                                    <i class="fa fa-plus m-1"></i>Ajouter Un Traitement</button>
                            </div>: 
                                <div>
                                    <h4>Traitement</h4>
                                    <button className='btn' type='button' data-bs-toggle="modal"data-bs-target="#MedicamentTForm">
                                        <i class="fa fa-plus m-1"></i>Ajouter Un Medicament</button>
                                    <table className="table w-50">
                                            <thead>
                                                <tr>
                                                    <th>Produit</th>
                                                    <th>description</th>
                                                </tr>
                                            </thead>
                                    {MedicamentT.map((M,i)=>(
                                        <tr>
                                            <td className='MedicamentName'>{M.NomMed}</td>
                                            <td className='Medicamentdisc'>{M.description}</td>
                                            <td><button type='button' className='btn6 m-1' onClick={()=>this.deletMedicament(i)}><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                        </tr>
                                    ))}</table>
                                    </div>}

                            <div>
                                <h4>Medicament Utilise</h4>
                                <button className='btn' type='button'data-bs-toggle="modal"data-bs-target="#MedicamentStockForm">
                                    <i class="fa fa-plus m-1"></i>Ajouter la list Medicament utilise</button>
                                       <table className="table w-75">
                                            <thead>
                                                <tr>
                                                    <th>Produit</th>
                                                    <th>Quantite</th>
                                                    <th>Prix unitaire</th>
                                                    <th>Prix</th>
                                                </tr>
                                            </thead>
                                    {MedicamentUsed.map((M,i)=>(
                                        <tr>
                                            <td className='MedicamentName'>{M.NomMed}</td>
                                            <td className='Medicamentdisc'>{"x"+M.Quantite}</td>
                                            <td className='Medicamentdisc'>{M.Prix}</td>
                                            <td className='Medicamentdisc'>{(M.Prix*M.Quantite)+" Da"}</td>
                                            <td><button className='btn6 m-1' onClick={()=>this.deletMedicamentStock(i)}><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                                        </tr>
                                        ))} </table>
                            </div>
                        </div>
                        </div>

                        {selectedConsultation.id===0?
                            <button type="submit"className="btn3 float-start">Create</button>
                            :null}

                        {selectedConsultation.id!==0?
                            <button type="submit" className="btn3 float-start">Update</button>
                            :null}
                    </form>

                    </div>
                    </div> 
                </div>
                <FormMedicamentT AddMedicament={this.AddMedicament} Traitement={Traitement}/>
                <FormMedicamentStock AddMedicament={this.AddMedicamentStock} GetDate={()=>this.props.GetDate()}/>
                <FormPathologies idpath={"PathologiesFormConsultation"} selectedPathologies={selectedPathologies} modalTitle={"Ajouter Pathologie"} refreshList={()=>this.GetPathologies()}/>
                </>  
        )
    }
}