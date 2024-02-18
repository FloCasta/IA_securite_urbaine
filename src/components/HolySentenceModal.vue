<!-- Modal des phrases à trou -->
<template>
  <Transition name="modal">
    <div class="card_modal">
      <div class="head_modal">
        <div class="title_modal">
          <h2>{{ props.title }}</h2>
        </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleHolySentenceModal" />
      </div>
      <div class='main_modal'>
        <p>Question</p>
        <div class="question_holysentence">
          {{ props.start_question }}
          <input type="text" class="field_input" v-bind:class="{ field_input_good_answer: answerPage }"
            v-bind:readonly="answerPage" name="name" id='name' v-model="selectedAnswer" required>
          {{ props.end_question }}
        </div>
        <div class="text_answer_modal" v-show="answerPage">Réponse : {{ textAnswer }}</div>
      </div>
      <div class='btn_submit_modal'>
        <button class="btn_previous" @click="previous" v-show="!answerPage">Précédent</button>
        <button class="btn_next" @click="submit" v-show="!answerPage">Suivant</button>
        <button class="btn_return" @click="submit" v-show="answerPage">Retour</button>
      </div>
    </div>
  </Transition>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useAlertsStore } from '@/store';
import { Point } from '@/class/Point';
import diacritics from 'diacritics';

const store = useAlertsStore();

const props = defineProps({
  id: String,
  next: { type: Function, required: true },
  previous: { type: Function, required: true },
  addPoint: { type: Function, required: true },
  title: String,
  start_question: String,
  end_question: String,
  holy_word: String,
  textAnswer: String,
});

const data = ref({ questionId: null as String | null, selectedAnswer: [] as number[] });
const selectedAnswer = ref<string>("");
const answerPage = false;

const previous = () => {
  store.toggleHolySentenceModal();
  props.previous();
}

const submit = () => {
  store.toggleHolySentenceModal();
  checkAnswer();
  props.next();
}

const checkAnswer = () =>{
  let point = 0;
  //Clean the word to remoe space, accents, majuscule...
  let answer = diacritics.remove(selectedAnswer.value.toLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/[\s-]/g, "")).replace(/[\s-]/g, '');
  let holy_word = diacritics.remove(props.holy_word?.toLowerCase()).replace(/[\s-]/g, '') || "";
  if(answer === holy_word )
    point=1;
  else point = 0;

  props.addPoint(new Point(point,"type"));
}

</script>
  
<style scoped>
.question_holysentence {
  padding: 1vh 4vw;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
  