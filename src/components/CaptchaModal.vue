<!-- Modal des questions à 8 réponses -->
<template>
    <Transition name="modal">
        <div class="card_modal">
            <div class="head_modal">
                <div class="title_modal">
                    <h2>{{ props.title }}</h2>
                </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleCaptchaModal" />
            </div>
            <div class='main_modal'>
                <p>Question</p>
                <div class="question_modal">{{ props.question }}</div>
                <p>Selection</p>
                <div class="answers_captcha">
                    <img class="img_captcha" :src=answer.img :alt=answer.answer v-for="answer in props.answers"
                        @click="clickAnswer(answer.id)"
                        v-bind:class="{ checked_captcha: selectedAnswer.includes(answer.id) }">
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

const store = useAlertsStore();

interface Answer {
    id: number;
    answer: string;
    img: string;
    response: boolean;
}

const props = defineProps({
    id: { type: String, required: true },
    next: { type: Function, required: true },
    previous: { type: Function, required: true },
    title: String,
    question: String,
    answers: Array<Answer>,
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
  store.toggleCaptchaModal;
  props.previous();
}

const submit = () => {
    store.toggleCaptchaModal;
    props.next();
}

</script>
    
<style scoped>
.answers_captcha {
    margin: 0 4vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    max-height: 38vh;
    border-radius: .7rem;
    background-color: #638e995d;
    justify-content: space-around;
}

.img_captcha {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 12vw;
    height: 15vh;
    border-radius: .7rem;
    margin: .5vh .5vw;
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

.checked_captcha {
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
    transform: translate3d(0, 0, 3px);
    transition: filter 0.3s ease, transform 0.3s ease;
}

@media screen and (max-width: 900px) {
    .answers_captcha {
        margin: 0 2vw;
        max-height: 48vh;
    }

    .img_captcha {
        width: 30vw;
        height: 13vh;
    }
}
</style>
  