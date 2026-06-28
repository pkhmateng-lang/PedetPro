
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';
import { useMemo, useRef } from 'react';

let app: FirebaseApp;
let firestore: Firestore;
let auth: Auth;

/**
 * Initializes Firebase services if they haven't been initialized yet.
 * Returns the app, firestore, and auth instances.
 */
export function initializeFirebase() {
  // Ensure Firebase is only initialized once and only on the client side
  if (typeof window !== 'undefined') {
    if (!getApps().length) {
      // If no apps exist, initialize a new one with the config
      app = initializeApp(firebaseConfig);
    } else {
      // Otherwise, use the existing app
      app = getApp();
    }
    
    // Initialize services as singletons
    if (!firestore) {
      firestore = getFirestore(app);
    }
    if (!auth) {
      auth = getAuth(app);
    }
  }

  return { app, firestore, auth };
}

/**
 * A specialized memoization hook for Firebase references and queries.
 * Ensures that the reference is only re-created when its dependencies change,
 * preventing infinite re-render loops in Firestore hooks.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  return useMemo(factory, deps);
}

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
