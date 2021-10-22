import React from 'react';

function SingleUserPage(props) {
  return (
    <div>
      <h1>{props.id}</h1>
    </div>
  );
}

// Note - if we have a dynamic page for a single user or differnet users if we use getServerSideProps we don't need and we can't user getStaticPaths

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: `user-id ${userId}`,
    },
  };
}

export default SingleUserPage;
