import { useRef } from "react";
import useUser from "../hooks/use-user";
import type { User } from "../models/user";

export default function UserNewForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { createUser, userRequestStatus } = useUser()

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    if (!formRef.current) return
    ev.preventDefault()
    const data = new FormData(formRef.current)

    const payload = {
      id: data.get('id'),
      name: data.get('name')
    }

    await createUser(payload as User)
    formRef.current.reset()
  }

  return (
    <form action="/users" method="post" ref={formRef} onSubmit={handleSubmit}>
      <div>
        <input type="text" name="id" placeholder="ID" required />
      </div>
      <div>
        <input type="text" name="name" placeholder="Name" required />
      </div>
      <div>
        <button type="submit">
          {userRequestStatus === 'saving' ? 'Criando...' : 'Criar usuário'}
        </button>
      </div>
    </form>
  );
}