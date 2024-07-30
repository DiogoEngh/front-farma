<script setup lang="ts">
import { Card } from '@/components/ui/card';
import { ref, onMounted } from 'vue';
import handlePatients from '@/core/services/handlePatients';
import handleUsers from '@/core/services/handleUsers';
import { useToast } from '@/components/ui/toast/use-toast';
import getUsernameFromToken from '@/core/utils/user';

const { toast } = useToast();

const isLoadingPatients = ref(false);
const rowsPatients = ref([]);
const isLoadingUsers = ref(false);
const rowsUsers = ref([]);
const user = ref<any>("");

const handleGetPatients = () => {
    isLoadingPatients.value = true;
    handlePatients.get()
        .then(({ data }) => {
            rowsPatients.value = data;
        })
        .catch((err) => {
            const description = err.response?.data ? err.response.data.message : "Houve um erro interno, tente novamente em instantes."
            toast({ description, variant: "destructive" });
        })
        .finally(() => isLoadingPatients.value = false)
}

const handleGetUsers = () => {
    isLoadingUsers.value = true;
    handleUsers.get()
        .then(({ data }) => {
            rowsUsers.value = data;
        })
        .catch((err) => {
            const description = err.response?.data ? err.response.data.message : "Houve um erro interno, tente novamente em instantes."
            toast({ description, variant: "destructive" });
        })
        .finally(() => isLoadingUsers.value = false)
}

onMounted(() => {
    handleGetPatients()
    handleGetUsers()
    const accessToken = localStorage.getItem("accessToken");
    if (!!accessToken) {
        user.value = getUsernameFromToken(accessToken);
    }
})

</script>
<template>
    <div class="p-4">
        <div class="w-full">
            <span class="text-xl">Início</span>
        </div>
        <div class="flex w-full gap-4 mt-4">
            <Card class="p-4 rounded-md w-full" v-if="user.roles == 1">
                <span>Quantidade de farmaceuticos</span><br>
                <span>{{ rowsUsers.length }}</span>
            </Card>
            <Card class="p-4 rounded-md w-full">
                <span>Quantidade de pacientes</span><br>
                <span>{{ rowsPatients.length }}</span>
            </Card>
        </div>
    </div>
</template>