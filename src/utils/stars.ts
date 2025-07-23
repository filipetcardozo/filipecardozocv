const STORAGE_KEY = 'learning-stars';

export type StarredTopics = Record<string, true>;

function read(): StarredTopics {
  if (typeof window === 'undefined') return {} as StarredTopics;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StarredTopics) : {};
  } catch {
    return {} as StarredTopics;
  }
}

function write(data: StarredTopics): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getStars(): StarredTopics {
  return read();
}

export function isStarred(slug: string): boolean {
  return !!read()[slug];
}

export function toggleStar(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  const stars = read();
  const next = !stars[slug];
  if (next) {
    stars[slug] = true;
  } else {
    delete stars[slug];
  }
  write(stars);
  return next;
}
