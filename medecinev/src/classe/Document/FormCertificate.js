import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';

import './Documents.css';

const FormMedCertificate = ({formData}) => {
  const pdfRef = useRef();

  const handleGenerateCertificate = async () => {
    const opt = {
        margin: 10,
        filename: 'medical_certificate.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
      };
  
      const element = pdfRef.current;
      html2pdf().from(element).set(opt).save(); //save in downloade
  };
  const handlePrint = () => {
    const element = pdfRef.current;
    const printableWindow = window.open('', '_blank');
    const style = printableWindow.document.createElement('style');
    style.innerHTML = `
    .medical-certificate-form-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .medical-certificate {
        border: 1px solid #ccc;
        padding: 20px;
        margin-top: 10px;
      }
    `;
    printableWindow.document.write(style.outerHTML);
    printableWindow.document.write(element.outerHTML);
    printableWindow.document.write("<style></style><script>window.print();window.close()</script>")
  };

  return (
    <div className="modal fade" id="FormMedCertificate" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content" style={{width:"500px",margin:"auto"}}>
    <div className="modal-header">
        <h5 className="modal-title">Medical Certificate</h5>
        <div className='d-flex'>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    </div>
          <div className="medical-certificate" ref={pdfRef}>
            <div>
            <h2>Medical Certificate</h2>
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Patient Name: {formData.patientFirstName} {formData.patientLastName}</p>
            <p>Sex: {formData.patientSex}</p>
          </div>
        </div>
        <div className='d-flex'>
          <button className='btn7 w-50 m-1' onClick={handleGenerateCertificate}>Save Certificate as pdf</button>
          <button className='btn7 w-50 m-1' onClick={handlePrint}>Printe Certificate</button>
        </div>
    </div>
    </div> 
</div>
);
};

export default FormMedCertificate;
