import qaris, { type QariKey } from "./qari";

interface QariSelectorProps {
  qariKey: QariKey;
  setQariKey: React.Dispatch<React.SetStateAction<QariKey>>;
}

export const QariSelector: React.FC<QariSelectorProps> = ({
  qariKey,
  setQariKey
}) => {
  return (
    <>
      <div>
        <label htmlFor="qari">Qari</label>
        <select
          className="border-2 rounded p-2 w-full"
          name="qari"
          id="qari"
          value={qariKey}
          size={1}
          onChange={(e) => setQariKey(e.target.value as QariKey)}
        >
          {Object.keys(qaris).map((qariKey) => (
            <option key={qariKey} value={qariKey}>
              {qaris[qariKey as QariKey].name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default QariSelector;
