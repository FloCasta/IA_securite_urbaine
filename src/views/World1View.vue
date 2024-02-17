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

        <Modals ref="modal" world="world1" :v-show="store.isModalsVisible"></Modals>

    </div>
</template>

<script setup lang="ts">
import { useAlertsStore } from '@/store';
import HomeBanner from '@/components/HomeBanner.vue';
import BannerMenu from '@/components/BannerMenu.vue';
import Modals from '@/components/Modals.vue';
import { ref} from 'vue';

const store = useAlertsStore();

const nLevel = ref(1);
const modal = ref<any>(null);

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
        nLevel.value = parseInt(castleName.charAt(castleName.length - 1));
        if(nLevel.value>0){
            modal.value?.launchLevel(nLevel.value, store.scoreWorld1[nLevel.value-2]);
        }
        
    }, 1500);

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
}
</style>
