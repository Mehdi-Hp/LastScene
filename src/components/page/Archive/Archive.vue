<template>
    <section class="archvie">
        <counter class="archvie__counter">
            <movies-list />
        </counter>
    </section>
</template>

<script>
import MoviesList from '~organism/MoviesList/MoviesList';

export default {
    name: 'Archive',
    components: {
        MoviesList
    },
    props: {},
    data() {
        return {};
    }
};
</script>

<style scoped lang="scss">
.archvie {
    display: grid;

    &__counter {}

    &__moviesList {}
}
</style>
