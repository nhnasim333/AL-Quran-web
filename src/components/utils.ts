import type { TrackObject, TrackUrl } from "../_main/types";
import { REPEAT_SOUND_TRACK } from "./controls/AyatList";
import qaris, { type QariKey } from "./controls/qari";

const audioExtention = "mp3"; // 'opus' | 'mp3'
const audioSrcBaseUrl = `https://everyayah.com/data`;

export const getTracksToPlay = (
  ayatRange: [number, number],
  shouldRepeat: boolean,
  surahNumber: number,
  qariKey: QariKey
): TrackObject[] => {
  const [startingAyatNumber, endingAyatNumber] = ayatRange;
  let ayatNumber = startingAyatNumber - 1;

  const trackObjects: TrackObject[] = Array.from({
    length: endingAyatNumber - ayatNumber,
  }).map(() => {
    ayatNumber++;

    const track = `${surahNumber.toString().padStart(3, "0")}${ayatNumber
      .toString()
      .padStart(3, "0")}`;

    const qariUrlPath = qaris[qariKey].urlPath;
    const trackUrl: TrackUrl =
      `${audioSrcBaseUrl}/${qariUrlPath}/${track}.${audioExtention}` as TrackUrl;

    return {
      surahNumber,
      ayatNumber,
      trackUrl,
    };
  });

  if (shouldRepeat) {
    trackObjects.push({
      surahNumber,
      ayatNumber,
      trackUrl: REPEAT_SOUND_TRACK,
    });
  }

  return trackObjects;
};

export const getActiveAyatNumber = (activeTrackUrl: TrackUrl): number => {
  const lengthOfAudioExtentionPlusDot = audioExtention.length + 1;
  const lengthOfTrackNumber = 6;
  const track = activeTrackUrl.slice(
    activeTrackUrl.length - lengthOfAudioExtentionPlusDot - lengthOfTrackNumber,
    activeTrackUrl.length - lengthOfAudioExtentionPlusDot
  );
  return parseInt(track.split("").slice(3).join("")) | 0;
};
