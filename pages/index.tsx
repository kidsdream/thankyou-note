import axios from 'axios';

function Home({ news }: {news: any}) {
  const insertUser = async () => {
    await axios.post('/api/user');
  };
  const getUser = async () => {
    await axios.get('/api/user');
  };

  const parseNews = JSON.parse(news);
  console.log(parseNews);

  return (
    <div className="">
      <button
        className=""
        onClick={() => insertUser()}>
        Insert User
      </button>
      <div>
        <h3>Firestoreのデータ一覧</h3>
        <div>
          {parseNews.map((arti: any, index: any) => (
            <>
              <div key={index}>
                <div>{index}</div><div>{arti._fieldsProto['email']['stringValue']}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
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
  const querySnapshot = await db.collection('users').get();
  const dummyNewsList: any = [
    {
      id: "1",
      title: "test1",
      content: "texttext1",
    },
    {
      id: "2",
      title: "test2",
      content: "texttext2",
    },
  ];

  return {
    props: {
      news: JSON.stringify(querySnapshot.docs),
    },
  };
}

export default Home;
