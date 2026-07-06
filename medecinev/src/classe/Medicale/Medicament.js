import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuMedicale } from './MenuMedicale';
import { FormMedicament } from './FormMedicament';

export class Medicament  extends Component{

    constructor(props){
        super(props);

        this.state={
            Medicament:[],
            modalTitle:"",

            selectedMedicament:{
                id:0,
                Nom:"",
                Description:"",
                categorie:"",
                type:"",
                code:""
            },

            PhotoPath:variables.PHOTO_URL,
            MedicamenttypeFilter:"",
            MedicamentNomFilter:"",
            MedicamentCategorieFilter:"",
            MedicamentCodeFilter:"",
            MedicamentWithoutFilter:[],
        }
    }
////////////////////////////filter
    FilterFn(){
        var MedicamentNomFilter=this.state.MedicamentNomFilter;
        var MedicamentCategorieFilter = this.state.MedicamentCategorieFilter;
        var MedicamenttypeFilter = this.state.MedicamenttypeFilter;
        var MedicamentCodeFilter = this.state.MedicamentCodeFilter;

        var filteredData=this.state.MedicamentWithoutFilter.filter(
            function(el){
                return el.Nom.toString().toLowerCase().includes(
                    MedicamentNomFilter.toString().trim().toLowerCase()
                )&&
                el.categorie.toString().toLowerCase().includes(
                    MedicamentCategorieFilter.toString().trim().toLowerCase()
                ) && 
                el.type.toString().toLowerCase().includes(
                    MedicamenttypeFilter.toString().trim().toLowerCase()
                ) && 
                el.type.toString().toLowerCase().includes(
                    MedicamentCodeFilter.toString().trim().toLowerCase()
                ) 
            }
        );
        this.setState({Medicament:filteredData});
    }
    sortResult(prop,asc){
        var sortedData=this.state.MedicamentWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({Medicament:sortedData});
    }
    changeMedicamentNomFilter = (e)=>{
        this.state.MedicamentNomFilter=e.target.value;
        this.FilterFn();
    }
    changeMedicamentCategorieFilter = (e)=>{
        this.state.MedicamentCategorieFilter=e.target.value;
        this.FilterFn();
    }
    changeMedicamenttypeFilter = (e)=>{
        this.state.MedicamenttypeFilter=e.target.value;
        this.FilterFn();
    }
    changeMedicamentCodeFilter = (e)=>{
        this.state.MedicamentCodeFilter=e.target.value;
        this.FilterFn();
    }
//////////////////////////get data from API
    refreshList(){
        fetch(variables.API_URL+'Medicammentgnrl')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Medicament:data,MedicamentWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
///////////////////////pompe data actions
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
    editClick(Med){
        this.setState({
            modalTitle:"Modifier Medicament",
            selectedMedicament:{
                id:Med.id,
                Nom:Med.Nom,
                Description:Med.Description,
                categorie:Med.categorie,
                type:Med.type,
                code:Med.code
            }
        });
    }
/////////////////////////Actions in API
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
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    render(){
        const {
            Medicament,
            selectedMedicament,
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
                        data-bs-toggle="modal"data-bs-target="#MedicamentForm" onClick={()=>this.addClick()}>
                            Add Medicament
                        </button>
                    </div>
                    <div className='FontTable'>
                    <table className="table">
                    <thead>
                    
                    <tr>   
                        <th className='thsideR'><input className="form-control m-2" onChange={this.changeMedicamentCodeFilter} placeholder="Code"/></th>              
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeMedicamentNomFilter} placeholder="Nom"/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeMedicamentCategorieFilter} placeholder="categorie"/>
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('categorie',true)}>
                                        <i className="bi-arrow-down-circle-fill"></i>
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('categorie',false)}>
                                        <i className="bi-arrow-up-circle-fill"></i>
                                    </button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeMedicamenttypeFilter} placeholder="Type"/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('type',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('type',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                       <th><span>Description</span></th>
                        <th className='thsideL'></th>
                    </tr>
                    </thead>
                   
                    <tbody>
                        {Medicament.map(Med=>
                            <tr key={Med.id}>
                                <td className='lineTd'>{Med.code}</td>
                                <td>{Med.Nom}</td>
                                <td>{Med.categorie}</td>
                                <td>{Med.type}</td>
                                <td> {Med.Description}</td>
                                <td className='endTd'>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#MedicamentForm" onClick={()=>this.editClick(Med)}>
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
                <FormMedicament selectedMedicament={selectedMedicament} modalTitle={modalTitle} refreshList={()=>this.refreshList()}/>
                </div>
            </div>
        </div>
        )
    }
}