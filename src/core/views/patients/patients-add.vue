<!-- eslint-disable -->
<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import { EMaritalStatus, MaritalStatusTranslations } from "@/core/enums/EMaritalStatus";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { formatPhone } from "@/core/utils/phone";
import { formatCPF, formatRg } from "@/core/utils/document";
import handlePatients from "@/core/services/handlePatients";
import { Loader2 } from "lucide-vue-next";
import { useToast } from '@/components/ui/toast/use-toast';
import { useRouter } from "vue-router";

const { toast } = useToast();
const router = useRouter();

const payload = ref({
    username: "",
    birthDate: "",
    gender: "male",
    address: "",
    phone: "",
    maritalStatus: "",
    email: "",
    cpf: "",
    rg: ""
});
const isLoading = ref(false);

const handleChangeName = (event: any) => {
    const { value } = event.target;
    payload.value.username = value?.substring(0, 100)
}

const handleChangeAddress = (event: any) => {
    const { value } = event.target;
    payload.value.address = value?.substring(0, 100)
}

const handleChangeEmail = (event: any) => {
    const { value } = event.target;
    payload.value.email = value?.substring(0, 100)
}

const handleChangePhone = (event: any) => {
    const { value } = event.target;
    payload.value.phone = formatPhone(value)
}

const handleChangeCpf = (event: any) => {
    const { value } = event.target;
    payload.value.cpf = formatCPF(value)
}

const handleChangeRg = (event: any) => {
    const { value } = event.target;
    payload.value.rg = formatRg(value)
}

const handleAddPatient = () => {
    isLoading.value = true;
    handlePatients.add({
        ...payload.value,
        phone: payload.value.phone?.replace(/\D/g, ""),
        rg: payload.value.rg?.replace(/\D/g, ""),
        cpf: payload.value.cpf?.replace(/\D/g, "")
    })
        .then(() => {
            toast({ description: "Cadastro realizado com sucesso." });
            router.push("/patients")
        })
        .catch((err) => {
            const description = err.response?.data ? err.response.data.message : "Houve um erro interno, tente novamente em instantes."
            toast({ description, variant: "destructive" });
        })
        .finally(() => isLoading.value = false)
}

</script>
<template>
    <div class="flex flex-col gap-4 p-4">
        <div class="w-full">
            <span class="text-xl">Adicionar Paciente</span>
        </div>
        <Card class="p-4 rounded-sm">
            <span>Dados do paciente</span>
            <div class="mt-4 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <label
                    for="Username"
                    class="relative block rounded-md border  shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <Input
                        type="text"
                        id="Username"
                        class="peer border-none w-full h-12 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Nome completo"
                        @input="handleChangeName"
                        v-model="payload.username"
                    />
                    <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white dark:bg-slate-950 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Nome completo</span>
                </label>
                <label
                    for="BirthDate"
                    class="relative block rounded-md border  shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <Input
                        type="date"
                        id="BirthDate"
                        class="peer border-none w-full h-12 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Data de nascimento"
                        v-model="payload.birthDate"
                    />
                    <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white dark:bg-slate-950 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Data de nascimento</span>
                </label>
                <div class="flex items-center gap-4">
                    <span>Sexo:</span>
                    <RadioGroup class="flex gap-4" v-model="payload.gender">
                        <div class="flex items-center space-x-2">
                            <RadioGroupItem id="r1" value="male" />
                            <Label for="r1">Masculino</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                            <RadioGroupItem id="r2" value="female" />
                            <Label for="r2">Feminino</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                            <RadioGroupItem id="r3" value="others" />
                            <Label for="r3">Não informar</Label>
                        </div>
                    </RadioGroup>
                </div>
                <label
                    for="Address"
                    class="relative block rounded-md border  shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <Input
                        type="text"
                        id="Address"
                        class="peer border-none w-full h-12 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Endereço"
                        @input="handleChangeAddress"
                        v-model="payload.address"
                    />
                    <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white dark:bg-slate-950 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Endereço</span>
                </label>
                <label
                    for="Phone"
                    class="relative block rounded-md border  shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <Input
                        type="text"
                        id="Phone"
                        class="peer border-none w-full h-12 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Telefone/WhatsApp"
                        @input="handleChangePhone"
                        v-model="payload.phone"
                    />
                    <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white dark:bg-slate-950 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Telefone/WhatsApp</span>
                </label>
                <Select v-model="payload.maritalStatus">
                    <SelectTrigger class="h-12">
                        <SelectLabel>{{ payload.maritalStatus ? MaritalStatusTranslations[payload.maritalStatus] : "Estado Civil"}}</SelectLabel>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="item of EMaritalStatus" :value="item" >{{ MaritalStatusTranslations[item] }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <label
                    for="Email"
                    class="relative block rounded-md border  shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <Input
                        type="text"
                        id="Email"
                        class="peer border-none w-full h-12 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="E-mail"
                        @input="handleChangeEmail"
                        v-model="payload.email"
                    />
                    <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white dark:bg-slate-950 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">E-mail</span>
                </label>
                <label
                    for="Cpf"
                    class="relative block rounded-md border  shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <Input
                        type="text"
                        id="Cpf"
                        class="peer border-none w-full h-12 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="CPF"
                        @input="handleChangeCpf"
                        v-model="payload.cpf"
                    />
                    <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white dark:bg-slate-950 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">CPF</span>
                </label>
                <label
                    for="RG"
                    class="relative block rounded-md border  shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <Input
                        type="text"
                        id="RG"
                        class="peer border-none w-full h-12 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="RG"
                        @input="handleChangeRg"
                        v-model="payload.rg"
                    />
                    <span class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white dark:bg-slate-950 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">RG</span>
                </label>
                <div></div>
                <div></div>
                <Button :disabled="isLoading" class="flex gap-2" @click="handleAddPatient">
                    <Loader2 v-if="isLoading" class="animate-spin" />
                    Cadastrar
                </Button>
            </div>
        </Card>
    </div>
</template>