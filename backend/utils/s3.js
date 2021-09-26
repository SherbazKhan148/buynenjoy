import S3 from "aws-sdk";
import fs from "fs";

// Upload a file to S3
function uploadFileS3(file) {
    const Bucket = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_BUCKET_REGION;
    const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;

    const s3 = new S3.S3({
        region,
        accessKeyId,
        secretAccessKey,
    });

    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket,
        Body: fileStream,
        Key: file.filename,
    };

    return s3.upload(uploadParams).promise();
}

export { uploadFileS3 };
