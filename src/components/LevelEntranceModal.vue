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
          <img class="star" :src=imgOn[0] id="star1"/>
          <img class="star" :src=imgOn[1] id="star2"/>
          <img class="star" :src=imgOn[2] id="star3"/>
        </div>
        <p v-if="hide">Vous devez valider le niveau précédent pour pouvoir jouer à ce niveau</p>
        <div class='btn_submit_modal'>
          <button :style="{ backgroundColor : buttonColor}" :disabled=disabled  id="startLevel" class="btn_start" @click="submit">Commencer</button>
        </div>
      </div>
    </Transition>
  </template>
    
  <script setup lang="ts">
  import { useAlertsStore } from '@/store';
  import { ref } from 'vue';
  
  
  const store = useAlertsStore();
  const hide = ref(true);

  const props = defineProps({
    launchLevel: { type: Function, required: true },
    nLevel:{ type: Number, required: true },
    title: String
  });
  let imgOn = ref(["/star.png","/star.png","/star.png"])
  let disabled: boolean = false;
  let buttonColor = ref("");

  const updateStars =(star: number, previous:number) => {
      switch(star){
          case 5:
            imgOn.value =  ["/star.png","/star.png","/star.png"];
            break;
          case 4:
            imgOn.value =  ["/star.png","/star.png","/turnoffstar.png"]
            break;
          case 3:
            imgOn.value = ["/star.png","/turnoffstar.png","/turnoffstar.png"]
            break;
          default :
            imgOn.value = ["/turnoffstar.png","/turnoffstar.png","/turnoffstar.png"]
            break;

        }  
        //It's doing nothing for the first level but we don't care for now it will be for bug fixing
        if(previous < 3){
          disabled = true;
          buttonColor.value="gray";
          hide.value=true
        }
        else{
          disabled=false;
          buttonColor.value="#88924b";
          hide.value=false
        } 
  };

  updateStars(store.scoreWorld1[props.nLevel-1], store.scoreWorld1[props.nLevel-2]);
  
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
    height: fit-content;
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

    p{
      margin: 0;
      padding: 2vw;
    }
    .btn_submit_modal{
      margin: 0 !important;
      padding: 1vh;
      .btn_start{
        padding: 1vh !important;
        margin: 0;
        display: block !important;
      }
    }
    .stars{
      padding: 2vw;
      display: flex;
      .star{
        flex: 3;
        width: 5vw;
        height: 5vw; /* same as width */
      }
    }
  }
  </style>
    