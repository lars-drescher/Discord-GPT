import { Client } from 'discord.js'
import 'dotenv/config'
import { Configuration, OpenAIApi } from 'openai'

// Import all commands
import { gptCommand } from './commands/gptCommand.js'

// OpenAI Client initialization
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_TOKEN
})
const openai = new OpenAIApi(configuration)

// Discord JS Client initialization
const client = new Client({
  intents: [1, 2, 4, 8, 16, 32, 64, 128, /*256,*/ 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536]
})

// "ready" Event Listener
client.on('ready', async () => {
  console.log('Bot started!')
})

// MessageCreate Event Listener
client.on('messageCreate', async (message) => {
  if (message.author.bot) return

  const splitMessage = message.content.split(' ')

  if (splitMessage[0] === 'gpt') gptCommand(message, openai, splitMessage)
})

// Discord Client Initialization
client.login(process.env.DISCORD_TOKEN)
