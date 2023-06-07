import submitAffiliateForm from '~/db/website/submitAffiliateForm';

async function submitAffiliateFormRH(req, res) {
	await submitAffiliateForm({ formData: req.body });
	res.sendStatus(200);
}

export default submitAffiliateFormRH;
