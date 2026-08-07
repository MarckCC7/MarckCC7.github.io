/**
 * A tiny chiptune synthesiser.
 *
 * Sounds are generated with the Web Audio API instead of shipping audio files:
 * zero bytes over the network, and square waves are exactly the RPG texture we
 * want. The context is created lazily on the first real interaction, because
 * browsers refuse to start audio before a user gesture.
 */

type Blip = 'hover' | 'select' | 'unlock' | 'grow';

const RECIPES: Record<Blip, { freq: number[]; step: number; gain: number; type: OscillatorType }> =
  {
    hover: { freq: [880], step: 0.06, gain: 0.02, type: 'square' },
    select: { freq: [660, 990], step: 0.07, gain: 0.03, type: 'square' },
    unlock: { freq: [523, 659, 784, 1047], step: 0.09, gain: 0.035, type: 'square' },
    grow: { freq: [440, 587, 740], step: 0.08, gain: 0.03, type: 'triangle' },
  };

let context: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (context) return context;

  const Ctor =
    window.AudioContext ??
    (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;

  try {
    context = new Ctor();
    return context;
  } catch {
    return null;
  }
}

/** Plays a short blip. Silently does nothing if audio is unavailable. */
export function playBlip(blip: Blip): void {
  const ctx = getContext();
  if (!ctx) return;

  // Autoplay policies suspend the context until a gesture resumes it.
  if (ctx.state === 'suspended') void ctx.resume();

  const recipe = RECIPES[blip];
  const start = ctx.currentTime;

  recipe.freq.forEach((frequency, i) => {
    const at = start + i * recipe.step;
    const oscillator = ctx.createOscillator();
    const amp = ctx.createGain();

    oscillator.type = recipe.type;
    oscillator.frequency.setValueAtTime(frequency, at);

    // Fast attack, exponential decay — the classic 8-bit envelope.
    amp.gain.setValueAtTime(0.0001, at);
    amp.gain.exponentialRampToValueAtTime(recipe.gain, at + 0.008);
    amp.gain.exponentialRampToValueAtTime(0.0001, at + recipe.step * 0.95);

    oscillator.connect(amp).connect(ctx.destination);
    oscillator.start(at);
    oscillator.stop(at + recipe.step);
  });
}

export type { Blip };
