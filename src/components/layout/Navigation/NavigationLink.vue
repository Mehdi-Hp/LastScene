<template>
    <router-link
        #default="{ href, isExactActive, navigate }"
        tag="li"
        class="navigationLink"
        :to="{
            name: link.name
        }"
    >
        <!-- <following-pointer
            #default="{ left, top, right, bottom, x, y, width, height }"
            :destiny="$refs.destiny"
            :match="[
                ['top', 'top'],
                ['bottom', 'bottom'],
            ]"
        > -->
        <!-- </following-pointer> -->
        <slot :isExactActive="isExactActive">
            <a
                ref="destiny"
                class="navigationLink__itself"
                :class="{
                    'navigationLink__itself--active:true': isExactActive
                }"
                :href="href"
                @click="navigate"
            >
                <slot :isExactActive="isExactActive" />
                <svg-icon
                    :name="link.icon"
                    class="navigationLink__icon"
                />
                <div
                    class="navigationLink__labels"
                    data-test="navigationItemLabel"
                >
                    <span
                        class="navigationLink__label"
                        :class="{
                            'navigationLink__label--active:true': isExactActive
                        }"
                    >
                        {{ link.label }}
                    </span>
                    <span
                        v-if="link.subLabel"
                        class="navigationLink__subLabel"
                    >
                        {{ link.subLabel }}
                    </span>
                </div>
                <div class="navigationLink__badge" />
            </a>
        </slot>
    </router-link>
</template>

<script>
import VueTypes from 'vue-types';

export default {
    name: 'NavigationLink',
    props: {
        link: VueTypes.object.isRequired
    },
    data() {
        return {};
    }
};
</script>

<style scoped lang="scss">
.navigationLink {
    position: relative;
    font-weight: 500;
    padding: ms(1) var(--inner-space);
    cursor: pointer;
    color: var(--color-foreground);

    &:hover {
        color: var(--color-alternative);
    }

    &__itself {
        display: flex;
        position: relative;
        &--active\: {

            &true {
            }
        }
    }

    &__labels {
        display: flex;
        flex-direction: column;
    }

    &__label {
        &--active\: {

            &true {
                color: var(--color-alternative);
            }
        }
    }

    &__subLabel {
        margin-top: ms(0);
        color: $color-primary--light;
        font-size: ms(-1, $thread: typography);
    }

    &__badge {

    }
}
</style>
