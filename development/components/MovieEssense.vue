<template>
	<div class="l-movie__essense | o-movie-essense">
		<div class="o-movie-essense__cover-holder">
			<div class="o-movie-essense__cover">
				<div :to="`/movies/${movie.data._id}`" class="m-movie-box__cover | a-movie-cover">
					<icon-film class="a-movie-cover__back-icon"></icon-film>
					<img class="a-movie-cover__image"
						:src="`/files/poster/${movie.data.images.poster}?width=350`"
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
				<touch-ripple class="o-movie-essense__state-button-holder" :speed="3" :opacity="0.2" color="#4c4554" transition="ease-in-out">
					<button
						class="o-movie-essense__state-button | o-movie-essense__state-button--catchy | a-button | a-button--plain"
						:class="{
							'o-movie-essense__state-button--is-true': movie.watched,
							'o-movie-essense__state-button--is-pending': movie.bus.watched
						}"
						@click="toggleWatched"
					>
						<icon-eye
							class="o-movie-essense__state-icon | o-movie-essense__state-icon--watch"
							:class="{
								'o-movie-essense__state-icon--is-pending': movie.bus.watched,
								'o-movie-essense__state-icon--is-true': movie.watched
							}"
							:is-pending="movie.bus.watched"
							:is-done="movie.watched"
						></icon-eye>
						{{ (!movie.watched) ? 'Mark as watched' : 'Already watched' }}
					</button>
				</touch-ripple>
				<touch-ripple class="o-movie-essense__state-button-holder" :speed="3" :opacity="0.2" color="#fff" transition="ease-in-out">
					<button
						class="o-movie-essense__state-button | a-button | a-button--plain"
						:class="{
							'o-movie-essense__state-button--is-true': movie.watchList,
							'o-movie-essense__state-button--is-pending': movie.bus.watchList
						}"
						@click="toggleWatchList"
					>
						<icon-flag
							class="o-movie-essense__state-icon | o-movie-essense__state-icon--flag"
							:class="{
								'o-movie-essense__state-icon--is-pending': movie.bus.watchList,
								'o-movie-essense__state-icon--is-true': movie.watchList
							}"
							:is-pending="movie.bus.watchList"
							:is-done="movie.watchList"
						></icon-flag>
						{{ (!movie.watchList) ? 'Add to watch list' : 'Remove from watch list' }}
					</button>
				</touch-ripple>
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
						<li @click="updateMovie">Update movie data</li>
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
							:is-pending="movie.bus.favourite"
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
import IconEye from './icons/Eye.vue';
import IconMenu from './icons/Menu.vue';
import IconHeart from './icons/Heart.vue';
import IconArchive from './icons/Archive.vue';
import IconFlag from './icons/Flag.vue';

export default {
	name: 'MovieEssense',
	components: {
		Back,
		touchRipple,
		Dropdown,
		MicroAwards,
		IconFilm,
		IconEye,
		IconMenu,
		IconHeart,
		IconArchive,
		IconFlag
	},
	props: ['movie'],
	data() {
		return {

		};
	},
	computed: {

	},
	methods: {
		toggleFavourite() {
			this.$emit('toggleFavourite', this.movie);
		},
		toggleWatched() {
			this.$emit('toggleWatched', this.movie);
		},
		toggleWatchList() {
			this.$emit('toggleWatchList', this.movie);
		},
		updateMovie() {
			this.$store.dispatch('updateMovie', this.movie.data._id);
		}
	}
};
</script>
