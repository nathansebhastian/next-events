import Button from "@/components/Button";
import { getUser } from "@/lib/actions/action";

export const metadata = {
  title: 'Home'
};

export default async function Home() {
  const users = await getUser();
  return (
    <div className="m-2">
      <Button />
      <ul>
      {
        users.map(user => {
          return <li>{user.name}</li>
        })
      }
      </ul>
    </div>
  );
}
