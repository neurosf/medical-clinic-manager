import React,{Component} from 'react';
import {variables} from '../Variables.js';
import {Graphe} from './graphe.jsx'

export class Statistique extends Component{
    constructor(props){
        super(props);

        this.state={
            Personne:[],
            Dead:[],
            Population:[],
            PersonneFilter:[],
            Stat:[],
            Stattitel:"",
            SexeStat:[],
            AgeStat:[],
            vieStat:[],
            MarieStat:[],
            yearbirthStat:[],
            yeardeathStat:[],
            graph:1,

            PopulationCount:0,
            birthY:0,
            birthD:0,
            deathY:0,
            deathD:0,
            CroiY:0,
            CroiD:0,

            Personnetbl:'Personne',
            Deathtbl:'PersonneDeces',

            currentdate:new Date()
        }
    }
/////////////////////// (Alive)
SetPopulation(){
        this.state.Population=this.state.Personne.filter(
            function(el){
                if(el.Etat_de_vie)return el;
            }
        );
    }
//////////////////////////
SetCounts(){
    this.state.PopulationCount=this.state.Population.length;
    this.state.birthY=this.birthYCount(this.state.currentdate.getFullYear());
    this.state.birthD=this.birthDCount(this.state.currentdate);
    this.state.deathY=this.deathYCount(this.state.currentdate.getFullYear());
    this.state.deathD=this.deathDCount(this.state.currentdate);
    this.state.CroiY=this.state.birthY-this.state.deathY;
    this.state.CroiD=this.state.birthD-this.state.deathD;
}
birthYCount(Date){
    let birth_year;
    let currentdate=Date;
    this.state.PersonneFilter=this.state.Population.filter(
        function(el){
            birth_year=el.Date_Naissance.split('-')[0];
            if(birth_year==currentdate)return el;
        }
    );
    return this.state.PersonneFilter.length;
}
birthDCount(Date){
    let birth_Date;
    let currentdate=Date;
    this.state.PersonneFilter=this.state.Population.filter(
        function(el){
            
            birth_Date=el.Date_Naissance.split('-');
            if(birth_Date[0]==currentdate.getFullYear()&&birth_Date[1]==(currentdate.getMonth()+1)&&birth_Date[2]==(currentdate.getDate()))return el;
        }
    );
    return this.state.PersonneFilter.length;
}
deathYCount(Date){
    let dead=this.state.Dead;
    let death_year;
    let NumP;
    let currentdate=Date;
    this.state.PersonneFilter=this.state.Personne.filter(
        function(el){
            if(!el.Etat_de_vie){
            NumP=el.NumP;
            let death=dead.filter(function(el){
                if(el.NumP==NumP)return el;
            })
            if(death.length>0){
            death_year=death[0].Date_Deces.split('-')[0];
            if(death_year==currentdate)return el;
            }
            }
        }
    );
    return this.state.PersonneFilter.length;
}
deathDCount(Date){
    let dead=this.state.Dead;
    let death_date;
    let NumP;
    let currentdate=Date;
    this.state.PersonneFilter=this.state.Personne.filter(
        function(el){
            if(!el.Etat_de_vie){
            NumP=el.NumP;
            let death=dead.filter(function(el){
                if(el.NumP==NumP)return el;
            })
            if(death.length>0){
            death_date=death[0].Date_Deces.split('-');
            if(death_date[0]==currentdate.getFullYear()&&death_date[1]==(currentdate.getMonth()+1)&&death_date[2]==(currentdate.getDate()))return el;            
            }
            }
        }
    );           

    return this.state.PersonneFilter.length;
}
getdeathDate(NumP){
    return this.state.Dead.filter(function(el){
        if(el.NumP==NumP)return el.Date_Deces;
    })
}
////////////////////////////filter SEXE
    setSexeStat(){
        this.state.SexeStat=[
        {
            Labl:'Homme',
            Numbere:this.countSexe('Homme')
        },
        {
            Labl:'Famme',
            Numbere:this.countSexe('Famme')
        }
    ];
    }
    countSexe(Sexe){
        this.state.PersonneFilter=this.state.Population.filter(
            function(el){
                if(el.Sexe===Sexe)return el;
            }
        );
        return this.state.PersonneFilter.length;
    }
////////////////////////////filter AGE
setAgeStat(){
    this.state.AgeStat=[
    {
        Labl:'baby',
        Numbere:this.countAge(0,4)
    },
    {
        Labl:'enfans',
        Numbere:this.countAge(5,13)
    },
    {
        Labl:'Jeune',
        Numbere:this.countAge(14,35)
    },
    {
        Labl:'Âgée',
        Numbere:this.countAge(36,65)
    },
    {
        Labl:'Vieux',
        Numbere:this.countAge(66,200)
    }
];
}
countAge(min,max){
    let Age;
    let birth_year;
    let currentdate=this.state.currentdate.getFullYear();
    this.state.PersonneFilter=this.state.Population.filter(
        function(el){
            birth_year=el.Date_Naissance.split('-')[0];
            Age =currentdate - birth_year;
            if(Age>=min && Age <= max)return el;
        }
    );
    return this.state.PersonneFilter.length;
}
////////////////////////////filter vie
setvieStat(){
    this.state.vieStat=[
    {
        Labl:'Vivante',
        Numbere:this.state.Population.length
    },
    {
        Labl:'morte',
        Numbere:this.countdead()
    },
];
}
countdead(){
    this.state.PersonneFilter=this.state.Personne.filter(
        function(el){
            if(!el.Etat_de_vie)return el;
        }
    );
    return this.state.PersonneFilter.length;
}
////////////////////////////filter vie
setMarieStat(){
    this.state.MarieStat=[
    {
        Labl:'Marie',
        Numbere:this.countMarie()
    },
    {
        Labl:'Non Marie',
        Numbere:this.countNonMarie()
    },
];
}
countMarie(){
    this.state.PersonneFilter=this.state.Personne.filter(
        function(el){
            if(el.Situation_Marital)return el;
        }
    );
    return this.state.PersonneFilter.length;
}
countNonMarie(){
    this.state.PersonneFilter=this.state.Personne.filter(
        function(el){
            if(!el.Situation_Marital)return el;
        }
    );
    return this.state.PersonneFilter.length;
}
////////////////////////////filter year birth
setYearbirthStat(){
    let year=2000;
    for(let i=0;i<24;i++){
    this.state.yearbirthStat[i]=
    {
        Labl:""+(year+i),
        Numbere:this.birthYCount(year+i)
    };
    }
}
////////////////////////////filter year death
setYeardeathStat(){
    let year=2000;
    for(let i=0;i<24;i++){
    this.state.yeardeathStat[i]=
    {
        Labl:""+(year+i),
        Numbere:this.deathYCount(year+i)
        
    };
    }
}
/////////////////////////// choix de state a affichier
chouseState=(e)=>{
    let choix=e.target.value;

    switch (choix){
    case "Sexe":this.setState({Stat:this.state.SexeStat});this.state.Stattitel="diviser population par sexe";break;
    case "Age":this.setState({Stat:this.state.AgeStat});this.state.Stattitel="diviser population par Âge";break;
    case "vie":this.setState({Stat:this.state.vieStat});this.state.Stattitel="des morts et des vies";break;
    case "birth":this.setState({Stat:this.state.yearbirthStat});this.state.Stattitel="Naissances au cours des 20 dernières années";break;
    case "death":this.setState({Stat:this.state.yeardeathStat});this.state.Stattitel="décès au cours des 20 dernières années";break;
    case "Marie":this.setState({Stat:this.state.MarieStat});this.state.Stattitel="diviser population par situation marital";break;
    }
    this.refreshList();
}
///////////////////////// change graphe type
changeGraph=(e)=>{
    this.state.graph=e.target.value;
    this.refreshList();
}
//////////////////Get Data fromme API server
    refreshList(){
        fetch(variables.API_URL+this.state.Personnetbl)
        .then(response=>response.json())
        .then(data=>{ 
            this.setState({Personne:data});
            fetch(variables.API_URL+this.state.Deathtbl)
            .then(response=>response.json())
            .then(data=>{
                this.setState({Dead:data});
                this.SetPopulation();
                this.setSexeStat();
                this.setAgeStat();
                this.setvieStat();
                this.SetCounts();
                this.setYearbirthStat();
                this.setYeardeathStat();
                this.setMarieStat();
            });

        });

    }
    componentDidMount(){
        this.refreshList();
        this.state.Stat=this.state.SexeStat;
    }

    render(){
        const {
            Stat,
            Stattitel,
            graph,
            PopulationCount,
            birthY,
            birthD,
            deathY,
            deathD,
            CroiY,
            CroiD,
        }=this.state;
        return(
            
            <div className='container text-light' style={{background: "#47505a"}}>
                <br></br><br></br><br></br><br></br>
                <section>

                <h1 className="text-md-center">POPULATION</h1>
                

                <div className="row text-center g-4">
                        <div className="col-md">
                            <div className="car text-light">
                                <div className="card-body text-center">
                                <div className="h1 mb-3">
                                    <i className="bi bi-people"></i>
                                  </div>
                                <h3 className="card-title">Population Actuelle</h3><h4><span>{PopulationCount}</span></h4>
                                </div>
                            </div>
                           </div>    
                    </div>



                    <div className="row text-center g-4">
                           <div className="col-md">
                            <div className="car text-light">
                                <div className="card-body text-center">
                                <div className="h1 mb-3">
                                <i className="fa-solid fa-baby"></i>
                                  </div>
                                <h3 className="card-title">Naissances Cette Année</h3><h4><span>{birthY}</span></h4>
                                </div>
                            </div>
                           </div>

                           <div className="col-md">
                            <div className="car text-light">
                                <div className="card-body text-center">
                                <div className="h1 mb-3">
                                <i className="fa-solid fa-baby"></i>
                                  </div>
                                <h3 className="card-title">Naissances Aujourd'hui</h3><h4><span>{birthD}</span></h4>
                                </div>
                            </div>
                           </div>

                           
                    </div>


                    <div className="row text-center g-4">
                        <div className="col-md">
                            <div className="car text-light">
                                <div className="card-body text-center">
                                <div className="h1 mb-3">
                                <i className="fa-solid fa-skull"></i>
                                  </div>
                                <h3 className="card-title">Décès Cette Année</h3><h4><span>{deathY}</span></h4>
                                </div>
                            </div>
                           </div>

                           <div className="col-md">
                            <div className="car text-light">
                                <div className="card-body text-center">
                                <div className="h1 mb-3">
                                <i className="fa-solid fa-skull"></i>
                              </div>
                                <h3 className="card-title">Décès Aujourd'hui</h3><h4><span>{deathD}</span></h4>
                                </div>
                            </div>
                           </div>
                           
                    </div>


                    <div className="row text-center g-4">
                           <div className="col-md">
                            <div className="car text-light">
                                <div className="card-body text-center">
                                <div className="h1 mb-3">
                                <i className="fa-solid fa-arrow-trend-up"></i>
                              </div>
                                <h3 className="card-title">Croissance Nette De La Population Cette Année</h3><h4><span>{CroiY}</span></h4>
                                </div>
                            </div>
                           </div>

                           <div className="col-md">
                            <div className="car text-light">
                                <div className="card-body text-center">
                                <div className="h1 mb-3">
                                <i className="fa-solid fa-arrow-trend-up"></i>
                                  </div>
                                <h3 className="card-title">Croissance Démographique Nette Aujourd'hui</h3><h4><span>{CroiD}</span></h4>
                                </div>
                            </div>
                           </div>
                           </div>

                </section>

                <section>


                    <div>


                <h1 className="text-md-center">Statistique General</h1>
                <br></br>
                    <div className="w-25">
                    <select className=' form-select m-2' name="" id="" onChange={this.chouseState}>
                    <optgroup label="by">
                        <option value="Sexe">Sexe</option>
                        <option value="Age">Age</option>
                        <option value="Marie">Marie</option>
                        <option value="vie">Vie</option>
                        <option value="birth">Naissance Annuel</option>
                        <option value="death">décès Annuel</option>
                    </optgroup>
                    </select>
                    <select className=' form-select m-2' name="" id="" onChange={this.changeGraph}>
                    <optgroup label="Represonte par">
                        <option value={1}>Bar</option>
                        <option value={2}>Lien</option>
                        <option value={3}>Pie</option>
                    </optgroup>
                    </select>
                    </div>
                    <br></br>
                    <Graphe Data={Stat} graph={graph} titel={Stattitel}/>

                    </div> 

                </section>
            </div>
        )
    }
}
