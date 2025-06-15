<template>
    <SupportHero />
    <div class="grad1"></div>
    <SupportContact />
    <SupportFAQ />
    <SupportForm />
    <CareersSupport/>
    
  <!-- <KnowledgeBaseSection/> -->
</template>
<script setup>
import SupportHero from '@/components/support/SupportHero.vue'
 import SupportContact from '@/components/support/SupportContact.vue'
  import SupportFAQ from '@/components/support/SupportFAQ.vue'
  import SupportForm from '@/components/support/SupportForm.vue'
  import CareersSupport from '@/components/support/CareersSupport.vue'
//  import SupportContact from '@/components/support/SupportContact.vue'
// import KnowledgeBaseSection from '@/components/support/KnowledgeBaseSection.vue'

    const submitTicket = () => {
    alert('Запрос отправлен!');
    };

    const openChat = () => {
    // Логика открытия виджета чата
    };
</script>
<style scoped>
.grad1{
  width: 100%;
  height: 70px;
  background: linear-gradient(to bottom, #F4F4F4FF, #EBEBEB);
}
</style>

  
