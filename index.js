const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
   ActivityType,
} = require("discord.js");
const { GiveawaysManager } = require('discord-giveaways');
const { Player } = require("discord-player");
require("discord-player/smoothVolume");
const { Guilds, GuildMembers, GuildMessages, MessageContent,GuildVoiceStates,} = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const chalk = require("chalk")





const client = new Client({
  intents: [Guilds, GuildMembers,  GuildVoiceStates, GuildMessages, MessageContent,Object.keys(GatewayIntentBits),GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences],
  allowedMentions: { parse: ["users"] },
  partials: [User, Message, GuildMember, ThreadMember,Object.keys(Partials),Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
  presence: {
    activities: [{
        name: `Giveaways`,
        type: ActivityType.Playing
    }]
}
});
const { loadEvents } = require("./Handlers/eventHandler");
const manager = new GiveawaysManager(client, {
  storage: './giveaways.json',
  default: {
      botsCanWin: false,
      embedColor: "Random",
      embedColorEnd: '#9fef14',
      reaction: '🎉'

  }
});

client.config = require("./config.json");
client.giveawaysManager = manager
client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  winners.forEach((member) => {
      member.send(`**Congratulations ${member.user.username}, you've won ${giveaway.prize}!**`);
  })
});

client.events = new Collection();
client.subCommands = new Collection(); //SubCommand handler
client.commands = new Collection();
loadEvents(client);
const player = new Player(client);
player.on("trackStart", (queue, track) =>
  queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
);

// Add the player on the client
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
}); 
const { connect } = require("mongoose");
connect(client.config.DataBaseURL, {}).then(() => {
  console.log(chalk.grey("Connected to the database"));
});



////Code will apply after the bot gets verified on topgg
//const { Api } = require("@top-gg/sdk")
//client.topgg = new Api(, this)
client.login(client.config.token);
