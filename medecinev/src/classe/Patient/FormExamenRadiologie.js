import React,{Component} from 'react';
import { variables } from '../../Variables';
import { NavLink } from 'react-router-dom';

import { FormRad } from '../Medicale/FormExamenRad';

export class FormExamenRadiologie  extends Component{

    constructor(props){
        super(props);
        this.state={
            Rdio:[],
            RdioWithoutFilter:[],
            ShowSelectRadio:false,
            isFamiliale:this.props.isFamiliale,
            FilterRadio:this.props.FilterRadio,
            /// Radioologie
            selectedRdio:{
                id:0,
                Nom:"",
            },
        }
    }
////////////////////////////filter
    FilterFn(){
        var FilterRadio=this.state.FilterRadio;

        var filteredData=this.state.RdioWithoutFilter.filter(
            function(el){
                return el.Nom.toString().toLowerCase().includes(
                    FilterRadio.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Rdio:filteredData});
    }
//////////////////////set state var
    handleChangedate = (e) => {
        let X = this.props.selectedExamenRadiologie;
        X.date = e.target.value;
        this.setState({ selectedExamenRadiologie: X });
    };
    handleChangeCommentaire =(e)=>{
        let X= this.props.selectedExamenRadiologie;
        X.Commentaire= e.target.value
        this.setState({selectedExamenRadiologie:X});
    };
    handleChangeRadio=(e)=>{
        let X= this.props.selectedExamenRadiologie;
        X.Idex= parseInt(e.target.getAttribute('Key-radio'));
        this.setState({selectedExamenRadiologie:X,FilterRadio : e.target.value});
    }
    handleChangeFilterRadio= (e) => {
        this.state.ShowSelectRadio = true;
        this.state.FilterRadio=e.target.value;
        this.FilterFn()
        this.setState({});
    };
/////////////////////////Actions in API
    Submit=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedExamenRadiologie.Idex!==0){
            if(this.props.selectedExamenRadiologie.id===0){
            this.createClick()
            }
            else{
                this.updateClick()
            }
        }else{
            alert("Sélectionner un Radio")
        }
    }
    createClick(){
        delete this.props.selectedExamenRadiologie.id;
        fetch(variables.API_URL+'examenRadiologique',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedExamenRadiologie)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('ExamenRadiologieForm');
            this.props.refreshList()
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'examenRadiologique',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedExamenRadiologie)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('ExamenRadiologieForm');
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'examenRadiologique/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('ExamenRadiologieForm');
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
///////////////////////pompe data actions
    addClick(){
        this.setState({
            selectedRdio:{
                id:0,
                Nom:"",
            }
        });
    }
//////////////////////////get data from API
    GetRdio(){
        this.setState({});
        fetch(variables.API_URL+'exradialogique')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Rdio:data,RdioWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.GetRdio();
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }
    handleDocumentClick = (e) => {
        if ((!e.target.id==="selectRadio" || !e.target.classList.contains('Openselect'))) {
            this.state.ShowSelectRadio = false;
            this.setState({});
        }
    };
//////////////////////////////////////////
    cahngeShowSelectRadio=()=>{
        this.state.ShowSelectRadio=!this.state.ShowSelectRadio;
        this.setState({})
    }
    componentDidUpdate(prevProps) {
        if (this.props.FilterRadio !== prevProps.FilterRadio) {
            this.state.FilterRadio = this.props.FilterRadio;
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
            selectedExamenRadiologie,
            modalTitle,
        }=this.props;
        const {
            Rdio,
            ShowSelectRadio,
            FilterRadio,
            selectedRdio
        }=this.state;
        return(<>
                <div className="modal fade" id="ExamenRadiologieForm" tabIndex="-1" aria-hidden="true">
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
                         <h4></h4>
                         {selectedExamenRadiologie.id!==0?
                         <button type="button" className="btn4 p-1 mr-1" onClick={()=>this.deleteClick(selectedExamenRadiologie.id)}>
                            <i className="bi-trash"></i>
                         </button>:null}
                        </div>
                            <div className='d-flex'>
                                <div className="p-1 mb-3">
                                    <input type="date"value={selectedExamenRadiologie.date} onChange={this.handleChangedate} required/>
                                    <span>Date</span>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <span className='m-2 h6'>Radio</span>
                                <div className='d-block'>
                                    <input type="text" className="form-control Openselect"value={FilterRadio} onChange={this.handleChangeFilterRadio}/>
                                    {ShowSelectRadio?
                                    <div id="selectRadio">
                                        {Rdio.map(R=>(<>
                                            <button type='button' className='btn p-1 Openselect' value={R.Nom} Key-radio={R.id} onClick={this.handleChangeRadio}>{R.Nom}</button>
                                        </>))}
                                        {Rdio.length===0?<>no options</>:null}
                                    </div>:null}
                                </div>
                                <button type='button' className='btn bnt-light Openselect' onClick={()=>this.cahngeShowSelectRadio()}>
                                    {!ShowSelectRadio?<i class="bi bi-caret-down-fill Openselect"></i>:<i class="bi bi-caret-up-fill Openselect"></i>}
                                </button>
                                <button type="button" className="btn4 float-end p-1 m-1" 
                                    data-bs-toggle="modal"data-bs-target="#ExamenRadForm" onClick={()=>this.addClick()}>
                                        Radioologie
                                </button>
                            </div>
                                <div className="p-1 mb-3">
                                    <input type="text"value={selectedExamenRadiologie.Commentaire}onChange={this.handleChangeCommentaire}/>
                                    <span>Commentaire</span>
                                </div>
                        </div>
                        </div>

                        {selectedExamenRadiologie.id===0?
                            <button type="submit"className="btn4 float-start">Create</button>
                            :null}

                        {selectedExamenRadiologie.id!==0?
                            <button type="submit" className="btn4 float-start">Update</button>
                            :null}
                    </form>

                    </div>
                    </div> 
                </div> 
                <FormRad selectedExamenRad={selectedRdio} modalTitle={"Ajouter un Radio"} refreshList={()=>this.GetRdio()}/>
                </> 
        )
    }
}