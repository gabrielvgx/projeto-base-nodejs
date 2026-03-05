import { BaseEmailTemplate } from './BaseEmailTemplate.js';
import { EmailColors } from './EmailColors.js';

class OTPTemplate extends BaseEmailTemplate {
  buildOTP(otp: string) {
    const otpBlock = `
<table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
  <tr>
    <td align="center" style="
      padding: 20px 40px;
      border: 1px solid ${EmailColors.border};
      font-family: Georgia, serif;
      font-size: 40px;
      letter-spacing: 12px;
      color: ${EmailColors.accent};
      background: #ffffff;
      border-radius: 4px;
    ">
      ${this.sanitize(otp)}
    </td>
  </tr>
</table>
`;

    return super.build({
      title: `${otp} - Código de verificação`,
      content: `
  Utilize o código abaixo para acessar sua conta.<br/><br/>
  ${otpBlock}
  <br/>
  <span style="font-size:12px; color:${EmailColors.secondaryText};">
    Este código expira em <strong>10 minutos</strong>.
  </span>
`,
      footerNote: `Se você não solicitou este código, ignore este e-mail. Feito com carinho pela equipe ${this.projectName}.`,
    });
  }
}

const instance = new OTPTemplate();
export { instance as OTPTemplate };
export default instance;
