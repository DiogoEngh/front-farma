<script setup lang="ts">
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FileIcon, ForwardIcon, PrinterIcon } from 'lucide-vue-next';

</script>
<template>
    <div class="flex gap-4 flex-col">
        <Card class="w-full p-2 rounded-sm">
            <div class="flex w-full gap-4 items-center">
                <div>
                    <Avatar class="w-20 h-20">
                        <AvatarFallback class="text-xl">NO</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <span>Neusa Oliveira Rodrigues</span><br>
                    <span><span class="font-bold">Idade: </span> 68 anos, 6 meses e 17 dias</span><br>
                    <span><span class="font-bold">Convênio: </span> Cortesia</span><br>
                    <span><span class="font-bold">Primeira consulta: </span> 20/03/2024</span>
                </div>
            </div>
        </Card>
        <div class="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <Card class="p-4 rounded-sm w-full">
                <span class="font-bold">Antec. clínicos</span><br>
                <span class="text-sm">Endometriose</span><br>
            </Card>
            <Card class="p-4 rounded-sm w-full">
                <span class="font-bold">Antec. cirúrgicos</span><br>
                <span class="text-sm">Laparopsia para remoção de endometriose, cesária</span><br>
            </Card>
            <Card class="p-4 rounded-sm w-full">
                <span class="font-bold">Antec. Familiares</span><br>
                <span class="text-sm">DMA, CA de mama</span><br>
            </Card>
            <Card class="p-4 rounded-sm w-full">
                <span class="font-bold">Hábitos</span><br>
                <span class="text-sm">Caminhada de 30min 3x semana</span><br>
            </Card>
        </div>
        <div>
            <span>Últimos diagnósticos</span>
            <hr class="mt-2"/>
        </div>
        <div class="flex justify-end gap-4">
            <Button variant="outline" class="flex gap-2">
                <ForwardIcon />
                Compartilhar
            </Button>
            <Button variant="outline" class="flex gap-2">
                <PrinterIcon />
                Imprimir
            </Button>
            <Button variant="outline" class="flex gap-2">
                <FileIcon />
                Baixar PDF
            </Button>
        </div>
        <hr />
        <Card class="p-8 rounded-sm">
            <ol class="relative border-s border-gray-400 dark:border-gray-700">                  
                <li class="mb-10 ms-6">            
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-400 rounded-full -start-3 ring-8 ring-gray-300 dark:ring-gray-900 dark:bg-blue-900"></span>
                    <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">20 de março de 2024</h3>
                    <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Por Dra. Carolina Rodriigues</time>
                    <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore odio molestias ipsa laborum ut necessitatibus nemo a quasi, reiciendis itaque consectetur possimus, dolorem minima cum et voluptas libero esse!
                    </p>
                </li>
            </ol>
        </Card>
    </div>
</template>