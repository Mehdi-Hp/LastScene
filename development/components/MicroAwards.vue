<template>
	<div class="m-micro-awards">
		<icon-oscar class="m-micro-awards__award" :class="{ 'm-micro-awards__award--won': inTitle('Academy Awards').categories[0].result === 'won' }" v-if="inTitle('Academy Awards')"></icon-oscar>
		<icon-golden-globe class="m-micro-awards__award" :class="{ 'm-micro-awards__award--won': inTitle('Golden Globes').categories[0].result === 'won' }" v-if="inTitle('Golden Globes')"></icon-golden-globe>
		<icon-cannes class="m-micro-awards__award" :class="{ 'm-micro-awards__award--won': inTitle('Cannes Film Festival').categories[0].result === 'won' }" v-if="inTitle('Cannes Film Festival')"></icon-cannes>
		<icon-bafta class="m-micro-awards__award" :class="{ 'm-micro-awards__award--won': inTitle('BAFTA Awards').categories[0].result === 'won' }" v-if="inTitle('BAFTA Awards')"></icon-bafta>
		<icon-golden-bear class="m-micro-awards__award" :class="{ 'm-micro-awards__award--won': inTitle('Berlin International Film Festival').categories[0].result === 'won' }" v-if="inTitle('Berlin International Film Festival')"></icon-golden-bear>
	</div>
</template>

<script>
import IconOscar from './icons/Oscar.vue';
import IconGoldenGlobe from './icons/GoldenGlobe.vue';
import IconCannes from './icons/Cannes.vue';
import IconBafta from './icons/Bafta.vue';
import IconGoldenBear from './icons/GoldenBear.vue';

export default {
	name: 'microAward',
	props: [
		'awards'
	],
	data() {
		return {

		};
	},
	computed: {

	},
	components: {
		IconOscar,
		IconGoldenGlobe,
		IconBafta,
		IconGoldenBear,
		IconCannes
	},

	methods: {
		inTitle(awardTitle) {
			return this.$_.find(this.awards, {
				name: awardTitle
			});
		}
	}
};
</script>
