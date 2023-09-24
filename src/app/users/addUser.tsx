"use client";

import { Fragment, ChangeEvent, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

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

  const input_style =
    "form-control block w-full px-8 py-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <>
      <button
        type="button"
        className="btn bg-blue-600 p-1 border-r-1 text-white"
        onClick={handleModal}
      >
        TAMBAH USER
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-center text-base font-semibold leading-6 text-gray-900"
                        >
                          Tambah User
                        </Dialog.Title>
                        <div className="mt-2">
                          {/* <p className="text-sm text-gray-500">
                            Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone.
                          </p> */}
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
                                className={`${input_style}`}
                              />
                            </div>
                            <div className="mb-6">
                              <label className="text-sm mb-2">
                                Nomor Telepon
                              </label>
                              <input
                                required
                                type="text"
                                name="phone"
                                value={formValues.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className={`${input_style}`}
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
                                className={`${input_style}`}
                              />
                            </div>

                            <button
                              type="submit"
                              style={{
                                backgroundColor: `${
                                  loading ? "#ccc" : "#3446eb"
                                }`,
                              }}
                              className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                              disabled={loading}
                            >
                              {loading ? "loading..." : "SIMPAN"}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
