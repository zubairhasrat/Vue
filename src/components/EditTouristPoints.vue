<template>
    <div>
        <div class="modal is-active">
            <div class="modal-background"  @click="$emit('close'),resetplaces()"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="field">
                        <h3 class="subtitle is-4">Edit the details of tourist spot</h3>
                    </div>
                    <div class="field" :class="{'has-error': errors.has('title') }">
                        <label class="label">Title</label>
                        <div class="control">
                            <input
                            class="input"
                            type="text" 
                            placeholder="Enter the name of place"
                            v-model="touristPoint.title" 
                            v-validate="'required'" 
                            data-vv-name="title"
                            required>
                        </div>
                        <p class="help is-danger" v-if="errors.has('title')">{{ errors.first('title') }}</p>
                    </div>
                    <div class="field" :class="{'has-error': errors.has('place_description') }">
                        <label class="label">About</label>
                        <div class="control">
                            <textarea class="textarea" 
                            v-model="touristPoint.metadata.place_description"
                            v-validate="'required'" 
                            data-vv-name="place_description"
                            placeholder="Enter sort description about place"
                            required></textarea>
                        </div>
                        <p class="help is-danger" v-if="errors.has('place_description')">{{ errors.first('place_description') }}</p>
                    </div>
                    <div class="field" :class="{'has-error': errors.has('place_height') }">
                        <label class="label">Height from sea level</label>
                        <div class="control">
                            <input class="input" type="number"
                            v-model="touristPoint.metadata.place_height"
                            v-validate="'required|numeric'" 
                            data-vv-name="place_height"
                            placeholder="Enter height"
                            required>
                        </div>
                        <p class="is-danger" v-if="errors.has('place_height')">{{ errors.first('place_height') }}</p>
                    </div>
                    <div class="field" :class="{'has-error': errors.has('suitable_seasons') }">
                        <label class="label">Suitable season</label>
                        <div class="control">
                            <input class="input" type="text"
                            v-model="touristPoint.metadata.suitable_seasons"
                            v-validate="'required'" 
                            data-vv-name="suitable_seasons"
                            placeholder="Enter best season to visit"
                            required>
                        </div>
                        <p class="is-danger" v-if="errors.has('suitable_seasons')">{{ errors.first('suitable_seasons') }}</p>
                    </div>
                    <div class="field" :class="{'has-error': errors.has('expected_expence') }">
                        <label class="label">Avarage expence </label>
                        <div class="control">
                            <input class="input" type="number"
                            v-model="touristPoint.metadata.expected_expence" 
                            v-validate="'required|numeric'" 
                            data-vv-name="expected_expence"
                            placeholder="Enter avarage expence per day to stay there"
                            required>
                        </div>
                        <p class="help is-danger" v-if="errors.has('expected_expence')">{{ errors.first('expected_expence') }}</p>
                    </div>
                    <div class="field" :class="{'has-error': errors.has('transportation') }">
                        <label class="label">Means Of Transport</label>
                        <div class="control">
                            <input class="input" type="text"
                            v-model="touristPoint.metadata.transportation" 
                            v-validate="'required'" 
                            data-vv-name="transportation"
                            placeholder="Enter the means of transport to get there"
                            required>
                        </div>
                        <p class="help is-danger" v-if="errors.has('transportation')">{{ errors.first('transportation') }}</p>
                    </div>
                      <div class="field" :class="{'has-error': errors.has('Country') }">
                    <label class="label">Country</label>
                    <div class="control">
                        <input class="input" type="text"
                        v-model="touristPoint.metadata.country" 
                        v-validate="'required'" 
                        data-vv-name="Country"
                        placeholder="Enter the means of transport to get there"
                        required>
                    </div>
                    <p class="help is-danger" v-if="errors.has('Country')">{{ errors.first('Country') }}</p>
                </div>
                    <div class="file">
                        <img style="height: 25%; width: 25%;"  data-vv-name="image" :src="touristPoint.metadata.place_img1.url.replace(/ /g,'%20')" v-if="!!touristPoint.metadata.place_img1.url" />
                        <div class="control">
                            <form enctype="multipart/form-data" novalidate>
                                <input type="file" @change="onFileChange" accept="image/*" multiple data-vv-name="image" v-validate="'required|mimes:image/*'" required />
                                <div class="input-group fileUploadError">
                                    <div class="input-group__error help is-danger" v-show="errors.has('image')">
                                    {{ errors.first('image') }}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="field">
                        <p>
                            <a class="button is-primary is-rounded model-save" @click="updatePlace(touristPoint)">Save</a>
                        </p>
                    </div>
                </div>
            <button class="modal-close is-large" aria-label="close" @click="$emit('close'),resetplaces()"></button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
		return{
            showModel: false,
		}   
	},
    computed: {
        ...mapGetters([
        'touristPoint',
        'editTouristPoint',
        ]),
        getTouristPlaces() {
            return this.$store.getters.getTouristPlaces;
        }
        ,getEditTouristPlace(){
            return this.$store.getters.getEditTouristPoint;
        }
    },
    methods: {
        onFileChange (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
            this.$store.dispatch('setTouristPlaces', '')
            this.$store.dispatch('setTouristPlacesFile', '')
            return
        }
        var reader = new FileReader()
        reader.onload = (e) => {
            this.$store.dispatch('setTouristPlaces', e.target.result)
            this.$store.dispatch('setTouristPlacesFile', files[0])
        }
        reader.readAsDataURL(files[0])
        },
        updatePlace (touristPoint) {
            this.$validator.validateAll().then(res => {
                if(res){
                    this.$store.dispatch('editTouristPlace', touristPoint)
                    this.$emit('close')
                }
            })
        },
        resetplaces(){
            this.$store.dispatch('setPlaceNull');
        }
    }
}
</script>
<style lang="css" scoped>
   .model-save{
      margin-top: 20px;
      margin-left: 200px;
      padding: 0 25px;
  }
</style>
