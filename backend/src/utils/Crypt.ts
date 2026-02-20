import bcrypt from 'bcrypt';

class Crypt {
  async encrypt(text: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(text, saltRounds);
    return hash;
  }
  async isValid(plainText: string, encryptedText: string): Promise<boolean> {
    const isValid = await bcrypt.compare(plainText, encryptedText);
    return isValid;
  }
}

export default new Crypt();
