<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { LogOut } from "lucide-vue-next"
import navigation from "../../config/navigation"
import { useRouter } from "vue-router";
import getUsernameFromToken from "../../utils/user";
import { onMounted, ref } from "vue";

const theme = {
    dark: 'dark',
    light: 'light'
}
const mode = useColorMode()
const router = useRouter()
const user = ref("")

const handleChangeTheme = () => {
    mode.value = mode.value == theme.dark ? theme.light : theme.dark;
}

const handleChangeRouter = (path: string) => {
    router.push(path)
}

const handleLogout = () => {
    localStorage.setItem("accessToken", "")
    router.push("/")
}

onMounted(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!!accessToken) {
        user.value = getUsernameFromToken(accessToken);
    }
})

</script>

<template>
  <header class="border-b-2 px-4 py-2 flex justify-between">
    <div class="flex">
        <div v-for="route of navigation">
            <Button v-if="route.roles.includes(user.roles)" variant="link" @click="handleChangeRouter(route.path)">{{ route.name }}</Button>
        </div>
    </div>
    <div class="flex justify-end gap-2 items-center">
        <Button size="icon" variant="outline" @click="handleChangeTheme">
            <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <Button :size="!user?.username ? 'icon' : 'default'" variant="outline" class="flex gap-4" @click="handleLogout">
            <span>{{ user?.username || "" }}</span>
            <LogOut />
        </Button>
    </div>
  </header>
</template>