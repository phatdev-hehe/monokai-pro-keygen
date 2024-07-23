export default {
  redirects: async () => [
    {
      source: "/",
      destination: "/api/keygen/YOUR_EMAIL_ADDRESS@EXAMPLE.COM",
      permanent: true,
    },
  ],
};
