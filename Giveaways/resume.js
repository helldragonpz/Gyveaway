const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const ms = require('ms');

module.exports = {
    subCommand: "giveaway.resume",
  
    async execute(client, interaction) {

        const messageID = interaction.options.getString('message-id')

            const giveaway = client.giveawaysManager.giveaways.find((giveaway) => giveaway.messageId === messageID && giveaway.guildId === interaction.guild.id);
            if (!giveaway.pauseOptions.isPaused) return interaction.reply({content: 'This giveaway is already running.', ephemeral: true})

            if(!giveaway) return interaction.reply({content: 'Couldn\'t parse the input message id!', ephemeral: true})

            client.giveawaysManager
                .unpause(messageID)
                .then(() => {
                    return interaction.reply({content: 'Successfully resumed the giveaway.', ephemeral: true});
                })
                .catch((err) => {
                    return interaction.reply({content: `An unusual error has occurred!\n\`\`${err}\`\``, ephemeral: true});
                });

    }
};