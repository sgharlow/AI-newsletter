// Email templates for AI Prod Weekly broadcasts

export interface TemplateVariables {
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

// Base wrapper with consistent styling
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
    .code-block {
      background: #1a1a1a;
      color: #e5e5e5;
      padding: 15px 20px;
      border-radius: 6px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 13px;
      overflow-x: auto;
      margin: 15px 0;
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
    strong {
      font-weight: 600;
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

// Weekly issue template (main newsletter format)
export function weeklyIssueTemplate(vars: TemplateVariables): string {
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

  return baseWrapper(content, vars.subscriber_id || '{{subscriber_id}}');
}

// Announcement template (product launches, updates)
export function announcementTemplate(vars: TemplateVariables): string {
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

  return baseWrapper(content, vars.subscriber_id || '{{subscriber_id}}');
}

// Simple notification template (quick updates)
export function notificationTemplate(vars: TemplateVariables): string {
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

  return baseWrapper(content, vars.subscriber_id || '{{subscriber_id}}');
}

// Digest template (multi-item summary)
export function digestTemplate(vars: TemplateVariables): string {
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

  return baseWrapper(content, vars.subscriber_id || '{{subscriber_id}}');
}

// Template registry
export const templates: Record<string, (vars: TemplateVariables) => string> = {
  weekly_issue: weeklyIssueTemplate,
  announcement: announcementTemplate,
  notification: notificationTemplate,
  digest: digestTemplate,
};

// Get available template names
export function getTemplateNames(): string[] {
  return Object.keys(templates);
}

// Render a template by name
export function renderTemplate(
  templateName: string,
  variables: TemplateVariables
): string {
  const templateFn = templates[templateName];
  if (!templateFn) {
    throw new Error(
      `Unknown template: ${templateName}. Available: ${getTemplateNames().join(', ')}`
    );
  }
  return templateFn(variables);
}
