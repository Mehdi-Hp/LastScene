<template>
    <article class="moviesList">
        <movie-frame
            v-for="movie in 24"
            :key="movie"
            class="moviesList__frame"
        />
    </article>
</template>

<script>
import MovieFrame from '~unit/MovieFrame/MovieFrame';

export default {
    name: 'MoviesList',
    components: {
        MovieFrame
    },
    props: {},
    setup() {
        return {};
    }
};
</script>

<style scoped lang="scss">
.moviesList {
    --s-frame-width: #{ms(5)};

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, var(--s-frame-width)));
    gap: ms(3);

    &__frame {
    }
}
</style>
