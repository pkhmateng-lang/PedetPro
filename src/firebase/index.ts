
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';
import { useMemo } from 'react';

let app: FirebaseApp;
let firestore: Firestore;
let auth: Auth;

/**
 * Initializes Firebase services.
 * Offline persistence is disabled to avoid sync issues in the development environment.
 */
export function initializeFirebase() {
  if (typeof window !== 'undefined') {
    try {
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApp();
      }
      
      if (!firestore) {
        firestore = getFirestore(app);
      }
      
      if (!auth) {
        auth = getAuth(app);
      }
    } catch (error) {
      console.error("Firebase initialization failed:", error);
    }
  }

  return { app, firestore, auth };
}

/**
 * Memoization hook for Firebase references.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  return useMemo(factory, deps);
}

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
