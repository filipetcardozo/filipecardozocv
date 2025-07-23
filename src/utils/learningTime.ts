const STORAGE_KEY = 'learning-time';

export type LearningTimes = Record<string, number>;

function read(): LearningTimes {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LearningTimes) : {};
  } catch {
    return {};
  }
}

export function getTimes(): LearningTimes {
  return read();
}

export function getTime(slug: string): number {
  const times = read();
  return times[slug] ?? 0;
}

export function addTime(slug: string, seconds: number): void {
  if (typeof window === 'undefined') return;
  const times = read();
  times[slug] = (times[slug] ?? 0) + seconds;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(times));
}

export function resetTimes(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function formatSeconds(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const parts = [
    h ? String(h).padStart(2, '0') : null,
    String(m).padStart(2, '0'),
    String(s).padStart(2, '0'),
  ].filter(Boolean) as string[];
  return parts.join(':');
}
