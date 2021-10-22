import React from 'react';

function Home() {
  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}

// Note - if we have a dynamic page for a single user or differnet users if we use getServerSideProps we don't need and we can't user getStaticPaths

export async function getServerSideProps(context) {
  const {} = context;

  return {
    props: {},
  };
}

export default Home;
