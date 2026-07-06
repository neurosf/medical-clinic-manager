import React,{Component} from 'react';
import { variables } from '../../Variables';


export class Formstock  extends Component{

    constructor(props){
        super(props);
    }
//////////////////////set state var
changeMedicamentNom =(e)=>{
    let X= this.props.selectedStock;
    X.Nom_med = e.target.value
    this.setState({selectedStock:X});
}
changeMedicamentSeuil =(e)=>{
    let X= this.props.selectedStock;
    X.Seuil = e.target.value
    this.setState({selectedStock:X});
}
changeMedicamentQuanitite =(e)=>{
    let X= this.props.selectedStock;
    X.Quantite = e.target.value
    this.setState({selectedStock:X});
}
changeMedicamentPrixachat =(e)=>{
    let X= this.props.selectedStock;
    X.Prixachat = e.target.value
    this.setState({selectedStock:X});
}
changeMedicamentPrixvente =(e)=>{
    let X= this.props.selectedStock;
    X.Prixvente = e.target.value
    this.setState({selectedStock:X});
}
changeMedicamentdate =(e)=>{
    let X= this.props.selectedStock;
    X.Dateperemption = e.target.value
    this.setState({selectedStock:X});
}
changeMedicamentDescription =(e)=>{
    let X= this.props.selectedStock;
    X.Description = e.target.value
    this.setState({selectedStock:X});
}
changeMedicamentcategorie =(e)=>{
    let X= this.props.selectedStock;
    X.categorie = e.target.value
    this.setState({selectedStock:X});
}
changeMedicamenttype =(e)=>{
    let X= this.props.selectedStock;
    X.type = e.target.value
    this.setState({selectedStock:X});
}
changeMedicamentcode =(e)=>{
    let X= this.props.selectedStock;
    X.code = e.target.value
    this.setState({selectedStock:X});
}
/////////////////////////Actions in API
    SubmitStock=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedStock.id===0){
        this.createClick()
        }
        else{
            this.updateClick()
        }
    }
    /////////////////////////Actions in API
createClick(){
    fetch(variables.API_URL+'Medicamment_Stock',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedStock)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('StockForm');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
updateClick(){
    fetch(variables.API_URL+'Medicamment_Stock',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.props.selectedStock)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('StockForm');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
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
        this.CloseModel('StockForm');
        this.props.refreshList();
    },(error)=>{
        alert('Failed');
    })
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
            selectedStock,
            modalTitle,
        }=this.props;
        return(
        <div>
            <form div className="modal fade" id="StockForm" tabIndex="-1" aria-hidden="true" onSubmit={(e)=>this.SubmitStock(e)}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                ></button>
            </div>

            <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-100 bd-highlight">
                {selectedStock.id!==0?
                    <div className="w-50 mb-3">
                        <input type="text" value={selectedStock.id}onChange={null}/>
                        <span>Numéro</span>
                    </div>:null}
                    <div className='d-flex'>
                  {modalTitle === "Informations détaillées du médicament"?
                    <div className="mb-3">
                        <input type="text" value={selectedStock.Nom_med}onChange={null}/>
                        <span>Nom</span>
                    </div> 
                    :
                    <div className="mb-3">
                        <input type="text" value={selectedStock.Nom_med}onChange={this.changeMedicamentNom} required/>
                        <span>Nom</span>
                    </div> 
                    }
                    { modalTitle === "Informations détaillées du médicament"?
                    <div className="mb-3">
                        <input type="text" value={selectedStock.code}onChange={null}/>
                        <span>Code</span>
                    </div>
                             :
                    <div className="mb-3">
                        <input type="text" value={selectedStock.code}onChange={this.changeMedicamentcode} required/>
                        <span>Code</span>
                    </div>
                    }
                    </div>
                    <div className='d-flex'>
                    {
                        modalTitle === "Informations détaillées du médicament"?  
                        <div className="mb-3">
                        <input type="number" value={selectedStock.Seuil}onChange={null}/>
                        <span>Seuil</span>
                    </div>
                    
                    : <div className="mb-3">
                    <input type="number" value={selectedStock.Seuil}onChange={this.changeMedicamentSeuil} required/>
                    <span>Seuil</span>
                </div>
                    
                    }
                    {  modalTitle === "Informations détaillées du médicament"? 
                    <div className="mb-3">
                        <input className={selectedStock.Seuil>=selectedStock.Quantite?'Stock-indec':''} type="number" value={selectedStock.Quantite}onChange={null}/>
                        <span>Quantité</span>
                    </div>
                    
                    :<div className="mb-3">
                        <input className={selectedStock.Seuil>=selectedStock.Quantite?'Stock-indec':''} type="number" value={selectedStock.Quantite}onChange={this.changeMedicamentQuanitite} required/>
                        <span>Quantité</span>
                    </div>
                    }
                </div>
                <div className='d-flex'>
            {  modalTitle === "Informations détaillées du médicament"? 

                    <div className="mb-3">
                        <input type="number" value={selectedStock.Prixachat}onChange={null}/>
                        <span>Prix d'achat</span>
                    </div>
                        :<div className="mb-3">
                        <input type="number" value={selectedStock.Prixachat}onChange={this.changeMedicamentPrixachat} required/>
                        <span>Prix d'achat</span>
                    </div>
                    }
                    {  modalTitle === "Informations détaillées du médicament"? 

                    <div className="mb-3">
                        <input type="number" value={selectedStock.Prixvente}onChange={null}/>
                        <span>Prix de vente</span>
                    </div>
                    :
                    <div className="mb-3">
                        <input type="number" value={selectedStock.Prixvente}onChange={this.changeMedicamentPrixvente} required/>
                        <span>Prix de vente</span>
                    </div>
                    }</div>
                     {  modalTitle === "Informations détaillées du médicament"?
                    <div className="w-75 mb-3">
                          <input className={selectedStock.Dateperemption<=this.props.GetDate()?'Stock-indec':''} type="date"  value={selectedStock.Dateperemption} onChange={null} />
                          <span>Date péremption</span>
                              </div>
                        :
                        <div className="w-75 mb-3">
                          <input className={selectedStock.Dateperemption<=this.props.GetDate()?'Stock-indec':''} type="date"  value={selectedStock.Dateperemption} onChange={this.changeMedicamentdate} required />
                          <span>Date péremption</span>
                              </div>
                            } 
                    <div className='d-flex'>                             
                    { modalTitle === "Informations détaillées du médicament"?
                    <div className="mb-3">
                        <input type="text" value={selectedStock.categorie}onChange={null}/>
                        <span>categorie</span>
                    </div>
                    :<div className="mb-3">
                    <input type="text" value={selectedStock.categorie}onChange={this.changeMedicamentcategorie}/>
                    <span>categorie</span>
                </div>
                    }
                    { modalTitle === "Informations détaillées du médicament"?
                    <div className="mb-3">
                        <input type="text" value={selectedStock.type}onChange={null}/>
                        <span>Type</span>
                    </div>
                            :
                            <div className="mb-3">
                        <input type="text" value={selectedStock.type}onChange={this.changeMedicamenttype}/>
                        <span>Type</span>
                    </div> 
                            }</div> 
                    { modalTitle === "Informations détaillées du médicament"?
                    <div className="mb-3">
                        <input value={selectedStock.Description}onChange={null}/>
                        <span>Description</span>
                    </div>
                    :<div className="mb-3">
                    <input value={selectedStock.Description}onChange={this.changeMedicamentDescription}/>
                    <span>Description</span>
                </div>
                        }
                </div>
                </div>

                {selectedStock.id===0?
                    <button type="submit"className="btn4 float-start">Create</button>
                    :null}
                {selectedStock.id !== 0 && modalTitle !== "Informations détaillées du médicament" ? (
                <button type="submit" className="btn4 float-start" >
                Update
                </button>
            ) : null}

            </div>

            </div>
            </div> 
        </form>
                </div>

        )
    }
}