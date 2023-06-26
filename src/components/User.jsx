import React from "react";
import styles from "../styles/HomeLayout.module.css";
import { Navbar, Modal, ExpensesCards } from "@/components";

export default function User({ session, handleSignOut }) {
 
  return (
    <div className={styles.layout}>
      <Navbar user={session.user} handleSignOut={handleSignOut} />
      <main className="container py-4 mx-auto text-center">
        {/* Quick Add Button */}
        <section className="d-flex justify-content-end">
          <Modal title="Harcama Ekle" session={session} />
        </section>
        {/* Expenses Cards Components */}
        <section>
          <ExpensesCards session={session}/>
        </section>
      </main>
    </div>
  );
}
