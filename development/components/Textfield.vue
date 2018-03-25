<template>
	<div
		class="a-textfield"
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
			@keyup="onKeyup"
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
		<icon-exclamation
			class="a-textfield__notice-icon"
			v-if="error"
			:title="error"
			v-tippy= "{
				arrow: true,
				theme : 'auth-form'
			}"
		></icon-exclamation>
	</div>
</template>

<script>
import { mixin as focusMixin } from 'vue-focus';
import IconExclamation from './icons/Exclamation.vue';

export default {
	name: 'Textfield',
	components: {
		IconExclamation
	},
	mixins: [focusMixin],
	props: ['name', 'text', 'type', 'error'],
	data() {
		return {
			isFocused: false,
			content: null
		};
	},
	methods: {
		onFocus() {
			this.isFocused = true;
			this.$emit('inputFocus');
		},
		onBlur() {
			this.isFocused = false;
			this.$emit('inputBlur');
		},
		onKeyup() {
			this.$emit('inputKeyup');
		},
		inputChange() {
			this.$emit('inputChange', this.content);
		}
	}
};
</script>
