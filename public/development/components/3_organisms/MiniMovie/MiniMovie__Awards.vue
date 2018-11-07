<template>
	<div
		class="miniMovie:Awards"
	>
		<div
			class="miniMovie:Awards__awardHolder"
			v-for="(award, awardIndex) in importantAwards"
			:key="`${award.name}_${awardIndex}`"
		>
			<icon
				v-if="award.name"
				:name="award.iconName"
				class="miniMovie:Awards__awardIcon"
			/>
		</div>
	</div>
</template>

<script>
const importantCermonies = ['academy awards, usa', 'golden globes', 'bafta', 'cannes', 'berlin'];

export default {
	name: 'MiniMovieAwards',
	props: ['awards'],
	data() {
		return {};
	},
	computed: {
		importantAwards() {
			const importantAwards = this.awards.filter((award) => {
				const isImportant = importantCermonies.some((importantCermony) => {
					return award.name.includes(importantCermony);
				});
				return isImportant && award;
			});
			const importantAwardsPlusIconName = importantAwards.map((importantAward) => {
				if (importantAward.name.includes('academy awards')) {
					importantAward.iconName = 'oscar';
				} else if (importantAward.name.includes('golden globes')) {
					importantAward.iconName = 'golden-globe';
				} else if (importantAward.name.includes('bafta')) {
					importantAward.iconName = 'bafta';
				} else if (importantAward.name.includes('cannes')) {
					importantAward.iconName = 'palme';
				} else if (importantAward.name.includes('berlin')) {
					importantAward.iconName = 'berlin';
				}
				return importantAward;
			});
			return importantAwardsPlusIconName;
		}
	}
};
</script>

<style scoped lang="scss">
.miniMovie\:Awards {
	box: left top;

	&__awardHolder {
		box: center middle;
		color: mix($pink-light-2, $background-color, 40%);
		& + & {
			margin-left: 0.5em;
		}
	}
	&__awardIcon {
		height: 1.5em;
	}
}
</style>
