import { supabase } from "../../Services/Supabase";

export const updateProfilePic = async ({ imagePath, imageName, newImage }) => {
    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(imageName, newImage, {
            contentType: newImage.type
        });
    if (error) console.error("Error uploading image");
    
    return data
};
