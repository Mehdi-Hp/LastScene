import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { Plugin as VueFragment } from 'vue-fragment';
import SvgIcon from 'vue-svgicon';
import _upperFirst from 'lodash.upperfirst';
import _camelCase from 'lodash.camelcase';

import App from './App.vue';
import router from './router';

import store from './store';

import '~styles/global.scss';

const requireComponent = require.context(
    './components/base',
    false,
    /Base[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = _upperFirst(
        _camelCase(
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        )
    );
    Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.use(VueCompositionApi);

Vue.use(VueFragment);

Vue.use(SvgIcon, {
    tagName: 'svg-icon',
    isOriginalDefault: true
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => {
        return h(App);
    }
}).$mount('#app');
