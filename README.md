# mcp-server

This repository implements a Model Context Protocol (MCP) server using Node.js and TypeScript, following the official [MCP documentation](https://modelcontextprotocol.io/quickstart/server#node).

## Project Structure

- `src/` — Source code for the MCP server
- `build/` — Compiled JavaScript output
- `.github/copilot-instructions.md` — AI agent guidance and project conventions
- `tsconfig.json` — TypeScript configuration for ES modules

## Getting Started

1. Install dependencies (after initializing `package.json`):
   ```powershell
   npm install
   ```
2. Development mode with auto-reload:

   ```powershell
   npm run dev
   ```

3. For production:
   ```powershell
   npm run build
   npm start
   ```

## Integration with Claude Desktop

1. Install [Claude Desktop](https://claude.ai/download)
2. Create/edit configuration at `%APPDATA%\Claude\claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "mcp-server": {
         "command": "node",
         "args": ["<ABSOLUTE_PATH_TO_PROJECT>/build/index.js"]
       }
     }
   }
   ```
3. Restart Claude Desktop

## Conventions

- Use TypeScript and ES modules for all source files in `src/`
- Use `console.error()` for logging (stdout is reserved for MCP protocol messages)
- Document architectural decisions in `.github/copilot-instructions.md`

## MCP Tools

Currently implemented tools:

- `example` - A basic tool that echoes back the input message

---

For MCP protocol details, see: [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
