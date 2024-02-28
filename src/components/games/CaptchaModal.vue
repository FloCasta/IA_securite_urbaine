<!-- Modal des questions à 8 réponses -->
<template>
    <div class="card_modal">
        <div class="head_modal">
            <div class="title_modal">
                <h2>{{ props.form.title }}</h2>
            </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleCaptchaModal" />
        </div>
        <div class='main_modal'>
            <p>Question</p>
            <div class="question_modal">{{ props.form.question }}</div>
            <p>Selection</p>
            <div class="answers_captcha">
                <img class="img_captcha" :src=answer.img :alt=answer.title :title=answer.title
                    v-for="answer in props.form.answers" @click="clickAnswer(answer.id)"
                    v-bind:class="{ checked_captcha: selectedAnswer.includes(answer.id) }">
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
import { useAlertsStore } from '@/store';
import { ref, watch } from 'vue';
import { Point } from '@/class/Point';
import { Captcha, type CaptchaAnswer } from '@/class/Captcha';


const store = useAlertsStore();

const props = defineProps({
    form: { type: Captcha, required: true },
    next: { type: Function, required: true },
    previous: { type: Function, required: true },
    addPoint: { type: Function, required: true },
    isReadOnly: Boolean
});

const data = ref({ questionId: null as string | null, selectedAnswer: [] as number[] });
const selectedAnswer = ref<number[]>([]);
const answerPage = ref<Boolean>(false);

watch([() => props.form, () => props.isReadOnly], ([form, isReadOnly]) => {
    answerPage.value = isReadOnly;

    setTimeout(() => { form.savedAnswers.forEach((e)=>{
            if(answerPage.value){
                setTimeout(() => { form.savedAnswers.forEach((e)=>{
                    clickAnswer(e);
                }) }, 50);
            }else{
                setTimeout(() => { selectedAnswer.value = []; }, 50);
            }
        }) }, 50);

    
});

const clickAnswer = (a: number) => {
    const index = selectedAnswer.value.indexOf(a);
    if (index !== -1) {
        selectedAnswer.value.splice(index, 1);
    } else {
        selectedAnswer.value.push(a);
    }
}

const previous = () => {
    store.toggleCaptchaModal();
    props.previous();
}

const submit = () => {
    store.toggleCaptchaModal();
    checkAnswer();
    props.next();
}

const checkAnswer = () => {
    let nGoodAnswers = 0
    let goodAsnwsers = props.form.answers?.filter((a) => a.response == true);
    let display = '';
    props.form.saveAnswer(selectedAnswer.value);
    goodAsnwsers?.forEach((a) => {
        if (selectedAnswer.value.includes(a.id)) {
            display += a.title + ',';
            nGoodAnswers += 1;
        }
    })
    if (display == '') {
        display = 'Aucune Réponse trouvée.'
    }

    let point = 0;
    if (nGoodAnswers == goodAsnwsers!.length)
        point = 1;
    else if (nGoodAnswers == 0)
        point = 0;
    else
        point = 0.5
        
    let form : Captcha = { ...props.form, saveAnswer: props.form.saveAnswer };
    form.saveAnswer(Array.from(selectedAnswer.value));
    props.addPoint(new Point(point, form, display.slice(0, -1)));

}

const back = () =>{
    store.toggleCaptchaModal();
    store.toggleResultModalVisible();
}

</script>
    
<style scoped>
.answers_captcha {
    margin: 0 4vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    max-height: 38vh;
    border-radius: .7rem;
    justify-content: center;
    align-content: center;
}

.img_captcha {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 15vh;
    height: 15vh;
    border-radius: .7rem;
    margin: .5vh .8vw;
    font-size: 0.8rem;
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
    box-shadow: 0 0 10px 5px #638e99d1;
    transform: translate3d(0, 0, 3px);
    transition: filter 0.3s ease, transform 0.3s ease;
}

@media screen and (max-width: 900px) {
    .answers_captcha {
        margin: 0 2vw;
        max-height: 48vh;
    }
}
</style>
  