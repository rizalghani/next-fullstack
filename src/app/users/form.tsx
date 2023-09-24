import React, { useState } from "react";
import AddUser from "./addUser";

type UserType = {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: boolean;
};

async function getUsers() {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result.data;
    });

  return response;
}

export default async function UserForm() {
  const users: UserType[] = await getUsers();

  return (
    <div className="flex flex-col">
      <div className="grid grid-flow-col mb-10">
        <h5 className="font-medium">Manajemen User</h5>
        <AddUser />
      </div>
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
          <tr>
            <th scope="col" className="px-12 py-4">
              No
            </th>
            <th scope="col" className="px-12 py-4">
              Nama Lengkap
            </th>
            <th scope="col" className="px-12 py-4">
              Email
            </th>
            <th scope="col" className="px-12 py-4">
              No. Telepon
            </th>
            <th scope="col" className="px-12 py-4">
              Status
            </th>
            <th scope="col" className="px-12 py-4">
              #
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
            >
              <td className="whitespace-nowrap px-12 py-4 font-medium">
                {index + 1}
              </td>
              <td className="whitespace-nowrap px-12 py-4">{user.name}</td>
              <td className="whitespace-nowrap px-12 py-4">{user.email}</td>
              <td className="whitespace-nowrap px-12 py-4">{user.phone}</td>
              <td className="whitespace-nowrap px-12 py-4">{user.status}</td>
              <td className="whitespace-nowrap px-12 py-4"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
