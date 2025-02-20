/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

function renderLinkingPrefix() {
  try {
    return Linking.createURL('/');
  } catch (e) {
    return 'draftbit://';
  }
}

const prefix = renderLinkingPrefix();

const linking = {
  enabled: Platform.OS === 'web' ? false : true,
  prefixes: [prefix],
  config: {
    screens: {
      BottomTabNavigator: {
        screens: {
          Home: { screens: {} },
          Mine: { screens: {} },
          Popular: { screens: {} },
          Search: { screens: {} },
          Tickets: {
            screens: {
              LiveScreen: {
                screens: {
                  LiveScreen: {
                    path: 'LiveScreen/:event_id?/:meeting_id?/:expert_id?/:expert_code?',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default linking;
