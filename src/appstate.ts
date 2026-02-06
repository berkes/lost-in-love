import { decodeData } from "./obfuscation";

export type AppMode = 'sender' | 'recipient';

export class AppState {
  constructor(
    public readonly mode: AppMode,
    public readonly me: string,
    public readonly you: string,
    public readonly message: string,
    public readonly shouldGarble: boolean = mode === 'recipient'
  ) {}

  static default(): AppState {
    return new AppState('sender', 'Romeo', 'Juliet', '');
  }

  static fromSearchParams(searchParams: URLSearchParams): AppState {
    const obfuscatedData = searchParams.get("data");
    if (obfuscatedData) {
      try {
        const decoded = decodeData(obfuscatedData);
        return new AppState(
          'recipient',
          decoded.me || 'Romeo',
          decoded.you || 'Juliet',
          decoded.message || ''
        );
      } catch (e) {
        console.warn("Failed to decode obfuscated data");
      }
    }

    const me = searchParams.get("me")?.trim() || 'Romeo';
    const you = searchParams.get("you")?.trim() || 'Juliet';
    const message = searchParams.get("message")?.trim() || '';

    if (me && you && message) {
      return new AppState('recipient', me, you, message);
    }

    return AppState.default();
  }

  // Helper method to determine if text should be garbled
  shouldGarbleText(): boolean {
    return this.shouldGarble;
  }

  // Method to create a new state with updated values (for form submission)
  withFormValues(me: string, you: string, message: string): AppState {
    return new AppState('recipient', me, you, message);
  }
}