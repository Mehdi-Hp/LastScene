<template>
    <ul class="navigation">
        <div
            v-if="pointerPositionStyle"
            ref="pointer"
            class="navigation__pointer"
            :style="pointerPositionStyle"
        />
        <navigation-link
            v-for="(link, linkIndex) in links"
            :key="linkIndex"
            :link="link"
            class="navigation__link"
        />
    </ul>
</template>

<script>
import NavigationLink from './NavigationLink';

export default {
    name: 'Navigation',
    components: {
        NavigationLink
    },
    props: {},
    data() {
        return {
            activeLinkClientRect: null,
            links: [
                {
                    label: 'Archive',
                    icon: 'home-smile-line',
                    name: 'archive'
                },
                {
                    label: 'Recently Added',
                    icon: 'home-smile-line',
                    name: 'recently-added'
                },
                {
                    label: 'Watch List',
                    icon: 'home-smile-line',
                    name: 'watch-list'
                },
                {
                    label: 'Favorites',
                    icon: 'home-smile-line',
                    name: 'favorites'
                },
                {
                    label: 'Top Rated',
                    subLabel: 'By You',
                    icon: 'home-smile-line',
                    name: 'top-rated-by-you'
                },
                {
                    label: 'Top Rated',
                    subLabel: 'By People',
                    icon: 'home-smile-line',
                    name: 'top-rated-by-people'
                }
            ]
        };
    },
    computed: {
        pointerPositionStyle() {
            if (this.activeLinkClientRect) {
                return {
                    top: `${this.activeLinkClientRect.top}px`
                };
            }
            return null;
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    const activeLink = document.querySelector('.navigationLink__itself--active\\:true');
                    this.activeLinkClientRect = activeLink?.getBoundingClientRect();
                });
            }
        }
    }
};
</script>

<style scoped lang="scss">
.navigation {
    padding: var(--inner-space) 0;
    position: relative;
    display: grid;
    overflow: hidden;
    &--active\: {

        &true {

        }
    }

    &__pointer {
        position: absolute;
        left: 0;
        transform: translateY(-70%) translateX(-100%);
        border-radius: 50%;
        size: ms(2);
        box-shadow: 10px 0 30px 0 rgb(255, 247, 0);
        transition: top .15s cubic-bezier(0, .68, .49, 1.04);
    }
}
</style>
