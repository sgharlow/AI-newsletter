/**
 * Email Template Builder
 *
 * CLI tool for building, previewing, and testing email templates
 * Usage:
 *   npx ts-node scripts/template-builder.ts list
 *   npx ts-node scripts/template-builder.ts preview <template_name>
 *   npx ts-node scripts/template-builder.ts build <template_name> <json_file>
 *   npx ts-node scripts/template-builder.ts validate <template_name>
 */

import * as fs from 'fs';
import * as path from 'path';

// Import templates from broadcast function
// Note: In production, these would be imported from the deployed function
interface TemplateVariables {
  issue_number?: number;
  subject_line?: string;
  intro_text?: string;
  automation_title?: string;
  automation_problem?: string;
  automation_solution?: string;
  automation_steps?: string;
  automation_time_to_implement?: string;
  automation_time_saved?: string;
  ai_insight_title?: string;
  ai_insight_content?: string;
  tool_name?: string;
  tool_description?: string;
  tool_url?: string;
  quick_win?: string;
  next_week_teaser?: string;
  ps_text?: string;
  announcement_title?: string;
  announcement_body?: string;
  cta_text?: string;
  cta_url?: string;
  subscriber_id?: string;
}

// Template configurations with required and optional fields
const templateConfigs: Record<string, {
  name: string;
  description: string;
  requiredFields: (keyof TemplateVariables)[];
  optionalFields: (keyof TemplateVariables)[];
  sampleData: TemplateVariables;
}> = {
  weekly_issue: {
    name: 'Weekly Issue',
    description: 'Main newsletter format with 5 sections',
    requiredFields: [
      'issue_number',
      'automation_title',
      'automation_problem',
      'automation_solution',
      'ai_insight_title',
      'ai_insight_content',
      'tool_name',
      'tool_description',
    ],
    optionalFields: [
      'intro_text',
      'automation_steps',
      'automation_time_to_implement',
      'automation_time_saved',
      'tool_url',
      'quick_win',
      'next_week_teaser',
      'ps_text',
    ],
    sampleData: {
      issue_number: 18,
      intro_text: 'Happy Thursday!',
      automation_title: 'Voice-to-Claude Workflow',
      automation_problem: 'You have ideas while walking, driving, or doing chores but they vanish before you reach your computer.',
      automation_solution: 'Use voice recording + AI transcription + Claude processing to capture and organize ideas hands-free.',
      automation_steps: `<ol>
<li>Record voice memo (iOS, Android, or dedicated recorder)</li>
<li>Transcribe with Whisper API or Assembly AI</li>
<li>Send to Claude for formatting and action items</li>
<li>Save to your note-taking system</li>
</ol>`,
      automation_time_to_implement: '30 minutes',
      automation_time_saved: '3-5 hours/week in captured ideas',
      ai_insight_title: 'Voice-First is the Future',
      ai_insight_content: '<p>Most AI tools are still keyboard-first. But the best ideas come when you\'re away from your desk. Voice capture + AI processing closes this gap.</p>',
      tool_name: 'Assembly AI',
      tool_description: 'Enterprise-grade speech-to-text with speaker diarization, sentiment analysis, and Claude integration.',
      tool_url: 'https://www.assemblyai.com/',
      quick_win: 'Record your next shower thought and email it to yourself. Process it with Claude to extract 3 action items.',
      next_week_teaser: 'Next week: How to build a personal AI knowledge base that actually remembers what you told it.',
      ps_text: 'Reply to this email with your biggest voice workflow challenge. I read every reply.',
      subscriber_id: 'preview-123',
    },
  },
  announcement: {
    name: 'Announcement',
    description: 'Product launches and major updates',
    requiredFields: ['announcement_title', 'announcement_body'],
    optionalFields: ['cta_text', 'cta_url'],
    sampleData: {
      announcement_title: 'Introducing AI Prod Weekly Premium',
      announcement_body: `<p>I\'ve been building something special for the past 3 months.</p>
<p><strong>AI Prod Weekly Premium</strong> gives you:</p>
<ul>
<li>50+ ready-to-use n8n workflow templates</li>
<li>Monthly office hours with me</li>
<li>Private Discord community</li>
<li>Early access to new automations</li>
</ul>
<p>Launch pricing: $29/month (goes to $49 next week).</p>`,
      cta_text: 'Get Premium Access',
      cta_url: 'https://aiprodweekly.com/premium',
      subscriber_id: 'preview-123',
    },
  },
  notification: {
    name: 'Notification',
    description: 'Quick updates and alerts',
    requiredFields: ['intro_text'],
    optionalFields: ['announcement_body', 'cta_text', 'cta_url'],
    sampleData: {
      intro_text: 'Quick heads up: This week\'s issue is coming a day early due to the holiday.',
      announcement_body: '<p>Look for Issue #19 in your inbox tomorrow (Wednesday) instead of Thursday.</p>',
      cta_text: 'Check the Archive',
      cta_url: 'https://aiprodweekly.com/archive',
      subscriber_id: 'preview-123',
    },
  },
  digest: {
    name: 'Digest',
    description: 'Multi-item summary or roundup',
    requiredFields: ['intro_text'],
    optionalFields: ['announcement_body', 'quick_win', 'cta_text', 'cta_url'],
    sampleData: {
      intro_text: 'Missed a few issues? Here\'s what happened in AI automation this month:',
      announcement_body: `<ul>
<li><strong>Issue #15:</strong> Meeting summarizer that actually works</li>
<li><strong>Issue #16:</strong> Automated expense tracking with receipts</li>
<li><strong>Issue #17:</strong> Client onboarding automation</li>
</ul>`,
      quick_win: 'Pick ONE automation from the list above and implement it this weekend.',
      cta_text: 'Read Full Archive',
      cta_url: 'https://aiprodweekly.com/archive',
      subscriber_id: 'preview-123',
    },
  },
};

// Base wrapper - matches the one in templates.ts
function baseWrapper(content: string, subscriberId: string): string {
  const unsubscribeUrl = `https://aiprodweekly.com/api/unsubscribe?id=${subscriberId}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Prod Weekly</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }
    .header p {
      color: #666;
      font-size: 14px;
      margin: 8px 0 0 0;
    }
    .content {
      padding: 20px 0;
    }
    h2 {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 30px 0 15px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #2563eb;
    }
    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 20px 0 10px 0;
    }
    p {
      margin: 12px 0;
      color: #333;
    }
    .highlight {
      background: #f0f7ff;
      border-left: 4px solid #2563eb;
      padding: 15px 20px;
      margin: 20px 0;
    }
    .cta-button {
      display: inline-block;
      background: #2563eb;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .divider {
      border: none;
      border-top: 1px solid #e5e5e5;
      margin: 30px 0;
    }
    .footer {
      text-align: center;
      padding-top: 30px;
      border-top: 1px solid #e5e5e5;
      margin-top: 30px;
    }
    .footer p {
      font-size: 13px;
      color: #666;
    }
    .footer a {
      color: #2563eb;
      text-decoration: none;
    }
    ul, ol {
      padding-left: 20px;
      margin: 15px 0;
    }
    li {
      margin: 8px 0;
    }
    .signature {
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AI Prod Weekly</h1>
      <p>Practical AI automation for busy professionals</p>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>You're receiving this because you signed up at <a href="https://aiprodweekly.com">aiprodweekly.com</a></p>
      <p><a href="${unsubscribeUrl}">Unsubscribe</a> · <a href="https://aiprodweekly.com">View in browser</a></p>
    </div>
  </div>
</body>
</html>`;
}

// Template renderers
function renderWeeklyIssue(vars: TemplateVariables): string {
  const content = `
<p>${vars.intro_text || 'Hey,'}</p>

<p>Welcome to Issue #${vars.issue_number || '?'} of AI Prod Weekly. Let's dive in.</p>

<hr class="divider">

<h2>1. AUTOMATION OF THE WEEK: ${vars.automation_title || 'This Week\'s Automation'}</h2>

<p><strong>The problem:</strong> ${vars.automation_problem || ''}</p>

<p><strong>The solution:</strong> ${vars.automation_solution || ''}</p>

${vars.automation_steps ? `
<h3>How to build it:</h3>
${vars.automation_steps}
` : ''}

<div class="highlight">
  <p><strong>Time to implement:</strong> ${vars.automation_time_to_implement || '15-30 minutes'}</p>
  <p><strong>Time saved:</strong> ${vars.automation_time_saved || '2-3 hours/week'}</p>
</div>

<hr class="divider">

<h2>2. AI INSIGHT: ${vars.ai_insight_title || 'Weekly Insight'}</h2>

${vars.ai_insight_content || '<p>This week\'s insight coming soon.</p>'}

<hr class="divider">

<h2>3. TOOL OF THE WEEK: ${vars.tool_name || 'Featured Tool'}</h2>

<p>${vars.tool_description || ''}</p>

${vars.tool_url ? `<p><a href="${vars.tool_url}" class="cta-button">Check it out →</a></p>` : ''}

<hr class="divider">

<h2>4. QUICK WIN (Under 2 Minutes)</h2>

<p>${vars.quick_win || 'Quick tip coming soon.'}</p>

<hr class="divider">

<h2>5. WHAT'S NEXT</h2>

<p>${vars.next_week_teaser || 'Stay tuned for next week\'s issue!'}</p>

<div class="signature">
  <p>See you Thursday,<br><strong>Steve</strong></p>
  ${vars.ps_text ? `<p><em>P.S. ${vars.ps_text}</em></p>` : ''}
</div>
`;

  return baseWrapper(content, vars.subscriber_id || 'preview');
}

function renderAnnouncement(vars: TemplateVariables): string {
  const content = `
<p>Hey,</p>

<h2>${vars.announcement_title || 'Announcement'}</h2>

${vars.announcement_body || '<p>Announcement details here.</p>'}

${vars.cta_text && vars.cta_url ? `
<p style="text-align: center;">
  <a href="${vars.cta_url}" class="cta-button">${vars.cta_text}</a>
</p>
` : ''}

<div class="signature">
  <p>— Steve</p>
</div>
`;

  return baseWrapper(content, vars.subscriber_id || 'preview');
}

function renderNotification(vars: TemplateVariables): string {
  const content = `
<p>Hey,</p>

<p>${vars.intro_text || 'Quick update for you.'}</p>

${vars.announcement_body || ''}

${vars.cta_text && vars.cta_url ? `
<p>
  <a href="${vars.cta_url}" class="cta-button">${vars.cta_text}</a>
</p>
` : ''}

<div class="signature">
  <p>— Steve</p>
</div>
`;

  return baseWrapper(content, vars.subscriber_id || 'preview');
}

function renderDigest(vars: TemplateVariables): string {
  const content = `
<p>Hey,</p>

<p>${vars.intro_text || 'Here\'s what you might have missed:'}</p>

${vars.announcement_body || ''}

<div class="highlight">
  ${vars.quick_win ? `<p>${vars.quick_win}</p>` : ''}
</div>

${vars.cta_text && vars.cta_url ? `
<p style="text-align: center;">
  <a href="${vars.cta_url}" class="cta-button">${vars.cta_text}</a>
</p>
` : ''}

<div class="signature">
  <p>See you next week,<br><strong>Steve</strong></p>
</div>
`;

  return baseWrapper(content, vars.subscriber_id || 'preview');
}

const renderers: Record<string, (vars: TemplateVariables) => string> = {
  weekly_issue: renderWeeklyIssue,
  announcement: renderAnnouncement,
  notification: renderNotification,
  digest: renderDigest,
};

// CLI Commands
function listTemplates(): void {
  console.log('\n=== Available Email Templates ===\n');

  for (const [key, config] of Object.entries(templateConfigs)) {
    console.log(`${key}`);
    console.log(`  Name: ${config.name}`);
    console.log(`  Description: ${config.description}`);
    console.log(`  Required: ${config.requiredFields.join(', ')}`);
    console.log(`  Optional: ${config.optionalFields.join(', ')}`);
    console.log('');
  }
}

function previewTemplate(templateName: string): void {
  const config = templateConfigs[templateName];
  if (!config) {
    console.error(`Unknown template: ${templateName}`);
    console.error(`Available: ${Object.keys(templateConfigs).join(', ')}`);
    process.exit(1);
  }

  const renderer = renderers[templateName];
  const html = renderer(config.sampleData);

  // Write preview to file
  const previewDir = path.join(__dirname, '..', 'previews');
  if (!fs.existsSync(previewDir)) {
    fs.mkdirSync(previewDir, { recursive: true });
  }

  const previewPath = path.join(previewDir, `${templateName}-preview.html`);
  fs.writeFileSync(previewPath, html);

  console.log(`\nPreview generated: ${previewPath}`);
  console.log(`Open in browser to view.\n`);

  // Also output sample JSON
  const jsonPath = path.join(previewDir, `${templateName}-sample.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(config.sampleData, null, 2));
  console.log(`Sample data JSON: ${jsonPath}\n`);
}

function buildTemplate(templateName: string, jsonFile: string): void {
  const config = templateConfigs[templateName];
  if (!config) {
    console.error(`Unknown template: ${templateName}`);
    process.exit(1);
  }

  if (!fs.existsSync(jsonFile)) {
    console.error(`JSON file not found: ${jsonFile}`);
    process.exit(1);
  }

  const data: TemplateVariables = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
  const renderer = renderers[templateName];
  const html = renderer(data);

  const outputPath = jsonFile.replace('.json', '.html');
  fs.writeFileSync(outputPath, html);

  console.log(`\nBuilt template: ${outputPath}\n`);
}

function validateTemplate(templateName: string): void {
  const config = templateConfigs[templateName];
  if (!config) {
    console.error(`Unknown template: ${templateName}`);
    process.exit(1);
  }

  console.log(`\n=== Validation for ${config.name} ===\n`);
  console.log('Required fields:');
  for (const field of config.requiredFields) {
    console.log(`  - ${field}: ${typeof config.sampleData[field] === 'string' ? 'string' : 'number'}`);
  }
  console.log('\nOptional fields:');
  for (const field of config.optionalFields) {
    console.log(`  - ${field}: ${typeof config.sampleData[field] === 'string' ? 'string' : 'number'}`);
  }
  console.log('\nSample subject line:');
  console.log(`  "${config.sampleData.subject_line || `AI Prod Weekly Issue #${config.sampleData.issue_number || 'N'}`}"`);
  console.log('');
}

function generateIssueTemplate(issueNumber: number): void {
  const templateData: TemplateVariables = {
    issue_number: issueNumber,
    subject_line: `Issue #${issueNumber}: [AUTOMATION_TITLE] - AI Prod Weekly`,
    intro_text: 'Happy Thursday!',
    automation_title: '[TITLE]',
    automation_problem: '[DESCRIBE THE PROBLEM]',
    automation_solution: '[DESCRIBE THE SOLUTION]',
    automation_steps: `<ol>
<li>[STEP 1]</li>
<li>[STEP 2]</li>
<li>[STEP 3]</li>
<li>[STEP 4]</li>
</ol>`,
    automation_time_to_implement: '[X] minutes',
    automation_time_saved: '[X] hours/week',
    ai_insight_title: '[INSIGHT TITLE]',
    ai_insight_content: '<p>[INSIGHT CONTENT]</p>',
    tool_name: '[TOOL NAME]',
    tool_description: '[TOOL DESCRIPTION]',
    tool_url: 'https://[TOOL_URL]',
    quick_win: '[QUICK WIN DESCRIPTION]',
    next_week_teaser: 'Next week: [TEASER]',
    ps_text: '[OPTIONAL PS]',
    subscriber_id: '{{subscriber_id}}',
  };

  const issuesDir = path.join(__dirname, '..', 'issues');
  if (!fs.existsSync(issuesDir)) {
    fs.mkdirSync(issuesDir, { recursive: true });
  }

  const outputPath = path.join(issuesDir, `issue-${String(issueNumber).padStart(3, '0')}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(templateData, null, 2));

  console.log(`\nIssue template created: ${outputPath}`);
  console.log('Edit this file and then run:');
  console.log(`  npx ts-node scripts/template-builder.ts build weekly_issue ${outputPath}\n`);
}

// Main CLI
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'list':
    listTemplates();
    break;

  case 'preview':
    if (!args[1]) {
      console.error('Usage: template-builder.ts preview <template_name>');
      process.exit(1);
    }
    previewTemplate(args[1]);
    break;

  case 'build':
    if (!args[1] || !args[2]) {
      console.error('Usage: template-builder.ts build <template_name> <json_file>');
      process.exit(1);
    }
    buildTemplate(args[1], args[2]);
    break;

  case 'validate':
    if (!args[1]) {
      console.error('Usage: template-builder.ts validate <template_name>');
      process.exit(1);
    }
    validateTemplate(args[1]);
    break;

  case 'new-issue':
    if (!args[1]) {
      console.error('Usage: template-builder.ts new-issue <issue_number>');
      process.exit(1);
    }
    generateIssueTemplate(parseInt(args[1], 10));
    break;

  default:
    console.log(`
Email Template Builder

Commands:
  list                          List all available templates
  preview <template>            Generate HTML preview with sample data
  build <template> <json>       Build HTML from JSON data file
  validate <template>           Show required/optional fields
  new-issue <number>            Create a new issue JSON template

Examples:
  npx ts-node scripts/template-builder.ts list
  npx ts-node scripts/template-builder.ts preview weekly_issue
  npx ts-node scripts/template-builder.ts build weekly_issue issues/issue-018.json
  npx ts-node scripts/template-builder.ts new-issue 19
`);
}
