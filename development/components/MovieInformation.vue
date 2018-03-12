<template>
	<div class="o-movie-information">
		<div class="o-movie-information__section">
			<div class="o-movie-information__content | o-movie-information__content--information">
				<div class="o-movie-information__pair | o-movie-information__pair--boxy"
					v-for="(informationValue, informationKey) in information" :key="informationKey"
				>
					<h3 class="o-movie-information__key">
						{{ informationKey }}
					</h3>
					<span class="o-movie-information__value">
						{{ informationValue }}
					</span>
				</div>
			</div>
		</div>

		<div class="o-movie-information__section">
			<h3 class="o-movie-information__title">Cast</h3>
			<div class="o-movie-information__content | o-movie-information__content--cast">
				<div class="o-movie-information__pair"
					:class="{
						'o-movie-information__pair--boxy': actorIndex < 3,
						'o-movie-information__pair--colorfull-1': actorIndex < 3,
						'o-movie-information__pair--plain': actorIndex > 2
					}"
					v-for="(actor, actorIndex) in movie.data.actors" :key="actor.name"
				>
					<h3 class="o-movie-information__value">
						{{ actor.name }}
					</h3>
					<span class="o-movie-information__key | o-movie-information__key--colorful-1">
						{{ actor.character || '―' }}
					</span>
				</div>
			</div>
		</div>

		<div class="o-movie-information__section">
			<h3 class="o-movie-information__title">Awards</h3>
			<div class="o-movie-information__content | o-movie-information__content--important-awards" v-if="awards.important.length">
				<div class="o-movie-information__award-holder" v-for="award in awards.important" :key="award.name">
					<component :is="getAwardIcon(award.name)"
						class="o-movie-information__award-icon"
						:class="{
							'o-movie-information__award-icon--won': $_.find(award.categories, { result: 'won' })
						}"
					>
					</component>
					<div class="o-movie-information__awards-inner">
						<h3 class="o-movie-information__award-name">
							{{ award.name }} {{ award.year }}
						</h3>
						<div class="o-movie-information__awards" v-for="awardCategory in award.categories" :key="awardCategory.title">
							<div class="o-movie-information__pair | o-movie-information__pair--boxy"
								:class="{
									'o-movie-information__pair--colorfull-2': $_.find(award.categories, { result: 'won' })
								}">
								<h4 class="o-movie-information__key | o-movie-information__key--bold">
									{{ awardCategory.result }}
								</h4>
								<span class="o-movie-information__value | o-movie-information__value--colorfull-1 | o-movie-information__value--light">
									{{ awardCategory.title }}
									<span class="o-movie-information__value | o-movie-information__value--colorfull-2 | o-movie-information__value--light"
										v-if="awardCategory.participants.length"
									>
										By {{ $_.map(awardCategory.participants, 'name').join(' and ') }}
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="o-movie-information__content | o-movie-information__content--normal-awards" v-if="awards.normal.length">
				<div class="o-movie-information__award-holder | o-movie-information__award-holder--normal" v-for="award in awards.normal" :key="award.name">
					<div class="o-movie-information__awards-inner">
						<h3 class="o-movie-information__key">
							{{ award.name }} {{ award.year }}
						</h3>
						<div class="o-movie-information__awards | o-movie-information__awards--normal" v-for="awardCategory in award.categories" :key="awardCategory.title">
							<div class="o-movie-information__pair">
								<span class="o-movie-information__value">
									{{ awardCategory.result }}
									{{ (awardCategory.result === 'won') ? 'the' : 'for' }}
									{{ awardCategory.title }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import IconOscar from './icons/Oscar.vue';
import IconGoldenGlobe from './icons/GoldenGlobe.vue';
import IconCannes from './icons/Cannes.vue';
import IconBafta from './icons/Bafta.vue';
import IconGoldenBear from './icons/GoldenBear.vue';

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
				}).join(', ') || '―',
				Year: this.movie.data.year || '―',
				Writers: this.movie.data.writers.map((writer) => {
					return writer.name;
				}).join(', ') || '―',
				'IMDB Rate': this.movie.data.rate.imdb || '―',
				Metascore: this.movie.data.rate.metascore || '―',
				Genres: this.movie.data.genres.join(', ') || '―',
				Runtime: this.movie.data.runtime || '―',
				Plot: this.movie.data.plot.full || '―',
				Languages: this.movie.data.languages.join(', ') || '―',
				Countries: this.movie.data.countries.join(', ') || '―'
			}
		};
	},
	computed: {
		awards() {
			const awards = {
				important: [],
				normal: []
			};
			this.movie.data.awards.forEach((award) => {
				if (['Academy Awards', 'Golden Globes', 'BAFTA Awards', 'Cannes'].includes(award.name)) {
					awards.important.push(award);
				} else {
					awards.normal.push(award);
				}
			});
			return awards;
		}
	},
	methods: {
		getAwardIcon(name) {
			const awardChoose = {
				'Academy Awards': IconOscar,
				'Golden Globes': IconGoldenGlobe,
				'BAFTA Awards': IconBafta,
				Cannes: IconCannes
			};
			return awardChoose[name];
		},
		getAwardResult() {

		},
		isAnImportantAward(name) {
			return name === 'Academy Awards' || name === 'Golden Globes' || name === 'BAFTA Awards' || name === 'Cannes';
		}
	},
	components: {
		IconOscar,
		IconGoldenGlobe,
		IconBafta,
		IconGoldenBear,
		IconCannes
	}
};
</script>
