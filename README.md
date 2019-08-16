# Node.js GraphQL server template

Instal dependencies::

```bash
yarn # or npm install
```

Rename `.env.example` to `.env` and insert your credentials.

Start develepment server:

```bash
yarn dev # or npm run dev
```

Compile production build:

```bash
yarn prod # or npm run prod
```

Debugger configuration for VS Code:

__.vscode/launch.json__

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Typescript Server",
      "protocol": "inspector",
      "port": 9229,
      "restart": true,
      "cwd": "${workspaceRoot}"
    }
  ]
}
```
