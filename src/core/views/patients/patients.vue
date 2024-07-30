<script setup lang="ts">
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table"
import handlePatients from "@/core/services/handlePatients";
import { useToast } from '@/components/ui/toast/use-toast';
import { onMounted, ref } from "vue";
import { TrashIcon, Loader2, PlusIcon, ChevronRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button"
import { useRouter } from "vue-router";
import { formatCPF } from "@/core/utils/document";
import { formatPhone } from "@/core/utils/phone";

const { toast } = useToast();
const router = useRouter(); 

const handleGetDetails = (id: string) => {
    router.push(`/patients/${id}/details`)
}

const isLoading = ref(false);
const rows = ref<any>([]);

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

const handleCreateUser = () => {
    router.push("/patients/add");
}

onMounted(() => {
    handleGetPatients();
});

</script>
<template>
    <div class="flex flex-col gap-4 items-end p-4">
        <div class="w-full">
            <span class="text-xl">Pacientes</span>
        </div>
        <Button variant="outline" @click="handleCreateUser">
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
                        <TableCell align="center">CPF</TableCell>
                        <TableCell align="center">Telefone</TableCell>
                        <TableCell align="center">Sexo</TableCell>
                        <TableCell align="center">Farmaceutico</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="row of rows">
                        <TableCell align="center">{{ row.username }}</TableCell>
                        <TableCell align="center">{{ row.email }}</TableCell>
                        <TableCell align="center">{{ formatCPF(row.cpf) }}</TableCell>
                        <TableCell align="center">{{ row.phone ? formatPhone(row.phone) : "Não informado" }}</TableCell>
                        <TableCell align="center">{{ row.gender == 'male' ? 'Masculino' : row.gender == 'female' ? 'Feminino' : 'Não informado' }}</TableCell>
                        <TableCell align="center">{{ row.createdBy }}</TableCell>
                        <TableCell align="center" class="flex gap-2 justify-end">
                            <Button size="icon" variant="outline">
                                <TrashIcon />
                            </Button>
                            <Button size="icon" variant="outline" @click="handleGetDetails(row.id)">
                                <ChevronRight />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    </div>
</template>