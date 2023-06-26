import React from "react";
import { useFormik } from "formik";
import { expense_validate } from "lib/validate";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

export default function ExpenseForm({ session, handleClose }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      amount: "",
      defination: "",
      category: "",
      date: "",
    },
    onSubmit,
    validate: expense_validate,
  });

  async function onSubmit(values) {
    const data = { values, session };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    await fetch("/api/controller/post/expense", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleClose();
          toast
            .success("Harcama Başarıyla Eklendi.", {
              position: toast.POSITION.BOTTOM_RIGHT,
            })
            router.refresh()
        }
      });
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group py-2">
          <label>Miktar</label>
          <input
            type="number"
            step="0.01"
            className={`${"form-control"} ${
              formik.errors.amount && formik.touched.amount
                ? "border-danger"
                : ""
            }`}
            {...formik.getFieldProps("amount")}
          />
          <small className="form-text text-muted">
            {"(Örnek Kullanım: 10.25 TL)"}
          </small>
        </div>
        <div className="form-group py-2">
          <label>Açıklama</label>
          <textarea
            type="text"
            className={`${"form-control"} ${
              formik.errors.defination && formik.touched.defination
                ? "border-danger"
                : ""
            }`}
            maxLength={140}
            {...formik.getFieldProps("defination")}
          />
        </div>
        <div className="form-group py-2">
          <label>Kategori</label>
          <select
            className={`${"form-select"} ${
              formik.errors.category && formik.touched.category
                ? "border-danger"
                : ""
            }`}
            {...formik.getFieldProps("category")}
          >
            <option hidden>Kategori</option>
            <option value="technology">Teknoloji</option>
            <option value="market">Market</option>
          </select>
        </div>
        <div className="form-group py-2">
          <label>Tarih</label>
          <input
            type="date"
            className={`${"form-control"} ${
              formik.errors.date && formik.touched.date ? "border-danger" : ""
            }`}
            placeholder="Date"
            maxLength={140}
            {...formik.getFieldProps("date")}
          />
        </div>
        <div className="mt-2 d-flex justify-content-end">
          <button type="submit"  className="btn btn-outline-dark">
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
}
