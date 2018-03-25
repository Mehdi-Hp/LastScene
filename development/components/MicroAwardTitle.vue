<template>
	<div
		class="m-micro-awards__title | a-micro-award-title"
		:id="tippyId"
		v-if="award"
	>
		<span class="a-micro-award-title__cermony">
			{{ award.name }} {{ award.year }}
		</span>
		<div class="a-micro-award-title__awards">
			<div
				class="a-micro-award-title__award"
				v-for="(category, categoryIndex) in award.categories"
				:key="categoryIndex"
			>
				<span class="a-micro-award-title__result">
					{{ category.result }}
				</span>
				<span class="a-micro-award-title__category">
					{{ category.title }}
				</span>
				<div
					class="a-micro-award-title__participants"
					v-if="category.participants.length"
				>
					by
					<span
						class="a-micro-award-title__participant"
						v-for="(participant, participantIndex) in category.participants"
						:key="participantIndex"
					>
						{{ participant.name }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MicroAwardTitle',
	props: ['award', 'tippyId'],
	data() {
		return {};
	},
	computed: {},
	methods: {}
};
</script>
