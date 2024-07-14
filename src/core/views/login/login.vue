<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import emailUtils from "../../utils/email"
import handleAuth from "../../services/handleAuth";
import { useToast } from '@/components/ui/toast/use-toast';
import { useRouter } from "vue-router";
import { Loader2 } from "lucide-vue-next";

const { toast } = useToast()
const router = useRouter()

const isLoading = ref(false);
const payload = ref({
    email: "",
    password: ""
});
const errors = ref({
    email: false
})

const handleChangeEmail = (event) => {
    const { value } = event.target;
    payload.value.email = value?.substring(0, 100);
}

const handleChangePassword = (event) => {
    const { value } = event.target;
    payload.value.password = value?.substring(0, 100);
}

const handleLogin = () => {

    errors.value.email = false
    if (!emailUtils.isValid(payload.value.email)) {
        errors.value.email = true;
        return;
    };

    isLoading.value = true;
    handleAuth.auth(payload.value)
        .then(({data}) => {
            localStorage.setItem("accessToken", data.token);
            router.push("/home")
        })
        .catch((err) => {
            const description = err.response?.data ? err.response.data.message : "Houve um erro interno, tente novamente em instantes."
            toast({ description, variant: "destructive" });
        })
        .finally(() => isLoading.value = false);
}

</script>
<template>
    <div class="flex items-center justify-center h-screen">
        <Card class="p-4 rounded-md flex gap-4 flex-col w-full max-w-80">
            <span class="text-xl font-bold">Login</span>
            <div>
                <span class="text-sm">E-mail</span>
                <Input placeholder="E-mail" v-model="payload.email" @input="handleChangeEmail" />
                <span v-if="errors.email" class="text-sm text-red-400">E-mail inválido</span>
            </div>
            <div>
                <span class="text-sm">Senha</span>
                <Input placeholder="Senha" type="password" v-model="payload.password" @input="handleChangePassword" />
            </div>
            <Button variant="secondary" class="w-full" @click="handleLogin" :disabled="!payload.email || !payload.password || isLoading">
                <Loader2 v-if="isLoading" class="animate-spin"/>
                Entrar
            </Button>
            <Button variant="link" class="w-full" @click="() => router.push('/register')">Registrar-se</Button>
        </Card>
    </div>
</template>