import path from 'node:path';
import { EmailColors } from './EmailColors.js';
import type { Attachment } from 'nodemailer/lib/mailer/index.js';
import { Env } from '@utils';

export type BaseTemplateOptions = {
  title: string;
  content: string;
  ctaLabel?: string;
  ctaUrl?: string;
  footerNote?: string;
};

export class BaseEmailTemplate {
  protected projectName = 'Isabella Cáster';

  protected sanitize(value?: string) {
    if (!value) return '';
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  protected getLogoAttachment(): Attachment {
    const logoPath = path.join(Env.getBackendPath(), 'src', 'assets', 'logo.png');

    return {
      cid: 'logo',
      filename: 'logo.png',
      path: logoPath,
    };
  }

  protected renderCTA(label: string, url: string) {
    return `
<tr>
<td align="center" style="padding: 24px;">
  <a href="${this.sanitize(url)}"
     style="
       display:inline-block;
       padding:14px 28px;
       background:${EmailColors.accent};
       color:#ffffff;
       text-decoration:none;
       font-family: Arial, sans-serif;
       font-size:14px;
       font-weight:bold;
       border-radius:4px;
     ">
    ${this.sanitize(label)}
  </a>
</td>
</tr>
`;
  }

  build(options: BaseTemplateOptions) {
    const { title, content, ctaLabel, ctaUrl, footerNote } = options;

    const ctaSection = ctaLabel && ctaUrl ? this.renderCTA(ctaLabel, ctaUrl) : '';

    const template = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<style>
  @media only screen and (max-width: 480px) {
    .email-card { width: 100% !important; }
    .otp-cell { font-size: 28px !important; letter-spacing: 6px !important; }
  }
</style>
</head>

<body style="margin:0; padding:0; background:${EmailColors.background};">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 16px;">

<table width="100%" cellpadding="0" cellspacing="0"
       style="max-width:600px; background:${EmailColors.card};">

<tr>
<td align="center"
    style="
      padding:32px;
      background:${EmailColors.headerBg};
      border-bottom:1px solid ${EmailColors.border};
      font-family: Georgia, serif;
      font-size:24px;
      letter-spacing:2px;
      color:${EmailColors.primaryText};
    ">
<img src="cid:logo" width="40" alt="Isabella Cáster logo"
     style="display:block; margin-bottom:12px;" />
${this.projectName}
</td>
</tr>

<tr>
<td align="center"
    style="
      padding:32px 24px 16px 24px;
      font-family: Georgia, serif;
      font-size:18px;
      color:${EmailColors.accent};
    ">
${this.sanitize(title)}
</td>
</tr>

<tr>
<td align="center"
    style="
      padding:0 32px 24px 32px;
      font-family: Arial, sans-serif;
      font-size:14px;
      line-height:22px;
      color:${EmailColors.primaryText};
    ">
${content}
</td>
</tr>

${ctaSection}

<tr>
<td align="center"
    style="
      padding:24px;
      font-family: Arial, sans-serif;
      font-size:11px;
      color:${EmailColors.secondaryText};
      border-top:1px solid ${EmailColors.border};
    ">
${this.sanitize(footerNote || `Feito com carinho pela equipe ${this.projectName}`)}
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>
`;

    return {
      template,
      attachments: [this.getLogoAttachment()],
    };
  }
}
