import dotenv from 'dotenv';

import AWS from './aws';

dotenv.config({ silent: true });

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const CreatePhotoPost = (buffer, id) => {
	// if (!filePath.match(/\.(jpg|jpeg|png)$/)) {
	// 	throw new Error('File not supported');
	// }

	// if (file.size > 10000000) {
	// 	throw new Error('File is too big');
	// }

	const params = {
		Bucket: BUCKET_NAME,
		Key: `public/uploads/posts/photos/${id}.png`,
		Body: buffer,
		ACL: 'public-read',
	};

	const S3 = new AWS.S3();

	return new Promise((resolve, reject) => {
		S3.upload(params, (err, data) => {
			if (err) {
				return reject(err);
			}
			return resolve(data);
		});
	});
};

export default CreatePhotoPost;
