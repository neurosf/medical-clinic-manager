import React,{Component} from 'react';
import { variables } from '../../Variables';
import './contacts.css';
export class Contacts  extends Component{

    constructor(props){
        super(props);
        this.state={
        contact:[],
        modalTitle:"",

        selectedcontact:{
            id:0,
            NomContact:"",
            Ntel:"",
            email:"" 
        },
        PhotoPath:variables.PHOTO_URL,
          contactnumFilter:"",
           contactnomFilter:"",
           contactntelFilter:"",
           contactemailFilter:"",
           contactWithoutFilter:[],
    } 
}
    FilterFn(){
        var contactnumFilter=this.state.contactnumFilter;
        var contactnomFilter=this.state.contactnomFilter;
        var contactntelFilter=this.state.contactntelFilter;
        var contactemailFilter=this.state.contactemailFilter;
        var filteredData=this.state.contactWithoutFilter.filter(
            function(el){
                return el.id.toString().toLowerCase().includes(
                    contactnumFilter.toString().trim().toLowerCase()
                ) && el.NomContact.toString().toLowerCase().includes(
                    contactnomFilter.toString().trim().toLowerCase()
                ) && el.Ntel.toString().toLowerCase().includes(
                    contactntelFilter.toString().trim().toLowerCase()
                )&& el.email.toString().toLowerCase().includes(
                    contactemailFilter.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({contact:filteredData});
    }
    sortResult(prop,asc){
        var sortedData=this.state.contactWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });
    
        this.setState({contact:sortedData});
    }

changecontactcnumFilter = (e)=>{
    this.state.contactnumFilter=e.target.value;
    this.FilterFn();
}
changecontatcNomFilter = (e)=>{
    this.state.contactnomFilter=e.target.value;
    this.FilterFn();
}
changecontatcntlFilter = (e)=>{
    this.state.contactntelFilter=e.target.value;
    this.FilterFn();
}
changecontatemailFilter = (e)=>{
    this.state.contactemailFilter=e.target.value;
    this.FilterFn();
}
refreshList(){
    fetch(variables.API_URL+'Contact')
    .then(response=>response.json())
    .then(data=>{
        this.setState({contact:data,contactWithoutFilter:data});
    });
}
componentDidMount(){
    this.refreshList();
}
//////////////////////set state var
changecontactnom =(e)=>{
    let X= this.state.selectedcontact;
    X.NomContact = e.target.value
    this.setState({selectedcontact:X});
}

changecontactntel =(e)=>{
    let X= this.state.selectedcontact;
    X.Ntel = e.target.value
    this.setState({selectedcontact:X});
}
changecontactemail =(e)=>{
    let X= this.state.selectedcontact;
    X.email = e.target.value
    this.setState({selectedcontact:X});
}
///////////////////////pompe data actions
addClick(){
    this.setState({
        modalTitle:"Ajouter contact",
        selectedcontact:{
            id:0,
            NomContact:"",
            Ntel:"",
            email:""
        },
    });
}
editClick(con){
    this.setState({
        modalTitle:"Modifier info contact",
        selectedcontact:{
            id:con.id,
            NomContact:con.NomContact,
            Ntel:con.Ntel,
            email:con.email
        }
        
    });
}
showMoreInfo(con) {
    this.setState({
      modalTitle: "Informations détaillées du contact",
      selectedcontact:{
        id:con.id,
        NomContact:con.NomContact,
        Ntel:con.Ntel,
        email:con.email
    }
    });
  
  }

/////////////////////////Actions in API
Submit=(e)=>{ 
    e.preventDefault(); 
    if(this.state.selectedcontact.id===0){
        this.createClick()
    }
    else{
        this.updateClick()
    }
}
createClick(){
    delete this.state.selectedcontact.id;
    fetch(variables.API_URL+'Contact',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.state.selectedcontact)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('contactform');
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
updateClick(){
    fetch(variables.API_URL+'Contact',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(this.state.selectedcontact)
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('contactform');
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })
}
deleteClick(id){
    if(window.confirm('Are you sure?')){
    fetch(variables.API_URL+'Contact/'+id,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((result)=>{
        this.CloseModel('contactform');
        this.refreshList();
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
        contact,
        selectedcontact,
        modalTitle,
    }=this.state;
    const {
        log
    }=this.props;
    return(
        <div>
            <br/>
            <div>
                <div className='Contacts'>
                    <br /><br /><br />
                            <button type="button"
                                    className="btn-add-contact btn7"
                                    data-bs-toggle="modal" data-bs-target="#contactform" onClick={() => this.addClick()}>
                                        <i className="fas fa-plus"></i>
                            </button>
                            <div className='FilterIn'>
                            <div className="containtFilter">
                                <input className="inputContact" onChange={this.changecontactcnumFilter} placeholder="Numéro "/>
                                <button type="button" className="btn6 p-1 m-1" onClick={()=>this.sortResult('id',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn6 p-1 m-1" onClick={()=>this.sortResult('id',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>

                            <div className="containtFilter">
                                <input className="inputContact" onChange={this.changecontatcNomFilter} placeholder="Nom"/>
                                <button type="button" className="btn6 p-1 m-1" onClick={()=>this.sortResult('NomContact',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn6 p-1 m-1" onClick={()=>this.sortResult('NomContact',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>

                            <div className="containtFilter">
                                <input className="inputContact" onChange={this.changecontatemailFilter} placeholder="email"/>
                                <button type="button" className="btn6 p-1 m-1" onClick={()=>this.sortResult('email',true)}>
                                    <i className="bi-arrow-down-circle-fill"></i>
                                </button>
                                <button type="button" className="btn6 p-1 m-1" onClick={()=>this.sortResult('email',false)}>
                                    <i className="bi-arrow-up-circle-fill"></i>
                                </button>
                            </div>
                            </div>
                            <div className="gridContainerContacts">
                            {contact.map((contact) => (<>
                                <div class="todaycontainer ">
                                    <div class="inner cardContacts">
                                        <div>
                                            <span class="pricing">
                                                <span>
                                                <small></small>
                                                </span>
                                            </span>
                                            <p class="title">{contact.NomContact}</p>
                                            <div class="cardContacts-price"><span>TelePhone</span> {contact.Ntel}</div>
                                            <div class="cardContacts-price"><span>Email</span> {contact.email}</div>
                                            <hr class="cardContacts-divider"/>
                                        </div>
                                        <div class="cardContacts-footer">
                                            {log===3?<>
                                            <button className="cardContacts-btn" style={{ '--Colorbtn':"#66cf86" }}  data-bs-toggle="modal" data-bs-target="#contactform"  onClick={() => this.editClick(contact)}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="cardContacts-btn" style={{'--Colorbtn':"#b45e5e"}} onClick={() => this.deleteClick(contact.id)}>
                                                <i className="fas fa-trash"></i>
                                            </button></>:null}
                                            <button className="cardContacts-btn" style={{'--Colorbtn':"#4baabc"}}  data-bs-toggle="modal" data-bs-target="#contactform"  onClick={() => this.showMoreInfo(contact)}>
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>))}
                            </div>
                 <form className="modal fade" id="contactform" tabIndex="-1" aria-hidden="true" onSubmit={(e)=>this.Submit(e)}>
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">
                            <div className="p-2 w-75 m-auto bd-highlight">
                            {selectedcontact.id!==0?
                                <div className="mb-3">
                                    <input type="text"value={selectedcontact.id}onChange={null}/>
                                    <span>Numéro</span>
                                </div>:null}
                              {modalTitle === "Informations détaillées du contact"? 
                                <div className="mb-3">
                                    <input type="text"value={selectedcontact.NomContact}onChange={null}/>
                                    <span>Nom contact</span>
                                </div> 
                            :    
                            <div className="mb-3">
                                <input type="text"value={selectedcontact.NomContact}onChange={this.changecontactnom} required/>
                                <span>Nom</span>
                            </div> 
                             }
                                {
                                    modalTitle === "Informations détaillées du contact"?  
                                    <div className="mb-3">
                                        <input type="email"value={selectedcontact.email}onChange={null}/>
                                        <span>Gmail</span>
                                    </div>
                                
                                : <div className="mb-3">
                                    <input type="email"value={selectedcontact.email}onChange={this.changecontactemail} required/>
                                    <span>Gmail</span>
                                </div>
                                
                                }
                                {  modalTitle === "Informations détaillées du contact"? 
                                <div className="mb-3">
                                    <input type="text"value={selectedcontact.Ntel}onChange={null}/>
                                    <span>Ntel</span>
                                </div>
                                
                                :<div className="mb-3">
                                    <input type="text"value={selectedcontact.Ntel}onChange={this.changecontactntel} required/>
                                    <span>Ntel</span>
                                </div>
                                }                                
                            </div>
                            </div>

                            {selectedcontact.id===0?
                                <button type="submit"className="btn4 float-start" >Create</button>
                                :null}

                            {selectedcontact.id !== 0 && modalTitle !== "Informations détaillées du contact" ? (
                            <button type="submit" className="btn4 float-start" >
                                Update
                            </button>
                            ) : null}

                        </div>

                        </div>
                        </div> 
                    </form>
                </div>
            </div> 
        </div>

          
        )
    }
}