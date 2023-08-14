import { EmbedBuilder } from 'discord.js'

function helpCommand(message) {
  const helpEmbed = new EmbedBuilder()
    .setTitle('Discord ChatGPT Help')

    .addFields(
      { name: 'The command is built up like', value: 'gpt -variation prompt ' },
      { name: 'Example', value: 'gpt -normal what is 5+5?' },
      {
        name: 'Variations',
        value: 'There can be many variations, defaults are: "normal,short and code"'
      }
    )

    .setFooter({ text: 'Lars Drescher' })

  message.channel.send({ embeds: [helpEmbed] })
}

export { helpCommand }
