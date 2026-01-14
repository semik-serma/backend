// CORRECT: Use EITHER ES6 import OR require, not both
import cloudinary from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: 'root',
    api_key: '744943472684582',
    api_secret: 'jjL3PlgvSogdfMUrjSGAcwHgjYU'
});

// For async/await upload (recommended for your article API)
export const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            // Your upload options here
            upload_preset: "my_preset" // Optional for unsigned uploads[citation:3]
        });
        console.log('Upload successful:', result.secure_url);
        return result;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};

// For generating transformation URLs
const imageUrl = cloudinary.url("sample.jpg", {
    width: 100,
    height: 150,
    crop: "fill",
    fetch_format: "auto"
});
console.log('Generated URL:', imageUrl);