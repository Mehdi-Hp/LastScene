<template>
	<button
		v-ripple="'rgba(255, 255, 255, 0.10)'"
		:class="`button--${mode}`"
		class="button"
	>
		<icon
			v-if="icon"
			:name="icon"
			:class="`button__icon--${mode}`"
			class="button__icon"
		/>
		<span
			v-if="text"
			class="button__text"
		>
			{{ text }}
		</span>
	</button>
</template>

<script>
export default {
	name: 'AppButton',
	props: {
		mode: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: false,
			default: null
		},
		icon: {
			type: String,
			required: false,
			default: null
		}
	},
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.button {
	box: horizontal;
	padding: 1em;
	border-radius: 10em;
	font-weight: 500;
	font-family: $secondary-typeface;
	transition: background-color 0.15s;

	&--normal {
		background-color: $white-2;
		color: $black-1;

		&:hocus {
			background-color: $white-3;
		}
	}

	&--ghost {
		background-color: transparent;
		color: $primary-color;
	}

	&--primary {
		background-color: $red;
		color: tint(mix($red, $gold), 40%);

		&:hocus {
			background-color: shade($red, 10%);
		}
	}

	&__icon {
		margin-right: 0.5em;
		size: 1.2em;

		&--primary {
		}
		&--ghost {
		}
	}

	&__text {
	}
}
</style>
