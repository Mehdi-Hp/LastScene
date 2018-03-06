<template>
	<div
		class="m-dropdown"
		:class="{
			'm-dropdown--is-open': isOpen,
			'm-dropdown--is-visible': hoverState
		}"
		:style="menuSize"
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
			@click.native="toggleState"
			:isOpen="isOpen"
			:hover-state="hoverState"
		></component>

		<div class="m-dropdown__menu" :class="[getMenuClass]" ref="menu">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import IconMenu from './icons/Menu.vue';

export default {
	name: 'Dropdown',
	props: [
		'hoverState',
		'iconName',
		'parentClass',
		'state'
	],
	data() {
		return {
			isOpen: false
		};
	},
	computed: {
		menuSize() {
			if (this.isOpen) {
				return {
					height: `${this.$refs.menu.clientHeight}px`,
					width: `${this.$refs.menu.clientWidth}px`
				};
			}
			return {
				height: null,
				width: null
			};
		},
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
	components: {
		IconMenu
	},
	directives: {
		onClickaway
	},
	methods: {
		closeMenu() {
			if (this.isOpen) {
				this.isOpen = false;
				this.$emit('toggle', this.isOpen);
			}
		},
		toggleState() {
			this.isOpen = !this.isOpen;
			this.$emit('toggle', this.isOpen);
		}
	},
	watch: {
		state(newSalue) {
			this.isOpen = newSalue;
		}
	},
	mounted() {
		Array.from(this.$refs.menu.firstChild.children).forEach((listItem, listIndex) => {
			this.$refs.menu.firstChild.children[listIndex].classList.add('m-dropdown__option');
			this.$refs.menu.firstChild.children[listIndex].classList.add(`${this.parentClass}__option`);
		});
	}
};
</script>
