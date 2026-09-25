import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'works'>;

export const platformLabel = { browser: 'ブラウザ', android: 'Android', psp: 'PSP' } as const;
export const statusLabel = { wip: '制作中', released: '公開済み', archived: '凍結' } as const;

/** date の新しい順で全作品を返す */
export async function getWorks(): Promise<Work[]> {
  const works = await getCollection('works');
  return works.sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/** サイト内の絶対パス（/play/xxx/ など）に base を前置する。外部URLはそのまま */
export function withBase(path: string): string;
export function withBase(path: string | null | undefined): string | undefined;
export function withBase(path: string | null | undefined) {
  if (!path) return undefined;
  if (/^[a-z]+:\/\//i.test(path) || !path.startsWith('/')) return path;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}

/** public/ 配下にファイルが実在するか */
function inPublic(path: string) {
  return existsSync(join(process.cwd(), 'public', path));
}

/** サムネイル: frontmatter 指定 → /thumbnails/<slug>.{png,jpg,webp,gif} の順で探す。無ければ undefined */
export function thumbnailOf(work: Work): string | undefined {
  const { thumbnail } = work.data;
  if (thumbnail) return /^https?:/.test(thumbnail) || inPublic(thumbnail) ? withBase(thumbnail) : undefined;
  for (const ext of ['png', 'jpg', 'webp', 'gif']) {
    const p = `/thumbnails/${work.id}.${ext}`;
    if (inPublic(p)) return withBase(p);
  }
  return undefined;
}

/** 動画かどうか（GIF/画像ならimgで表示） */
export function isVideo(path: string) {
  return /\.(mp4|webm|mov)$/i.test(path);
}
