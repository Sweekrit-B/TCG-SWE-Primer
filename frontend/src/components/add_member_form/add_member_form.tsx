"use client";

import { FormEvent, useState } from "react";

import { createUser } from "../../api/users";
import styles from "./add_member_form.module.css";

type AddMemberFormState = {
	user_name: string;
	user_grad_year: string;
	user_tcg_status: string;
	user_email: string;
};

const initialFormState: AddMemberFormState = {
	user_name: "",
	user_grad_year: "",
	user_tcg_status: "",
	user_email: "",
};

type AddMemberFormProps = {
	onMemberAdded?: () => void;
};

export default function AddMemberForm({ onMemberAdded }: AddMemberFormProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [formData, setFormData] = useState<AddMemberFormState>(initialFormState);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setSuccessMessage(null);

		if (!formData.user_name || !formData.user_grad_year || !formData.user_tcg_status || !formData.user_email) {
			setError("All fields are required.");
			return;
		}

		const gradYearNumber = Number(formData.user_grad_year);
		if (Number.isNaN(gradYearNumber)) {
			setError("Graduation year must be a number.");
			return;
		}

		try {
			setIsSubmitting(true);
			await createUser({
				user_name: formData.user_name,
				user_grad_year: gradYearNumber,
				user_tcg_status: formData.user_tcg_status,
				user_email: formData.user_email,
			});
			onMemberAdded?.();

			setFormData(initialFormState);
			setSuccessMessage("Member added successfully.");
			setIsExpanded(false);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to create user.";
			setError(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className={styles.container}>
			<button
				className={styles.toggleButton}
				type="button"
				onClick={() => {
					setIsExpanded((previous) => !previous);
					setError(null);
					setSuccessMessage(null);
				}}
				aria-expanded={isExpanded}
				aria-controls="add-member-form"
			>
				{isExpanded ? "Hide Add Member Form" : "Add Member"}
			</button>

			{isExpanded && (
				<form id="add-member-form" className={styles.form} onSubmit={handleSubmit}>
					<label className={styles.label}>
						Name
						<input
							className={styles.input}
							type="text"
							value={formData.user_name}
							onChange={(event) =>
								setFormData((previous) => ({ ...previous, user_name: event.target.value }))
							}
						/>
					</label>

					<label className={styles.label}>
						Graduation Year
						<input
							className={styles.input}
							type="number"
							value={formData.user_grad_year}
							onChange={(event) =>
								setFormData((previous) => ({ ...previous, user_grad_year: event.target.value }))
							}
						/>
					</label>

					<label className={styles.label}>
						TCG Status
						<input
							className={styles.input}
							type="text"
							value={formData.user_tcg_status}
							onChange={(event) =>
								setFormData((previous) => ({ ...previous, user_tcg_status: event.target.value }))
							}
						/>
					</label>

					<label className={styles.label}>
						Email
						<input
							className={styles.input}
							type="email"
							value={formData.user_email}
							onChange={(event) =>
								setFormData((previous) => ({ ...previous, user_email: event.target.value }))
							}
						/>
					</label>

					<button className={styles.submitButton} type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Saving..." : "Save Member"}
					</button>
				</form>
			)}

			{error && <p className={styles.error}>{error}</p>}
			{successMessage && <p className={styles.success}>{successMessage}</p>}
		</section>
	);
}
