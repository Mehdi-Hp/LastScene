<template>
	<div
		class="m-menu"
		:style="{
			'height': dropdownHeight
		}"
		:class="{
			'm-menu--is-open': isOpen,
			'm-menu--is-visible': hovered
		}"
		v-on-clickaway="closeMenu"
		v-esc="closeMenu"
		@toggleDropdown="toggleDropdown"
	>
		<component :is="iconName"
			class="m-menu__icon"
			:class="{
				'm-menu__icon--is-visible': hovered,
				'm-menu__icon--is-open': isOpen,
				'a-icon-menu--is-open': isOpen,
				'a-icon-menu--is-visible': hovered
			}"
			@click.native="toggleDropdown"
			:isOpen="isOpen" :hovered="hovered"
		></component>

		<slot></slot>
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
	name: 'Dropdown',
	props: [
		'movie',
		'hovered',
		'menuHeight',
		'initialHeight',
		'iconName'
	],
	data() {
		return {
			isOpen: false,
			dropdownHeight: ''
		};
	},
	directives: {
		onClickaway
	},
	methods: {
		closeMenu() {
			this.isOpen = false;
			this.$parent.dropdownState = this.isOpen;
		},
		toggleDropdown() {
			this.isOpen = !this.isOpen;
			this.$parent.dropdownState = this.isOpen;
		}
	},
	watch: {
		isOpen(gotOpened) {
			if (gotOpened) {
				this.dropdownHeight = `${this.menuHeight}px`;
			} else {
				this.dropdownHeight = `${this.initialHeight}px`;
			}
		}
	}
};
</script>
