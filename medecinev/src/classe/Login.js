import React,{Component} from 'react';
import {variables} from '../Variables.js';
import { useNavigate  } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Login.css';

export class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            userlog:{
                UserName:"",
                PassWord:"",
                Email:""
            },
            Proposedusernames:[],
            log:0,
            passwordW:"Your Password",
            usermailW:"Your Email / Username",
            usenamemsg:'',
            Emailmsg:'',
            PassWordmsg:'',
            isLoadingregister: false,
            PhotoPath:variables.PHOTO_URL,
            
        };
    }
////////////////log change
    changePasswordlog = (e)=>{
        if(e.target.value!='')this.state.passwordW='';
        else this.state.passwordW="Your Password";
        let X=this.state.userlog;
        X.PassWord=e.target.value;
        this.setState({userlog:X});
    }
    changeusername_maillog = (e)=>{
        if(e.target.value!='')this.state.usermailW='';
        else this.state.usermailW="Your Email / Username";
        let X=this.state.userlog;
        X.UserName=e.target.value;
        X.Email=e.target.value;
        this.setState({userlog:X});
    }
//////////////////////////////LOgin
    verfie=(e)=>{
        e.preventDefault();
        let passwordFild=document.getElementById("msg_passwordlog");
        let Matfild=document.getElementById("msg_usernamelog");
        passwordFild.innerHTML="";
        Matfild.innerHTML="user not found"
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
            if(result.respond!==-1){
                Matfild.innerHTML="";
            if(result.respond!==0){
                this.state.userlog=result.DATA;
                this.setinfolog();
                window.location = '/';
            }else   passwordFild.innerHTML="Password incorrect";     
            }   
        },(error)=>{alert('Failed');})
    }
    setinfolog(){
    const { UserName, PassWord } = this.state.userlog;
    const credentialsString = `${UserName}:${PassWord}`;
    const encodedCredentials = btoa(credentialsString);
    this.setCookie('credentials', encodedCredentials, 1);
    this.props.getuserInfo(UserName,PassWord)
    }
    ///////////////////////// Cookies
    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    ////////////////////////////  
    Passwodvision=(e)=>{
        let password= document.getElementById(e.target.getAttribute('eye1'));
        if(password.type==='text'){password.type = 'password';
            e.target.classList.remove("bi-eye-fill");
            e.target.classList.add("bi-eye-slash-fill");
        }
        else{ password.type = 'text';
            e.target.classList.add("bi-eye-fill");
            e.target.classList.remove("bi-eye-slash-fill");
        }
    }
    componentDidMount=()=>{
    }
    render(){
        const {
            userlog,
            passwordW,
            usermailW,
        }=this.state;
        return(
            <div className="fontSignup">
            <div className="container scrollLogin">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <form onSubmit={this.verfie} className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4">Log In</h4>
                                                <div class="inputanim">
                                                    <i class="bi bi-person-fill logI"></i>
                                                    <input type="text" name="logemail1"className="form-style loginput" value={userlog.UserName} onChange={this.changeusername_maillog}  id="logemail1" required/>
                                                    <label>
                                                        {[...usermailW].map((e, i) => (<span style={{transitionDelay:i*40+'ms'}}>{e}</span>))}
                                                    </label>
                                                </div>
                                                <div id='msg_usernamelog'className='text-danger'></div>                                                
                                                <div className="inputanim">
                                                <i className="bi bi-eye-slash-fill logI"eye1="logpass1" onClick={this.Passwodvision}></i>
                                                    <input type="password" name="logpass1" className="form-style loginput"  value={userlog.PassWord} onChange={this.changePasswordlog} id="logpass1" required/>
                                                    <label>
                                                        {[...passwordW].map((e, i) => (<span style={{transitionDelay:i*50+'ms'}}>{e}</span>))}
                                                    </label>
                                                </div>
                                                <div id='msg_passwordlog'className='text-danger m-2'></div>
                                                <input type="submit" className="btn buttn mt-4" value={"Login"}/>
                                              </div>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
            </div>
        </div>
        )
    }
}