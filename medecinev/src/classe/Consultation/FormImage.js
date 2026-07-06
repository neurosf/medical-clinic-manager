import React,{Component} from 'react';
import { variables } from '../../Variables';

export class FormImage  extends Component{

    constructor(props){
        super(props);
        this.state={
            SavedImage:{},
        }
    }
//////////////////////set state var
    selectImage=(e)=>{
        this.state.SavedImage = e.target.files[0];
        this.readURL(e);
    }
    readURL=(e)=>{
        if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(('ImageSelected')).setAttribute('src', e.target.result)
        };
        reader.readAsDataURL(e.target.files[0]);
        }
    }
/////////////////////////Actions in API
    SubmitImaeg = (e) => {
        e.preventDefault();
        const { SavedImage } = this.state;
        
        const formData = new FormData();
        formData.append('image', SavedImage); 
        formData.append('Idcons', this.props.Idcons);

        this.createClick(formData);
    }
    createClick(formData) {
        fetch(variables.API_URL + 'image-consultations/', {
            method: 'POST',
            body: formData, 
        })
        .then(res => res.json())
        .then((result) => {
            this.props.refreshList();
        })
        .catch((error) => {
            alert('Failed');
        });
    }
    render(){
        const {
            modalTitle,
        }=this.props;
        const {
            SavedImage,
        }=this.state;
        return(
                <div className="modal fade" id="PhotosForm" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className="modal-body" onSubmit={(e)=>this.SubmitImaeg(e)} encType="multipart/form-data">
                        <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="p-2 w-100 m-auto bd-highlight">
                            <div className='d-flex justify-content-between'>
                            </div>
                            <div className='d-flex flex-column m-2'>
                                <img src={SavedImage} id="ImageSelected" alt="" width='150px'></img>
                                <label class="custom-file-upload">
                                    <input type="file" onChange={this.selectImage}/>
                                    selectione une image
                                </label>
                            </div>
                        </div>
                        </div>
                        <button type="submit"className="btn3 float-start"data-bs-dismiss="modal" aria-label="Close">Create</button>
                    </form>

                    </div>
                    </div> 
                </div>  
        )
    }
}