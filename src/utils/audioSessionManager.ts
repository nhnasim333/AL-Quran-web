// Audio session management utilities
export class AudioSessionManager {
  private static instance: AudioSessionManager;
  private audioContext: AudioContext | null = null;

  static getInstance(): AudioSessionManager {
    if (!AudioSessionManager.instance) {
      AudioSessionManager.instance = new AudioSessionManager();
    }
    return AudioSessionManager.instance;
  }

  async initialize(): Promise<void> {
    try {
      // Initialize AudioContext for better audio handling
      if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        this.audioContext = new AudioContext();
        
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }
      }

      // Set up media session for background audio support
      if ('mediaSession' in navigator) {
        // Set default metadata
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'Quran Audio Player',
          artist: 'Hifz Helper',
          album: 'Quran Recitation',
        });

        // These will be set by the Player component
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
        navigator.mediaSession.setActionHandler('stop', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
      }

      console.log('Audio session initialized for background playback');
    } catch (error) {
      console.error('Failed to initialize audio session:', error);
    }
  }

  setupBackgroundAudioHandlers(): void {
    // Handle page visibility changes to maintain audio context
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('Page hidden - maintaining audio context for background playback');
        // Keep audio context active for background audio
        if (this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume().catch(console.error);
        }
      } else {
        console.log('Page visible - ensuring audio context is active');
        if (this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume().catch(console.error);
        }
      }
    });

    // Handle page focus to resume audio context if needed
    window.addEventListener('focus', () => {
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume().catch(console.error);
      }
    });

    // Handle beforeunload for cleanup (no wake lock to release)
    window.addEventListener('beforeunload', () => {
      console.log('Page unloading - cleaning up audio context');
      if (this.audioContext) {
        this.audioContext.close().catch(console.error);
      }
    });
  }

  async ensureAudioContext(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
}

export default AudioSessionManager;
