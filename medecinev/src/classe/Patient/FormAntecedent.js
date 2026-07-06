import React,{Component} from 'react';
import { variables } from '../../Variables';
import { NavLink } from 'react-router-dom';

import { FormPathologies } from '../Medicale/FormPathologie';

export class FormAntecedent  extends Component{

    constructor(props){
        super(props);
        this.state={
            Pathologies:[],
            PathologiesWithoutFilter:[],
            ShowSelectPath:false,
            isFamiliale:this.props.isFamiliale,
            FilterPath:this.props.FilterPath,
            /// pathologie
            selectedPathologies:{
                id:0,
                Nom_path:"",
            },
        }
    }
////////////////////////////filter
    FilterFn(){
        var FilterPath=this.state.FilterPath;

        var filteredData=this.state.PathologiesWithoutFilter.filter(
            function(el){
                return el.Nom_path.toString().toLowerCase().includes(
                    FilterPath.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Pathologies:filteredData});
    }
//////////////////////set state var
    handleChangeImportanceA = (e) => {
    let X = this.props.selectedAntecedent;
    X.ImportanceA= e.target.value;
    this.setState({ selectedAntecedent: X });
    };
    handleChangeDateA = (e) => {
    let X = this.props.selectedAntecedent;
    X.DateA = e.target.value;
    this.setState({ selectedAntecedent: X });
    };
    handleChangeCommentaireA =(e)=>{
    let X= this.props.selectedAntecedent;
    X.CommentaireA= e.target.value
    this.setState({selectedAntecedent:X});
    };
    handleChangetype=(e)=>{
        if(this.state.isFamiliale){
            let X = this.props.selectedAntecedent;
            X.familiale = e.target.value;
            this.setState({ selectedAntecedent: X });
        }
    }
    handleIsFamiliale=(e)=>{
        const selectedValue = parseInt(e.target.value);
        const isFamiliale = selectedValue === 2;
        let X = this.props.selectedAntecedent;
        if(isFamiliale){
            X.familiale= "";
        }else{
            X.familiale= "Personnel";
        }
        this.setState({ selectedAntecedent: X });
        this.setState({isFamiliale:isFamiliale});
    }
    handleChangePath=(e)=>{
        let X= this.props.selectedAntecedent;
        X.id_path= parseInt(e.target.getAttribute('Key-path'));
        this.setState({selectedAntecedent:X,FilterPath : e.target.value});
    }
    handleChangeFilterPath= (e) => {
        this.state.ShowSelectPath = true;
        this.state.FilterPath=e.target.value;
        this.FilterFn()
        this.setState({});
    };
/////////////////////////Actions in API
    Submit=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedAntecedent.id_path!==0){
            if(this.props.selectedAntecedent.id===0){
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
        delete this.props.selectedAntecedent.id;
        fetch(variables.API_URL+'Antecedent',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedAntecedent)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('AntecedentForm');
            this.props.refreshList()
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'Antecedent',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedAntecedent)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('AntecedentForm');
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Antecedent/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('AntecedentForm');
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
///////////////////////pompe data actions
    addClick(){
        this.setState({
            selectedPathologies:{
                id:0,
                Nom_path:"",
            }
        });
    }
//////////////////////////get data from API
    GetPathologies(){
        this.setState({});
        fetch(variables.API_URL+'Pathologie')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Pathologies:data,PathologiesWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.GetPathologies();
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }
    handleDocumentClick = (e) => {
        if ((!e.target.id==="selectPAthoogie" || !e.target.classList.contains('Openselect'))) {
            this.state.ShowSelectPath = false;
            this.setState({});
        }
    };
//////////////////////////////////////////
    cahngeShowSelectPath=()=>{
        this.state.ShowSelectPath=!this.state.ShowSelectPath;
        this.setState({})
    }
    componentDidUpdate(prevProps) {
        if (this.props.FilterPath !== prevProps.FilterPath||this.props.isFamiliale !== prevProps.isFamiliale) {
            this.state.FilterPath = this.props.FilterPath;
            this.state.isFamiliale = this.props.isFamiliale;
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
            selectedAntecedent,
            modalTitle,
        }=this.props;
        const {
            Pathologies,
            ShowSelectPath,
            isFamiliale,
            FilterPath,
            selectedPathologies
        }=this.state;
        return(<>
                <div className="modal fade" id="AntecedentForm" tabIndex="-1" aria-hidden="true">
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
                         {selectedAntecedent.id!==0?
                         <button type="button" className="btn3 p-1 mr-1" onClick={()=>this.deleteClick(selectedAntecedent.id)}>
                            <i className="bi-trash"></i>
                         </button>:null}
                        </div>
                            <div className='d-flex' style={{height: '100px'}}>
                                <input type="radio" name='type' className="m-2" checked={!isFamiliale} value={1} onClick={this.handleIsFamiliale} required />
                                <label className='m-2 h6'>Personnel</label>
                                <input type="radio" name='type' className="m-2" checked={isFamiliale} value={2} onClick={this.handleIsFamiliale} required />
                                <label className='m-2 h6'>familiale</label>
                                {isFamiliale?<div>
                                <select className="form-control mb-3 w-50"  value={selectedAntecedent.familiale} onChange={this.handleChangetype} required>
                                    <option value=""></option>
                                    <option value="Père">Père</option>
                                    <option value="Mère">Mère</option>
                                    <option value="Grand père">Grand père</option>
                                    <option value="Grand mère">Grand mère</option>
                                    <option value="Oncle">Oncle</option>
                                    <option value="Tante">Tante</option>
                                    {/* complite famelie members */}
                                </select>
                                <span>Family membre</span>
                                </div>:null}
                            </div>
                            <div className='d-flex'>
                                <span className='m-2 h6'>Pathologie</span>
                                <div className='d-block'>
                                    <input type="text" className="form-control Openselect"value={FilterPath} onChange={this.handleChangeFilterPath}/>
                                    {ShowSelectPath?
                                    <div id="selectPAthoogie">
                                        {Pathologies.map(P=>(<>
                                            <button type='button' className='btn p-1 Openselect' value={P.Nom_path} Key-path={P.id} onClick={this.handleChangePath}>{P.Nom_path}</button>
                                        </>))}
                                        {Pathologies.length===0?<>no options</>:null}
                                    </div>:null}
                                </div>
                                <button type='button' className='btn btn-light Openselect' onClick={()=>this.cahngeShowSelectPath()}>
                                    {!ShowSelectPath?<i class="bi bi-caret-down-fill Openselect"></i>:<i class="bi bi-caret-up-fill Openselect"></i>}
                                </button>
                                <button type="button" className="btn3 float-end p-1 m-1" 
                                    data-bs-toggle="modal"data-bs-target="#PathologiesFormAntecedent" onClick={()=>this.addClick()}>
                                        Pathologie
                                </button>
                            </div>
                         <div className='d-flex'>
                            <div className=" p-1 mb-3">
                                <input type="date" value={selectedAntecedent.DateA} onChange={this.handleChangeDateA}/>
                                <span >Date</span>
                            </div>
                         </div>
                            <div className='w-50'>
                                <select className="form-control mb-3"  value={selectedAntecedent.ImportanceA} onChange={this.handleChangeImportanceA} required>
                                    <option value=""></option>
                                    <option value="Basse">Basse</option>
                                    <option value="Normale">Normale</option>
                                    <option value="Haute">Haute</option>
                                </select>
                                <span>Importance</span>
                            </div>
                            <div className=" p-1 mb-3">
                                <input type="text" value={selectedAntecedent.CommentaireA}onChange={this.handleChangeCommentaireA}/>
                                <span >Commentaire</span>
                            </div>
                        </div>
                        </div>

                        {selectedAntecedent.id===0?
                            <button type="submit"className="btn3 float-start">Create</button>
                            :null}

                        {selectedAntecedent.id!==0?
                            <button type="submit" className="btn3 float-start">Update</button>
                            :null}
                    </form>

                    </div>
                    </div> 
                </div> 
                <FormPathologies  idpath={"PathologiesFormAntecedent"} selectedPathologies={selectedPathologies} modalTitle={"Ajouter Pathologie"} refreshList={()=>this.GetPathologies()}/>
                </> 
        )
    }
}