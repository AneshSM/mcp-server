import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Example tool implementation
server.tool(
  "example",
  "An example tool that echoes back the input",
  {
    message: z.string().describe("Message to echo back"),
  },
  async ({ message }) => {
    return {
      content: [
        {
          type: "text",
          text: `Echo: ${message}`,
        },
      ],
    };
  }
);

// Main function to run the server
async function main() {
  // Use StdioServerTransport for Claude Desktop compatibility
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio"); // Use stderr for logging
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
