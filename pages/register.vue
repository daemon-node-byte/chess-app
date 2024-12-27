<script setup lang="ts">
const authHandler = useAuthHandler();
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const username = ref('')
// const errors = ref<string[]>([])


const registerUser = async () => {
  try {

    const response = await (await authHandler).signUpUser(email.value, password.value)
    console.log(response)
    

  } catch (error) {
    console.error(error)
    throw createError(`signup failed: ${error}`)
  }
}

</script>
<!-- TODO: add form validation -->
<template>
  <div class="flex justify-center items-center w-full h-dvh -mt-[80px]">
    <UCard class="w-[350px]">
      <template #header>
        <h1 class="text-2xl text-center font-bold">Create your profile</h1>  
      </template>
      <form @submit.prevent="registerUser" class="space-y-4">
        <UFormGroup label="Email">
          <UInput v-model="email" size="lg" variant="outline" type="email" />
        </UFormGroup>
        <UFormGroup label="Screen name">
          <UInput v-model="username" size="lg" variant="outline" type="text" />
        </UFormGroup>
        <UFormGroup label="Password">
          <UInput v-model="password" size="lg" variant="outline" type="password" />
        </UFormGroup>
        <UFormGroup class="pb-4" label="Password Confirmation">
          <UInput v-model="passwordConfirmation" size="lg" type="password" />
        </UFormGroup>
        
        <UButton :disabled="!email || !password || !passwordConfirmation || !username" size="lg" type="submit" block>Sign Up</UButton>
      </form>
      <template #footer>
        <p class="text-xs text-center">Already have an account? <ULink to="/login" active-class="text-primary" inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Login here.</ULink></p>
      </template>
    </UCard>
  </div>
</template>

<style scoped></style>
