import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./NavbarStyle.css";
import { useApi } from "../../hooks/useApi";
import { logoutUser } from "../../api/auth";
import { useAuthModal } from "../../context/AuthModalContext";
import { ModalStateEnum } from "../../types/AuthModal";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { mutate } = useApi<unknown, unknown>(logoutUser);
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { openModal } = useAuthModal();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Nożyczki I Kreacje</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/news">Aktualności</Link>
        </li>
        <li>
          <Link to="/team">Zespół</Link>
        </li>
        <li>
          <Link to="/services">Oferta</Link>
        </li>
        <li>
          <Link to="/contact">Kontakt</Link>
        </li>
        {user && (
          <li className="account-dropdown" onMouseEnter={() => setIsDropdownVisible(true)} onMouseLeave={() => setIsDropdownVisible(false)}>
            Moje konto
            {isDropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/my-profile">Moje dane</Link>
                <Link to="/my-appointments">Moje wizyty</Link>
                <button
                  onClick={() =>
                    mutate(
                      {},
                      {
                        onSuccess: () => {
                          logout();
                          navigate("/");
                        },
                      }
                    )
                  }
                >
                  Wyloguj się
                </button>
              </div>
            )}
          </li>
        )}
        {!user && (
          <li>
            <button onClick={() => openModal(ModalStateEnum.LOGIN)}>Logowanie</button>
          </li>
        )}

        <div className="appointment-button">{user ? <Link to="/book-online">Umow wizyte online</Link> : <div></div>}</div>
      </ul>
    </nav>
  );
};

export default Navbar;
