import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';


export async function xls_url_to_tsv(url) {
	console.log('load and convert')
	let ab = await loadArrayBuffer(url)
	let wb = await xls_ab_to_tsv(ab)
	return wb
}
export async function loadArrayBuffer(url) {
	// let rawData = await Deno.readTextFile(new URL(url))
	let rawData = await fetch(url)
	// console.log(rawData)
	let arrayBuffer = await rawData.arrayBuffer()
	// console.log(arrayBuffer)
	return arrayBuffer
}

export async function xls_ab_to_tsv(arrayBuffer) {
	let wb = await XLSX.read(arrayBuffer, { type: 'array' })
	let output = {}
	for (let [name, data] of Object.entries(wb.Sheets)) {
		output[name] = XLSX.utils.sheet_to_csv(data, { FS: '\t' })
		// Deno.writeTextFileSync(name + '.tsv', output)
	}
	return output
}