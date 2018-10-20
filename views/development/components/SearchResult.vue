<template>
	<div class="o-search-result">
		<div class="o-search-result__first">
			<div class="o-search-result__item">
				<micro-movie class="o-search-result__movie"
					:initial-movie="firstResult"
					outsider="true"
					:loading="loading">
				</micro-movie>
				<touch-ripple :speed="2" :opacity="0.1" color="#fff" transition="ease-in-out">
					<button class="o-search-result__add | m-add-to-archive-button | a-button"
						v-if="searchResult.length && !loading"
						:class="{
							'm-add-to-archive-button--is-disabled' : firstResult.inArchive,
							'm-add-to-archive-button--is-adding': firstResult.bus.isAdding,
							'm-add-to-archive-button--is-archived': firstResult.inArchive
						}"
						@click="addToArchive(firstResult)"
					>
						<div class="m-add-to-archive-button__layer"
							:class="{
								'm-add-to-archive-button__layer--is-disabled' : firstResult.inArchive,
								'm-add-to-archive-button__layer--is-adding': firstResult.bus.isAdding
							}">
						</div>
						<icon-film
							class="m-add-to-archive-button__icon"
							:class="{
								'm-add-to-archive-button__icon--is-adding': firstResult.bus.isAdding
							}">
						</icon-film>
						<span
							class="m-add-to-archive-button__text"
							:class="{
								'm-add-to-archive-button__text--is-adding': firstResult.bus.isAdding
							}"
						>
							{{ (firstResult.inArchive) ? 'Movie exists' : 'Add to archive' }}
						</span>
					</button>
				</touch-ripple>
			</div>
		</div>
		<div class="o-search-result__others-holder" v-if="chunkedMovies.length || loading">
			<div class="o-search-result__navigation | o-search-result__navigation--left"
				@click="previousPage()"
			>
				<icon-arrow-left class="o-search-result__arrow | o-search-result__arrow--left"></icon-arrow-left>
			</div>
			<ul class="o-search-result__others">
				<div class="o-search-result__item | o-search-result__item--small"
					v-for="(movie, movieIndex) in chunkedMovies[chunkedMoviesCurrentPage] || 4" :key="movieIndex"
				>
					<micro-movie class="o-search-result__movie"
						:initial-movie="movie"
						outsider="true"
						minimal="true"
						:loading="loading"
					></micro-movie>
					<touch-ripple :speed="2" :opacity="0.1" color="#000" transition="ease-in-out">
						<button class="o-search-result__add | o-search-result__add--plain | m-add-to-archive-button | m-add-to-archive-button--plain | a-button"
							v-if="searchResult.length && !loading"
							:class="{
								'm-add-to-archive-button--is-disabled' : movie.inArchive
							}"
							@click="addToArchive(movie)"
						>{{ (movie.inArchive) ? 'Movie exists' : 'Add to archive' }}</button>
					</touch-ripple>
				</div>
			</ul>
			<div class="o-search-result__navigation | o-search-result__navigation--right"
				@click="nextPage()"
			>
				<icon-arrow-right class="o-search-result__arrow | o-search-result__arrow--right"></icon-arrow-right>
			</div>
		</div>
	</div>
</template>

<script>
import { touchRipple } from 'vue-touch-ripple';
import MicroMovie from './MicroMovie.vue';
import IconArrowLeft from './icons/ArrowLeft.vue';
import IconArrowRight from './icons/ArrowRight.vue';
import IconFilm from './icons/Film.vue';

export default {
	name: 'SearchResult',
	props: [
		'searchResult',
		'loading'
	],
	data() {
		return {
			addButtonText: 'Add to archive',
			chunkedMoviesCurrentPage: 0
		};
	},
	computed: {
		firstResult() {
			return this.$_.head(this.searchResult);
		},
		chunkedMovies() {
			return this.$_.chunk(this.$_.tail(this.searchResult), 4);
		},
		chunkedMoviesTotalPages() {
			return this.chunkedMovies.length;
		}
	},
	components: {
		MicroMovie,
		IconArrowLeft,
		IconArrowRight,
		IconFilm,
		touchRipple
	},
	methods: {
		addToArchive(movie) {
			movie.bus.isAdding = true;
			this.$forceUpdate();
			this.$store.dispatch('addMovie', {
				imdbID: movie.data.id.imdb,
				movieName: movie.data.id.title
			})
				.then(() => {
					movie.bus.isAdding = false;
					movie.inArchive = true;
					this.addButtonText = 'Movie added';
					this.$forceUpdate();
				})
				.catch((error) => {
					throw new Error(error);
				});
		},
		nextPage() {
			if (this.chunkedMoviesCurrentPage < this.chunkedMoviesTotalPages - 1) {
				this.chunkedMoviesCurrentPage += 1;
			}
		},
		previousPage() {
			if (this.chunkedMoviesCurrentPage > 0) {
				this.chunkedMoviesCurrentPage -= 1;
			}
		}
	}
};
</script>
