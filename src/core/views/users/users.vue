<script setup lang="ts">
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableCell, TableRow, TableBody } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrashIcon, Loader2, PlusIcon } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import handleUsers from "../../services/handleUsers"
import moment from "moment"
import getUsernameFromToken from "../../utils/user"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/components/ui/toast/use-toast';
import handleAuth from "../../services/handleAuth";

const { toast } = useToast()

const rows = ref<any>([]);
const isLoading = ref(false);
const isLoadingButton = ref(false);
const username = ref("");
const isOpenModalAddUser = ref(false);
const isOpenModalRemoveUser = ref(false);
const userSelected = ref({ username: "", id: "" });
const payload = ref({
    username: "",
    email: "",
    password: ""
})

const handleGetUsers = () => {
    isLoading.value = true;
    handleUsers.get()
        .then(({ data }) => {
            rows.value = data;
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
    userSelected.value = {
        username: "",
        id: ""
    };
}

const handleChangeUsername = (event: any) => {
    const { value } = event.target;
    payload.value.username = value?.substring(0, 100)
}

const handleChangeEmail = (event: any) => {
    const { value } = event.target;
    payload.value.email = value?.substring(0, 100)
}

const handleChangePassword = (event: any) => {
    const { value } = event.target;
    payload.value.password = value?.substring(0, 100)
}

const handleCreateUser = () => {
    isLoadingButton.value = true;
    handleAuth.createUser(payload.value)
        .then(() => {
            toast({ description: "Usuário criado com sucesso." });
            handleGetUsers()
            handleCloseModalAddUser()
        })
        .catch((err) => {
            const description = err.response?.data ? err.response.data.message : "Houve um erro interno, tente novamente em instantes."
            toast({ description, variant: "destructive" });
        })
        .finally(() => isLoadingButton.value = false)
}

const handleRemoveUser = () => {
    /* @ts-ignore */
    const userId = userSelected.value.id;
    isLoadingButton.value = true;
    handleUsers.remove(userId)
        .then(() => {
            toast({ description: "Usuário removido com sucesso." });
            handleGetUsers();
            handleCloseModalRemoveUser();
        })
        .catch((err) => {
            const description = err.response?.data ? err.response.data.message : "Houve um erro interno, tente novamente em instantes."
            toast({ description, variant: "destructive" });
        })
        .finally(() => isLoadingButton.value = false)
}

onMounted(() => {
    handleGetUsers()
    const token = localStorage.getItem("accessToken") || "";
    /* @ts-ignore */
    username.value = getUsernameFromToken(token)?.username;
})

</script>
<template>
    <div class="flex flex-col gap-4 items-end p-4">
        <div class="w-full">
            <span class="text-xl">Farmaceuticos</span>
        </div>
        <Button variant="outline" @click="handleOpenModalAddUser">
            <PlusIcon />
            Adicionar farmaceutico
        </Button>
        <Card class="p-4 w-full rounded-md flex flex-col items-center">
            <Loader2 v-if="isLoading" class="animate-spin" />
            <Table v-if="!isLoading">
                <TableHeader>
                    <TableRow>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">E-mail</TableCell>
                        <TableCell align="center">Data de criação</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="row of rows">
                        <TableCell align="center">{{ row.username }}</TableCell>
                        <TableCell align="center">{{ row.email }}</TableCell>
                        <TableCell align="center">{{ moment(row.createdAt).format("DD/MM/YYYY [às] HH:mm:ss") }}</TableCell>
                        <TableCell align="center">
                            <Button size="icon" variant="outline" :disabled="row.username == username" @click="handleOpenModalRemoveUser(row)">
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
                <div>
                    <span class="text-sm">Senha</span>
                    <Input placeholder="Senha" type="password" autocomplete="off" @input="handleChangePassword" v-model="payload.password" />
                </div>
                <div class="flex justify-end gap-4">
                    <Button variant="secondary" @click="handleCreateUser" :disabled="isLoadingButton || !payload.email || !payload.username || !payload.password">
                        <Loader2 v-if="isLoadingButton" class="animate-spin" />
                        Adicionar
                    </Button>
                    <Button variant="ghost" @click="handleCloseModalAddUser">Fechar</Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
        <AlertDialog :open="isOpenModalRemoveUser">
            <AlertDialogContent>
                <AlertDialogTitle>Remover usuário</AlertDialogTitle>
                <div>
                    <span class="text-sm">Ao confirmar você irá remover o usuário {{ userSelected.username }}, esta ação não poderá ser desfeita.</span>
                </div>
                <div class="flex justify-end gap-4">
                    <Button variant="secondary" @click="handleRemoveUser" :disabled="isLoadingButton">
                        <Loader2 v-if="isLoadingButton" class="animate-spin" />
                        Confirmar
                    </Button>
                    <Button variant="ghost" @click="handleCloseModalRemoveUser">Fechar</Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>