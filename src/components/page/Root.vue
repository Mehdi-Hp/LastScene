<template>
    <main class="root">
        <the-sidebar class="root__sidebar" />
        <router-view />
    </main>
</template>

<script>
import TheSidebar from '~layout/Sidebar/Sidebar';

export default {
    name: 'Root',
    components: {
        TheSidebar
    },
    props: {},
    data() {
        return {};
    }
};
</script>

<style scoped lang="scss">
.root {
    --inner-space: #{ms(2)};
    height: 100vh;
    padding: var(--inner-space);
    display: grid;
    grid-template-columns: ms(5) minmax(0, 1fr);
    margin: auto;

    &__sidebar {
        ;
    }
}
</style>
