export interface Template {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

export const templates: Template[] = [
  {
    id: 1,
    title: "Email Notification Workflow",
    description: "Automatically send email notifications when new data is received",
    tags: ["email", "automation", "notifications"]
  },
  {
    id: 2,
    title: "Data Backup System",
    description: "Regular automated backups of your important data",
    tags: ["backup", "storage", "automation"]
  },
  // Add more templates as needed
];