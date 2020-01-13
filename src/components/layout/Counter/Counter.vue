<template>
    <section class="counter">
        <searcher />
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

}
</style>
