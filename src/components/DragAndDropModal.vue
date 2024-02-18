<!-- Modal du jeu glisser-déposer -->
<template>
  <Transition name="modal">
    <div class="card_modal">
      <div class="head_modal">
        <div class="title_modal">
          <h2>{{ props.title }}</h2>
        </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleDragAndDropModal" />
      </div>
      <div class='main_modal'>
        <p>Question</p>
        <div class="question_modal">{{ props.question }}</div>
        <p>Classement</p>
        <div class="draggable">
          <draggable v-model="answers" group="answer" class="answers_drag_and_drop" item-key="id" :move="onMove">
            <template #item="{ element }">
              <div class="answer_drag_and_drop" :key="element.id">{{ element.answer }}</div>
            </template>
          </draggable>
          <draggable v-model="selectedAnswer" group="answer" class="classement_drag_and_drop" item-key="id">
            <template #item="{ element, index }">
              <div class="drop" :key="element.id" v-bind:class="{ [`classement${index + 1}_drag_and_drop`]: true }">
                {{ element.answer }}</div>
            </template>
          </draggable>
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
import draggable from 'vuedraggable';
import {type DragAndDropAnswer} from '@/class/DragAndDrop';

const store = useAlertsStore();

const props = defineProps({
  id: String,
  next: { type: Function, required: true },
  previous: { type: Function, required: true },
  addPoint: { type: Function, required: true },
  title: String,
  question: String,
  answers: { type: Array<DragAndDropAnswer>, required: true },
  textAnswer: String,
});

const data = ref({ questionId: null as string | null, selectedAnswer: [] as number[] });
const selectedAnswer = ref<number[]>([]);
const answerPage = false;
const answers = ref(props.answers);

function onMove() {
  if (selectedAnswer.value.length == 4) return false
};

const previous = () => {
  store.toggleDragAndDropModal();
  props.previous();
}

const submit = () => {
  store.toggleDragAndDropModal();
  checkAnswer();
  props.next();
}

const checkAnswer = () =>{
  let nGoodAnswers = 0
  let goodAsnwsers = props.answers?.filter((a) => a.response == true);
  let answers = selectedAnswer.value.map(obj => obj.id);
  goodAsnwsers?.forEach((a)=>{
    if(answers.includes(a.id) ){
      nGoodAnswers +=1;
    } 
  })
  let point = 0;
  if(nGoodAnswers == goodAsnwsers.length)
    point = 1;
  else if (nGoodAnswers == 0)
    point = 0;
  else 
    point = 0.5
  props.addPoint(new Point(point,"type"));
}


</script>
  
<style scoped>
.answers_drag_and_drop {
  padding: 0 4vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  min-height: 16vh;
}

.answer_drag_and_drop {
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

  &:hover {
    filter: drop-shadow(0 0 2rem white);
    transform: translateY(-3px);


  }
}

.classement_drag_and_drop {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  margin: 1vh 4vw;
  height: 16vh;
  outline: .3vh dashed white;
  border-radius: .7rem;
}

.classement1_drag_and_drop::after,
.classement2_drag_and_drop::after,
.classement3_drag_and_drop::after {
  content: '';
  position: absolute;
  top: 50%;
  border: .5vw solid transparent;
  border-right-color: white;
  transform: translateY(-50%);
}

.sortable-chosen::after {
  border-right-color: transparent;
}

.classement1_drag_and_drop::after {
  left: 11.8vw;
}

.classement2_drag_and_drop::after {
  left: 24.2vw;
}

.classement3_drag_and_drop::after {
  left: 36.8vw;
}

.drop {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 9.5vw;
  height: 13vh;
  border-radius: .7rem;
  margin: .5vh .5vw;
  padding: 1vh 1vw;
  font-size: .8rem;
  background-color: #638e995d;

  &:hover {
    background-color: #638e9949;
  }

  &:hover::after {
    background-color: transparent;
  }

}

@media screen and (max-width: 900px) {

  .draggable {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    height: 45vh;
    padding: 0 2vw;
  }

  .answers_drag_and_drop {
    flex-direction: column;
    padding: 0 0;
    width: 50%;
  }

  .answer_drag_and_drop {
    width: 34vw;
    height: 8.2vh;
    font-size: .6rem;
  }

  .classement_drag_and_drop {
    flex-direction: column;
    padding: 0 0;
    margin: 0 1vw;
    width: 50%;
    height: 100%;
  }

  .classement1_drag_and_drop::after,
  .classement2_drag_and_drop::after,
  .classement3_drag_and_drop::after {
    content: '';
    position: absolute;
    left: 50%;
    border: .5vh solid transparent;
    border-bottom-color: white;
    transform: translate(-50%, -50%) rotate(360deg);
  }

  .sortable-chosen::after {
    border-bottom-color: transparent;
  }

  .classement1_drag_and_drop::after {
    top: 11vh;
  }

  .classement2_drag_and_drop::after {
    top: 22.1vh;
  }

  .classement3_drag_and_drop::after {
    top: 33.3vh;
  }

  .drop {
    width: 34vw;
    height: 8.2vh;
    font-size: .6rem;
  }
}
</style>
