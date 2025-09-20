import qaris, { type QariKey } from "./qari";

interface QariSelectorProps {
  qariKey: QariKey;
  setQariKey: React.Dispatch<React.SetStateAction<QariKey>>;
}

const QariSelector: React.FC<QariSelectorProps> = ({ qariKey, setQariKey }) => (
  <div>
    <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor="qari"
    >
      Qari (Reciter)
    </label>
    <select
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
      name="qari"
      id="qari"
      value={qariKey}
      onChange={(e) => setQariKey(e.target.value as QariKey)}
    >
      {Object.entries(qaris).map(([key, qari]) => (
        <option key={key} value={key}>
          {qari.name}
        </option>
      ))}
    </select>
  </div>
);

export default QariSelector;
