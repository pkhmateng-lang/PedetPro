
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';
import { useMemo } from 'react';

let app: FirebaseApp;
let firestore: Firestore;
let auth: Auth;

/**
 * Inisialisasi layanan Firebase secara aman.
 * Menangani kasus di mana aplikasi mungkin sudah terinisialisasi.
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
        // Mengaktifkan persistensi offline agar data tetap bisa diakses meskipun koneksi tidak stabil
        try {
          enableIndexedDbPersistence(firestore).catch((err) => {
            if (err.code === 'failed-precondition') {
              console.warn('Multi-tab persistence failed');
            } else if (err.code === 'unimplemented') {
              console.warn('Browser does not support persistence');
            }
          });
        } catch (e) {
          // Persistence can only be enabled once
        }
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
