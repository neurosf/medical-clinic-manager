import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import { variables } from '../../Variables';
import { MenuPatient } from '../Patient/MenuPatient';
import { FormConsultation } from './FormConsultation';
import  FormFacture  from './Facture';
import OrdonaceForme from '../Document/OrdonaceForm';
import { FormImage } from './FormImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

export class ConsultationInfo  extends Component{

    constructor(props){
        super(props);

        this.state={
            ///Consultation
            Consultation:[],
            ConsultationmodalTitle:"",
            selectedConsultation:{
                CommentaireC:"",
                DateC:"",
                Diagnostique:{
                    id: 0,
                    Nom_path: ''
                },
                ImportanceC:"",
                Prix:0,
                Prix_paye:0,
                Prix_Totale:0,
                cr_rapideD:"",
                cr_rapideM:"",
                id:3,
                idD:{id: 3, Id_P: {
                    NSS:"",
                    Nom:"",
                    Prenom:"",
                    id:0
                }, DateD: ''},
                motif:{
                    id: 0,
                    Nom_path: ''
                }
            },
            FilterPathMotif:"",
            FilterPathDiagnostique:"",
            ///Traitement
            Traitement:null,
            MedicamentT:[],
            /// Medicament Used
            MedicamentUsed:[],
            PrixTotale:0,
            ///
            isLoading:true,
            PhotoPath:variables.PHOTO_URL,
            mySwiper:{}
        }
    }
//////////////////////////get data from API
    GetCons=()=>{
        const pathname = window.location.pathname; 
        const ID_Cons  = pathname.split('/')[2]
        this.state.isLoading=true;
        this.setState({});
        fetch(variables.API_URL+'Consultation/'+ID_Cons)
        .then(response=>response.json())
        .then(data=>{
            this.state.selectedConsultation=data;
            this.state.selectedConsultation.DateC=data.DateC.split('Z')[0];
            this.setState({
                FilterPathMotif:data.motif.Nom_path,
                FilterPathDiagnostique:data.Diagnostique.Nom_path,
            });
            console.log(data)
            this.GetTraitement(this.state.selectedConsultation.id);
        });
    }
    GetTraitement=(ID_Cons)=>{
        fetch(variables.API_URL+'Traitement/'+ID_Cons)
        .then(response=>response.json())
        .then(data=>{
            if(data.length>0){
                this.setState({Traitement:data[0]})
                this.GetMedicamentT(data[0].id);
            }else{
                this.setState({MedicamentT:[]})
                this.GetMedicamentUsed(this.state.selectedConsultation.id)
            }
        });
    }
    GetMedicamentT=(ID_Traitement)=>{
        fetch(variables.API_URL+'Medicament_TraitementGet/'+ID_Traitement)
        .then(response=>response.json())
        .then(data=>{
            this.state.MedicamentT=[];
            data.map(D=>{this.state.MedicamentT.push({
                description:D.description,
                Id_T:D.Id_T,
                IdMed:D.IdMed.id,
                NomMed:D.IdMed.Nom
            })})
            this.setState({});
            this.GetMedicamentUsed(this.state.selectedConsultation.id)
        });
    }
    GetMedicamentUsed=(ID_Cons)=>{
        fetch(variables.API_URL+'Medicamment_consultationGet/'+ID_Cons)
        .then(response=>response.json())
        .then(data=>{
            this.state.MedicamentUsed=[];
            this.state.PrixTotale=0;
            data.map(D=>{this.state.MedicamentUsed.push({
                Quantite:D.Quantite,
                Prix:D.Prix,
                Idcons:D.Idcons,
                id_m:D.id_m.id,
                NomMed:D.id_m.Nom_med
            })
            this.state.PrixTotale+=D.Quantite*D.Prix
        })
            this.GetImages(this.state.selectedConsultation.id)
        });
    }
    GetImages=(ID_Cons)=>{
        fetch(variables.API_URL+'consultation-images/'+ID_Cons+'/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Images:data,isLoading:false});
        });
    }
    componentDidMount(){
        this.GetCons();
    }
/////////////////////////Actions in API
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Consultation/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            window.history.back();
        },(error)=>{
            alert('Failed');
        })
        }
    }
//////////////////////////////
    deleteClickImage(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'image-consultations/'+id+'/',{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            this.GetCons();
        },(error)=>{
            this.GetCons();
        })
        }
    }
////////////////
openImage = (e) => {
    const printableWindow = window.open('', '_blank');
    const style = printableWindow.document.createElement('style');
    style.innerHTML = `
      body, html {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
      .fullscreen-image {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        z-index: -1;
        transition: transform 0.3s;
      }
      .zoom-in {
        transform: scale(1.2);
      }
      .zoom-out {
        transform: scale(0.8);
      }
    `;
    printableWindow.document.write(style.outerHTML);
    printableWindow.document.write(e.target.outerHTML);
  };
    render(){
        const {
            selectedConsultation,
            FilterPathMotif,
            FilterPathDiagnostique,
            isLoading,
            MedicamentT,
            MedicamentUsed,
            PrixTotale,
            Images
        }=this.state;
        const {
            log
        }=this.props
        return(
            <div>
            <br/>
            <div>
                <MenuPatient P={2} CloseMenuSide={this.props.CloseMenuSide} MenuSideOpen={this.props.MenuSideOpen}/>
                <div className='Patient'>
                    <br /><br /><br />
                <div className='Patientsfunc'>
                    <button type="button" className="button2 float-end btnrefresh" onClick={this.GetCons}>
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                    {log===3?
                    <div>
                        <button type="button" className="button2 m-2 float-end" 
                            data-bs-toggle="modal"data-bs-target="#FactureForm">
                            Facture<i class="fa-solid fa-file-lines"></i>
                        </button>
                        <button type="button" className="button2 m-2 float-end" 
                            data-bs-toggle="modal"data-bs-target="#FormMedOrdonace">
                            Ordonace <i class="fa-solid fa-file-lines"></i>
                        </button>
                        <button type="button" className="button2 m-2 float-end" 
                            data-bs-toggle="modal"data-bs-target="#ConsultationForm">
                            Modifier Consultation <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button type="button" className="button2 m-2 float-end" 
                            onClick={()=>this.deleteClick(selectedConsultation.id)}>
                                Supprimer<i className="bi-trash"></i>
                        </button>
                    </div>:null}
                </div>
                {!isLoading?<>
                        <div className='PatientInfo' id='InfoConsultation'>
                            <div className='d-flex justify-content-between'>
                                <div className='h4 m-2' ><i class="fa-sharp fa-solid fa-file-waveform"></i> Consultation <span>#{selectedConsultation.id}</span></div>
                            </div>
                            <div className='d-flex justify-content-between'>
                            <NavLink className='Consultaion_Patinet' to={"/Patient/"+selectedConsultation.idD.Id_P.id}>
                                    Patient: {selectedConsultation.idD.Id_P.Nom+" "+selectedConsultation.idD.Id_P.Prenom}
                                    <i class="fa-solid fa-hand-pointer fa-rotate-90"></i> 
                                </NavLink>                                <div className='Datecons h5 m-2 p-0'>Date:{selectedConsultation.DateC.split('T')[0]+" "+selectedConsultation.DateC.split('T')[1].split('Z')[0]}</div>
                            </div>
                            <div className='consultationInfo'>
                                <h4 className='text-light text-center'>Information de Consultasion</h4>
                                <div className='ConsInfo'>
                                    <div>
                                        <div className="d-flex p-1 mb-1">
                                            <span className="InfoLable">motif:</span>
                                            <span className="InfoP" >{selectedConsultation.motif.Nom_path}</span>
                                        </div>
                                        <div className="d-flex p-1 mb-1">
                                            <span className="InfoLable">(Cr.rapide):</span>
                                            <span className="InfoP" >{selectedConsultation.cr_rapideM}</span>
                                        </div>
                                    </div>
                                    <div>
                                        {log===3?
                                        <div className='d-flex'>
                                                <span className="InfoLable">Diagnostique:</span>
                                                <span className="InfoP">{selectedConsultation.Diagnostique.Nom_path}</span>
                                        </div>:null}
                                        <div className="d-flex p-1 mb-1">
                                            <span className="InfoLable">(Cr.rapide):</span>
                                            <span className="InfoP" >{selectedConsultation.cr_rapideD}</span>
                                        </div>
                                </div>
                                </div>
                                    <div className="d-flex p-1 mb-1">
                                        <span className="InfoLable">Importance:</span>
                                        <span className="InfoP">{selectedConsultation.ImportanceC}</span>
                                    </div>
                                    <div className="d-flex p-1 mb-1">
                                        <span className="InfoLable">{selectedConsultation.CommentaireC!==""?<>Commentaire</>:null}</span>
                                        <span className="InfoP">{selectedConsultation.CommentaireC}</span>
                                    </div>
                            </div>
                        <div className='m-2'>
                            <h4 id='Traitement'>Traitement</h4>
                            <table className="table w-50">
                                            <thead>
                                                <tr>
                                                    <th>Produit</th>
                                                    <th>description</th>
                                                </tr>
                                            </thead>
                            {MedicamentT.map((M,i)=>(
                                        <tr>
                                            <td className='MedicamentName lineTd'>{M.NomMed}</td>
                                            <td className='Medicamentdisc'>{M.description}</td>
                                        </tr>
                                        ))}</table>
                            <div>
                            {log>=2?<>
                            <h3 id='Paiement'>Paiement</h3>
                            <div className="d-flex p-1 mb-1">
                                <span className="InfoLable">Prix de consultation:</span>
                                <span className="InfoPDr">{selectedConsultation.Prix+" Da"}</span>
                            </div>
                            <h4>Medicament Utilise</h4>
                                        <table className="table w-50">
                                            <thead>
                                                <tr>
                                                    <th>Produit</th>
                                                    <th>Quantite</th>
                                                    <th>Prix unitaire</th>
                                                    <th>Prix</th>
                                                </tr>
                                            </thead>
                            {MedicamentUsed.map((M,i)=>(
                                        <tr>
                                            <td className='MedicamentName lineTd'>{M.NomMed}</td>
                                            <td className='Medicamentdisc'>{"x"+M.Quantite}</td>
                                            <td className='Medicamentdisc'>{M.Prix+" Da"}</td>
                                            <td className='Medicamentdisc'>{(M.Prix*M.Quantite)+" Da"}</td>
                                        </tr>
                                        ))} </table>
                            <div className="d-flex p-1 mb-1">
                                <span className="InfoLable">Prix Totale des Medicament:</span>
                                <span className="InfoPDr">{PrixTotale+" Da"}</span>
                            </div>
                            <div className="d-flex p-1 mb-1">
                                <span className="InfoLable">Prix Totale de Consultasion:</span>
                                <span className="InfoPDr">{(selectedConsultation.Prix_Totale+" Da")}</span>
                            </div>
                            <div className="d-flex p-1 mb-1">
                                <span className="InfoLable">Prix payé:</span>
                                <span className="InfoPDr">{selectedConsultation.Prix_paye+" Da"}</span>
                            </div>
                            <div className="d-flex p-1 mb-1">
                                <span className="InfoLable">Le montant restant à payer:</span>
                                <span className="InfoPDr">{(selectedConsultation.Prix_Totale-selectedConsultation.Prix_paye)+" Da"}</span>
                            </div></>:null}
                        </div>
                        </div>
                        {log===3?
                        <div className='ContainMoreInfo'>
                            <h4 className='TitelInfoP' id='Photos'>
                            <span>Photos</span>
                            <button type="button" className="btn6 float-end" 
                                    data-bs-toggle="modal"data-bs-target="#PhotosForm">
                                        <i class="fas fa-plus    "></i>
                                </button>
                            </h4>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                loop={true}
                                pagination={{
                                clickable: true,
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper"
                            >
                                {Images.map((Img) => (
                                    <SwiperSlide>                                    
                                    <div key={Img.id}>
                                        <div className='d-flex justify-content-between'>
                                            <button type="button" className="btn6 float-end p-1 m-1"
                                                onClick={() => this.deleteClickImage(Img.id)}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                        <img className='fullscreen-image' src={Img.image} alt={`Image ${Img.id}`} onClick={(e)=>this.openImage(e)}/>
                                    </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>:null}
                        </div>
                    </>:<div className='text-center h1'>Loading</div>}
                 <FormConsultation selectedConsultation={selectedConsultation} modalTitle={"Modifier Consultation"} FilterPathMotif={FilterPathMotif} FilterPathDiagnostique={FilterPathDiagnostique} refreshList={()=>this.GetCons()} GetDate={()=>this.props.GetDate()}/>      
                 <FormFacture selectedConsultation={selectedConsultation} modalTitle={"Facture"} />   
                 <OrdonaceForme selectedConsultation={selectedConsultation} Traitement={MedicamentT} modalTitle={"Facture"} />   
                 <FormImage Idcons={selectedConsultation.id} modalTitle={"Ajouter une Image"} refreshList={()=>this.GetCons()} />   
             </div>
        </div>
    </div>
        )
    }
}