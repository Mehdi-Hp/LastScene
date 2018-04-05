<template>
	<nav class="l-sidebar">
		<div class="l-sidebar__loggdin-user | o-lggdin-user">
			<div class="o-lggdin-user__avatar">
				<img
					class="o-lggdin-user__image"
					src=""
					alt=""
				/>
			</div>
			<span class="o-lggdin-user__name">{{ info.name }}</span>
			<button class="o-lggdin-user__settings-btn">
				<icon-setting></icon-setting>
			</button>
		</div>

		<ul class="l-sidebar__places">
			<div class="o-places">
				<a
					href="#"
					class="m-place"
				>
					<li class="m-place__name">Movies Archive</li>
				</a>
			</div>

			<div class="o-places">
				<a
					href="#"
					class="m-place"
				>
					<li class="m-place__name">
						<icon-flag
							class="m-place__icon"
							is-done="true"
							custom-color="true"
						></icon-flag>
						Watch Next...
					</li>
					<span class="m-place__count | a-count | a-count--weeny">
						{{ watchListCount }}
					</span>
				</a>
			</div>

			<div class="o-places">
				<li class="o-places__title">My Collections</li>
				<ul class="o-places__nested">
					<a
						href="#"
						class="m-place"
					>
						<li class="m-place__name | m-place__name--nested">Favourites</li>
					</a>
					<a
						href="#"
						class="m-place"
					>
						<li class="m-place__name | m-place__name--nested">Top Rated By you</li>
					</a>
					<a
						href="#"
						class="m-place"
					>
						<li class="m-place__name | m-place__name--nested">Top Rated By</li>
						<img
							class="m-place__indication"
							src=""
							alt=""
						>
					</a>
					<a
						href="#"
						class="m-place"
						v-for="collection in collections"
						:key="collection._id"
					>
						<li class="m-place__name | m-place__name--nested">{{ collection.data.name }}</li>
					</a>
				</ul>
			</div>

			<div class="o-places">
				<li class="o-places__title">Pinned Collections</li>
				<ul class="o-places__nested">
					<a
						href="#"
						class="m-place"
					>
						<li class="m-place__name | m-place__name--nested">Best of 20s Century</li>
						<span class="m-place__desc">by KJhsg</span>
					</a>
					<a
						href="#"
						class="m-place"
					>
						<li class="m-place__name | m-place__name--nested">Top Rated By you</li>
						<span class="m-place__desc">by iosg</span>
					</a>
					<a
						href="#"
						class="m-place"
					>
						<li class="m-place__name | m-place__name--nested">Best of 19s Century</li>
						<span class="m-place__desc">by mnasfv__</span>
						<span class="m-place__count | a-count">7</span>
					</a>
				</ul>
			</div>
		</ul>
	</nav>
</template>

<script>
import IconSetting from './icons/Setting.vue';
import IconFlag from './icons/Flag.vue';

export default {
	name: 'Sidebar',
	components: {
		IconSetting,
		IconFlag
	},
	data() {
		return {};
	},
	computed: {
		info() {
			return this.$store.state.info;
		},
		movies() {
			return this.$store.state.movies;
		},
		collections() {
			return this.$store.state.collections;
		},
		watchListCount() {
			return this.$_.filter(this.movies, {
				watchList: true
			}).length;
		}
	}
};
</script>
