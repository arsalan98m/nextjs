function HomePage(props) {
  console.log('props=>', props);
  return (
    <ul>
      <li>Product 1 11</li>
    </ul>
  );
}

export async function getStaticProps() {
  console.log('getStaticprops');
  return {
    props: {
      testing: 'abc',
    },
  };
}

export default HomePage;
