import { BlobServiceClient } from "@azure/storage-blob";



export const uploadToBlob = async (file) => {
    try {
        
        const blobServiceClient = new BlobServiceClient("https://az900cert.blob.core.windows.net/mine?sp=racwdl&st=2025-01-25T23:25:03Z&se=2025-01-31T07:25:03Z&sip=0.0.0.0&sv=2022-11-02&sr=c&sig=tXo64bZY4sRleA9F5JsENd2eZ7JB0A31fP3TImWhlMA%3D");
        const containerClient = blobServiceClient.getContainerClient("mine");
        
        const blobName = `${Date.now()}-${file.name}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        
        const response = await blockBlobClient.uploadData(file);
        return blockBlobClient.url;
    } catch (error) {
        console.error("Error uploading to Azure:", error);
        throw error;
    }
};