<template>
    <div class="imdbRate">
        <span class="imdbRate__label">
            IMDb
        </span>
        <span class="imdbRate__value">
            {{ value }}
        </span>
    </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
    name: 'ImdbRate',
    props: {
        value: VueTypes.number.isRequired
    },
    data() {
        return {};
    }
};
</script>

<style scoped lang="scss">
.imdbRate {
    background: linear-gradient(90deg, #DBA506 0%, #F2DB83 54.79%, #DBA506 100%);
    border-radius: 5px;
    padding: ms(-1) ms(0);
    color: #191727;
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;

    &__label {
        font-weight: 700;
        font-size: ms(-2, $thread: typography);
        margin-right: ms(0);
    }

    &__value {
        font-weight: 600;
        font-size: ms(-1, $thread: typography);
    }
}
</style>
