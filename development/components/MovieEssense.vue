<template>
	<div class="l-movie__essense | o-movie-essense">
		<div class="o-movie-essense__cover-holder">
			<div class="o-movie-essense__cover">
				<div :to="`/movies/${movie.data._id}`" class="m-movie-box__cover | a-movie-cover">
					<icon-film class="a-movie-cover__back-icon"></icon-film>
					<img class="a-movie-cover__image"
						:src="`/files/poster/${movie.data.images.poster.medium}`"
						:alt="movie.data.title"
					>
				</div>
			</div>
			<div class="o-movie-essense__local-seat-holder">
				<div class="o-movie-essense__local-seat">
					<div class="o-movie-essense__local-seat-title">
						Favourites
					</div>
					<div class="o-movie-essense__local-seat-value">
						9264
					</div>
				</div>
				<div class="o-movie-essense__local-seat">
					<div class="o-movie-essense__local-seat-title">
						In collection
					</div>
					<div class="o-movie-essense__local-seat-value">
						72
					</div>
				</div>
				<div class="o-movie-essense__local-seat">
					<div class="o-movie-essense__local-seat-title">
						Notes
					</div>
					<div class="o-movie-essense__local-seat-value">
						17
					</div>
				</div>
			</div>
		</div>
		<div class="o-movie-essense__summary">
			<div class="o-movie-essense__information">
				<h2 class="o-movie-essense__title | u-text-masker">
					{{ movie.data.title }}
				</h2>
				<div class="o-movie-essense__online-seat">
					<div class="o-movie-essense__rate | a-rate">
						<span class="o-movie-essense__rate-value | a-rate__value">{{ movie.data.rate.imdb }}</span>
						<span class="o-movie-essense__rate-base | a-rate__base">10</span>
					</div>
					<micro-awards class="o-movie-essense__awards" :awards="movie.data.awards"></micro-awards>
				</div>
			</div>
			<div class="o-movie-essense__collections">
				<icon-archive class="o-movie-essense__collections-icon"></icon-archive>
				<span class="o-movie-essense__collections-text">In</span>
				<span class="o-movie-essense__collections-name">Best of someone</span>
				<span class="o-movie-essense__collections-text">and</span>
				<span class="o-movie-essense__collections-name">more...</span>
			</div>
			<div class="o-movie-essense__state">
				<button class="o-movie-essense__state-button | a-button | a-button--plain">
					<icon-watch class="o-movie-essense__state-icon | o-movie-essense__state-icon--watch"></icon-watch>
					Mark as watched
				</button>
				<button class="o-movie-essense__state-button | a-button | a-button--plain">
					<icon-list class="o-movie-essense__state-icon | o-movie-essense__state-icon--list"></icon-list>
					Add to watch list
				</button>
			</div>
		</div>
		<div class="o-movie-essense__extra">
			<div class="o-movie-essense__tools">
				<dropdown
					class="o-movie-essense__dropdown"
					parent-class="o-movie-essense"
					icon-name="iconMenu"
				>
					<ul>
						<li>Add/Remove from collections</li>
						<li>Update movie data</li>
					</ul>
				</dropdown>
				<touch-ripple class="o-movie-essense__favourite-button-holder" :speed="2" :opacity="0.5" color="#cb5451" transition="ease-in-out">
					<button class="o-movie-essense__favourite-button"
						:class="{
							'o-movie-essense__favourite-button--is-true': movie.favourite
						}"
						@click="toggleFavourite()"
					>
						<icon-heart class="o-movie-essense__favourite-icon"
							:class="{
								'o-movie-essense__favourite-icon--is-pending': movie.bus.favourite,
								'o-movie-essense__favourite-icon--is-true': movie.favourite
							}"
							:isPending="movie.bus.favourite"
						></icon-heart>
					</button>
				</touch-ripple>
			</div>
			<div class="o-movie-essense__favourite-of-holder">

			</div>
		</div>
	</div>
</template>

<script>
import { touchRipple } from 'vue-touch-ripple';
import Back from './Back.vue';
import Dropdown from './Dropdown.vue';
import MicroAwards from './MicroAwards.vue';
import IconFilm from './icons/Film.vue';
import IconWatch from './icons/Watch.vue';
import IconList from './icons/List.vue';
import IconMenu from './icons/Menu.vue';
import IconHeart from './icons/Heart.vue';
import IconArchive from './icons/Archive.vue';

export default {
	name: 'MovieEssense',
	props: [
		'movie'
	],
	data() {
		return {

		};
	},
	computed: {

	},
	components: {
		Back,
		touchRipple,
		Dropdown,
		MicroAwards,
		IconFilm,
		IconWatch,
		IconList,
		IconMenu,
		IconHeart,
		IconArchive
	},
	methods: {
		toggleFavourite() {
			this.$emit('toggleFavourite', this.movie);
		}
	}
};
</script>
