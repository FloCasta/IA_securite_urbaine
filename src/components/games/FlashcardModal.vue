<!-- Modal flashcard -->
<template>
    <div class="card_modal">
        <div class="head_modal">
            <div class="title_modal">
                <h2>{{ props.form.title }}</h2>
            </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleFlashCardModal" />
        </div>
        <div class='main_modal'>
            <p>Trouver les paires</p>
            <div class="answers_flashcard">
                <img class="img_flashcard" :src="card.flipped == true || card.matched == true ? card.img : img"
                    :alt=card.title v-for="(card, index) in cards" @click="flipCard(index)"
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
</template>
    
<script setup lang="ts">
import { useAlertsStore } from '@/store';
import { ref, watch } from 'vue';
import { Point } from '@/class/Point';
import { Flashcard } from '@/class/Flashcard';


const store = useAlertsStore();

const props = defineProps({
    form: { type: Flashcard, required: true },
    next: { type: Function, required: true },
    previous: { type: Function, required: true },
    addPoint: { type: Function, required: true },
    isReadOnly: Boolean
});

const data = ref({ questionId: null as string | null, selectedAnswer: [] as number[] });
const selectedAnswer = ref(false);
const answerPage = ref<Boolean>(false);

const img = '/world1/castle2.png';

const gameOver = ref(false);

const cards = ref(Array.from(props.form.answers));
cards.value.push(...cards.value);
cards.value = store.shuffleItems(cards.value);

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

watch([() => props.form, () => props.isReadOnly], ([form, isReadOnly]) => {
    answerPage.value=isReadOnly;
    score.value = 0;
    gameOver.value = false;
    cards.value = []
    cards.value = [...form.answers];
    cards.value.push(...cards.value);
    cards.value = store.shuffleItems(cards.value);
    cards.value = cards.value.map(card => {
        return {
            ...card,
            flipped: false,
            matched: false
        };
    });
    setTimeout(() => {
        selectedAnswer.value = false;
        flippedCards.value = [];
    }, 50);
    setTimeout(() => {
        if(answerPage.value){
            cards.value = form.savedAnswers
        }
    }, 50);
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
    if (card1.title === card2.title) {
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

    let point = 0;
    let display = '';
    if (gameOver.value == true) {
        point = 1;
        display = 'Flashcard Réussi'
    }
    else {
        point = 0;
        display = 'Flashcard Perdu'
    }
    
    let form : Flashcard = { ...props.form, saveAnswer: props.form.saveAnswer };
    form.saveAnswer(cards.value);
    props.addPoint(new Point(point, form, display));
    
}

</script>
    
<style scoped>
.answers_flashcard {
    margin: 0 4vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    align-content: center;
    max-height: 50vh;
    border-radius: .7rem;
    justify-content: center;
}

.img_flashcard {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 15vh;
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

@keyframes flip {
    from {
        transform-style: preserve-3d;
        transform: rotateY(0deg);
    }

    to {
        transform-style: preserve-3d;
        transform: rotateY(180deg);
    }
}

.flipped_flashcard {
    animation: flip 1.5s forwards;
}

.matched_flashcard {
    animation: flip 1.5s forwards;
    opacity: 0.5;
}

@media screen and (max-width: 900px) {
    .answers_flashcard {
        margin: 0 2vw;
        max-height: 48vh;
    }

    .img_flashcard {
        width: 11vh;
        height: 11vh;
    }
}
</style>
  