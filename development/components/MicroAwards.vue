<template>
	<div class="m-micro-awards">
		<icon-oscar class="m-micro-awards__award"
			:class="{
				'm-micro-awards__award--won': cermony('Academy Awards').categories[0].result === 'won'
				}"
			v-if="cermony('Academy Awards')"
			v-tippy="{ html : '#m-micro-awards__title--oscars',
			interactive : true,
			reactive : true }">
		</icon-oscar>
		<micro-award-title tippy-id="m-micro-awards__title--oscars" :award="cermony('Academy Awards')"></micro-award-title>

		<icon-golden-globe
			class="m-micro-awards__award"
			:class="{ 'm-micro-awards__award--won': cermony('Golden Globes').categories[0].result === 'won' }"
			v-if="cermony('Golden Globes')"
			v-tippy="{ html : '#m-micro-awards__title--golden-globe',
			interactive : true,
			reactive : true }"></icon-golden-globe>
		<micro-award-title tippy-id="m-micro-awards__title--golden-globe" :award="cermony('Golden Globes')"></micro-award-title>

		<icon-cannes
			class="m-micro-awards__award"
			:class="{ 'm-micro-awards__award--won': cermony('Cannes Film Festival').categories[0].result === 'won' }"
			v-if="cermony('Cannes Film Festival')"
			v-tippy="{ html : '#m-micro-awards__title--cannes',
			interactive : true,
			reactive : true }">
		</icon-cannes>
		<micro-award-title tippy-id="m-micro-awards__title--cannes" :award="cermony('Cannes Film Festival')"></micro-award-title>
		
		<icon-bafta
			class="m-micro-awards__award"
			:class="{ 'm-micro-awards__award--won': cermony('BAFTA Awards').categories[0].result === 'won' }"
				v-if="cermony('BAFTA Awards')"
				v-tippy="{ html : '#m-micro-awards__title--bafta',
				interactive : true,
				reactive : true }">
			</icon-bafta>
		<micro-award-title tippy-id="m-micro-awards__title--bafta" :award="cermony('BAFTA Awards')"></micro-award-title>

		<icon-golden-bear
			class="m-micro-awards__award"
			:class="{ 'm-micro-awards__award--won': cermony('Berlin International Film Festival').categories[0].result === 'won' }"
				v-if="cermony('Berlin International Film Festival')"
				v-tippy="{ html : '#m-micro-awards__title--berlin',
				interactive : true,
				reactive : true }">
		</icon-golden-bear>
		<micro-award-title tippy-id="m-micro-awards__title--berlin" :award="cermony('Berlin International Film Festival')"></micro-award-title>
	</div>
</template>

<script>
import IconOscar from './icons/Oscar.vue';
import IconGoldenGlobe from './icons/GoldenGlobe.vue';
import IconCannes from './icons/Cannes.vue';
import IconBafta from './icons/Bafta.vue';
import IconGoldenBear from './icons/GoldenBear.vue';
import MicroAwardTitle from './MicroAwardTitle.vue';

export default {
	name: 'microAwards',
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
		MicroAwardTitle,
		IconOscar,
		IconGoldenGlobe,
		IconBafta,
		IconGoldenBear,
		IconCannes
	},

	methods: {
		cermony(cermonyName) {
			return this.$_.find(this.awards, {
				name: cermonyName
			});
		}
	}
};
</script>
