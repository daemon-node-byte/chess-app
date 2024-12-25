
<script setup>

const username = ref('');
const supabase = useSupabaseClient();

const submitUsername = async () => {
  // TODO: Add validation for username from zod
  if (!username.value.trim()) {
    alert('Username cannot be empty.');
    return;
  }

  // TODO: modulate this into a function to custom composable
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error('Error fetching user:', userError);
    return;
  }

  // Insert into users table
  const { error: insertError } = await supabase
    .from('users')
    .insert([{ id: user.id, username: username.value, status: 'online' }]);

  if (insertError) {
    console.error('Error inserting user:', insertError);
    alert('Failed to save username. Please try again.');
    return;
  }

  // Redirect to the lobby
  navigateTo('/lobby');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <UCard>

      <h1 class="text-2xl font-bold mb-4">Set Up Your Display Name</h1>
    <form @submit.prevent="submitUsername">
      <div class="mb-4">
        <!-- <label for="username" class="block text-sm font-medium text-gray-700">Username</label> -->
        <UInput
        id="username"
        v-model="username"
        type="text"
        placeholder="Enter a display name"
        required
        />
      </div>
      <UButton
      type="submit"
        block
        >
        Save
      </UButton>
    </form>
  </UCard>
  </div>
</template>

