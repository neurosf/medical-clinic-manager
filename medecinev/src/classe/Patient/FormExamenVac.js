import React,{Component} from 'react';
import { variables } from '../../Variables';
import { NavLink } from 'react-router-dom';

import { Formex_vacc } from '../Medicale/Formex_vacc';
import { FormRappel } from './FormRappel';

export class FormExamenVac  extends Component{

    constructor(props){
        super(props);
        this.state={
            ExamenVac:[],
            ExamenVacWithoutFilter:[],
            ShowSelectExamenVac:false,
            FilterExamenVac:this.props.FilterExamenVac,
            FilterType:this.props.FilterTypeExamenVac,
            /// vologie
            selectedEx_Vac:{
                id:0,
                NomX:"",
                NbreRappel:"",
                type:""
            },
        }
    }
////////////////////////////filter
    FilterFn(){
        var FilterExamenVac=this.state.FilterExamenVac;
        var FilterType=this.state.FilterType;

        var filteredData=this.state.ExamenVacWithoutFilter.filter(
            function(el){
                return el.NomX.toString().toLowerCase().includes(
                    FilterExamenVac.toString().trim().toLowerCase()
                )&&el.type.toString().toLowerCase().includes(
                    FilterType.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({ExamenVac:filteredData});
    }
//////////////////////set state ExamenVac
    handleChangeDate_deb = (e) => {
    let X = this.props.selectedExamenVac;
    X.Date_deb = e.target.value;
    this.setState({ selectedExamenVac: X });
    };
    handleChangeoccurance= (e) => {
    let X = this.props.selectedExamenVac;
    if(/[0-9]/.test(e.target.value)||e.target.value==='')X.occurance = e.target.value;
    this.setState({ selectedExamenVac: X });
    };
    handleChangetype =(e)=>{
        this.state.ShowSelectExamenVac = true;
        this.state.FilterType=e.target.value;
        this.FilterFn()
        this.setState({});
    };
    handleChangeExVac=(e)=>{
        let X= this.props.selectedExamenVac;
        X.id_x= parseInt(e.target.getAttribute('Key-v'));
        this.setState({selectedExamenVac:X,FilterExamenVac : e.target.value});
    }
    handleChangeFilterExamenVac= (e) => {
        this.state.ShowSelectExamenVac = true;
        this.state.FilterExamenVac=e.target.value;
        this.FilterFn()
        this.setState({});
    };
/////////////////////////Actions in API
    Submit=(e)=>{
        e.preventDefault(); 
        if(this.props.selectedExamenVac.id_x!==0){
            if(this.props.selectedExamenVac.id===0){
            this.createClick()
            }
            else{
                this.updateClick()
            }
        }else{
            alert("Sélectionner un Examen / Vaccin")
        }
    }
    createClick(){
        delete this.props.selectedExamenVac.id;
        fetch(variables.API_URL+'ExamenRegulier_vaccin',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedExamenVac)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('ExamenVacForm');
            this.CreateRappel(result.ID);
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'ExamenRegulier_vaccin',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedExamenVac)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('ExamenVacForm');
            this.CreateRappel(this.props.selectedExamenVac.id);
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'ExamenRegulier_vaccin/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    CreateRappel(Id_EXR){
        fetch(variables.API_URL+'Rappel/'+Id_EXR,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.Rappel)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('ExamenVacForm');
            this.props.refreshList()
        },(error)=>{
            alert('Failed');
        })       
    }
///////////////////////pompe data actions
    addClick(){
        this.setState({
            selectedEx_Vac:{
                id:0,
                NomX:"",
                NbreRappel:"",
                type:""
            }
        });
    }
//////////////////////////get data from API
    GetExamenVac(){
        this.setState({});
        fetch(variables.API_URL+'Ex_Vacc')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ExamenVac:data,ExamenVacWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.GetExamenVac();
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }
    handleDocumentClick = (e) => {
        if ((!e.target.id==="selectExamenVac" || !e.target.classList.contains('Openselect'))) {
            this.state.ShowSelectExamenVac = false;
            this.setState({});
        }
    };
//////////// sous Examen
    AddRappel=(Med)=>{
        this.props.Rappel.push(Med)
        this.setState({})
    }
    deletRappel=(i)=>{
        this.props.Rappel.splice(i,1);
        this.setState({})
    }
//////////////////////////////////////////
    cahngeShowSelectExamenVac=()=>{
        this.state.ShowSelectExamenVac=!this.state.ShowSelectExamenVac;
        this.setState({})
    }
    componentDidUpdate(prevProps) {
        if (this.props.FilterExamenVac !== prevProps.FilterExamenVac||this.props.FilterType !== prevProps.FilterType) {
            this.state.FilterExamenVac = this.props.FilterExamenVac;
            this.state.FilterType = this.props.FilterType;
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
            selectedExamenVac,
            modalTitle,
            Rappel
        }=this.props;
        const {
            ExamenVac,
            ShowSelectExamenVac,
            FilterExamenVac,
            FilterType,
            selectedEx_Vac
        }=this.state;
        return(<>
                <div className="modal fade" id="ExamenVacForm" tabIndex="-1" aria-hidden="true">
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
                         {selectedExamenVac.id!==0?
                         <button type="button" className="btn4 p-1
                          mr-1" onClick={()=>this.deleteClick(selectedExamenVac.id)}>
                            <i className="bi-trash"></i>
                         </button>:null}
                        </div>
                        <div>
                            <select className="form-control mb-3 w-50 Openselect" value={FilterType} onChange={this.handleChangetype} required>
                                <option value=""></option>
                                <option value="vaccin">Vaccine</option>
                                <option value="examen">Examen regulier</option>
                            </select>
                            <span>type</span>
                        </div>
                            <div className='d-flex'>
                                <span className='m-2 h6'>Examen / Vaccine</span>
                                <div className='d-block'>
                                    <input type="text" className="form-control Openselect"value={FilterExamenVac} onChange={this.handleChangeFilterExamenVac}/>
                                    {ShowSelectExamenVac?
                                    <div id="selectExamenVac">
                                        {ExamenVac.map(P=>(<>
                                            <button type='button' className='btn p-1 Openselect' value={P.NomX} Key-v={P.id} onClick={this.handleChangeExVac}>{P.NomX}</button>
                                        </>))}
                                        {ExamenVac.length===0?<>no options</>:null}
                                    </div>:null}
                                </div>
                                <button type='button' className='btn bnt-light Openselect' onClick={()=>this.cahngeShowSelectExamenVac()}>
                                    {!ShowSelectExamenVac?<i class="bi bi-caret-down-fill Openselect"></i>:<i class="bi bi-caret-up-fill Openselect"></i>}
                                </button>
                                <button type="button" className="btn4 p-1 float-end m-1" 
                                    data-bs-toggle="modal"data-bs-target="#ExamenRForm" onClick={()=>this.addClick()}>
                                        Examen/Vaccine
                                </button>
                            </div>
                            <div className='d-flex'>
                                <div className="p-1 mb-3">
                                    <input type="date"value={selectedExamenVac.Date_deb} onChange={this.handleChangeDate_deb}/>
                                    <span>Date Debut</span>
                                </div>
                            </div>
                            {selectedExamenVac.id!==0?<>
                                <div className='d-flex'>
                                <div className="p-1 mb-3">
                                    <input type="number"value={selectedExamenVac.occurance} onChange={this.handleChangeoccurance}/>
                                    <span>occurance</span>
                                </div>
                            </div>
                            </>:null}
                            <h4>Les Rappel</h4>
                            <button className='btn6 m-1' type='button'data-bs-toggle="modal"data-bs-target="#RappelForm">
                                    <i class="fa fa-plus "></i>Ajouter un rappel</button>
                            <button className='btn6 m-1' type='button'>
                                    Auto generate Rapples{/* not yet */}
                            </button>
                            <ul className='d-grid'>
                                {Rappel.map((R,i)=>(
                                <il>
                                    <span className='h5'> #{R.Num_Rappel}</span>
                                    <span className='h5'> {R.Date.split('T')[0]+" "+R.Date.split('T')[1].split('Z')[0]}</span>
                                    <button className='btn' type="button" onClick={()=>this.deletRappel(i)} ><i class="fa fa-trash"></i></button>
                                </il>
                                ))}
                            </ul>
                        </div>
                        </div>

                        {selectedExamenVac.id===0?
                            <button type="submit"className="btn4 float-start">Create</button>
                            :null}

                        {selectedExamenVac.id!==0?
                            <button type="submit" className="btn4 float-start">Update</button>
                            :null}
                    </form>

                    </div>
                    </div> 
                </div> 
                <FormRappel AddRappel={this.AddRappel} Nbr_rappel={Rappel.length} GetDate={()=>this.props.GetDate()}/>
                <Formex_vacc selectedExamenR={selectedEx_Vac} modalTitle={"Ajouter un ExamenVaciable"} refreshList={()=>this.GetExamenVac()}/>
                </> 
        )
    }
}