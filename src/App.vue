<script setup lang="ts">
import Layout from "./core/views/layout/layout.vue";
import { useRoute } from "vue-router";
import Toaster from '@/components/ui/toast/Toaster.vue'

const route = useRoute();

</script>
<template>
  <router-view v-if="route.path == '/login'" />
  <Layout v-else />
  <Toaster />
</template>