<template>
    <div
        class="searcher"
        :class="{
            'searcher--active:true': isActive
        }"
    >
        <base-icon
            :class="{
                'searcher__icon--active:true': isActive
            }"
            class="searcher__icon"
            name="search-line"
        />
        <input
            v-model="value"
            type="text"
            class="searcher__field"
            placeholder="Search for anything..."
            @focus="isActive = true"
            @blur="isActive = false"
            @input="$emit('input', value)"
        >
    </div>
</template>

<script>
export default {
    name: 'Searcher',
    props: {},
    data() {
        return {
            isActive: false,
            value: ''
        };
    }
};
</script>

<style scoped lang="scss">
.searcher {
    --s-inner-space: ms(0);
    --s-placeholder-text-color: #{$color-foreground--dim};
    --s-text-color: #{$color-foreground};

    border-bottom: 1px solid var(--s-placeholder-text-color);
    width: ms(6);
    display: flex;

    &--active\: {

        &true {
            border-color: var(--s-text-color);
        }
    }

    &__icon {
        color: var(--s-placeholder-text-color);
        padding: var(--s-inner-space);
        height: ms(2);
        margin-right: ms(0);
        flex-shrink: 0;
        &--active\: {

            &true {
                color: var(--s-text-color);
            }
        }
    }

    &__field {
        color: var(--s-text-color);
        padding: var(--s-inner-space);
        flex-grow: 1;

        &::placeholder {
            color: var(--s-placeholder-text-color);
        }
    }
}
</style>
