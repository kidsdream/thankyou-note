import type { NextApiRequest, NextApiResponse } from 'next';
const admin = require('firebase-admin');
const { cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const COLLECTION_NAME = 'users';

  //　firebase初期化
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }),
    });
  }
  const db = getFirestore();

  if (req.method === 'POST') {
    const docRef = db.collection(COLLECTION_NAME).doc();
    const insertData = {
      datano: '1',
      name: 'Symfo',
      email: 'symfo@example.com',
    };
    docRef.set(insertData);
  } else if (req.method === 'GET') {
    const doc = await db.collection(COLLECTION_NAME).get();
    console.log(doc);
  }
  res.status(200);
}
