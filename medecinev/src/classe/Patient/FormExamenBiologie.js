import React,{Component} from 'react';
import { variables } from '../../Variables';
import { NavLink } from 'react-router-dom';

export class FormExamenBiologie  extends Component{

    constructor(props){
        super(props);
        this.state={
            ShowResult:false
        }
    }
//////////////////////set state var
    handleChangeImportance = (e) => {
    let X = this.props.selectedexamenBiologie;
    X.Importance= e.target.value;
    this.setState({ selectedexamenBiologie: X });
    };
    handleChangedate = (e) => {
    let X = this.props.selectedexamenBiologie;
    X.date = e.target.value;
    this.setState({ selectedexamenBiologie: X });
    };
    handleChangeCommentaire =(e)=>{
    let X= this.props.selectedexamenBiologie;
    X.Commentaire= e.target.value
    this.setState({selectedexamenBiologie:X});
    };
    handleChangetitre =(e)=>{
    let X= this.props.selectedexamenBiologie;
    X.titre= e.target.value
    this.setState({selectedexamenBiologie:X});
    };
    handleChangeresultat =(e)=>{
    let X= this.props.selectedexamenBiologie;
    X.resultat= e.target.checked
    this.setState({selectedexamenBiologie:X,ShowResult:e.target.checked});
    };
    handleChangedateres =(e)=>{
    let X= this.props.selectedexamenBiologie;
    X.dateres= e.target.value
    this.setState({selectedexamenBiologie:X});
    };
/////////////////////////Actions in API
    Submit=(e)=>{ 
        e.preventDefault(); 
        if(this.props.selectedexamenBiologie.id===0){
        this.createClick()
        }
        else{
            this.updateClick()
        }
    }
    createClick(){
        delete this.props.selectedexamenBiologie.id;
        fetch(variables.API_URL+'exbiologique',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedexamenBiologie)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('examenBiologieForm');
            this.props.refreshList()
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'exbiologique',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.props.selectedexamenBiologie)
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('examenBiologieForm');
            this.props.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'exbiologique/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.CloseModel('examenBiologieForm');
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

    componentDidUpdate(prevProps) {
        if (this.props.selectedexamenBiologie!==prevProps.selectedexamenBiologie) {
            this.setState({ShowResult:this.props.selectedexamenBiologie.resultat});
        }
    }
    render(){
        const {
            selectedexamenBiologie,
            modalTitle,
        }=this.props;
        const {
            ShowResult
        } = this.state;
        return(<>
                <div className="modal fade" id="examenBiologieForm" tabIndex="-1" aria-hidden="true">
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
                         {selectedexamenBiologie.id!==0?
                         <button type="button" className="btn4 p-1 mr-1" onClick={()=>this.deleteClick(selectedexamenBiologie.id)}>
                            <i className="bi-trash"></i>
                         </button>:null}
                        </div>
                         <div className='w-75'>
                            <div className="p-1 mb-3">
                                <input type="date"value={selectedexamenBiologie.date} onChange={this.handleChangedate} required/>
                                <span>Date</span>
                            </div>
                         </div>
                         <div className='w-50'>
                                <div className="p-1 mb-3">
                                    <input type="text"value={selectedexamenBiologie.titre}onChange={this.handleChangetitre} required/>
                                    <span>titre</span>
                                </div>
                            </div>
                            <div>
                                <select className="form-control mb-3 w-50"  value={selectedexamenBiologie.Importance} onChange={this.handleChangeImportance} required>
                                    <option value=""></option>
                                    <option value="Basse">Basse</option>
                                    <option value="Normale">Normale</option>
                                    <option value="Haute">Haute</option>
                                </select>
                                <span>Importance</span>
                            </div>
                            <div className='d-flex'>
                                <input type='checkbox' className="m-2" checked={ShowResult} onChange={this.handleChangeresultat}/>
                                <label>Résultat</label>
                            </div>
                            {ShowResult?<>
                            <div className="w-75 p-1 mb-3">
                                <input type="date" value={selectedexamenBiologie.dateres} onChange={this.handleChangedateres} required/>
                                <span>Date Résultat</span>
                            </div>
                                <div className="p-1 mb-3">
                                    <input type="text"value={selectedexamenBiologie.Commentaire}onChange={this.handleChangeCommentaire} required/>
                                    <span>Commentaire</span>
                                </div>
                            </>:null}
                        </div>
                        </div>

                        {selectedexamenBiologie.id===0?
                            <button type="submit"className="btn4 float-start">Create</button>
                            :null}

                        {selectedexamenBiologie.id!==0?
                            <button type="submit" className="btn4 float-start">Update</button>
                            :null}
                    </form>

                    </div>
                    </div> 
                </div> 
                </> 
        )
    }
}