Para aplicar os estilos que você mencionou, e assegurar que os campos do formulário fiquem lado a lado, é necessário envolver os campos dentro das divs `form-container` e `form-group`:

```html
<template>
  <div>
    <h1>Adicionar Novo Paciente</h1>
    <div class="form-container">
      <div class="form-group">
        <span class="text-sm">E-mail</span>
        <Input placeholder="E-mail" autocomplete="off" v-model="payload.email" />
      </div>
      <div class="form-group">
        <span class="text-sm">Nome</span>
        <Input placeholder="Nome" autocomplete="off" v-model="payload.username" />
      </div>
      <div class="form-group">
        <span class="text-sm">Data de Nascimento</span>
        <Input type="date" autocomplete="off" v-model="payload.birthdate" />
      </div>
      <div class="form-group">
        <span class="text-sm">Sexo Biológico</span>
        <select v-model="payload.gender">
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
      </div>
      <div class="form-group">
        <span class="text-sm">Nome Civil</span>
        <Input autocomplete="off" v-model="payload.civilName" />
      </div>
      <div class="form-group">
        <span class="text-sm">Gênero (Opcional)</span>
        <Input autocomplete="off" v-model="payload.optionalGender" />
      </div>
      <div class="form-group">
        <span class="text-sm">CPF</span>
        <Input autocomplete="off" v-model="payload.cpf" />
      </div>
      <div class="form-group">
        <span class="text-sm">RG</span>
        <Input autocomplete="off" v-model="payload.rg" />
      </div>
      <div class="form-group">
        <span class="text-sm">Naturalidade</span>
        <Input autocomplete="off" v-model="payload.naturalness" />
      </div>
      <div class="form-group">
        <span class="text-sm">Nacionalidade</span>
        <Input autocomplete="off" v-model="payload.nationality" />
      </div>
      <div class="form-group">
        <span class="text-sm">Religião</span>
        <Input autocomplete="off" v-model="payload.religion" />
      </div>
      <div class="form-group">
        <span class="text-sm">Escolaridade</span>
        <Input autocomplete="off" v-model="payload.education" />
      </div>
      <div class="form-group">
        <span class="text-sm">Estado</span>
        <Input autocomplete="off" v-model="payload.state" />
      </div>
      <div class="form-group">
        <span class="text-sm">Etnia</span>
        <Input autocomplete="off" v-model="payload.ethnicity" />
      </div>
      <div class="form-group">
        <span class="text-sm">Estado Civil</span>
        <Input autocomplete="off" v-model="payload.maritalStatus" />
      </div>
      <div class="form-group">
        <span class="text-sm">Profissão</span>
        <Input autocomplete="off" v-model="payload.profession" />
      </div>
      <div class="form-group">
        <span class="text-sm">CEP</span>
        <Input autocomplete="off" v-model="payload.cep" />
      </div>
      <div class="form-group">
        <span class="text-sm">Endereço</span>
        <Input autocomplete="off" v-model="payload.address" />
      </div>
      <div class="form-group">
        <span class="text-sm">Número</span>
        <Input autocomplete="off" v-model="payload.number" />
      </div>
      <div class="form-group">
        <span class="text-sm">Complemento</span>
        <Input autocomplete="off" v-model="payload.complement" />
      </div>
      <div class="form-group">
        <span class="text-sm">Bairro</span>
        <Input autocomplete="off" v-model="payload.neighborhood" />
      </div>
      <div class="form-group">
        <span class="text-sm">Cidade</span>
        <Input autocomplete="off" v-model="payload.city" />
      </div>
      <div class="form-group">
        <span class="text-sm">Estado do Endereço</span>
        <Input autocomplete="off" v-model="payload.stateAddress" />
      </div>
      <div class="form-group">
        <span class="text-sm">País</span>
        <Input autocomplete="off" v-model="payload.country" />
      </div>
      <div class="form-group">
        <span class="text-sm">Celular</span>
        <Input autocomplete="off" v-model="payload.cellPhone" />
      </div>
      <div class="form-group">
        <span class="text-sm">Telefone Residencial</span>
        <Input autocomplete="off" v-model="payload.homePhone" />
      </div>
      <div class="form-group">
        <span class="text-sm">Telefone Comercial</span>
        <Input autocomplete="off" v-model="payload.workPhone" />
      </div>
      <div class="form-group">
        <span class="text-sm">Convênio</span>
        <Input autocomplete="off" v-model="payload.insurance" />
      </div>
      <div class="form-group">
        <span class="text-sm">Plano</span>
        <Input autocomplete="off" v-model="payload.plan" />
      </div>
      <div class="form-group">
        <span class="text-sm">Número da Carteirinha</span>
        <Input autocomplete="off" v-model="payload.cardNumber" />
      </div>
      <div class="form-group">
        <span class="text-sm">Validade</span>
        <Input type="date" autocomplete="off" v-model="payload.validity" />
      </div>
      <div class="form-group">
        <span class="text-sm">Acomodação</span>
        <Input autocomplete="off" v-model="payload.accommodation" />
      </div>
      <div class="form-group">
        <Button variant="secondary" @click="handleCreateUser" :disabled="isLoadingButton || !payload.email || !payload.username">
          <Loader2 v-if="isLoadingButton" class="animate-spin" />
          Adicionar
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-vue-next";
import handlePatients from "@/core/services/handlePatients";
import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();
const isLoadingButton = ref(false);
const payload = ref({
  username: "",
  email: ""
});

const handleCreateUser = () => {
  isLoadingButton.value = true;
  handlePatients.add(payload.value)
    .then(() => {
      toast({ description: "Paciente criado com sucesso." });
    })
    .catch((err) => {
      const description = err.response?.data ? err.response.data.message : "Houve um erro interno, tente novamente em instantes.";
      toast({ description, variant: "destructive" });
    })
    .finally(() => isLoadingButton.value = false);
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.form-group {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
}
</style>
