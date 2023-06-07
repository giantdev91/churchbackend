import base64Img from 'base64-img';
import path from 'path';

import regions from '~/assets/regions/regions.json';

async function getCountryList(req, res) {
	const countries = [];
	regions.forEach((region) => {
		const flag = base64Img.base64Sync(
			path.resolve(__dirname, `../../assets/regions/flags/${region.alpha2}.png`)
		);
		countries.push({
			id: region.id,
			name: region.name,
			code: region.alpha2,
			flag,
		});
	});
	res.json(countries);
}

export default getCountryList;
