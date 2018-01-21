<template>
	<div class="o-micro-movie" :class="{
		'o-micro-movie--is-deleting': movie.bus.remove
		}" @mouseover="hoverOnMovie()" @mouseout="blurOnMovie()">
		<div class="o-micro-movie__movie-box | m-movie-box" :class="{ 'o-micro-movie__movie-box--is-deleting': movie.bus.remove }">
			<div class="m-movie-box__cover | a-movie-cover">
				<img class="a-movie-cover__image" v-if="movie.data.images.poster" :src="movie.data.images.poster.small" :alt="movie.data.title">
			</div>
			<the-menu class="o-micro-movie__menu | m-movie-box__menu" :movie="movie" :hovered="movie.hovered" :bus="movie.bus" :is-open="movie.openMenu"
				@toggleMenu="toggleMenu"
				@addToFavourites="addToFavourites"
				@removeFromFavourites="removeFromFavourites"
				@addToWatched="addToWatched"
				@removeFromWatched="removeFromWatched"
				@addToWatchList="addToWatchList"
				@removeFromWatchList="removeFromWatchList"
				@removeMovie="removeMovie">
			</the-menu>
			<div class="o-micro-movie__rate | m-movie-box__rate | a-rate | a-rate--horiz" :class="{ 'm-movie-box__rate--is-visible': movie.hovered }">
				<span class="a-rate__value | a-rate__value--horiz">{{ movie.data.rate.imdb }}</span>
				<span class="a-rate__base | a-rate__base--horiz">10</span>
			</div>
		</div>
		<div class="o-micro-movie__information">
			<h3 class="o-micro-movie__title" :class="{ 'o-micro-movie__title--is-deleting': movie.bus.remove }">
				{{ movie.data.title }}
			</h3>
			<div class="o-micro-movie__directors" :class="{'o-micro-movie__directors--is-deleting': movie.bus.remove}">
				<h4 class="o-micro-movie__director" v-for="director in movie.data.directors" :key="director._id">
					{{ director.name }}
				</h4>
			</div>
		</div>
		<micro-awards class="o-micro-movie__awards" :awards="movie.data.awards"></micro-awards>
	</div>
</template>

<script>
import TheMenu from './TheMenu.vue';
import MicroAwards from './MicroAwards.vue';

export default {
	name: 'microMovie',
	props: [
		'initialMovie'
	],
	data() {
		return {
			movie: this.$_.extend({}, this.movie, this.initialMovie)
		};
	},
	computed: {

	},
	components: {
		TheMenu,
		MicroAwards
	},

	methods: {
		hoverOnMovie() {
			this.movie.hovered = true;
		},
		blurOnMovie() {
			this.movie.hovered = false;
		},
		toggleMenu(forceState) {
			if (typeof forceState !== 'undefined') {
				this.movie.openMenu = forceState;
			} else {
				this.movie.openMenu = !this.movie.openMenu;
			}
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
	}
};
</script>
