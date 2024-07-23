import md5 from "md5";
import { isEmail } from "validator";
import wrap from "word-wrap";

export default ({ query }, response) =>
  response.end(
    use.texts(
      isEmail(query.email, { ignore_max_length: true })
        ? {
            "Visual Studio Code": [
              "1. Open VS Code and ensure you have Monokai Pro installed",
              "2. Press [Ctrl + Shift + P] to open the command palette",
              "3. [Search] for Monokai Pro and select the option [Monokai Pro: enter license]",
              "4. Follow the prompts on-screen to enter your email and license key",
              " ",
              query.email,
              use.licenseKey(
                `fd330f6f-3f41-421d-9fe5-de742d0c54c0${query.email}`
              ),
              " ",
              "5. You will finally see a thank you pop-up message. You are now running an activated theme",
            ],
            "Sublime Text": [
              "1. Open ST and ensure you have Monokai Pro installed",
              "2. Open up the user preferences for the theme [Preferences > Package Settings > Theme - Monokai Pro > Settings - User]",
              "3. Copy this text into the file, with the placeholder values changed appropriately:",
              `
  
{
  "email": "${query.email}",
  "license_key": "${use.licenseKey(query.email)}"
}
  `,
              "4. Save the file and restart ST, and you should see a thank you pop-up message. You are now running an activated theme",
            ],
          }
        : { "Invalid email": [query.email] }
    )
  );

const use = {
  texts: (texts) =>
    Object.entries({
      ...texts,
      "Usage && Footer": [
        "https://monokai-pro-keygen.vercel.app/api/keygen/YOUR_EMAIL_ADDRESS@EXAMPLE.COM",
        " ",
        "Please consider supporting the original author (Wimer Hazenberg) of this fully compatible and well-maintained editor theme, which is one of the best we have for VS Code and Sublime Text. Buying a license would help ensure its continued availability and functionality. Thank you!".toUpperCase(),
        " ",
        "https://github.com/phatdev-hehe/monokai-pro-keygen".toUpperCase(),
        " ",
        String(new Date()).toUpperCase(),
      ],
    })
      .map(([title, texts]) =>
        wrap(
          texts
            .map((text, index) =>
              index === 0 ? `${title.toUpperCase()}\n^\n${text}` : text
            )
            .join("\n"),
          { cut: true, width: 100 }
        )
      )
      .join("\n".repeat(3)),
  licenseKey: (email) =>
    md5(email)
      .substring(0, 25)
      .match(/.{1,5}/g)
      .join("-"),
};
