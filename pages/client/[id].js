import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDecodersForClient,
  removeDecoderFromClient,
  restartDecoder,
  getDecoderStatus,
  reinitDecoder,
  shutdownDecoder
} from '@/utils/api';
import { useAuth } from '@/context/Authcontext';

const ClientPage = () => {
  const { isAuth, isLoading } = useAuth();
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

  if (isLoading) return <p>Chargement de l’authentification...</p>;
  if (!isAuth) return <p>Accès refusé</p>;

  return (
    <div className="container">
      <h1>Décodeurs du client #{id}</h1>

      {/* Boutons globaux */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={async () => {
            for (const decoder of decoders) {
              await reinitDecoder(decoder.id);
            }
            alert('Tous les décodeurs ont été réinitialisés.');
          }}
          style={{ backgroundColor: '#facc15', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Réinitialiser tous
        </button>

        <button
          onClick={async () => {
            for (const decoder of decoders) {
              await restartDecoder(decoder.id);
            }
            alert('Tous les décodeurs ont été redémarrés.');
          }}
          style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Redémarrer tous
        </button>

        <button
          onClick={async () => {
            for (const decoder of decoders) {
              await shutdownDecoder(decoder.id);
            }
            alert('Tous les décodeurs ont été éteints.');
          }}
          style={{ backgroundColor: '#9ca3af', color: 'white', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Éteindre tous
        </button>

        <button
          onClick={async () => {
            for (const decoder of decoders) {
              await removeDecoderFromClient(id, decoder.id);
            }
            loadDecoders();
            alert('Tous les décodeurs ont été supprimés.');
          }}
          style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Supprimer tous
        </button>
      </div>

      {/* Liste des décodeurs */}
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
