<template>
    <div>
      <h1>Detalhes do Paciente</h1>
      <div v-if="patient">
        <p><strong>Nome:</strong> {{ patient.username }}</p>
        <p><strong>Email:</strong> {{ patient.email }}</p>
        <p><strong>Data de Nascimento:</strong> {{ patient.birthdate }}</p>
        <p><strong>Sexo:</strong> {{ patient.gender }}</p>
        <p><strong>Nome Civil:</strong> {{ patient.civilName }}</p>
        <p><strong>Gênero Opcional:</strong> {{ patient.optionalGender }}</p>
        <p><strong>CPF:</strong> {{ patient.cpf }}</p>
        <p><strong>RG:</strong> {{ patient.rg }}</p>
        <p><strong>Naturalidade:</strong> {{ patient.naturalness }}</p>
        <p><strong>Nacionalidade:</strong> {{ patient.nationality }}</p>
        <p><strong>Religião:</strong> {{ patient.religion }}</p>
        <p><strong>Escolaridade:</strong> {{ patient.education }}</p>
        <p><strong>Estado:</strong> {{ patient.state }}</p>
        <p><strong>Etnia:</strong> {{ patient.ethnicity }}</p>
        <p><strong>Estado Civil:</strong> {{ patient.maritalStatus }}</p>
        <p><strong>Profissão:</strong> {{ patient.profession }}</p>
        <p><strong>CEP:</strong> {{ patient.cep }}</p>
        <p><strong>Endereço:</strong> {{ patient.address }}</p>
        <p><strong>Número:</strong> {{ patient.number }}</p>
        <p><strong>Complemento:</strong> {{ patient.complement }}</p>
        <p><strong>Bairro:</strong> {{ patient.neighborhood }}</p>
        <p><strong>Cidade:</strong> {{ patient.city }}</p>
        <p><strong>Estado do Endereço:</strong> {{ patient.stateAddress }}</p>
        <p><strong>País:</strong> {{ patient.country }}</p>
        <p><strong>Celular:</strong> {{ patient.cellPhone }}</p>
        <p><strong>Telefone Residencial:</strong> {{ patient.homePhone }}</p>
        <p><strong>Telefone Comercial:</strong> {{ patient.workPhone }}</p>
        <p><strong>Convênio:</strong> {{ patient.insurance }}</p>
        <p><strong>Plano:</strong> {{ patient.plan }}</p>
        <p><strong>Número da Carteirinha:</strong> {{ patient.cardNumber }}</p>
        <p><strong>Validade:</strong> {{ patient.validity }}</p>
        <p><strong>Acomodação:</strong> {{ patient.accommodation }}</p>
      </div>
      <div v-else>
        <p>Carregando...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const patient = ref(null);
  
  onMounted(async () => {
    const { id } = route.params;
    const response = await axios.get(`/api/v1/patients/${id}`);
    patient.value = response.data;
  });
  </script>
  