import "./FooterStyle.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>SALON FRYZJERSKI Kreacje I Nożyczki</p>
        <br />
        <p>ul. Jakaś 4 lok. 20</p>
        <p>tel. 123 456 789</p>
        <br />
        <p>Godziny otwarcia:</p>
        <p>pon.-pt.: 9.00 - 19.00</p>
        <p>sobota: 9.00 - 14.00</p>
      </div>
    </footer>
  );
};

export default Footer;
