import { Client } from 'discord.js'
import 'dotenv/config'
import { Configuration, OpenAIApi } from 'openai'

// Import all commands
import { gptCommand, helpCommand } from './commands/commands.js'

// OpenAI Client initialization
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_TOKEN
})
const openai = new OpenAIApi(configuration)

// Discord JS Client initialization
const client = new Client({
  intents: [1, 2, 4, 8, 16, 32, 64, 128, /*256,*/ 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536]
})

client.on('ready', async () => {
  console.log('Bot started!')
})

/**
 * MessageCreate Event Handler
 */
client.on('messageCreate', async (message) => {
  if (message.author.bot) return

  const splitMessage = message.content.split(' ')

  // Befehle vom Bot
  switch (splitMessage[0]) {
    case 'gpt':
      gptCommand(message, openai, splitMessage)
      break
    case 'help':
      helpCommand(message)
      break
  }
  return
})

client.login(process.env.DISCORD_TOKEN)
