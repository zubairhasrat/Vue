<template>
  <div>
    <section class="hero is-medium  is-bold has-bg-img">
      <div class="hero-body">
        <div class="container has-text-centered ">
          <h1 class="title has-text-white text-style">
            Welcome to GB Tourist Guide!
          </h1>
          <h2 class="subtitle has-text-white text-style">
            Explore the world!!
          </h2>
            <span >
								<a class="button is-info" @click="showAddModel = true">
									Add Place
								</a>
          	</span>
        </div>
      </div>
    </section>
    <AddTouristPoints v-if="showAddModel" @close="showAddModel = false"/>
  </div>
</template>
<script>
import AddTouristPoints from '../components/AddTouristPoints.vue'
import {mapGetters} from 'vuex'
export default {
   components: {
    AddTouristPoints
  },
  data(){
        return{
						showAddModel: false,
        }   
    },
}
</script>
<style scoped>
  .button{
   padding: 10px;
  }
  .button:hover{
    background-color: aquamarine;
    color: blue;
  }
  .container{
    margin-top: -30px
  }
  .hero{
    margin-top: 0px;
    height: 300px;
  }
  .has-bg-img{
    background-image: url("../assets/bg5.jpg");
    background-size:cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center center;
    background-color: #999;

  }
  .text-style{
    font-family: Monospace	;
    text-shadow: 3px 2px rgb(127, 83, 248);
  }
</style>