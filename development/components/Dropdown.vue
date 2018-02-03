<template>
	<div
		class="m-dropdown"
		:style="{
			'height': dropdownHeight,
			'width': dropdownWidth
		}"
		:class="{
			'm-dropdown--is-open': isOpen,
			'm-dropdown--is-visible': hoverState
		}"
		v-on-clickaway="closeMenu"
		v-esc="closeMenu"
	>
		<component :is="iconName" v-if="iconName"
			class="m-dropdown__icon"
			:class="[{
				'm-dropdown__icon--is-visible': hoverState,
				'm-dropdown__icon--is-open': isOpen,
				'a-icon-menu--is-open': isOpen,
				'a-icon-menu--is-visible': hoverState
			}, getIconClass]"
			@click.native="toggleDropdown"
			:isOpen="isOpen"
			:hover-state="hoverState"
		></component>

		<slot class="m-dropdown__menu"></slot>
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
	name: 'Dropdown',
	props: [
		'movie',
		'hoverState',
		'menuHeight',
		'menuWidth',
		'initialHeight',
		'initialWidth',
		'iconName',
		'parentClass',
		'isOpen'
	],
	data() {
		return {
			dropdownHeight: null,
			dropdownWidth: null
		};
	},
	computed: {
		getIconClass() {
			const iconClasses = [`${this.parentClass}__dropdown-icon`];
			if (this.isOpen) {
				iconClasses.push([`${this.parentClass}__dropdown-icon--is-open`]);
			}
			if (this.hoverState) {
				iconClasses.push([`${this.parentClass}__dropdown-icon--is-hovered`]);
			}
			return iconClasses;
		},
		getMenuClass() {
			const menuClasses = [`${this.parentClass}__dropdown-menu`];
			if (this.isOpen) {
				menuClasses.push([`${this.parentClass}__dropdown-menu--is-open`]);
			}
			if (this.hoverState) {
				menuClasses.push([`${this.parentClass}__dropdown-menu--is-hovered`]);
			}
			return menuClasses;
		}
	},
	directives: {
		onClickaway
	},
	methods: {
		closeMenu() {
			if (this.isOpen) {
				this.$emit('toggleExpand', false);
			}
		},
		toggleDropdown() {
			this.$emit('toggleExpand');
		}
	},
	mounted() {
		this.dropdownHeight = `${this.initialHeight}px`;
		this.dropdownWidth = `${this.initialWidth}px`;
	},
	watch: {
		isOpen(gotOpened) {
			if (gotOpened) {
				this.dropdownHeight = `${this.menuHeight}px`;
				this.dropdownWidth = `${this.menuWidth}px`;
			} else {
				this.dropdownHeight = `${this.initialHeight}px`;
				this.dropdownWidth = `${this.initialWidth}px`;
			}
			// this.$emit('toggleExpand', gotOpened);
		}
	}
};
</script>
