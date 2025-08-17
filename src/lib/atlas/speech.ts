/**
 * ATLAS Speech System - Production Implementation
 * Voice synthesis and recognition with error handling
 */

export interface VoiceConfig {
  rate: number;
  pitch: number; 
  volume: number;
  voice?: SpeechSynthesisVoice;
}

export class AtlasSpeech {
  private static instance: AtlasSpeech;
  private voices: SpeechSynthesisVoice[] = [];
  private isSupported: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private queue: string[] = [];
  private isProcessing: boolean = false;

  private constructor() {
    this.initialize();
  }

  public static getInstance(): AtlasSpeech {
    if (!AtlasSpeech.instance) {
      AtlasSpeech.instance = new AtlasSpeech();
    }
    return AtlasSpeech.instance;
  }

  private initialize(): void {
    if (typeof window === 'undefined') return;

    this.isSupported = 'speechSynthesis' in window;
    
    if (this.isSupported) {
      this.loadVoices();
      speechSynthesis.addEventListener('voiceschanged', () => this.loadVoices());
    }
  }

  private loadVoices(): void {
    this.voices = speechSynthesis.getVoices();
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices.filter(voice => voice.lang.includes('en'));
  }

  public getPreferredVoice(): SpeechSynthesisVoice | null {
    const englishVoices = this.getVoices();
    
    // Preferred voice names for ATLAS
    const preferredNames = [
      'Daniel',           // UK English Male
      'Alex',             // US English Male
      'Google UK English Male',
      'Microsoft David Desktop - English (United States)',
      'Microsoft Mark Desktop - English (United States)'
    ];

    // Try to find preferred voice by name
    for (const name of preferredNames) {
      const voice = englishVoices.find(v => v.name.includes(name));
      if (voice) return voice;
    }

    // Fallback to any male English voice
    const maleVoice = englishVoices.find(voice => 
      voice.name.toLowerCase().includes('male') ||
      voice.name.toLowerCase().includes('david') ||
      voice.name.toLowerCase().includes('daniel') ||
      voice.name.toLowerCase().includes('alex')
    );

    if (maleVoice) return maleVoice;

    // Final fallback to first English voice
    return englishVoices[0] || null;
  }

  public async speak(text: string, config?: Partial<VoiceConfig>): Promise<void> {
    if (!this.isSupported || !text.trim()) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        // Stop current speech
        this.stop();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Apply configuration
        const finalConfig = {
          rate: 0.85,
          pitch: 0.8,
          volume: 0.9,
          voice: this.getPreferredVoice(),
          ...config
        };

        utterance.rate = finalConfig.rate;
        utterance.pitch = finalConfig.pitch;
        utterance.volume = finalConfig.volume;

        if (finalConfig.voice) {
          utterance.voice = finalConfig.voice;
        }

        // Event handlers
        utterance.onend = () => {
          this.currentUtterance = null;
          this.isProcessing = false;
          this.processQueue();
          resolve();
        };

        utterance.onerror = (event) => {
          console.warn('Speech synthesis error:', event.error);
          this.currentUtterance = null;
          this.isProcessing = false;
          this.processQueue();
          reject(new Error(`Speech synthesis failed: ${event.error}`));
        };

        utterance.onstart = () => {
          this.isProcessing = true;
        };

        this.currentUtterance = utterance;
        speechSynthesis.speak(utterance);

      } catch (error) {
        console.error('Speech synthesis error:', error);
        reject(error);
      }
    });
  }

  public queue(text: string): void {
    this.queue.push(text);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    if (this.queue.length === 0 || this.isProcessing) return;

    const text = this.queue.shift();
    if (text) {
      try {
        await this.speak(text);
      } catch (error) {
        console.warn('Failed to speak queued text:', error);
      }
    }
  }

  public stop(): void {
    if (this.isSupported) {
      speechSynthesis.cancel();
      this.currentUtterance = null;
      this.isProcessing = false;
      this.queue.length = 0; // Clear queue
    }
  }

  public pause(): void {
    if (this.isSupported && this.isProcessing) {
      speechSynthesis.pause();
    }
  }

  public resume(): void {
    if (this.isSupported) {
      speechSynthesis.resume();
    }
  }

  public isSpeaking(): boolean {
    return this.isSupported && (speechSynthesis.speaking || this.isProcessing);
  }

  public isSupported(): boolean {
    return this.isSupported;
  }

  public getStatus(): {
    supported: boolean;
    speaking: boolean;
    processing: boolean;
    queueLength: number;
    voicesAvailable: number;
  } {
    return {
      supported: this.isSupported,
      speaking: speechSynthesis.speaking,
      processing: this.isProcessing,
      queueLength: this.queue.length,
      voicesAvailable: this.voices.length
    };
  }
}

export class AtlasRecognition {
  private static instance: AtlasRecognition;
  private recognition: any = null;
  private isSupported: boolean = false;
  private isListening: boolean = false;
  private listeners: Map<string, Function[]> = new Map();

  private constructor() {
    this.initialize();
  }

  public static getInstance(): AtlasRecognition {
    if (!AtlasRecognition.instance) {
      AtlasRecognition.instance = new AtlasRecognition();
    }
    return AtlasRecognition.instance;
  }

  private initialize(): void {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    
    if (SpeechRecognition) {
      this.isSupported = true;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.emit('result', transcript);
    };

    this.recognition.onstart = () => {
      this.isListening = true;
      this.emit('start');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.emit('end');
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      this.emit('error', event.error);
    };
  }

  public start(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported || !this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      if (this.isListening) {
        reject(new Error('Already listening'));
        return;
      }

      const resultHandler = (transcript: string) => {
        this.off('result', resultHandler);
        this.off('error', errorHandler);
        resolve(transcript);
      };

      const errorHandler = (error: string) => {
        this.off('result', resultHandler);
        this.off('error', errorHandler);
        reject(new Error(`Recognition error: ${error}`));
      };

      this.on('result', resultHandler);
      this.on('error', errorHandler);

      try {
        this.recognition.start();
      } catch (error) {
        this.off('result', resultHandler);
        this.off('error', errorHandler);
        reject(error);
      }
    });
  }

  public stop(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  public isListeningNow(): boolean {
    return this.isListening;
  }

  public isSupported(): boolean {
    return this.isSupported;
  }

  public on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  public off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

export const speech = AtlasSpeech.getInstance();
export const recognition = AtlasRecognition.getInstance();