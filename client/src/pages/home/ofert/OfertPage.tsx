import React from "react";

import "./OfertPageStyle.css";

const OfertPage: React.FC = () => {
  return (
    <div className="oferta-container">
      <h2 className="oferta-title">Nasza Oferta</h2>
      <table className="services-table">
        <thead>
          <tr>
            <th>Strzyzenie Meskie</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>STRZYŻENIE MĘSKIE - włosy krótkie</td>
            <td>50 zł</td>
          </tr>
          <tr>
            <td>TRYMOWANIE BRODY - kontur maszynką</td>
            <td>50 zł</td>
          </tr>
          <tr>
            <td>COVER 5 (tuszowanie siwych włosów)</td>
            <td>50 zł</td>
          </tr>
          <tr>
            <td>STRZYŻENIE GRZYWKI</td>
            <td>50 zł</td>
          </tr>
        </tbody>
      </table>

      <table className="services-table">
        <thead>
          <tr>
            <th>Strzyzenie Damskie</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>STRZYŻENIE MĘSKIE - włosy krótkie</td>
            <td>50 zł</td>
          </tr>
          <tr>
            <td>TRYMOWANIE BRODY - kontur maszynką</td>
            <td>50 zł</td>
          </tr>
          <tr>
            <td>COVER 5 (tuszowanie siwych włosów)</td>
            <td>50 zł</td>
          </tr>
          <tr>
            <td>STRZYŻENIE GRZYWKI</td>
            <td>50 zł</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OfertPage;
