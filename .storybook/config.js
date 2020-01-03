import { addParameters, addDecorator, configure } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import Vue from 'vue';
import _upperFirst from 'lodash.upperfirst';
import _camelCase from 'lodash.camelcase';
import SvgIcon from 'vue-svgicon';
import vuePersianFilters from 'vue-persian-filters';
import ReactiveProvide from 'vue-reactive-provide';

import '~styles/global.scss';

const requireComponent = require.context(
    '../src/components/0-atoms',
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
    Vue.component(
        componentName,
        componentConfig.default || componentConfig
    );
});


Vue.use(SvgIcon, {
    tagName: 'svg-icon',
    isOriginalDefault: true
});

Vue.use(ReactiveProvide);
Vue.use(vuePersianFilters);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});


addDecorator(withKnobs);

configure(require.context('../src', true, /stories\.(js|mdx)$/), module);
