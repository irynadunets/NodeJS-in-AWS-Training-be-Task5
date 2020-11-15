const AWS = require('aws-sdk');
const BUCKET = 'import-service-dev-serverlessdeploymentbucket-1xl2cscffi702';

export const importFileParser = async (event) => {
  const S3 = new AWS.S3({region: 'eu-west-1'});

  event.Records.forEach(record => {
    const s3Stream = s3.getObject({
      Bucket: BUCKET,
      Key: record.s3.object.key
    }).createReadStream();

  s3Stream.pipe(csv())
     .on('data', (data)=>{
       console.log(data);
     })
     .on('end', async () => {
       console.log('Copy from' + BUCKET + '/' + record.s3.object.key);

      await s3.copyObject({
         Bucket: BUCKET,
         CopySource: BUCKET + '/' + record.s3.object.key,
         Key: record.s3.object.key.replace('uploaded', 'parsed')
       }).promise();

     console.log('Copied into ' + BUCKET + '/' + record.s3.object.key.replace('uploaded', 'parsed'));
     });
  });

}
