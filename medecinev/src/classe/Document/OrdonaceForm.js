import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';

import './Documents.css';

const OrdonaceForme = ({selectedConsultation,Traitement}) => {
  const pdfRef = useRef();

  const handleGenerateOrdonace = async () => {
    const opt = {
        margin: 10,
        filename: 'medical_Ordonace.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
      };
  
      const element = pdfRef.current;
      html2pdf().from(element).set(opt).save(); //save in downloade
  };
  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const now = new Date();
    const ageDiff = now - dob;

    const ageDate = new Date(ageDiff); // Convert the difference to a date
    const calculatedAge = ageDate.getUTCFullYear() - 1970; // Get the years from the date
  
    return calculatedAge;
  }
  const handlePrint = () => {
    const element = pdfRef.current;
    const printableWindow = window.open('', '_blank');
    const style = printableWindow.document.createElement('style');
    style.innerHTML = `
    .Ordonnance{
        color: #272746;
        max-width: 700px;
      }
    .Ordonnance p {
        margin: 0pt;
      }
      .Ordonnance ul {
        list-style: circle;
      }
      .Ordonnance .name {
        font-family: Calibri;
        font-size: 17pt;
      }
      .Ordonnance .nameAR {
        font-family: Calibri;
        font-size: 20pt;
      }
      .Ordonnance .small-name {
        font-family: Calibri;
        font-size: 14pt;
      }
      .Ordonnance .large-name {
        font-family: Calibri;
        font-size: 36pt;
      }
      .Ordonnance .separator {
        font-family: Calibri;
        font-size: 14pt;
      }
      .Ordonnance .contact {
        font-family: Calibri;
        font-size: 14pt;
      }
      .Ordonnance .ord-title {
        font-family: Calibri;
        font-size: 36pt;
      }
      .Ordonnance .containeror{
        text-align: center;
        display: flex;
        justify-content: space-between;
      }
      .Ordonnance .TitleOr{
        text-align: center;
      }
      .Ordonnance .Cordonne{
        display: flex;
        justify-content: space-around;
        font-size: 19px;
        font-family: monospace;
      }
      .Ordonnance .Cordonne div{
        margin: 1%;
      }
      .Ordonnance .Cordonne span{
        font-weight: 600;
        padding: 3%;
      }
      .Ordonnance .Traitement{
        margin: auto;
        margin-left: 10%;
        font-size: 20px;
        font-family: system-ui;
      }
      .Ordonnance .Traitement li{
        margin-bottom: 20px;
      }
      .Ordonnance .datetoday{
        font-size: 19px;
        font-family: monospace;
        font-weight: 600;
        text-align: end;
        margin: 1%;
      }
    `;
    printableWindow.document.write(style.outerHTML);
    printableWindow.document.write(element.outerHTML);
    printableWindow.document.write("<style></style><script>window.print();window.close()</script>")
  };

  return (
    <div className="modal fade" id="FormMedOrdonace" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content" style={{width:"500px",margin:"auto"}}>
    <div className="modal-header">

        <h5 className="modal-title">Ordonace</h5>
        <div className='d-flex'>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    </div>
        <div className="Ordonnance" ref={pdfRef}>
            <div className="containeror">
                <div>
                    <p className="name">Dr.M CHIKH BAELHADJ</p>
                    <p className="name">Medecin Généraliste</p>
                    <p className="separator">——***——</p>
                    <p className="small-name">N du conseil de l'ordre des medecin:16/14391</p>
                    <p className="small-name">Add :Bat 11 n° 1,Cité El Djaouhara (ex Les halles )</p>
                    <p className="small-name">Belouizdad</p>
                    <p className="separator">——***——</p>
                    <p className="contact">Tél: 021672022 / 0664648888</p>
                </div>
                <div>
                    <p className="nameAR">الحكيم : م الشيخ بالحاج</p>
                    <p className="nameAR">طبيب عام</p>
                </div>
            </div>
            <div className="TitleOr">
                <p className="large-name">وصفة</p>
                <p className="large-name">——***——</p>
                <p className="large-name">Ordonnance</p>
            </div>
            <div className='datetoday'>
                <p>Le: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="Cordonne">
                <div className="CordCont">
                    <div><span>Nom:</span>{selectedConsultation.idD.Id_P.Nom}</div>
                    <div><span>Prenom:</span>{selectedConsultation.idD.Id_P.Prenom}</div>
                </div>
                <div className="CordCont">
                    <div><span>Age:</span>{calculateAge(selectedConsultation.idD.Id_P.Date_naiss)}</div>
                    <div><span>Sexe:</span>{selectedConsultation.idD.Id_P.Sexe}</div>
                </div>
            </div>
            <div className="Traitement">
                <ul>
                    {Traitement.map((M,i)=>(
                        <li>{M.NomMed} {M.description}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div className='d-flex'>
          <button className='btn7 w-50 m-1' onClick={handleGenerateOrdonace}>Save Ordonace as pdf</button>
          <button className='btn7 w-50 m-1' onClick={handlePrint}>Printe Ordonace</button>
        </div>
    </div>
    </div> 
</div>
);
};

export default OrdonaceForme;
