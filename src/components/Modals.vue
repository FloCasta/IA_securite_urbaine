<template>

        <ResultModal v-show="store.isResultModalVisible"></ResultModal>
        <HolySentenceModal :previous=previous :next=next :id=formHs.id :title=formHs.title :start_question=formHs.start_question
            :end_question=formHs.end_question :holy_word=formHs.holy_word correctAnswer="[]" :textAnswer=formHs.textAnswer
            v-show="store.isHolySentenceModalVisible" ></HolySentenceModal>
        <QuestionModal :previous=previous :next=next :id=formQuestion.id :title=formQuestion.title :question=formQuestion.question :answers=formQuestion.answers
            :textAnswer=formQuestion.textAnswer v-show="store.isQuestionModalVisible"></QuestionModal>
        <DragAndDropModal :previous=previous :next=next :id=formDaD.id :title=formDaD.title :question=formDaD.question :answers=formDaD.answers correctAnswer="[]"
            :textAnswer=formDaD.textAnswer v-show="store.isDragAndDropModalVisible"></DragAndDropModal>
        <HeightQuestionModal :id=form4.id :title=form4.title :question=form4.question :answers=form4.answers
            :textAnswer=form4.textAnswer v-show="store.isHeightQuestionModalVisible">
        </HeightQuestionModal>
        <EstimationModal :previous=previous :next=next :id=formEstimation.id :title=formEstimation.title :question=formEstimation.question :minNumber=formEstimation.minNumber
            :maxNumber=formEstimation.maxNumber :minAnswer=formEstimation.minAnswer :maxAnswer=formEstimation.maxAnswer :increment=formEstimation.increment
            :textAnswer=formEstimation.textAnswer v-show="store.isEstimationModalVisible">
        </EstimationModal>
        <CaptchaModal :previous=previous :next=next :id=formCaptcha.id :title=formCaptcha.title :question=formCaptcha.question :answers=formCaptcha.answers
            :textAnswer=formCaptcha.textAnswer v-show="store.isCaptchaModalVisible">
        </CaptchaModal>
</template>
  
<script setup lang="ts">
import { useAlertsStore } from '@/store';
import HolySentenceModal from '@/components/HolySentenceModal.vue';
import QuestionModal from '@/components/QuestionModal.vue';
import DragAndDropModal from '@/components/DragAndDropModal.vue';
import HeightQuestionModal from '@/components/HeightQuestionModal.vue';
import EstimationModal from '@/components/EstimationModal.vue';
import CaptchaModal from '@/components/CaptchaModal.vue';
import { ref, type Ref } from 'vue';
import ResultModal from '@/components/ResultModal.vue';

const store = useAlertsStore();

// store.toggleHolySentenceModal();
// store.toggleQuestionModal();
// store.toggleDragAndDropModal();
// store.toggleHeightQuestionModal();
// store.toggleEstimationModal();
// store.toggleCaptchaModal();

const form1 = {
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

const form2 = {
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
};

const form3 = {
    "id": "3",
    "title": "Phrase à trou",
    "type": "holysentence",
    "start_question": "Selon vous, quels sont les buts principaux de la ",
    "end_question": " ?",
    "holy_word": "vidéosurveillance",
    "textAnswer": "La bonne réponse est vidéosurveillance"
};

const form4 = {
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

let nextQuestion = ref(1); // Current question number

//test purpose
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
//test purpose
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
//test purpose
const h={
    "id": "3",
    "title": "Phrase à trou",
    "type": "holysentence",
    "start_question": "Selon vous, quels sont les buts principaux de la ",
    "end_question": " ?",
    "holy_word": "vidéosurveillance",
    "textAnswer": "La bonne réponse est vidéosurveillance"
};

const e={
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

const c= {
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
}

//test purpose
let formEstimation : Ref<{
  id: string;
  title: string;
  type: string;
  question: string;
  minNumber: number;
  maxNumber: number;
  increment: number;
  minAnswer: number;
  maxAnswer: number;
  textAnswer: string;
}>=ref(e);

let formCaptcha: Ref<{
  id: string;
  title: string;
  type: string;
  question: string;
  answers: {
    id: number;
    answer: string;
    img: string;
    response: boolean;
  }[];
  textAnswer: string;
}>=ref(c);

//test purpose
const listQuestions = [e,h,t,c,q,
                        c,e,t,q,t,
                        h,c,q,e,q];

                        
let currentQuestions = [t,t,t,t,t];

let formDaD: Ref<{
  id: string;
  title: string;
  type: string;
  question: string;
  answers: {
    id: number;
    answer: string;
    response: boolean;
  }[];
  textAnswer: string;
}>=ref(t);

let formQuestion: Ref<{
  id: string;
  title: string;
  type: string;
  question: string;
  answers: {
    id: number;
    answer: string;
    response: boolean;
  }[];
  textAnswer: string;
}> = ref(q);

let formHs: Ref<{
  id: string;
  title: string;
  type: string;
  start_question: string,
  end_question:string,
  holy_word:string,
  textAnswer: string;
}> = ref(h);



const launchLevel = (nLevel: number,scorePrevious:number)=>{
    console.log(scorePrevious)
    if(scorePrevious>2 || nLevel==1){

    
        currentQuestions=[]
        for (let i=0;i<5;i++){
            currentQuestions[i] = listQuestions[i+(5*(nLevel-1))]
        }
        nextQuestion.value = 0;
        store.toggleModals();
        next()
    }
}

const previous = () =>{
    nextQuestion.value=nextQuestion.value-1;
    if(currentQuestions[nextQuestion.value-1]){
        openGame();
    }
}

const next = () =>{
    nextQuestion.value=nextQuestion.value+1;
    if(currentQuestions[nextQuestion.value-1]){
        openGame();
    }
    else{
        store.toggleResultModalVisible(true);
    }
}

const openGame=()=>{
    switch(currentQuestions[nextQuestion.value-1].type){
            case "draganddrop":
                formDaD = currentQuestions[nextQuestion.value-1];
                store.toggleDragAndDropModal(true);
                break;
            case "question":
                formQuestion = currentQuestions[nextQuestion.value-1];
                store.toggleQuestionModal(true);
                break;
            case "holysentence":
                formHs = currentQuestions[nextQuestion.value-1];
                store.toggleHolySentenceModal(true);
                break;
            case "bar_chiffree":
                formEstimation = currentQuestions[nextQuestion.value-1];
                store.toggleEstimationModal(true);
                break;
            case "jeu_captcha":
                formCaptcha = currentQuestions[nextQuestion.value-1];
                store.toggleCaptchaModal(true);
                break;
            // case "height?":
                // store.toggleHeightQuestionModal();
            //  break;
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
  