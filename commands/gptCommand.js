import { gptVariations } from '../constances/gptVariations.js'
import { gptChatCompletion } from '../helpers/gptHelper.js'
import { helpCommand } from './helpCommand.js'

/**
 * GPT Command
 */
async function gptCommand(message, openai, splitMessage) {
  let variation = 'normal'

  const parameter = splitMessage[1]

  if (parameter === 'help') {
    helpCommand(message)
    return
  }

  // Checks if the gpt command has a parameter
  if (parameter.startsWith('-')) {
    // Checks if the parameter is inside the gptVariations Object
    const requestetVariation = parameter.slice(1)
    if (requestetVariation in gptVariations) {
      variation = requestetVariation
    }
    splitMessage.splice(0, 2)
  } else {
    splitMessage.splice(0, 1)
  }

  const prompt = splitMessage.join(' ')
  const bias = gptVariations[variation]

  const { content: messageToSend } = await gptChatCompletion(openai, bias, prompt)

  await message.reply({
    content: messageToSend
  })
}

export { gptCommand }

/**
 * TODO:
 * Find a better way to handle the parameters
 */
