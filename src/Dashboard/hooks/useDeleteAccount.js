 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../services/Supabase";
import toast from "react-hot-toast";

export const useDeleteAccount = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const deleteAccount = async () => {
    setIsDeleting(true);

    const { error } = await supabase.rpc("delete_user");

    if (error) {
      toast.error(error.message || "Failed to delete account.");
      setIsDeleting(false);
      return;
    }

  
    await supabase.auth.signOut();

    
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("sb-")) localStorage.removeItem(key);
    });
 
    await queryClient.invalidateQueries({ queryKey: ["user"] });

    toast.success("Account deleted.");
    setIsDeleting(false);
  };

  return { deleteAccount, isDeleting };
};