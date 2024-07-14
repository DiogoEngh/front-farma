<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<template>
    <div>
        <header class="border-b-2 px-4 py-2 flex justify-between items-center">
            <div>
                <img src="../../../assets/logo.png" alt="logo" class="w-12">
            </div>
            <div class="flex gap-4">
                <Button @click="router.push('/login')">Entrar</Button>
                <Button variant="secondary" @click="router.push('/register')">Registrar-se</Button>
            </div>
        </header>
        <div class="flex flex-col justify-between h-screen">
            <main class="px-6 mt-6">
                <div class="w-full flex bg-slate-300 dark:bg-slate-800 rounded-2xl px-10 xl:px-20 py-4 xl:py-0">
                    <div class="w-full flex flex-col gap-4 xl:gap-8">
                        <span class="text-xl xl:text-4xl font-bold text-blue-500 xl:mt-8">Meu site</span>
                        <span class="max-w-96">Bem-vindo à nossa farmácia! Nossos farmacêuticos profissionais estão aqui para oferecer o melhor atendimento e aconselhamento para todas as suas necessidades de medicação. Confie em nós para receitas precisas e serviço personalizado. Sua saúde é nossa prioridade!</span>
                    </div>
                    <img src="../../../assets/background.png" alt="background" class="w-0 xl:w-80">
                </div>
                <div class="flex justify-center p-4 xl:px-20 flex-col items-center gap-4">
                    <span class="text-3xl">Sobre nós</span>
                    <span>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ab praesentium, facere saepe quo consectetur quas impedit eligendi commodi molestiae natus minima, unde voluptatum laboriosam eius quaerat architecto? Ex, totam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ab praesentium, facere saepe quo consectetur quas impedit eligendi commodi molestiae natus minima, unde voluptatum laboriosam eius quaerat architecto? Ex, totam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ab praesentium, facere saepe quo consectetur quas impedit eligendi commodi molestiae natus minima, unde voluptatum laboriosam eius quaerat architecto? Ex, totam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ab praesentium, facere saepe quo consectetur quas impedit eligendi commodi molestiae natus minima, unde voluptatum laboriosam eius quaerat architecto? Ex, totam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ab praesentium, facere saepe quo consectetur quas impedit eligendi commodi molestiae natus minima, unde voluptatum laboriosam eius quaerat architecto? Ex, totam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ab praesentium, facere saepe quo consectetur quas impedit eligendi commodi molestiae natus minima, unde voluptatum laboriosam eius quaerat architecto? Ex, totam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ab praesentium, facere saepe quo consectetur quas impedit eligendi commodi molestiae natus minima, unde voluptatum laboriosam eius quaerat architecto? Ex, totam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ab praesentium, facere saepe quo consectetur quas impedit eligendi commodi molestiae natus minima, unde voluptatum laboriosam eius quaerat architecto? Ex, totam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ab praesentium, facere saepe quo consectetur quas impedit eligendi commodi molestiae natus minima, unde voluptatum laboriosam eius quaerat architecto? Ex, totam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ab praesentium, facere saepe quo consectetur quas impedit eligendi commodi molestiae natus minima, unde voluptatum laboriosam eius quaerat architecto? Ex, totam.
                    </span>
                </div>
            </main>
            <footer class="bg-zinc-800 mt-8 py-8 px-4">
                <span class="text-white">© 2024 Meu Site. Todos os direitos reservados.</span>
            </footer>
        </div>
    </div>
</template>
