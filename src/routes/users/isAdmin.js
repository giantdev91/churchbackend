import isAdmin from "~/db/users/isAdmin";

async function isAdminRH(req, res){
    const { userId } = req.params;
    const rows = await isAdmin( userId );
    await res.json(rows);
}

export default isAdminRH;