<!-- Modal des phrases à trou -->
<template>
    <Transition name="modal">
      <div class="card_modal">
          <div class="head_modal">
          <div class="title_modal">
              <h2>{{ props.title }}</h2>
            </div>
            <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleResultModalVisible" />
          </div>
          <div class="score">
            <div class="questionsReponses">
              <div @click="goTo(point.form)" v-for="(point, index) in $props.points" :style="getBackgroundColor(index)" :key="index" class="question">
              {{ point.displayAnswer.split('\n').join('').substring(0, 160) }}
              </div>
            </div>
            <div class="scoreRound" >
              <div :style="getScoreRoundColor(displayScore)"><p>{{ displayScore }}/5</p></div>
            </div>
          </div>
          <div class="btn_submit_modal">
            <button class="btn_close" @click="close">Fermer</button>
          </div>
      </div>
    </Transition>
  </template>
    
  <script setup lang="ts">

  import { Point } from '@/class/Point';
  import { useAlertsStore } from '@/store';
  import { ref, watch } from 'vue';
  
  const displayScore = ref(0);
  const props = defineProps({
    title: String,
    points: { type: Array<Point>, required: true },
    nLevel: Number,
    nWorld: Number,
    openReadOnly: { type: Function, required: true }
  });

  const store = useAlertsStore();

  let score = 0;
  let pointsOnly = props.points!.map((p)=> p.point);

  watch(() => props.points, (points) => {
    if(points.length==5){
      pointsOnly = points.map((p)=> p.point);
      displayScore.value = pointsOnly.reduce((acc, cur) => acc + cur, 0);
    }
  });

  const updatePoints = () => {
    score = 0;
    props.points?.forEach((p)=>{
      score+= p.point;
    })

    switch(props.nWorld){
      case 1:
        store.scoreWorld1[props.nLevel!-1] = score;
        break;
      case 2:
        store.scoreWorld2[props.nLevel!-1] = score;
        break;
      case 3:
        store.scoreWorld3[props.nLevel!-1] = score;
        break;
      case 4:
        store.scoreWorld4[props.nLevel!-1] = score;
        break;

    }

  };    

  defineExpose({
    updatePoints
  });

  

  const getBackgroundColor = (index:number) =>{
    if(pointsOnly[index] == 1)
      return { backgroundColor: 'rgba(0, 200, 0,0.1)' }
    else return { backgroundColor: 'rgba(200, 0, 0,0.1)' }
  }

  const getScoreRoundColor = (n:number) =>{
    if(n >= 3)
      return { backgroundColor: 'rgba(0, 200, 0,0.1)' }
    else return { backgroundColor: 'rgba(200, 0, 0,0.1)' }
  }

  const goTo = (form:any) => {
    props.openReadOnly(form);
    store.toggleResultModalVisible();
  }

  const close = () => {
    store.toggleResultModalVisible();
  }
  
  </script>
  
  <style scoped>
    .score{
      display: flex;
      height: 56vh;
      padding: 0,2vw ,0,2vw ;
      .questionsReponses{
        flex:5;
        padding: 3vw;
        display: flex;
        flex-direction: column-reverse; 
        
        flex-direction: column;
        .question{
          flex: 2; 
          font-size: 1em;
          height: 5vh;
          padding: 1vw;
          align-items: center;
          display: flex;
          width: 100%;
          border-radius: 10px;
          background-color: #ccc;
          margin-bottom: 10px;
          word-wrap: break-word;
        }
      }
      .scoreRound{
        display: flex;
        flex:5;
        padding: 3vw;
        justify-content: center;
        align-items: center;

        div{
          width:20vw;
          max-width: 25vw;
          aspect-ratio: 1 / 1;
          overflow: hidden; 
          border-radius: 50%;
          background-color: rgb(138, 138, 138);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 5vw; 
        }

      }

    }

    .btn_submit_modal{
      margin: 0 !important;
      padding: 2vh;
      .btn_close{
        background-color: #88924b;
      }
    }
  </style>
    