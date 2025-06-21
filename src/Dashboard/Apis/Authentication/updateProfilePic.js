import { supabase } from "../../Services/Supabase";

export const updateProfilePic = async (imagePath, imageName, image) => {
    console.log(imageName);
    console.log(imagePath);

    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(imageName, image, {
            contentType: image.type
        });
    if (error) {
        console.error("Error uploading image");
        // return;
    }
};
