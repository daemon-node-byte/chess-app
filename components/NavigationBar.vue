<script setup lang="ts">
const session = useSupabaseSession().value
const user = useSupabaseUser().value

const unauthorizedLinks = [
  {
    label: 'Login',
    icon: '',
    to: '/login',
  }
]

const authorizedLinks = [
  {
    label: '',
    icon: '',
    to: '',
    avatar: {
      src: user?.user_metadata.avatar_url,
      alt: 'User avatar',
      size: 'sm'
    },
  }]

const rightSideLinks = ref(session && user ? authorizedLinks : unauthorizedLinks);

const links = [
  [{ label: 'Lain-Chess', labelClass: 'text-primary text-2xl', icon: '', to: '/' }],
  rightSideLinks.value
]
</script>

<template>
  <UHorizontalNavigation :links="links" class="px-4">
    <template #avatar="{ link }">
      <template v-if="link.avatar">
        <UserAvatarMenu 
          :avatar="link.avatar.src || ''" :alt="link.avatar.alt || 'user avatar'" 
          :email="user?.user_metadata.email"
          :username="user?.user_metadata.full_name" />
      </template>
      <template v-if="link.to === '/'">
        <img src="/logov2.svg" alt="lain-chess logo" class="h-12 w-12">
      </template>
    </template>
  </UHorizontalNavigation>
</template>