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
    title: "Webhooks Lesson #2",
    description: "Using webhooks to trigger automations",
    tags: ["llm", "webhook", "http"],
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
  },
  {
    id: 1,
    title: "Email to Anything - #03",
    description: "Using emails to trigger automations",
    tags: ["llm", "email", "slack"],
    json: `{
  "name": "Email to Anything - #03",
  "nodes": [
    {
      "parameters": {
        "options": {}
      },
      "type": "n8n-nodes-base.emailReadImap",
      "typeVersion": 2,
      "position": [
        -660,
        0
      ],
      "id": "0405c2a4-6795-4a66-87b8-9db3dbea7de2",
      "name": "Email Trigger (IMAP)",
      "credentials": {
        "imap": {
          "id": "KAjheYW7RKSEEGzi",
          "name": "Assistant DailyAi"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "e5472883-d44e-407b-9dd7-fb36a3cf82dc",
              "leftValue": "={{ $json.to }}",
              "rightValue": "news",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -440,
        0
      ],
      "id": "0db76d79-0482-4dde-8201-ee2b7e8112bd",
      "name": "If"
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -300,
        260
      ],
      "id": "76867485-f12d-4c46-941a-08d168a3ae78",
      "name": "No Operation, do nothing"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=The data coming in is the body of an email.\nThe first link in the body is a link I sent to myself to get scrape the news from and later use that info for a slack post.\nI just need you to get that link. Ignore the other links in the body those are just signatures.\n\n {{ $('Email Trigger (IMAP)').first().json.textPlain }}",
        "hasOutputParser": true
      },
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.4,
      "position": [
        -180,
        -120
      ],
      "id": "7fe1bf74-ff14-496f-92c0-ea77a6bf74ee",
      "name": "Basic LLM Chain"
    },
    {
      "parameters": {
        "jsonSchemaExample": "{\n\t\"url\": \"https://cloud.google.com/text-to-speech/docs/voice-types\"\n}"
      },
      "id": "bf42cde3-3fa0-4e36-8a8e-bd2b7cf9fcf7",
      "name": "Structured Output Parser",
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.2,
      "position": [
        20,
        80
      ]
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGroq",
      "typeVersion": 1,
      "position": [
        -180,
        80
      ],
      "id": "6ef646f2-f2ab-4f11-89b8-c72cd00df036",
      "name": "Groq Chat Model",
      "credentials": {
        "groqApi": {
          "id": "lgNSqfZHV5Zw8Pvp",
          "name": "Groq account"
        }
      }
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.firecrawl.dev/v1/scrape",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {}
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"url\": \"{{ $json.output.url }}\",\n  \"formats\": [\n    \"markdown\"\n  ]\n} ",
        "options": {}
      },
      "id": "8f546065-dfd8-424c-9dd6-032d0c69f3e6",
      "name": "FireCrawl",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        200,
        -120
      ],
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
        "text": "=This is a news article I found interesting.\nThe pipeline before your step go the data from the website now I just want you to give me a nice summary of the article.\n\nWhat you output will be used in slack so do not wrap the text in \"Here you got here is the news\" just follow the FORMAT BELOW\n\n## Format HTML\n\nTitle: {{ $json.data.metadata.title }}\nUrl: {{ $json.data.metadata.ogUrl }}\nTLDR: <YOU WRITE THIS PART>\n\n## DO NOT\nSay \"Here is the output\"\n\n\n## Original Content\n{{ $json.data.markdown }}\n"
      },
      "id": "cca48b4f-1edb-484a-8629-ec5f6038a2cd",
      "name": "Basic LLM Chain1",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.4,
      "position": [
        480,
        -120
      ]
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "aeecca16-8c23-4dad-a258-f0bd5bb8d7fc",
      "name": "Groq Chat Model1",
      "type": "@n8n/n8n-nodes-langchain.lmChatGroq",
      "typeVersion": 1,
      "position": [
        420,
        80
      ],
      "credentials": {
        "groqApi": {
          "id": "lgNSqfZHV5Zw8Pvp",
          "name": "Groq account"
        }
      }
    },
    {
      "parameters": {
        "select": "channel",
        "channelId": {
          "__rl": true,
          "value": "C080TTH8H1V",
          "mode": "list",
          "cachedResultName": "news"
        },
        "text": "={{ $json.text }}",
        "otherOptions": {}
      },
      "id": "79203335-ed66-4077-9359-f0f3cb4e89a1",
      "name": "Slack",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.2,
      "position": [
        880,
        -120
      ],
      "webhookId": "84965d18-ca4f-4d8e-9b74-a0f480109e13",
      "credentials": {
        "slackApi": {
          "id": "Mn6pCdbL9DvLdqpz",
          "name": "Slack account"
        }
      }
    }
  ],
  "pinData": {
    "Email Trigger (IMAP)": [
      {
        "json": {
          "textHtml": "",
          "textPlain": "https://huggingface.co/blog/s2s_endpoint\r\n\r\nAl Nutile\r\nhttps://calendly.com/alfrednutile <--for appointments\r\nhttps://bit.ly/m/alnutile <-- for all my other links\r\n413.230.4767\r\n",
          "metadata": {
            "return-path": "alfrednutile@gmail.com",
            "delivered-to": "assistant+news@dailyai.studio",
            "x-fda": "82800479118.01.615B4E6",
            "received": "from mail-yw1-f174.google.com (mail-yw1-f174.google.com [209.85.128.174])\tby imf17.hostedemail.com (Postfix) with ESMTP id E68194000A\tfor <assistant+news@dailyai.studio>; Mon, 18 Nov 2024 21:18:39 +0000 (UTC)",
            "authentication-results": "imf17.hostedemail.com;\tdkim=pass header.d=gmail.com header.s=20230601 header.b=\"ktP/mxQ0\";\tspf=pass (imf17.hostedemail.com: domain of alfrednutile@gmail.com designates 209.85.128.174 as permitted sender) smtp.mailfrom=alfrednutile@gmail.com;\tdmarc=pass (policy=none) header.from=gmail.com",
            "arc-message-signature": "i=1; a=rsa-sha256; c=relaxed/relaxed; d=hostedemail.com;\ts=arc-20220608; t=1731964698;\th=from:from:sender:reply-to:subject:subject:date:date:\t message-id:message-id:to:to:cc:mime-version:mime-version:\t content-type:content-type:content-transfer-encoding:in-reply-to:\t references:dkim-signature; bh=co5DrnibpeYv+7oMNAKr3BY8sPNm/2RiofIq+fv7zFc=;\tb=upeJQCV/wa5Sxx924VBMe9Hhd36a+BEcnOClRrl0BkIVII6Db9+hRLB2N6qusGBI+wrC+0\tR8nmlmnVNB24NazeY94yoXlXBCWm9fOGaEiTwHrnDAUHhOQ3nRASVHRe0FWymO+o8zhg+X\tEmduaysdfWGAuobcOd9HqtqhfOqpS7k=",
            "arc-seal": "i=1; s=arc-20220608; d=hostedemail.com; t=1731964698; a=rsa-sha256;\tcv=none;\tb=pfXmjuZU0fVoMu86HR2MbkE4VOnzbQ+enqmSHs8HH5klxtcOio3voYziUiPv8D476dgj19\tKxah/emSd9nt+b+cnjY2Af1Jnquy774dhDZ1hWBhyY6IG83IYYhQtS24tEu6qMSuMvvjaJ\t9x8NLlKSBkgEDC6iT47wnSMcAozsYAk=",
            "arc-authentication-results": "i=1;\timf17.hostedemail.com;\tdkim=pass header.d=gmail.com header.s=20230601 header.b=\"ktP/mxQ0\";\tspf=pass (imf17.hostedemail.com: domain of alfrednutile@gmail.com designates 209.85.128.174 as permitted sender) smtp.mailfrom=alfrednutile@gmail.com;\tdmarc=pass (policy=none) header.from=gmail.com",
            "dkim-signature": "v=1; a=rsa-sha256; c=relaxed/relaxed;        d=gmail.com; s=20230601; t=1731964756; x=1732569556; darn=dailyai.studio;        h=to:subject:message-id:date:from:mime-version:from:to:cc:subject         :date:message-id:reply-to;        bh=co5DrnibpeYv+7oMNAKr3BY8sPNm/2RiofIq+fv7zFc=;        b=ktP/mxQ0q5XamzTuEQeUK79yjwm9dLEMeOWXCZQXLsTv9HXoB2K+1Wp6i8E/XWmS0P         Rs1w8v7ZH2fkgNTy+YDGzikVHxaAun0C4/xwo/W09nKpuhBnlG+ynGKv03SbkLv5j+aO         2gbVbi8rrPU4KYfdcYL+sn9f5uth0itQAo23G0oa/Eo7VN/UpAgd6gJvhKm72Ak710QJ         O8A9Wa1az4oPaY97XP1IR0clrHJNZFiRq5JGMORXrsy46iRetCgg05w9f4oC5qPmJOYQ         Qo73+oE4Whe6bBm/vvb/uYhLqk/EwKPEMuiOsfDD8mCU42N7VlFcyaYsieVvYXKo0F4o         5ZFA==",
            "x-google-dkim-signature": "v=1; a=rsa-sha256; c=relaxed/relaxed;        d=1e100.net; s=20230601; t=1731964756; x=1732569556;        h=to:subject:message-id:date:from:mime-version:x-gm-message-state         :from:to:cc:subject:date:message-id:reply-to;        bh=co5DrnibpeYv+7oMNAKr3BY8sPNm/2RiofIq+fv7zFc=;        b=CvKcvIP17EfgZX/v4EqzaHCZGhUpoNoqpkFc5XEcQPnEQpHgZD6bjqNnLj7AJYAfC+         OevxxDaj6GrYmQu0/Rs2ARd8jGEnfSalFJ5JOL0P5cnEuv0D76NMubFb5KwfukiJr8qf         +Yu9IK/Sov+uX1V3OuaYv57XmszxAt4MiuksMWOQODqYGqj5kVX1px0XGpO3miYeMcjS         jFb8foVoKjKnquJOfu1YI/qdOtEWlhTu5AdhwTcP4qOZ4L+NGQQdR6deCwYilxSpZA0M         V8DFFZ4dR+v0YKWtGD573L1nh54Yx96WfGZQA1ggVZ3dEeZOiqEc7gLGqJBsXevRXeun         6OpA==",
            "x-gm-message-state": "AOJu0YyPthg346sZrNH5RTKicMB0DfVybHUu8oheZwc/Yg30t88kGyk9\tBuWk94SuDNS9lFkK1dzSL81Lav6v94Bi6E276Jc1UkV6HPEYAvXQBDen/T/igvdxBZ21+mIHAxI\tCtGAQwbphqlTz49/RhPrY9izbGd9gzHHX",
            "x-google-smtp-source": "AGHT+IGpRiVH7zLrY5YJdvE9ZiS5usM9U6Mre5aTQisWqqovdT6Fyax/PaM48NM0MrrdFz5GaVzTMCp1uQoXQPw3MHw=",
            "x-received": "by 2002:a05:690c:6b11:b0:6ea:e967:81da with SMTP id 00721157ae682-6ee55bee93cmr125563567b3.11.1731964756382; Mon, 18 Nov 2024 13:19:16 -0800 (PST)",
            "mime-version": "1.0",
            "message-id": "<CALpppRiGxZrPQ+_ARUFLSapdVTGxuporjeNyp1yMzx1wxGvO0g@mail.gmail.com>",
            "content-type": "text/plain; charset=\"UTF-8\"",
            "x-stat-signature": "77mjtibfrjy3uu91896x4axtjzrxoszz",
            "x-rspam-user": "",
            "x-rspamd-queue-id": "E68194000A",
            "x-rspamd-server": "rspam02",
            "x-spam-status": "No, score=4.73",
            "x-he-tag": "1731964719-357017",
            "x-he-meta": "U2FsdGVkX1/6nHmCAgTJ2zN0MIB0hQl4z3BDTgtRaItUgc+FCrAYq+Y9v3Yi06MNWD2mMQnLsXcsTEOmJHq97np//cS23CCoOS9iDWvz/m+vcaHOFUt1grarUze9plGVUbhrFHUGbU0Nb75bDGbWxTgV5mIPxHIXEPz8TgSHoAIF6fgJixpwZWUoq9+Gr+nGunTCYeXC40MIHcC9uZ+Ut4GsNNKNY+07PzzPJ5cgpN3D1rDQO8SAm64G07RUXU0T97tMA2tE+gb5iy/1jiLaUs8x+FG2OiRr4qvceT9bPVxFjWx9vzAVTU7hLukJpkrLDDYn/03zDUFwp7g/wOAOHv4jVFIJOZ8y+VRwDWF6wBm06gyMgZAfoTu9y7UJPP7dqGsT4PsPnvIVS4UbyQF8ml35HNeLr6SMqjjAYZymY6wtakDUDMHBwClX9xRCJfYaueAlqxrZEK0KPIz4P/YQx+3tEdFooqwQtDaKHifm9v/rPQl4JXu26hicdsAEgSS8VIKhcibDcjLBXz81q4PQowpOBm+LqI3+Yzf2qvTz9P0FWc9YV9mdnntgE8FGHk8xecio6bufLgn+x3+RSwmGE+hMUGtpYAzFjIuxlUN8wAyKirmF4XLoYDv6uev9A8VFwn6AzCRWpKQxaAFKwvZcDY0qyClLuQQXtLdm//jWEGI7uVjDD0nQXXrKOnVSqKlRf0IpqYe0FVzWzaH67bye5PyYJwoTe80Robirm9+nkkbnpWTOsNAnBXyRDetRNkSj2eTUNsxHMsJP6/dE6/9yE98E5rs1VximJX/tiCOVbee3k31toSwDGI48kvGka3Ac5EpArbtr6BbM1jJmgRsg0NWCOS+KlU7qdDqU184j+QGIHUASWFlNbCcZISu7MezyfLL781a6D3Y6VfJXZaId/Qkxrz9RVjktSYKJVKhySyi1G65C7SQ+/XmDUY+YZLfOVfwB62jwN4W6KrH0nZbq/GcRm+Q Oastw++M1wVHB58tHGCmeW/6mECYZsg2XIek7jDb41eK0G1028RssBqZKRt73N756mOtCdE6zt4aYFzchLFZ10xhft6hik6fzmsxARXumZ4EezpTcjEey0q4mLZzMz4WInoPWkiQwnT9eRwom8lpsOC+HOMxhZAhZ8P2dIQfF6lmV3+kvEl3Dl2B2y8CPkr1FyN7fXTmtqSr6rln4TuR2VJpNxgsJVL482J8BUJapJOdMfY3KXhWd8qO8cjLeI+tK+tiqQ9Gj+6t78WE19OwFLGOv1JgHgdTauulaUj0Hz4rpM6OWlGpzhqyYGkkweUEXVmUxykGxiSUFm77pKRIy5pngOxrAC8gXX+aLTUPHkpxoJwGE6ntUVS80SXCVTG/wIT/AlS6M6ftKqqcDEcyqKWOyr+Ihn3g04GznoZbjeU9AQ+676gFuiA+EpMSt/lcgnNztRpVajWBCBsEmque6fH5iZtU+WYl6/lxCr4sdR8nfV2wtr7TeNpEMC+7Ma/BvjoAT3loMK8xv6xiHC8l/yHx8Dv9KfOFVeVveUIq0M4vVVR5UK0OSsar9S+3JiVvA0LdxXk/5jmKQpPy8TA5GR4UpbzY/LtmzNqINJa6vi1jPLrqus+jL4ZRJaDMKih2yuD6JnTYRt/Qa4JBZG+MWQ5uoX7tfNhsY90yMRblMZqj97VtbAFdqBRNKJjCLTgSi1ThHCXjM8Hb1hazmrNN3qkVaU1ooIayK820koMPGMhDq/0M69o4EBxfF7VqiL9XxpfOLktZombq6CbRrmorrACKY63b0kwuetJCG"
          },
          "from": "Alfred Nutile <alfrednutile@gmail.com>",
          "date": "Mon, 18 Nov 2024 16:19:04 -0500",
          "subject": "Hugging face news",
          "to": "\"NewsFeed DailyAi.Studio\" <assistant+news@dailyai.studio>"
        }
      }
    ],
    "FireCrawl": [
      {
        "json": {
          "success": true,
          "data": {
            "markdown": "tons of content here ",
            "metadata": {
              "title": "Deploying Speech-to-Speech on Hugging Face",
              "description": "We’re on a journey to advance and democratize artificial intelligence through open source and open science.",
              "ogTitle": "Deploying Speech-to-Speech on Hugging Face",
              "ogUrl": "https://huggingface.co/blog/s2s_endpoint",
              "ogImage": "https://huggingface.co/blog/assets/s2s_endpoint/thumbnail.png",
              "ogLocaleAlternate": [],
              "viewport": "width=device-width, initial-scale=1.0, user-scalable=no",
              "fb:app_id": "1321688464574422",
              "twitter:card": "summary_large_image",
              "twitter:site": "@huggingface",
              "twitter:image": "https://huggingface.co/blog/assets/s2s_endpoint/thumbnail.png",
              "og:title": "Deploying Speech-to-Speech on Hugging Face",
              "og:type": "website",
              "og:url": "https://huggingface.co/blog/s2s_endpoint",
              "og:image": "https://huggingface.co/blog/assets/s2s_endpoint/thumbnail.png",
              "sourceURL": "https://huggingface.co/blog/s2s_endpoint",
              "url": "https://huggingface.co/blog/s2s_endpoint",
              "statusCode": 200
            }
          }
        }
      }
    ],
    "Basic LLM Chain1": [
      {
        "json": {
          "text": "TLDR: Deploying Speech-to-Speech (S2S) on Hugging Face Inference Endpoints using a custom Docker image."
        }
      }
    ]
  },
  "connections": {
    "Email Trigger (IMAP)": {
      "main": [
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If": {
      "main": [
        [
          {
            "node": "Basic LLM Chain",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "No Operation, do nothing",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "No Operation, do nothing": {
      "main": [
        []
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
    },
    "Groq Chat Model": {
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
    "Basic LLM Chain": {
      "main": [
        [
          {
            "node": "FireCrawl",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "FireCrawl": {
      "main": [
        [
          {
            "node": "Basic LLM Chain1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Groq Chat Model1": {
      "ai_languageModel": [
        [
          {
            "node": "Basic LLM Chain1",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Basic LLM Chain1": {
      "main": [
        [
          {
            "node": "Slack",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": true,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "b5367fb2-5842-4399-b206-6c10cabdbd2f",
  "meta": {
    "instanceId": "9cda1041b042b5eaf770a19882c585271b3aae30fe3a8d729d0903b97b8e7cc0"
  },
  "id": "UTdbCe8EJKxbKIYy",
  "tags": []
}`
  }
];