module.exports = {
  apps: [
    {
      name: 'texto-voz',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3003, // Aquí defines el puerto
      },
    },
  ],
}
