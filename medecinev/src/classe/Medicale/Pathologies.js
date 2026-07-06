import React,{Component} from 'react';
import { variables } from '../../Variables';
import { MenuMedicale } from './MenuMedicale';
import { FormPathologies } from './FormPathologie';

export class Pathologies  extends Component{

    constructor(props){
        super(props);

        this.state={
            Pathologies:[],
            modalTitle:"",

            selectedPathologies:{
                id:0,
                Nom_path:"",
            },

            PhotoPath:variables.PHOTO_URL,

            PathologiesNomFilter:"",
            PathologiesWithoutFilter:[],
        }
    }
////////////////////////////filter
    FilterFn(){
        var PathologiesNomFilter=this.state.PathologiesNomFilter;

        var filteredData=this.state.PathologiesWithoutFilter.filter(
            function(el){
                return el.Nom_path.toString().toLowerCase().includes(
                    PathologiesNomFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({Pathologies:filteredData});
    }

    sortResult(prop,asc){
        var sortedData=this.state.PathologiesWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({Pathologies:sortedData});
    }
    changePathologiesNomFilter = (e)=>{
        this.state.PathologiesNomFilter=e.target.value;
        this.FilterFn();
    }
//////////////////////////get data from API
    refreshList(){
        fetch(variables.API_URL+'Pathologie')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Pathologies:data,PathologiesWithoutFilter:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

///////////////////////pompe data actions
    addClick(){
        this.setState({
            modalTitle:"Ajouter Pathologie",
            selectedPathologies:{
                id:0,
                Nom_path:"",
            }
        });
    }
    editClick(Med){
        this.setState({
            modalTitle:"Modifier Pathologie",
            selectedPathologies:{
                id:Med.id,
                Nom_path:Med.Nom_path,
            }
        });
    }
/////////////////////////Actions in API
   
    deleteClick(id){
        if(window.confirm('Confirmez la suppression ?')){
        fetch(variables.API_URL+'Pathologie/'+id,{
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
            Pathologies,
            selectedPathologies,
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
                        data-bs-toggle="modal"data-bs-target="#PathologiesForm" onClick={()=>this.addClick()}>
                            Add Pathologies
                        </button>
                    </div>
                    <div className='FontTable'>
                    <table className="table">
                    <thead>
                    <tr>
                        <th className='lineTd thsideR' ><span> Numéro Pathologie</span></th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changePathologiesNomFilter} placeholder="Nom Pathologie"/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom_path',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom_path',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                        <th className='endTd thsideL'></th>
                    </tr>
                    </thead>
                    <tbody>
                        {Pathologies.map(path=>
                            <tr key={path.id}>
                                <td className='lineTd'>{path.id}</td>
                                <td>{path.Nom_path}</td>
                                <td className='endTd'>
                                <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal" data-bs-target="#PathologiesForm" onClick={()=>this.editClick(path)}>
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
                    <FormPathologies idpath={"PathologiesForm"} selectedPathologies={selectedPathologies} modalTitle={modalTitle} refreshList={()=>this.refreshList()}/>
                </div>
            </div>
        </div>
        )
    }
}