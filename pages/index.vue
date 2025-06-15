<template>
  <div>
    <div class="block"></div>
    <HomeHeroSection />
    <div class="grad1"></div>
    <ValueProposition />
    <div class="grad2"></div>
    <EventsShowcase />
    <Timeline id="timeline" />
  </div>
</template>

<script setup>
import HomeHeroSection from '@/components/index/HomeHeroSection.vue'
import ValueProposition from '@/components/index/ValueProposition.vue'
import EventsShowcase from '@/components/index/EventsShowcase.vue'
import Timeline from '@/components/index/Timeline.vue'
</script>

<style scoped>
.block {
  width: 100%;
  height: 83px;
}
.grad1 {
  width: 100%;
  height: 70px;
  background: linear-gradient(to bottom, #f4f4f4ff, #ebebeb);
}
.grad2 {
  width: 100%;
  height: 90px;
  background: linear-gradient(to bottom, #ececec, #212121);
}

@media (max-width: 480px) {
  .block {
    height: 50px;
  }
  .grad1 {
    height: 30px;
  }
}
</style>
