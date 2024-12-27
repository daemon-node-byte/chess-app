<script setup lang="ts">
const props = defineProps<{
  username: string
  email: string
  avatar: string
  alt: string
}>()
const supabase = useSupabaseClient();
const items = ref([
  [{
    label: props.email,
    slot: 'account',
    disabled: true
  }], [{
    label: 'Profile',
    icon: 'i-heroicons-cog-8-tooth',
    disabled: true
  }], [{
    label: 'Documentation',
    icon: 'i-heroicons-book-open',
    disabled: true
  }, {
    label: 'Changelog',
    icon: 'i-heroicons-megaphone',
    disabled: true
  }, {
    label: 'Status',
    icon: 'i-heroicons-signal',
    disabled: true
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw createError(error);
        }
        window.location.href = '/';
    }
  }]
])
</script>

<template>
  <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-end' }">
    <UAvatar :src="props.avatar" :alt="props.alt" icon="i-ic-outline-account-circle" class="outline outline-primary" />

    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>

