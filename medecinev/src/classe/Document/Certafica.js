import React, { useRef, useState } from 'react';
import FormMedCertificate from './FormCertificate';
import './Documents.css';

const MedicalCertificate = () => {
  const pdfRef = useRef();
  const [formData, setFormData] = useState({
    patientFirstName: '',
    patientLastName: '',
    patientSex: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (<div className='Documents'>
  <br/><br/><br/><br/><br/>
    <form className="medical-certificate-form-container">
      <h2>Certificat medical form</h2>
      <div className="form-group m-1">
        <input type="text" name="patientFirstName" value={formData.patientFirstName} onChange={handleChange} required />
        <span>First Name:</span>
      </div>
      <div className="form-group m-1">
        <input type="text" name="patientLastName" value={formData.patientLastName} onChange={handleChange} required />
        <span>Last Name:</span>
      </div>
      <div className="form-group m-1">
        <select name="patientSex"  className="form-control" value={formData.patientSex} onChange={handleChange} required>
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <span>Sexe:</span>
      </div>
             <button type="button" className="btn7 w-50 float-end" 
                data-bs-toggle="modal"data-bs-target="#FormMedCertificate">
                    Get Certificate
            </button>
    </form>
    <FormMedCertificate formData={formData} />
  </div>);
};

export default MedicalCertificate;
