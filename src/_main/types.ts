type Brand<K, T> = K & { __brand: T };
export type TrackUrl = Brand<string, "TrackUrl">;

export type TrackObject = {
  surahNumber: number;
  ayatNumber: number;
  trackUrl: TrackUrl;
};

export type SURAH = {
  number: number; // TODO type so that its 1 to 114
  name: string;
  nameEnglish: string;
  numberOfAyats: number; // TODO type so that its 3 to 200
};
