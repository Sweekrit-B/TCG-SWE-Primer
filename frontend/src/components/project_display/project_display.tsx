"use client";

import { useEffect, useState } from "react";

import { getAllProjects, type Project } from "../../api/projects";
import { getAssociatesByProjectId } from "../../api/associates";
import { getUserById } from "../../api/users";
import styles from "./project_display.module.css";

type ProjectDisplayProps = {
  refreshTrigger?: number;
};

export default function ProjectDisplay({ refreshTrigger = 0 }: ProjectDisplayProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
	const loadProjects = async () => {
	  try {
		setIsLoading(true);
		setError(null);
  
		const data = await getAllProjects();
		setProjects(data);
	  } catch (err) {
		setError(err instanceof Error ? err.message : "Failed to load projects");
	  } finally {
		setIsLoading(false);
	  }
	};
  
	loadProjects();
  }, [refreshTrigger]);
  return (
	<div className={styles.tableWrap}>
	  {isLoading && <p>Loading projects...</p>}
  
	  {error && <p style={{ color: "red" }}>{error}</p>}
  
	  {!isLoading && !error && projects.length === 0 && (
		<p>No projects found</p>
	  )}
  
	  {!isLoading && !error && projects.length > 0 && (
		<table className={styles.table}>
		  <thead className={styles.head}>
			<tr>
			  <th className={styles.cell}>ID</th>
			  <th className={styles.cell}>Project Name</th>
			  <th className={styles.cell}>Manager ID</th>
			  <th className={styles.cell}>Description</th>
			</tr>
		  </thead>
  
		  <tbody>
			{projects.map((project) => (
			  <tr key={project.id}>
				<td className={styles.cell}>{project.id}</td>
				<td className={styles.cell}>{project.project_name}</td>
				<td className={styles.cell}>{project.project_manager_id}</td>
				<td className={styles.cell}>
				  {project.project_description}
				</td>
			  </tr>
			))}
		  </tbody>
		</table>
	  )}
	</div>
  );
}
