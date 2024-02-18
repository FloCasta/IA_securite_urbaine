<!-- Modal des questions à 8 réponses -->
<template>
    <Transition name="modal">
        <div class="card_modal">
            <div class="head_modal">
                <div class="title_modal">
                    <h2>{{ props.title }}</h2>
                </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png'
                    @click="store.toggleHeightQuestionModal" />
            </div>
            <div class='main_modal'>
                <p>Question</p>
                <div class="question_modal">{{ props.question }}</div>
                <p>Choix multiple</p>
                <div class="answers_height_question">
                    <div class="answer_height_question" v-for="answer in props.answers" @click="clickAnswer(answer.id)"
                        v-bind:class="{ checked_height_question: selectedAnswer.includes(answer.id) }">
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
import { useAlertsStore } from '@/store';
import { ref } from 'vue';
import { Point } from '@/class/Point';
import type { HeightAnswer } from '@/class/HeightQuestion';

const store = useAlertsStore();

const props = defineProps({
    id: { type: String, required: true },
    next: { type: Function, required: true },
    previous: { type: Function, required: true },
    addPoint: { type: Function, required: true },
    title: String,
    question: String,
    answers: Array<HeightAnswer>,
    textAnswer: String,
});

const data = ref({ questionId: null as string | null, selectedAnswer: [] as number[] });
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

const previous = () =>{
  store.toggleHeightQuestionModal();
  props.previous();
}

const submit = () => {
  store.toggleHeightQuestionModal();
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
    
<style scoped>
.answers_height_question {
    padding: 0 4vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    min-height: 34vh;
}

.answer_height_question {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 9.5vw;
    height: 13vh;
    border-radius: .7rem;
    margin: .5vh .5vw;
    padding: 1vh 1vw;
    font-size: 0.8rem;
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

.checked_height_question {
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
    transform: translate3d(0, 0, 3px);
    transition: filter 0.3s ease, transform 0.3s ease;
}

@media screen and (max-width: 900px) {
    .answers_height_question {
        padding: 0 2vw;
        flex-direction: column;
        flex-wrap: nowrap;
        max-height: 45vh;
    }

    .answer_height_question {
        width: 100%;
        max-height: 2.5vh;
        min-height: 2vh;
        font-size: .6rem;
    }
}
</style>
  