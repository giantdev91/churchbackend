const fs = require('fs');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

// Enter copied or downloaded access ID and secret key here
const AWSREGION = process.env.AWS_REGION;
const ID = process.env.S3_ACCESS_KEY;
const SECRET = process.env.S3_ACCESS_SECRET;

// The name of the bucket that you have created
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

AWS.config.update({
	region: AWSREGION,
	accessKeyId: ID,
	secretAccessKey: SECRET
});


const s3 = new AWS.S3();

const uploadFile = (fileName, fileRename) => {
	// Read content from the file
	console.log("fileName::::", fileName)
	const fileContent = fs.readFileSync(fileName);
	console.log("fileContent::::", fileContent)
	// Setting up S3 upload parameters
	const params = {
		Bucket: BUCKET_NAME,
		Key: fileRename, // File name you want to save as in S3
		Body: fileContent,
	};

	// // Uploading files to the bucket
	s3.upload(params, (err, data) => {
		if (err) {
			throw err;
		}
		console.log(`File uploaded successfully. ${data.Location}`);
	});
};

export default uploadFile;
