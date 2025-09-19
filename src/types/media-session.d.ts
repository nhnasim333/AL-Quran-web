// Type definitions for Media Session API (used for background audio playback)
declare global {
  interface Navigator {
    mediaSession?: MediaSession;
  }
}

interface MediaSession {
  metadata: MediaMetadata | null;
  playbackState: 'none' | 'paused' | 'playing';
  setActionHandler(action: MediaSessionAction, handler: MediaSessionActionHandler | null): void;
}

interface MediaMetadata {
  title?: string;
  artist?: string;
  album?: string;
  artwork?: MediaImage[];
}

interface MediaMetadataInit {
  title?: string;
  artist?: string;
  album?: string;
  artwork?: MediaImage[];
}

declare var MediaMetadata: {
  prototype: MediaMetadata;
  new(init?: MediaMetadataInit): MediaMetadata;
};

type MediaSessionAction = 'play' | 'pause' | 'stop' | 'seekbackward' | 'seekforward' | 'previoustrack' | 'nexttrack';

type MediaSessionActionHandler = (details: MediaSessionActionDetails) => void;

interface MediaSessionActionDetails {
  action: MediaSessionAction;
}

interface MediaImage {
  src: string;
  sizes?: string;
  type?: string;
}

export {};
