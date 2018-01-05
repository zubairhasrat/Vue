<template>
  <div>
    <div class="modal is-active" @click="$emit('close'),resetplaces()">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <div class="card">
                    <div class="card-image">
                        <figure class="image image is-4by3">
                            <img :src="touristPoint.metadata.place_img1.url" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="box box-style">
                            <article class="media">
                                <div class="media-content">
                                <div class="content">
                                    <div class="columns about">
                                        <div class="column">
                                            <h1 class="subtitle">About {{touristPoint.title}}</h1>
                                            <p>
                                                {{touristPoint.metadata.place_description}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </article>
                        </div>
                        <div class="box box-style">
                            <div class="content">
                                <div class="columns">
                                    <div class="column is-4">
                                        <h1 class="subtitle">Hight:</h1>
                                    </div>
                                    <div class="column">
                                        <span>Hight of the {{touristPoint.title}} from sea level</span>
                                        <p><i class="fa fa-map-marker" aria-hidden="true"></i> {{touristPoint.metadata.place_height}}</p>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column is-4">
                                        <h1 class="subtitle">Suitable season:</h1>
                                    </div>
                                    <div class="column">
                                        <span>Best season to visit {{touristPoint.title}}</span>
                                        <p><i class="fa fa-sun-o" aria-hidden="true"></i> {{touristPoint.metadata.suitable_seasons}}</p>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column is-4">
                                        <h1 class="subtitle">Expences:</h1>
                                    </div>
                                    <div class="column">
                                        <span>Avarage Daily bases expences to stay in {{touristPoint.title}}</span>
                                        <p><i class="fa fa-credit-card" aria-hidden="true"></i> {{touristPoint.metadata.expected_expence}}</p>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column is-4">
                                        <h1 class="subtitle">Country:</h1>
                                    </div>
                                    <div class="column">
                                        <span>Situated in {{touristPoint.metadata.country}}</span>
                                        <p><i class="fa fa-map-marker" aria-hidden="true"></i> {{touristPoint.metadata.country}}</p>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column is-4">
                                        <h1 class="subtitle">Transportation:</h1>
                                    </div>
                                    <div class="column">
                                        <span>Means of tranportation available in {{touristPoint.title}} like (self,local etc)</span>
                                        <p> <i class="fa fa-automobile"></i> {{touristPoint.metadata.transportation}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="$emit('close'),resetplaces()"></button>
    </div>
	<section class="container-fluid pading-top">
	</section>
  </div>
</template>
<script>
import EditTouristPoints from '../components/EditTouristPoints.vue'
import {mapGetters} from 'vuex'

export default {
	data(){
		return{
			showModel: false,
		}   
	},
	components: {
		EditTouristPoints,
    },
    computed: {
		...mapGetters([
        'touristPoint' ,
        'currentItem',
    ]),
    getTouristPlaces() {
        return this.$store.getters.getTouristPlaces;
    },
	chunkedPlaces() {
        return _.chunk(this.getTouristPlaces, 3)
        }
    },
    mounted() {
		this.$store.dispatch('getTouristPlaces');
	},
    methods :{
        resetplaces(){
            this.$store.dispatch('setPlaceNull');
        }
    }
}
</script>
<style scoped>
   .modal-content{
       width: 950px;
   }
  .pading-top{
      padding-top: 30px;
      padding-bottom: 30px; 
    }
    .card{
        padding: 10px;
        margin: 20px;
        width: 800px;
    }
    .edit-button {
      border: 1px solid transparent;;
      margin: 2px;
			color:  rgb(84, 62, 145);
      background-color: Transparent;
    }
    .edit-button:hover {
      border-radius: 50%;
      border: 1px solid transparent;
      border-color: blue;
    }
    .delete-button {
		color: rgb(230, 140, 140);
      border: 1px solid transparent;
      margin: 2px;
      background-color: Transparent;
    }
    .delete-button:hover {
      border-radius: 50%;
      border: 1px solid transparent;
      border-color: red;
    }
    .subtitle{
         font-family: " sans-serif";
         color: black;
         font-size: 20px;
    }
    p{
        font-family: "Monospace";
    }
    .fa-automobile{
        padding: 5px;
		color: rgb(170, 7, 7);
    }
    .fa-credit-card{
        padding: 5px;
		color: rgb(198, 231, 8);
    }
    .fa-sun-o{
        padding: 5px;
		color: rgb(242, 144, 16)
    }
    .fa-map-marker{
        padding: 5px;
		color: blue;
    }
    .columns{
        padding: 10px;
    }
    .box-style{
        background-color:#85C1E9 ;
        color: black;
    }
</style>