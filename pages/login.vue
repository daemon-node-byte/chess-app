<script setup lang="ts">
const auth = useAuthHandler()



const googleLogin = async () => {
(await auth).loginWithGoogle();
}

</script>
<!-- TODO: extract in to component and inject to page, use component for signin modal
 + -->
<template>
  <!-- TODO: create signup functionality and connect to UI -->
  <div class="flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold my-6">Welcome to My Chess App</h1>
      <UCard>
        <template #header>
            <h2 class="text-2xl text-bold text-center">Sign In</h2>
        </template>
        <div class="space-y-6">
          <UInput disabled class="text-primary" color="gray" type="email" placeholder="Email" icon="i-heroicons-user-circle-16-solid" padded variant="outline" size="lg" leading />
          <UInput disabled class="text-primary" color="gray" type="password" placeholder="Password" icon="i-heroicons-lock-closed-16-solid" padded variant="outline" size="lg" leading />  
          <UButton block disabled label="Login" variant="soft" /> 
          <p class="pb-4 text-sm text-center">Don't have a account? <ULink active-class="text-primary" inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700">Register here.</ULink></p>
        </div>
        <UDivider label="OR"/>
        <div class="space-y-4 pt-4">
        <p class="text-center text-sm">Sign in with social account.</p>

          <UButton label="Login with Google" block trailing-icon="i-devicon-google" @click="googleLogin" />
          <!-- TODO: Get FB OAuth credentials -->
          <UButton label="Login with Facebook" block disabled trailing-icon="i-devicon-facebook" />
        </div>
        </UCard>
      </div>
</template>