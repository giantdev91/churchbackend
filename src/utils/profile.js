import countPosts from '~/db/posts/count';
import getUserFollowersCount from '~/db/users/follow/getFollowersCount';
import getUserFollowingCount from '~/db/users/follow/getFollowingCount';
import getUserPrivateInfo from '~/db/users/profile/getPrivate';
import getUserPublicInfo from '~/db/users/profile/getPublic';
// import getMaxReferral from '~/db/users/referral/getMaxReferral';


/*
{
  # public
  username,
  display_name,
  bio,
  country,
  city,
  score,
  followersCount,
  followingCount,
  postsCount,

  # private
  phone_number,
	stripe_customer_id
}
 */

async function getUserPrivateProfile(userId) {
	const followersCount = await getUserFollowersCount({ userId });
	const followingCount = await getUserFollowingCount({ userId });
	const postsCount = await countPosts({ userId });
	const privateUserInfo = await getUserPrivateInfo({ userId });

	return {
		followersCount,
		followingCount,
		postsCount,
		...privateUserInfo,
	};
}

async function getUserPublicProfile(userId) {
	const followersCount = await getUserFollowersCount({ userId });
	const followingCount = await getUserFollowingCount({ userId });
	const postsCount = await countPosts({ userId });
	// const CountMax = await getMaxReferral({ userId });
	const publicUserInfo = await getUserPublicInfo({ userId });

	return {
		followersCount,
		followingCount,
		postsCount,
		// referralCountMax,
		...publicUserInfo,
	};
}

export { getUserPrivateProfile, getUserPublicProfile };
