import updatePost from '~/db/posts/update';

/**
 * Update a post
 * @path {PATCH} /posts/:postId
 * @body {string} title - The new title for the post
 * @body {string} description - The new description for the post
 */
async function updatePostRH(req, res) {
	const { title, description } = req.body;
	await updatePost({ postId: req.params.postId, title, description });
	await res.sendStatus(200);
}

export default updatePostRH;
