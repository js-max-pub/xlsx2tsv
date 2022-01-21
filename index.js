console.log(Deno.version)
// import { loadAndConvert } from './mod.bundle.js'

// test:
// https://xlsx.deno.dev/?sheet=D_2016_2021_KW_AG_Ins&url=https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Sterbefaelle-Lebenserwartung/Tabellen/sonderauswertung-sterbefaelle.xlsx?__blob=publicationFile

import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
serve(main)


import { xls_url_to_tsv } from './mod.js'

async function main(request) {
	let url = new URL(request.url)
	// let path = url.pathname;
	let params = Object.fromEntries(url.searchParams)
	if (!params.url) { return null }
	console.log('sheet', params.sheet)
	console.log('url', params.url)

	let output = await xls_url_to_tsv(params.url)
	console.log(Object.keys(output ?? {}))
	// let text = Object.entries(output).map(x=>x[0]join('\n\n\n')
	let text = output[params.sheet]
	return new Response(text, {
		headers: { "content-type": "text/plain; charset=utf-8" },
	});

}
