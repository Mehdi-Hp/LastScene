<template>
    <section class="counter">
        <searcher />
        <slot />
    </section>
</template>

<script>
import Searcher from '~unit/Searcher/Searcher';

export default {
    name: 'ComponentName',
    components: {
        Searcher
    },
    props: {},
    setup() {
        return {};
    }
};
</script>

<style scoped lang="scss">
.counter {
    display: grid;
    grid-auto-flow: row;
    align-items: start;
    gap: ms(3);
}
</style>
