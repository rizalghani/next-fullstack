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
    <div className="container">
      <div className="row">
        <div className="col">
          <h5>Manajemen User</h5>
        </div>
        <div className="col">
          <div className="float-right">
            <AddUser type="post" />
          </div>
        </div>
      </div>
      <div className="row pt-5">
        <table className="table table-striped table-hover table-md">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama Lengkap</th>
              <th scope="col">Email</th>
              <th scope="col">No. Telepon</th>
              <th scope="col">Status</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.status}</td>
                <td>
                  <div className="row">
                    <AddUser type="get" data={user} />
                    <AddUser type="put" data={user} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
