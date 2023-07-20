import { ConnectConfig } from '@wizdm/connect';
import { DoorbellConfig } from '@wizdm/doorbell';
import { GtagConfig } from '@wizdm/gtag';

// Defines global secret environment variables
export const secrets = {

  rootEmail: 'chris@cbawebdesign.com',

  // We use the test key while in development, live key for production
  stripeTestKey: '<< your pk_test_... key goes here >>',
  stripeLiveKey: '<< your pk_live_... key goes here >>',

  firebase: <ConnectConfig> {
    apiKey: "AIzaSyBqpUJ02oUC83fp91W10CKLlRWGD4I86k4",
    authDomain: "test7-8a527.firebaseapp.com",
    projectId: "test7-8a527",
    storageBucket: "test7-8a527.appspot.com",
    messagingSenderId: "985575699300",
    appId: "1:985575699300:web:e763ace6d27c975c1d8071",
    measurementId: "G-63C8YDXFH8"
  },

  doorbell: <DoorbellConfig> {
    url: "https://doorbell.io/api/applications",
    id: "<< your doorbell id here >>",
    appKey: "<< your doorbell app key here >>"  
  },

  gtag: <GtagConfig> {
    targetId: 'G-63C8YDXFH8'
  }

};
