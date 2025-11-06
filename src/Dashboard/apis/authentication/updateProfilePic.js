import { supabase } from "../../services/Supabase";

export const updateProfilePic = async ({ imageName, newImage }) => {
    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(imageName, newImage, {
            contentType: newImage.type
        });
    if (error) console.error("Error uploading image");

    return data;
};
/*
export const updateUserPic = async (imagePath, imageName, image) => {
  const { data, error } = await supabase.storage
    .from("profile-pictures")
    .upload(`public/${imageName}`, image, {
      contentType: image.type,
    });
  if (error) {
    console.error("Error uploading image");
  }
  return data;
};
*/