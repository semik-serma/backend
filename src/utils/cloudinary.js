import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';


    // Configuration
    cloudinary.config({ 
      cloud_name: "dghmvblkt",
      api_key: "744943472684582",
      api_secret: "jjL3PlgvSogdfMUrjSGAcwHgjYU", // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       })

       const storage = new CloudinaryStorage({
         cloudinary: cloudinary,
         params: {
           folder: 'article.controller.js',
         },
       });
        
       export const upload = multer({ storage: storage });
        
      