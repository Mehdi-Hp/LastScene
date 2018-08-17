<template>
	<div class="pageinfo">
		<h1 class="pageinfo__title">
			{{ $route.meta.title }}
		</h1>
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
.pageinfo {
	&__title {
		font-size: $fs-bigger;
		color: $secondary-color;
		font-family: $secondary-typeface;
		font-weight: 400;
	}
}
</style>
