import { IMG_RES, MAX_TOKENS } from '../constances/gptConfig.js'

/**
 * Message Complettion
 */
async function gptChatCompletion(openai, bias, prompt) {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: bias
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: MAX_TOKENS
    })
    return chatCompletion.data.choices[0].message
  } catch (error) {
    console.error(error)
    return 'Internal Error'
  }
}

/**
 * Call an openAI
 */
async function imageCreation(openai, prompt) {
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: IMG_RES
    })
    return response.data.data[0].url
  } catch (error) {
    console.error(error)
    return 'Interner Fehler, kontaktiere den Bot ersteller'
  }
}

export { gptChatCompletion, imageCreation }
