import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuMedicale } from './MenuMedicale';
import{FormVar} from './FormVar';
export class VariablesPhy  extends Component{

    constructor(props){
        super(props);

        this.state={
            VariablesPhy:[],
            modalTitle:"",

            selectedVariablesPhy:{
                id:0,
                Nom_v:"",
            },

            PhotoPath:variables.PHOTO_URL,

            VariablesPhyNomFilter:"",
            VariablesPhyWithoutFilter:[],
        }
    }
////////////////////////////filter
    FilterFn(){
        var VariablesPhyNomFilter=this.state.VariablesPhyNomFilter;

        var filteredData=this.state.VariablesPhyWithoutFilter.filter(
            function(el){
                return el.Nom_v.toString().toLowerCase().includes(
                    VariablesPhyNomFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({VariablesPhy:filteredData});
    }

    sortResult(prop,asc){
        var sortedData=this.state.VariablesPhyWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({VariablesPhy:sortedData});
    }
    changeVariablesPhyNomFilter = (e)=>{
        this.state.VariablesPhyNomFilter=e.target.value;
        this.FilterFn();
    }
//////////////////////////get data from API
    refreshList(){
        fetch(variables.API_URL+'Variable')
        .then(response=>response.json())
        .then(data=>{
            this.setState({VariablesPhy:data,VariablesPhyWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

///////////////////////pompe data actions
    addClick(){
        this.setState({
            modalTitle:"Ajouter Variables physiologique",
            selectedVariablesPhy:{
                id:0,
                Nom_v:"",
            }
        });
    }
    editClick(Med){
        this.setState({
            modalTitle:"Modifier Variables physiologique",
            selectedVariablesPhy:{
                id:Med.id,
                Nom_v:Med.Nom_v,
            }
        });
    }
/////////////////////////Actions in API
   
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Variable/'+id,{
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
            VariablesPhy,
            selectedVariablesPhy,
            modalTitle,
        }=this.state;
        return(
            <div>
                <br/>
                <div>
                <MenuMedicale CloseMenuSide={this.props.CloseMenuSide} MenuSideOpen={this.props.MenuSideOpen}/>
                <div className='Medicale'>
                    <br /><br /><br />
                    <div  className='Medicalefunc'>
                        <button type="button" className="btn button2 m-2 float-end" 
                        data-bs-toggle="modal"data-bs-target="#VariablesPhyForm" onClick={()=>this.addClick()}>
                            Add Variables Physiologique
                        </button>
                    </div>
                    <div className='FontTable'>
                    <table className="table">
                    <thead>
                    <tr>
                        <th className='thsideR'>
                           <span>Numéro</span>
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeVariablesPhyNomFilter} placeholder="Nom"/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom_v',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom_v',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                        <th  className='thsideL'></th>
                    </tr>
                    </thead>
                    <tbody>
                        {VariablesPhy.map(path=>
                            <tr key={path.id}>
                                <td className='lineTd'>{path.id}</td>
                                <td>{path.Nom_v}</td>
                                <td className='endTd'>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#VariablesPhyForm" onClick={()=>this.editClick(path)}>
                                    <i className="bi-pencil-square"></i>
                                </button>
                                <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(path.id)}>
                                    <i className="bi-trash"></i>
                                </button>

                                </td>
                            </tr>
                            )}
                    </tbody>
                    </table>
                    </div>
                    <FormVar selectedVariablesPhy={selectedVariablesPhy} modalTitle={modalTitle} refreshList={()=>this.refreshList()}/>

                </div>
            </div>
        </div>
        )
    }
}