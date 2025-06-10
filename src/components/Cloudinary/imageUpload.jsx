const uploadImageToCloudinary =async(file)=>{
    try {
        console.log(file);
        const formData=new FormData();
        formData.append("file",file);
        formData.append("upload_preset","OLX-CLONE");
        formData.append("Cloud_name","dwzn1hr2v");

        const response=await fetch(`https://api.cloudinary.com/v1_1/dwzn1hr2v/image/upload`,{
            method:"POST",
            body:formData,
        });

        if(!response.ok){
            const errorData= await response.json();
            console.error("Error details:",errorData);
            throw new Error(`Failed to upload image:${errorData.error?.message || "unknown error"}`);

        }
        const data=await response.json();
        return data.secure_url;
        
    } catch (error) {
        çonsole.error("Error uploading image:",error);
        throw error;
    }
};
export default uploadImageToCloudinary;