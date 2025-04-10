import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDecodersForClient,
  removeDecoderFromClient,
  restartDecoder,
  getDecoderStatus,
} from '@/utils/api';
import { useAuth } from '@/context/Authcontext';

const ClientPage = () => {
  const { isAuth } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [decoders, setDecoders] = useState([]);

  useEffect(() => {
    if (id && isAuth) {
      loadDecoders();
    }
  }, [id, isAuth]);

  const loadDecoders = async () => {
    try {
      const data = await getDecodersForClient(id);
      setDecoders(data);
    } catch (err) {
      console.error('Erreur chargement décodeurs :', err);
    }
  };

  const handleRestart = async (decoderId) => {
    try {
      await restartDecoder(decoderId);
      alert('Décodeur redémarré');
    } catch (err) {
      console.error('Erreur redémarrage :', err);
    }
  };

  const handleRemove = async (decoderId) => {
    try {
      await removeDecoderFromClient(id, decoderId);
      loadDecoders();
    } catch (err) {
      console.error('Erreur suppression décodeur :', err);
    }
  };

  if (!isAuth) return <p>Accès refusé</p>;

  return (
    <div className="container">
      <h1>Décodeurs du client #{id}</h1>
      <div className="card">
        {decoders.length === 0 ? (
          <p>Aucun décodeur trouvé.</p>
        ) : (
          decoders.map((d) => (
            <div key={d.id} className="card" style={{ marginBottom: '16px' }}>
              <h3>{d.nom || `Décodeur #${d.id}`}</h3>
              <p>Status: {d.status || 'Inconnu'}</p>
              <button onClick={() => handleRestart(d.id)}>Redémarrer</button>
              <button onClick={() => handleRemove(d.id)} style={{ marginLeft: '10px' }}>
                Supprimer
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientPage;
