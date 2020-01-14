<template>
    <section class="archvie">
        <counter class="archvie__counter">
            <movies-list />
        </counter>
    </section>
</template>

<script>
import Counter from '~layout/Counter/Counter';
import MoviesList from '~organism/MoviesList/MoviesList';

export default {
    name: 'Archive',
    components: {
        Counter,
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

    &__counter {}

    &__moviesList {}
}
</style>
