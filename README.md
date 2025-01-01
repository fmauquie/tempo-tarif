# Tempo Tarif

Permet de savoir si c’est intéressant de prendre une offre Tempo.

- Télécharger les données de consommation réelle ici : https://suiviconso.edf.fr/comprendre
- Dézipper
- Placer le fichier "ma-conso-quotidienne-<numéro-de-contrat>-<code-postal>.csv" dans le dossier `src/data/conso`
- Exécuter `npm install`
- Exécuter `npm start`.

Si la ligne "facture tempo" affiche "NaN", c’est qu’il manque les informations des jours tempo pour certaines dates.
Dans ce cas il faut les télécharger dans `src/data/tempoDays` et ajouter les imports JSON correspondants.

La requête pour télécharger les jours tempo est dans `src/data/tempoDays/tempo.http`, il faut ajuster le paramètre `season` :

`GET https://www.services-rte.com/cms/open_data/v1/tempo?season=2024-2025`

La `season` démarre au 1er juillet. Les données dans ce répo sont valides jusqu’au 31/12/2024 (il faut donc sûrement retélécharger la saison 2024-2025).

On ne considère ici que les heures pleines.
