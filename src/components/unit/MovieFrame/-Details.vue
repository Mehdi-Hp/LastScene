<template>
    <div class="details">
        <h1 class="details__title">
            Nausicaä of the Valley of the Wind
        </h1>
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
        font-size: ms(1);
        color: $color-foreground;
        font-weight: 600;
    }
}
</style>
