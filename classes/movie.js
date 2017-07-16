module.exports = class Movie {
	constructor(information) {
		this.title = information.title;
		this.originalTitle = information.originalTitle;
		this.id = {
			tmdb: information.id.tmdb,
			imdb: information.id.imdb
		};
		this.url = {
			imdb: information.url.imdb
		};
		this.year = information.year;
		this.rate = {
			imdb: information.rate.imdb,
			metascore: information.rate.metascore
		};
		this.runtime = information.runtime;
		this.plot = {
			simple: information.plot.simple,
			full: information.plot.full
		};
		this.images = {
			poster: {
				tmdb: information.images.poster.tmdb,
				myapifilms: information.images.poster.myapifilms
			},
			backdrop: {
				tmdb: information.images.backdrop.tmdb
			}
		};
		this.trailer = information.trailer;
		this.languages = information.languages;
		this.genres = information.genres;
		this.directors = [];
		information.directors.forEach((director) => {
			this.directors.push({
				name: director.name,
				id: director.id
			});
		});
		this.writers = [];
		information.writers.forEach((writer) => {
			this.writers.push({
				name: writer.name,
				id: writer.id
			});
		});
		this.actors = [];
		information.actors.forEach((actor) => {
			this.actors.push({
				name: actor.name,
				id: actor.id,
				profile: actor.profile,
				character: actor.character,
				photo: actor.photo
			});
		});
		this.awards = information.awards.map((currentAward) => {
			const outcomes = currentAward.outcomes.map((currentOutcome) => {
				const categories = currentOutcome.categories.map((currentCategory) => {
					const names = currentCategory.by.map((currentName) => {
						return {
							name: currentName.name,
							id: currentName.id
						};
					});
					return {
						name: currentCategory.for,
						by: names
					};
				});
				return {
					name: currentOutcome.name,
					categories
				};
			});
			return {
				name: currentAward.name,
				outcomes
			};
		});
	}
};
