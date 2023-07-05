import useSWR from "swr";

const fetchUsers = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const ExampleSWRComponent = () => {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetchUsers
  );

  const fullData = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetchUsers
  );
  console.log(fullData);

  if (!data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      {data.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default ExampleSWRComponent;
