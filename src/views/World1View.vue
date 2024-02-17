<template>
    <div class="world1_page">
        <HomeBanner title="videosurveillance algorithmique" />
        <BannerMenu v-show="store.isMenuVisible" />
        <div class="game_zone">
            <span id="start" @click="movePlayer('start')"></span>
            <img src="/world1/castle1.png" alt="castle1" id="castle1" @click="movePlayer('castle1')">
            <img src="/world1/castle2.png" alt="castle2" id="castle2" @click="movePlayer('castle2')">
            <img src="/world1/castle3.png" alt="castle3" id="castle3" @click="movePlayer('castle3')">
            <img :src="`/players/player${store.avatarId}.png`" alt="player" id="player">
        </div>
        <LevelEntranceModal v-show="store.isLevelEntranceModalVisible" ></LevelEntranceModal>
        <HolySentenceModal :nextQ=nextQ :next=next :id=formHs.id :title=formHs.title :start_question=formHs.start_question
            :end_question=formHs.end_question :holy_word=formHs.holy_word correctAnswer="[]" :textAnswer=formHs.textAnswer
            v-show="store.isHolySentenceModalVisible" ></HolySentenceModal>
        <QuestionModal :nextQ=nextQ :next=next :id=formQuestion.id :title=formQuestion.title :question=formQuestion.question :answers=formQuestion.answers
            :textAnswer=formQuestion.textAnswer v-show="store.isQuestionModalVisible"></QuestionModal>
        <DragAndDropModal :nextQ=nextQ :next=next :id=formDaD.id :title=formDaD.title :question=formDaD.question :answers=formDaD.answers correctAnswer="[]"
            :textAnswer=formDaD.textAnswer v-show="store.isDragAndDropModalVisible"></DragAndDropModal>
        <HeightQuestionModal :id=form4.id :title=form4.title :question=form4.question :answers=form4.answers
            :textAnswer=form4.textAnswer v-show="store.isHeightQuestionModalVisible">
        </HeightQuestionModal>
        <EstimationModal :id=form5.id :title=form5.title :question=form5.question :minNumber=form5.minNumber
            :maxNumber=form5.maxNumber :minAnswer=form5.minAnswer :maxAnswer=form5.maxAnswer :increment=form5.increment
            :textAnswer=form5.textAnswer v-show="store.isEstimationModalVisible">
        </EstimationModal>
        <CaptchaModal :id=form6.id :title=form6.title :question=form6.question :answers=form6.answers
            :textAnswer=form6.textAnswer v-show="store.isCaptchaModalVisible">
        </CaptchaModal>
    </div>
</template>

<script setup lang="ts">
import { useAlertsStore } from '@/store';
import HomeBanner from '@/components/HomeBanner.vue';
import BannerMenu from '@/components/BannerMenu.vue';
import HolySentenceModal from '@/components/HolySentenceModal.vue';
import QuestionModal from '@/components/QuestionModal.vue';
import DragAndDropModal from '@/components/DragAndDropModal.vue';
import HeightQuestionModal from '@/components/HeightQuestionModal.vue';
import EstimationModal from '@/components/EstimationModal.vue';
import CaptchaModal from '@/components/CaptchaModal.vue';
import { ref } from 'vue';
import type LevelEntranceModalVue from '@/components/LevelEntranceModal.vue';
import LevelEntranceModal from '@/components/LevelEntranceModal.vue';

const store = useAlertsStore();

const t ={
    "id": "1",
    "title": "Glisser déposer",
    "type": "draganddrop",
    "question": "Selon vous, quels sont les buts principaux de la vidéosurveillance ?",
    "answers": [
        { "id": 1, "answer": "Dissuader les comportements criminels par une présence visible.", "response": true },
        { "id": 2, "answer": "Identifier a posteriori les auteurs/autrices d’infractions pour réprimander plus facilement.", "response": true },
        { "id": 3, "answer": "Analyser les tendances de circulation pour l'urbanisme.", "response": false },
        { "id": 4, "answer": "Fournir des données pour des études sociologiques.", "response": false },
    ],
    "textAnswer": "En effet, les bonnes réponses sont la A) et la B)"
};

const q = {
    "id": "2",
    "title": "Question à choix multiples",
    "type": "question",
    "question": "Selon vous, quels sont les buts principaux de la vidéosurveillance ?",
    "answers": [
        { "id": 1, "answer": "Dissuader les comportements criminels par une présence visible.", "response": true },
        { "id": 2, "answer": "Identifier a posteriori les auteurs/autrices d’infractions pour réprimander plus facilement.", "response": true },
        { "id": 3, "answer": "Analyser les tendances de circulation pour l'urbanisme.", "response": false },
        { "id": 4, "answer": "Fournir des données pour des études sociologiques.", "response": false },
    ],
    "textAnswer": "En effet, les bonnes réponses sont la A) et la B)"
}
const h={
    "id": "3",
    "title": "Phrase à trou",
    "type": "holysentence",
    "start_question": "Selon vous, quels sont les buts principaux de la ",
    "end_question": " ?",
    "holy_word": "vidéosurveillance",
    "textAnswer": "La bonne réponse est vidéosurveillance"
};

let nextQ = ref(1); // Current question number

let formDaD =ref(t);
//alert(store.scoreWorld1);
let formQuestion = ref(q);

let formHs = ref(h);

let form4 = {
    "id": "4",
    "title": "Question à choix multiples",
    "type": "jeu_selection",
    "question": "Selon vous, quels sont les buts principaux de la vidéosurveillance ?",
    "answers": [
        { "id": 1, "answer": "Dissuader les comportements criminels par une présence visible.", "response": true },
        { "id": 2, "answer": "Identifier a posteriori les auteurs/autrices d’infractions pour réprimander plus facilement.", "response": true },
        { "id": 3, "answer": "Analyser les tendances de circulation pour l'urbanisme.", "response": false },
        { "id": 4, "answer": "Fournir des données pour des études sociologiques.", "response": false },
        { "id": 5, "answer": "Dissuader les comportements criminels par une présence visible.", "response": true },
        { "id": 6, "answer": "Identifier a posteriori les auteurs/autrices d’infractions pour réprimander plus facilement.", "response": true },
        { "id": 7, "answer": "Analyser les tendances de circulation pour l'urbanisme.", "response": false },
        { "id": 8, "answer": "Fournir des données pour des études sociologiques.", "response": false },
    ],
    "textAnswer": "En effet, les bonnes réponses sont la A) et la B)"
};
const listQuestions = [form4,t,h,q,h,q,
                            t,h,t,q,t,
                            h,t,q,t,q];
let currentQuestions = [form4,t,h,q,h,q];

const form5 = {
    "id": "5",
    "title": "Estimation",
    "type": "bar_chiffree",
    "question": "En pratique et en moyenne, combien de temps les collectivités gardent-elles les images ? (en jours)",
    "minNumber": 2000,
    "maxNumber": 2010,
    "increment": 1,
    "minAnswer": 21,
    "maxAnswer": 30,
    "textAnswer": "En effet, entre 21 et 30 jours est la bonne réponse"
};
const form6 = {
    "id": "4",
    "title": "Captcha",
    "type": "jeu_captcha",
    "question": "Qu’est-ce qui peut bloquer la reconnaissance faciale ?",
    "answers": [
        { "id": 1, "answer": "Le maquillage", "img": "/captcha/captcha1_answer1.png", "response": true },
        { "id": 2, "answer": "Le masque", "img": "/captcha/captcha1_answer2.png", "response": true },
        { "id": 3, "answer": "Les perruques", "img": "/captcha/captcha1_answer3.png", "response": true },
        { "id": 4, "answer": "Les fausses barbes", "img": "/captcha/captcha1_answer4.png", "response": true },
        { "id": 5, "answer": "Un t-shirt vert", "img": "/captcha/captcha1_answer5.png", "response": false },
        { "id": 6, "answer": "Une cravate", "img": "/captcha/captcha1_answer6.png", "response": false }
    ],
    "textAnswer": "En effet, le style vestimentaire n'impacte pas la reconnaissance faciale."
};

function movePlayer(castleName: string) {
    var castle = document.getElementById(castleName);
    var player = document.getElementById('player');

    if (castle && player) {
        const castleStyle = window.getComputedStyle(castle);
        const playerStyle = window.getComputedStyle(player);

        const topValue = castleStyle.top;
        const leftValue = castleStyle.left;
        const heightValue = castleStyle.height;

        const topValueInPixels = parseInt(topValue, 10);
        const leftValueInPixels = parseInt(leftValue, 10);
        const heightValueInPixels = parseInt(heightValue, 10);

        if (castleName === 'start') {
            player.style.setProperty('height', '10rem');
            var playerHeight = parseInt(playerStyle.height, 10)
            player.style.setProperty('top', `${topValueInPixels - playerHeight}px`);
            player.style.setProperty('left', leftValue);
        } else {
            player.style.setProperty('top', `${topValueInPixels + 10}px`);
            player.style.setProperty('height', `${heightValueInPixels + 30}px`);
            player.style.setProperty('left', `${leftValueInPixels + heightValueInPixels / 2}px`);
        }
    }

    setTimeout(() => {
        //Here launch casttle n
        const n = parseInt(castleName.charAt(castleName.length - 1));
        //Le +1 c'est pour la liste du json
        store.toggleLevelEntranceModalVisible(true);
        next(1+(n-1)*5);
        // store.toggleHeightQuestionModal();
        store.toggleEstimationModal();
        // store.toggleCaptchaModal();
    }, 1500);

}

const next = (n:number) =>{
    //faire un truc avec le nextQ pour que le next soit la page de resultat
    nextQ.value=(n+1);
    switch(listQuestions[n].type){
        case "draganddrop":
            formDaD = listQuestions[n];
            store.toggleDragAndDropModal(true);
            break;
        case "question":
            formQuestion = listQuestions[n];
            store.toggleQuestionModal(true);
            break;
        case "holysentence":
            formHs = listQuestions[n];
            store.toggleHolySentenceModal(true);
            break;
    }
}
    
</script>

<style>
html {
    background: url('/world1/world1.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.world1_page {
    position: relative;
    height: 90vh;
}

#start {
    position: absolute;
    width: 5rem;
    top: 95%;
    left: 60%;
    border-radius: 50%;
    border-style: solid;
    border-width: 1rem 0;
    color: rgba(255, 255, 255, 0.3);
    filter: drop-shadow(5px 5px 5px rgba(255, 255, 255, 0.5));
}

#player {
    position: absolute;
    height: 10rem;
    top: 80%;
    left: 60%;
    filter: drop-shadow(0 0 0.75rem white);
    transition: all 1s ease-in-out;
}

#castle1 {
    position: absolute;
    animation: floating 2s ease-in-out 0s infinite;
    height: 8rem;
    top: 55%;
    left: 50%;
    filter: drop-shadow(0 0 0.5rem crimson);
}

#castle2 {
    position: absolute;
    animation: floating 2s ease-in-out 1s infinite;
    height: 5rem;
    top: 30%;
    left: 37%;
    filter: drop-shadow(0 0 0.5rem crimson);
}

#castle3 {
    position: absolute;
    animation: floating 2s ease-in-out 0.5s infinite;
    height: 3rem;
    top: 15%;
    left: 30%;
    filter: drop-shadow(0 0 0.5rem crimson);
}

#start,
#castle1,
#castle2,
#castle3,
#player {
    cursor: pointer;
}

@keyframes floating {
    0% {
        transform: translate(0, 0px);
    }

    50% {
        transform: translate(0, -10px);
    }

    100% {
        transform: translate(0, 0px);
    }
}



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

    .player {
        bottom: 5%;
        right: 0;
    }

    .castle1 {
        height: 6rem;
        top: 60%;
        left: 55%;
    }

    .castle2 {
        top: 45%;
        left: 35%;
    }

    .castle3 {
        top: 35%;
        left: 10%;
    }

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
