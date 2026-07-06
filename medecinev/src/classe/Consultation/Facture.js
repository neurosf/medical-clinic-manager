import React, { useRef,useState, useEffect } from 'react';
import { variables } from '../../Variables';
import html2pdf from 'html2pdf.js';

const FormFacture = (props) => {
  const pdfRef = useRef();
  const [MedicamentUsed, setMedicamentUsed] = useState([]);
  const [PrixTotale, setPrixTotale] = useState(0);

  const GetMedicamentUsed = (ID_Cons) => {
    fetch(variables.API_URL + 'Medicamment_consultationGet/' + ID_Cons)
      .then(response => response.json())
      .then(data => {
        let usedMedicament = [];
        let totalPrix = 0;
        data.forEach(D => {
          usedMedicament.push({
            Quantite: D.Quantite,
            Prix: D.Prix,
            Idcons: D.Idcons,
            id_m: D.id_m.id,
            NomMed: D.id_m.Nom_med
          });
          totalPrix += D.Quantite * D.Prix;
        });
        setMedicamentUsed(usedMedicament);
        setPrixTotale(totalPrix);
      });
  };

  useEffect(() => {
    GetMedicamentUsed(props.selectedConsultation.id);
  }, [props.selectedConsultation]);

  const PrintFacture = () => {
    const element = pdfRef.current;
    const printableWindow = window.open('', '_blank');
    const style = printableWindow.document.createElement('style');
    style.innerHTML = `
      body{
        font-family: monospace;
      }
      .InfoLable {
        color: #324659;
        text-decoration: none;
        font-size: 22px;font-family:
        monospace;font-weight: 600;
        padding: 1%;
      }
      span.InfoPDr{
        margin: 1%;
        font-size: larger;
        width: max-content;
        color: #464040;
      }
      .flexFactur{
          display: flex;
          justify-content: space-between;
      }
      .inbutgFactur{
          display: flex;
          justify-content: center;
          width: 100%;
      }
      h4 {
        font-weight: 600;
        font-size: calc(1.275rem + .3vw);
      }
      .table {
        width:100%;
        font-size: larger;
      }
      td.Medicamentdisc {
        text-align: center;
      }
    `;
    printableWindow.document.write(style.outerHTML);
    printableWindow.document.write(element.outerHTML);
    printableWindow.document.write("<style></style><script>window.print();window.close();</script>");
  };

  const handleGenerateCertificate = async () => {
    const opt = {
      margin: 10,
      filename: 'Facture'+props.selectedConsultation.id+ '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: [297, 420], orientation: 'portrait' }, // Facture size (A4) in mm
    };
    const element = pdfRef.current;
    html2pdf().from(element).set(opt).save();
  };
  const {
    selectedConsultation,
    modalTitle,
  } = props;

  return (
    <>
      <div className="modal fade" id="FactureForm" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content"  style={{ width: "500px", margin: "auto" }}>
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <div className='d-flex'>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
            <form className="modal-body" ref={pdfRef} style={{ width: "500px", margin: "auto" ,textAlign: 'left' }}>
                      <div>
                        <div>
                            <div className='flexFactur'>
                                <a className='InfoLable'to={"/Consultation/"+selectedConsultation.id}>Consultation <span>#{selectedConsultation.id}</span></a>
                                <a className='InfoLable'to={"/Patient/"+selectedConsultation.idD.Id_P.id}>{selectedConsultation.idD.Id_P.Nom+" "+selectedConsultation.idD.Id_P.Prenom}</a>
                             </div>
                            <div className='flexFactur'>
                                <div className="inbutgFactur">
                                    <span className="InfoLable">Date :</span>
                                    <span className="InfoPDr">{(selectedConsultation.DateC.split('T')[0])}</span>
                                </div>
                                <div className="inbutgFactur">
                                    <span className="InfoLable">temps :</span>
                                    <span className="InfoPDr">{(selectedConsultation.DateC.split('T')[1])}</span>
                                </div>
                            </div>
                            <div className='flexFactur'>
                                <div className="inbutgFactur">
                                    <span className="InfoLable">Prix de Consultation :</span>
                                    <span className="InfoPDr">{(selectedConsultation.Prix+" Da")}</span>
                                </div>
                            </div>
                            <div>
                                <h4>Medicament Utilise</h4>
                                <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Produit</th>
                                                <th>Quantite</th>
                                                <th>Prix unitaire</th>
                                                <th>Prix</th>
                                            </tr>
                                        </thead>
                            {MedicamentUsed.map((M,i)=>(
                                        <tr>
                                            <td className='MedicamentName'>{M.NomMed}</td>
                                            <td className='Medicamentdisc'>{"x"+M.Quantite}</td>
                                            <td className='Medicamentdisc'>{M.Prix+" Da"}</td>
                                            <td className='Medicamentdisc'>{M.Prix*M.Quantite+" Da"}</td>
                                        </tr>
                                        ))} </table>
                            </div>
                            <div className="d-flex p-1 mb-1">
                                <span className="InfoLable">Prix Totale des Medicament:</span>
                                <span className="InfoPDr">{PrixTotale+" Da"}</span>
                            </div>
                            <div className="d-flex p-1 mb-1">
                                <span className="InfoLable">Prix Totale de Consultasion:</span>
                                <span className="InfoPDr">{(selectedConsultation.Prix_Totale+" Da")}</span>
                            </div>
                            <div className="d-flex p-1 mb-1">
                                <span className="InfoLable">Prix payé:</span>
                                <span className="InfoPDr">{selectedConsultation.Prix_paye+" Da"}</span>
                            </div>
                            <div className="d-flex p-1 mb-1">
                                <span className="InfoLable">Le montant restant à payer:</span>
                                <span className="InfoPDr">{(selectedConsultation.Prix_Totale-selectedConsultation.Prix_paye)+" Da"}</span>
                            </div>
                        </div>
                      </div>
                    </form>
                    <div className='d-flex'>
                        <button className='btn7 w-50 m-1' onClick={handleGenerateCertificate}>Save Certificate as pdf</button>
                        <button className='btn7 w-50 m-1' onClick={PrintFacture}>Printe Certificate</button>
                    </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormFacture;