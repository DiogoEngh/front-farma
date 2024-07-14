<script setup lang="ts">
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table"
import handlePatients from "@/core/services/handlePatients";
import { useToast } from '@/components/ui/toast/use-toast';
import { onMounted, ref } from "vue";
import { TrashIcon, Loader2, PlusIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import moment from "moment"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const { toast } = useToast();

const isLoading = ref(false);
const rows = ref([]);
const isLoadingButton = ref(false);
const isOpenModalAddUser = ref(false);
const isOpenModalRemoveUser = ref(false);
const userSelected = ref({});
const payload = ref({
    username: "",
    email: ""
})

const handleGetPatients = () => {
    isLoading.value = true;
    handlePatients.get()
        .then(({ data }) => {
            rows.value = data;
        })
        .catch((err) => {
            const description = err.response?.data ? err.response.data.message : "Houve um erro interno, tente novamente em instantes."
            toast({ description, variant: "destructive" });
        })
        .finally(() => isLoading.value = false)
}

const handleOpenModalAddUser = () => {
    isOpenModalAddUser.value = true;
}

const handleCloseModalAddUser = () => {
    isOpenModalAddUser.value = false;
}

const handleOpenModalRemoveUser = (row: any) => {
    isOpenModalRemoveUser.value = true;
    userSelected.value = row;
}

const handleCloseModalRemoveUser = () => {
    isOpenModalRemoveUser.value = false;
    userSelected.value = {};
}

const handleChangeUsername = (event: any) => {
    const { value } = event.target;
    payload.value.username = value?.substring(0, 100)
}

const handleChangeEmail = (event: any) => {
    const { value } = event.target;
    payload.value.email = value?.substring(0, 100)
}

const handleCreateUser = () => {
    isLoadingButton.value = true;
    handlePatients.add(payload.value)
        .then(() => {
            toast({ description: "Paciente criado com sucesso." });
            handleGetPatients()
            handleCloseModalAddUser()
        })
        .catch((err) => {
            const description = err.response?.data ? err.response.data.message : "Houve um erro interno, tente novamente em instantes."
            toast({ description, variant: "destructive" });
        })
        .finally(() => isLoadingButton.value = false)
}

const handleRemoveUser = () => {
    isLoadingButton.value = true;
    handlePatients.remove(userSelected.value.id)
        .then(() => {
            toast({ description: "Paciente criado com sucesso." });
            handleGetPatients()
            handleCloseModalRemoveUser()
        })
        .catch((err) => {
            const description = err.response?.data ? err.response.data.message : "Houve um erro interno, tente novamente em instantes."
            toast({ description, variant: "destructive" });
        })
        .finally(() => isLoadingButton.value = false)
}

onMounted(() => {
    handleGetPatients()
})

</script>
<template>
    <div class="flex flex-col gap-4 items-end">
        <div class="w-full">
            <span class="text-xl">Pacientes</span>
        </div>
        <Button variant="outline" @click="handleOpenModalAddUser">
            <PlusIcon />
            Adicionar paciente
        </Button>
        <Card class="p-4 w-full rounded-md flex flex-col items-center">
            <Loader2 v-if="isLoading" class="animate-spin" />
            <Table v-if="!isLoading">
                <TableHeader>
                    <TableRow>
                        <TableCell align="center">Nome do paciente</TableCell>
                        <TableCell align="center">E-mail</TableCell>
                        <TableCell align="center">Data de criação</TableCell>
                        <TableCell align="center">Farmaceutico</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="row of rows">
                        <TableCell align="center">{{ row.username }}</TableCell>
                        <TableCell align="center">{{ row.email }}</TableCell>
                        <TableCell align="center">{{ moment(row.createdAt).format("DD/MM/YYYY [às] HH:mm:ss") }}</TableCell>
                        <TableCell align="center">{{ row.createdBy }}</TableCell>
                        <TableCell align="center">
                            <Button size="icon" variant="outline" @click="handleOpenModalRemoveUser(row)">
                                <TrashIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
        <AlertDialog :open="isOpenModalAddUser">
            <AlertDialogContent>
                <AlertDialogTitle>Adicionar farmaceuticos</AlertDialogTitle>
                <div>
                    <span class="text-sm">E-mail</span>
                    <Input placeholder="E-mail" autocomplete="off" @input="handleChangeEmail" v-model="payload.email" />
                </div>
                <div>
                    <span class="text-sm">Nome</span>
                    <Input placeholder="Nome" autocomplete="off" @input="handleChangeUsername" v-model="payload.username" />
                </div>
                <div class="flex justify-end gap-4">
                    <Button variant="secondary" @click="handleCreateUser" :disabled="isLoadingButton || !payload.email || !payload.username">
                        <Loader2 v-if="isLoadingButton" class="animate-spin" />
                        Adicionar
                    </Button>
                    <Button variant="ghost" @click="handleCloseModalAddUser">Fechar</Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
        <AlertDialog :open="isOpenModalRemoveUser">
            <AlertDialogContent>
                <AlertDialogTitle>Remover paciente</AlertDialogTitle>
                <div>
                    <span class="text-sm">Ao confirmar você irá remover o paciente {{ userSelected.username }}, esta ação não poderá ser desfeita.</span>
                </div>
                <div class="flex justify-end gap-4">
                    <Button variant="secondary" :disabled="isLoadingButton" @click="handleRemoveUser">
                        <Loader2 v-if="isLoadingButton" class="animate-spin" />
                        Confirmar
                    </Button>
                    <Button variant="ghost" @click="handleCloseModalRemoveUser">Fechar</Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>