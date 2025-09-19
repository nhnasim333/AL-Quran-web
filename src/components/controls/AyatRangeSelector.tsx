import type { SURAH } from "../../_main/types";

interface AyatRangeSelectorProps {
  ayatRange: [number, number];
  setAyatRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  surah: SURAH;
}

export const AyatRangeSelector: React.FC<AyatRangeSelectorProps> = ({
  ayatRange,
  setAyatRange,
  surah,
}) => {
  const [startingAyatNumber, endingAyatNumber] = ayatRange;

  return (
    <>
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <label htmlFor="startingAyatNumber">Starting</label>
          <select
            className="border-2 rounded p-2"
            name="startingAyatNumber"
            id="startingAyatNumber"
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
        <div className="flex gap-2 items-center">
          <label htmlFor="endingAyatNumber">Ending</label>
          <select
            className="border-2 rounded p-2"
            name="endingAyatNumber"
            id="endingAyatNumber"
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
    </>
  );
};

export default AyatRangeSelector;
