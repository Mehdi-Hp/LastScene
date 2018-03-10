<template>
	<div class="o-movie-information">
		<div class="o-movie-information__section">
			<div class="o-movie-information__content">
				<div class="o-movie-information__pair" v-for="(informationValue, informationKey) in information" :key="informationKey">
					<h3 class="o-movie-information__key">
						{{ informationKey }}
					</h3>
					<span class="o-movie-information__value">
						{{ informationValue }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MovieInformation',
	props: [
		'movie'
	],
	data() {
		return {
			information: {
				Directors: this.movie.data.directors.map((director) => {
					return director.name;
				}).join(', '),
				Year: this.movie.data.year,
				Writers: this.movie.data.writers.map((writer) => {
					return writer.name;
				}).join(', '),
				Genres: this.movie.data.genres.join(', '),
				Runtime: this.movie.data.runtime,
				Plot: this.movie.data.plot.full,
				Languages: this.movie.data.languages.join(', '),
				'IMDB Rate': this.movie.data.rate.imdb,
				Metascore: this.movie.data.rate.metascore
			}
		};
	},
	computed: {

	},
	components: {

	}
};
</script>
