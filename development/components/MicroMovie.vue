<template>
	<li class="o-micro-movie">
		<div class="o-micro-movie__inner"
			v-if="!isLoading"
			@mouseover="hoverOnMovie()"
			@mouseout="blurOnMovie()"
			:class="{
				'o-micro-movie__inner--is-deleting': movie.bus.remove,
				'o-micro-movie__inner--dark' : outsider,
				'o-micro-movie__inner--light' : minimal
			}"
		>
			<div class="o-micro-movie__movie-box | m-movie-box"
				:class="{
					'o-micro-movie__movie-box--is-deleting': movie.bus.remove,
					'o-micro-movie__movie-box--minimal': minimal
					}"
				>
				<div class="m-movie-box__cover | a-movie-cover">
					<icon-film class="a-movie-cover__back-icon"></icon-film>
					<img class="a-movie-cover__image"
						:src="moviePoster"
						:alt="movie.data.title"
					>
				</div>
				<micro-movie-menu class="o-micro-movie__dropdown"
					v-if="!outsider"
					parent-class="o-micro-movie"
					:movie="movie"
					:hoverState="movie.hoverState"
					:bus="movie.bus"
					:dropdownState="movie.openMenu"
					@toggleMenu="toggleMenu"
					@addToFavourites="addToFavourites"
					@removeFromFavourites="removeFromFavourites"
					@addToWatched="addToWatched"
					@removeFromWatched="removeFromWatched"
					@addToWatchList="addToWatchList"
					@removeFromWatchList="removeFromWatchList"
					@removeMovie="removeMovie">
				</micro-movie-menu>
				<div class="o-micro-movie__rate | m-movie-box__rate | a-rate | a-rate--horiz"
					:class="{
						'm-movie-box__rate--is-visible': movie.hoverState || outsider,
						'm-movie-box__rate--big' : outsider && !minimal,
					}"
				>
					<span class="a-rate__value | a-rate__value--horiz">{{ movie.data.rate.imdb }}</span>
					<span class="a-rate__base | a-rate__base--horiz">10</span>
				</div>
				<micro-userdata class="o-micro-movie__userdata" :movie="movie" v-if="!outsider"></micro-userdata>
			</div>
			<div class="o-micro-movie__information"
				:class="{
						'o-micro-movie__information--in-box' : outsider
					}"
				>
				<h3 class="o-micro-movie__title-holder"
					:class="{
						'o-micro-movie__title-holder--is-deleting': movie.bus.removeMovie,
						'o-micro-movie__title-holder--box' : outsider,
						'o-micro-movie__title-holder--minimal' : minimal,
						'o-micro-movie__title-holder--light-box' : minimal
					}"
				>
					<span class="o-micro-movie__title | u-text-masker">
						{{ movie.data.title }}
					</span>
					<span class="o-micro-movie__year">
						{{ movie.data.year }}
					</span>
				</h3>
				<div class="o-micro-movie__directors | u-text-masker" :class="{'o-micro-movie__directors--is-deleting': movie.bus.remove}">
					<span class="o-micro-movie__director" v-for="director in movie.data.directors" :key="director._id"
						:class="{
							'o-micro-movie__director--box' : outsider,
							'o-micro-movie__director--minimal' : minimal,
						}"
					>
						{{ director.name }}
					</span>
				</div>
				<span class="o-micro-movie__simpleAwards | u-text-masker" v-if="movie.data.simpleAwards && movie.data.simpleAwards!=='N/A' && outsider">
					{{ movie.data.simpleAwards }}
				</span>
				<micro-awards class="o-micro-movie__awards" :awards="movie.data.awards" v-if="!outsider"></micro-awards>
			</div>
		</div>
		<div class="o-micro-movie__loader" v-if="isLoading"
			:class="{
				'o-micro-movie__inner--dark' : outsider,
				'o-micro-movie__inner--light' : minimal
			}"
		>
			<div class="o-micro-movie__movie-box | o-micro-movie__movie-box--minimal | m-movie-box | m-movie-box--is-loading">
				<div class="m-movie-box__cover | a-movie-cover"></div>
				<div class="o-micro-movie__rate | m-movie-box__rate | m-movie-box__rate--is-loading | a-rate | a-rate--horiz">
					<span class="a-rate__value | a-rate__value--horiz">-</span>
					<span class="a-rate__base | a-rate__base--horiz">10</span>
				</div>
			</div>
			<div class="o-micro-movie__information"
				:class="{
						'o-micro-movie__information--in-box' : outsider
					}"
				>
				<h3 class="o-micro-movie__title"
					:class="{
						'o-micro-movie__title--dark-box' : outsider,
						'o-micro-movie__title--minimal' : minimal,
						'o-micro-movie__title--light-box' : minimal
					}"

				>
				</h3>
			</div>
			<div class="m-movie-box__loader | a-loader"></div>
		</div>
	</li>
</template>

<script>
import movieService from '../services/movieService';
import MicroMovieMenu from './MicroMovieMenu.vue';
import MicroAwards from './MicroAwards.vue';
import MicroUserdata from './MicroUserdata.vue';
import IconHeart from './icons/Heart.vue';
import IconWatch from './icons/Watch.vue';
import IconList from './icons/List.vue';
import IconFilm from './icons/Film.vue';

export default {
	name: 'microMovie',
	props: [
		'initialMovie',
		'outsider',
		'minimal',
		'loading'
	],
	data() {
		return {
			movie: this.$_.extend({}, this.movie, this.initialMovie),
			isLoading: this.loading
		};
	},
	computed: {
		moviePoster() {
			if (this.movie.data.images.poster.small) {
				return `/files/poster/${this.movie.data.images.poster.small}`;
			}
			return this.movie.data.images.poster.default;
		}
	},
	components: {
		MicroMovieMenu,
		MicroUserdata,
		MicroAwards,
		IconHeart,
		IconWatch,
		IconList,
		IconFilm
	},

	methods: {
		toggleMenu(menuState) {
			this.movie.openMenu = menuState;
		},
		hoverOnMovie() {
			this.movie.hoverState = true;
		},
		blurOnMovie() {
			this.movie.hoverState = false;
		},
		addToFavourites() {
			this.movie.bus.favourite = true;
			this.$store.dispatch('addMovieToFavourites', this.movie).then((updatedMovie) => {
				this.movie.bus.favourite = false;
				this.movie.favourite = true;
				this.$forceUpdate();
			});
		},
		removeFromFavourites() {
			this.movie.bus.favourite = true;
			this.$store.dispatch('removeMovieFromFavourites', this.movie).then((updatedMovie) => {
				this.movie.bus.favourite = false;
				this.movie.favourite = false;
				this.$forceUpdate();
			});
		},
		addToWatched() {
			this.movie.bus.watched = true;
			this.$store.dispatch('addMovieToWatched', this.movie).then((updatedMovie) => {
				this.movie.bus.watched = false;
				this.movie.watched = true;
				this.$forceUpdate();
			});
		},
		removeFromWatched() {
			this.movie.bus.watched = true;
			this.$store.dispatch('removeMovieFromWatched', this.movie).then((updatedMovie) => {
				this.movie.bus.watched = false;
				this.movie.watched = false;
				this.$forceUpdate();
			});
		},
		addToWatchList() {
			this.movie.bus.watchList = true;
			this.$store.dispatch('addMovieToWatchList', this.movie).then((updatedMovie) => {
				this.movie.bus.watchList = false;
				this.movie.watchList = true;
				this.$forceUpdate();
			});
		},
		removeFromWatchList() {
			this.movie.bus.watchList = true;
			this.$store.dispatch('removeMovieFromWatchList', this.movie).then((updatedMovie) => {
				this.movie.bus.watchList = false;
				this.movie.watchList = false;
				this.$forceUpdate();
			});
		},
		removeMovie(collectionsToo) {
			this.toggleMenu(false);
			this.movie.bus.remove = true;
			this.$store.dispatch('removeMovie', this.movie).then((removedMovie) => {
				this.movie.bus.remove = false;
				this.$forceUpdate();
			});
		}
	},
	watch: {
		initialMovie() {
			this.movie = this.initialMovie;
		},
		loading() {
			this.isLoading = this.loading;
		}
	},
	mounted() {
		if (!this.outsider) {
			const refreshMovie = setInterval(() => {
				if (this.movie.data.loading) {
					movieService.checkForFulfilled(this.movie.data._id).then((movie) => {
						if (movie.fulfilled) {
							this.$store.commit('updateMovieData', movie);
							this.$forceUpdate();
							clearInterval(refreshMovie);
						}
					});
				}
			}, 3000);
		}
	}
};
</script>
