// Cloudinary storage helper
import { ENV } from './_core/env';
import { v2 as cloudinary } from 'cloudinary';

function getCloudinary() {
  if (!ENV.cloudinaryCloudName || !ENV.cloudinaryApiKey || !ENV.cloudinaryApiSecret) {
    throw new Error(
      'Cloudinary credentials missing: set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET'
    );
  }
  cloudinary.config({
    cloud_name: ENV.cloudinaryCloudName,
    api_key: ENV.cloudinaryApiKey,
    api_secret: ENV.cloudinaryApiSecret,
  });
  return cloudinary;
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = 'application/octet-stream'
): Promise<{ key: string; url: string }> {
  const cld = getCloudinary();

  const base64 =
    typeof data === 'string'
      ? data
      : Buffer.from(data as Buffer).toString('base64');

  const dataUri = `data:${contentType};base64,${base64}`;

  const publicId = relKey.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9/_-]/g, '_');

  const result = await cld.uploader.upload(dataUri, {
    public_id: publicId,
    overwrite: true,
    resource_type: 'auto',
  });

  return { key: relKey, url: result.secure_url };
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const cld = getCloudinary();
  const publicId = relKey.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9/_-]/g, '_');
  const url = cld.url(publicId, { secure: true });
  return { key: relKey, url };
}
