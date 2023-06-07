import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

AWS.config.update({
	region: process.env.AWS_REGION,
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_ACCESS_SECRET,
});

module.exports = AWS;
