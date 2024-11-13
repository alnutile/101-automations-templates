export interface Template {
  id: string;
  name: string;
  description: string;
  json: string;
  category: string;
  tags: string[];
}

export const templates: Template[] = [
  {
    id: '1',
    name: 'Daily Twitter Analytics',
    description: 'Automatically collect and analyze your Twitter metrics daily, sending a summary report to Slack.',
    json: `{
      "node": "Twitter",
      "type": "analytics",
      "config": {
        "interval": "daily",
        "metrics": ["impressions", "engagement", "followers"]
      }
    }`,
    category: 'Social Media',
    tags: ['twitter', 'analytics', 'slack']
  },
  {
    id: '2',
    name: 'Lead Generation Workflow',
    description: 'Capture leads from multiple sources and automatically add them to your CRM with follow-up tasks.',
    json: `{
      "node": "CRM",
      "type": "lead",
      "config": {
        "sources": ["website", "linkedin"],
        "actions": ["create_contact", "create_task"]
      }
    }`,
    category: 'Sales',
    tags: ['crm', 'leads', 'automation']
  }
];