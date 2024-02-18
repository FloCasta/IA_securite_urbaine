<!-- Modal des phrases à trou -->
<template>
    <Transition name="modal">
      <div class="result_modal">
        <div class="head_modal">
        <div class="title_modal">
            <h2>{{ props.title }}</h2>
          </div>
          <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleResultModalVisible" />
        </div>
        <button class="btn_start" @click="submit">mettre 4/5 premier niveau</button>
        <p>You did it {{ score }} /5</p>
      </div>
    </Transition>
  </template>
    
  <script setup lang="ts">
  import { Point } from '@/class/Point';
  import { useAlertsStore } from '@/store';
  
  const props = defineProps({
    title: String,
    points: Array as () => Point[],
    nLevel: Number,
    nWorld: Number
  });

  const store = useAlertsStore();

  let score = 0;

  
  const submit = () => {
    let t =[4,0,0]
    store.setScoreWorld1(t)
  }

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

  </script>
    
  <style scoped>
  .result_modal {
    height: 30vh;
    width: 70vw;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 7px 20px 5px #00000088;
    border-radius: .7rem;
    backdrop-filter: blur(10px);


  }
  </style>
    