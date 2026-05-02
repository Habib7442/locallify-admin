'use client';

import { useEffect } from 'react';
import { client } from '@/lib/appwrite';

export default function AppwritePing() {
  useEffect(() => {
    client.ping()
      .then((response) => {
        console.log('Appwrite connected:', response);
      })
      .catch((error) => {
        console.error('Appwrite connection failed:', error);
      });
  }, []);

  return null;
}
