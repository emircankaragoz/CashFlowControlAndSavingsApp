import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Auth/layout";
import styles from "../styles/AuthForm.module.css";
import { useFormik } from "formik";
import { register_validate } from "lib/validate";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function Register() {

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: register_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(values)
    }

    await fetch('/api/auth/signup', options)
      .then(res => res.json())
      .then((data) => {
        if(data) router.push('/')
      }) 

  }
  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className="container mx-auto d-flex flex-column">
        {/* TITLE */}
        <div>
          <h1 className="fs-2">Register</h1>
          <p className="mx-auto text-muted">text</p>
        </div>

        {/* FORM */}
        <form
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.input_group}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              {...formik.getFieldProps("username")}
            />
            {formik.errors.username && formik.touched.username ? (
              <span className="text-danger opacity-75">
                {formik.errors.username}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email ? (
              <span className="text-danger opacity-75">
                {formik.errors.email}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.input_group}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password ? (
              <span className="text-danger opacity-75">
                {formik.errors.password}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.input_group}>
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              className="form-control"
              {...formik.getFieldProps("cpassword")}
            />
            {formik.errors.cpassword && formik.touched.cpassword ? (
              <span className="text-danger opacity-75">
                {formik.errors.cpassword}
              </span>
            ) : (
              <></>
            )}
          </div>
          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Register
            </button>
          </div>
        </form>

        {/* BOTTOM */}
        <p className="text-center text-muted mt-2">
          have an account?{" "}
          <Link href={"/login"}>
            <span className="text-primary">
              <br />
              Sign In
            </span>
          </Link>
        </p>
      </section>
    </Layout>
  );
}


export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}