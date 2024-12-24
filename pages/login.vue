<script setup lang="ts">
const supabase = useSupabaseClient()

const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    
  })
  if (error) {
    console.error('Login error:', error.message)
  }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold my-6">Welcome to My Chess App</h1>
    <button class="btn btn-primary" @click="loginWithGoogle" >
      Login with Google
    </button>
  </div>
</template>