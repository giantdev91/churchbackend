import dotenv from 'dotenv';
import fs from 'fs';

import AWS from './aws';

dotenv.config({ silent: true });

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const UploadMusic = (destination, postType, postExt, id) => {
	// if (!filePath.match(/\.(jpg|jpeg|png)$/)) {
	// 	throw new Error('File not supported');
	// }

	// if (file.size > 10000000) {
	// 	throw new Error('File is too big');
	// }

	const buffer = fs.readFileSync(destination);

	const params = {
		Bucket: BUCKET_NAME,
		ACL: 'public-read',
		Body: buffer,
	};

	if (postType === 'music') {
		params.Key = `public/uploads/music/${id}.${postExt}`;
	} else {
		params.Key = `public/uploads/music/${postType}/${id}.${postExt}`;
	}

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

export default UploadMusic;
