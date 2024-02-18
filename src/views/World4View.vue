<template>
    <div class="world4_page">
        <HomeBanner title="Protection de la vie privée et contre-surveillance" />
        <BannerMenu v-show="store.isMenuVisible" />
        <div class="game_zone">
            <span id="w4-start" @click="movePlayer('w4-start')" class="start"></span>
            <div v-for="i in 3" class="castles" :id="'w4-castle' + i + '-div'">
                <img :src="'/world4/castle' + i + '.png'" :alt="'world 4 castle ' + i" :id="'w4-castle' + i"
                    @click="movePlayer('w4-castle' + i + '-div')">
                <img v-if="store.scoreWorld3[i - 1]>3" src="/stars/star4.png" class="star-castle" />
            </div>
            <img :src="`/players/player${store.avatarId}.png`" alt="w4-player" id="w4-player" class="player">
        </div>
        <RessourceModal v-if="store.isRessourceModalVisible" :subject="'videosurveillance'" ></RessourceModal>
        <Modals ref="modal" world="world4" :v-show="store.isModalsVisible"></Modals>
    </div>
</template>

<script setup lang="ts">
import { useAlertsStore } from '@/store';
import HomeBanner from '@/components/HomeBanner.vue';
import BannerMenu from '@/components/BannerMenu.vue';
import RessourceModal from '@/components/RessourceModal.vue';
import Modals from '@/components/Modals.vue';
import { ref } from 'vue';


const store = useAlertsStore();

const nLevel = ref(1);
const modal = ref<any>(null);

function movePlayer(castleName: string) {
    var castle = document.getElementById(castleName);
    var player = document.getElementById('w4-player');

    if (castle && player) {
        const castleStyle = window.getComputedStyle(castle);
        const playerStyle = window.getComputedStyle(player);

        const topValue = castleStyle.top;
        const leftValue = castleStyle.left;
        const heightValue = castleStyle.height;

        const topValueInPixels = parseInt(topValue, 10);
        const leftValueInPixels = parseInt(leftValue, 10);
        const heightValueInPixels = parseInt(heightValue, 10);

        if (castleName === 'w4-start') {
            player.style.setProperty('height', '10rem');
            var playerHeight = parseInt(playerStyle.height, 10)
            player.style.setProperty('top', `${topValueInPixels - playerHeight}px`);
            player.style.setProperty('left', leftValue);
        } else {
            player.style.setProperty('top', `${topValueInPixels + 5}px`);
            player.style.setProperty('height', `${heightValueInPixels + 30}px`);
            player.style.setProperty('left', `${leftValueInPixels + heightValueInPixels / 2}px`);
        }
    }
    setTimeout(() => {
        let element = castleName.replace(/[^\d]/g, '');
        nLevel.value = parseInt(element[1]); 
        if (nLevel.value > 0) {
            modal.value?.launchLevel(nLevel.value, store.scoreWorld4[nLevel.value - 2],4);
        }


    }, 1500);

}
</script>

<style>
#w4-start {
    top: 90%;
    left: 10%;
}

#w4-player {
    height: 10rem;
    top: 75%;
    left: 10%;
}

#w4-castle1-div {
    top: 50%;
    left: 25%;

    #w4-castle1 {
        height: 8rem;
    }
}

#w4-castle2-div {
    top: 52%;
    left: 70%;

    #w4-castle2 {
        height: 7rem;
    }
}

#w4-castle3-div {
    top: 45%;
    left: 60%;

    #w4-castle3 {
        height: 5rem;
    }
}

@media screen and (max-width: 900px) {

    h1 {
        font-size: 1rem;
    }

    #w4-start {
        top: 95%;
        left: 0;
    }

    #w4-player {
        top: 77%;
        left: 0;
    }

    #w4-castle1-div {
        height: 7rem;
        top: 70%;
        left: 15%;
    }

    #w4-castle2-div {
        height: 6rem;
        top: 60%;
        left: 35%;
    }

    #w4-castle3-div {
        top: 50%;
        left: 55%;
    }
}</style>
