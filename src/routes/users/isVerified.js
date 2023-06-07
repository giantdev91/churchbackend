import isVerified from "~/db/users/isVerified";

async function isVerifiedRH(req, res){
    const { userId } = req.params;
    const rows = await isVerified( userId );
    await res.json(rows);
}

export default isVerifiedRH;