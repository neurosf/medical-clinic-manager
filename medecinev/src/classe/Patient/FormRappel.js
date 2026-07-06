import React,{Component} from 'react';

export class FormRappel  extends Component{

    constructor(props){
        super(props);
        this.state={
            rappel:{
                Num_Rappel:0,
                Date:this.props.GetDate(),
                Id_EXR:""
            },
        }
    }
//////////////////////set state var
    handleChangeDate =(e)=>{
    let X= this.state.rappel;
    X.Date= e.target.value
    this.setState({rappel:X});
    };
/////////////////////////Actions in API
    Submit=(e)=>{ 
        e.preventDefault();
        this.state.rappel.Num_Rappel = this.props.Nbr_rappel+1;
        this.props.AddRappel(this.state.rappel);
        this.setState({
            rappel:{
                Num_Rappel:"",
                Date:this.props.GetDate(),
                Id_EXR:""
            },
        })
    }
    render(){
        const {
            rappel,
        }=this.state;
        return(<>
                <div className="modal fade" id="RappelForm" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content w-75 m-auto">
                    <div className="modal-header">
                        <h5 className="modal-title">Ajouter un Rappel</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form className="modal-body" onSubmit={(e)=>this.Submit(e)}>
                        <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="p-2 w-75  m-auto bd-highlight">
                        <div className='d-flex justify-content-between'>
                        </div>
                                <div className="p-1 mb-3">
                                    <input type="datetime-local"value={rappel.Date.split('Z')[0]} onChange={this.handleChangeDate} required/>
                                    <span>Date</span>
                            </div>
                        </div>
                        </div>
                            <button type="submit"className="btn4 float-start">add</button>
                    </form>
                    </div>
                    </div> 
                </div>
         </> 
        )
    }
}