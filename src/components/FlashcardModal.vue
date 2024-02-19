<!-- Modal flashcard -->
<template>
    <Transition name="modal">
        <div class="card_modal">
            <div class="head_modal">
                <div class="title_modal">
                    <h2>{{ props.form.title }}</h2>
                </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleFlashCardModal" />
            </div>
            <div class='main_modal'>
                <p>Question</p>
                <div class="question_modal">{{ props.form.question }}</div>
                <p>Selection</p>
                <div class="answers_flashcard">
                    <img class="img_flashcard" :src="card.flipped == true || card.matched == true ? card.img : img"
                        :alt=card.answer v-for="(card, index) in cards" @click="flipCard(index)"
                        v-bind:class="{ flipped_flashcard: card.flipped, matched_flashcard: card.matched }">
                </div>
                <div class="text_answer_modal" v-show="answerPage">Réponse : {{ props.form.textAnswer }}</div>
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
import { ref, watch } from 'vue';
import { Point } from '@/class/Point';
import { Flashcard, type FlashcardAnswer } from '@/class/Flashcard';


const store = useAlertsStore();

const props = defineProps({
    form: { type: Flashcard, required: true },
    next: { type: Function, required: true },
    previous: { type: Function, required: true },
    addPoint: { type: Function, required: true },

});

const data = ref({ questionId: null as string | null, selectedAnswer: [] as number[] });
const selectedAnswer = ref(false);
const answerPage = false;

const img = "public/world1/castle2.png";

const cards = ref(props.form.answers);
cards.value = cards.value.map(card => {
    return {
        ...card,
        flipped: false,
        matched: false
    };
});

const flippedCards = ref([]);
const matchedCards = ref([]);
const score = ref(0);

watch(() => props.form, (form) => {
    setTimeout(() => { selectedAnswer.value = []; }, 50);
});

const flipCard = (id: number) => {
    if (cards.value[id].flipped || cards.value[id].matched) return;
    cards.value[id].flipped = true;
    flippedCards.value.push(cards.value[id]);
    if (flippedCards.value.length === 2) {
        checkMatch();
    }
};

const checkMatch = () => {
    const card1 = flippedCards.value[0];
    const card2 = flippedCards.value[1];
    if (card1.answer === card2.answer) {
        card1.matched = true;
        card2.matched = true;
        card1.flipped = false;
        card2.flipped = false;
        matchedCards.value.push(card1, card2);
        score.value += 1;
        if (matchedCards.value.length === cards.value.length) {
            gameOver.value = true;
        }
    } else {
        setTimeout(() => {
            card1.flipped = false;
            card2.flipped = false;
        }, 1000);
    }
    flippedCards.value = [];
};

const previous = () => {
    store.toggleFlashCardModal();
    props.previous();
}

const submit = () => {
    store.toggleFlashCardModal();
    checkAnswer();
    props.next();
}

const checkAnswer = () => {
    //TODO
    let nGoodAnswers = 0
    let goodAsnwsers = props.form.answers?.filter((a) => a.response == true);
    goodAsnwsers?.forEach((a) => {
        if (selectedAnswer.value.includes(a.id)) {
            nGoodAnswers += 1;
        }
    })

    let point = 0;
    if (nGoodAnswers == goodAsnwsers!.length)
        point = 1;
    else if (nGoodAnswers == 0)
        point = 0;
    else
        point = 0.5
    props.addPoint(new Point(point, "type"));
}

</script>
    
<style scoped>
.answers_flashcard {
    margin: 0 4vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    max-height: 38vh;
    border-radius: .7rem;
    justify-content: space-around;
}

.img_flashcard {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 10vw;
    height: 11vh;
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

.flipped_flashcard {
    transform-style: preserve-3d;
    transform: rotateY(0deg);
    transition: transform 0.5s;
}

.flipped_flashcard:active {
    transform: rotateY(180deg);
}

.matched_flashcard {
    opacity: 0.5;
}

@media screen and (max-width: 900px) {
    .answers_flashcard {
        margin: 0 2vw;
        max-height: 48vh;
    }

    .img_flashcard {
        width: 20vw;
        height: 10vh;
    }
}
</style>
  