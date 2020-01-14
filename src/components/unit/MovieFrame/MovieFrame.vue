<template>
    <article class="movieFrame">
        <mf-cover class="movieFrame__cover" />
        <mf-details class="movieFrame__details" />
    </article>
</template>

<script>
import Cover from './-Cover';
import Details from './-Details';

export default {
    name: 'MovieFrame',
    components: {
        'mf-cover': Cover,
        'mf-details': Details
    },
    props: {},
    data() {
        return {};
    }
};
</script>

<style scoped lang="scss">
.movieFrame {
    --s-width: var(--s-frame-width, #{ms(5)});

    display: grid;
    grid-template-rows: calc(var(--s-width) * 167.5 / 100), max-content;
    gap: ms(1);
    position: relative;
    width: var(--s-width);

    &__cover {

    }

    &__details {

    }
}
</style>
