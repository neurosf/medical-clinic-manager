import React,{Component} from 'react';
import { variables } from '../../Variables';
import { NavLink } from 'react-router-dom';

import { FormVar } from '../Medicale/FormVar';

export class FormSuivi  extends Component{

    constructor(props){
        super(props);
        this.state={
            Var:[],
            VarWithoutFilter:[],
            ShowSelectvar:false,
            Filtervar:this.props.Filtervar,
            /// vologie
            selectedVar:{
                id:0,
                Nom_v:"",
            },
        }
    }
////////////////////////////filter
    FilterFn(){
        var Filtervar=this.state.Filtervar;

        var filteredData=this.state.VarWithoutFilter.filter(
            function(el){
                return el.Nom_v.toString().toLowerCase().includes(
                    Filtervar.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Var:filteredData});
    }
//////////////////////set state var
    handleChangeDateVar = (e) => {
    let X = this.props.selectedSuivi;
    X.DateVar = e.target.value;
    this.setState({ selectedSuivi: X });
    };
    handleChangeImportance =(e)=>{
    let X= this.props.selectedSuivi;
    X.Importance= e.target.value
    this.setState({selectedSuivi:X});
    };
    handleChangeValeur =(e)=>{
    let X= this.props.selectedSuivi;
    X.Valeur= e.target.value
    this.setState({selectedSuivi:X});
    };
    handleChangeCommentaire =(e)=>{
    let X= this.props.selectedSuivi;
    X.Commentaire= e.target.value
    this.setState({selectedSuivi:X});
    };
    handleChangev=(e)=>{
        let X= this.props.selectedSuivi;
        X.id_v= parseInt(e.target.getAttribute('Key-v'));
        this.setState({selectedSuivi:X,Filtervar : e.target.value});
    }
    handleChangeFiltervar= (e) => {
        this.state.ShowSelectvar = true;
        this.state.Filtervar=e.target.value;
        this.FilterFn()
        this.setState({});
    };
/////////////////////////Actions in API
    Submit=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedSuivi.id_v!==0){
            if(this.props.selectedSuivi.id===0){
            this.createClick()
            }
            else{
                this.updateClick()
            }
        }else{
            alert("Sélectionner une Pathologie")
        }
    }
    createClick(){
        delete this.props.selectedSuivi.id;
        fetch(variables.API_URL+'Variable_de_suivie',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedSuivi)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('SuiviForm');
            this.props.refreshList()
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'Variable_de_suivie',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedSuivi)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('SuiviForm');
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Variable_de_suivie/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('SuiviForm');
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
///////////////////////pompe data actions
    addClick(){
        this.setState({
            selectedVar:{
                id:0,
                Nom_v:"",
            }
        });
    }
//////////////////////////get data from API
    GetVar(){
        this.setState({});
        fetch(variables.API_URL+'Variable')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Var:data,VarWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.GetVar();
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }
    handleDocumentClick = (e) => {
        if ((!e.target.id==="selectvar" || !e.target.classList.contains('Openselect'))) {
            this.state.ShowSelectvar = false;
            this.setState({});
        }
    };
//////////////////////////////////////////
    cahngeShowSelectvar=()=>{
        this.state.ShowSelectvar=!this.state.ShowSelectvar;
        this.setState({})
    }
    componentDidUpdate(prevProps) {
        if (this.props.Filtervar !== prevProps.Filtervar) {
            this.state.Filtervar = this.props.Filtervar;
            this.setState({})
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
            selectedSuivi,
            modalTitle,
        }=this.props;
        const {
            Var,
            ShowSelectvar,
            Filtervar,
            selectedVar
        }=this.state;
        return(<>
                <div className="modal fade" id="SuiviForm" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form className="modal-body" onSubmit={(e)=>this.Submit(e)}>
                        <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="p-2 w-100 m-auto bd-highlight">
                        <div className='d-flex justify-content-between'>
                         <h4>Type</h4>
                         {selectedSuivi.id!==0?
                         <button type="button" className="btn3 p-1 mr-1" onClick={()=>this.deleteClick(selectedSuivi.id)}>
                            <i className="bi-trash"></i>
                         </button>:null}
                        </div>
                            <div className='w-75'>
                                <div className="p-1 mb-3">
                                    <input type="date" value={selectedSuivi.DateVar} onChange={this.handleChangeDateVar}/>
                                    <span>Date</span>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <span className='m-2 h6'>Variable</span>
                                <div className='d-block'>
                                    <input type="text" className="form-control Openselect"value={Filtervar} onChange={this.handleChangeFiltervar}/>
                                    {ShowSelectvar?
                                    <div id="selectvar">
                                        {Var.map(P=>(<>
                                            <button type='button' className='btn p-1 Openselect' value={P.Nom_v} Key-v={P.id} onClick={this.handleChangev}>{P.Nom_v}</button>
                                        </>))}
                                        {Var.length===0?<>no options</>:null}
                                    </div>:null}
                                </div>
                                <button type='button' className='btn bnt-light Openselect' onClick={()=>this.cahngeShowSelectvar()}>
                                    {!ShowSelectvar?<i class="bi bi-caret-down-fill Openselect"></i>:<i class="bi bi-caret-up-fill Openselect"></i>}
                                </button>
                                <button type="button" className="btn3 float-end p-0 m-1" 
                                    data-bs-toggle="modal"data-bs-target="#VariablesPhyForm" onClick={()=>this.addClick()}>
                                        Variable
                                </button>
                            </div>
                            <div>
                                <select className="form-control mb-3 w-50"  value={selectedSuivi.Importance} onChange={this.handleChangeImportance} required>
                                    <option value=""></option>
                                    <option value="Basse">Basse</option>
                                    <option value="Normale">Normale</option>
                                    <option value="Haute">Haute</option>
                                </select>
                                <span>Importance</span>
                            </div>
                            <div>
                                <select className="form-control mb-3 w-50"  value={selectedSuivi.Valeur} onChange={this.handleChangeValeur} required>
                                    <option value=""></option>
                                    <option value="...">...</option>
                                    {/* get options */}
                                </select>
                                <span>Valeur</span>
                            </div>
                            <div className="p-1 mb-3">
                                <input type="text" value={selectedSuivi.Commentaire}onChange={this.handleChangeCommentaire}/>
                                <span>Commentaire</span>
                            </div>
                        </div>
                        </div>

                        {selectedSuivi.id===0?
                            <button type="submit"className="btn3 float-start">Create</button>
                            :null}

                        {selectedSuivi.id!==0?
                            <button type="submit" className="btn3 float-start">Update</button>
                            :null}
                    </form>

                    </div>
                    </div> 
                </div> 
                <FormVar selectedVariablesPhy={selectedVar} modalTitle={"Ajouter un Variable"} refreshList={()=>this.GetVar()}/>
                </> 
        )
    }
}