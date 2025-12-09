# S3 Bucket Policy for QR Code Public Access

Since ACLs are disabled on your S3 bucket, you need to add a bucket policy to make QR codes publicly accessible.

## Steps:

1. Go to AWS Console → S3
2. Find your bucket: `autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev` (or check your aws-exports.js for the exact name)
3. Go to **Permissions** tab
4. Scroll down to **Bucket policy**
5. Click **Edit** and add this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadQRCodes",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/qrcodes/*"
    }
  ]
}
```

Replace `YOUR_BUCKET_NAME` with your actual bucket name from `aws-exports.js` (the `aws_user_files_s3_bucket` value).

## Alternative: Enable ACLs (if you prefer)

If you want to use ACLs instead:

1. Go to S3 bucket → **Permissions** tab
2. Scroll to **Object Ownership**
3. Click **Edit**
4. Select **ACLs enabled**
5. Check **Bucket owner preferred** (or **Object writer** if you want writers to own objects)
6. Save

Then the code will work with `ACL: 'public-read'`.

