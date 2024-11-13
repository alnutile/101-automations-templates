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
    title: "Webhooks Lesson 2",
    description: "Using webhooks to trigger automations",
    tags: ["slack", "github", "notifications"],
    json: `{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "spam_or_not",
        "responseMode": "responseNode",
        "options": {}
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        20,
        0
      ],
      "id": "1459ba97-5077-4e80-b157-f13346713eb4",
      "name": "Webhook",
      "webhookId": "283a4697-85b1-4098-9528-6acd60154f23"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.firecrawl.dev/v1/scrape",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"url\": \"{{ $json.body.url }}\",\n  \"formats\": [\n    \"markdown\"\n  ]\n} ",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        220,
        0
      ],
      "id": "a69e0e61-0a4e-410d-88a7-c1b065b0fa0e",
      "name": "HTTP Request",
      "credentials": {
        "httpHeaderAuth": {
          "id": "85vKbWiQzDdfODqz",
          "name": "Firecrawl"
        }
      }
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "## ROLE\nYou are helping to decide if the following user content is spam or quality.\n\n## TASK\nThe user has a technology news site. A of links are sent to him to review and post on his site. But he has to check each one to see it is spam or now. \n\nSpam Defined:\n  * Sites that have nothing to do with Laravel, PHP and Technology example \"Buy a car from us!\"\n  * Sites that are just trying to get you to use their services \"Hire laravel devs from us\"\n  * Site is not about technology and news about technology\n\nThese sites might have ads on them but the body of the content has to be about technology eg an article, youtube video they are sharing etc.\n\nThe return the original URL and the boolean true of spam and false if not spam.\n\nAlso give a TLDR of the article.\n",
        "hasOutputParser": true,
        "messages": {
          "messageValues": [
            {
              "type": "HumanMessagePromptTemplate",
              "message": "=Title: {{ $json.data.metadata.title }}\n\nURL: {{ $('Webhook').item.json.body.url }}\n\nBODY:\n{{ $json.data.markdown }}\n"
            }
          ]
        }
      },
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.4,
      "position": [
        420,
        0
      ],
      "id": "c9b107ab-4007-40dd-ac89-325297eaf39a",
      "name": "Basic LLM Chain"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
      "typeVersion": 1.2,
      "position": [
        420,
        200
      ],
      "id": "abbe51f7-ba8e-4fd5-8248-4a76d2ba38c0",
      "name": "Anthropic Chat Model",
      "credentials": {
        "anthropicApi": {
          "id": "rHxRjqA15KvpIanP",
          "name": "Anthropic account"
        }
      }
    },
    {
      "parameters": {
        "jsonSchemaExample": "{\n\t\"url\": \"https://alfrednutile.info\",\n\t\"spam\": true,\n    \"title\": \"Title\",\n    \"tldr\": \"some info here\"\n}"
      },
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.2,
      "position": [
        580,
        220
      ],
      "id": "1f62de1e-9faf-45be-b4b5-f695527baf3a",
      "name": "Structured Output Parser"
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={\n  \"url\": \"{{ $json.output.url }}\",\n  \"spam\": {{ $json.output.spam }},\n  \"tldr\": \"{{ $json.output.tldr }}\"\n} ",
        "options": {}
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [
        800,
        0
      ],
      "id": "a8fc5224-9323-4200-a544-8b781e7a928c",
      "name": "Respond to Webhook"
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "HTTP Request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request": {
      "main": [
        [
          {
            "node": "Basic LLM Chain",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Basic LLM Chain": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Anthropic Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "Basic LLM Chain",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Structured Output Parser": {
      "ai_outputParser": [
        [
          {
            "node": "Basic LLM Chain",
            "type": "ai_outputParser",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {
    "HTTP Request": [
      {
        "success": true,
        "data": {
          "markdown": "![alfred](/images/me_2023.png)\n\n[GitHub contributions graph](https://github.com/alnutile)\n\n## Alfred Nutile\n\nLaravel 🚀 Vue 🚀 Inertia\n\n![](/storage//01JCGBN7H1233G7RHQHBAN0GMN.webp)\n\nnote2self 🚀\n\nfilamentphp 🚀\n\n[Passwords On Filament](https://alfrednutile.info/passwords-on-filament)\n\n1 day ago\n\nJust to track how to not save null passwords when another item on the model is being updated.\n\n![](/storage//01J9T9HT313Z2ZT47VN73CWQRW.webp)\n\nphp 🚀\n\nfilament 🚀\n\n[Filament and Jetstream](https://alfrednutile.info/filament-and-jetstream)\n\n1 month ago\n\nHow to set team and current team easily\n\n![](/storage//01J94BHM6817ZHQ6Y23Q62RYCY.webp)\n\n[Filament will lower case username o...](https://alfrednutile.info/filament-will-lower-case-username-on-auth)\n\n1 month ago\n\nSo you have to set the 'lowercase\\_usernames' => false",
          "metadata": {
            "title": "Alfred Nutile - Alfred Nutile",
            "language": "en",
            "ogLocaleAlternate": [],
            "viewport": "width=device-width, initial-scale=1",
            "sourceURL": "https://alfrednutile.info/",
            "url": "https://alfrednutile.info/",
            "statusCode": 200
          }
        }
      }
    ],
    "Basic LLM Chain": [
      {
        "output": {
          "url": "https://alfrednutile.info/",
          "spam": false,
          "title": "Alfred Nutile - Personal Technology Blog",
          "tldr": "Alfred Nutile's personal technology blog focused on Laravel, Vue, Inertia, Filament, and PHP development. Contains recent posts on topics like passwords in Filament, integrating Filament with Jetstream, and other Laravel/PHP tips."
        }
      }
    ]
  }
}`
  }
];