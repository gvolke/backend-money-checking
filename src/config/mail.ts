interface IMailConfig {
  driver: "ethereal" | "ses";

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "ethereal",

  defaults: {
    from: {
      email: "gustavo.gostack@gmail.com",
      name: "Gustavo do Money Checking",
    },
  },
} as IMailConfig;
