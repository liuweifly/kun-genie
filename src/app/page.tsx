'use client'

import { createInfo, State } from "./lib/actions";
import { useActionState } from 'react';

export default function Home() {

  const initialState: State = { message: null, errors: {}, values: {} };
  const [state, formAction] = useActionState(createInfo, initialState);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6">今日运势</h1>
      <form action={formAction}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="birthDateTime" className="block mb-2">Birthday</label>
            <input
              type="datetime-local"
              id="birthDateTime"
              name="birthDateTime"
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Gender</label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" name="gender" value="male" required />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="gender" value="female" />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full bg-black text-white rounded-md p-2">
              查看
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
