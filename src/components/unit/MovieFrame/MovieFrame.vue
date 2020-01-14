<template>
    <article class="movieFrame">
        <mf-cover class="movieFrame__cover">
            <imdb-rate
                class="movieFrame__imdbRate"
                :value="8.1"
            />
        </mf-cover>
        <mf-details class="movieFrame__details" />
    </article>
</template>

<script>
import Cover from './-Cover';
import ImdbRate from '~base/ImdbRate/ImdbRate';
import Details from './-Details';

export default {
    name: 'MovieFrame',
    components: {
        ImdbRate,
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
    --s-inner-vertical-space: #{ms(0)};

    display: grid;
    grid-template-rows: calc(var(--s-width) * 167.5 / 100), max-content;
    gap: ms(1);
    position: relative;
    width: var(--s-width);

    &__cover {

    }

    &__imdbRate {
        position: absolute auto auto 0 0;
        margin: var(--s-inner-vertical-space);
    }

    &__details {
        padding: 0 var(--s-inner-vertical-space);
    }
}
</style>
