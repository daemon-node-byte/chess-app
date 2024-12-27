export const useAuthHandler = async () => {
  const supabase = useSupabaseClient();
  // TODO: remove layer of abstraction Email signup
  const signUpUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        console.error(error);
        throw createError(error || "Failed to sign up");
      }
      return data;
    } catch (error) {
      console.error(error);
      throw createError(`signup failed: ${error}`);
    }
  }

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
  // TODO: remove layer of abstraction Email login
  const loginWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error(error);
        throw createError(error?.message || "Failed to sign in");
      }
      checkDisplayName();
    } catch (error) {
      console.error(error);
      throw createError(`login failure: ${error}`);
    }
  }
  // TODO: remove layer of abstraction Google login
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

  return { checkDisplayName, logoutUser, loginWithGoogle, signUpUser, loginWithEmail };
};
