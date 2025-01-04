<script setup>
import NumberFlow, { NumberFlowGroup } from "@number-flow/vue";
import { useGameLogic } from "@/composables/useGameLogic";
import { useShuffle } from "@/composables/useShuffle";
import { useSound } from "@/composables/useSound";
import { useTimer } from "@/composables/useTimer";
import { reactive, onMounted } from "vue";

const state = reactive({
  list: [],
  soundStatus: true,
  numberOfMoves: 25,
  timer: { second: 59, setInterval: 0 },
  clickTimeOut: 0
});

const { gameStatus, handleResetGame } = useGameLogic(state);
const { playSound, toggleSound, sound2 } = useSound();
const { handleShuffle } = useShuffle(state);
const { handleTimer } = useTimer(state);

onMounted(() => { handleShuffle() });

const handleShowImage = (item) => {
  if (!item.showImage) {

    if (gameStatus.value !== "isPlaying") {
      handleTimer()
      if (state.soundStatus) sound2.play()
    }

    const filterList = state.list.filter(
      (filter) => filter.showImage && !filter.found
    );

    if (filterList.length > 1) return;
    if (!item.showImage) state.numberOfMoves--;
    item.showImage = true;

    if (filterList.length === 1) {
      if (
        filterList[0].imageName === item.imageName &&
        filterList[0].id !== item.id
      ) {
        filterList[0].found = true;
        item.found = true;
        if (state.soundStatus) playSound();
      } else {
        state.clickTimeOut = setTimeout(() => {
          state.list.forEach((changeStatus) => {
            changeStatus.showImage = false;
          });
        }, 2000);
      }
    }
  }
};
</script>
<template>
  <div class="parent-game">

    <transition-fade>
      <transition-scale v-if="state.list.length" group class="parent-content">

        <div v-if="gameStatus === 'isPlaying'" class="header">
          <div>
            <p>تعداد حرکت :</p>
            <p>
              <NumberFlow :value="state.numberOfMoves" />
            </p>
          </div>
          <div>
            <NumberFlowGroup>
              <p>
                <NumberFlow :value="state.timer.second" />
              </p>
            </NumberFlowGroup>
          </div>
        </div>

        <div v-if="gameStatus === 'isPlaying' || gameStatus === 'ready'" class="main">
          <div :class="{ 'bg-white box-rotate': item.showImage || item.found }" v-for="(item, index) in state.list"
            @click="handleShowImage(item)" :key="item.id" class="box">
            <img :src="`/assets/${item.imageName}.SVG`" v-if="item.showImage || item.found" />
            <p v-else>
              <NumberFlow :value="index + 1" />
            </p>
          </div>
        </div>

        <div v-if="gameStatus === 'isPlaying'" class="footer">
          <transition-fade>
            <button @click="handleResetGame(handleShuffle)" v-if="gameStatus === 'isPlaying'" class="btn-start">
              <img src="/assets/reset.svg" />
              <p>شروع مجدد</p>
            </button>
          </transition-fade>

          <div @click="toggleSound(state)" class="sound">
            <img :src="`/assets/${state.soundStatus ? 'sound-active' : 'sound-disable'
              }.svg`" />
            <p>صدا</p>
          </div>
        </div>

        <div class="game-status" v-if="gameStatus === 'win'">
          <p style="color: green;">تبریک میگم شما برنده شدید</p>
          <button @click="handleResetGame(handleShuffle)" class="btn-start">
            <p>شروع مجدد</p>
            <img src="/assets/reset.svg" />
          </button>
        </div>

        <div class="game-status" v-if="gameStatus === 'lose'">
          <p style="color: red;">برنده نشدید</p>

          <button @click="handleResetGame(handleShuffle)" class="btn-start">
            <p>شروع مجدد</p>
            <img src="/assets/reset.svg" />
          </button>
        </div>

      </transition-scale>
    </transition-fade>

  </div>
</template>
<style scoped lang="scss">
@font-face {
  font-family: 'KalamehWeb';
  src: url('assets/fonts/KalamehWeb(FaNum)-Regular.woff2') format('woff2'),
    url('assets/fonts/KalamehWeb(FaNum)-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

* {
  padding: 0;
  margin: 0;
  font-family: 'KalamehWeb';
  user-select: none;
  /* Non-prefixed version, currently*/
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -webkit-user-drag: none;
  scroll-behavior: smooth;

}

$primary-color: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
$secondary-color: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
$secondary-hover-color: #47a374;
$text-color: #fff;
$font-size-large: 20px;
$font-size-medium: 18px;
$font-size-small: 16px;
$gap-small: 10px;
$gap-medium: 25px;
$gap-large: 35px;


@mixin flex-center {
  justify-content: center;
  align-items: center;
  display: flex;
}

@mixin flex-evenly {
  justify-content: space-evenly;
  align-items: center;
  display: flex;
}

@mixin flex-start {
  justify-content: center;
  align-items: start;
  display: flex;
}

@mixin flex-between {
  justify-content: space-between;
  align-items: center;
  display: flex;
}

@mixin box-shadow {
  box-shadow: 1px 1px 5px 2.5px rgba(141, 61, 61, 0.25);
}

@mixin transition-all {
  transition: all 0.3s ease;
}


.parent-game {
  background-image: $secondary-color ;
  @include flex-center;
  min-height: 100vh;
  padding: 10px;
  width: 100vw;
}

.parent-content {
  background-color: #fff;
  flex-direction: column;
  @include flex-center;
  border-radius: 15px;
  min-width: 250px;
  gap: $gap-large;
  padding: 30px;
  width: 490px;
}

.header {
  width: 100%;
  @include flex-between;

  div {
    @include flex-center;
    gap: $gap-small;

  }

  div:nth-child(2) {
    p {
      font-size: $font-size-large;
      text-align: center;
      font-weight: bold;
      width: 55px;
    }
  }

  p {
    font-weight: bold;
    font-size: $font-size-large;

  }
}

.main {
  @include flex-evenly();
  max-width: 500px;
  gap: $gap-medium;
  flex-wrap: wrap;
  padding: 10px 0px;
  width: 100%;

}

.box {
  background-image: $primary-color;
  @include transition-all;
  @include flex-center;
  border-radius: 10px;
  @include box-shadow;
  cursor: pointer;
  height: 100px;
  width: 100px;

  &.bg-white {
    background-image: radial-gradient(73% 147%, #EADFDF 59%, #ECE2DF 100%), radial-gradient(91% 146%, rgba(255, 255, 255, 0.50) 47%, rgba(0, 0, 0, 0.50) 100%);
    background-blend-mode: screen;
  }

  p {
    color: $text-color;
    font-size: $font-size-small;
  }

  img {
    transform: rotateX(180deg);
  }

  &-rotate {
    transform: rotateX(180deg);
  }

  &-color {
    background-image: $primary-color;
  }
}

.footer {
  @include flex-between;
  border-radius: 10px;
  max-width: 300px;
  flex-wrap: wrap;
  border: none;
  width: 100%;
  gap: 12px;


  .sound {
    @include flex-center;
    gap: $gap-small;
    cursor: pointer;

    p {
      font-size: $font-size-medium;
      font-weight: bold;
    }
  }
}

.btn-start {
  all: unset;
  @include flex-center;
  color: black;
  cursor: pointer;
  gap: $gap-small;

  font-size: $font-size-medium;
  font-weight: bold;
  @include transition-all;
}

.game-status {
  @include flex-center;
  flex-direction: column;
  gap: $gap-small;

  p {
    font-size: $font-size-medium;
    font-weight: bold;
    text-align: center;
  }

  bottom {
    all: unset;
    @include flex-center;
    color: black;
    cursor: pointer;
    gap: $gap-small;

    font-size: $font-size-medium;
    font-weight: bold;
    @include transition-all;
  }
}
</style>
