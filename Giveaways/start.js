const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const ms = require('ms');

module.exports = {
    subCommand: "giveaway.start",
  
    async execute(interaction) {
        const { client,options, guildId, user, member } = interaction;
    
            const reward = options.getString('reward');
            const duration = options.getString('duration');
            const winners = options.getInteger('winners');
            const host = options.getUser('host');
            const thumbnail = options.getAttachment('thumbnail');

            if(isNaN(ms(duration))) {return interaction.reply({ content: 'Could not parse the duration!', ephemeral: true });}

            await client.giveawaysManager.start(interaction.channel, {
                duration: ms(duration),
                prize: reward,
                winnerCount: winners,
                hostedBy: host ? host : interaction.user,
                thumbnail: thumbnail ? thumbnail.url : null,
                messages: {
                    giveaway: "🎉 **GIVEAWAY** 🎉",
                    giveawayEnded: "🎉 **GIVEAWAY OVER** 🎉",
                    drawing: "Giveaway ends {timestamp}",
                    inviteToParticipate: "Click the 🎉 reaction below the message to participate",
                    winMessage: "🎉 Congratulations, {winners}! You won **{this.prize}**!",
                }
            })

            interaction.reply({content: 'Starting the giveaway...'})
        },
};