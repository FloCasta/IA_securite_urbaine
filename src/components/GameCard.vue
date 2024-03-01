<!-- Navbar de la page Jeux et page_mondes -->
<template>
  <div class="game_card">
    <div class='main'>
      <img class='card_image' :src="img_title" alt="game_card" />
      <h2>{{ title }}</h2>
      <hr />
      <StarRating :rating=rating :world_num=world_num :title=title />
      <p class='description'>{{ description }}</p>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import StarRating from '@/components/StarRating.vue';

const props = defineProps({
  title: { type: String, required: true },
  description: String,
  img_title: String,
  rating: Array<number>,
  world_num: String,
});

</script>
  
<style scoped>
.game_card {
  text-align: center;
  position: relative;
  user-select: none;
  max-width: 300px;
  height: 70vh;
  width: 40rem;
  margin: 2rem auto;
  border: 1px solid #ffffff22;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 7px 20px 5px #00000088;
  border-radius: .7rem;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow: hidden;
  transition: .5s all;

  hr {
    width: 100%;
    border: none;
    border-bottom: 1px solid #011624da;
    margin-top: 0;
  }

  .main {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    padding: 1rem;

    .card_image {
      border-radius: .5rem;
      max-width: 100%;
      height: 250px;
      object-fit: cover;
    }

    .description {
      margin: .5rem 0;
      color: #011624da;
      font-size: 0.8rem;
    }
  }

  ::before {
    position: fixed;
    content: "";
    box-shadow: 0 0 100px 40px #ffffff08;
    top: -10%;
    left: -100%;
    transform: rotate(-45deg);
    transition: .7s all;
  }

  &:hover {
    border: 1px solid #ffffff44;
    box-shadow: 0 7px 50px 10px #000000aa;
    transform: scale(1.015);
    filter: brightness(1.3);

    ::before {
      filter: brightness(.5);
      top: -100%;
      left: 200%;
    }
  }
}
</style>
  