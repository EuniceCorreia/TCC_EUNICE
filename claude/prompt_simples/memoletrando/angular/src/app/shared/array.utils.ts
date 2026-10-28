/** Retorna uma cópia embaralhada do array (Fisher-Yates). */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function randomElement<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/** Divide o array em grupos de `size` elementos (o último pode ser menor). */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}
