export interface Template {
  id: number;
  title: string;
  description: string;
  tags: string[];
  json: string;
}

export const templates: Template[] = [
  {
    id: 1,
    title: "Slack Notification on New GitHub Issue",
    description: "Automatically send Slack notifications when new GitHub issues are created",
    tags: ["slack", "github", "notifications"],
    json: `{
      "name": "Slack Notification on New GitHub Issue",
      "description": "Automatically send Slack notifications when new GitHub issues are created",
      "tags": ["slack", "github", "notifications"]
    }`
  },
  {
    id: 2,
    title: "Daily Database Backup to S3",
    description: "Schedule daily backups of your database to Amazon S3 storage",
    tags: ["aws", "database", "backup"],
    json: `{
      "name": "Slack Notification on New GitHub Issue",
      "description": "Automatically send Slack notifications when new GitHub issues are created",
      "tags": ["slack", "github", "notifications"]
    }`
  }
];