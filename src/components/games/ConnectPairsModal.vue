<template>
    <div class="card_modal">
        <div class="head_modal">
            <div class="title_modal">
                <h2>{{ props.form.title }}</h2>
            </div> <img alt="Fermer" class="close_modal" src='/buttons/close.png'
                @click="store.toggleConnectPairsModal(); store.toggleModals()" />
        </div>
        <div class='main_modal'>
            <p>{{ props.form.question }}</p>
            <div class="items-container">
                <!-- Items for the first group -->
                <div class="items-group">
                    <div :ref="setRef(item.item1)" v-for="(item, index) in items" :key="'item1-' + item.item1" class="item"
                        @click="selectItem(item.item1, 'item1')">
                        {{ item.item1 }}
                    </div>
                </div>

                <!-- SVG container for drawing lines -->
                <svg class="lines-container" ref="svg">
                    <line v-for="(line, index) in lines" :key="index" :x1="line.x1" :y1="line.y1" :x2="line.x2"
                        :y2="line.y2" stroke="black" />
                </svg>

                <!-- Items for the second group -->
                <div class="items-group">
                    <div :ref="setRef(item.item2)" v-for="(item, index) in shuffledItems" :key="'item2-' + item.item2"
                        class="item" @click="selectItem(item.item2, 'item2')">
                        {{ item.item2 }}
                    </div>
                </div>
            </div>
        </div>
        <div class='btn_submit_modal'>
            <button class="btn_previous" @click="previous" v-show="!answerPage">Précédent</button>
            <button class="btn_reset" @click="reset" v-show="!answerPage">Effacer</button>
            <button class="btn_next" @click="submit" v-show="!answerPage">Suivant</button>
            <button class="btn_return" @click="back" v-show="answerPage">Retour</button>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useAlertsStore } from '@/store';
import { onBeforeMount, ref, watch } from 'vue';
import { ConnectPairs, } from '@/class/ConnectPairs';
import { Point } from '@/class/Point';

const store = useAlertsStore();

const props = defineProps({
    form: { type: ConnectPairs, required: true },
    next: { type: Function, required: true },
    previous: { type: Function, required: true },
    addPoint: { type: Function, required: true },
    isReadOnly: Boolean
});

watch([() => props.form, () => props.isReadOnly], ([form, isReadOnly]) => {
    answerPage.value = isReadOnly;
    if(answerPage.value){
        connections.value=form.savedAnswersConnections;
        lines.value=form.savedAnswersLines;
    }else {
        reset();
        items.value = form.pairs;
        shuffledItems.value = store.shuffleItems(items.value);
    }
});

const svg = ref(null);
const lines = ref([]);
const itemRefs = ref({});
const selectedItems = ref({ item1: null, item2: null });
var shuffledItems = ref([]);
//A sauvegarder dans le cookie
const connections = ref([]);
const items = ref([]);
items.value = props.form.pairs;
const answerPage = ref<Boolean>(false);

onBeforeMount(() => {
    shuffledItems.value = store.shuffleItems(items.value);
});

const setRef = (itemName) => {
    return (el) => {
        if (el) {
            itemRefs.value[itemName] = el;
        }
    };
};

const selectItem = (selectedItem, group) => {
    selectedItems.value[group] = selectedItem;

    if (selectedItems.value.item1 && selectedItems.value.item2) {
        drawLine(selectedItems.value.item1, selectedItems.value.item2);

        connections.value.push({ item1: selectedItems.value.item1, item2: selectedItems.value.item2 });

        selectedItems.value = { item1: null, item2: null };
    }
};

const drawLine = (item1Label, item2Label) => {
    const item1Element = itemRefs.value[item1Label];
    const item2Element = itemRefs.value[item2Label];

    if (item1Element && item2Element) {
        const svgRect = svg.value.getBoundingClientRect();
        const item1Rect = item1Element.getBoundingClientRect();
        const item2Rect = item2Element.getBoundingClientRect();

        const x1 = item1Rect.right - svgRect.left;
        const y1 = item1Rect.top + item1Rect.height / 2 - svgRect.top;
        const x2 = item2Rect.left - svgRect.left;
        const y2 = item2Rect.top + item2Rect.height / 2 - svgRect.top;

        lines.value.push({ x1, y1, x2, y2 });
    }
};

const previous = () => {
    store.toggleConnectPairsModal();
    props.previous();
}

const reset = () => {
    selectedItems.value = { item1: null, item2: null };
    lines.value = [];
    connections.value = [];
}

const submit = () => {
    store.toggleConnectPairsModal();
    checkAnswer();
    props.next();
}

const checkAnswer = () => {
    let score = 0;

    connections.value.forEach(connection => {
        if (items.value.some(item =>
            (item.item1 === connection.item1 && item.item2 === connection.item2) ||
            (item.item1 === connection.item2 && item.item2 === connection.item1)
        )) {
            score++;
        }
    });
    let point = 0;
    if (score == items.value.length)
        point = 1;
    else if (score == 0)
        point = 0;
    else
        point = 0.5;

    let form : ConnectPairs = { ...props.form, saveAnswer: props.form.saveAnswer };
    form.saveAnswer(Array.from(connections.value),Array.from(lines.value));
    props.addPoint(new Point(point, form, ""));
    connections.value = [];
};

const back = () =>{
    store.toggleConnectPairsModal();
    store.toggleResultModalVisible();
}

</script>
  
<style scoped>
.items-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    flex-direction: row;
}

.items-group {
    display: flex;
    flex-direction: column;
    padding: 0 2vw;
    width: auto;
}

.item {
    background-color: #e9e9e9;
    cursor: pointer;
    align-items: center;
    border-radius: .7rem;
    height: auto;
    margin: .5vh .5vw;
    padding: 1rem 1rem;
    background-color: var(--answer-transparent-color);
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

.lines-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

@media screen and (max-width: 900px) {
    .items-container {
        font-size: 0.6rem;
    }
}
</style>

  