import dotenv from 'dotenv';
import { id } from 'prelude-ls';
import Stripe from 'stripe';

import {
	percentage,
	products as productsInfo,
	subscription as subscriptionInfo,
} from '../constants/products';
import updateUserStripeIdBuyer from '../db/payment/addStripeBuyerId';
import updateUserStripeId from '../db/payment/addStripeId';
import getStripeIdEmail from '../db/payment/getStripeIdEmail';
import getIdFromStripeId from '../db/payment/getIdFromStripeId';
import updateOnboardingStatus from '../db/payment/updateOnboardingStatus';
import updateSubscribed from '../db/paywall/update';
import createRequest from '../db/performance/createRequest';

dotenv.config({ silent: true });

const stripe = Stripe(process.env.STRIPE_PRIVATE);

/**
 * This gets onboarding link
 */

const getOnboardingLink = async (id) => {

	const accountLink = await stripe.accountLinks.create({
		account: id,
		refresh_url: `${process.env.FRONTEND_STRIPE_URL}/onboard-error`,
		return_url: `${process.env.FRONTEND_STRIPE_URL}/onboard-success`,
		type: 'account_onboarding',
	});
	return accountLink;
};

/**
 * This checks if charges_enabled is true: Whether the account can create live charges.
 */

const retrieveOnboardingAccount = async (id) => {
	
	const account = await stripe.accounts.retrieve(id);
	return account;
};

/**
 * This checks if charges_enabled is true: Whether the account can create live charges.
 */

const updateOnboardingAccountStatus = async (id) => {
	
	const {
		stripeCustomerId,
		stripeCustomerOnboarding,
	} = await getStripeIdEmail({ userId: id });

	if (!stripeCustomerId) {
		return;
	}

	if (stripeCustomerOnboarding) {
		return;
	}
	const { charges_enabled: chargesEnabled } = await stripe.accounts.retrieve(
		stripeCustomerId
	);

	
	
	if (chargesEnabled) {
		await updateOnboardingStatus({ userId: id });
	}

	await stripe.accounts.update(
		stripeCustomerId,
		{
		  settings: {
			payouts: {
			  schedule: {
				interval: 'manual',
			  },
			},
		  },
		}
	  );
};

/**
 * This creates a linked account (we need to check if user has already validated, then stop showing onboarding link)
 */

const createOnboardingLink = async ({ id }) => {
	const { stripeCustomerId, email } = await getStripeIdEmail({ userId: id });

	if (stripeCustomerId) {
		const { charges_enabled: chargesEnabled } = await retrieveOnboardingAccount(
			stripeCustomerId
		);

		if (chargesEnabled) {
			return { chargesEnabled: true };
		}
		const accountLink = await getOnboardingLink(stripeCustomerId);
		return { accountLink };
	}

	const account = await stripe.accounts.create({
		type: 'express',
		email,
		capabilities: {
			card_payments: {requested: true},
			transfers: {requested: true},
		  },
	});
	await updateUserStripeId({ userId: id, stripeCustomerId: account.id });

	const accountLink = await getOnboardingLink(account.id);

	return accountLink;
};

/**
 * Create payment from website for first time purchasers
 */

const create = async (payload) => {
	
	try {
		const {
			paymentMethod,
			stripeCustomerId,
			products,
			total,
			buyerId,
			desc
	
			
		} = payload;
		
		const {
			id
		} = await getIdFromStripeId({ userId: stripeCustomerId});
	
	
		const customer = await stripe.customers.create({
			payment_method: paymentMethod.id,
			email: paymentMethod.billing_details.email,
			name: paymentMethod.billing_details.name,
			
			invoice_settings: {
				default_payment_method: paymentMethod.id, // this settings sets the newly added card as default payment
			},
		});
		
		/**
		 * Stripe handles subscriptions vs one time payment differently. So we are checking if it's subscription or not
		 */




		if (products[0].type === subscriptionInfo.type) {
		
			const subscription = await stripe.subscriptions.create({
				customer: customer.id,
				transfer_data: {
					amount_percent: percentage,
					destination: stripeCustomerId,
				},
				items: [
					{
						price: subscriptionInfo.priceIdStripe,
						quantity: '1',
					},
				],
				trial_period_days : 15,//every first purchase aka whenever they have 
				//to put in their card details at first is when they get a free trial, fail safes 
				//are setup if they dont put in the card info see the createfromapp method
			});

		
			
			await updateUserStripeIdBuyer({
				userId: buyerId,
				stripeBuyerId: customer.id,
			});

			

			await updateSubscribed({
				userId: id,
				actorId: buyerId,
			});

			const invoice = await stripe.invoices.retrieve(
				subscription.latest_invoice
			);


			return {
				invoice_pdf: invoice.invoice_pdf,
			};
		}


		//if the product is anything else


		const items = products.map((product) => {
			const obj = productsInfo.find((item) => product.type === item.type);
			return {
				name: obj.type,
				product_id: obj.productIdStripe,
			};
		});

		const description = items.map((item) => item.name).join(', ');
		const ids = items.map((item) => item.product_id).join(', ');
		
		
		const paymentIntent = await stripe.paymentIntents.create({
			amount: 0, // gotta multiply by 100 because stripe takes everything in cents
			currency: 'cad',
			customer: customer.id,
			confirm: true,
			off_session: true,
			payment_method: paymentMethod.id,
			description,
			on_behalf_of: stripeCustomerId,
			transfer_data: {
				amount: (percentage / 100) * (total * 100),
				destination: stripeCustomerId,
			},
			metadata: { integration_check: 'accept_a_payment', products: ids },
		});

	
		await updateUserStripeIdBuyer({
			userId: buyerId,
			stripeBuyerId: customer.id,
		});

		
		
		await createRequest({
			requestedByUserId: buyerId,
			requestedForUserId: id,
			description: desc,

		});



		return {
			receipt_url: paymentIntent.charges.data[0].receipt_url,
		};
	} catch (error) {
		console.log(error);
		throw Error('There was a problem, please try again');
	}
};

/**
 * Create payment from app for who payment method is already saved
 */

/**
 * removes the subscription entirely from stripe, one last reacurring payment is made
 * this method however does not actually unsubscribe the user on muqo end, that is handled
 * by unsubscribe.js
 */

const createPayout = async (stripeCustomerId) =>{
	
	
	const balance = await stripe.balance.retrieve({//grabs the balance, the array is pulled apart on wallet screen
		stripeAccount: stripeCustomerId
	  });



	
	const amount = balance.available[0].amount
	const currency = balance.available[0].currency



	await stripe.payouts.create({
		amount,
		currency: currency,
	  }, {
		stripeAccount: stripeCustomerId,
	  });

}

const deleteFromApp = async (payload) => {
	
	const {userId,stripeBuyerId } = payload;
	
	const { stripeCustomerId, email } = await getStripeIdEmail({ userId: userId});
	const subscriptions = await stripe.subscriptions.list({
		customer: stripeBuyerId


	  });
	//user .list in stripe API to get all active subscriptions then filter by the page the user is on
	const result = subscriptions.data.filter(data => data.transfer_data.destination = stripeCustomerId)
	//removes the suscription based on params

	const deleted = await stripe.subscriptions.del( result[0].id);


}
/** 
* gets the customers current balance please note that there are 3 types
* of balances, we are interested in instant_available while pending is
* money that will come in due to subscriptions and avaialble can be ignored
*/
async function balanceFromApp (stripeCustomerId){
	try{
		const balance = await stripe.balance.retrieve({//grabs the balance, the array is pulled apart on wallet screen
			stripeAccount: stripeCustomerId
		  });
		  
		  
		return(balance);
		}catch (error) {
	console.log(error);
	throw Error('There was a problem, please try again');
}


}


const createFromApp = async (payload) => {//this method is for when the payment info is put in already, makes it automatic!
	
	try {
	
		const { stripeBuyerId, stripeCustomerId, products, total,desc } = payload;

		/**
		 * Stripe handles subscriptions vs one time payment differently. So we are checking if it's subscription or not
		 */

		;
		
		var trial = false//controlls whether or not a free trial is given
		const availableSubscriptions = await stripe.subscriptions.list({
			customer: stripeBuyerId,
			status:'all'//get ALL subscriptions cancelled or not to check if its a fresh account
		  });

		if(availableSubscriptions.data.length === 0){//no avaliable subscriptions then give trial
			trial = true
		}
		else{//subscriptions are available, make them pay
			trial = false
		}
	

		
		if (products[0].type === subscriptionInfo.type) {
			
			//if they have an existing subscription then no free trial
			if(!trial){
				
				const subscriptions =  await stripe.subscriptions.create({
					customer: stripeBuyerId,
					on_behalf_of: stripeCustomerId,
					transfer_data: {
						amount_percent: percentage,
						destination: stripeCustomerId,
					},
					items: [
						{
							price: subscriptionInfo.priceIdStripe,
							quantity: '1',
							
						},
					],

				});

				  
				 


			}
	
			//if they have NO subscriptions ever made on their account, use trial period
			else if(trial){
				
				await stripe.subscriptions.create({
					customer: stripeBuyerId,
			
					transfer_data: {
						amount_percent: percentage,
						destination: stripeCustomerId,
					},
					items: [
						{
							price: subscriptionInfo.priceIdStripe,
							quantity: '1',
							
						},
					],
					trial_period_days: 15,
				});
			}


			return {
				
				success: true,
			};
		}
		
		const items = products.map((product) => {
			
			const obj = productsInfo.find((item) => product.type === item.type);
			return {
				name: obj.type,
				product_id: obj.productIdStripe,
			};
		});

		const description = items.map((item) => item.name).join(', ');
		const ids = items.map((item) => item.product_id).join(', ');

		/**
		 * get payment id
		 */

		const paymentMethods = await stripe.paymentMethods.list({
			customer: stripeBuyerId,
			type: 'card',
		});

		await stripe.paymentIntents.create({
			amount: total * 100, // gotta multiply by 100 because stripe takes everything in cents
			currency: 'cad',
			on_behalf_of: stripeCustomerId,
			customer: stripeBuyerId,
			confirm: true,
			off_session: true,
			payment_method: paymentMethods.data[0].id,
			description,
			transfer_data: {
				amount: (percentage / 100) * (total * 100),
				destination: stripeCustomerId,
			},
			metadata: { integration_check: 'accept_a_payment', products: ids },
		});
		
		return {
			success: true,
		};
	} catch (error) {
		console.log(error);
		throw Error('There was a problem, please try again');
	}
};

export {
	create,
	createFromApp,
	createOnboardingLink,
	updateOnboardingAccountStatus,
	deleteFromApp,
	balanceFromApp,
	createPayout,
};
