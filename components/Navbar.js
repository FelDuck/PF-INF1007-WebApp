import Link from 'next/link';
import { useState } from 'react';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [showWarning, setShowWarning] = useState(false);

  const handleLogoClick = (e) => {
    if (isAuthenticated) {
      e.preventDefault(); // empêcher la redirection
      setShowWarning(true);
    }
  };

  const handleLogout = () => {
    onLogout();             
    router.push('/login');  
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link href="/login" onClick={handleLogoClick}>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2563eb', cursor: 'pointer' }}>
              DécodeurApp
            </span>
          </Link>
        </div>

        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <button onClick={onLogout} style={{ marginLeft: '16px' }}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Connexion</Link>
              <Link href="/signup" style={{ marginLeft: '16px' }}>Créer un compte</Link>
            </>
          )}
        </div>
      </nav>

      {showWarning && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <p style={{ marginBottom: '1rem' }}>
              ⚠️ Vous devez vous déconnecter afin de retourner au menu de connexion.<br />
              Appuyez sur "Déconnexion".
            </p>
            <button onClick={() => setShowWarning(false)} style={styles.button}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    textAlign: 'center',
    maxWidth: '400px',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1.2rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Navbar;
