"use client";

import { useEffect, useState } from "react";

import { getAllUsers, type User } from "../../api/users";
import styles from "./member_display.module.css";

type MemberDisplayProps = {
	refreshTrigger?: number;
};

export default function MemberDisplay({ refreshTrigger = 0 }: MemberDisplayProps) {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		const loadUsers = async () => {
			try {
				const allUsers = await getAllUsers();
				setUsers(allUsers);
			} catch (err) {
				const message = err instanceof Error ? err.message : "Failed to load users";
				setError(message);
			} finally {
				setIsLoading(false);
			}
		};

		void loadUsers();
	}, [refreshTrigger]);

	if (isLoading) {
		return <p>Loading users...</p>;
	}

	if (error) {
		return <p className={styles.error}>{error}</p>;
	}

	if (users.length === 0) {
		return <p>No users found.</p>;
	}

	return (
		<div className={styles.tableWrap}>
			<table className={styles.table}>
				<thead className={styles.head}>
					<tr>
						<th className={styles.cell}>ID</th>
						<th className={styles.cell}>Name</th>
						<th className={styles.cell}>Grad Year</th>
						<th className={styles.cell}>TCG Status</th>
						<th className={styles.cell}>Email</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id} className={styles.row}>
							<td className={styles.cell}>{user.id}</td>
							<td className={styles.cell}>{user.user_name}</td>
							<td className={styles.cell}>{user.user_grad_year}</td>
							<td className={styles.cell}>{user.user_tcg_status}</td>
							<td className={styles.cell}>{user.user_email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
