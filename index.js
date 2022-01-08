// import { loadAndConvert } from './mod.js'
import { loadAndConvert } from './mod.bundle.js'

import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

serve(main)



async function main(request) {
	let url = new URL(request.url)
	// let path = url.pathname;
	let params = Object.fromEntries(url.searchParams)
	console.log('sheet', params.sheet)
	console.log('url', params.url)
	if (!params.url) { return null }

	let output = await loadAndConvert(params.url)
	console.log(output)
	// let text = Object.entries(output).map(x=>x[0]join('\n\n\n')
	let text = output[params.sheet]
	return new Response(text, {
		headers: { "content-type": "text/plain; charset=utf-8" },
	});

}
