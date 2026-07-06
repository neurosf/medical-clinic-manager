import React,{Component} from 'react';
import { variables } from '../../Variables';
import {Graphe} from'./graphe';
import { Colors } from 'chart.js';
import './stat.css'

export class Statistiques  extends Component{

    constructor(props){
        super(props);
        this.state={
            date:this.props.GetDate().split("T")[0],
            patientData:[],
            stat:[],
            choix:"",
            choixdatapatients:"",
            titre:"",
            graph:1,
    } 
}

getstatistiques = async () => {
    try {
    const currentDate = this.state.date;
      const response = await fetch(variables.API_URL+'statistics/'+currentDate);

      const data = await response.json();
      this.state.patientData= data;
      switch (this.state.choixdatapatients) {
        case "Sexe":this.setSexeStat();break;
        case "Age":this.setAgeetat();break;
        case "Dossierparmois":this.setdossieretat();break;
        case "prf":this.setprfStat();break;
        case "cnsparmois":this.setconsparmois();break;
        case"enysalans":this.setentreeyessalansStat();break;
        case"enysalmois":this.setentreeyessalmoisStat();break;
        case"enysaljour":this.setentreeyessaljourStat();break;
        case"benfentans":this.setbeneficeentreeansStat();break;
        case"benfentmois":this.setbeneficeentremoisStat();break;
        case"benfentjour":this.setbeneficeentrejourStat();break;
        case"benfcredans":this.setbeneficecreditansStat();break;
        case"benfcredmois":this.setbeneficecreditmoisStat();break;
        case"benfcredjour":this.setbeneficecreditjourStat();break;
        default:
          // Le cas où this.state.choixdatapatients ne correspond à aucun des cas précédents.
          break;
      }
      this.setState({})
     } catch (error) {
    }
  };
changestat=(e)=>{
this.state.choix =e.target.value;
    switch(this.state.choix){
        case "Patients":this.setState({stat:[],choixdatapatients:"Sexe"});break;
        case "Employes":this.setState({stat:[],choixdatapatients:"prf"});break;
        case "Consultation":this.setState({stat:[],choixdatapatients:"cnsparmois"});break;
        case "Gain":this.setState({stat:[],choixdatapatients:"enysalans"});break;
        case "Dette":this.setState({stat:[],choixdatapatients:"enysalans"});break;
        case "stock":this.setState({stat:[],choixdatapatients:"enysalans"});break;
        case "Benefice":this.setState({stat:[],choixdatapatients:"enysalans"});break;
    }
this.getstatistiques();
}
changedate=(e)=>{
this.state.date =e.target.value;
this.setState({});
this.getstatistiques();
}
componentDidMount(){
    this.state.choix ="Patients";
    this.setState({stat:[],choixdatapatients:"Sexe"})
    this.getstatistiques();
}
setprfStat(){
    this.setState({
        stat:[
            {
                Labl:'Medecins',
                Numbere:this.state.patientData.tousMedecins
            },
            {
                Labl:'Employes',
                Numbere:this.state.patientData.Employe
            }
        ]
    })
}
setSexeStat(){
    this.setState({
        stat:[
            {
                Labl:'Homme',
                Numbere:this.state.patientData.sex_categories.Homme
            },
            {
                Labl:'Femme',
                Numbere:this.state.patientData.sex_categories.Femme
            }
        ]
    })
}
setentreeyessalansStat(){
    this.setState({
        stat:[
            {
                Labl:'Entree',
                Numbere:this.state.patientData.dekhel_par_un_an
            },
            {
                Labl:'Yessal',
                Numbere:this.state.patientData.yessal_par_an
            }
        ]
    })
}
setentreeyessalmoisStat(){
    this.setState({
        stat:[
            {
                Labl:'Entree',
                Numbere:this.state.patientData.dekhle_par_mois
            },
            {
                Labl:'Yessal',
                Numbere:this.state.patientData.yessal_par_mois
            }
        ]
    })
}
setentreeyessaljourStat(){
    this.setState({
        stat:[
            {
                Labl:'Entree',
                Numbere:this.state.patientData.dekhel_par_jour
            },
            {
                Labl:'Yessal',
                Numbere:this.state.patientData.yessal_par_jour
            }
        ]
    })
}
setAgeetat(){
    this.setState({
        stat:[
            {
                Labl:'0-10',
                Numbere:this.state.patientData.age_categories["0-10"]
            },
            {
                Labl:'11-20',
                Numbere:this.state.patientData.age_categories["11-20"]
            },
            {
                Labl:'21-30',
                Numbere:this.state.patientData.age_categories["21-30"]
            },
            {
                Labl:'31-40',
                Numbere:this.state.patientData.age_categories["31-40"]
            },
            {
                Labl:'41-50',
                Numbere:this.state.patientData.age_categories["31-50"]
            },
            {
                Labl:'51-60',
                Numbere:this.state.patientData.age_categories["51-60"]
            },
            {
                Labl:'61-70',
                Numbere:this.state.patientData.age_categories["61-70"]
            },
            {
                Labl:'71-80',
                Numbere:this.state.patientData.age_categories["71-80"]
            },
            {
                Labl:'81+',
                Numbere:this.state.patientData.age_categories["81+"]
            },
            
        ]
    })
}
setdossieretat(){
    this.setState({
        stat:[
            {
                Labl:'Janvier',
                Numbere:this.state.patientData.dossiermois["Janvier"]
            },
            {
                Labl:'fevrier',
                Numbere:this.state.patientData.dossiermois["fevrier"]
            },
            {
                Labl:'mars',
                Numbere:this.state.patientData.dossiermois["mars"]
            },
            {
                Labl:'avril',
                Numbere:this.state.patientData.dossiermois["avril"]
            },
            {
                Labl:'mai',
                Numbere:this.state.patientData.dossiermois["maie"]
            },
            {
                Labl:'jouin',
                Numbere:this.state.patientData.dossiermois["jouin"]
            },
            {
                Labl:'juillet',
                Numbere:this.state.patientData.dossiermois["juillet"]
            },
            {
                Labl:'aout',
                Numbere:this.state.patientData.dossiermois["aout"]
            },
            {
                Labl:'septembre',
                Numbere:this.state.patientData.dossiermois["septembre"]
            },
            {
                Labl:'octobre',
                Numbere:this.state.patientData.dossiermois["octobre"]
            },
            {
                Labl:'novembre',
                Numbere:this.state.patientData.dossiermois["novembre"]
            },
            {
                Labl:'decembre',
                Numbere:this.state.patientData.dossiermois["decembre"]
            },
            
        ]
    })
}
setconsparmois(){
    this.setState({
        stat:[
            {
                Labl:'Janvier',
                Numbere:this.state.patientData.consultatoincountmois["Janvier"]
            },
            {
                Labl:'fevrier',
                Numbere:this.state.patientData.consultatoincountmois["fevrier"]
            },
            {
                Labl:'mars',
                Numbere:this.state.patientData.consultatoincountmois["mars"]
            },
            {
                Labl:'avril',
                Numbere:this.state.patientData.consultatoincountmois["avril"]
            },
            {
                Labl:'mai',
                Numbere:this.state.patientData.consultatoincountmois["maie"]
            },
            {
                Labl:'jouin',
                Numbere:this.state.patientData.consultatoincountmois["jouin"]
            },
            {
                Labl:'juillet',
                Numbere:this.state.patientData.consultatoincountmois["juillet"]
            },
            {
                Labl:'aout',
                Numbere:this.state.patientData.consultatoincountmois["aout"]
            },
            {
                Labl:'septembre',
                Numbere:this.state.patientData.consultatoincountmois["septembre"]
            },
            {
                Labl:'octobre',
                Numbere:this.state.patientData.consultatoincountmois["octobre"]
            },
            {
                Labl:'novembre',
                Numbere:this.state.patientData.consultatoincountmois["novembre"]
            },
            {
                Labl:'decembre',
                Numbere:this.state.patientData.consultatoincountmois["decembre"]
            },
            
        ]
    })
}
setbeneficeentreeansStat(){
    this.setState({
        stat:[
            {
                Labl:'Entree',
                Numbere:this.state.patientData.dekhel_par_un_an
            },
            {
                Labl:'benefice net',
                Numbere:this.state.patientData.beneficetotaleans
            }
        ]
    })
}
setbeneficeentremoisStat(){
    this.setState({
        stat:[
            {
                Labl:'Entree',
                Numbere:this.state.patientData.dekhle_par_mois
            },
            {
                Labl:'benefice net',
                Numbere:this.state.patientData.beneficetotalemois
            }
        ]
    })
}
setbeneficeentrejourStat(){
    this.setState({
        stat:[
            {
                Labl:'Entree',
                Numbere:this.state.patientData.dekhel_par_jour
            },
            {
                Labl:'benefice net',
                Numbere:this.state.patientData.beneficetotalejour
            }
        ]
    })
}
setbeneficecreditansStat(){
    this.setState({
        stat:[
            {
                Labl:'credit',
                Numbere:this.state.patientData.yessal_par_an
            },
            {
                Labl:'benefice net',
                Numbere:this.state.patientData.beneficetotaleans
            }
        ]
    })
}
setbeneficecreditmoisStat(){
    this.setState({
        stat:[
            {
                Labl:'credit',
                Numbere:this.state.patientData.yessal_par_mois
            },
            {
                Labl:'benefice net',
                Numbere:this.state.patientData.beneficetotalemois
            }
        ]
    })
}
setbeneficecreditjourStat(){
    this.setState({
        stat:[
            {
                Labl:'credit',
                Numbere:this.state.patientData.yessal_par_jour
            },
            {
                Labl:'benefice net',
                Numbere:this.state.patientData.beneficetotalejour
            }
        ]
    })
}
chouseState=(e)=>{
    let choix=e.target.value;
    this.state.choixdatapatients=e.target.value;
        switch (choix){
        case "Sexe":this.state.titre="patient par sexe";break;
        case "Age":this.state.titre="Patient par Âge";break;
        case "Dossierparmois":this.state.titre="Dossier par mois";break;
        case "prf":this.state.titre="Employes/Medecin";break;
        case"cnsparmois":this.state.titre="Consultation par mois";break;
        case "enysalans":this.state.titre="Entre/ysaal par ans";break;
        case"enysalmois":this.state.titre="Entree yessal par mois";break;
        case"enysaljour":this.state.titre="Entree yessal par jour";break;
        case"benfentans":this.state.titre="benefice net/entre par ans" ;break;
        case"benfentmois":this.state.titre="benefice net /entre par mois";break;
        case"benfentjour":this.state.titre="benefice net/entre par jour"; break;
        case"benfcredans":this.state.titre="benefice net /credit ans";break;
        case"benfcredmois":this.state.titre="benefice net /credit mois";break;
        case"benfcredjour":this.state.titre="benefice net /credit jour";break;
    }
    this.getstatistiques();
}
changeGraph=(e)=>{
    this.state.graph=e.target.value;
    this.getstatistiques();
}
render(){
    const{
        patientData,
        date,
        year,
        stat,
        choix,
        graph,
    }= this.state;
    return( 
        <div class="bg-light">
        <div className='TopStat'>            

        <h3><i class="fa-solid fa-chart-pie"></i></h3>
            <select className=' inputContact' name="" id="" onChange={this.changestat}>
                <optgroup label=" Statistique">
                    <option value="Patients">Patients</option>
                    <option value="Employes">Employes</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Gain">Gain</option>
                    <option value="Dette">Dette</option>
                    <option value="Benefice">Benefice</option>
                    <option value="stock">stock</option>
                </optgroup>
            </select> 
            <input type="date" className="inputContact" placeholder='Date' value= {date} onChange={this.changedate}  />
        </div>
        <div className='Statistiques'>
        <br/><br/><br/><br/> 
            {this.state.choix=="Patients"?<>
            <h2>Statistiques pour les patients</h2>
            <div className='StatWS'>            
                <section className='StatCountainer'>
                    <div className='StatTitle'>Patients </div>
                    <div className='StatNum'>{patientData.TousPatients}</div>
                    <div className='Stattext'> cette date {date}</div>            
                     <hr className='lineStat'/>
                     </section>
                <section className='StatCountainer'>
                    <div className='StatTitle'>Dossiers par ans </div>
                    <div className='StatNum'>{patientData.dossier_par_an}</div>
                    <div className='Stattext'>cette année{date[0]}{date[1]}{date[2]}{date[3]}</div>
                    <hr className='lineStat'/>
                </section>
                <section className='StatCountainer'>
                    <div className='StatTitle'>Dossiers par mois </div>
                    <div className='StatNum'>{patientData.dossier_par_mois}</div>
                    <div className='Stattext'>Ce  mois {date[5]}{date[6]} </div>
                    <hr className='lineStat'/>
                </section>
                <section className='StatCountainer'>
                    <div className='StatTitle'>Dossiers par jour </div>
                    <div className='StatNum'>{patientData.dossier_par_jour}</div>
                    <div className='Stattext'>ce jour{date[8]}{date[9]}</div>
                    <hr className='lineStat'/>
                </section>
            </div>            
            </>:null}
            {this.state.choix=="Employes"?<>
            <h2>Statistiques pour les Employes</h2>      
            <div className='StatWS'>      
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Tous les Employes/Medecins </div>
                        <div className='StatNum'>{patientData.tousemployemedeecinS}</div>
                        <div className='Stattext'> cette date {date}</div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Tous les medecin  </div>
                        <div className='StatNum'>{patientData.tousMedecins}</div>
                        <div className='Stattext'>cette date {date}</div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Tous les Employes </div>
                        <div className='StatNum'>{patientData.Employe}</div>
                        <div className='Stattext'>cette {date} </div>
                        <hr className='lineStat'/>
                    </section>
            </div> 
            </>:null}
            {this.state.choix=="Consultation"?<>
            <h2>Statistiques pour les Consultation</h2>
            <div className='StatWS'>            
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Consultation par ans </div>
                        <div className='StatNum'>{patientData.consultations_par_an}</div>
                        <div className='Stattext'>cette année cette année{date[0]}{date[1]}{date[2]}{date[3]} </div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Consultation par mois  </div>
                        <div className='StatNum'>{patientData.consultation_par_mois}</div>
                        <div className='Stattext'>ce mois {date[5]}{date[6]} </div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Consultation par jour </div>
                        <div className='StatNum'>{patientData.consultation_par_jour}</div>
                        <div className='Stattext'>ce jour { date[8]}{date[9]}</div>
                        <hr className='lineStat'/>
                    </section> 
                </div>
                </>:null}
            {this.state.choix=="Gain"?<>
            <h2>Statistiques pour le Finance</h2>
            <div className='StatWS'>            
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Gain par ans </div>
                        <div className='StatNum'>{patientData.dekhel_par_un_an}</div>
                        <div className='Stattext'> cette année cette année{date[0]}{date[1]}{date[2]}{date[3]}</div>        
                        <hr className='lineStat'/>
                        </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Gain par mois </div>
                        <div className='StatNum'>{patientData.dekhle_par_mois}</div>
                        <div className='Stattext'>ce mois { date[5]}{date[6]}  </div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Gain par jour  </div>
                        <div className='StatNum'>{patientData.dekhel_par_jour}</div>
                        <div className='Stattext'>ce jour {date[8]} {date[9]}</div>
                        <hr className='lineStat'/>
                    </section>
            </div>
            </>:null}
            {this.state.choix=="Dette"?<>
            <h2>Statistiques pour le Finance</h2>
            <div className='StatWS'>            
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Dette par ans </div>
                        <div className='StatNum'>{patientData.yessal_par_an}</div>
                        <div className='Stattext'> cette année {date[0]}{date[1]}{date[2]}{date[3]}</div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Dette par mois </div>
                        <div className='StatNum'>{patientData.yessal_par_mois}</div>
                        <div className='Stattext'> ce mois {date[5]} {date[6]}   </div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Dette par jour </div>
                        <div className='StatNum'>{patientData.yessal_par_jour}</div>
                        <div className='Stattext'> ce jour {date[8] }{date[9]}  </div>
                        <hr className='lineStat'/>
                    </section>
            </div>
            </>:null}
            {this.state.choix=="stock"?<>
            <h2>Statistiques pour le stock</h2>
                <div className='StatWS'>            
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Prix totale de stock  </div>
                        <div className='StatNum'>{patientData.prixtotalestock}</div>
                        <div className='Stattext'> cette date:{date} </div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Totale prix d'achat des medicamnets utilisé par ans</div>
                        <div className='StatNum'>{patientData.totalprixachatmedicammentutilise}</div>
                        <div className='Stattext'> cette année{date[0]}{date[1]}{date[2]}{date[3]} </div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Totale prix d'achat des medicamments utilisé par mois</div>
                        <div className='StatNum'>{patientData.totalprixachatmedicammentutiliseparmois}</div>
                        <div className='Stattext'> Ce  mois { date[5]}{date[6]}  </div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Totale prix d'achat des medicamments utilisé par jour</div>
                        <div className='StatNum'>{patientData.totalprixachatmedicammentutiliseparjour}</div>
                        <div className='Stattext'> ce jour {date[8]}{date[9]} </div>
                        <hr className='lineStat'/>
                    </section>
                </div>            
            </>:null}
            {this.state.choix=="Benefice"?<>
            <h2>Statistiques pour le Finance</h2>
            <div className='StatWS'>            
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Benefice net par ans</div>
                        <div className='StatNum'>{patientData.beneficetotaleans}</div>
                        <div className='Stattext'>cette année{date[0]}{date[1]}{date[2]}{date[3]} </div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Benefice net mois</div>
                        <div className='StatNum'>{patientData.beneficetotalemois}</div>
                        <div className='Stattext'> Ce  mois { date[5]}{date[6]}  </div>
                        <hr className='lineStat'/>
                    </section>
                    <section className='StatCountainer'>
                        <div className='StatTitle'>Benefice net par jour</div>
                        <div className='StatNum'>{patientData.beneficetotalejour}</div>
                        <div className='Stattext'> ce jour {date[8]}{date[9]} </div>
                        <hr className='lineStat'/>
                    </section>
            </div>
            </>:null}
            <h2>Graphiques</h2>
            <div className='Selectcontainer'>
                {this.state.choix=="Patients"?<>
                <select className=' inputContact m-2' name="" id="" onChange={this.chouseState}>
                <optgroup label="by">
                    <option value="Sexe">Patient parSexe</option>
                    <option value="Age">Patient par Age</option>
                    <option value="Dossierparmois">Dossier par mois</option>
                </optgroup>
                </select>
                </>:null}
                {this.state.choix=="Employes"?<>
                <select className=' inputContact m-2' name="" id="" onChange={this.chouseState}>
                <optgroup label="by">
                    <option value="prf">Emplyées par profession</option>
                </optgroup>
                </select>
                </>:null}
                {this.state.choix=="Consultation"?<>
                <select className=' inputContact m-2' name="" id="" onChange={this.chouseState}>
                <optgroup label="by">
                    <option value="cnsparmois">consultation par mois </option>
                </optgroup>
                </select>
                </>:null}
                {(this.state.choix=="Gain"||this.state.choix=="Dette"||this.state.choix=="totale"||this.state.choix=="Benefice")?<>
                    <select className=' inputContact m-2' name="" id="" onChange={this.chouseState}>
                    <optgroup label="by">
                        <option value="enysalans">Entre/Dette par ans </option>
                        <option value="enysalmois">Entre/yessal par mois </option>
                        <option value="enysaljour">Entre/yessal par jour </option>
                        <option value="benfentans">benefice net /Entree par ans </option>
                        <option value="benfentmois">benefice net /Entree par mois </option>
                        <option value="benfentjour">benefice net /Entree par jour </option>
                        <option value="benfcredans">benefice net /credit par ans </option>
                        <option value="benfcredmois">benefice net /credit par mois </option>
                        <option value="benfcredjour">benefice net /credit par jour </option>

                    </optgroup>
                    </select>
                    </>:null}
                <select className=' inputContact m-2' name="" id="" onChange={this.changeGraph}>
                <optgroup label="Represonte par">
                    <option value={1}>Bar</option>
                    <option value={2}>Lien</option>
                    <option value={3}>Pie</option>
                </optgroup>
                </select>
            </div>
            <Graphe Data={stat} graph={graph} titel={this.state.titre}/>
            </div>
        </div> 
    )
    }
}