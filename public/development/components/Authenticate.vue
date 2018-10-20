<template>
	<div class="p-authenticate">
		<div class="p-authenticate__box">
			<div class="p-authenticate__cover">
				<span class="p-authenticate__slug">
					GET <br/>
					YOUR <br/>
					MOVIES <br/>
					ORGANIZED, <br/>
					NOW
				</span>
			</div>
			<router-view class="p-authenticate__itself"></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Authenticate',
	data() {
		return {

		};
	}
};
</script>
