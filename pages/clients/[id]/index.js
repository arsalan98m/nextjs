import { useRouter } from 'next/router';

const ClientsProjectPage = () => {
  const router = useRouter();
  console.log(router.query);

  function loadProjectHandler() {
    // load data...
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: { id: router.query.id, clientprojectid: 'projecta' },
    });
  }

  return (
    <div>
      <h1>The projects of a given client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientsProjectPage;
