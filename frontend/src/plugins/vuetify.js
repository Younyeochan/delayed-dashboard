import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

const theme = {
  primary: colors.teal,
}

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'xs'
  },
  theme: {
    themes: {
      light: {
        primary: '#227C70',
        secondary: '#614124',
        accent: '#88A47C',
        error: '#EB6440',
        info: '#227C70',
        success: '#4CAF50',
        warning: '#CF0A0A',
      },
      dark: {
        primary: '#227C70',
        secondary: '#614124',
        accent: '#F49D1A',
        error: '#EB6440',
        info: '#227C70',
        success: '#4CAF50',
        warning: '#CF0A0A',
      },
    }
  },
  theme: {
    themes: {
      light: theme,
      dark: theme
    }
  }
});
