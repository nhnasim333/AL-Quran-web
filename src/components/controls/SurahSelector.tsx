import { surahs } from "../../_main/config";
interface SurahSelectorProps {
  surahNumber: number;
  setSurahNumber: React.Dispatch<React.SetStateAction<number>>;
  setAyatRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const SurahSelector: React.FC<SurahSelectorProps> = ({
  surahNumber,
  setSurahNumber,
  setAyatRange,
}) => (
  <div>
    <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor="surah"
    >
      Surah
    </label>
    <select
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
      name="surah"
      id="surah"
      value={surahNumber}
      onChange={(e) => {
        const newSurahNumber = parseInt(e.target.value);
        setSurahNumber(newSurahNumber);
        const selectedSurah = surahs[newSurahNumber - 1];
        setAyatRange([1, selectedSurah.numberOfAyats]);
      }}
    >
      {surahs.map(({ number, name, nameEnglish }) => (
        <option key={number} value={number}>
          {number}. {name} ({nameEnglish})
        </option>
      ))}
    </select>
  </div>
);

export default SurahSelector;
