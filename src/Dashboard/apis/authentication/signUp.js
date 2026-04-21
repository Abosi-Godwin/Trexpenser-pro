import { supabase, supabaseUrl } from "../../services/Supabase";

const profileImage = `${supabaseUrl}/storage/v1/object/public/avatars//avatar.png`;

export const userSignUp = async ({ name, email, password }) => {
    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo:
                "https://trexpenser-dashboard.vercel.app/auth/callback",
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
