<!-- Modal des phrases à trou -->
<template>
    <Transition name="modal">
      <div class="level_modal">
      <div class="head_modal">
        <div class="title_modal">
          <h2>{{ props.title }}</h2>
        </div>
        <img alt="Fermer" class="close_modal" src='/buttons/close.png' @click="store.toggleLevelEntranceModalVisible(false)" />
      </div>
        <div class="stars">
          <img class="star" :src=imgOn1 id="star1"/>
          <img class="star" :src=imgOn2 id="star2"/>
          <img class="star" :src=imgOn3 id="star3"/>
        </div>
        <div class='btn_submit_modal'>
          <button :style="{ backgroundColor : buttonColor}" :disabled=disabled  id="startLevel" class="btn_start" @click="submit" v-show="answerPage">Commencer</button>
        </div>
      </div>
    </Transition>
  </template>
    
  <script setup lang="ts">
  import { useAlertsStore } from '@/store';
  import { ref , watch } from 'vue';
  
  const store = useAlertsStore();
  
  const props = defineProps({
    launchLevel: { type: Function, required: true },
    nLevel:{ type: Number, required: true },
    title: String
  });
  let imgOn1 = ref("/star.png")
  let imgOn2 = ref("/star.png")
  let imgOn3 = ref("/star.png")
  let disabled: boolean = false;
  let buttonColor = ref("");

  const updateStars =(star: number, previous:number) => {
      switch(star){
          case 5:
            imgOn1.value =  "/star.png";
            imgOn2.value =  "/star.png";
            imgOn3.value =  "/star.png";
            break;
          case 4:
            imgOn1.value =  "/star.png";
            imgOn2.value =  "/star.png";
            imgOn3.value =  "/turnoffstar.png";
            break;
          case 3:
            imgOn1.value =  "/star.png";
            imgOn2.value =  "/turnoffstar.png";
            imgOn3.value =  "/turnoffstar.png";
            break;
          default :
            imgOn1.value =  "/turnoffstar.png";
            imgOn2.value =  "/turnoffstar.png";
            imgOn3.value =  "/turnoffstar.png";
            break;

        }  
        if(previous < 3){
          disabled = true;
          buttonColor.value="gray";
        }
        else{
          disabled=false;
          buttonColor.value="#88924b";
        } 
  };

  updateStars(store.scoreWorld1[props.nLevel-1], store.scoreWorld1[props.nLevel-2]);
  //It's doing nothing for the first level but we don't care for now it will be for bug fixing


  const answerPage = false;
  
  const submit = () => {
    store.toggleLevelEntranceModalVisible(false);
    props.launchLevel(props.nLevel);
  }

  defineExpose({
    updateStars
  });
  
  </script>
    
  <style scoped>
  .level_modal {
    height: 40vh;
    width: 20vw;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 7px 20px 5px #00000088;
    border-radius: .7rem;
    margin: auto;
    backdrop-filter: blur(10px);
    justify-content: center;
    align-items: center;
    text-align: center;
    top: 20vh;
    position: relative;

    .stars{
      padding: 2vw;
      display: flex;
      .star{
        flex: 3;
        width: 5vw;
        height: 5vw; /* same as width */
      }

    }

    .btn_start{
      position: absolute;
      bottom: 0;
      display: block !important;
      bottom: 2vh;
    }
  }
  </style>
    