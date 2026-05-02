export async function getNpmDownloads(packageName: string): Promise<number | null> {
  const today = new Date().toISOString().slice(0, 10);
  const url = `https://api.npmjs.org/downloads/point/2020-01-01:${today}/${packageName}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.downloads === "number" ? data.downloads : null;
  } catch {
    return null;
  }
}
