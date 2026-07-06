import React,{Component} from 'react';
import { variables } from '../../Variables';
import { Formstock } from './Formstock';
import './Stock.css';
export class Stock  extends Component{

    constructor(props){
        super(props);
            
        this.state={
            Stock:[],
            modalTitle:"",

            selectedStock:{
                id:0,
                Nom_med:"",
                Seuil:"",
                Quantite:"",
                Prixachat:"",
                Prixvente:"",
                Dateperemption:this.props.GetDate().split('T')[0],
                Description:"",
                categorie:"",
                type:"",
                code:""
            },
            ShowInfo:false,
            PhotoPath:variables.PHOTO_URL,

           StockNom_medFilter:"",
           StockseuilFilter:"",
           StockquantiteFilter:"",
           StockprixachatFilter:"",
           StockprixventeFilter:"",
           StockdateFilter:"",
           StockdescriptionFilter:"",
           StockcategorieFilter:"",
           StocktypeFilter:"",
           StockcodeFilter:"",
           Stockidfilter:"",
           StockWithoutFilter:[],
        }
       
    }
////////////////////////////filter
FilterFn(){
    var StockNom_medFilter=this.state.StockNom_medFilter;
    var StockseuilFilter=this.state.StockseuilFilter;
    var StockquantiteFilter=this.state.StockquantiteFilter;
    var StockprixachatFilter=this.state.StockprixachatFilter;
    var StockprixventeFilter=this.state.StockprixventeFilter;
    var StockdateFilter=this.state.StockdateFilter;
    var StockcategorieFilter = this.state.StockcategorieFilter;
    var StocktypeFilter = this.state.StocktypeFilter;
    var Stockidfilter = this.state.Stockidfilter;
    var filteredData=this.state.StockWithoutFilter.filter(
        function(el){
            return el.Nom_med.toString().toLowerCase().includes(
                StockNom_medFilter.toString().trim().toLowerCase()
            ) && el.Seuil.toString().toLowerCase().includes(
                StockseuilFilter.toString().trim().toLowerCase()
            ) && el.Quantite.toString().toLowerCase().includes(
                StockquantiteFilter.toString().trim().toLowerCase()
            )&& el.Prixachat.toString().toLowerCase().includes(
                StockprixachatFilter.toString().trim().toLowerCase()
            )&& el.Prixvente.toString().toLowerCase().includes(
                StockprixventeFilter.toString().trim().toLowerCase()
            ) && el.Dateperemption.toString().toLowerCase().includes(
                StockdateFilter.toString().trim().toLowerCase()
            ) &&el.categorie.toString().toLowerCase().includes(
                StockcategorieFilter.toString().trim().toLowerCase()
            ) && 
            el.type.toString().toLowerCase().includes(
                StocktypeFilter.toString().trim().toLowerCase()
            ) && 
            el.type.toString().toLowerCase().includes(
                Stockidfilter.toString().trim().toLowerCase()
            ) 
        }
    );
    this.setState({Stock:filteredData});
}
sortResult(prop,asc){
    var sortedData=this.state.StockWithoutFilter.sort(function(a,b){
        if(asc){
            return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
        }
        else{
            return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
        }
    });

    this.setState({Stock:sortedData});
}

changeMedicamentNomFilter = (e)=>{
    this.state.StockNom_medFilter=e.target.value;
    this.FilterFn();
}
changeMedicamentseuilFilter = (e)=>{
    this.state.StockseuilFilter=e.target.value;
    this.FilterFn();
}
changeMedicamentquantiteFilter = (e)=>{
    this.state.StockquantiteFilter=e.target.value;
    this.FilterFn();
}
changeMedicamentprixachatFilter = (e)=>{
    this.state.StockprixachatFilter=e.target.value;
    this.FilterFn();
}
changeMedicamentprixventeFilter = (e)=>{
    this.state.StockprixventeFilter=e.target.value;
    this.FilterFn();
}
changeMedicamentdateFilter = (e)=>{
    this.state.StockdateFilter=e.target.value;
    this.FilterFn();
}
changeMedicamentdesFilter = (e)=>{
    this.state.StockdescriptionFilter=e.target.value;
    this.FilterFn();
}
changeMedicamentCategorieFilter = (e)=>{
    this.state.StockcategorieFilter=e.target.value;
    this.FilterFn();
}
changeMedicamenttypeFilter = (e)=>{
    this.state.StocktypeFilter=e.target.value;
    this.FilterFn();
}

changeMedicamentcodeFilter = (e)=>{
    this.state.StockcodeFilter=e.target.value;
    this.FilterFn();
}

changeMedicamentidFilter = (e)=>{
    this.state.Stockidfilter=e.target.value;
    this.FilterFn();
}
refreshList(){
    fetch(variables.API_URL+'Medicamment_Stock')
    .then(response=>response.json())
    .then(data=>{
        this.setState({Stock:data,StockWithoutFilter:data});
    });
}
componentDidMount(){
    this.refreshList();
}
////
ShowInfo=()=>{
    this.setState({ShowInfo:!this.state.ShowInfo});
}

///////////////////////pompe data actions
addClick(){
    this.setState({
        modalTitle:"Ajouter Medicament",
        selectedStock:{
            id:0,
            Nom_med:"",
            Seuil:"",
            Quantite:"",
            Prixachat:"",
            Prixvente:"",
            Dateperemption:this.props.GetDate().split('T')[0],
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
            selectedStock:{
                id:Med.id,
                Nom_med:Med.Nom_med,
                Seuil:Med.Seuil,
                Quantite:Med.Quantite,
                Prixachat:Med.Prixachat,
                Prixvente:Med.Prixvente,
                Dateperemption:Med.Dateperemption,
                Description:Med.Description,
                categorie:Med.categorie,
                type:Med.type,
                code:Med.code
            }
        
    });
}
showMoreInfo(Med) {
    this.setState({
      modalTitle: "Informations détaillées du médicament",
      selectedStock: {
        id: Med.id,
        Nom_med: Med.Nom_med,
        Seuil: Med.Seuil,
        Quantite: Med.Quantite,
        Prixachat: Med.Prixachat,
        Prixvente: Med.Prixvente,
        Dateperemption: Med.Dateperemption,
        Description: Med.Description,
        categorie: Med.categorie,
        type: Med.type,
        code: Med.code
      }
    });
  
  }
  
  
/////////////////////////Actions in API

deleteClick(id){
    if(window.confirm('Are you sure?')){
    fetch(variables.API_URL+'Medicamment_Stock/'+id,{
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
        Stock,
        selectedStock,
        modalTitle,
        ShowInfo
    }=this.state;
    return(
        <div>
            <br/>
            <div>
                <div className='Stock'>
                    <br /><br /><br />
                    <div className='d-flex justify-content-between'>
                        <div class={ShowInfo?"info ShowInfo":"info"}>
                            <button class="btn info__icon" onClick={()=>this.ShowInfo()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"></path></svg>
                            </button>
                            <div class={"info__title"}>se color indique que la quantité un problem de quntite ou de peremption</div>
                        </div>
                        <button type="button" className="button2 m-2 float-end" 
                        data-bs-toggle="modal"data-bs-target="#StockForm" onClick={()=>this.addClick()}>
                            Ajouter Medicament
                        </button>  
                    </div>
                    <div className='FontTable'>
                    <table className="table">
                    <thead>
                    
                    <tr>                        
                        <th className='thsideR'>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeMedicamentidFilter} placeholder="Numéro "/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('id',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('id',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                      
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeMedicamentNomFilter} placeholder="Nom"/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom_med',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Nom_med',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeMedicamentseuilFilter} placeholder="Seuil"/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Seuil',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Seuil',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeMedicamentquantiteFilter} placeholder="Quantité"/>
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Quantite',true)}>
                                        <i className="bi-arrow-down-circle-fill"></i>
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Quantite',false)}>
                                        <i className="bi-arrow-up-circle-fill"></i>
                                    </button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeMedicamentdateFilter} placeholder="Date peremption"/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Dateperemption',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Dateperemption',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeMedicamentprixachatFilter} placeholder="Prix achat"/>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Prixachat',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('Prixachat',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                        </th>
                        <th className='thsideL'></th>
                    </tr>
                    
                    </thead>
                   
                    <tbody>
                        {Stock.map(Med => (
                            <tr className={Med.Seuil>=Med.Quantite||Med.Dateperemption<=this.props.GetDate()?'Stock-Alert':''} key={Med.id}>
                                <td className='lineTd'>{Med.id}</td>
                                <td>{Med.Nom_med}</td>
                                <td>{Med.Seuil}</td>
                                <td>{Med.Quantite}</td>
                                <td>{Med.Dateperemption}</td>
                                <td>{Med.Prixachat}</td>
                                <td className='endTd'>
                                    <div className="dropdown">
                                    <button
                                        className="btn btn-light dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <div
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="dropdownMenuButton">
                                        <button
                                        className="dropdown-item" data-bs-toggle="modal"data-bs-target="#StockForm"
                                        onClick={()=>this.editClick(Med)}
                                        >
                                        <i className="bi bi-pencil-square"></i> Modifier
                                        </button>
                                        <button
                                        className="dropdown-item"
                                        onClick={() => this.deleteClick(Med.id)}
                                        >
                                        <i className="bi bi-trash"></i> Supprimer
                                        </button>
                                        <button
                                        className="dropdown-item" data-bs-toggle="modal"data-bs-target="#StockForm"
                                        onClick={() => this.showMoreInfo(Med)}
                                        >
                                        <i className="bi bi-info-circle"></i> Voir plus
                                        </button>
                                    </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>   
                 </table>
                 </div>
                 <Formstock selectedStock={selectedStock} modalTitle={modalTitle} refreshList={()=>this.refreshList()} GetDate={()=>this.props.GetDate()}/>

                </div>
            </div> 
        </div>

          
        )
    }
}