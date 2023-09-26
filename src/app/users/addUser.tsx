"use client";

import { Fragment, ChangeEvent, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Modal, Button } from "react-bootstrap";

export default function AddUser() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "password123",
    roleId: 2,
  });
  const [error, setError] = useState("");

  const router = useRouter();
  const cancelButtonRef = useRef(null);

  const handleModal = () => {
    setOpen(!open);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ ...formValues, name: "", phone: "", email: "" });

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      setOpen(false);

      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={handleModal}
      >
        TAMBAH USER
      </button>
      <Modal
        show={open}
        onHide={handleModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <h5>TAMBAH USER</h5>
          </Modal.Title>
          <Button
            variant="secondary"
            className="btn btn-light"
            onClick={handleModal}
          >
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            {error && (
              <p className="text-center bg-red-300 py-4 mb-6 rounded">
                {error}
              </p>
            )}
            <div className="mb-6">
              <label className="text-sm mb-2">Name</label>
              <input
                required
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Masukkan Nama"
                className="form-control"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm mb-2">Nomor Telepon</label>
              <input
                required
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                placeholder="No. Telepon"
                className="form-control"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm mb-2">Email</label>
              <input
                required
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Masukkan Email"
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className={`btn btn-block ${
                loading ? "btn-secondary" : "btn-primary"
              }`}
              disabled={loading}
            >
              {loading ? "loading..." : "SIMPAN"}
            </button>
          </form>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
}
