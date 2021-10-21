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

// More Options NextJS offers to us and we need them
// 1. we can see that getStaticProps recieves an argument we just haven't used it this far. But we do actually get an object here as our  argument as a parameter with some extra information about this page when it's executed by next.js for example we would get any dynamic params any dynamic path segment values which we'll see in next ignore it now. and we also get a couple of other pieces of information which at the moment though, don't matter to us.

// Now lets close look at getStaticProps return object props and revalidate now there are two other keys, which we can set on this object one key is the notFound key which wants a boolean value which is either true or false if we set this to true this page will return a 404 error not found page instead of normal page now why you do this

// Well, if the code here where we fetching data fails to fetch data for whatever reason then we could

// second key is redirect key , this allows you to redirect the user, instead of rendering the page content, we can redirect to another page

export async function getStaticProps(context) {
  const resp = await fetch(
    'https://notesapplication-backend.herokuapp.com/notes'
  );

  const data = await resp.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  if (data.length === 0) {
    return {
      redirect: '/no-data',
    };
  }

  return {
    props: {
      notes: data.notes,
    },
    revalidate: 10,
  };
}

export default HomePage;
