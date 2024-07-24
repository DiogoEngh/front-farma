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
import { useRouter } from 'vue-router';
const router = useRouter();

const { toast } = useToast();

const isLoading = ref(false);
const rows = ref([]);
const isLoadingButton = ref(false);
const isOpenModalAddUser = ref(false);
const isOpenModalRemoveUser = ref(false);
const userSelected = ref({});
const showMoreFields = ref(false); // Para controle dos campos extras
const payload = ref({
    username: "",
    email: "",
    birthdate: "",
    gender: "",
    civilName: "",
    optionalGender: "",
    cpf: "",
    rg: "",
    naturalness: "",
    nationality: "",
    religion: "",
    education: "",
    state: "",
    ethnicity: "",
    maritalStatus: "",
    profession: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    stateAddress: "",
    country: "",
    cellPhone: "",
    homePhone: "",
    workPhone: "",
    insurance: "",
    plan: "",
    cardNumber: "",
    validity: "",
    accommodation: ""
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
const handleOpenNewPatient = () => {
  router.push({ name: 'NewPatient' });
};


const handleCloseModalAddUser = () => {
    isOpenModalAddUser.value = false;
}

const handleOpenModalRemoveUser = (row: any) => {
    isOpenModalRemoveUser.value = true;
    userSelected.value = row;
}
const handleOpenPatientDetails = (id:number) => {
    router.push({ name: 'PatientDetails', params: { id } });
}

const handleCloseModalRemoveUser = () => {
    isOpenModalRemoveUser.value = false;
    userSelected.value = {};
}

const handleChangeField = (event: any, field: string) => {
    payload.value[field] = event.target.value;
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
            toast({ description: "Paciente removido com sucesso." });
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
                        <TableCell align="center">
    <Button size="icon" variant="outline" @click="handleOpenPatientDetails(row.id)">
        <PlusIcon />
    </Button>
</TableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </Card>
        <AlertDialog :open="isOpenModalAddUser">
            <AlertDialogContent>
                <AlertDialogTitle>Adicionar pacientes</AlertDialogTitle>
                <div>
                    <span class="text-sm">E-mail</span>
                    <Input placeholder="E-mail" autocomplete="off" @input="event => handleChangeField(event, 'email')" v-model="payload.email" />
                </div>
                <div>
                    <span class="text-sm">Nome</span>
                    <Input placeholder="Nome" autocomplete="off" @input="event => handleChangeField(event, 'username')" v-model="payload.username" />
                </div>
                <div v-if="showMoreFields">
                    <!-- Novos Campos -->
                    <div>
                        <span class="text-sm">Data de Nascimento</span>
                        <Input type="date" autocomplete="off" @input="event => handleChangeField(event, 'birthdate')" v-model="payload.birthdate" />
                    </div>
                    <div>
                        <span class="text-sm">Sexo Biológico</span>
                        <select @change="event => handleChangeField(event, 'gender')" v-model="payload.gender">
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                    </div>
                    <div>
                        <span class="text-sm">Nome Civil</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'civilName')" v-model="payload.civilName" />
                    </div>
                    <div>
                        <span class="text-sm">Gênero (Opcional)</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'optionalGender')" v-model="payload.optionalGender" />
                    </div>
                    <div>
                        <span class="text-sm">CPF</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'cpf')" v-model="payload.cpf" />
                    </div>
                    <div>
                        <span class="text-sm">RG</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'rg')" v-model="payload.rg" />
                    </div>
                    <div>
                        <span class="text-sm">Naturalidade</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'naturalness')" v-model="payload.naturalness" />
                    </div>
                    <div>
                        <span class="text-sm">Nacionalidade</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'nationality')" v-model="payload.nationality" />
                    </div>
                    <div>
                        <span class="text-sm">Religião</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'religion')" v-model="payload.religion" />
                    </div>
                    <div>
                        <span class="text-sm">Escolaridade</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'education')" v-model="payload.education" />
                    </div>
                    <div>
                        <span class="text-sm">Estado</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'state')" v-model="payload.state" />
                    </div>
                    <div>
                        <span class="text-sm">Etnia</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'ethnicity')" v-model="payload.ethnicity" />
                    </div>
                    <div>
                        <span class="text-sm">Estado Civil</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'maritalStatus')" v-model="payload.maritalStatus" />
                    </div>
                    <div>
                        <span class="text-sm">Profissão</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'profession')" v-model="payload.profession" />
                    </div>
                    <div>
                        <span class="text-sm">CEP</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'cep')" v-model="payload.cep" />
                    </div>
                    <div>
                        <span class="text-sm">Endereço</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'address')" v-model="payload.address" />
                    </div>
                    <div>
                        <span class="text-sm">Número</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'number')" v-model="payload.number" />
                    </div>
                    <div>
                        <span class="text-sm">Complemento</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'complement')" v-model="payload.complement" />
                    </div>
                    <div>
                        <span class="text-sm">Bairro</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'neighborhood')" v-model="payload.neighborhood" />
                    </div>
                    <div>
                        <span class="text-sm">Cidade</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'city')" v-model="payload.city" />
                    </div>
                    <div>
                        <span class="text-sm">Estado</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'stateAddress')" v-model="payload.stateAddress" />
                    </div>
                    <div>
                        <span class="text-sm">País</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'country')" v-model="payload.country" />
                    </div>
                    <div>
                        <span class="text-sm">Celular</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'cellPhone')" v-model="payload.cellPhone" />
                    </div>
                    <div>
                        <span class="text-sm">Casa</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'homePhone')" v-model="payload.homePhone" />
                    </div>
                    <div>
                        <span class="text-sm">Trabalho</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'workPhone')" v-model="payload.workPhone" />
                    </div>
                    <div>
                        <span class="text-sm">Convênio</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'insurance')" v-model="payload.insurance" />
                    </div>
                    <div>
                        <span class="text-sm">Plano</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'plan')" v-model="payload.plan" />
                    </div>
                    <div>
                        <span class="text-sm">Nº Carteirinha</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'cardNumber')" v-model="payload.cardNumber" />
                    </div>
                    <div>
                        <span class="text-sm">Validade</span>
                        <Input type="date" autocomplete="off" @input="event => handleChangeField(event, 'validity')" v-model="payload.validity" />
                    </div>
                    <div>
                        <span class="text-sm">Acomodação</span>
                        <Input autocomplete="off" @input="event => handleChangeField(event, 'accommodation')" v-model="payload.accommodation" />
                    </div>
                </div>
                <Button variant="outline" @click="handleOpenNewPatient">
  Mostrar mais
</Button>

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