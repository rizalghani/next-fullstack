"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Button } from "react-bootstrap";
import { BsFillEyeFill, BsPencilSquare } from "react-icons/bs";

interface propsType {
  data?: any;
  type: string;
}

export default function AddUser(props: propsType) {
  const data = props?.data;
  console.log({ data })
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    id: data?.id || null,
    name: data?.name || "",
    phone: data?.phone || "",
    email: data?.email || "",
    password: data?.password || "password123",
    roleId: data?.roleId || 2,
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
      await router.refresh();
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
      {props.type == "get" ? (
        <button
          className="btn bg-success text-white p-2 rounded-circle"
          onClick={handleModal}
        >
          <BsFillEyeFill />
        </button>
      ) : props.type == "put" ? (
        <button
          className="btn bg-warning text-white p-2 rounded-circle"
          onClick={handleModal}
        >
          <BsPencilSquare />
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleModal}
        >
          TAMBAH USER
        </button>
      )}
      <Modal
        show={open}
        onHide={handleModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <h5>
              {props.type == "get"
                ? "Detail"
                : props.type == "put"
                ? "Edit"
                : "Tambah"}{" "}
              User
            </h5>
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
              <label className="text-sm mb-2">Nama</label>
              <input
                required
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Masukkan Nama"
                className="form-control"
                disabled={["get"].includes(props.type)}
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
                placeholder="Masukkan Nomor Telepon"
                className="form-control"
                disabled={["get"].includes(props.type)}
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
                disabled={["get"].includes(props.type)}
              />
            </div>
            <div className="pb-3">
              {props.type !== "get" && (
                <button
                  type="submit"
                  className={`btn btn-block text-white ${
                    loading
                      ? "btn-secondary"
                      : props.type === "put"
                      ? "btn-warning"
                      : "btn-primary"
                  }`}
                  disabled={loading}
                >
                  {loading
                    ? "loading..."
                    : props.type === "put"
                    ? "UBAH"
                    : "SIMPAN"}
                </button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
