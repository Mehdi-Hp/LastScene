<template>
	<nav class="l-sidebar">
		<div class="l-sidebar__loggdin-user | o-lggdin-user">
			<div class="o-lggdin-user__avatar">
				<img class="o-lggdin-user__image" src="" alt=""></img>
			</div>
			<span class="o-lggdin-user__name">Mehdi Hoseini</span>
			<button class="o-lggdin-user__settings-btn"></button>
		</div>

		<ul class="l-sidebar__places">
			<div class="o-places">
				<a href="#" class="m-place">
					<li class="m-place__name">Movies Archive</li>
				</a>
			</div>

			<div class="o-places">
				<a href="#" class="m-place">
					<li class="m-place__name">Watch Next...</li>
					<span class="m-place__count | a-count | a-count--weeny">2</span>
				</a>
			</div>

			<div class="o-places">
				<li class="o-places__title">My Collections</li>
				<ul class="o-places__nested">
					<a href="#" class="m-place">
						<li class="m-place__name | m-place__name--nested">Favourites</li>
					</a>
					<a href="#" class="m-place">
						<li class="m-place__name | m-place__name--nested">Top Rated By you</li>
					</a>
					<a href="#" class="m-place">
						<li class="m-place__name | m-place__name--nested">Top Rated By</li>
						<img class="m-place__indication" src="" alt="">
					</a>
				</ul>
			</div>

			<div class="o-places">
				<li class="o-places__title">Pinned Collections</li>
				<ul class="o-places__nested">
					<a href="#" class="m-place">
						<li class="m-place__name | m-place__name--nested">Best of 20s Century</li>
						<span class="m-place__desc">by KJhsg</span>
					</a>
					<a href="#" class="m-place">
						<li class="m-place__name | m-place__name--nested">Top Rated By you</li>
						<span class="m-place__desc">by iosg</span>
					</a>
					<a href="#" class="m-place">
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
import '../assets/notcss/04_layout/l-sideabr.scss';

export default {
	name: 'sidebar',
	data() {
		return {

		}
	}
};
</script>
