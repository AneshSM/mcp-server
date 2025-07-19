import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "node:fs/promises";
import { text } from "node:stream/consumers";
import { CreateMessageResultSchema } from "@modelcontextprotocol/sdk/types.js";
// Create server instance
const server = new McpServer({
  name: "mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
    prompts: {},
  },
});

// Example tool implementation
server.tool(
  "example",
  "An example tool that echoes back the input",
  {
    message: z.string().describe("Message to echo back"),
  },
  {
    title: "Example tool to echo back the message",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: false,
  },
  async ({ message }) => {
    try {
      return {
        content: [
          {
            type: "text",
            text: `Echo: ${message}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to echo back the message",
          },
        ],
      };
    }
  }
);

// Resources
server.resource(
  "users",
  "users://all",
  {
    description: "Get all users data from the database",
    title: "Users",
    mimeType: "application/json",
  },
  async (uri) => {
    try {
      const users = await getUsers();
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(users),
            mimeType: "application/json",
          },
        ],
      };
    } catch (error) {
      return {
        contents: [
          {
            uri: uri.href,
            text: "Failed to retrieve users data list",
            mimeType: "text/plain",
          },
        ],
      };
    }
  }
);
// Resource template
server.resource(
  "user-details",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  {
    description: "Get a user details from the database",
    title: "User detail",
    mimeType: "application/json",
  },
  async (uri, { userId }) => {
    try {
      const users = await getUsers();
      const user = users.find((u) => u.id === parseInt(userId as string));
      if (user === null) {
        return {
          contents: [
            {
              uri: uri.href,
              text: "User doesn't exists",
              mimeType: "text/plain",
            },
          ],
        };
      }
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(user),
            mimeType: "application/json",
          },
        ],
      };
    } catch (error) {
      return {
        contents: [
          {
            uri: uri.href,
            text: "Failed to retrieve user details",
            mimeType: "text/plain",
          },
        ],
      };
    }
  }
);

// Tools
server.tool(
  "create-user",
  "Create a new user in the database",
  {
    name: z.string().describe("User's name"),
    email: z.string().describe("User's email"),
    address: z.string().describe("User's address"),
    phone: z.string().describe("User's phone number"),
  },
  {
    title: "Create user",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async (params) => {
    try {
      const id = await createUser(params);
      return {
        content: [{ type: "text", text: `User ${id} created successfully` }],
      };
    } catch (error) {
      return { content: [{ type: "text", text: "Failed to save a user" }] };
    }
  }
);

server.tool(
  "create-random-user",
  "Create a random user with fake data",
  {
    title: "Create random user",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async () => {
    // Generate a prompt for creating a random user
    const prompt = {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "Generate a random user profile with realistic name, email, address, and phone number. Only output the user data in JSON format.",
          },
        },
      ],
      maxTokens: 1024,
    };
    // Use the server's prompt system to generate the user
    const response = await server.server.request(
      {
        method: "sampling/createMessage",
        params: prompt,
      },
      CreateMessageResultSchema
    );
    if (response.content.type !== "text")
      return {
        content: [{ type: "text", text: "Failed to generate the user data" }],
      };
    try {
      const fakeUser = JSON.parse(
        response.content.text
          .trim()
          .replace(/^```json/, "")
          .replace(/```$/, "")
      );
      const id = await createUser(fakeUser);
      return {
        content: [{ type: "text", text: `User ${id} created successfully` }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: "Failed to generate the user data" }],
      };
    }
  }
);

// Prompts
server.prompt(
  "generate-dummy-user",
  "Generate a dummy user based on a given name",
  {
    name: z.string().describe("User name"),
  },
  async ({ name }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Only Generate a dummy user profile for the name "${name}". Include realistic email, address, and phone number.`,
          },
        },
      ],
    };
  }
);

// Handlers
// Get Users
async function getUsers() {
  return await import("./data/users.json", {
    with: { type: "json" },
  }).then((m) => m.default);
}

// User creation
async function createUser(user: {
  name: string;
  email: string;
  address: string;
  phone: string;
}) {
  const users = await getUsers();

  const id = users.length + 1;
  users.push({ id, ...user });

  await fs.writeFile("./src/data/users.json", JSON.stringify(users, null, 2));

  return id;
}

// Main function to run the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
