
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(() => console.log(``))

const moment = require("moment")
const ms = require("ms")
const { Client, Intents, MessageEmbed, Interaction, MessageButton, MessageActionRow, Modal, WebhookClient, MessageSelectMenu, Collection, Permissions, MessageFlags, GatewayIntentBits, TextInputComponent, ButtonBuilder, ActionRowBuilder, } = require("discord.js");
const Discord = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, 32767]
});
client.setMaxListeners(0)
client.login(process.env.bebo)

client.on("ready", () => {
  console.log(`Logged in as  ${client.user.username}`)
  client.user.setActivity(`صلي على رسول الله `, { type: 'LISTENING' })
  client.user.setStatus("idle")
});


const db = require("pro.db")
const emjTrue = "✅"
const emjFalse = "❌"
const talabtRoom = "1233772318178934784"
const montagat = "1174896080090050570"
const designer = "1174896079028887622"
const developer = "1174896077724471297"
const staffManagerRole = "1198292661174534174"
const discorsLeader = "1190331175533813800"
const OfficialRole = "1190464243452096584"
const RolesRole = "1190464243452096584"
const discordStaff = "1198292661174534174"
const UnderTestRole = "1198292661174534174"
const developerId = "1081921031448571944"
const bankid = "1081921031448571944"
const ManshoratChannel3 = '1190803871858184232'
const spinbank = "1081921031448571944"
const manshoratRoom = '1190803871858184232'
const roomschannel12345 = ''
const prefix = "$"
const lineLink = "https://i.imgur.com/UpBqHzK.jpeg"
const colorE = "#ffffff"

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception occurred:', error);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection:', reason);
});

// == [ Opinion ] == \\

client.on('messageCreate', async message => {
  if (message.content.startsWith(prefix + 'تقيم') || message.content.startsWith(prefix + 'تقييم')) {
    if (message.content.startsWith(prefix + "تقيمات")) return false;
    if (message.content.startsWith(prefix + "تقييمات")) return false;
    const now = new Date();
    const args = message.content.split(" ")
    const user = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
    if (!user) return message.reply("**منشن الإداري أولاً !**")
    const titlefeed = message.content.split(" ").slice(2).join(" ")
    if (!titlefeed) return message.reply("**يرجى وضع محتوى التقييم أولاً .**")
    if (user.id === message.member.id) return message.reply("**لا تستطيع تقييم نفسك !**")
    if (!user.roles.cache.some(r => r.id == 1198292661174534174)) return message.reply("**هذا الشخص ليس اداري !**")
    const feedbackData = db.get(`feedback_${user.id}`);
    if (feedbackData) {
      for (const entry of feedbackData) {
        const memberId = entry.member;
        if (memberId == message.member.id) return message.reply("**لا يمكنك تقييم الشخص اكثر من مرة !**")
      }
    }
    const FeedBackLog = await message.client.channels.fetch("1245173018997555210");

    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("⭐ 1")
        .setCustomId("s1")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("⭐ 2")
        .setCustomId("s2")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("⭐ 3")
        .setCustomId("s3")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("⭐ 4")
        .setCustomId("s4")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("⭐ 5")
        .setCustomId("s5")
        .setStyle("SECONDARY"),
    )

    message.reply({ content: `** الاداري : ${user}**\n** تقييمك : ${titlefeed}**\n** يرجى اختيار عدد النجوم التي تعطيها للاداري عبر الازرار في الاسفل**`, components: [row] }).then(m => {

      db.set(`temp_${m.id}`, message.member.id)
      db.set(`tempuser_${message.member.id}`, user.id)
      db.set(`tempfeedback_${message.member.id}`, titlefeed)
    })

  }
});

client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {
    if (interaction.customId == "s1") {
      if (!db.has(`tempuser_${interaction.member.id}`)) return interaction.reply({ content: "**لا يمكنك استخدام هذا الامر !**", ephemeral: true })
      interaction.deferUpdate()
      let titlefeed = db.get(`tempfeedback_${interaction.member.id}`)
      let user = interaction.guild.members.cache.find(r => r.id == db.get(`tempuser_${interaction.member.id}`))
      interaction.message.edit({ content: `**تم تقييم ${user} بعدد نجوم 1**`, components: [] })
      db.push(`feedback_${user.id}`, { member: interaction.member.id, stars: 1, title: titlefeed })

      db.delete(`temp_${interaction.message.id}`)
      db.delete(`tempuser_${interaction.member.id}`)
      db.delete(`tempfeedback_${interaction.member.id}`)


    }
  }
});
client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {

    if (interaction.customId == "s2") {
      if (!db.has(`tempuser_${interaction.member.id}`)) return interaction.reply({ content: "**لا يمكنك استخدام هذا الامر !**", ephemeral: true })
      interaction.deferUpdate()

      let titlefeed = db.get(`tempfeedback_${interaction.member.id}`)
      let user = interaction.guild.members.cache.find(r => r.id == db.get(`tempuser_${interaction.member.id}`))
      interaction.message.edit({ content: `**تم تقييم ${user} بعدد نجوم 2**`, components: [] })
      db.push(`feedback_${user.id}`, { member: interaction.member.id, stars: 2, title: titlefeed })

      db.delete(`temp_${interaction.message.id}`)
      db.delete(`tempuser_${interaction.member.id}`)
      db.delete(`tempfeedback_${interaction.member.id}`)


    }
  }
});
client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {

    if (interaction.customId == "s3") {
      if (!db.has(`tempuser_${interaction.member.id}`)) return interaction.reply({ content: "**لا يمكنك استخدام هذا الامر !**", ephemeral: true })
      interaction.deferUpdate()

      let titlefeed = db.get(`tempfeedback_${interaction.member.id}`)
      let user = interaction.guild.members.cache.find(r => r.id == db.get(`tempuser_${interaction.member.id}`))
      interaction.message.edit({ content: `**تم تقييم ${user} بعدد نجوم 3**`, components: [] })
      db.push(`feedback_${user.id}`, { member: interaction.member.id, stars: 3, title: titlefeed })

      db.delete(`temp_${interaction.message.id}`)
      db.delete(`tempuser_${interaction.member.id}`)
      db.delete(`tempfeedback_${interaction.member.id}`)



    }
  }
});
client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {

    if (interaction.customId == "s4") {
      if (!db.has(`tempuser_${interaction.member.id}`)) return interaction.reply({ content: "**لا يمكنك استخدام هذا الامر !**", ephemeral: true })
      interaction.deferUpdate()

      let titlefeed = db.get(`tempfeedback_${interaction.member.id}`)
      let user = interaction.guild.members.cache.find(r => r.id == db.get(`tempuser_${interaction.member.id}`))
      interaction.message.edit({ content: `**تم تقييم ${user} بعدد نجوم 4**`, components: [] })
      db.push(`feedback_${user.id}`, { member: interaction.member.id, stars: 4, title: titlefeed })

      db.delete(`temp_${interaction.message.id}`)
      db.delete(`tempuser_${interaction.member.id}`)
      db.delete(`tempfeedback_${interaction.member.id}`)

    }
  }

});
client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {

    if (interaction.customId == "s5") {
      if (!db.has(`tempuser_${interaction.member.id}`)) return interaction.reply({ content: "**لا يمكنك استخدام هذا الامر !**", ephemeral: true })
      interaction.deferUpdate()
      let titlefeed = db.get(`tempfeedback_${interaction.member.id}`)
      let user = interaction.guild.members.cache.find(r => r.id == db.get(`tempuser_${interaction.member.id}`))
      interaction.message.edit({ content: `**تم تقييم ${user} بعدد نجوم 5**`, components: [] })
      db.push(`feedback_${user.id}`, { member: interaction.member.id, stars: 5, title: titlefeed })

      db.delete(`temp_${interaction.message.id}`)
      db.delete(`tempuser_${interaction.member.id}`)
      db.delete(`tempfeedback_${interaction.member.id}`)


    }

  }
})

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "تقييمات")) {
    const args = message.content.split(" ")
    const member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
    if (!member) return message.reply("**منشن الإداري أولاً !**")
    if (!db.has(`feedback_${member.id}`)) return message.reply("**هذا الشخص ليس لديه تقييمات !**")
    if (!member.roles.cache.some(r => r.id == 1198292661174534174)) return message.reply("**هذا الشخص ليس اداري !**")
    const feedbackData = db.get(`feedback_${member.id}`);
    let usersData = [];
    for (const entry of feedbackData) {
      var stars = entry.stars;
      var title = entry.title;
      var memberId = entry.member;
      var star1 = "⭐";
      var star2 = "⭐⭐";
      var star3 = "⭐⭐⭐";
      var star4 = "⭐⭐⭐⭐";
      var star5 = "⭐⭐⭐⭐⭐";
      usersData.push({ user: memberId, stars, title });
    }
    usersData.sort((a, b) => b.stars - a.stars);
    const embed = new MessageEmbed()
      .setColor(`${colorE}`)
      .setDescription(`**${member} Reviews :**`);
    const topUsers = usersData.slice(0, 20);
    topUsers.forEach((user, index) => {
      var starsString = "";
      if (user.stars == 1) {
        starsString = star1;
      } else if (user.stars == 2) {
        starsString = star2;
      } else if (user.stars == 3) {
        starsString = star3;
      } else if (user.stars == 4) {
        starsString = star4;
      } else if (user.stars == 5) {
        starsString = star5;
      }
      embed.addField(`**#${index + 1} | **`, `**المقيم : <@${user.user}>\n- عدد النجوم : ${starsString}\n- التقييم : ${user.title}**\n`);
    });
    message.reply({ embeds: [embed] })
  }
});


client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.includes("$CMD")) {
    const embed = new MessageEmbed()
      .setTitle('$buymon.$buyads')
      .setDescription('اوامر الشراء التلقائي');

    message.reply({ embeds: [embed] });
  }
});














// == [ Give Role ] == \\

// == [ Give Role ] == \\

client.on('messageCreate', async message => {
  if (message.content.startsWith('$رول') && message.member.roles.cache.has(RolesRole) || message.content.startsWith('$role') && message.member.roles.cache.has(RolesRole)) {
    if (message.content.startsWith(prefix + "رولات")) return false;
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
    if (!args) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
    let row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setPlaceholder("Select Kind Of Role ..")
          .setCustomId('menu-select')
          .setMaxValues(1)
          .addOptions([
            {
              label: 'Seller Roles',
              value: 'sellR'
            },
            {
              label: 'Other Roles',
              value: 'otherR'
            }]))
    let m = await message.reply({ content: `** يرجى تحديد نوع الرتبة :**`, components: [row] })
    db.set(`giverole_${m.id}`, user.id)
  }
});

client.on("interactionCreate", interaction => {
  if (interaction.customId == "menu-select") {
    if (interaction.values[0] === 'sellR') {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let row1 = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setPlaceholder("Select Role ..")
              .setCustomId('menu-select1')
              .setMaxValues(5)
              .addOptions([
                {
                  label: '💰 |  Vip :',
                  value: '1190332349142016040'
                },
                {
                  label: '💰 | String :',
                  value: '1198296739447308359'
                },
                {
                  label: '💰 |  Great  :',
                  value: '1198296429752488007'
                },
                {
                  label: '💰 |  Perfect:',
                  value: '1190611676278554744'
                },
                {
                  label: '💰 |  Epic.:',
                  value: '1190611307146268712'
                },
                {
                  label: '💰 |  Normal .',
                  value: '1190611241048223834'
                },
                {
                  label: '💰 |  Designer  .:',
                  value: '1190610612628230214'
                },
                {
                  label: '💰 |  Developer .:',
                  value: '1190611094461480980'
                },]))
        interaction.message.edit({
          content: `** يرجى تحديد الرتبه
      :**`, components: [row1]
        })
        interaction.deferUpdate()
      }
    }
    if (interaction.values[0] === 'otherR') {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let row1 = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setPlaceholder("Select Role ..")
              .setCustomId('menu-select2')
              .setMaxValues(2)
              .addOptions([
                {
                  label: '💰 |  Trust  .',
                  value: '1197912388041715772'
                },
                {
                  label: 'Warn 100%',
                  value: '1197912273818234971'
                },
                {
                  label: 'Warn 50%',
                  value: '1197912218025599118'
                },
                {
                label: 'Warn 25%',
                value: '1197912107690250282'
                },]))
        interaction.message.edit({ content: `** يرجى تحديد الرتبة :**`, components: [row1] })
        interaction.deferUpdate()
      }
    }
  }
});

client.on("interactionCreate", async interaction => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId == "menu-select1") {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let rolesAdded = [];
        let rolesRemoved = [];
        let u = db.get(`giverole_${interaction.message.id}`)
        let member = interaction.guild.members.cache.find(r => r.id == u)
        let roles = interaction.values;
        for (const r of roles) {
          var s;
          const role = interaction.guild.roles.cache.find(ro => ro.id == r)
          if (role) {
            if (member.roles.cache.some(ro => ro.id == r)) {
              await member.roles.remove([role])
              rolesRemoved.push(role.name.replace(/\|\|/g, ''));
            } else {
              await member.roles.add([role])
              rolesAdded.push(role.name.replace(/\|\|/g, ''));
            }
          }
        }
        let message = `** تم تحديث رتب ${member}**\n`;
        if (rolesAdded.length > 0) {
          message += `> ** الرتب التي تم اضافتها : ${rolesAdded.join(' , ')}**\n`;
        }
        if (rolesRemoved.length > 0) {
          message += `> ** الرتب التي تم ازالتها : ${rolesRemoved.join(' , ')}**\n`;
        }
        interaction.message.edit({ content: `${message}`, components: [] })
        interaction.deferUpdate()
        db.delete(`giverole_${interaction.message.id}`)
      }
    }
    if (interaction.customId == "menu-select2") {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let rolesAdded = [];
        let rolesRemoved = [];
        let u = db.get(`giverole_${interaction.message.id}`)
        let member = interaction.guild.members.cache.find(r => r.id == u)
        let roles = interaction.values;
        for (const r of roles) {
          var s;
          const role = interaction.guild.roles.cache.find(ro => ro.id == r)
          if (role) {
            if (member.roles.cache.some(ro => ro.id == r)) {
              await member.roles.remove([role])
              rolesRemoved.push(role.name.replace(/\|\|/g, ''));
            } else {
              await member.roles.add([role])
              rolesAdded.push(role.name.replace(/\|\|/g, ''));
            }
          }
        }
        let message = `** تم تحديث رتب ${member}**\n`;
        if (rolesAdded.length > 0) {
          message += `> ** الرتب التي تم اضافتها : ${rolesAdded.join(' , ')}**\n`;
        }
        if (rolesRemoved.length > 0) {
          message += `> ** الرتب التي تم ازالتها : ${rolesRemoved.join(' , ')}**\n`;
        }
        interaction.message.edit({ content: `${message}`, components: [] })
        interaction.deferUpdate()
        db.delete(`giverole_${interaction.message.id}`)
      }
    }
  }
});


// == [ Scammer ] == \\

client.on('messageCreate', async message => {
  if (message.content.startsWith('$نصاب') && message.member.roles.cache.has(OfficialRole)) {
    const now = new Date();
    const guild = message.guild;
    const role = guild.roles.cache.get('1191669665932529754');
    const logChannel = await message.client.channels.fetch("1209979437333086279");
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply(`**منشن الشخص أولاً أو ضع الإيدي !**`)
    if (db.has(`scammer_${user.id}`)) return message.reply("**هذا الشخص بالفعل في قائمة النصابين !**");
    db.add(`scammer_${user.id}`, 1)
    await user.roles.set([]);
    await user.roles.add(role)
    await message.reply(`**تم إضافة ${user} إلى قائمة النصابين !**`)
    let EmbedLog = new Discord.MessageEmbed()
      .setTitle(`** Add a New Thief !**`)
      .setDescription(`> ** تم تشهير ${user} , المشرف المسؤول ${message.author} **
        ** إيدي النصاب : ${user.id}
         إيدي المشرف المسؤول : ${message.author.id} \n\n تاريخ التشهير : <t:${Math.floor(now.getTime() / 1000)}:d>**`)
      .setColor(`${colorE}`)
      .setTimestamp()
    await logChannel.send({ embeds: [EmbedLog] })
    await logChannel.send(`${lineLink}`)
  }
});

// == [ DeL Scammer ] == \\

client.on('messageCreate', async message => {
  if (message.content.startsWith('$ازالة') && message.member.roles.cache.has(OfficialRole)) {
    const now = new Date();
    const guild = message.guild;
    const role = guild.roles.cache.get('1191669665932529754');
    const logChannel = await message.client.channels.fetch("1209979437333086279");
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
    if (!db.has(`scammer_${user.id}`)) return message.reply("**هذا الشخص ليس بقائمة النصابين لإزالته !**")
    db.delete(`scammer_${user.id}`, 1)
    await user.roles.remove(role);
    await message.reply(`**تم إزالة ${user} من قائمة النصابين !**`)
    let EmbedLog = new Discord.MessageEmbed()
      .setTitle(`** Remove a New Thief !**`)
      .setDescription(`> ** تم إزالة تشهير ${user} , المشرف المسؤول ${message.author} **
** إيدي الشخص : ${user.id}
 إيدي المشرف المسؤول : ${message.author.id} \n\n تاريخ إزالة التشهير : <t:${Math.floor(now.getTime() / 1000)}:d>**`)
      .setColor(`${colorE}`)
      .setTimestamp()
    await logChannel.send({ embeds: [EmbedLog] })
    await logChannel.send(`${lineLink}`)
  }
});

client.on('messageCreate', async message => {
  if (message.content.startsWith('$فحص') || message.content.startsWith('فحص')) {
    const args = message.content.split(' ');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
    if (db.has(`scammer_${user.id}`)) {
      await message.reply(`** إنتبه ! هذا الشخص نصاب، الرجاء عدم التعامل معه .**`);
    } else {
      await message.reply(`**هذا الشخص ليس نصاب  ، لكن انتبه ! هذا لا يعني أنه مضمون .. الرجاء أخذ وسيط `);
    }
  }
});

// == [ Scammer ] == \\

client.on("guildMemberAdd", async member => {
  const guild = member.guild;
  const role = guild.roles.cache.find(r => r.name === "نصاب");
  const user = guild.members.cache.find(m => m.id === member.id);
  if (role && user && db.get(`scammer_${user.id}`)) {
    try {
      await user.roles.add(role);
      console.log(`تم إعطاء الرتبة ${role.name} للعضو ${user.displayName} في سيرفر ${guild.name}`);
    } catch (error) {
      console.error(`حدث خطأ أثناء إعطاء الرتبة للعضو ${user.displayName} في سيرفر ${guild.name}: ${error}`);
    }
  }
});

// == [ Ping ] == \\

client.on("messageCreate", async message => {
  if (message.content === prefix + 'ping') {
    let rowPing = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setLabel(`إعادة إختبار السرعة`)
          .setCustomId(`reexam`)
          .setStyle("SECONDARY"))
    message.channel.send('pong').then(message => {
      message.edit({
        content: `**\`\`\`js
My ping is : ${client.ws.ping} ms\`\`\`**`, components: [rowPing]
      })
    });
  }
});
client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === 'reexam') {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      message.edit(`**\`\`\`js
My ping is : ${client.ws.ping} ms\`\`\`**`)
    }
  }
});

// == [ Come ] == \\

client.on('messageCreate', async message => {
  if (message.content.startsWith('$نداء') && message.member.roles.cache.has(discordStaff) || message.content.startsWith('$come') && message.member.roles.cache.has(discordStaff)) {
    try {
      const channel = message.channel;
      const args = message.content.split(' ');
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
      const commandLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
      if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**")
      await user.send(`** يرجى التوجه إلى ${channel} في أقرب وقت !\n  الإستدعاء من قبل : ${message.member} .\n  رسالة الإستدعاء : ${commandLink} -تعال**`)
      await message.reply(`**${emjTrue} لقد تم نداء ${user} إلى هذا الروم بنجاح !**`)
    } catch {
      await message.reply(`**${emjFalse} لا يمكنني ارسال رسالة لهذا الشخص !**`)
    }
  }
});

// == [ PosT ] == \\

let manshor;
let member;

client.on("messageCreate", message => {
  if (message.content.startsWith(prefix + "منشور")) {
    if (message.member.roles.cache.has(discorsLeader) || message.member.roles.cache.some(r => r.id == 1190803871858184232)) {

      if (message.content.startsWith(prefix + "منشورات")) return false;

      member = message.mentions.members.first()
      if (!member) return message.reply(`**${emjFalse} يرجى منشن صاحب المنشور أولاً !**`)
      manshor = message.content.split(" ").slice(2).join(" ");
      if (!manshor) return message.reply(`**${emjFalse} يرجى وضع المنشور أولاً !**`)

      let embed = new Discord.MessageEmbed()
        .setTitle(`** إختر نوع المنشن :**`)
        .setDescription(`** يرجى إختيار نوع المشنن المناسب : \`here\` أو \`everyone\`\n المنشور :\n\`${manshor}\`**`)
        .setColor(`${colorE}`)
      let row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Here")
          .setCustomId("menthere")
          .setStyle("SECONDARY")
      )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Everyone")
            .setCustomId("menteve")
            .setStyle("SECONDARY")
        )

      message.reply({ embeds: [embed], components: [row] })
    }
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "menthere") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);

      const heremanshor = `${manshor}\n@here`

      let embed1 = new Discord.MessageEmbed()
        .setTitle(`** هل انت متأكد من إرسال المنشور ؟**`)
        .setDescription(`** يرجى الإستجابة مع الأزرار بـ \`إرسال\` أو \`إلغاء\` ..\n المنشور :\n\`${heremanshor}\n\nتواصل مع : ${member}\`**`)
        .setColor(`${colorE}`)
      let row1 = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("إرسال")
          .setCustomId("completeid")
          .setStyle("SUCCESS")
      )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("إلغاء")
            .setCustomId("cancelid")
            .setStyle("DANGER")
        )
      interaction.deferUpdate()

      message.edit({ embeds: [embed1], components: [row1] });
    } else {
      interaction.reply({ content: `**${emjFalse} لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
    }
  } else if (interaction.customId === "menteve") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      const evemanshor = `${manshor}\n@everyone`
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`** هل انت متأكد من إرسال المنشور ؟**`)
        .setDescription(`** يرجى الإستجابة مع الأزرار بـ \`إرسال\` أو \`إلغاء\` ..\n المنشور :\n\`${evemanshor}\n\nتواصل مع : ${member}\`**`)
        .setColor("EA3648")
      let row2 = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("إرسال")
          .setCustomId("completeid2")
          .setStyle("SUCCESS"))
        .addComponents(
          new Discord.MessageButton()
            .setLabel("إلغاء")
            .setCustomId("cancelid")
            .setStyle("DANGER"))
      interaction.deferUpdate()
      message.edit({ embeds: [embed2], components: [row2] });
    } else {
      interaction.reply({
        content: `**${emjFalse}
 لا يمكنك إستخدام هذا الزر .**`, ephemeral: true
      });
    }
  } else if (interaction.customId === "nomen") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      const nomenmanshor = `${manshor}`
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`** هل انت متأكد من إرسال المنشور ؟**`)
        .setDescription(`** يرجى الإستجابة مع الأزرار بـ \`إرسال\` أو \`إلغاء\` ..\n المنشور :\n\`${nomenmanshor}\n\nتواصل مع : ${member}\`**`)
        .setColor(`${colorE}`)
      let row2 = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("إرسال")
          .setCustomId("completeid3")
          .setStyle("SUCCESS"))
        .addComponents(
          new Discord.MessageButton()
            .setLabel("إلغاء")
            .setCustomId("cancelid")
            .setStyle("DANGER"))
      interaction.deferUpdate()
      message.edit({ embeds: [embed2], components: [row2] });
    } else {
      interaction.reply({ content: `**${emjFalse} لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
    }
  }
});

client.on("interactionCreate", async interaction => {
  if (interaction.customId == "cancelid") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      let embed3 = new Discord.MessageEmbed()
        .setColor(`EA3648`)
        .setDescription(`** تم إلغاء إرسال هذا المنشور .
 بواسطة :
${interaction.member}
**`)
      interaction.deferUpdate()
      message.edit({ embeds: [embed3], components: [] });
    } else {
      interaction.reply({ content: `**${emjFalse} لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
    }
  }
});

client.on("interactionCreate", async interaction => {
  if (interaction.customId == "completeid") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      const now = new Date();
      const manshoratRoom = "↬・الـمـنـشـورات・الـمـمـيـزة";
      const ManshoratChannel = interaction.guild.channels.cache.find(channel => channel.name === manshoratRoom);
      const ManshoratLog = client.channels.cache.get("1209979437333086279");
      const mehere = `${member}`
      const manshorhere = `${manshor}\n\nتواصل مع : ${mehere}\n@here`
      let embed4 = new Discord.MessageEmbed()
        .setColor(`${colorE}`)
        .setDescription(`** تم إرسال هذا المنشور إلى ${ManshoratChannel}
 بواسطة:
${interaction.member}
**`);
      message.edit({ embeds: [embed4], components: [] });
      interaction.deferUpdate();

      // Check if ManshoratChannel is defined before sending messages
      if (ManshoratChannel) {
        await ManshoratChannel.send(`${manshorhere}`);
        await ManshoratChannel.send(`** منشور مدفوع نخلي كامل مسؤوليتنا للي يصير بينكم , تبي زيه حياك : ** ⁠<#1190419313178443866>`)
        await ManshoratChannel.send({files : [lineLink]});
      } else {
        console.log("〢log・❖");
      }

      await ManshoratLog.send(`** المنشور :\n\`${manshor}\`\n المنشن :\n@everyone\n المشرف المسؤول :\n${interaction.member}\n   صاحب المنشور :\n${mehere}\n تاريخ المنشور : <t:${Math.floor(now.getTime() / 1000)}:d>**`);
      await ManshoratLog.send(`${lineLink}`);
    } else {
      interaction.reply({
        content: `**${emjFalse}
 لا يمكنك إستخدام هذا الزر .**`, ephemeral: true
      });
    }
  }
});


client.on("interactionCreate", async interaction => {
  if (interaction.customId == "completeid2") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      const now = new Date();
      const manshoratRoom2 = "〢log・❖";
      const ManshoratChannel2 = interaction.guild.channels.cache.find(channel => channel.name === manshoratRoom2);
      const ManshoratLog2 = client.channels.cache.get("1209979437333086279");
      const memeve = `${member}`
      const manshoreve = `${manshor}\n\nتواصل مع : ${memeve}\n@everyone`
      let embed4 = new Discord.MessageEmbed()
        .setColor(`${colorE}`)
        .setDescription(`** تم إرسال هذا المنشور إلى ${ManshoratChannel2}
 بواسطة:
${interaction.member}
**`);
      message.edit({ embeds: [embed4], components: [] });
      interaction.deferUpdate();

      // Check if ManshoratChannel2 is defined before sending messages
      if (ManshoratChannel2) {
        await ManshoratChannel2.send(`${manshoreve}`);
        await ManshoratChannel2.send(`** منشور مدفوع نخلي كامل مسؤوليتنا للي يصير بينكم , تبي زيه حياك : ** ⁠<#1190419313178443866>`)
        await ManshoratChannel2.send({files : [lineLink]});
      } else {
        console.log("〢log・❖");
      }

      await ManshoratLog2.send(`** المنشور :\n\`${manshor}\`\n المنشن :\n@everyone\n المشرف المسؤول :\n${interaction.member}\n صاحب المنشور :\n${memeve}\n تاريخ المنشور : <t:${Math.floor(now.getTime() / 1000)}:d>**`);
      await ManshoratLog2.send(`${lineLink}`);
    } else {
      interaction.reply({
        content: `**${emjFalse}
 لا يمكنك إستخدام هذا الزر .**`, ephemeral: true
      });
    }
  }
});


client.on("interactionCreate", async interaction => {
  if (interaction.customId == "completeid3") {
    if (interaction.member.roles.cache.some(r => r.id == discorsLeader)) {
      const message = await interaction.channel.messages.fetch(interaction.message.id);
      const now = new Date();

      await interaction.guild.channels.fetch();

      const manshoratRoom3 = "〢log・❖";
      const ManshoratChannel3 = interaction.guild.channels.cache.find(channel => channel.name === manshoratRoom3);
      const ManshoratLog3 = client.channels.cache.get("1209979437333086279");
      const nomen = `${member}`
      const manshorno = `${manshor}\n\nتواصل مع: ${nomen}`;
      let embed4 = new Discord.MessageEmbed()
        .setColor(`${colorE}`)
        .setDescription(`** تم إرسال هذا المنشور إلى ${ManshoratChannel3}
 بواسطة:
${interaction.member}
**`);
      message.edit({ embeds: [embed4], components: [] });
      interaction.deferUpdate();

      // Check if ManshoratChannel3 is defined before sending messages
      if (ManshoratChannel3) {
        await ManshoratChannel3.send(`${manshorno}`);
        await ManshoratChannel3.send(`** منشور مدفوع نخلي كامل مسؤوليتنا للي يصير بينكم , تبي زيه حياك : ** ⁠<#1190419313178443866>`)
        await ManshoratChannel3.send({files : [lineLink]});
      } else {
        console.log("〢log・❖");
      }

      await ManshoratLog3.send(`** المنشور :\n\`${manshor}\`\n المنشن :\nno mention\n المشرف المسؤول :\n${interaction.member}\n صاحب المنشور :\n${nomen}\n تاريخ المنشور : <t:${Math.floor(now.getTime() / 1000)}:d>**`);
      await ManshoratLog3.send(`${lineLink}`);
    } else {
      interaction.reply({
        content: `**${emjFalse}
 لا يمكنك إستخدام هذا الزر .**`, ephemeral: true
      });
    }
  }
});


// == [ Voice ] == \\

const { joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');

const voiceChannelId = '1174895996187185182';
const guildId = '1154629587922321448';

client.on('ready', () => {
  const voiceChannel = client.channels.cache.get(voiceChannelId);
  if (!voiceChannel) {
    return console.log(`Voice channel ${voiceChannelId} not found.`);
  }

  const connection = joinVoiceChannel({
    channelId: voiceChannelId,
    guildId: guildId,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  connection.on('error', (error) => {
    console.error(`Error joining voice channel: ${error.message}`);
  });

  connection.on('stateChange', (state) => {
    console.log(`Connection state changed: ${state.status}`);
  });

  const audioPlayer = createAudioPlayer();
  connection.subscribe(audioPlayer);

  console.log(`Joined voice channel ${voiceChannel.name}!`);
});



///////////
///////////
client.on("messageCreate", message => {
  if (message.content.startsWith(prefix + "info") || message.content.startsWith(prefix + "معلومات")) {
    let embed1 = new MessageEmbed()
      .setTitle(`**المعلومات**`)
      .setDescription(`**إختر من الأزرار التالية ما يناسبك.**`)
      .setColor(`${colorE}`)
      .setImage(`https://i.imgur.com/UpBqHzK.jpeg`)
    let row1 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("رتب")
        .setCustomId("roles")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("إعلانات")
        .setCustomId("ads")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("إضافات")
        .setCustomId("adds")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("منشورات مميزه")
        .setCustomId("manshorat")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setLabel("رومات خاصة")
        .setCustomId("rooms")
        .setStyle("SECONDARY"),)
    message.channel.send({ embeds: [embed1], components: [row1] })
  }
});

client.on("interactionCreate", async interaction => {
  if (interaction.customId == "roles") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    let embed2 = new MessageEmbed()
      .setDescription(`** 
      
الرتبة <@&1190611094461480980> 

الس3ر 10k 

● امكانية  نشر الصور 

● امكانية المنشن 

● النشر في روم برمجيات فقط 

 


الرتبة <@&1190610612628230214> 

الس3ر 10k 

● امكانية نشر الصور 

● امكانية المنشن 

● النشر في روم تصاميم فقط 



الرتبة <@&1190611241048223834> 

الس3ر 35k 

● نشر الصور 

● عدم المنشن 

● النشر في كل الرومات بستثناء [تصاميم , برمجيات ]


الرتبة <@&1190611307146268712> 

الس3ر  40k 


● نشر الصور 

● امكانية المنشن في كل الرومات بستثناء [ عملات , حسابات ] 

● النشر في كل الرومات بستثناء [ تصاميم , برمجيات ]

 


الرتبة <@&1190611676278554744> 

الس3ر 45k 

● نشر الصور 

● امكانية المنشن بستثناء [ عملات ,  دسكورد ] 

● النشر في كل الرومات بستثناء [ تصاميم , برمجيات] 





الرتبة <@&1198296429752488007> 

الس3ر 50k 


● نشر الصور

●  امكانية المنشن 


● النشر في كل الرومات بستثناء [ تصاميم , برمجيات ]





الرتبة <@&1198296739447308359> 


الس3ر  55k


● نشر الصور 


● امكاية المنشن 


● النشر في كل الرومات 




الرتبة <@&1190332349142016040> 


 الس3ر 70k  


● لون اسود مخصص فقط للادارة 

● امكانية  النشر في كل الرومات 

● نشر الصور 

● المنشن 


 ** `)
      .setColor(`${colorE}`)
    message.edit({ embeds: [embed2], components: [] })

    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@1081921031448571944> .**`);
    }, 500);
  }
});

//
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "ads") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    let embed3 = new MessageEmbed()
      .setDescription(`** 
      


اعلان بمنشن هير ب 30




اعلان منشن افروان  40 





برود كاست للانلاين ب 35 







برودكاست للكل يتبند ب 40





برود كاست للكل ما يتبند ب55 






منشن هير في روم هدايا الاعلانات ب 40 [ انت تسلم وتختار مبلغ القيف] 





منشن افروان في روم هدايا الاعلانات ب 50 [انت تختار مبلغ القيف وتسلمه ] 



**`)
      .setColor(`${colorE}`)
    message.edit({ embeds: [embed3], components: [] })
    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@1081921031448571944> .**`);
    }, 500);
  }
});

//
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "adds") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    let embed3 = new MessageEmbed()
      .setDescription(`**


لازالة الوارن الواحد عليك ب دفع 15 


لنقل الرتبة من حساب الى اخر عليك ب دفع 20  


**`)
      .setColor(`${colorE}`)
    message.edit({ embeds: [embed3], components: [] })
    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@1081921031448571944> .**`);
    }, 500);
  }
});

//
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "manshorat") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    let embed3 = new MessageEmbed()
      .setDescription(`** اسعار المنشورات المميزة كالأتي 

المنشور منشن هير ب  10

 

المنشور منشن افروان ب 30 

**`)
      .setColor(`${colorE}`)
    message.edit({ embeds: [embed3], components: [] })
    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@1081921031448571944> .**`);
    }, 500);
  }
});

//
client.on("interactionCreate", async interaction => {
  if (interaction.customId == "rooms") {
    const message = await interaction.channel.messages.fetch(interaction.message.id);
    let fi = interaction.guild.channels.cache.filter(ch => ch.name.startsWith("〢↯・"))
    var f;
    if (fi.size < 10) {
      f = "مفتوح"
    }
    if (fi.size >= 10) {
      f = "مغلق"
    }
    let embed3 = new MessageEmbed()
      .setDescription(`**
      ### price 40 
### Role <@&1223029973472903218> 
###  المدة 7 ايام 


### المميزات 
### روم خاص بأسمك 
### تقدر تطلب وتبيع 
### تقدر تمنشن هير كل ساعتين 




### للطلب افتح تكت

###  <#1190419313178443866> 


### التحويل فقط ل <@1081921031448571944> 

### لانتحمل مسؤولية التحويل لاي شخص اخر
>  الرومات المتوفرة : ${fi.size} 
>  \`${f}\` **`)
      .setColor(`${colorE}`)
    message.edit({ embeds: [embed3], components: [] })
    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@1081921031448571944> .**`);
    }, 500);
  }
});





///////////

client.on('messageCreate', async message => {
  if (message.content.startsWith('$embed')) {
    const content = message.content.slice('$embed'.length).trim();

    const isAdmin = message.member.permissions.has('ADMINISTRATOR');

    if (!isAdmin) {
      return message.reply('You do not have permission to use this command.');
    }

    const embed = new MessageEmbed()
      .setColor('ffffff')
      .setDescription(content)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
});




////////////
client.on("messageCreate", async message => {
  const args = message.content.split(" ")
  const now = new Date()
  if (message.content.startsWith(prefix + 'روم')) {
    if (message.member.roles.cache.some(r => r.id == 1198292661174534174)) {
      let prv = message.guild.roles.cache.find(r => r.id == 1223029973472903218)
      let Emoji = message.guild.roles.cache.find(r => r.name == "#・private")
      let discordstaff = message.guild.roles.cache.find(r => r.name == "#・discord Staff")
      let args = message.content.split(" ")
      let member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
      if (!args[1]) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!member) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (db.has(`prvuser_${member.id}`)) return message.reply(`${emjFalse} | **هذا الشخص يمتلك بالفعل روم خاص**`)
      if (!args[2]) return message.reply(`${emjFalse} | **حدد مدة الروم !**`)
      if (!args[2].endsWith("d")) {
        if (!args[2].endsWith("h")) {
          if (!args[2].endsWith("m")) {
            return message.reply(`${emjFalse}** | حدد الوقت بالأيام - بالساعات أو بالدقائق**`)
          }
        }
      }
      if (isNaN(args[2][0])) return message.reply(`${emjFalse} | **حدد وقت صحيح !**`)

      message.reply(`${emjTrue} **| تم إنشاء روم خاص لـ ${member} لمدة \`${args[2]}\`**`)

      let embed = new Discord.MessageEmbed()
        .setDescription(`** الرومات الخاصه**\n\n> ** صاحب الروم : <@${member.id}> **
  
> ** صنع بواسطة : ${message.member} **
  
> ** صنع في : <t:${Math.floor(now.getTime() / 1000)}:d> **
  
> ** ينتهي في : <t:${Math.floor((now.getTime() + ms(args[2])) / 1000)}:R> **

> ** مدة الروم : ${args[2]} **
`)
        .setColor(`${colorE}`)
      let mm = await message.guild.channels.create(`〢↬・${member.user.username}`, { type: "text" })
        .then(async m => {
          m.setParent(message.guild.channels.cache.find(r => r.id == 1190258273190940763))
          member.roles.add([prv]).catch(err => { })
          db.set(`prvuser_${member.id}`, member.id)
          db.set(`prvroom_${m.id}`, member.id)
          m.permissionOverwrites.edit(message.guild.roles.everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
          })

          m.permissionOverwrites.edit(Emoji, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: true
          })
          m.permissionOverwrites.edit(discordstaff, {
            MANAGE_MESSAGES: true,
          })
          m.permissionOverwrites.edit(member.id, {
            SEND_MESSAGES: true,
            MENTION_EVERYONE: true,
            ATTACH_FILES: true
          })

          m.send({ content: `<@${member.id}>`, embeds: [embed] })
          db.push(`room`, {
            server: message.guild.id,
            id: member.id,
            endsAt: Date.now() + ms(args[2]),
            channelid: m.id
          })
        });
    }
  }
});

async function saleh() {
  if (db.has(`room`)) {
    const data = await db.get(`room`)
    for (const x of data) {
      let end = x.endsAt
      let g = await x.server
      if (end < new Date()) {
        const guild = await client.guilds.cache.get(g)
        const channel = await guild.channels.cache.find(r => r.id == x.channelid)
        await db.set(`enduser_${x.id}`, x.id)
        await db.set(`endroom_${x.channelid}`, x.channelid)

        await channel.bulkDelete(100);


        const embed = new Discord.MessageEmbed()
          .setDescription(`** Rooms Ended・إنتهاء الروم**\n> ** لقد انتهت مدة هذا الروم، لديك مهلة 24 ساعه لتجديده ..**\n> ** للتجديد تواصل مع <#1190419313178443866> .**`)
          .setColor(`${colorE}`)
          .setTimestamp()
        channel.permissionOverwrites.edit(guild.members.cache.get(x.id), {
          SEND_MESSAGES: false,
        })
        await channel.send({ content: `<@${x.id}>`, embeds: [embed] })

        const index = data.indexOf(x);
        if (index !== -1) {
          data.splice(index, 1);
          await db.set('room', data);
        }
      }
    }
  }
}
setInterval(async () => {
  saleh()
}, 10000)

client.on("messageCreate", async message => {
  const args = message.content.split(" ")
  const now = new Date()
  if (message.content.startsWith(prefix + 'تجديد')) {
    if (message.member.roles.cache.some(r => r.id == 1174517332782096385)) {
      let prv = message.guild.roles.cache.find(r => r.id == 1174517374993584168)

      let member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
      let channel = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.id == args[2])
      if (!args[1]) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!member) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!channel) return message.reply(`${emjFalse} | **منشن الروم !**`)
      if (!args[2]) return message.reply(`${emjFalse} | **منشن الروم !**`)

      if (!args[3]) return message.reply(`${emjFalse} | **حدد مدة الروم !**`)
      if (!args[3].endsWith("d")) {
        if (!args[3].endsWith("h")) {
          if (!args[3].endsWith("m")) {
            return message.reply(`${emjFalse}** | حدد الوقت بالأيام - بالساعات أو بالدقائق**`)
          }
        }
      }
      if (isNaN(args[3][0])) return message.reply(`${emjFalse} | **حدد وقت صحيح !**`)

      if (!db.has(`enduser_${member.id}`)) return message.reply(`${emjFalse} | **هذا الشخص لا يمتلك روم منتهي**`)
      if (!db.has(`endroom_${channel.id}`)) return message.reply(`${emjFalse} | **هذا الروم ليس منتهي**`)

      message.reply(`${emjTrue} **| تم تجديد الروم ${channel} لـ ${member} لمدة \`${args[3]}\`**`)
      db.set(`prvuser_${member.id}`, member.id)
      db.set(`prvroom_${channel.id}`, member.id)
      let embed = new Discord.MessageEmbed()
        .setDescription(`** الرومات الخاصه**\n\n> ** صاحب الروم : <@${member.id}> **
  
> ** تم التجديد بواسطة : ${message.member} **
  
> ** تم التجديد في : <t:${Math.floor(now.getTime() / 1000)}:d> **
  
> ** ينتهي في : <t:${Math.floor((now.getTime() + ms(args[3])) / 1000)}:R> **

> ** مدة الروم : ${args[3]} **
`)
        .setColor(`${colorE}`)
      channel.bulkDelete(100)
      member.roles.add([prv]).catch(err => { })
      db.delete(`enduser_${member.id}`)
      db.delete(`endroom_${channel.id}`)
      channel.permissionOverwrites.edit(member.id, {
        SEND_MESSAGES: true
      })
      channel.send({ content: `<@${member.id}>`, embeds: [embed] })
      db.push(`room`, {
        server: message.guild.id,
        id: member.id,
        endsAt: Date.now() + ms(args[3]),
        channelid: channel.id
      })
    }
  }
});

client.on("messageCreate", async message => {
  const args = message.content.split(" ")
  if (message.content.startsWith(prefix + 'close')) {
    if (message.member.roles.cache.some(r => r.id == 1174517332782096385)) {
      let prv = message.guild.roles.cache.find(r => r.id == 1174517332782096385)
      let member = message.mentions.members.first() || message.guild.members.cache.find(r => r.id == args[1])
      let channel = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.id == args[2])
      if (!args[1]) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!member) return message.reply(`${emjFalse} | **منشن شخص !**`)
      if (!channel) return message.reply(`${emjFalse} | **منشن الروم !**`)
      if (!args[2]) return message.reply(`${emjFalse} | **منشن الروم !**`)
      if (!db.has(`prvuser_${member.id}`)) return message.reply(`${emjFalse} | **هذا الشخص ليس لديه روم خاص**`)
      await message.reply(`${emjTrue} | **تم حذف الروم ${channel.name} للشخص ${member} .**`)
      await channel.delete()
      await member.roles.remove([prv])
      if (db.has(`enduser_${member.id}`)) {
        await db.delete(`enduser_${member.id}`)
      }
      if (db.has(`endroom_${channel.id}`)) {
        await db.delete(`endroom_${channel.id}`)
      }
      if (db.has(`prvuser_${member.id}`)) {
        await db.delete(`prvuser_${member.id}`)
      }
      if (db.has(`prvroom_${channel.id}`)) {
        await db.delete(`prvroom_${channel.id}`)
      }
      if (db.has(`room`)) {
        const data = await db.get(`room`)
        for (const x of data) {
          if (x.id == member.id) {
            if (x.channelid == channel.id) {
              const index = data.indexOf(x);
              if (index !== -1) {
                data.splice(index, 1);
                await db.set('room', data);
              }
            }
          }
        }
      }
    }
  }
});

client.on("channelDelete", async channel => {
  if (db.has(`prvroom_${channel.id}`)) {
    let member = channel.guild.members.cache.find(r => r.id == db.get(`prvroom_${channel.id}`))
    if (db.has(`enduser_${member.id}`)) {
      await db.delete(`enduser_${member.id}`)
    }
    if (db.has(`endroom_${channel.id}`)) {
      await db.delete(`endroom_${channel.id}`)
    }
    if (db.has(`prvuser_${member.id}`)) {
      await db.delete(`prvuser_${member.id}`)
    }
    if (db.has(`prvroom_${channel.id}`)) {
      await db.delete(`prvroom_${channel.id}`)
    }
    if (db.has(`room`)) {
      const data = await db.get(`room`)
      for (const x of data) {
        if (x.id == member.id) {
          if (x.channelid == channel.id) {
            const index = data.indexOf(x);
            if (index !== -1) {
              data.splice(index, 1);
              await db.set('room', data);
            }
          }
        }
      }
    }
  }
});

////////////





client.on("messageCreate", message => {
  if (message.content == prefix + "app") {
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("apply")
        .setEmoji("<:power350:1152619160422076456>")
        .setStyle("SECONDARY")
    )
    let embed = new Discord.MessageEmbed()
      .setTitle("**نموذج التقديم :**")
      .setDescription(`**
>  تم فتح تقديم الإدارة
-
>  اسمك :
>  عمرك :
>  بلدك :
-
>  كم مده تفاعلك :
>  خبراتك :
>  في ايش راح تفيدنا :
-
>  الرابط في البايو اجباري :

**`)
      .setColor(`${colorE}`)
      .setThumbnail(`https://i.imgur.com/5aTu0Go.png`)
.setImage('https://i.imgur.com/YHU6QBr.jpeg')
  
    message.delete()
    message.channel.send({ components: [row], embeds: [embed] })
  }
});

const cooldown = new Set()

const discordModals = require('discord-modals');
discordModals(client);
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'apply') {
    if (cooldown.has(interaction.member.id)) return interaction.reply({ content: "Cooldown !", ephemeral: true })
    let user = db.get(`user_${interaction.member.id}`)
    if (db.has(`userapply_${interaction.member.id}`)) return interaction.reply({ content: "**انت بالفعل على قائمة المقدمين !**", ephemeral: true })
    if (interaction.member.roles.cache.some(r => r.id == 1198292661174534174) || interaction.member.roles.cache.some(r => r.id == 1190331380773703730)) return interaction.reply({ content: "**انت بالفعل اداري**", ephemeral: true })
    const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals');

    const modal = new Modal()
      .setCustomId('modal')
      .setTitle('نموذج التقديم :')
      .addComponents(
        new TextInputComponent()
          .setCustomId('name')
          .setLabel("ما اسمك ؟")
          .setRequired(true)
          .setPlaceholder("ادخل اسمك هنا")
          .setStyle('SHORT'),

        new TextInputComponent()
          .setCustomId('age')
          .setRequired(true)
          .setPlaceholder("ادخل عمرك من هنا")
          .setLabel("كم عمرك ؟")
          .setStyle('SHORT'),

        new TextInputComponent()
          .setCustomId('country')
          .setRequired(true)
          .setPlaceholder("ادخل بلدك من هنا")
          .setLabel("من وين ؟")
          .setStyle('SHORT'),

        new TextInputComponent()
          .setCustomId('active')
          .setRequired(true)
          .setPlaceholder("ادخل هنا مدة تفاعلك")
          .setLabel("مدة تفاعلك باليوم ؟")
          .setStyle('SHORT'),

        new TextInputComponent()
          .setCustomId('shop')
          .setRequired(true)
          .setPlaceholder("ادخل هنا خبرتك و هل كنت اداري في سيرفر شوب اخر")
          .setLabel("هل لديك خبرة او ماضي في سيرفرات الشوب ؟")
          .setStyle('LONG')

      )

    showModal(modal, {
      client: client,
      interaction: interaction,
    });

  }
});

client.on('modalSubmit', async modal => {
  if (modal.customId == "modal") {
    let ch = db.get(`channel_${modal.guild.id}`)
    let channel = modal.guild.channels.cache.find(c => c.id == 1239730707618598922)
    const name = modal.getTextInputValue("name")
    const age = modal.getTextInputValue("age")
    const country = modal.getTextInputValue("country")
    const active = modal.getTextInputValue("active")
    const shop = modal.getTextInputValue("shop")

    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setEmoji(`${emjTrue}`)
        .setCustomId("acc")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setEmoji(`${emjFalse}`)
        .setCustomId("dec")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setEmoji("🤐")
        .setCustomId("time")
        .setStyle("SECONDARY")
    )
    let embed = new Discord.MessageEmbed()
      .setAuthor({ name: `${modal.member.user.username}`, iconURL: `${modal.member.user.displayAvatarURL()}` })
      .setFooter({ text: modal.guild.name, iconURL: modal.guild.iconURL() })
      .setTimestamp()
      .setThumbnail(modal.guild.iconURL())
      .setTitle("**تقديم جديد !**")
      .setDescription(`**الشخص : <@${modal.member.id}>**\n\n>  **الاسم : ${name}**\n\n>  **العمر : ${age}**\n\n>  **البلد : ${country}**\n\n>  **مدة التفاعل : ${active}**\n\n>  **خبرته في سيرفرات الشوب : ${shop}**`)
      .setColor(`${colorE}`)
    modal.reply({ content: "تم ارسال تقديمك !", ephemeral: true })
    channel.send({ content: `${modal.member}`, embeds: [embed], components: [row] }).then(m => {
      db.set(`userapply_${modal.member.id}`, modal.member.id)
      db.set(`userm_${m.id}`, modal.member.id)
    })
  }
});

client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {
    if (interaction.customId == "acc") {
      if (!interaction.member.roles.cache.some(r => r.id == 1241370065862004796)) return interaction.reply({ content: "**ما تقدر تستعمل هذا الامر**", ephemeral: true })
      let user = db.get(`userm_${interaction.message.id}`)
      let member = interaction.guild.members.cache.get(user)
      let role = interaction.guild.roles.cache.find(r => r.id == "1241370065862004796")
      let embed = new Discord.MessageEmbed()
        .setDescription(`**تقديم مقبول من : ${member} ${emjTrue}**`)
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setColor(`${colorE}`)
        .setTimestamp()
      member.roles.add([role]).catch(err => { })
      member.send(`**لقد تم قبول تقديمك !**\n**الرجاء مراجعة هذه الروم و حفظ ما فيها :**\n <#1190257580258373674>`).catch(err => { })
      interaction.message.edit({ content: `${member}`, embeds: [embed], components: [] })
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`)
      db.delete(`userm_${interaction.message.id}`)
    }
    if (interaction.customId == "dec") {
      if (!interaction.member.roles.cache.some(r => r.id == 1241370065862004796)) return interaction.reply({ content: "**ما تقدر تستعمل هذا الامر**", ephemeral: true })
      let user = db.get(`userm_${interaction.message.id}`)
      let member = interaction.guild.members.cache.get(user)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**تقديم مرفوض من : ${member} ${emjFalse}**`)
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setColor(`${colorE}`)
        .setTimestamp()
      interaction.message.edit({ content: `${member}`, embeds: [embed], components: [] })
      member.send(`**لقد تم رفض تقديمك ! الرجاء عدم التقديم مرة ثانية لتجنب الميوت .**`).catch(err => { })
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`)
      db.delete(`userm_${interaction.message.id}`)
    }
    if (interaction.customId == "time") {
      if (!interaction.member.roles.cache.some(r => r.id == 1241370065862004796)) return interaction.reply({ content: "**ما تقدر تستعمل هذا الامر**", ephemeral: true })
      let user = db.get(`userm_${interaction.message.id}`)
      let member = interaction.guild.members.cache.get(user)
      let embed = new Discord.MessageEmbed()
        .setDescription(`**لقد تم اسكات : ${member} 🤐**`)
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setColor(`${colorE}`)
        .setTimestamp()
      interaction.message.edit({ content: `${member}`, embeds: [embed], components: [] })
      member.send(`**لقد تم اسكاتك !**`).catch(err => { })
      member.timeout(86400000).catch(err => { })
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`)
      db.delete(`userm_${interaction.message.id}`)
    }
  }
});

let buttonwinner = false

client.on("messageCreate", async message => {
  if (message.content == prefix + "زر" || message.content == prefix + "button") {
    const wait = require('node:timers/promises').setTimeout;
    buttonwinner = false
    const embed = new Discord.MessageEmbed()
      .setTitle("**اسرع شخص يضغط الزر : ⚡**")
      .setDescription("**معكم 10 ثواني تضغطون الزر**\n**اسرع واحد يضغط الزر يفوز**")
      .setTimestamp()
      .setColor("333333")
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r1")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r2")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r3")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r4")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r5")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    )
    const row2 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r6")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r7")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r8")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r9")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r10")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    )
    const row3 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r11")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r12")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r13")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r14")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r15")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    )
    const row4 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r16")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r17")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r18")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r19")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r20")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    )
    message.channel.send({ components: [row, row2, row3, row4], embeds: [embed] }).then(async m => {
      await wait(3500)
      const all = [...row.components, ...row2.components, ...row3.components, ...row4.components]
      const r = Math.floor(Math.random() * all.length);
      const button = all[r]
      button.setStyle("SUCCESS")
      button.setDisabled(false)
      const embed2 = new Discord.MessageEmbed()
        .setTitle("**اسرع شخص يضغط الزر : ⚡**")
        .setDescription("**معكم 10 ثواني تضغطون الزر**\n**اضغط على الزر الأخضر 🟢**")
        .setTimestamp()
        .setColor("GREEN")
      m.edit({ components: [row, row2, row3, row4], embeds: [embed2] })
      const time = setTimeout(() => {
        button.setDisabled(true)
        button.setStyle("DANGER")
        const embed3 = new Discord.MessageEmbed()
          .setTitle("**اسرع شخص يضغط الزر : ⚡**")
          .setDescription("**انتهى الوقت**\n**🔴 لا يوجد اي فائز**")
          .setTimestamp()
          .setColor("RED")
        m.edit({ components: [row, row2, row3, row4], embeds: [embed3] })
      }, 10000)
      client.on("interactionCreate", interaction => {
        if (interaction.isButton()) {
          if (interaction.customId == `${button.customId}` && buttonwinner == false) {
            buttonwinner = true
            button.setDisabled(true)
            const embed4 = new Discord.MessageEmbed()
              .setTitle("**اسرع شخص يضغط الزر : ⚡**")
              .setDescription(`**👑 | ${interaction.member}**`)
              .setTimestamp()
              .setColor("YELLOW")
            m.edit({ components: [row, row2, row3, row4], embeds: [embed4] })
            interaction.channel.send(`**⚡ | الفائز هو : ${interaction.member}**`)
            interaction.deferUpdate()
            clearTimeout(`${time}`)
          }
        }
      });

    })
  }
});





const channelId1 = ''; // 
const reactions = ['🟢', '🔴']; // 

client.on('messageCreate', async (message) => {
  // 
  if (message.author && message.channelId === channelId1) {
    //
    for (const reaction of reactions) {
      await message.react(reaction);
    }
  }
});


  



let boost_channel = "1174896032652472360"; //ID CHANNEL BOOST HERE
client.on("guildMemberUpdate", (old,now) => {
    let oldS = old.premiumSince;
    let nowS = now.premiumSince;
    if (!oldS && nowS) {
        let user = now.guild.members.cache.get(now.user.id)
        let channel = now.guild.channels.cache.get(boost_channel)
        channel.send({
         content : `**__
> 🌹 |  Thanks For Added Boost ${now.user} __**`
        }).then((y) => {
y.react("<a:Mats_love:1152757032185778186>")
})
    }
})
client.on('messageCreate', (message) => {
  const klamMmno3 = ["كسمك","خول","شرموط","عرص","متناك","زانيا","قحبه","زبي","كس","كس اختك","كس ابوك","$معلومات"]
  if (!message.author.bot && message.guild) {
    const tttt = klamMmno3.some(word => message.content.includes(word));

    if (tttt) {
      message.delete() 
  }
}
});


const replace = [
  {
    word: "بيع",
    replace: "بيــ3"
  },
   {
    word: "شراء",
    replace: "4ــراء"
  },
  {
    word: "حساب",
    replace: "حـsـاب"
  },
  {
    word: "وسيط",
    replace: "9سـيط"
  },
  {
    word: "هاك",
    replace: "هـ-ــاك"
  },
  {
    word: "شوب",
    replace: "شـ9ب"
  },
  {
    word: "متجر",
    replace: "متـ_gـر"
  },
  {
    word: "ديسكورد",
    replace: "ديسـkـورد"
  },
  {
    word: "سعر",
    replace: "سـ3ـر"
  },
  {
    word: "نيترو",
    replace: "نـيـtـرو"
  },
  {
    word: "متوفر",
    replace: "متـ9فـر"
  },
  {
    word: "توكنات",
    replace: "ت9كنات"
  },
]

client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + "replacer")) {
  if(!message.member.permissions.has("ADMINISTRATOR")) return;
    const embed = new MessageEmbed()
    .setTitle("تشفير")
    .setDescription("**لتشفير منشورك قم بالضغط على الزر و ضع منشورك.**")
    .setThumbnail(message.guild.iconURL())

      const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("SECONDARY")
            .setLabel("تشفير")
            .setCustomId('replace')
        )
    message.channel.send({embeds: [embed], components: [row]})
  }
})


client.on("interactionCreate", async i => {
  if (!i.isButton()) return;
  if (i.customId == "replace") {
            const modal = new Modal()
            .setTitle('تشفير')
            .setCustomId('rep')

   const replacer = new TextInputComponent()
            .setCustomId('replacetext')
            .setLabel(`قم بـوضع منشورك هنا لتشفيره`)
            .setMaxLength(2000)
            .setRequired(true)
            .setStyle("PARAGRAPH")

       const rows = [replacer].map(
                (component) => new MessageActionRow().addComponents(component)
            )
            modal.addComponents(...rows);
            i.showModal(modal);

  }

})

client.on("interactionCreate", async i => {
  if (!i.isModalSubmit()) return;
  if (i.customId == "rep") {
let text = i.fields.getTextInputValue('replacetext');
    let replaced = false;

    replace.forEach(t => {
      const regex = new RegExp(t.word, 'g');
      if (regex.test(text)) {
        text = text.replace(regex, t.replace);
        replaced = true;
      }
    });


    if (replaced) {
i.reply({content: `\`المنشور بعد التشفير :\`\n\n ${text}`, ephemeral: true})
    } else {
      i.reply({content: "**منشورك لا يحتاج للتشفير**", ephemeral: true})
    }
  }
  

})
process.on("unhandledRejection", e => {
  console.log(e)
})

client.on('messageCreate', (message) => {
  if (message.content === 'count') {
    const guild = message.guild;

    if (guild) {
      const members = guild.members.cache;

      // عمك احمد مكسيكان
      const bots = members.filter(member => member.user.bot);
      const realUsers = members.filter(member => !member.user.bot);

      message.channel.send(`**عدد البوتات في السيرفر: ** ${bots.size} `);
      message.channel.send(`**عدد الأعضاء الحقيقيين في السيرفر:** ${realUsers.size} `);
    } else {
      message.channel.send('يرجى تنفيذ الامر في سيرفر.');
    }
  }
});









////////////

process.on("uncaughtException" , err => {
return;
})
process.on("unhandledRejection" , err => {
return;
})
process.on("rejectionHandled", error => {
return;
});

client.on('messageCreate', message => {
  if (message.content.startsWith('$تحويل')) {
    return message.reply('التحويل فقط ل <@1081921031448571944>')
  }
});




client.on('messageCreate', message => {
  // تحقق إذا كان المستخدم لديه رتبة معينة باستخدام الـ ID
  const roleId = "1198292661174534174"; // استبدل هذا بـ ID الرتبة التي تريدها

  if (!message.member.roles.cache.has(roleId)) {
    return; // إذا لم يكن لدى المستخدم الرتبة، لا تفعل شيئًا
  }

  if (message.content.startsWith('+تقييم')) {
    return message.reply("<:11:1240283901948203059> <:11:1240283901948203059> <:11:1240283901948203059> <:11:1240283901948203059> <:11:1240283901948203059> <:11:1240283901948203059>\n\n<:90:1240287468155044021> لاتنسى تقييم الاداري بكتابة الامر $تقييم \n\n<:90:1240287468155044021>  وتقييم الخدمة في روم الاراء فضلا وليس امرا <:Cat:1190326140640968775>\n\n<:11:1240283901948203059> <:11:1240283901948203059> <:11:1240283901948203059> <:11:1240283901948203059> <:11:1240283901948203059> <:11:1240283901948203059>")
  }
});





client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.content.toLowerCase() === prefix + 'help') {
        const helpMenu = new Discord.MessageEmbed()
            .setTitle('قائمة المساعدة')
            
            .addField('$sub', 'لعمل روم مؤقته  ')
            .addField('$معلومات', 'لعرض معلومات   ')
            .addField('$منشور', ' لعمل منشور لشخص')
            .addField('$نقاط', '  لعرض نقاط الاداري  ')
          
            .addField('$رول', '  لاعظاء رول لشخص ')

            .addField('$تقيم', '   لتقيم اداري ')
            .addField('$renew', '  لتجديد الروم   ')
      
      
      
              // قم بإضافة المزيد من الأوامر حسب احتياجاتك

        message.channel.send({ embeds: [helpMenu] });
    }
});



  

const rooms = ["1246643058846597160","1244307435884380202","1233758913799786557","1233758874968789072","1233758835676545104","1233758798783582238","1233758759285952535","1233758722254176256","1233758698392780840","1233758656663912479","1233758625512558662","1209979437333086279","","","",""];
//
const line = "https://i.imgur.com/f2b0U8g.jpeg";

client.on('messageCreate', message => {
  if (rooms.includes(message.channel.id) && !message.author.bot) {
    message.channel.send(line);
  }
}); 



        
  






let owner = "1241370065862004796";
client.on("messageCreate", General => {
    if(General.content.startsWith(prefix+"se")){
        if(General.author.id !== owner) return;
        let name = General.content.split(" ").slice(1).join(" ");
        if(!name) return General.reply("❌ اكتب الاسم الجديد من فضلك")
        client.user.setUsername(name);
        General.reply(`**تم تغيير اسم البوت الى ✅ ${name}**`);
    }});







client.on("messageCreate", async (message) => {
  if (message.content === prefix + "uptime") {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    const uptimeString = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    const ping = Date.now() - message.createdTimestamp;

    let color;

    if (ping < 100) {
      color = "#00FF00";
    } else if (ping < 200) {
      color = "#FFFF00";
    } else {
      color = "#FF0000";
    }

    let emoji;

    if (ping < 100) {
      emoji = "🟢";
    } else if (ping < 200) {
      emoji = "🟡";
    } else {
      emoji = "🔴";
    }

    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Bot Uptime & Ping:")
      .addField("Uptime", `**${uptimeString}**`, true)
      .addField("Ping", `**${emoji} ${ping}ms**`, false)
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", async message => {
if (message.author.bot) return;
if (!message.channel.guild) return;
if (message.content.startsWith(prefix + 'say')) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
  return message.reply("** 😕 You don't have permissions **"); 
}
if(!message.guild.me.permissions.has('ADMINISTRATOR')) {
  return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
}
let args = message.content.split(' ').slice(2).join(' ')
let argss = message.content.split(' ')
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(argss[1])
        let attach = message.attachments.first()
        if (!channel) return message.channel.send('** 😕 Please mention channel or id **');
        if (!args) return message.channel.send('** ❌ Please select a message **');
        message.delete()
      if (!attach) {
        channel.send({content: `${args}`});
} else {
        channel.send({content: `${args}`, files: [attach]});
}
    }
});

client.on("messageCreate", message => {

if(message.content === `id`){
      message.reply(`${message.author.id}`)
}
})

client.on("messageCreate", message => {
  if (message.content.startsWith(prefix + "اعلان")) {
    if (message.member.roles.cache.some(r=> r.id == discorsLeader)) {

if(message.content.startsWith(prefix + "اعلانات")) return false;

member = message.mentions.members.first()
      if (!member) return message.reply("** يرجى منشن صاحب الاعلان أولاً !**")
manshor = message.content.split(" ").slice(2).join(" ");
  if (!manshor) return message.reply("** يرجى وضع الاعلان أولاً !**")

let embed = new Discord.MessageEmbed()
      .setTitle(`** إختر نوع المنشن :**`)
      .setDescription(`** يرجى إختيار نوع المشنن المناسب : \`here\` أو \`everyone\`\nالاعلان :\n\`${manshor}\`**`)
      .setColor("ffffff")
  let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("here")
        .setCustomId("adhere")
        .setStyle("SECONDARY")
    )
  .addComponents(
   new Discord.MessageButton()
        .setLabel("everyone")
        .setCustomId("adeve")
        .setStyle("SECONDARY")
    )

  message.reply({ embeds: [embed], components: [row] })
            }}});

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

 if (interaction.customId === "adhere") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader) || interaction.member.permissions.has('ADMINISTRATOR')) {
    const message = await interaction.channel.messages.fetch(interaction.message.id); 

const heremanshor = `@here\n${manshor}`


let embed2 = new Discord.MessageEmbed()
      .setTitle(`** هل انت متأكد من إرسال الاعلان ؟**`)
  .setDescription(`** يرجى الإستجابة مع الأزرار بـ \`إرسال\` أو \`إلغاء\` ..\n الاعلان :\n\`${heremanshor}**`)
      .setColor("ffffff")
  let row2 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("إرسال")
        .setCustomId("adhcompleteid")
        .setStyle("SUCCESS")
    )
  .addComponents(
   new Discord.MessageButton()
        .setLabel("إلغاء")
        .setCustomId("adhcancelid")
        .setStyle("DANGER")
    )

    message.edit({ embeds: [embed2], components: [row2] });
      } else {
      interaction.reply({ content: `** لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
    }
  } else if (interaction.customId === "adeve") {
    if (interaction.member.roles.cache.some((role) => role.id === discorsLeader) || interaction.member.permissions.has('ADMINISTRATOR')) {
    const message = await interaction.channel.messages.fetch(interaction.message.id); 

const evemanshor = `@everyone\n${manshor}`


let embed2 = new Discord.MessageEmbed()
      .setTitle(`** هل انت متأكد من إرسال الاعلان ؟**`)
  .setDescription(`** يرجى الإستجابة مع الأزرار بـ \`إرسال\` أو \`إلغاء\` ..\n الاعلان :\n\`${evemanshor}**`)
      .setColor("EA3648")
  let row2 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("إرسال")
        .setCustomId("adecompleteid")
        .setStyle("SUCCESS")
    )
  .addComponents(
   new Discord.MessageButton()
        .setLabel("إلغاء")
        .setCustomId("adecancelid")
        .setStyle("DANGER")
    )

    message.edit({ embeds: [embed2], components: [row2] });
      } else {
      interaction.reply({ content: `** لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
    }
  }
});        

client.on("interactionCreate" , async interaction => {
if(interaction.customId == "adecancelid") {
if (interaction.member.roles.cache.some((role) => role.id === discorsLeader) || interaction.member.permissions.has('ADMINISTRATOR')) {
const message = await interaction.channel.messages.fetch(interaction.message.id);

let embed3 = new Discord.MessageEmbed()
  .setColor(`ffffff`)
  .setDescription(`** تم إلغاء إرسال هذا الاعلان .
 بواسطة :
${interaction.member}
**`)

message.edit({ embeds: [embed3], components: [] });
} else {
      interaction.reply({ content: `** لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
}
}});

client.on("interactionCreate" , async interaction => {
if(interaction.customId == "adhcompleteid") {
if (interaction.member.roles.cache.some((role) => role.id === discorsLeader) || interaction.member.permissions.has('ADMINISTRATOR')) {
const message = await interaction.channel.messages.fetch(interaction.message.id);
const now = new Date();
  const adChannel = client.channels.cache.get('1190321586230800454');
  const adLog = interaction.guild.channels.cache.get('1209979437333086279');

  const memhere = `${member}`
  const manshorhere = `@here\n${manshor}\n اعلان مدفوع , ليس لنا اي علاقة بالسيرفرات التي ننشرها`

let embed5 = new Discord.MessageEmbed()
  .setColor(`ffffff`)
  .setDescription(`** تم إرسال هذا الاعلان إلى ${adChannel}
 بواسطة :
${interaction.member}
**`)

message.edit({ embeds: [embed5], components: [] });

  await adChannel.send(`${manshorhere}`);
await adChannel.send(`${line}`)

await adLog.send(`** \n\`${manshor}\`\n  :\n@here\n   **`)
  await adLog.send(`${line}`)

} else {
      interaction.reply({ content: `** لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
}
}});

client.on("interactionCreate" , async interaction => {
if(interaction.customId == "adecompleteid") {
if (interaction.member.roles.cache.some((role) => role.id === discorsLeader) || interaction.member.permissions.has('ADMINISTRATOR')) {
const message = await interaction.channel.messages.fetch(interaction.message.id);
const now = new Date();
  const adChannel2 = client.channels.cache.get('1190321586230800454');
  const adLog2 = interaction.guild.channels.cache.get('1209979437333086279');

  const memeve = `${member}`
  const manshoreve = `@everyone\n${manshor}\nاعلان مدفوع , ليس لنا اي علاقة بالسيرفرات التي ننشرها`

let embed5 = new Discord.MessageEmbed()
  .setColor(`ffffff`)
  .setDescription(`** تم إرسال هذا الاعلان إلي ${adChannel2}
 بواسطة :
${interaction.member}
**`)

message.edit({ embeds: [embed5], components: [] });

  await adChannel2.send(`${manshoreve}`);
await adChannel2.send(`${line}`)

await adLog2.send(`**\n\`${manshor}\`\n  :\n@everyone\n   **`)
  await adLog2.send(`${line}`)

} else {
      interaction.reply({ content: `** لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
}
}});