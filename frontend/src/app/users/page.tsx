"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import AddMemberForm from "../../components/add_member_form/add_member_form";
import MemberDisplay from "../../components/member_display/member_display";
import styles from "./users_page.module.css";

export default function UsersPage() {
  const [memberRefreshKey, setMemberRefreshKey] = useState(0);

  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <div className={styles.brand}>TCG Project Management Dashboard</div>
          <div className={styles.navLinks}>
            <Link href="/users" className={`${styles.navButton} ${styles.navButtonActive}`}>Users</Link>
            <Link href="/projects" className={styles.navButton}>Projects</Link>
          </div>
        </div>
        <div className={styles.logoWrap}><Image src="/tcg_logo.png" alt="Logo" width={100} height={40} /></div>
      </nav>
      <main className={styles.main}>
        <section className={styles.card}>
          <AddMemberForm onMemberAdded={() => setMemberRefreshKey((previous) => previous + 1)} />
          <MemberDisplay refreshTrigger={memberRefreshKey} />
        </section>
      </main>
    </div>
  );
}
