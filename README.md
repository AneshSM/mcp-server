# MCP Server & Client Integration

This repository implements a Model Context Protocol (MCP) server and client using Node.js and TypeScript, demonstrating how to create AI-enabled applications with structured tool access and data integration.

## 🎯 What is Model Context Protocol (MCP)?

- **Standardized protocol** for AI applications to access external data and tools
- **JSON-RPC based** communication between clients and servers
- **Enables AI models** to interact with databases, APIs, and other resources
- **Secure and structured** way to extend AI capabilities

## 🏗️ Project Structure

```
mcp-server_client/
├── src/
│   ├── server.ts          # MCP Server implementation
│   ├── client.ts          # MCP Client with AI integration
│   └── data/
│       └── users.json     # Sample data storage
├── build/                 # Compiled JavaScript output
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── MCP_Integration_Presentation.md  # Detailed presentation
```

## 🔧 Technology Stack

### Core Dependencies

- **@modelcontextprotocol/sdk** - Official MCP SDK
- **TypeScript** - Type safety and modern JavaScript
- **Node.js** - Runtime environment with ES modules
- **Zod** - Schema validation for tool parameters

### AI Integration

- **@ai-sdk/google** - Google Gemini AI integration
- **ai** - AI SDK for tool execution
- **@inquirer/prompts** - Interactive CLI prompts
- **tsx** - Development runtime for TypeScript

## 🚀 Quick Start

### 1. Installation

```powershell
npm install
```

### 2. Environment Setup

Create a `.env` file with your API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Development Workflow

```powershell
# Build TypeScript
npm run build

# Run server in development mode
npm run server:dev

# Run client (in another terminal)
npm run client:dev

# Debug with MCP inspector
npm run server:inspect
```

## 📡 Available Capabilities

### 🛠️ Tools

- **example** - Echo tool for testing MCP functionality
- **create-user** - Create new users with validation
- **create-random-user** - Generate users with AI assistance

### 📚 Resources

- **users://all** - Retrieve all users from the database
- **users://{userId}/profile** - Get specific user details

### 💭 Prompts

- **generate-dummy-user** - AI prompt for user profile generation

## 🔄 How It Works

### Server-Client Flow

```
User Input → Client → AI Model → Tool Selection → MCP Server → Data Storage
     ↑                                                            ↓
Response ← Client ← AI Processing ← Tool Response ← MCP Server ← Data Retrieval
```

### Example Interaction

1. User: "Create a user named John Doe"
2. Client sends query to Gemini AI
3. AI selects `create-user` tool
4. MCP server validates and stores user data
5. Response returned to user

## 🛠️ Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run build:watch` - Watch mode compilation
- `npm run server:dev` - Start development server with auto-reload
- `npm run server:inspect` - Start server with MCP inspector
- `npm run client:dev` - Run interactive client
- `npm run client:start` - Run compiled client

## 🔍 Development Tools

### MCP Inspector

The inspector provides a web interface for:

- Interactive tool testing
- JSON-RPC message inspection
- Protocol compliance validation
- Real-time debugging

Access via: `npm run server:inspect`

### Client Interface

The client offers multiple interaction modes:

- **Query** - Natural language AI-powered queries
- **Tools** - Direct tool execution with parameter input
- **Resources** - Data access and retrieval
- **Prompts** - AI prompt generation and execution

## 🎯 Claude Desktop Integration

Configure Claude Desktop to use your MCP server:

```json
// %APPDATA%\Claude\claude_desktop_config.json
{
  "mcpServers": {
    "mcp-server": {
      "command": "node",
      "args": ["C:\\path\\to\\your\\project\\build\\server.js"]
    }
  }
}
```

## 🛡️ Security & Best Practices

- ✅ **Input validation** with Zod schemas
- ✅ **Error handling** with comprehensive try-catch blocks
- ✅ **Type safety** throughout the application
- ✅ **API key management** with environment variables
- ✅ **Structured logging** (stderr for logs, stdout for protocol)

## 📚 Key Features

### AI-Powered Operations

- Natural language to tool execution
- Context-aware responses
- Multi-step reasoning capabilities

### Type-Safe Development

- Full TypeScript integration
- Schema validation for all inputs
- Compile-time error checking

### Extensible Architecture

- Easy addition of new tools
- Flexible resource definitions
- Modular prompt system

## 🔮 Extension Examples

Add new tools easily:

```typescript
server.tool(
  "custom-tool",
  "Description of your tool",
  {
    param: z.string().describe("Parameter description"),
  },
  async ({ param }) => {
    // Your tool logic here
    return { content: [{ type: "text", text: "Result" }] };
  }
);
```

## 📖 Documentation

For a comprehensive guide including architecture details, advanced features, and integration patterns, see:

- **[MCP Integration Presentation](./MCP_Integration_Presentation.md)** - Complete technical presentation

## 🔗 Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Server Quickstart Guide](https://modelcontextprotocol.io/quickstart/server#node)
- [Claude Desktop Download](https://claude.ai/download)
- [MCP Inspector Tool](https://github.com/modelcontextprotocol/inspector)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your enhancements
4. Test with MCP inspector
5. Submit a pull request

## 📄 License

ISC License - see package.json for details

---

_Built with using Model Context Protocol_
