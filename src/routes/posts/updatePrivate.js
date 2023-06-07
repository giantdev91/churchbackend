import updatePrivate from '~/db/posts/private/update';

/**
 * Update a post
 * @path {PATCH} /posts/:postId
 * @body {string} title - The new title for the post
 * @body {string} description - The new description for the post
 */
async function updatePrivateRH(req, res) {
	const {postId} = req.body;
	await updatePrivate({ postId});
	await res.sendStatus(200);
	
}

export default updatePrivateRH;
