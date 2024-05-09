import {S3} from 'aws-sdk';
import {PutObjectRequest} from 'aws-sdk/clients/s3';
import {uuid} from 'uuidv4';

export const s3Upload = async (
  fileInput,
  folderName,
  fileName,
) => {
  const s3 = new S3();
  if (Array.isArray(fileInput)) {
    const fileType = fileInput[0].mimetype.split('/')[0];
    const params = fileInput.map(file => {
      return {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${folderName}/${fileType}/${fileName}/${uuid()}`,
        Body: file.buffer,
        ContentType: `${file.mimetype}`,
      }
    });
    return await Promise.all(params.map(param => s3.upload(param).promise()));
  } else {
    const fileType = fileInput.mimetype.split('/')[0];
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folderName}/${fileType}/${fileName}/${uuid()}`,
      Body: fileInput.buffer,
      ContentType: `${fileInput.mimetype}`,
    }

    return await s3.upload(params).promise();
  }
};
