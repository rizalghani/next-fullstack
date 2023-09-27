import React, { useState } from "react";
import ModalProduct from "./ModalProduct";

type productType = {
  id: number;
  name: string;
  group: string;
};

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products", {
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

export default async function ProductForm() {
  const products: productType[] = await getProducts();

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h5>Manajemen Product</h5>
        </div>
        <div className="col">
          <div className="float-right">
            <ModalProduct type="post" />
          </div>
        </div>
      </div>
      <div className="row pt-5">
        <table className="table table-striped table-hover table-md">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama Product</th>
              <th scope="col">Nama Group</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.group}</td>
                <td>
                  <div className="row">
                    <ModalProduct type="get" data={product} />
                    <div className="ml-1" />
                    <ModalProduct type="put" data={product} />
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
