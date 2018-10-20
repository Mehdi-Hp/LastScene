<template>
	<div class="o-search-field">
		<input
			class="o-search-field__input"
			placeholder="Movie Title"
			v-model="searchQuery"
			@keypress.enter="submitSearch"
			autofocus
		>
		<search-result
			class="o-search-field__result"
			v-if="(mutedSearchResult.query && mutedSearchResult.results) || loading"
			:search-result="mutedSearchResult.results"
			:loading="loading"
		></search-result>
		<span
			class="o-search-field__no-result"
			v-if="!mutedSearchResult.results && mutedSearchResult.submitted"
		>
			NO RESULT
		</span>
	</div>
</template>

<script>
import EventBus from '../EventBus';
import SearchResult from './SearchResult.vue';

export default {
	name: 'SearchField',
	components: {
		SearchResult
	},
	props: ['searchResult', 'loading', 'fieldIndex'],
	data() {
		return {
			mutedSearchResult: this.searchResult,
			searchQuery: null,
			index: 0
		};
	},
	watch: {
		searchResult() {
			this.mutedSearchResult = this.searchResult;
			this.searchQuery = this.searchResult.query;
		}
	},
	mounted() {
		if (this.searchResult) {
			this.searchQuery = this.searchResult.query;
		}
		if (this.fieldIndex) {
			this.index = this.fieldIndex;
		}
	},
	methods: {
		submitSearch() {
			EventBus.$emit('searchForMovies', {
				searchQuery: this.searchQuery,
				index: this.index
			});
		}
	}
};
</script>
