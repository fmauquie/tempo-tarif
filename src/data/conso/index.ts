import * as fs from "node:fs/promises";

/*
 * - Télécharger données ici : https://suiviconso.edf.fr/comprendre
 * - Dézipper
 * - placer le fichier ma-conso-quotidienne-<numéro-de-contrat>-<code-postal>.csv ici
 */

const files = await fs.readdir(new URL('./', import.meta.url))
const csvs = files.filter((file) => file.startsWith("ma-conso-quotidienne") && file.endsWith(".csv"));
const csv = await fs.readFile(new URL(csvs[0], import.meta.url), "latin1");

export const conso: Record<`${number}-${number}-${number}`, number> = Object.fromEntries(csv
  .split("\n")
  .slice(4)
  .filter(Boolean)
  .map(line => line.split(";"))
  .map(([date, kw]) => [date.split("/"), Number(kw)] as const)
  .map(([[day, month, year], kw]) => [`${year}-${month}-${day}`, kw] as const))
