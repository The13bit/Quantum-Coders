import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error('No file path provided');
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Clean up local file
        fs.unlinkSync(localFilePath);

        // Return upload response
        return {
            url: response.url,
            public_id: response.public_id,
            secure_url: response.secure_url
        };

    } catch (error) {
        // Clean up local file on error
        try {
            fs.unlinkSync(localFilePath);
        } catch (unlinkError) {
            console.error('Error removing temporary file:', unlinkError);
        }

        // Throw original error
        throw new Error(`Upload failed: ${error.message}`);
    }
};

export { uploadOnCloudinary };