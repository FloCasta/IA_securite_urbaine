<!-- Modal question -->
<template>
  <Transition name="modal">
    <div class="card_modal">
      <div class="head_modal">
        <div class="title_modal">
          <h2>{{ props.title }}</h2>
        </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleQuestionModal" />
      </div>
      <div class='main_modal'>
        <p>Question</p>
        <div class="question_modal">{{ props.question }}</div>
        <p>Choix multiple</p>
        <div class="answers_question">
          <div class="answer_question" v-for="answer in props.answers" @click="clickAnswer(answer.id)"
            v-bind:class="{ checked_question: selectedAnswer.includes(answer.id) }">
            {{ answer.answer }}</div>
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
import type { QuestionAnswer } from '@/class/Question';

const store = useAlertsStore();

const props = defineProps({
  id: String,
  next: { type: Function, required: true },
  previous: { type: Function, required: true },
  addPoint: { type: Function, required: true },
  title: String,
  question: String,
  answers: Array<QuestionAnswer>,
  textAnswer: String,
});

const data = ref({ questionId: null as String | null, selectedAnswer: [] as number[] });
const selectedAnswer = ref<number[]>([]);
const answerPage = false;

const clickAnswer = (a: number) => {
  const index = selectedAnswer.value.indexOf(a);
  if (index !== -1) {
    selectedAnswer.value.splice(index, 1);
  } else {
    selectedAnswer.value.push(a);
  }
}

const previous = () => {
  store.toggleQuestionModal();
  props.previous();
}

const submit = () => {
  store.toggleQuestionModal();
  checkAnswer();
  props.next();
}

const checkAnswer = () =>{
  let nGoodAnswers = 0
  let goodAsnwsers = props.answers?.filter((a) => a.response == true);
  goodAsnwsers?.forEach((a)=>{
    if(selectedAnswer.value.includes(a.id)){
      nGoodAnswers +=1;
    }
  })
  
  let point = 0;
  if(nGoodAnswers == goodAsnwsers!.length)
    point = 1;
  else if (nGoodAnswers == 0)
    point = 0;
  else 
    point = 0.5
  props.addPoint(new Point(point,"type"));
}

</script>
  
<style>
.answers_question {
  padding: 0 2vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  max-height: 40vh;
}

.answer_question {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: .7rem;
  height: 6vh;
  margin: .5vh .5vw;
  padding: 1vh 1vw;
  cursor: pointer;
  background-color: #638e995d;
  transition: filter 0.3s ease, transform 0.3s ease;

  &:hover {
    filter: drop-shadow(0 0 2rem white);
    transform: translateY(-3px);

    ::before {
      filter: brightness(.5);
      top: -100%;
      left: 200%;
    }
  }

}

.checked_question {
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
  transform: translate3d(0, 0, 3px);
  transition: filter 0.3s ease, transform 0.3s ease;
}
</style>