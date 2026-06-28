
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
 * Inisialisasi layanan Firebase.
 * Memastikan Firebase hanya berjalan di sisi klien (browser) untuk menghindari error SSR.
 */
export function initializeFirebase() {
  if (typeof window !== 'undefined') {
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
  }

  return { app, firestore, auth };
}

/**
 * Hook memoisasi untuk referensi Firebase.
 * Penting untuk mencegah loop render pada hook Firestore.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  return useMemo(factory, deps);
}

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
