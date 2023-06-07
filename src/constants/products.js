const dotenv = require('dotenv');

export const percentage = 90.0; // we are taking 5% now, 5% is what stripe takes. if we want to charge more, reduce this number, e.g 85

dotenv.config({ silent: true });
/**
 * Make sure this matches app subscription, collaborate, and purchase screens
 * Also make sure if you edit these prices in your branch to revert them upon pushing to master!
 */

export const subscription = {
	type: 'Subscription',
	priceIdStripe: process.env.STRIPE_PRODUCT_SUBSCRIPTION_PRICE,
	// price: 4.99
};

export const products = [
	{
		type: 'Purchase Feature',
		productIdStripe: 'prod_Iwj4DGwKELMh4C',
		price: 100,
	},
	{
		type: 'Purchase Beat',
		productIdStripe: 'prod_Iwj48VLuRbVOiF',
		price: 50,
	},
	{
		type: 'Repost on Profile',
		productIdStripe: 'prod_Iwj5RsHmQaFe9r',
		price: 100,
	},
	{
		type: 'Book for Show',
		productIdStripe: 'prod_Iwj6sfW2cHjPvk',
		price: 250,
	},
	{
		type: 'Book for LiveStream',
		productIdStripe: 'prod_Iwj6xuIzeATyg8',
		price: 150,
	},
	{
		type: 'Private Lessons',
		productIdStripe: 'prod_Iwj65Hdw2xSezo',
		price: 450,
	},
	{
		type: 'Virtual Meet & Greet',
		productIdStripe: 'prod_Iwj6q8LBcNNz29',
		price: 30,
	},
	{
		type: 'Personal Performance Video',
		productIdStripe: process.env.STRIPE_PRODUCT_PERFORMANCE,
		price: 30,
	},
	{
		type: 'Personal Shout Out',
		productIdStripe: process.env.STRIPE_PRODUCT_SHOUTOUT,
		price: 15,
	},
];
