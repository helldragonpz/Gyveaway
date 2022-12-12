const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const ms = require('ms');

module.exports = {
    subCommand: "giveaway.stop",
  
    async execute(client, interaction) {

        const messageID = interaction.options.getString('message-id')

        const giveaway = client.giveawaysManager.giveaways.find((giveaway) => giveaway.messageId === messageID && giveaway.guildId === interaction.guild.id);

        if(!giveaway) return interaction.reply({content: 'Couldn\'t parse the input message id!', ephemeral: true})

        client.giveawaysManager
            .delete(messageID)
            .then(() => {
                return interaction.reply({content: 'The giveaway has been canceled.', ephemeral: true});
            })
            .catch((err) => {
                return interaction.reply({content: `An unusual error has occurred!\n\`\`${err}\`\``, ephemeral: true});
            });

    }
};