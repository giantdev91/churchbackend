// Copied Original upload.js, just allow the ability to rename file instead of using filepath
import dotenv from 'dotenv';
import fs from 'fs';

import AWS from './aws';

dotenv.config({ silent: true });

// The name of the bucket that you have created
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const s3 = new AWS.S3();

const uploadFile = (fileName, fileRename) => {
	// Read content from the file
	const fileContent = fs.readFileSync(fileName);

	// Setting up S3 upload parameters
	const params = {
		Bucket: BUCKET_NAME,
		Key: fileRename, // File name you want to save as in S3
		Body: fileContent,
		ACL: 'public-read',
	};

	// Uploading files to the bucket
	s3.upload(params, (err, data) => {
		if (err) {
			throw err;
		}
		console.log(`File uploaded successfully. ${data.Location}`);
	});
};

export default uploadFile;
