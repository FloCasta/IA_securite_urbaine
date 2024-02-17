<!-- Modal des phrases à trou -->
<template>
    <Transition name="modal">
      <div class="level_modal">
        <div class='btn_submit_modal'>
          <button class="btn_return" @click="submit" v-show="answerPage">Retour</button>
        </div>
      </div>
    </Transition>
  </template>
    
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAlertsStore } from '@/store';
  
  const store = useAlertsStore();
  
  const props = defineProps({
    id: { type: String, required: true },
    next: { type: Function, required: true },
    nextQ: Number,
    title: String,
    start_question: String,
    end_question: String,
    holy_word: String,
    textAnswer: String,
  });
  
  const data = ref({ questionId: null as String | null, selectedAnswer: [] as number[] });
  const selectedAnswer = ref<string>("");
  const answerPage = false;
  
  const submit = () => {
    store.toggleHolySentenceModal(false);
    props.next(props.nextQ);
  }
  
  </script>
    
  <style scoped>
  .level_modal {
    height: 80vh;
    width: 70vw;
    margin: 5vh auto;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 7px 20px 5px #00000088;
    border-radius: .7rem;
    backdrop-filter: blur(10px);

  }
  </style>
    