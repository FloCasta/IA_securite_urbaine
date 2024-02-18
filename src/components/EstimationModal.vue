<!-- Modal estimation chiffré -->
<template>
    <Transition name="modal">
        <div class="card_modal">
            <div class="head_modal">
                <div class="title_modal">
                    <h2>{{ props.title }}</h2>
                </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png'
                    @click="store.toggleEstimationModal" />
            </div>
            <div class='main_modal'>
                <p>Question</p>
                <div class="question_modal">{{ props.question }}</div>
                <p>Estimation</p>
                <div class="answers_estimation">
                    <div class="selectedAnswer_estimation" :style="{ left: sliderPosition + '%' }">{{ selectedAnswer }}
                    </div>
                    <input type="range" :min=props.minNumber :max=props.maxNumber v-model=selectedAnswer
                        class="slider_estimation" id="myRange" @input="updateSliderPosition">
                    <div class="display_values_estimation">
                        <div>{{ minNumber }}</div>
                        <div>{{ maxNumber }}</div>
                    </div>
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
import { Point } from '@/class/Point';
import { useAlertsStore } from '@/store';

const store = useAlertsStore();
const props = defineProps({
    id: String,
    next: { type: Function, required: true },
    previous: { type: Function, required: true },
    addPoint: { type: Function, required: true },
    title: String,
    question: String,
    minNumber: Number,
    maxNumber: Number,
    increment: Number,
    minAnswer: Number,
    maxAnswer: Number,
    textAnswer: String,
});
const selectedAnswer = ref(props.minNumber);
const data = ref({ questionId: null as String | null, selectedAnswer: Number });

const answerPage = false;
const sliderPosition = ref(0);

const updateSliderPosition = (event: any) => {
    selectedAnswer.value = event.target.value;
    const slider = event.target;
    const value = (slider.value - slider.min) / (slider.max - slider.min)
    sliderPosition.value = value * 100;
}

const previous = () => {
    store.toggleEstimationModal();
    props.previous();
}

const submit = () => {
    store.toggleEstimationModal();
    checkAnswer();
    props.next();
}

const checkAnswer = () =>{
  let answer = selectedAnswer.value!;
  let point = 0;
  if(answer < props.maxAnswer! && answer > props.minAnswer!){
      point =1;
  }
  else 
    point = 0
  props.addPoint(new Point(point,"type"));
}

</script>
    
<style scoped>
.answers_estimation {
    position: relative;
    margin: 1vh 4vw;
    margin-top: auto;
    margin-bottom: auto;
}

.slider_estimation {
    -webkit-appearance: none;
    width: 100%;
    height: 2vh;
    background: transparent;
    border: 3px solid #638e99;
    border-radius: 0.4rem;
}

/* for chrome/safari */
.slider_estimation::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.2vw;
    height: 7vh;
    background: #638e99;
    transition: all 0.1s;
    cursor: pointer;
    border: .2rem solid #638e99;
    border-radius: 0.4rem;
}

/* for firefox */
.slider_estimation::-moz-range-thumb {
    width: 1.2vw;
    height: 7vh;
    background: #638e99;
    transition: all 0.25s;
    cursor: pointer;
    border: .2rem solid #638e99;
    border-radius: 0.4rem;
}

/* for chrome/safari */
.slider_estimation::-webkit-slider-thumb:hover {
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

/* for firefox */
.slider_estimation::-moz-range-thumb:hover {
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

.selectedAnswer_estimation {
    position: absolute;
    margin-top: -8vh;
    color: #638e99;
    font-size: 1.5rem;
    transform: translateX(-50%);
}

.display_values_estimation {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 3vh 0;
}
</style>
    