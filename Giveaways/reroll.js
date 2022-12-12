const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const ms = require('ms');

module.exports = {
    subCommand: "giveaway.reroll",
  
    async execute(client, interaction) {

    const messageID = interaction.options.getString('message-id')

            await client.giveawaysManager
                .reroll(messageID,{
                         messages: {
                            congrat: '🎉 New winner(s): {winners}! Congratulations, you won **{this.prize}**!'
                         }
                })
                .then(() => {
                    return interaction.reply({content: 'Picking a new winner...', ephemeral: true});
                })
                .catch((err) => {
                    return interaction.reply({content: `I\'ve ran into an error!\n\`\`${err}\`\``, ephemeral: true});
                });

            interaction.reply({content:"Rerolling giveaway...", ephemeral: true})
        }
};