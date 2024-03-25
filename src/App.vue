<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { enqueue, getAsyncFn } from './promiseQueue'
import { useDeepStore } from './stores/deep'
useDeepStore()

const id = (function* () {
  let id = 0
  while (true) {
    yield id++
  }
})()

window.addEventListener('keydown', (ev) => {
  if (ev.key !== 'q') return
  const count = Math.max(Math.round(Math.random() * 10), 1)
  fillQueue(count)
})

function fillQueue(count: number) {
  for (let i = 0; i < count; i++) enqueue(getAsyncFn(id.next().value))
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
