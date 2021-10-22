import React from 'react';

function UserProfile() {
  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {} = context;

  return {
    props: {},
  };
}

export default UserProfile;
