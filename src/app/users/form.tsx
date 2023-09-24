import React from "react";

export default async function UserForm() {
  function handleChange() {
    // setModal(!modal);
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-flow-col mb-10">
        <h5 className="font-medium">Manajemen User</h5>
        <button
          type="button"
          className="btn bg-blue-600 p-1 border-r-1 text-white"
        >
          TAMBAH USER
        </button>
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
          <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
            <td className="whitespace-nowrap px-12 py-4 font-medium">1</td>
            <td className="whitespace-nowrap px-12 py-4">Mark</td>
            <td className="whitespace-nowrap px-12 py-4">Otto</td>
            <td className="whitespace-nowrap px-12 py-4">@mdo</td>
            <td className="whitespace-nowrap px-12 py-4">@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
