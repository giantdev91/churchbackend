async function extractPostHashtags({ description }) {
	const hashtagMatchings = [...description.matchAll(/#(?<hashtag>\w{1,128})/g)];
	return hashtagMatchings.map((match) => match.groups.hashtag);
}

async function extractPostMentions({ description }) {
	const postMentions = [...description.matchAll(/@(?<username>\w{1,128})/g)];
	return postMentions.map((match) => match.groups.username);
}

export { extractPostHashtags, extractPostMentions };
