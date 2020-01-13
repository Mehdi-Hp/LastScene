<template>
    <router-link
        #default="{ href, isExactActive, navigate }"
        tag="li"
        class="navigationLink"
        :to="{
            name: link.name
        }"
    >
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
                <base-icon
                    :name="link.icon"
                    class="navigationLink__icon"
                    :class="{
                        'navigationLink__icon--active:true': isExactActive
                    }"
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
    setup(props) {
        return {
        };
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
        color: var(--s-color-active);
    }

    &__itself {
        display: flex;
        position: relative;
        &--active\: {

            &true {
            }
        }
    }

    &__icon {
        margin-right: ms(0);
        &--active\: {

            &true {
                color: var(--s-color-active);
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
                color: var(--s-color-active);
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
