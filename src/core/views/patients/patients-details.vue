<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"
import { Button } from "@/components/ui/button";
import { PlayCircleIcon, StopCircleIcon } from "lucide-vue-next";
import Details from "./details.vue";

const route = useRoute();
const customerId = route.params.customerId;
const isRunning = ref(true);

const tabs = [
    {
        name: 'Resumo',
        id: 1
    },
    {
        name: 'Tabela de acompanhamento',
        id: 2
    },
    {
        name: 'Atendimento',
        id: 3
    }
]

</script>
<template>
    <div class="w-full flex" style="height: calc(100vh - 3.4rem);">
        <div class="h-full w-60 border-r-2">
            <div class="flex items-center justify-start border-b-2 p-4">
                <span>Prontuário</span>
            </div>
            <div class="p-4">
                <Button :class="`w-full flex gap-2 items-center ${isRunning && 'bg-red-500 hover:bg-red-400'}`">
                    <StopCircleIcon v-if="isRunning" />
                    <PlayCircleIcon v-if="!isRunning" />
                    {{ isRunning ? "Encerrar atendimento" : "Iniciar atendimento" }}
                </Button>
                <div class="mt-4 flex gap-2 flex-col">
                    <div v-for="option of tabs">
                        <Button v-if="option.id <= 2 || isRunning" variant="ghost" class="w-full flex justify-start">{{ option.name }}</Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-4 w-full">
            <Details />
        </div>
    </div>
</template>