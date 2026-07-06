import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuMedicale } from './MenuMedicale';
import {Formex_vacc} from './Formex_vacc';
export class ExamenR  extends Component{

    constructor(props){
        super(props);

        this.state={
            ExamenR:[],
            modalTitle:"",

            selectedExamenR:{
                id:0,
                NomX:"",
                NbreRappel:"",
                type:""
            },

            PhotoPath:variables.PHOTO_URL,
            ExamenRNbreRappelFilter:"",
            Examentypefilter:"",
            ExamenRNomFilter:"",
            ExamenRWithoutFilter:[],
        }
    }
////////////////////////////filter
    FilterFn(){
        var ExamenRNomFilter=this.state.ExamenRNomFilter;
        var ExamenRNbreRappelFilter = this.state.ExamenRNbreRappelFilter;
        var Examentypefilter = this.state.Examentypefilter;
        var filteredData=this.state.ExamenRWithoutFilter.filter(
            function(el){
                return( el.NomX.toString().toLowerCase().includes(
                    ExamenRNomFilter.toString().trim().toLowerCase()
                ) && el.type.toString().toLowerCase().includes(
                    Examentypefilter.toString().trim().toLowerCase()
                ) && el.NbreRappel.toString().toLowerCase().includes(
                    ExamenRNbreRappelFilter.toString().trim().toLowerCase()
                )
                )
            } 
        );
        this.setState({ExamenR:filteredData});
    }

    sortResult(prop,asc){
        var sortedData=this.state.ExamenRWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({ExamenR:sortedData});
    }
    changeExamenRNomFilter = (e)=>{
        this.state.ExamenRNomFilter=e.target.value;
        this.FilterFn();
    }
    changeExamentypeFilter = (e)=>{
        this.state.Examentypefilter=e.target.value;
        this.FilterFn();
    }
    changeExamenRNbreRappelFilter = (e)=>{
        this.state.ExamenRNbreRappelFilter=e.target.value;
        this.FilterFn();
    }
//////////////////////////get data from API
    refreshList(){
        fetch(variables.API_URL+'Ex_Vacc')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ExamenR:data,ExamenRWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

///////////////////////pompe data actions
    addClick(){
        this.setState({
            modalTitle:"Ajouter Examen régulier",
            selectedExamenR:{
                id:0,
                NomX:"",
                NbreRappel:"",
                type:""
            }
        });
    }
    editClick(Med){
        this.setState({
            modalTitle:"Modifier Examen régulier",
            selectedExamenR:{
                id:Med.id,
                NomX:Med.NomX,
                NbreRappel:Med.NbreRappel,
                type:Med.type
            }
        });
    }
/////////////////////////Actions in API
   
    deleteClick(id){
        if(window.confirm('Confirmez la suppression!')){
        fetch(variables.API_URL+'Ex_Vacc/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            ExamenR,
            selectedExamenR,
            modalTitle,
        }=this.state;
        return(
            <div>
            <br/>
            <div>
                <MenuMedicale CloseMenuSide={this.props.CloseMenuSide} MenuSideOpen={this.props.MenuSideOpen}/>
                <div className='Medicale'>
                    <br /><br /><br />    
                <div className='Patientsfunc'>
                    <div></div>
                    <button type="button" className="btn button2 m-2 float-end" 
                    data-bs-toggle="modal"data-bs-target="#ExamenRForm" onClick={()=>this.addClick()}>
                        Ajouter  Examen /Vaccin
                    </button>
                </div>
                <div className='FontTable'>
                <table className="table">
                <thead>
                <tr>
                    <th className='thsideR'><span>Numéro</span>
                    </th>
                        <th>
                            <div className="d-flex">
                            <input className="form-control m-2" onChange={this.changeExamenRNomFilter} placeholder="Nom"/>
                            <button type="button" className="btn btn-light" onClick={()=>this.sortResult('NomX',true)}>
                                <i className="bi-arrow-down-circle-fill"></i>
                            </button>
                            <button type="button" className="btn btn-light" onClick={()=>this.sortResult('NomX',false)}>
                                <i className="bi-arrow-up-circle-fill"></i>
                            </button>
                            </div>
                        </th>
                        <th>
                        <div className="d-flex">
                            <input className="form-control m-2" onChange={this.changeExamenRNbreRappelFilter} placeholder="NbreRappel"/>
                            <button type="button" className="btn btn-light" onClick={()=>this.sortResult('NbreRappel',true)}>
                                <i className="bi-arrow-down-circle-fill"></i>
                            </button>
                            <button type="button" className="btn btn-light" onClick={()=>this.sortResult('NbreRappel',false)}>
                                <i className="bi-arrow-up-circle-fill"></i>
                            </button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex">
                            <select className="form-control m-2" onChange={this.changeExamentypeFilter}>
                                <option value="">Type</option>
                                <option value="Vaccin">Vaccin</option>
                                <option value="Examen">Examen</option>
                            </select>
                            <button type="button" className="btn btn-light" onClick={()=>this.sortResult('type',true)}>
                                <i className="bi-arrow-down-circle-fill"></i>
                            </button>
                            <button type="button" className="btn btn-light" onClick={()=>this.sortResult('type',false)}>
                                <i className="bi-arrow-up-circle-fill"></i>
                            </button>
                            </div>
                        </th>
                        <th className='thsideL'></th>
                </tr>
                <tr>
                </tr>
                </thead>
                <tbody>
                    {ExamenR.map(Med=>
                        <tr key={Med.id}>
                            <td className='lineTd'>{Med.id}</td>
                            <td>{Med.NomX}</td>
                            <td>{Med.NbreRappel}</td>
                            <td> {Med.type}  </td>
                            <td className='endTd'>
                            <button type="button" className="btn btn-light mr-1"
                            data-bs-toggle="modal" data-bs-target="#ExamenRForm" onClick={()=>this.editClick(Med)}>
                                <i className="bi-pencil-square"></i>
                            </button>
                            <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(Med.id)}>
                                <i className="bi-trash"></i>
                            </button>
                            </td>
                        </tr>
                        )}
                </tbody>
                </table>
                </div>
                <Formex_vacc selectedExamenR={selectedExamenR} modalTitle={modalTitle} refreshList={()=>this.refreshList()}/>
            </div>
        </div>
    </div>
        )
    }
}