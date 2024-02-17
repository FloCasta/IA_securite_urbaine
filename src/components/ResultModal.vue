<!-- Modal des phrases à trou -->
<template>
    <Transition name="modal">
      <div class="result_modal">
        <div class="head_modal">
        <div class="title_modal">
            <h2>{{ props.title }}</h2>
          </div>
          <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleResultModalVisible" />
        </div>
        <button class="btn_start" @click="submit">mettre 4/5 premier niveau</button>
        <p>You did it</p>
      </div>
    </Transition>
  </template>
    
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAlertsStore } from '@/store';
  
  const store = useAlertsStore();
  
  const submit = () => {
    let t =[4,0,0]
    store.setScoreWorld1(t)
  }
  
  const props = defineProps({
    title: String
  });
  

  </script>
    
  <style scoped>
  .result_modal {
    height: 30vh;
    width: 70vw;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 7px 20px 5px #00000088;
    border-radius: .7rem;
    backdrop-filter: blur(10px);


  }
  </style>
    