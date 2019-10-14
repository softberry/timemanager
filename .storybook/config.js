import { configure } from '@storybook/react';

configure(require.context('../src/__ui', true, /\.stories\.jsx$/), module);
