import { useState, useEffect } from 'react';
import useSWR from 'swr';

function LastSales() {
  const [sales, setSales] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const fetcher = async () => {
    const resp = await fetch(
      'https://project2-ddb43.firebaseio.com/sales.json'
    );

    const data = await resp.json();
    return data;
  };

  const { data, error } = useSWR('last-sales', fetcher);

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].name,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);

  //   fetch('https://project2-ddb43.firebaseio.com/sales.json')
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         console.log('k=>', key);
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].name,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (sales.length === 0) {
  //   return <p>No data yet</p>;
  // }

  if (error) {
    return <p>Error..</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  console.log(data);

  return (
    <div>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </div>
  );
}

export default LastSales;
