import type { SURAH } from "../../_main/types";

interface AyatRangeSelectorProps {
  ayatRange: [number, number];
  setAyatRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  surah: SURAH;
}

const AyatRangeSelector: React.FC<AyatRangeSelectorProps> = ({
  ayatRange,
  setAyatRange,
  surah,
}) => {
  const [startingAyatNumber, endingAyatNumber] = ayatRange;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Ayat Range
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">From</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            value={startingAyatNumber}
            onChange={(e) => {
              const selectedStartingAyatNumber = parseInt(e.target.value);
              if (selectedStartingAyatNumber > endingAyatNumber) {
                setAyatRange([
                  selectedStartingAyatNumber,
                  selectedStartingAyatNumber,
                ]);
                return;
              }
              setAyatRange([selectedStartingAyatNumber, endingAyatNumber]);
            }}
          >
            {Array.from({ length: surah.numberOfAyats }).map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">To</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            value={endingAyatNumber}
            onChange={(e) => {
              const selectedEndingAyatNumber = parseInt(e.target.value);
              if (selectedEndingAyatNumber < startingAyatNumber) {
                setAyatRange([
                  selectedEndingAyatNumber,
                  selectedEndingAyatNumber,
                ]);
                return;
              }
              setAyatRange([startingAyatNumber, selectedEndingAyatNumber]);
            }}
          >
            {Array.from({
              length: surah.numberOfAyats - startingAyatNumber + 1,
            }).map((_, index) => {
              const ayatNumber = startingAyatNumber + index;
              return (
                <option key={ayatNumber} value={ayatNumber}>
                  {ayatNumber}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AyatRangeSelector;
