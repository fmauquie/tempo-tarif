import {conso} from "./data/conso/index.js";
import {tempoDays} from "./data/tempoDays/index.js";

const tarifFixe = 25.16 / 100
const abonnementFixe = 12.68
const tarifsTempo = {
  "BLUE": 16.09 / 100,
  "WHITE": 18.94 / 100,
  "RED": 75.62 / 100,
}
const abonnementTempo = 13.03

const dates = Object.keys(conso).sort((a, b) => a.localeCompare(b)) as Array<keyof typeof conso>;

const factureFixe = dates.reduce((acc, date) => {
  if (date.endsWith("-01")) {
    acc.abonnement += abonnementFixe
  }
  acc.consommation += tarifFixe
  return acc
}, {abonnement: abonnementFixe, consommation: 0})
const factureTempo = dates.reduce((acc, date) => {
  if (date.endsWith("-01")) {
    acc.abonnement += abonnementTempo
  }
  const tarifTempoDay = tarifsTempo[tempoDays[date]];
  if (isNaN(tarifTempoDay)) {
    console.log(date, tempoDays[date]);
  }
  acc.consommation += tarifTempoDay
  return acc
}, {abonnement: abonnementTempo, consommation: 0})

const totalFixe = factureFixe.abonnement + factureFixe.consommation;
const totalTempo = factureTempo.abonnement + factureTempo.consommation;

const numberFormat = new Intl.NumberFormat("fr", {currency: "EUR", style: "currency"})

console.log("Facture fixe : ", numberFormat.format(totalFixe), ", soit abonnement : ", numberFormat.format(factureFixe.abonnement), " et conso : ", numberFormat.format(factureFixe.consommation))
console.log("Facture tempo : ", numberFormat.format(totalTempo), ", soit abonnement : ", numberFormat.format(factureTempo.abonnement), " et conso : ", numberFormat.format(factureTempo.consommation))
console.log("Diff: ", numberFormat.format(totalFixe - totalTempo))
