# mcp-server

This repository implements a Model Context Protocol (MCP) server using Node.js and TypeScript, following the official [MCP documentation](https://modelcontextprotocol.io/quickstart/server#node).

## Project Structure

- `src/` — Source code for the MCP server
- `build/` — Compiled JavaScript output
- `.github/copilot-instructions.md` — AI agent guidance and project conventions
- `tsconfig.json` — ES modules TypeScript configuration
- `package.json` — Project configuration and scripts

## Technology Stack

- Node.js with ES modules
- TypeScript for type safety
- `tsx` for development runtime
- MCP SDK for protocol implementation
- Zod for schema validation

## Getting Started

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Development mode with auto-reload:

   ```powershell
   npm run server:dev
   ```

3. For production:

   ```powershell
   npm run server:build
   npm run server:start
   ```

4. Inspect and debug the server:
   ```powershell
   npm run server:inspect
   ```
   This runs the server with the MCP inspector tool, allowing you to test and debug your MCP implementation.

## Development Tools

### Available Scripts

- `npm run server:dev` - Start development server with auto-reload using tsx
- `npm run server:build` - Build TypeScript code to JavaScript
- `npm run server:start` - Run the built server
- `npm run server:inspect` - Start server with MCP inspector enabled

### MCP Inspector

The inspector tool provides a development interface for:

- Testing MCP tools interactively
- Inspecting JSON-RPC messages
- Verifying protocol compliance
- Debugging tool implementations

To use the inspector, run `npm run server:inspect` and open the provided URL in your browser.

### Claude Desktop Integration

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

## Development Conventions

- Use TypeScript with ES modules for all source files
- Keep tools in separate modules under `src/tools/`
- Use Zod schemas for tool parameters validation
- Use `console.error()` for logging (stdout is reserved for MCP protocol messages)
- Document architectural decisions in `.github/copilot-instructions.md`

## MCP Tools

Currently implemented tools:

- `example` - A basic tool that echoes back the input message

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Server Quickstart Guide](https://modelcontextprotocol.io/quickstart/server#node)
- [Claude Desktop Download](https://claude.ai/download)
- [MCP Debugging Guide](https://modelcontextprotocol.io/docs/tools/debugging)
