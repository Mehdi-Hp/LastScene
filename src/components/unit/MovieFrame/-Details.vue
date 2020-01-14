<template>
    <div class="details">
        <h1 class="details__title">
            Nausicaä of the Valley of the Wind
        </h1>
        <span class="details__director">
            Hayao Miazaki
        </span>
    </div>
</template>

<script>
export default {
    name: 'MovieFrameDetails',
    props: {},
    data() {
        return {};
    }
};
</script>

<style scoped lang="scss">
.details {

    &__title {
        font-size: ms(0, $thread: typography);
        color: $color-foreground;
    }

    &__director {
        color: $color-primary--light;
        font-size: ms(-1, $thread: typography);
        font-weight: 500;
    }
}
</style>
