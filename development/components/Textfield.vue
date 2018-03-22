<template>
	<div class="a-textfield"
		:class="{
			'a-textfield--is-focused': isFocused,
			'a-textfield--is-full': content
		}"
	>
		<input
			:type="type"
			:name="name"
			class="a-textfield__input"
			:class="{
				'a-textfield__input--is-focused': isFocused,
				'a-textfield__input--is-full': content
			}"
			v-focus="isFocused"
			@focus="onFocus"
			@blur="onBlur"
			v-model="content"
			@input="inputChange"
			:autocomplete="name"
		>
		<label
			:for="name"
			class="a-textfield__label"
			:class="{
				'a-textfield__label--is-focused': isFocused,
				'a-textfield__label--is-full': content
			}"
		>
			{{ text }}
		</label>
	</div>
</template>

<script>
import { mixin as focusMixin } from 'vue-focus';

export default {
	name: 'Textfield',
	mixins: [focusMixin],
	props: ['name', 'text', 'type'],
	data() {
		return {
			isFocused: false,
			content: null
		};
	},
	methods: {
		onFocus() {
			this.isFocused = true;
		},
		onBlur() {
			this.isFocused = false;
		},
		inputChange() {
			this.$emit('inputChange', this.content);
		}
	}
};
</script>
