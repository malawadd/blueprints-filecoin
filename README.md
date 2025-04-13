
# 🌐 Twazi – Visual AI & Web3 Workflows, Made Simple

**Twazi** is a next-generation platform for designing and executing AI-powered workflows that integrate seamlessly with Web3 technologies. Built with a visual-first experience, Tawzi lets users automate complex actions—like token swaps, smart contract interactions, data scraping, and AI-based reasoning—without writing a single line of backend code.

Whether you're building decentralized apps, processing data with LLMs, or storing insights on Filecoin, Tawzi gives you the tools to **create, connect, and automate** everything in one place.

---


## ⚙️ Getting Started with Tawzi

Follow these steps to run Tawzi locally and start building your own AI + Web3 workflows.

---

### 📦 1. Clone the Repo

```bash
git clone hhttps://github.com/malawadd/blueprints-filecoin
cd tawzi/client
```

---

### 📁 2. Create Your Environment File

Copy the example and fill in your secrets:

```bash
cp .env.example .env
```

Fill in the `.env` file with the required keys, for example:

```env
# Required by OnchainKit for wallet connections
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key

# Local SQLite database path
DATABASE_URL="file:./dev.db"

# Secret used for verifying webhook payloads (optional for now)
API_SECRET=your_api_secret_here

# Used for AES-256 encryption of credentials
ENCRYPTION_KEY=your_32_byte_hex_key

```

Generate the encryption key using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 🧰 3. Install Dependencies

```bash
npm install
# or
yarn
```

---

### 🔧 4. Set Up the Database

Use Prisma to generate the client and run migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

If it's your first time setting up, you can also seed your database manually or via a custom seeding script if needed.

---

### 🚀 5. Run the App

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to see Tawzi in action.

---

### 🐳 Optional: Run with Docker

Make sure Docker is installed, then run:

```bash
docker-compose up --build
```

This will:
- Install dependencies
- Build the app
- Run Prisma migrations
- Start the server on your specified port

----


## 🔒 Security & Credential Encryption

The platform ensures all sensitive information like API keys, private keys, and tokens are **securely encrypted** before being stored in the database.

### 🔐 How Credential Encryption Works

- Credentials are encrypted using **AES-256** symmetric encryption.
- The encryption is handled server-side using the logic in `lib/encryption.ts`.
- A secret key, `ENCRYPTION_SECRET`, is used for both encryption and decryption.
- This secret is **never exposed to the client** and must be manually set in your environment file (`.env`).



## 🧩 Available Tasks & Executors

Workflows are made up of modular **tasks**, each with a corresponding **executor**. These executors define how the task is run, often using AI or interacting with APIs/blockchains.


### 🧠 AI & Browser Tasks

| Task | Description |
|------|-------------|
| [**LaunchBrowser**](./client/lib/workflow/task/LaunchBrowser.tsx) | Opens a headless Chromium instance using Puppeteer. |
| [**PageToHtml**](./client/lib/workflow/task/PageToHtml.tsx) | Converts the loaded browser page into raw HTML. |
| [**ExtractTextFromElement**](./client/lib/workflow/task/ExtractTextFromElement.tsx) | Extracts inner text from a selected DOM element (CSS selector). |
| [**ExtractDataWithAI**](./client/lib/workflow/task/ExtractDataWithAI.tsx) | Parses HTML or text using OpenAI to extract structured data. |
| [**ReasoningLLM**](./client/lib/workflow/task/ReasoningLLMTask.tsx) | Performs general-purpose AI reasoning using OpenAI/Groq/etc. |

### 🔐 Credential & Storage Tasks

| Task | Description |
|------|-------------|
| [**CreateRecallBucket**](./client/lib/workflow/task/CreateRecallBucketTask.tsx) | Creates a Filecoin storage bucket to persist AI output. |
| [**StoreAIOutputInBucket**](./client/lib/workflow/task/StoreAIOutputInBucketTask.tsx) | Saves extracted or generated data into a Recall bucket. |

### 🔄 Web3 & Automation Tasks

| Task | Description |
|------|-------------|
| [**SmartContractInteraction**](./client/lib/workflow/task/SmartContractInteractionTask.tsx) | Invokes a contract method on-chain (e.g. send tx or read). |
| [**AgentKitSwap**](./client/lib/workflow/task/AgentKitSwapTask.tsx) | Swaps tokens using Coinbase’s AgentKit (via smart contract). |


Each task can be dragged into a workflow, connected with inputs/outputs, and executed manually or on a schedule. You can pass in dynamic parameters or link them to stored credentials.

> 🧠 Tasks are defined in `lib/workflow/task/`, while their runtime logic is implemented in `lib/workflow/executor/`.
