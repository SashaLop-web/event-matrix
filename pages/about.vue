<template>
  <section class="about-page">
    <hero class="hero"/>
    <div class="grad1"></div>
    <CompanyOverview/>
    <ValuesSection/>
    <TeamSection/>
    <CareersSection/>
    <WhyUsSection/>

  </section>
</template>
<script setup>CareersSection.vue
import hero from '@/components/about/hero.vue'
import CompanyOverview from '@/components/about/CompanyOverview.vue'
import ValuesSection from '@/components/about/ValuesSection.vue'
import TeamSection from '@/components/about/TeamSection.vue'
import CareersSection from '@/components/about/CareersSection.vue'
import WhyUsSection from '@/components/about/WhyUsSection.vue'
// import TeamSection from '@/components/about/TeamSection.vue'

</script>
<style>
.hero{
  margin-top: 84px;
}
.grad1{
  width: 100%;
  height: 70px;
  background: linear-gradient(to bottom, #F4F4F4FF, #EBEBEB);
}
@media (max-width: 480px){
  .hero{
  margin-top: 50px;
}
}
</style>