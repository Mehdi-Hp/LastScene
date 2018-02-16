<template>
	<div class="o-search-field">
		<input
			class="o-search-field__input"
			placeholder="Movie Title"
			v-model="searchQuery"
			@keypress.enter="submitSearch"
			autofocus
		>
		<search-result class="o-search-field__result"
			v-if="searchResult || loading"
			:searchResult="searchResult.results"
			:loading="loading"
		></search-result>
	</div>
</template>

<script>
import EventBus from '../EventBus';
import SearchResult from './SearchResult.vue';

export default {
	name: 'SearchField',
	props: [
		'searchResult',
		'loading',
		'fieldIndex'
	],
	data() {
		return {
			searchQuery: null,
			index: 0
		};
	},
	components: {
		SearchResult
	},
	methods: {
		submitSearch() {
			EventBus.$emit('searchForMovies', {
				searchQuery: this.searchQuery,
				index: this.index
			});
		}
	},
	mounted() {
		if (this.searchResult) {
			this.searchQuery = this.searchResult.query;
		}
		if (this.fieldIndex) {
			this.index = this.fieldIndex;
		}
	}
};
</script>
