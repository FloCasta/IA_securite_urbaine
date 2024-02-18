<!-- Modal des phrases à trou -->
<template>
    <Transition name="modal">
        <div class="card_modal">
            <div class="head_modal">
                <div class="title_modal">
                    <h2>{{ props.form.title }}</h2>
                </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleHangedModal" />
            </div>
            <div class='main_modal'>
                <p>Question</p>
                <div class="container_hanged">
                    <div class="question_hanged">
                        {{ props.form.start_question }}
                        <span class="word_hanged"> ? </span>
                        {{ props.form.end_question }}
                        <div class="field_container">
                            <input type="text" v-for="l in emptyWord" :value="l" readonly class="field_input"
                                :class="{ space_hanged: l == '&', word_hanged: l != '' }">
                        </div>
                    </div>
                    <div class="drawing_hanged">
                        <canvas id="canvas"></canvas>
                    </div>
                </div>
                <div class="letters_hanged">
                    <button v-for="a, index in alphabet" class="letter_hanged" @click="clickLetter(index)"
                        :class="{ letter_checked_hanged: !a.clickable || nbBadAnswer >= maxAnswer }" :disabled="!a.clickable
                            || nbBadAnswer >= maxAnswer">{{ a.letter }}</button>
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
import { ref } from 'vue';
import { useAlertsStore } from '@/store';
import { Point } from '@/class/Point';
import { Hanged, type HangedAnswer } from '@/class/Hanged';

const store = useAlertsStore();

const props = defineProps({
    form: { type: Hanged, required: true },
    next: { type: Function, required: true },
    previous: { type: Function, required: true },
    addPoint: { type: Function, required: true },

});

const alphabet = ref("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => ({ letter, clickable: true })));

const emptyWord = ref(props.form.word.split('').map(char => char === ' ' ? '&' : ' '));

const data = ref({ questionId: null as String | null, selectedAnswer: [] as number[] });
let selectedAnswer = ref<string>("");
const answerPage = false;
const nbBadAnswer = ref(0);
const maxAnswer = ref(10);
let canvas = ref<HTMLCanvasElement | null>(null);
let context = ref<CanvasRenderingContext2D | null>(null);

const clickLetter = (index: number) => {
    alphabet.value[index].clickable = false;

    let findGoodLetter = false;
    if (props.form.word) {
        for (let i = 0; i < props.form.word.length; i++) {
            if (props.form.word[i] === alphabet.value[index].letter) {
                emptyWord.value[i] = alphabet.value[index].letter;
                findGoodLetter = true;
            }
        }
    }

    if (!findGoodLetter) {
        nbBadAnswer.value++;

        if (nbBadAnswer.value <= maxAnswer.value) {
            drawHangman();
        }
    }
}

const drawHangman = () => {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) return;
    let context = canvas.getContext("2d");
    if (!context) return;
    const baseWidth = canvas.width;
    const baseHeight = canvas.height;
    switch (nbBadAnswer.value) {
        case 1:
            context.beginPath();
            context.lineCap = 'round';
            context.lineWidth = baseWidth * 0.01;
            context.lineJoin = 'round';
            context.strokeStyle = "rgb(0, 0, 0)";
            context.moveTo(baseWidth - (baseWidth * 0.1), baseHeight * 0.95);
            context.lineTo(baseWidth - (baseWidth * 0.2), baseHeight * 0.95);
            context.stroke();
            break;

        case 2:
            context.beginPath();
            context.moveTo(baseWidth - (baseWidth * 0.15), baseHeight * 0.95);
            context.lineTo(baseWidth - (baseWidth * 0.15), baseHeight * 0.1);
            context.stroke();
            break;

        case 3:
            context.beginPath();
            context.moveTo(baseWidth - (baseWidth * 0.15), baseHeight * 0.1);
            context.lineTo(baseWidth - (baseWidth * 0.5), baseHeight * 0.1);
            context.stroke();
            break;

        case 4:
            context.beginPath();
            context.moveTo(baseWidth - (baseWidth * 0.5), baseHeight * 0.1);
            context.lineTo(baseWidth - (baseWidth * 0.5), baseHeight * 0.25);
            context.stroke();
            break;

        case 5:
            context.beginPath();
            context.arc(baseWidth - (baseWidth * 0.5), baseHeight * 0.35, baseWidth * 0.05, 0, Math.PI * 2);
            context.stroke();
            break;
        case 6:
            context.beginPath();
            context.moveTo(baseWidth - (baseWidth * 0.5), baseHeight * 0.45);
            context.lineTo(baseWidth - (baseWidth * 0.5), baseHeight * 0.75);
            context.stroke();
            break;

        case 7:
            context.beginPath();
            context.moveTo(baseWidth - (baseWidth * 0.5), baseHeight * 0.5);
            context.lineTo(baseWidth - (baseWidth * 0.4), baseHeight * 0.6);
            context.stroke();
            break;

        case 8:
            context.beginPath();
            context.moveTo(baseWidth - (baseWidth * 0.5), baseHeight * 0.5);
            context.lineTo(baseWidth - (baseWidth * 0.6), baseHeight * 0.6);
            context.stroke();
            break;

        case 9:
            context.beginPath();
            context.moveTo(baseWidth - (baseWidth * 0.5), baseHeight * 0.75);
            context.lineTo(baseWidth - (baseWidth * 0.45), baseHeight * 0.9);
            context.stroke();
            break;

        case 10:
            context.beginPath();
            context.moveTo(baseWidth - (baseWidth * 0.5), baseHeight * 0.75);
            context.lineTo(baseWidth - (baseWidth * 0.55), baseHeight * 0.9);
            context.stroke();
            break;
    }
};

const previous = () => {
    store.toggleHangedModal();
    props.previous();
}

const submit = () => {
    store.toggleHangedModal();
    checkAnswer();
    props.next();
}

const checkAnswer = () => {
    selectedAnswer = ref(emptyWord.value.join(''));
    let isComplete = emptyWord.value.filter((w)=> w == ' ');
    let point=0;
    if(nbBadAnswer.value==maxAnswer.value){
        point = 0;
    }else if(isComplete.length == 0){
        point =1;
    }
    props.addPoint(new Point(point,""));
}

</script>
    
<style scoped>
.container_hanged {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    padding: 0 4vw;
}

.question_hanged {
    width: 70%;
}

.drawing_hanged {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

.letters_hanged {
    margin: auto auto;
}

.letter_hanged {
    background-color: rgba(255, 255, 255, 0.103);
    outline: .5px solid black;

    width: 3vw;
    height: 3vh;
    border: none;
    color: black;
    font-size: 1rem;
    font-family: 'Roboto Mono', monospace;
    margin: .5vh .5vw;
    cursor: pointer;
    box-shadow: 0 7px 20px 5px white;
    border-radius: .7rem;
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    overflow: hidden;
    transition: .5s all;

    &:hover {
        outline: .5px solid #638e99;
        box-shadow: 0 7px 50px 10px white;
        transform: scale(1.015);
        filter: brightness(1.3);

        ::before {
            filter: brightness(.5);
            top: -100%;
            left: 200%;
        }
    }
}

.letter_checked_hanged {
    background-color: #638e99;
    color: white;
}

.field_container {
    margin-top: 3vh;
}

.field_input {
    min-width: 1ch;
    width: 1ch;
    margin: 0 .5ch;
}

.space_hanged,
.space_hanged:focus {
    opacity: 0;
    border: none;
    background: none;
    color: transparent;
    cursor: default;

    &:placeholder-shown {
        cursor: default;
    }
}


.word_hanged {
    color: #638e99;
    font-size: 1.2rem;
    font-weight: bold;
}

canvas {
    width: 25vh;
    height: 25vh;
}

@media screen and (max-width: 900px) {
    canvas {
        width: 15vh;
        height: 15vh;
    }

    .container_hanged {
        padding: 0 2vw;
    }

    .letter_hanged {
        width: 7vw;
        height: 3vh;
        font-size: .8rem;
        margin: .5vh 1vw;
    }

    .word_hanged {
        font-size: 1rem;
    }

}
</style>
    