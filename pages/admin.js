import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // 👈 import nécessaire pour redirection
import { getClients, createClient, deleteClient } from '@/utils/api';
import { useAuth } from '@/context/Authcontext';

const AdminPage = () => {
  const { isAuth } = useAuth();
  const [clients, setClients] = useState([]);
  const [newClientName, setNewClientName] = useState('');
  const router = useRouter(); // pour redirection

  useEffect(() => {
    if (!isAuth) {
      router.push('/login'); // redirection si non-authentifié
    } else {
      loadClients(); // charge les clients seulement si authentifié
    }
  }, [isAuth]);

  const loadClients = async () => {
    try {
      const data = await getClients();
	setClients(data);
    } catch (error) {
      console.error('Erreur chargement clients :', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createClient({ name: newClientName });
      setNewClientName('');
      loadClients();
    } catch (err) {
      console.error('Erreur création client :', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce client ?')) return;
    try {
      await deleteClient(id);
      loadClients();
    } catch (err) {
      console.error('Erreur suppression client :', err);
    }
  };

  //blocker en attendant la redirection
  if (!isAuth) return null;

  return (
    <div className="container">
      <h1>Gérer mes Décodeurs</h1>

      <div className="card">
        <h2>Ajouter un décodeur</h2>
        <input
          type="text"
          placeholder="Nom du client"
          value={newClientName}
          onChange={(e) => setNewClientName(e.target.value)}
        />
        <button onClick={handleCreate}>Créer</button>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h2>Liste de mes décodeurs</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.id} style={{ marginBottom: '12px' }}>
              {client.name}
              <button style={{ marginLeft: '12px' }} onClick={() => handleDelete(client.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
