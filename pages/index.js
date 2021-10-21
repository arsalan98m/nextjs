function HomePage(props) {
  console.log(props);
  return (
    <ul>
      {props.notes.map((product) => (
        <li>{product.text}</li>
      ))}
    </ul>
  );
}

// What if you have data that changes fruquently?
// IF WE ADD 4th product after page was deployed then we have to rebuild and redeploy the page all the time and that doesn't sound like a great thing to do.

// NextJS also has solution for this

// ISR(Incremental Static Generation) it means you are not generate statically page at build time but that it's continously updated even after deployment without you re-deploying it

// In ISR NextJS generates new pages & re-generates current pages on the fly when data is updated

// so you pre-generate a page, but then you can also tell NextJs that a given page should be re-generated again for every incoming request at most every X seconds.

// we can use revalidate property with timer value where we define the time

export async function getStaticProps() {
  console.log('RE-(GENERATING)');

  const resp = await fetch(
    'https://notesapplication-backend.herokuapp.com/notes'
  );

  const data = await resp.json();

  return {
    props: {
      notes: data.notes,
    },
    revalidate: 10,
  };
}

export default HomePage;
