import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Auth/layout";
import styles from "../styles/AuthForm.module.css";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "lib/validate";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();

  // formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) {
      router.push(status.url);
    } else {
      toast.warning("Email veya şifre hatalı!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  // Google Handler Function
  async function handleGoogleSignin() {
    signIn();
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="container mx-auto d-flex flex-column">
        {/* TITLE */}
        <div>
          <h1 className="fs-2">Login</h1>
          <p className="mx-auto text-muted">text</p>
        </div>

        {/* FORM */}
        <form
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
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

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="submit"
              className="btn btn-outline-dark w-100"
              onClick={handleGoogleSignin}
            >
              Sign In with Google <i className="bi bi-google" />
            </button>
          </div>
        </form>

        {/* BOTTOM */}
        <p className="text-center text-muted mt-2">
          do not have an account yet?{" "}
          <Link href={"/register"}>
            <span className="text-primary">
              <br />
              Sign Up
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
