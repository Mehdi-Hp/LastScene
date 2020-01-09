<template>
    <div class="sidebar">
        <the-navigation class="sidebar__navigation" />
    </div>
</template>

<script>
import TheNavigation from '~layout/Navigation/Navigation.vue';

export default {
    name: 'Sidebar',
    components: {
        TheNavigation
    },
    props: {},
    data() {
        return {};
    }
};
</script>

<style scoped lang="scss">
.sidebar {
    --inner-space: #{ms(2)};
    --color-foreground: #{$color-foreground};
    --color-alternative: #{$color-gold--500};
    user-select: none;
    border-radius: ms(1);
    background: $color-primary;
    box-shadow: 0 10px 70px transparentize($color-primary, 0.35);
}
</style>
