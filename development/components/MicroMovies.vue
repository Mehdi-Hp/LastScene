<template>
	<section class="l-micro-movies">
		<div class="o-micro-movie" v-for="movie in movies" :key="movie.key" @mouseover="hoverOnMovie(movie)" @mouseout="blurOnMovie(movie)">
			<div class="o-micro-movie__movie-box | m-movie-box">
				<div class="a-movie-cover">
					<img class="a-movie-cover__image" v-if="movie.data.images.poster" :src="movie.data.images.poster.small" :alt="movie.data.title">
				</div>
				<the-menu class="m-movie-box__menu"></the-menu>
				<div class="o-micro-movie__rate | m-movie-box__rate | a-rate | a-rate--horiz" :class="{ 'm-movie-box__rate--is-visible': movie.hovered }">
					<span class="a-rate__value | a-rate__value--horiz">{{ movie.data.rate.imdb }}</span>
					<span class="a-rate__base | a-rate__base--horiz">10</span>
				</div>
			</div>
			<div class="o-micro-movie__information">
				<h3 class="o-micro-movie__name">{{ movie.data.title }}</h3>
				<div class="o-micro-movie__directors">
					<h4 class="o-micro-movie__director" v-for="director in movie.data.directors" :key="director.key">
						{{ director.name }}
					</h4>
				</div>
			</div>
			<div class="o-micro-movie__traits">
				<div class="o-micro-movie__awards | m-micro-awards">
					hey
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import TheMenu from './TheMenu.vue';
import '../assets/notcss/04_layout/l-micro-movies.scss';
import '../assets/notcss/02_molecule/m-movie-box.scss';

export default {
	name: 'microMovies',
	data() {
		return {

		};
	},
	computed: {
		rateColor() {
			return {
				color: this.$invertColor('red')
			};
		}
	},
	methods: {
		hoverOnMovie(movie) {
			movie.hovered = true;
			this.$forceUpdate();
		},
		blurOnMovie(movie) {
			movie.hovered = false;
			this.$forceUpdate();
		}
	},
	components: {
		TheMenu
	},
	props: [
		'movies'
	]
};
</script>
