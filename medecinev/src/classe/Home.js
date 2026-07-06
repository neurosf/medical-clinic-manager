import React,{Component} from 'react';
import {variables} from '../Variables';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';
import { Loader } from './Component/Loader'; 
import { Main } from './Main';
import { MenuTop } from './Component/MenuTop';
import './Tables.css';
import './Form.css';

import { Login } from './Login';

import { Medicale } from './Medicale/Medicale';
import { Medicament } from './Medicale/Medicament';
import { Pathologies } from './Medicale/Pathologies';
import { ExamenR } from './Medicale/ExamenReg';
import { ExamenRad } from './Medicale/ExamenRad';
import { VariablesPhy } from './Medicale/VariablesPhy';

import { Patient } from './Patient/Patient';
import { PatientInfo } from './Patient/PatientInfo';

import { ConsultationInfo } from './Consultation/ConsultationInfo';
import { Consultation } from './Consultation/Consultation';

import { Stock } from './Stock/Stock';

import { Contacts } from './Contacts/Contacts';

import { Medecin } from './Medecin/Medecin';

import { FactureP } from './Consultation/FacutreP';

import { Salleattente } from './Salleattente/Salleattente';

import { Rendezvous } from './Rendezvous/Rendezvous';

import{Profile} from'./Profile/Profile';

import MedicalCertificate from './Document/Certafica';
import Document from './Document/Document';

import { Statistiques } from './Statistiques/Statistiques';
import Footer from './Component/Footer';

export class Home extends Component{
    constructor(props){
        super(props);

        this.state={
            userlog:{
              UserName:"",
              PassWord:""
            },
            log:0,
            MenuSideOpen:false,
            PhotoPath:variables.PHOTO_URL,
            isLoading: true,

            error: null,
            location:window.location.pathname.split('/')[1],
            windowWidth:window.innerWidth
        }
    }
    changePassword = (e)=>{
        this.setState({Password:e.target.value});
    }
    changeusername = (e)=>{
        this.setState({username:e.target.value});
    }
    verfie=()=>{
      fetch(variables.API_URL+'MedecinVrefie',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify(this.state.userlog)
      })
      .then(res=>res.json())
      .then((result)=>{
          console.log(result);
          this.setState({isLoading: false})
          if(result.respond!==-1){
            if(result.respond!==0){
                this.state.userlog=result.DATA;
                if(this.state.userlog.Type==='Medecin') this.state.log=3;
                else if(this.state.userlog.Type==='Employe stock') this.state.log=2;
                else this.state.log=1;
            }else this.setState({log:0});     
          }
          if(this.state.log===0){
            if(this.state.location!=="Login") window.location='/Login';
            this.setState({isLoading:false})
          } 
          this.setState({});
      },(error)=>{console.log('Failed');})
    }
    Connect = () => {
      const credentialsCookie = this.getCookie('credentials');
    
      if (credentialsCookie !== '') {
        const decodedCredentials = atob(credentialsCookie);
        const [UserName, PassWord] = decodedCredentials.split(':');
        this.state.userlog= {
            UserName: UserName,
            PassWord: PassWord,
          };
        this.verfie();
      } else {
        if (this.state.location !== 'Login') {
          window.location = '/Login';
        }
        this.setState({ isLoading: false });
      }
    };
    disconnect=()=>{
      this.state.userlog={UserName:"",PassWord:""}
      this.deleteCookie('credentials')
      window.location = '/Login';
      this.setState({log:0});
    }
    getuserInfo=(UserName,PassWord)=>{
      this.state.userlog={UserName:UserName,PassWord:PassWord};
      this.setState({})
      this.verfie()
    }
    componentDidMount(){
      this.Connect();
    }
    componentDidUpdate=()=>{
       if(this.state.location!== window.location.pathname.split('/')[1]){
        this.state.location = window.location.pathname.split('/')[1];
        console.log(window.location.pathname.split('/')[1])
        this.setState({})
       }
       if(this.state.windowWidth!==window.innerWidth){
        this.state.windowWidth=window.innerWidth;
        this.setState({})
       }
    }
///////////////////////// Cookies
getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
//////////////////////GETS
GetDate = () => {
  const now = new Date();
  now.setSeconds(0); 
  now.setMilliseconds(0); 
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  now.setHours(currentHour + 1, currentMinute);
  const dateString = now.toISOString();
  return dateString;
}
//////////////////////
CloseMenuSide=()=>{
  console.log(this.state.MenuSideOpen)
  if(this.state.MenuSideOpen){
    this.state.MenuSideOpen=false;
  }
  else{
    this.state.MenuSideOpen=true;
  }
  this.setState({})
}
    render(){
        const {
            isLoading,
            log,
            userlog,
            error,
            MenuSideOpen
        }=this.state;
        if (isLoading) {
          return <Loader />;
        }
        if (error) {
          return <div className='h1 m-5 text-center'>Oooops!</div>;
        }
        return(<>
<div className="Main">
<BrowserRouter> 
<div className='RouterSpace'>
  <MenuTop disconnect={()=>this.disconnect()} log={log}/>
  <br/><br/>
      <Routes>
       <Route path='/' element={<Main log={log}/>}/>
       <Route path='/Login' element={<Login getuserInfo={this.getuserInfo} log={log}/>}/>
      {log===3?<>
       <Route path='/Medicale' element={<Medicale CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>
       <Route path='/Medicament' element={<Medicament CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>
       <Route path='/Pathologies' element={<Pathologies CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>
       <Route path='/ExamenR' element={<ExamenR CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>
       <Route path='/ExamenRad' element={<ExamenRad CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>
       <Route path='/VariablesPhy' element={<VariablesPhy CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>
      </>:null}
       <Route path='/Patient' element={<Patient GetDate={this.GetDate} log={log} CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>
       <Route path='/Patient/:Patient' element={<PatientInfo GetDate={this.GetDate} log={log} CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>

       <Route path='/Consultation' element={<Consultation GetDate={this.GetDate} log={log} CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>
       <Route path='/Consultation/:Consultation' element={<ConsultationInfo GetDate={this.GetDate} log={log} CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>
      
       <Route path='/Facture' element={<FactureP GetDate={this.GetDate} log={log} CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>
       
       <Route path='/Salleattente' element={<Salleattente GetDate={this.GetDate} log={log} CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>

       <Route path='/Rendezvous' element={<Rendezvous GetDate={this.GetDate} log={log} CloseMenuSide={this.CloseMenuSide} MenuSideOpen={MenuSideOpen}/>}/>

       {log>=2?<><Route path='/Stock' element={<Stock GetDate={this.GetDate}/>}/></>:null}

       <Route path='/Contacts' element={<Contacts GetDate={this.GetDate} log={log}/>}/>

       <Route path='/Medecin' element={<Medecin GetDate={this.GetDate} log={log}/>}/>

       <Route path='/Profile' element={<Profile userlog={userlog}  log={log}/>}/>
       
       {log===3?<>
          <Route path='/MedicaleCertificate' element={<MedicalCertificate GetDate={this.GetDate}/>}/>
          <Route path='/Document' element={<Document GetDate={this.GetDate}/>}/>
          <Route path='/Courrier' element={<Document GetDate={this.GetDate}/>}/>
          <Route path='/Ordonnance' element={<Document GetDate={this.GetDate}/>}/>
          </>:null}
          
       {log===3?<>
          <Route path='/Statistiques' element={<Statistiques GetDate={this.GetDate}/>}/>
          </>:null}
      </Routes>
    </div>  
    </BrowserRouter>
  </div>
  <Footer/>
  </>
        )
    }
}