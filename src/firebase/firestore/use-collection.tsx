
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
        // Deteksi path koleksi dari query object
        let path = 'unknown';
        try {
          // Mencoba mendapatkan path dari internal query metadata
          const q = query as any;
          if (q.path) {
            path = q.path.toString();
          } else if (q._query && q._query.path) {
            path = q._query.path.toString();
          } else if (q.converter && q._query) {
            path = q._query.path.toString();
          }
        } catch (e) {
          // Fallback jika gagal deteksi
          path = 'reports'; 
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
