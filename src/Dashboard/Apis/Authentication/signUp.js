import { supabase, supabaseUrl } from "../../Services/Supabase";

const profileImage = `${supabaseUrl}/storage/v1/object/public/avatars//avatar.png`;

export const userSignUp = async ({ name, email, password }) => {
    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                picture: profileImage,
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
