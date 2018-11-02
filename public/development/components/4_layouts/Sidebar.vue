<template>
	<nav class="sidebar">
		<div class="sidebar__profile">
			<div class="sidebar__picture">
				<img
					src="../../assets/images/profile-photo.jpg"
					:alt="user.name"
					class="sidebar__picture-image"
				>
			</div>
			<span class="sidebar__name">
				{{ 'Mehdi Hoseini' }}
			</span>
		</div>
		<div class="sidebar__navigations">
			<ul class="sidebar__navigation">
				<router-link
					v-ripple="'rgba(255, 255, 255, 0.10)'"
					to="/"
					class="sidebar__link"
					active-class="sidebar__link--is-active"
				>
					<icon
						name="box"
						class="sidebar__link-icon"
					/>
					My Buffet
				</router-link>
				<router-link
					v-ripple="'rgba(255, 255, 255, 0.10)'"
					to="/watch-next"
					class="sidebar__link"
					active-class="sidebar__link--is-active"
				>
					<icon
						name="clock"
						class="sidebar__link-icon"
					/>
					Watch Next...
				</router-link>
			</ul>

			<ul class="sidebar__navigation">
				<span class="sidebar__title">
					My Collections
				</span>
				<router-link
					v-ripple="'rgba(255, 255, 255, 0.10)'"
					to="/watch-next"
					class="sidebar__link | sidebar__link--in-collection"
					active-class="sidebar__link--is-active"
				>
					Favourites
				</router-link>
				<router-link
					v-ripple="'rgba(255, 255, 255, 0.10)'"
					to="/watch-next"
					class="sidebar__link | sidebar__link--in-collection"
					active-class="sidebar__link--is-active"
				>
					Top Rated By Me
				</router-link>
			</ul>

			<ul class="sidebar__navigation">
				<span class="sidebar__title">
					Pinned Collections
				</span>
				<router-link
					v-ripple="'rgba(255, 255, 255, 0.10)'"
					to="/watch-next"
					class="sidebar__link | sidebar__link--in-collection"
					active-class="sidebar__link--is-active"
				>
					Best dramas of 2018
				</router-link>
				<router-link
					v-ripple="'rgba(255, 255, 255, 0.10)'"
					to="/watch-next"
					class="sidebar__link | sidebar__link--in-collection"
					active-class="sidebar__link--is-active"
				>
					Scariest movies of all times
				</router-link>
			</ul>
		</div>
	</nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Sidebar',
	components: {},
	data() {
		return {};
	},
	computed: {
		...mapState(['user'])
	}
};
</script>

<style scoped lang="scss">
.sidebar {
	display: flex;
	flex-direction: column;
	width: $sidebar__width;
	color: white;
	z-index: g-index('land');
	position: fixed;
	padding: $gutter--fat 0;
	margin-top: $searchbar__height;
	overflow-y: scroll;

	&:after {
		content: '';
		position: absolute;
		top: $gutter--fat;
		bottom: $gutter--fat;
		right: 0;
		width: 1px;
		background-color: tint($background-color, 15%);
	}

	&__profile {
		box: vertical center;
		margin-bottom: $gutter--fat;
		flex-shrink: 0;
	}

	&__picture {
		size: 70px;
		border-radius: 50%;
		margin-bottom: 0.5em;
		overflow: hidden;
	}

	&__picture-image {
		size: 100%;
		max-width: 75px;
		max-height: 75px;
	}

	&__name {
		font-family: $default-typeface;
		font-size: $fs-small;
		color: mix($background-color, white, 35%);
		margin-top: 0.5em;
	}

	&__navigations {
		box: vertical;
		color: $clay-white;
		font-weight: 400;
	}

	&__navigation {
		box: vertical;
		margin-bottom: $gutter;
		flex-shrink: 0;
	}

	&__title {
		padding: 0 $gutter--fat;
		margin-bottom: $gutter--thinner;
		font-size: $fs-small;
		font-weight: bold;
		color: mix($background-color, white, 60%);
	}

	&__link {
		padding: $gutter--thin $gutter--fat;
		box: horizontal middle;
		flex-shrink: 0;
		@include fix-text-rendering;

		&:hocus {
			background-color: tint($clay, 2%);
		}

		&--in-collection {
			padding: $gutter--thinner $gutter--fat;
		}

		&--is-active {
			position: relative;
			font-weight: bold;
			color: $gold;
			background-color: tint($clay, 8%);

			&:hocus {
				background-color: tint($clay, 8%);
			}

			&:before {
				content: '';
				position: absolute 0.5em -1px 0.5em auto;
				width: 3px;
				background-color: $gold;
				z-index: g-index('land');
			}
		}
	}

	&__link-icon {
		margin-right: 0.5em;
	}
}
</style>
