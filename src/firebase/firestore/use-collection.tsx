
'use client';

import { useState, useEffect } from 'react';
import { 
  Query, 
  onSnapshot, 
  QuerySnapshot, 
  DocumentData,
  CollectionReference
} from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useCollection<T = DocumentData>(query: Query<T> | null) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) return;

    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot<T>) => {
        const items = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        } as T & { id: string }));
        setData(items);
        setLoading(false);
      },
      async (err) => {
        // Mencoba mendapatkan path dari query untuk pelaporan error yang lebih baik
        let path = 'unknown';
        try {
          // Pada JS SDK, path sering kali tersembunyi di internal query object
          const internalQuery = (query as any)._query || query;
          if (internalQuery.path) {
            path = internalQuery.path.toString();
          } else if (internalQuery.collection) {
            path = internalQuery.collection.path;
          }
        } catch (e) {
          path = 'reports'; // Fallback spesifik untuk aplikasi ini
        }

        const permissionError = new FirestorePermissionError({
          path: path,
          operation: 'list',
        });
        
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
}
