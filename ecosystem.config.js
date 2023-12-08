module.exports = {
  apps: [
    {
      name: 'skf',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3003, // Aquí defines el puerto
      },
    },
  ],
}
