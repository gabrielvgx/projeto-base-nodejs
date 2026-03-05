import fs from 'node:fs';
import { DebugController } from '@controllers';
import { Router, type Application } from 'express';
import { DebugValidation } from '@validations';
import { Env, ResponseUtil } from '@utils';
import { google } from 'googleapis';
import { AppError } from '@error';
import path from 'node:path';

// 🔐 CONFIG
const EMAIL = Env.get('MAIL_FROM');
const CLIENT_ID = Env.get('MAIL_ID');
const CLIENT_SECRET = Env.get('MAIL_SECRET');
const REDIRECT_URI = `http://localhost:${Env.get('SRV_PORT') || 3000}/debug/gmail/oauth2callback`;

// OAuth2 Client

class DebugRoute {
  register(app: Application) {
    if (!Env.isDevelopment()) return;
    const router = Router();
    router.post('/send-mail', DebugValidation.sendMail(), async (req, res) => {
      await DebugController.sendMail(req.body);
      ResponseUtil.handleSuccess(res);
    });
    router.get('/gmail/oauth2', (_req, res) => {
      const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://mail.google.com/'],
      });

      res.send(`<a href="${authUrl}">Autenticar com Google</a>`);
    });
    router.get('/gmail/oauth2callback', async (req, res) => {
      const code = req.query.code;

      try {
        if (!code || typeof code !== 'string')
          throw new AppError('Invalid token received', 500);
        const oAuth2Client = new google.auth.OAuth2(
          CLIENT_ID,
          CLIENT_SECRET,
          REDIRECT_URI,
        );
        const result = await oAuth2Client.getToken(code);
        if (result) {
          oAuth2Client.setCredentials(result.tokens);
          result.tokens.refresh_token;
          if (result.tokens.refresh_token) {
            fs.writeFileSync(
              path.join(Env.getTempDir(), 'refresh_token.json'),
              JSON.stringify(result.tokens),
            );
          }
        }

        // Salva refresh_token

        res.send('Autenticado com sucesso! Refresh token salvo.');
      } catch (err) {
        console.error(err);
        res.send('Erro ao autenticar');
      }
    });
    app.use('/debug', router);
  }
}

const instance = new DebugRoute();
export { instance as DebugRoute };
export default instance;
