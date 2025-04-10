import { useEffect, useState } from 'react';
import { addChannel, removeChannel } from '@/utils/api';

const ChannelManager = ({ decoderId, channels = [], refreshChannels }) => {
  const [newChannel, setNewChannel] = useState('');

  const handleAdd = async () => {
    if (!newChannel.trim()) return;
    try {
      await addChannel(decoderId, { name: newChannel });
      setNewChannel('');
      refreshChannels(); // recharge la liste des chaînes
    } catch (err) {
      console.error('Erreur ajout chaîne :', err);
    }
  };

  const handleRemove = async (channelId) => {
    try {
      await removeChannel(decoderId, channelId);
      refreshChannels();
    } catch (err) {
      console.error('Erreur suppression chaîne :', err);
    }
  };

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3>Gestion des chaînes</h3>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Nom de la chaîne"
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value)}
        />
        <button onClick={handleAdd}>Ajouter</button>
      </div>

      {channels.length === 0 ? (
        <p>Aucune chaîne assignée.</p>
      ) : (
        <ul>
          {channels.map((ch) => (
            <li key={ch.id} style={{ marginBottom: '8px' }}>
              {ch.name}
              <button
                onClick={() => handleRemove(ch.id)}
                style={{ marginLeft: '10px' }}
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChannelManager;
