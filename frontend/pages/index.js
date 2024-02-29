import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Next.js App</title>
      </Head>
      {data ? (
        <div>
          <h1>{data.title}</h1>
          <p>{data.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/article`);
    const jsonData = await response.json();
    const data = {
      title: jsonData.title,
      content: jsonData.content,
    };
    return {
      props: { data },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { data: null },
    };
  }
}
