<template>
	<div class="o-search-result">
		<div class="o-search-result__first">
			<div class="o-search-result__item">
				<micro-movie class="o-search-result__movie"
					:initial-movie="firstResult"
					outsider="true"
					:loading="loading"
				 ></micro-movie>
				<button class="o-search-result__add | a-button"
					v-if="searchResult.length && !loading"
					:class="{
						'o-search-result__add--is-disabled' : firstResult.inArchive
					}"
					@click="addToArchive(firstResult.data.id.imdb, firstResult.data.title)"
				>{{ (firstResult.inArchive) ? 'Already there' : 'Add to archive' }}</button>
			</div>
		</div>
		<div class="o-search-result__others-holder">
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
					<button class="o-search-result__add | o-search-result__add--plain | a-button"
					v-if="searchResult.length && !loading"
						:class="{
							'o-search-result__add--is-disabled' : movie.inArchive
						}"
						@click="addToArchive(movie.data.id.imdb, movie.data.title)"
					>{{ (movie.inArchive) ? 'Already there' : 'Add to archive' }}</button>
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
import movieService from '../services/movieService';
import MicroMovie from './MicroMovie.vue';
import IconArrowLeft from './icons/ArrowLeft.vue';
import IconArrowRight from './icons/ArrowRight.vue';

export default {
	name: 'SearchResult',
	props: [
		'searchResult',
		'loading'
	],
	data() {
		return {
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
		IconArrowRight
	},
	methods: {
		addToArchive(imdbID, movieName) {
			this.$store.dispatch('addMovie', { imdbID, movieName });
		},
		nextPage() {
			if (this.chunkedMoviesCurrentPage < this.chunkedMoviesTotalPages - 1) {
				this.chunkedMoviesCurrentPage++;
			}
		},
		previousPage() {
			if (this.chunkedMoviesCurrentPage > 0) {
				this.chunkedMoviesCurrentPage--;
			}
		}
	}
};
</script>
