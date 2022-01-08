console.log('nav',navigator)

import { loadAndConvert } from './mod.js'
// let url = `https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Sterbefaelle-Lebenserwartung/Tabellen/sonderauswertung-sterbefaelle.xlsx?__blob=publicationFile`
let url = `file:///${Deno.cwd()}/Preisatlas.xlsx`
// let ab = await loadArrayBuffer(url)
// let wb = await convertToTSV(ab)
let output = await loadAndConvert(url)
console.log(output)
