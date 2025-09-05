import useUsers from "../hooks/use-users";

export default function UsersList() {
  const { users, isLoadingUsers } = useUsers();

  if (isLoadingUsers) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>Nome: {user.name}</li>
      ))}
    </ul>
  );
}