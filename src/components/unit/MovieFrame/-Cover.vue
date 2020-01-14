<template>
    <div class="cover">
        <div
            :style="{
                'background-image': 'url(https://prodimage.images-bn.com/pimages/0826663181395_p0_v2_s550x406.jpg)'
            }"
            class="cover__image"
        >
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'MovieFrameCover',
    props: {},
    setup() {
        return {};
    }
};
</script>

<style scoped lang="scss">
.cover {
    width: 100%;
    height: calc(var(--s-width) * 167.5 / 100);
    border-radius: ms(0);
    position: relative;

    &__image {
        position: absolute 0 0 0 0;
        background-position: center;
        background-size: cover;
        border-radius: 7px;
    }
}
</style>
