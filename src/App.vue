<template>
  <div id="app">
<page-header></page-header>
<page-mainsection></page-mainsection>
<page-footer></page-footer>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import PageHeader from './components/PageHeader'
import MainSection from './components/MainSection'
import PageFooter from './components/PageFooter'
export default {
  components:{
    'page-header' : PageHeader,
    'page-mainsection' : MainSection,
    'page-footer' : PageFooter,
}
}
</script>

<style>

</style>
