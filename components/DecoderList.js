import DecoderCard from './DecoderCard';

const DecoderList = ({ decoders, onRestart, onRemove, refresh }) => {
  if (!decoders || decoders.length === 0) {
    return (
      <div className="card">
        <p>Aucun décodeur trouvé pour ce client.</p>
      </div>
    );
  }

  return (
    <div>
      {decoders.map((decoder) => (
        <DecoderCard
          key={decoder.id}
          decoder={decoder}
          onRestart={onRestart}
          onRemove={onRemove}
          refresh={refresh}
        />
      ))}
    </div>
  );
};

export default DecoderList;
