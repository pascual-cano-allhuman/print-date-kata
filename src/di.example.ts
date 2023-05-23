// @ts-ignore
import emailSDK from "@sendgrid/mail";
// @ts-ignore
import dbSDK from "firebase-admin";

interface IEmailManager {
  sendEmail(email: string, subject: string, html: string): Promise<void>;
}

interface IDatabaseManager {
  getUserEmail(userId: string): Promise<string>;
}

/**
 * Send email to user
 */
export class EmailSender {
  emailManager: IEmailManager;
  databaseManager: IDatabaseManager;

  constructor(emailManager: IEmailManager, databaseManager: IDatabaseManager) {
    this.emailManager = emailManager;
    this.databaseManager = databaseManager;
  }

  async sendEmailToUser(userId: string, subject: string, html: string) {
    const email = await this.databaseManager.getUserEmail(userId);
    await this.emailManager.sendEmail(email, subject, html);
  }
}

/**
 * Email sender
 */
export class EmailManager implements IEmailManager {
  async sendEmail(email: string, subject: string, html: string) {
    const msg = {
      to: email,
      from: "pascual@allhuman.com",
      subject,
      html,
    };
    await emailSDK.send(msg);
  }
}

export class EmailManagerFake implements IEmailManager {
  async sendEmail(email: string, subject: string, html: string) {
    console.log(`Sending email to ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${html}`);
  }
}

/**
 * Database manager
 */
export class DatabaseManager implements IDatabaseManager {
  async getUserEmail(userId: string): Promise<string> {
    const user = await dbSDK.firestore().collection("users").doc(userId).get();
    return user.get("email");
  }
}

export class DatabaseManagerFake implements IDatabaseManager {
  async getUserEmail(userId: string): Promise<string> {
    return "pascual@allhuman.com";
  }
}

/**
 * export default
 */
const emailSender = new EmailSender(new EmailManager(), new DatabaseManager());
const emailSenderFake = new EmailSender(new EmailManagerFake(), new DatabaseManagerFake());
export default process.env.NODE_ENV === "production" ? emailSender : emailSenderFake;
