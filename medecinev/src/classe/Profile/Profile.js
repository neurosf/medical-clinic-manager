import React,{Component} from 'react';

import './Profile.css'
import { Formmedecin } from '../Medecin/Formmedecin';
import { NavLink } from 'react-router-dom';
import { variables } from '../../Variables';

export class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
           
        };
    }
    render(){
        const {
            userlog,
            log,
        }=this.props;
      return(
        <div className="Profile rounded p-3"  >
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-md-10 mt-5 pt-5">
                <div className="row z-depth-3">
                  <div className="col-sm-4 bg-info rounded-left">
                    <div className="card-block text-center text-white">
                      <i className="fas fa-user-tie fa-7x mt-5 w-100"></i>
                      <h2 className="font-weight-bold mt-4"> {userlog.UserName}</h2>
                    {
                      log==2? <p>Medecin</p>
                      : <p>Employé</p>
                    } 
                      <i className="far fa-edit fa-2x mt-5 mb-4"   data-bs-toggle="modal"data-bs-target="#medecinform "></i>
                    </div>
                  </div>
                  <div className="col-sm-8 bg-white rounded-right">
                    <h3 className="mt-3 text-center">Vos informations personnelles</h3>
                    <hr className="bg-primary mt-0" style={{ height: '2px', width: '100%' }} />
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="font-weight-bold">Nom:</p>
                        <h6 className="text-muted">{userlog.Nom}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-weight-bold">Prenom:</p>
                        <h6 className="text-muted">{userlog.Prenom}</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="font-weight-bold">Email:</p>
                        <h6 className="text-muted">{userlog.email}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-weight-bold">Username:</p>
                        <h6 className="text-muted">{userlog.UserName}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-weight-bold">Telephone:</p>
                        <h6 className="text-muted">{userlog.Ntel}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-weight-bold">Fonction:</p>
                        <h6 className="text-muted">{userlog.Type}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-weight-bold">Mot de passe:</p>
                        <h6 className="text-muted">{userlog.PassWord}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Formmedecin log={log} selectedmedecin={userlog} modalTitle={"Modefier Profile"} refreshList={()=>this.refreshList()}/>
        </div>
      )
    }
} 
