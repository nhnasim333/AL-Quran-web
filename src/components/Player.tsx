import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
  type SyntheticEvent,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import { appName, surahs } from "../_main/config";
import { type TrackUrl } from "../_main/types";
import AudioSessionManager from "../utils/audioSessionManager";
import AyatList from "./controls/AyatList";
import PlayControls from "./controls/PlayControls";
import { defaultQariKey, type QariKey } from "./controls/qari";
import Header from "./Header";
import { getActiveAyatNumber, getTracksToPlay } from "./utils";

const QuranApp = () => {
  const audioPlayerRef = useRef<{
    [key: TrackUrl]: RefObject<HTMLAudioElement>;
  }>({});
  const audioSessionManager = useRef<AudioSessionManager>(
    AudioSessionManager.getInstance()
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTrackUrl, setActiveTrackUrl] = useState<TrackUrl>(
    "" as TrackUrl
  );
  const [qariKey, setQariKey] = useLocalStorage<QariKey>(
    "qariKey",
    defaultQariKey
  );
  const [surahNumber, setSurahNumber] = useLocalStorage<number>(
    "surahNumber",
    1
  );
  const [ayatRange, setAyatRange] = useLocalStorage<[number, number]>(
    "ayatRange",
    [1, 1]
  );
  const [shouldRepeat, setShouldRepeat] = useLocalStorage<boolean>(
    "shouldRepeat",
    true
  );

  const surah = useMemo(() => {
    return surahs[surahNumber - 1];
  }, [surahNumber]);

  const tracksToPlay = useMemo(() => {
    const tracksObjects = getTracksToPlay(
      ayatRange,
      shouldRepeat,
      surahNumber,
      qariKey
    );

    tracksObjects.forEach((trackObject) => {
      const { trackUrl } = trackObject;
      audioPlayerRef.current[trackUrl] = createRef();
    });

    return tracksObjects;
  }, [ayatRange, shouldRepeat, surahNumber, qariKey]);

  const activeAyatNumber = useMemo(() => {
    return getActiveAyatNumber(activeTrackUrl);
  }, [activeTrackUrl]);

  // Enhanced audio session management for background playback
  const initializeAudioSession = async () => {
    await audioSessionManager.current.initialize();
  };

  const playAyat = useCallback(
    async (trackUrl: TrackUrl) => {
      try {
        await initializeAudioSession();

        const audioRef = audioPlayerRef.current[trackUrl]
          .current as HTMLAudioElement;

        // Ensure audio is loaded before playing
        if (audioRef.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
          await new Promise((resolve) => {
            audioRef.addEventListener("canplaythrough", resolve, {
              once: true,
            });
            audioRef.load();
          });
        }

        // Set audio attributes for better mobile support
        audioRef.setAttribute("playsinline", "true");
        audioRef.setAttribute("webkit-playsinline", "true");

        await audioRef.play();
        setIsPlaying(true);

        const parentElement = audioRef.parentElement as Element;
        if (parentElement.previousElementSibling) {
          parentElement.previousElementSibling.scrollIntoView();
        } else {
          parentElement.scrollIntoView();
        }

        // Update media session for background playback
        if ("mediaSession" in navigator) {
          navigator.mediaSession.playbackState = "playing";
          navigator.mediaSession.metadata = new MediaMetadata({
            title: `${surah.name} - Ayat ${getActiveAyatNumber(trackUrl)}`,
            artist: "Quran Player",
            album: surah.name,
          });
        }
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);

        // Retry after a short delay
        setTimeout(() => {
          playAyat(trackUrl);
        }, 1000);
      }
    },
    [surah.name]
  );

  const pauseAyat = async (trackUrl: TrackUrl) => {
    const audioRef = audioPlayerRef.current[trackUrl]
      .current as HTMLAudioElement;
    audioRef.pause();
    setIsPlaying(false);

    // Update media session
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "paused";
    }
  };

  const handleEnded = async (e: SyntheticEvent) => {
    const currentTrackUrl = (e.target as HTMLElement).id;
    const trackIndex = tracksToPlay.findIndex(
      ({ trackUrl }) => trackUrl === currentTrackUrl
    );
    const nextTrackUrl = tracksToPlay[trackIndex + 1]?.trackUrl as TrackUrl;

    if (nextTrackUrl) {
      setActiveTrackUrl(nextTrackUrl);
      await playAyat(nextTrackUrl);
      return;
    }
    if (shouldRepeat) {
      const firstTrackUrl = tracksToPlay[0].trackUrl;
      setActiveTrackUrl(firstTrackUrl);
      await playAyat(firstTrackUrl);
      return;
    }
    setIsPlaying(false);

    // Update media session
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "none";
    }
  };

  const handlePlay = useCallback(
    async ({ activeTrackUrl }: { activeTrackUrl: TrackUrl }) => {
      try {
        await playAyat(activeTrackUrl);
      } catch (e) {
        console.log(e);
      }
    },
    [playAyat]
  );

  const handlePause = () => pauseAyat(activeTrackUrl);

  const handleReset = () => {
    handleStopAll();
    const firstTrackUrl: TrackUrl = tracksToPlay[0].trackUrl;
    setActiveTrackUrl(firstTrackUrl);
    handlePlay({ activeTrackUrl: firstTrackUrl });
  };

  const handleStopAll = useCallback(async () => {
    setIsPlaying(false);

    const tracks = Object.keys(audioPlayerRef.current) as Array<TrackUrl>;
    tracks.forEach((track) => {
      const elm = audioPlayerRef.current[track]?.current;
      if (!elm) return;
      elm.pause();
      elm.currentTime = 0;
    });

    // Update media session
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "none";
    }
  }, []);

  const handleAyatClick = useCallback(
    (trackUrl: TrackUrl) => {
      handleStopAll();
      setActiveTrackUrl(trackUrl);
      handlePlay({ activeTrackUrl: trackUrl });
    },
    [handlePlay, handleStopAll]
  );

  useEffect(() => {
    if (!tracksToPlay.length) return;
    handleStopAll();
    setActiveTrackUrl(tracksToPlay[0].trackUrl);
  }, [tracksToPlay, handleStopAll]);

  useEffect(() => {
    document.title = `${surah.number}:${activeAyatNumber} : ${surah.name} - ${appName}`;
  }, [activeAyatNumber, surah]);

  // Handle page visibility changes to prevent audio stopping
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        // Page is hidden but audio is playing - try to maintain audio session
        console.log("Page hidden, maintaining audio session");
      } else if (!document.hidden && isPlaying) {
        // Page is visible and audio should be playing - ensure it continues
        console.log("Page visible, ensuring audio continues");
        const audioRef = audioPlayerRef.current[activeTrackUrl]?.current;
        if (audioRef && audioRef.paused) {
          audioRef.play().catch(console.error);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Also handle page focus/blur events
    const handleFocus = () => {
      if (isPlaying) {
        const audioRef = audioPlayerRef.current[activeTrackUrl]?.current;
        if (audioRef && audioRef.paused) {
          audioRef.play().catch(console.error);
        }
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isPlaying, activeTrackUrl]);

  // Initialize audio session manager on mount
  useEffect(() => {
    // Initialize audio session manager for background playback
    audioSessionManager.current.initialize();
    audioSessionManager.current.setupBackgroundAudioHandlers();

    return () => {
      // Cleanup - no wake lock to release, just log
      console.log("Component unmounting - audio session cleaned up");
    };
  }, []);

  const [startingAyatNumber, _] = ayatRange;

  return (
    <div className="flex h-screen mx-auto w-full max-w-md flex-col bg-white">
      <Header appName={appName} />
      <div className="p-4 flex-grow overflow-hidden flex gap-2 flex-col ">
        <PlayControls
          qariKey={qariKey}
          setQariKey={setQariKey}
          ayatRange={ayatRange}
          setAyatRange={setAyatRange}
          surah={surah}
          surahNumber={surahNumber}
          setSurahNumber={setSurahNumber}
        />
        <AyatList
          tracksToPlay={tracksToPlay}
          activeTrackUrl={activeTrackUrl}
          activeAyatNumber={activeAyatNumber}
          setIsPlaying={setIsPlaying}
          handleAyatClick={handleAyatClick}
          isPlaying={isPlaying}
          audioPlayerRef={audioPlayerRef}
          handleEnded={handleEnded}
        />
        <div className="flex gap-3 justify-between">
          <label className="flex gap-2" htmlFor="shouldRepeat">
            <input
              type="checkbox"
              name="shouldRepeat"
              id="shouldRepeat"
              checked={shouldRepeat}
              onChange={() => setShouldRepeat(!shouldRepeat)}
            />
            Repeat
          </label>
          <div>Current ayat #{activeAyatNumber}</div>
        </div>
      </div>
      <div className="inline-flex shadow-sm" role="group">
        {!isPlaying && (
          <button
            className="btn bg-primary font-bold text-xl text-white w-full p-3"
            onClick={() => handlePlay({ activeTrackUrl: activeTrackUrl })}
          >
            Play
          </button>
        )}
        {isPlaying && (
          <button
            className="btn bg-primary font-bold text-xl text-white w-full p-3"
            onClick={handlePause}
          >
            Pause
          </button>
        )}
        {activeAyatNumber > startingAyatNumber && (
          <button
            className="btn bg-secondary font-bold text-xl text-white p-3"
            onClick={handleReset}
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
};

export default QuranApp;
