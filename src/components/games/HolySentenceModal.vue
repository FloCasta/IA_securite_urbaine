<!-- Modal des phrases à trou -->
<template>
  <div class="card_modal">
    <div class="head_modal">
      <div class="title_modal">
        <h2>{{ props.form.title }}</h2>
      </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png'
        @click="store.toggleHolySentenceModal(); store.toggleModals()" />
    </div>
    <div class='main_modal'>
      <p>Question</p>
      <div class="question_holysentence">
        {{ props.form.start_question }}
        <input type="text" autocomplete="off" class="field_input" v-bind:class="{ field_input_good_answer: answerPage }"
          v-bind:readonly="answerPage" name="name" id='name' v-model="selectedAnswer" required>
        {{ props.form.end_question }}
      </div>
      <div class="text_answer_modal" v-show="answerPage">Réponse : {{ props.form.textAnswer }}</div>
    </div>
    <div class='btn_submit_modal'>
      <button class="btn_previous" @click="previous" v-show="!answerPage">Précédent</button>
      <button class="btn_next" @click="submit" v-show="!answerPage">Suivant</button>
      <button class="btn_return" @click="back" v-show="answerPage">Retour</button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAlertsStore } from '@/store';
import { Point } from '@/class/Point';
import diacritics from 'diacritics';
import { HolySentence } from '@/class/HolySentence';

const store = useAlertsStore();

const props = defineProps({
  form: { type: HolySentence, required: true },
  next: { type: Function, required: true },
  previous: { type: Function, required: true },
  addPoint: { type: Function, required: true },
  isReadOnly: Boolean
});

const data = ref({ questionId: null as String | null, selectedAnswer: [] as number[] });
const selectedAnswer = ref<string>("");
const answerPage = ref<Boolean>(false);

watch([() => props.form, () => props.isReadOnly], ([form, isReadOnly]) => {
  answerPage.value = isReadOnly;
  if(answerPage.value){
    selectedAnswer.value = form.savedAnswer;
  }else{
    selectedAnswer.value = '';
  }

});

watch(() => props.isReadOnly, (isReadOnly) => {
    answerPage.value=isReadOnly;
});

const previous = () => {
  store.toggleHolySentenceModal();
  props.previous();
}

const submit = () => {
  store.toggleHolySentenceModal();
  checkAnswer();
  props.next();
}

const checkAnswer = () => {
  let point = 0;
  //Clean the word to remove space, accents, upper cases...
  let answer = diacritics.remove(selectedAnswer.value.toLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/[\s-]/g, "")).replace(/[\s-]/g, '');
  let holy_word = diacritics.remove(props.form.holy_word?.toLowerCase()).replace(/[\s-]/g, '') || "";
  if (answer === holy_word)
    point = 1;
  else point = 0;
  let form : HolySentence = { ...props.form, saveAnswer: props.form.saveAnswer };
  form.saveAnswer(selectedAnswer.value);
  props.addPoint(new Point(point, form, selectedAnswer.value));

}

const back = () =>{
    store.toggleHolySentenceModal();
    store.toggleResultModalVisible();
}

</script>
  
<style scoped>
.question_holysentence {
  padding: 1vh 4vw;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
  