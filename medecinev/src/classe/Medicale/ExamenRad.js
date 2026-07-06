import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuMedicale } from './MenuMedicale';
import{FormRad}  from './FormExamenRad';

export class ExamenRad  extends Component{

    constructor(props){
        super(props);

        this.state={
            ExamenRad:[],
            modalTitle:"",

            selectedExamenRad:{
                id:0,
                Nom:"",
            },

            PhotoPath:variables.PHOTO_URL,

            ExamenRadNomFilter:"",
            ExamenRadWithoutFilter:[],
        }
    }
////////////////////////////filter
    FilterFn(){
        var ExamenRadNomFilter=this.state.ExamenRadNomFilter;
        var filteredData=this.state.ExamenRadWithoutFilter.filter(
            function(el){
                return el.Nom.toString().toLowerCase().includes(
                    ExamenRadNomFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({ExamenRad:filteredData});
    }

    sortResult(prop,asc){
        var sortedData=this.state.ExamenRadWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({ExamenRad:sortedData});
    }
    changeExamenRadNomFilter = (e)=>{
        this.state.ExamenRadNomFilter=e.target.value;
        this.FilterFn();
    }
//////////////////////////get data from API
    refreshList(){
        fetch(variables.API_URL+'exradialogique')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ExamenRad:data,ExamenRadWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }


///////////////////////pompe data actions
    addClick(){
        this.setState({
            modalTitle:"Ajouter Examen radiologie",
            selectedExamenRad:{
                id:0,
                Nom:"",
            }
        });
    }
    editClick(Med){
        this.setState({
            modalTitle:"Modifier Examen radiologie",
            selectedExamenRad:{
                id:Med.id,
                Nom:Med.Nom,
            }
        });
    }
/////////////////////////Actions in API

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'exradialogique/'+id,{
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
            ExamenRad,
            selectedExamenRad,
            modalTitle,
            ExamenRadNom,
            ExamenRadPreNom,
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
                        data-bs-toggle="modal"data-bs-target="#ExamenRadForm" onClick={()=>this.addClick()}>
                            Add Examen radiologie
                        </button>
                    </div>
                    <div className='FontTable'>
                    <table className="table">
                    <thead>
                    <tr>
                        <th className='thsideR'>
                           <span className='lineTd'> Numéro</span>
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeExamenRadNomFilter} placeholder="Nom"/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('NomX',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('NomX',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                        <th className='thsideL'></th>
                    </tr>
                    </thead>
                    <tbody>
                        {ExamenRad.map(Med=>
                            <tr key={Med.id}>
                                <td className='lineTd'>{Med.id}</td>
                                <td>{Med.Nom}</td>
                                <td  className='endTd'>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#ExamenRadForm" onClick={()=>this.editClick(Med)}>
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
                    <FormRad selectedExamenRad={selectedExamenRad} modalTitle={modalTitle} refreshList={()=>this.refreshList()}/>

                </div>
            </div>p
        </div>
        )
    }
}