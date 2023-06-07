import rejectVerification from '~/db/users/rejectVerification';

async function rejectVerificationRH (req, res) {
    const { userId } = req.params;

    await res.json(await rejectVerification({ userId }));
}

export default rejectVerificationRH;