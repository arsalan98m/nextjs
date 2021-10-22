import fs from 'fs';
import Link from 'next/link';
import path from 'path';
function HomePage(props) {
  return (
    <ul>
      {props.products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          {product.title}
        </Link>
      ))}
    </ul>
  );
}

// More Options NextJS offers to us and we need them
// 1. we can see that getStaticProps recieves an argument we just haven't used it this far. But we do actually get an object here as our  argument as a parameter with some extra information about this page when it's executed by next.js for example we would get any dynamic params any dynamic path segment values which we'll see in next ignore it now. and we also get a couple of other pieces of information which at the moment though, don't matter to us.

export async function getStaticProps(context) {
  console.log('context=>', context);
  console.log('RE-GENERATING');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

  const jsonData = await fs.promises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
