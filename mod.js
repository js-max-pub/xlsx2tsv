import xlsxlib from 'https://jspm.dev/xlsx'
// import xlsxlib from 'https://cdn.skypack.dev/xlsx'

export async function loadAndConvert(url) {
	console.log('load and convert')
	let ab = await loadArrayBuffer(url)
	let wb = await convertToTSV(ab)
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

export async function convertToTSV(arrayBuffer) {
	let wb = await xlsxlib.read(arrayBuffer, { type: 'array' })
	let output = {}
	for (let [name, data] of Object.entries(wb.Sheets)) {
		output[name] = xlsxlib.utils.sheet_to_csv(data, { FS: '\t' })
		// Deno.writeTextFileSync(name + '.tsv', output)
	}
	return output
}