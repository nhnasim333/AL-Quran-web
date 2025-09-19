import { surahs } from "../../_main/config";
interface SurahSelectorProps {
  surahNumber: number;
  setSurahNumber: React.Dispatch<React.SetStateAction<number>>;
  setAyatRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export const SurahSelector: React.FC<SurahSelectorProps> = ({
  surahNumber,
  setSurahNumber,
  setAyatRange,
}) => {
  return (
    <>
      <div>
        <label htmlFor="surah">Surah</label>
        <select
          className="border-2 rounded p-2 w-full"
          name="surah"
          id="surah"
          value={surahNumber}
          size={1}
          onChange={(e) => {
            const surahNumber = parseInt(e.target.value);
            setSurahNumber(surahNumber);
            const surah = surahs[surahNumber - 1];
            setAyatRange([1, surah.numberOfAyats]);
          }}
        >
          {surahs.map(({ number, name, nameEnglish }) => (
            <option key={name} value={number}>
              {number}. {name}: {nameEnglish}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SurahSelector;
