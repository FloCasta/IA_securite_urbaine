<template>
    <div>
        <ResultModal ref="result_modal" :openReadOnly=openReadOnly :nWorld=nWorld :nLevel=nLevel :points=points v-show="store.isResultModalVisible" />
        <HolySentenceModal :previous=previous :next=next :addPoint=addPoint :form="formHs"
            :isReadOnly="isReadOnly" v-show="store.isHolySentenceModalVisible" />
        <MultipleChoiceModal :previous=previous :next=next :addPoint=addPoint :form="formMultipleChoice"
            :isReadOnly="isReadOnly" v-show="store.isMultipleChoiceModalVisible" />
        <DragAndDropModal :previous=previous :next=next :addPoint=addPoint :form="formDaD"
            :isReadOnly="isReadOnly" v-show="store.isDragAndDropModalVisible" />
        <HeightQuestionModal :previous=previous :next=next :addPoint=addPoint :form="formHeightQuestion"
            :isReadOnly="isReadOnly" v-show="store.isHeightQuestionModalVisible" />
        <EstimationModal :previous=previous :next=next :addPoint=addPoint :form="formEstimation"
            :isReadOnly="isReadOnly" v-show="store.isEstimationModalVisible" />
        <CaptchaModal :previous=previous :next=next :addPoint=addPoint :form="formCaptcha"
            :isReadOnly="isReadOnly" v-show="store.isCaptchaModalVisible" />
        <HangedModal :previous=previous :next=next :addPoint=addPoint :form="formHanged"
            :isReadOnly="isReadOnly" v-show="store.isHangedModalVisible" />
        <ConnectPairsModal :previous=previous :next=next :addPoint=addPoint :form="formPairs"
            :isReadOnly="isReadOnly" v-show="store.isConnectPairsModalVisible" />
        <FlashcardModal :previous=previous :next=next :addPoint=addPoint :form="formFlashcard"
            :isReadOnly="isReadOnly" v-show="store.isFlashCardModalVisible" />
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch, Ref, onBeforeMount } from 'vue';
import { useAlertsStore } from '@/store';

// Import your data files for each world
import dataW1 from '@/data/world1.json';
import dataW2 from '@/data/world2.json';
import dataW3 from '@/data/world3.json';
import dataW4 from '@/data/world4.json';

// Import all the modal components
import ResultModal from '@/components/ResultModal.vue';
import HolySentenceModal from '@/components/games/HolySentenceModal.vue';
import MultipleChoiceModal from '@/components/games/MultipleChoiceModal.vue';
import DragAndDropModal from '@/components/games/DragAndDropModal.vue';
import HeightQuestionModal from '@/components/games/HeightQuestionModal.vue';
import EstimationModal from '@/components/games/EstimationModal.vue';
import CaptchaModal from '@/components/games/CaptchaModal.vue';
import HangedModal from '@/components/games/HangedModal.vue';
import ConnectPairsModal from '@/components/games/ConnectPairsModal.vue';
import FlashcardModal from '@/components/games/FlashcardModal.vue';
import { Captcha } from '@/class/Captcha';
import { ConnectPairs } from '@/class/ConnectPairs';
import { DragAndDrop } from '@/class/DragAndDrop';
import { Estimation } from '@/class/Estimation';
import { Flashcard } from '@/class/Flashcard';
import { Hanged } from '@/class/Hanged';
import { HeightQuestion } from '@/class/HeightQuestion';
import { HolySentence } from '@/class/HolySentence';
import { MultipleChoice } from '@/class/MultipleChoice';
import { Point } from '@/class/Point';
import { QuestionEnum } from '@/class/QuestionEnum';

const props = defineProps({
    world: String
});

const store = useAlertsStore();

const isReadOnly = ref<Boolean>(false);
const result_modal = ref<any>(null);
const nLevel = ref(0);
const nWorld = ref(0);
let data = ref();

let nextQuestion = ref(1); // Current question number
let points = ref<Point[]>([]);
let titleResult = ref('');

let currentQuestions = [];
let listQuestions = [];

// Initialize forms with default values to avoid errors
let formMultipleChoice: Ref<MultipleChoice> = ref(dataW1.questions[1]);
let formHanged: Ref<Hanged> = ref(dataW1.questions[3]);
let formCaptcha: Ref<Captcha> = ref(dataW1.questions[4]);
let formEstimation: Ref<Estimation> = ref(dataW1.questions[6]);
let formHs: Ref<HolySentence> = ref(dataW1.questions[8]);
let formPairs: Ref<ConnectPairs> = ref(dataW1.questions[9]);
let formHeightQuestion: Ref<HeightQuestion> = ref(dataW1.questions[13]);
let formDaD: Ref<DragAndDrop> = ref(dataW2.questions[5]);
let formFlashcard: Ref<Flashcard> = ref(dataW2.questions[7]);

watch(() => props.world, initWorld, { immediate: true });

function initWorld() {
    switch (props.world) {
        case "world1":
            data = dataW1;
            break;
        case "world2":
            data = dataW2;
            break;
        case "world3":
            data = dataW3;
            break;
        case "world4":
            data = dataW4;
            break;
        default:
            console.error("Unknown world: ", props.world);
    }
}

const initQuestionsForWorld = () => {
    for (let i = 1; i <= 15; i++) {
        let question = data.questions[i];
        switch (question.type) {
            case QuestionEnum.Captcha:
                listQuestions[i - 1] = Captcha.fromJSON(question);
                break;
            case QuestionEnum.DragAndDrop:
                listQuestions[i - 1] = DragAndDrop.fromJSON(question);
                break;
            case QuestionEnum.Estimation:
                listQuestions[i - 1] = Estimation.fromJSON(question);
                break;
            case QuestionEnum.Height:
                listQuestions[i - 1] = HeightQuestion.fromJSON(question);
                break;
            case QuestionEnum.HolySentence:
                listQuestions[i - 1] = HolySentence.fromJSON(question);
                break;
            case QuestionEnum.MultipleChoice:
                listQuestions[i - 1] = MultipleChoice.fromJSON(question);
                break;
            case QuestionEnum.Hanged:
                listQuestions[i - 1] = Hanged.fromJSON(question);
                break;
            case QuestionEnum.ConnectPairs:
                listQuestions[i - 1] = ConnectPairs.fromJSON(question);
                break;
            case QuestionEnum.Flashcard:
                listQuestions[i - 1] = Flashcard.fromJSON(question);
                break;
        }
    }
}


const addPoint = (point: Point) => {
    let copiedArray = Array.from(points.value);
    copiedArray[nextQuestion.value - 1] = point;
    points.value = copiedArray;
}

const launchLevel = (l: number, scorePrevious: number, w: number) => {
    nLevel.value = l;
    isReadOnly.value=false;
    nWorld.value = w;
    nextQuestion.value = 0;
    currentQuestions = [];
    listQuestions = [];
    initQuestionsForWorld();
    if (scorePrevious >= 3 || nLevel.value == 1) {

        
        for (let i = 0; i < 5; i++) {
            currentQuestions[i] = listQuestions[i + (5 * (nLevel.value - 1))]
        }
        
        points.value = []
        store.toggleModals();
        next()
    }
}

const previous = () => {
    nextQuestion.value = nextQuestion.value - 1;
    if (currentQuestions[nextQuestion.value - 1]) {
        openGame();
    }
}

const next = () => {
    nextQuestion.value = nextQuestion.value + 1;
    if (currentQuestions[nextQuestion.value - 1]) {
        openGame();
    }
    else {
        titleResult.value = "Résultat niveau " + nLevel.value;
        store.toggleResultModalVisible();
        result_modal.value?.updatePoints()
    }
}

const openReadOnly = (form : any) =>{
    isReadOnly.value=true;
    currentQuestions=[form];
    nextQuestion.value=1;
    setTimeout(() => { openGame(); }, 50);
}

const openGame = () => {
    switch (currentQuestions[nextQuestion.value - 1].type) {
        case QuestionEnum.DragAndDrop:
            formDaD.value = currentQuestions[nextQuestion.value - 1] as DragAndDrop;
            store.toggleDragAndDropModal();
            break;
        case QuestionEnum.MultipleChoice:
            formMultipleChoice.value = currentQuestions[nextQuestion.value - 1] as MultipleChoice;
            store.toggleMultipleChoiceModal();
            break;
        case QuestionEnum.HolySentence:
            formHs.value = currentQuestions[nextQuestion.value - 1] as HolySentence;
            store.toggleHolySentenceModal();
            break;
        case QuestionEnum.Estimation:
            formEstimation.value = currentQuestions[nextQuestion.value - 1] as Estimation;
            store.toggleEstimationModal();
            break;
        case QuestionEnum.Captcha:
            formCaptcha.value = currentQuestions[nextQuestion.value - 1] as Captcha;
            store.toggleCaptchaModal();
            break;
        case QuestionEnum.Height:
            formHeightQuestion.value = currentQuestions[nextQuestion.value - 1] as HeightQuestion;
            store.toggleHeightQuestionModal();
            break;
        case QuestionEnum.Flashcard:
            formFlashcard.value = currentQuestions[nextQuestion.value - 1] as Flashcard;
            store.toggleFlashCardModal();
            break;
        case QuestionEnum.ConnectPairs:
            formPairs.value = currentQuestions[nextQuestion.value - 1] as ConnectPairs;
            store.toggleConnectPairsModal();
            break;
        case QuestionEnum.Hanged:
            formHanged.value = currentQuestions[nextQuestion.value - 1] as Hanged;
            store.toggleHangedModal();
    }

}

defineExpose({
    launchLevel
});
</script>
  
<style>
h3 {
    font-size: 0.9rem;
    margin: 0 4vw;
}

.card_modal {
    height: 80vh;
    width: 70vw;
    margin: 5vh auto;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 7px 20px 5px #00000088;
    border-radius: .7rem;
    backdrop-filter: blur(10px);

    ::before {
        position: fixed;
        content: "";
        box-shadow: 0 0 100px 40px #ffffff08;
        transform: translate(-50%, -50%) rotate(-45deg);
        transition: .7s all;
    }
}

.head_modal {
    display: flex;
    align-items: center;
    padding: 2vh 2vw;
}

.title_modal {
    text-align: center;
    flex: 1;
}

.close_modal:hover {
    cursor: pointer;
    box-shadow: 0 7px 20px 5px white;
    border-radius: .7rem;
    backdrop-filter: blur(7px);
}

.main_modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 6vw;
    height: 55vh;
}

.text_answer_modal {
    max-height: 7vh;
    margin: 2vh 0;
    color: #638e99;
}

.field_input {
    display: inline-flex;
    text-align: center;
    margin: 0 auto;
    border: 0;
    outline: 0;
    min-width: 30%;
    max-width: 70%;
    border-bottom: 2px solid black;
    font-size: 1rem;
    color: black;
    background: transparent;
    transition: border-color 0.2s;
    font-family: 'Roboto Mono', monospace;

    &::placeholder {
        color: transparent;
    }

    &:placeholder-shown {
        cursor: text;
    }
}

.field_input:focus {
    filter: drop-shadow(0 2rem 2rem #638e99);
    border-bottom: 2px solid #638e99;
    color: #638e99;
    box-shadow: 0 8px 4px -4px #638e99d1;
}

.field_input_good_answer {
    color: #88924b;
}

.field_input_good_answer:focus {
    filter: drop-shadow(0 2rem 2rem #89924bb4);
    border-bottom: 2px solid #88924b;
    color: #88924b;
    box-shadow: 0 8px 4px -4px #88924b;
}

.field_input_bad_answer {
    color: #BB5326;
}

.field_input_bad_answer:focus {
    filter: drop-shadow(0 2rem 2rem #bb5326b8);
    border-bottom: 2px solid #BB5326;
    color: #BB5326;
    box-shadow: 0 8px 4px -4px #BB5326;
}

.question_modal {
    max-height: 10vh;
    padding: 1vh 4vw;
    display: flex;
    align-items: center;
}

.btn_submit_modal {
    display: flex;
    justify-content: center;
    margin: 2vh 0;

    .btn_previous {
        background-color: grey;
    }

    .btn_reset {
        background-color: #BB5326;
    }

    .btn_next {
        background-color: #88924b;
    }

    .btn_return {
        background-color: grey;
    }

    button {
        width: 6rem;
        height: 5vh;
        border: none;
        color: white;
        font-size: 1rem;
        font-family: 'Roboto Mono', monospace;
        margin: .5vh 1vw;
        cursor: pointer;
        box-shadow: 0 7px 20px 5px white;
        border-radius: .7rem;
        backdrop-filter: blur(7px);
        -webkit-backdrop-filter: blur(7px);
        overflow: hidden;
        transition: .5s all;

        &:hover {
            border: 1px solid #ffffff44;
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
}


@media screen and (max-width: 900px) {

    .card_modal {
        height: 85vh;
        width: 90vw;
        margin: 2vh auto;
    }

    .head_modal {
        max-height: 8vh;
    }

    .title_modal {
        font-size: 0.8rem;
    }

    .question_modal {
        padding: 0 2vw;
    }

    .main_modal {
        font-size: 0.8rem;
        height: 63vh;
    }

    .text_answer_modal {
        max-height: 7vh;
        margin: 2vh 0;
        color: #638e99;
    }


}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
  