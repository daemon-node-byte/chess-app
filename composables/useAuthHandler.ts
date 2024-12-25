export const useAuthHandler = async () => {
  const supabase = useSupabaseClient();

  const checkDisplayName = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      console.error(error);
      throw createError(error?.message || "User not authenticated");
    }
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existingUser) {
      navigateTo("/setup-username");
    }
  };

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      throw createError(error?.message);
    }
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error(error);
      throw createError(error?.message || "Failed to sign in");
    }
    checkDisplayName();
  };

  return { checkDisplayName, logoutUser, loginWithGoogle };
};
