/* eslint-disable @next/next/no-page-custom-font */
import axios from 'axios';
import styles from '../styles/index.module.scss';
import Layout from '../components/layout';
import InputModal from '../components/inputModal';
import Head from 'next/head';

function Home({ notes }: {notes: any}) {
  const insertUser = async () => {
    await axios.post('/api/user');
  };
  const parseNotes = JSON.parse(notes);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Klee+One:wght@600&display=swap" rel="stylesheet" />
        <title>感謝ノート</title>
      </Head>
      <Layout>

        <div className={styles.mainContents}>
          <ul className={styles.noteContentsArea}>
            {parseNotes.map((note: any) => (
              <li key={note._ref['_path']['segments'][1]} className={styles.noteContent}>
                <div className={styles.noteTo}>{note._fieldsProto['yourname']['stringValue']}へ</div>
                <div className={styles.noteDetail}>{note._fieldsProto['content']['stringValue']}</div>
                <div className={styles.noteFrom}>{note._fieldsProto['myname']['stringValue']}より</div>
              </li>
            ))}
          </ul>
          <InputModal />
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const admin = require('firebase-admin');
  const { getFirestore } = require('firebase-admin/firestore');

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
  const querySnapshot = await db.collection('notes').get();

  return {
    props: {
      notes: JSON.stringify(querySnapshot.docs),
    },
  };
}

export default Home;
