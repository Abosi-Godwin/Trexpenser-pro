import { supabase } from "../Services/Supabase";

export const formatCurrency = number => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN"
    }).format(number);
};

export const roundTotalPrice = array => {
    return array.reduce(
        (ac, ini) =>
            ini.type === "income" ? ac + ini.amount : ac - ini.amount,
        0
    );
};

export const roundDownPrice = array => {
    if (!array) return;
    return array.reduce((ac, ini) => ac + ini, 0);
};

export const formatDate = date => new Date(date).toDateString();

export const sortData = data =>
    data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
 
export const updateUserPic = async (imagePath, imageName, image) => {
    const { data, error } = await supabase.storage
        .from("profile-pictures")
        .upload(`public/${imageName}`, image, {
            contentType: image.type
        });
    if (error) {
        console.error("Error uploading image");
        
    }
    return data 
};
