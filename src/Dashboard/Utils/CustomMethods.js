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
    return array?.reduce((ac, ini) => ac + ini, 0);
};

export const formatDate = date => new Date(date).toDateString();

export const sortData = data =>
    data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

export const getCurrentUser = async () => {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) return null;

    const { data: user, error } = await supabase.auth.getUser();
    if (!user?.user) return;

    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }

    return user;
};

export const addUsers = async datas => {
    const { data, error } = await supabase
        .from("Users")
        .insert([{ ...datas }])
        .select();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return data;
};

export const userSignUp = async ({ name, email, password }) => {
    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                userName: name
            }
        }
    });

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return data;
};

export const userLogIn = async ({ email, password }) => {
    console.log(email, password);
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
};

export const insertTransaction = async transaction => {
    const { data, error } = await supabase
        .from("transactions")
        .insert([{ ...transaction }])
        .select();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return data;
};
export const deleteTransacationApi = async transactionId => {
    const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transactionId);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

export const userLogOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

export const getUserTransactions = async userId => {
    const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return sortData(data);
};

export const getSavingsApi = async userId => {
    let { data, error } = await supabase
        .from("savings")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return sortData(data);
};

export const addSavingsApi = async savingsObj => {
    const { data, error } = await supabase
        .from("savings")
        .insert([{ ...savingsObj }])
        .select();

    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
    return data;
};

export const updateSavingsApi = async info => {
    const { savingsId, amountToSave } = info;

    const { data, error } = await supabase
        .from("savings")
        .update({ amount_saved: amountToSave })
        .eq("id", savingsId)
        .select();

    if (error) {
        console.error("updating savings error", error);
        throw new Error(error.message);
    }
    return data;
};

export const getUserBudgets = async userId => {
    let { data, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    // console.log(data);
    return await sortData(data);
};

export const getInsightsAPI = async inputData => {
    const { data, error } = await supabase.functions.invoke(
        "geminiAI_insight",
        {
            body: { prompt: inputData }
        }
    );
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    //   console.log(data);
    return data;
};

export const updateUserPic = async (imagePath, imageName, image) => {
    console.log(imageName);

    const { data, error } = await supabase.storage
        .from("profile-pictures")
        .upload(`public/${imageName}`, image, {
            contentType: image.type
        });
    if (error) {
        console.error("Error uploading image");
        // return;
    }
};

// Later append to user data.
const { error: saveError } = await supabase.auth.updateUser({
    data: {
        picture:
            "https://cnwbxmsiieoyrmarrdgf.supabase.co/storage/v1/object/public/avatars//IMG-20241226-WA0021.jpg"
    }
});

//if (saveError) console.error(saveError);
/*
https://cnwbxmsiieoyrmarrdgf.supabase.co/storage/v1/object/public/avatars//avatar.png
 https://cnwbxmsiieoyrmarrdgf.supabase.co/storage/v1/object/public/profile-pictures//avatar.png
https://cnwbxmsiieoyrmarrdgf.supabase.co/storage/v1/object/public/avatars//0.34305072344490506-IMG_20250618_101442_097.jpg
*/
