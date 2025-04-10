import ChannelManager from './ChannelManager';

const DecoderCard = ({ decoder, onRestart, onRemove, refresh }) => {
  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <h3>{decoder.nom || `Décodeur #${decoder.id}`}</h3>
      <p><strong>Statut :</strong> {decoder.status || 'Inconnu'}</p>

      <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
        <button onClick={() => onRestart(decoder.id)}>Redémarrer</button>
        <button onClick={() => onRemove(decoder.id)}>Retirer</button>
      </div>

      {/* Gestion des chaînes intégrée */}
      <ChannelManager
        decoderId={decoder.id}
        channels={decoder.channels || []}
        refreshChannels={refresh}
      />
    </div>
  );
};

export default DecoderCard;
