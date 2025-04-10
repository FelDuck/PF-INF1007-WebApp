import Link from 'next/link';

export default function Signup() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Créer un compte</h1>
      <form style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Nom d'utilisateur</label>
          <input type="text" name="username" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Mot de passe</label>
          <input type="password" name="password" style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Créer le compte</button>
      </form>
      <p style={styles.link}>
        Vous avez déjà un compte ? <Link href="/login">Connectez-vous</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '4rem auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  link: {
    textAlign: 'center',
    marginTop: '1rem',
  },
};
