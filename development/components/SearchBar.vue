<template>
	<div class="o-searchbar">
		<div class="o-searchbar__holder">
			<icon-search class="o-searchbar__search-icon"></icon-search>
			<div class="o-searchbar__textfield">
				<input
					type="text"
					class="o-searchbar__input"
					name="searchQuery"
					placeholder="Search for Movies, Directors or Awards"
					autocomplete="off"
					v-model="searchQuery"
					@keyup="search">
			</div>
		</div>
	</div>
</template>

<script>
import _ from 'lodash';
import IconSearch from '../components/icons/Search.vue';

export default {
	name: 'SearchBar',
	components: {
		IconSearch
	},
	data() {
		return {
			searchQuery: ''
		};
	},
	methods: {
		search: _.debounce(function() {
			this.$emit('search', this.searchQuery);
		}, 500)
	}
};
</script>
