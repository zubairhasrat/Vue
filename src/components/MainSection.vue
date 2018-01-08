<template>
	<div>
		<section class="container pading-top">
			<div class="panel">
				<div class="panel-block">
					<p class="control has-icons-left">
						<input class="input is-medium style" type="text" v-model="search" placeholder="search place">
						<span class="icon is-small is-left">
							<i class="fa fa-search"></i>
						</span>
					</p>
				</div>
			</div>
				<div v-if="status.loading" class="has-text-centered">
				<img src="../assets/loder2.gif" alt="Loading">
			</div>
				<div class="columns"  v-for="places in filteredPlaces" :key="places.id">
					<div class="column is-4" v-for="item in places" :key="item._id">
						<EditTouristPoints v-if="showEditModel" @close="showEditModel = false" :item='item'></EditTouristPoints>
						<DetailAboutPlace v-if="showModel" @close="showModel = false" :item='item'></DetailAboutPlace>
							<div class="card" >
								<header class="card-header">
									<p class="card-header-title">
										{{item.title}}
									</p>
								</header>
									<div class="card-image" @click="showModel=true,loadMore(item)">
										<figure class="image is-4by3">
											<img :src="item.metadata.place_img1.url" alt="Placeholder image" >
										</figure>
									</div>
									<div class="card-content ">
										<article class="media">
											<table class="table is-narrow">
												<tr>
													<td class="subtitle">Hight:</td>
													<td class="has-text-right">
														<i class="fa fa-map-marker" aria-hidden="true"></i>
														{{item.metadata.place_height}}
													</td>
												</tr>
												<tr>
													<td class="subtitle">Expences:</td>
													<td class="has-text-right">
														<i class="fa fa-credit-card" aria-hidden="true"></i>
														{{item.metadata.expected_expence}}
													</td>
												</tr>
												<tr>
													<td class="subtitle">Suitable season:</td>
													<td class="has-text-right">
														<i class="fa fa-sun-o" aria-hidden="true"></i>
														{{item.metadata.suitable_seasons}}
													</td>
												</tr>
											</table>
										</article>
									</div>
										<footer class="card-footer">
										<p class="card-footer-item">
											<a class="button edit-button" @click="showEditModel = true,editPlace(item)">
												<span class="icon is-small is-info">
													<i class="fa fa-edit  fa-2x"></i>
												</span>
											</a>
										</p>
										<p class="card-footer-item">
											<a v-if="status.success" class="button delete-button" @click="deletePlace(item)">
												<span class="icon is-small is-danger">
													<i class="fa fa-trash fa-2x"></i>
												</span>
											</a>
											<a v-else class="button is-loading delete-button" @click="deletePlace(item)">
												<span class="icon is-small is-danger">
													<i class="fa fa-trash fa-2x"></i>
												</span>
											</a>
										</p>
									</footer>
							</div>
					</div>
				</div>
				<div v-if="totalPages() > 0" class="has-text-centered custom">
					<span v-if="showPreviousLink()" class="pagination-btn" v-on:click="updatePage(currentPage - 1)"> <i class="fa fa-arrow-circle-left" aria-hidden="true"></i> </span>
					{{ currentPage + 1 }} of {{ totalPages() }}
					<span v-if="showNextLink()" class="pagination-btn" v-on:click="updatePage(currentPage + 1)"> <i class="fa fa-arrow-circle-right" aria-hidden="true"></i> </span>
				</div>
		</section>
	</div>
</template>
<script>
import EditTouristPoints from '../components/EditTouristPoints.vue'
import DetailAboutPlace from '../components/more.vue'
import {mapGetters} from 'vuex'
export default {
	data(){
		return{
			showModel: false,
			showEditModel : false,
			search : '',
			currentPage: 0,
			pageSize: 6,
			arrayLength : 0,
		}   
	},
	components: {
		EditTouristPoints,
		DetailAboutPlace
  	},
	computed: {
		...mapGetters([
		'touristPoint',
		'status',
		'isPresent'
		]),
    	getTouristPlaces() {
      		return this.$store.getters.getTouristPlaces;
		},
		visiblePlace(){
			return this.visiblePlaces
		},
		filteredPlaces(){
			var array = this.getTouristPlaces.filter((place) => {
				return (place.metadata.country.match(this.search)) || (place.metadata.place_description.match(this.search))
			})
			this.arrayLength = array.length;
			array = array.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
			if (this.getTouristPlaces.length == 0 && this.currentPage > 0) {
				this.updatePage(this.currentPage -1);
			}
			
			return _.chunk(array,3)
		}
  	},
		created() {
			this.$store.dispatch('getTouristPlaces');
		},
	methods: {
		editPlace(place){
			this.$store.dispatch('setEditPlace',place)
		},
		loadMore(place){
			this.$store.dispatch('loadMorePlaceDetail',place);
		},
		deletePlace(id){
			this.$store.dispatch('deletePlace',id);
		},
		updatePage(pageNumber) {
			this.currentPage = pageNumber;
		},
		totalPages() {
			return Math.ceil(this.arrayLength / this.pageSize);
		},
		showPreviousLink() {
			return this.currentPage == 0 ? false : true;
		},
		showNextLink() {
			return this.currentPage == (this.totalPages() - 1) ? false : true;
		}
	}
}
</script>
<style scoped>
	.card{
		height: 100%;
		margin-top: 10px;
		border-radius: 1p solid rgba(192, 191, 191, 0.658);
	}
	.card:hover {
		-webkit-box-shadow: 0px 0px 15px 5px rgba(0, 185, 233, .75);
		box-shadow: 0px 0px 15px 5px rgba(0, 185, 233, .75);
		-webkit-transition: all 0.7s ease;
		transition: all 0.7s ease;
	}
	.card-footer{
		height: 40px;
	}
	.fa-map-marker{
		padding: 5px;
		color: blue;
	}
	.fa-credit-card{
		padding: 5px;
		color: aquamarine;
	}
	.fa-sun-o{
		padding: 5px;
		color: rgb(242, 144, 16)
	}
	img {
   padding:1px;
   border:1px solid #fbfcfd;
	}
	img:hover {
		cursor: pointer;
	}
  .pading-top{
		padding-top: 30px;
		padding-bottom: 30px; 
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
	table{
		border: 0px solid white ;
		height: 20px;
		width: 100%;
		margin-bottom: 0%;
	}
	table td {
		border: 0px white;
		margin-right: 0%;
		margin-left: 30px;
	}
	.pagination-btn {
		cursor: pointer;
	}
	.fa-arrow-circle-left, .fa-arrow-circle-right{
		color:rgb(109, 123, 243);
		font-size: 30px;
		padding: 10px;
	}
	.custom{
		padding: 10 5 5 px;
		color: rgb(109, 123, 243);;
		font-size: 20px;
		 text-shadow: 1px 1px #1a0b0b;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
	}
	.style{
		border-radius: 20px;
	}
	.panel-block{
		border-radius: 20px;
		padding: 0%;
	}
	.panel-block:hover{
		background-color: #ecf3f9;
		-webkit-box-shadow: 0px 0px 15px 5px rgba(0, 185, 233, .75);
		box-shadow: 0px 0px 15px 5px rgba(0, 185, 233, .75);
		-webkit-transition: all 0.7s ease;
		transition: all 0.7s ease;
	}
</style>