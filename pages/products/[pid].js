import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // Agar hum yahan if ki condition nahi lagana chaty tu hum fallback main value ki jaga 'blocking' likh dyngy tu ussy nextjs khud hi wait karega jab tak page wapas nahi ajata
  if (!loadedProduct) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
    </div>
  );
}

// Dynamic id ky uppar agar hum getStaticProps use karty hain tu yeh hamain pre-generated page nahi bana kar dega reason kun k yeh keh raha hai k mujhe nahi pata tumhari ids kitni hai

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// goal of getStaticPath is to tell NextJS which instances of this dynamic page should be generated
// getStaticPath hum jab use karengy jab hum dynamic values get karengy gy params ky through or woh hum is function ky thorugh getStaticProps ko pass karengy or wahan sy apna data find kar k user ki screen par show karadengy

// The fallback key can help you if you have a lot of pages that would need to-be pre-generated

// image ky hamary pass millions of products hain tu kya hum millions of pages pre-geneate karin gay tu yeh cheez tu hamary liyeh waste of time or waste of resource hai tu iska hall NextJS walon ny fallback ky zairiyeh nikala kasiy dekhty hain..

// In fallback we could decide only-pre-render some pages so let's say we wanna pre-render the page with product id 1 becuase that's a highly frequented page it's visited very often but we don't wanna pre-geneate the other two pages.With fallback set to true, that's possible Now if i click product 2 then it will show product 2 hala ky main neeche paths main params p2 or p3 delete kar diya phir bhi woh mujhe page genreate kar k de raha kun kun k mainy fallback true kardiya hai isWaja sy
// they are generating this page in just-in-time when a request reaches the server so they are only pre-generated when they are needed

export async function getStaticPaths() {
  return {
    // paths: [
    //   { params: { pid: 'p1' } },
    //   { params: { pid: 'p2' } },
    //   { params: { pid: 'p3' } },
    // ],

    paths: [{ params: { pid: 'p1' } }],

    fallback: true,
  };
}

export default ProductDetailPage;
