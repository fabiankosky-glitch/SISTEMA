
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthGuard } from '@angular/fire/auth-guard';

import { routes } from './app.routes';

// Firebase config moved directly here
export const firebaseConfig = {
  apiKey: "AIzaSyAgZoa7T5HbbR3GBlIgwSptHi2StB6iLGM",
  authDomain: "sisgestionintegrl.firebaseapp.com",
  projectId: "sisgestionintegrl",
  storageBucket: "sisgestionintegrl.appspot.com",
  messagingSenderId: "24863817148",
  appId: "1:24863817148:web:cc2fd41a30ec38c471ffb9",
  measurementId: "G-P89SHQCL63"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    AuthGuard,
  ],
};
