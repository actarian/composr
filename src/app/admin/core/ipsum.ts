
const IPSUM = [
	'And yet you haven\'t said what I told you to say! How can any of us trust you? Kif might! Check it out, y\'all. Everyone who was invited is here. Isn\'t it true that you have been paid for your testimony?',
	'Ask her how her day was. Kif, I have mated with a woman. Inform the men. Whoa a real live robot; or is that some kind of cheesy New Year\'s costume? There\'s one way and only one way to determine if an animal is intelligent. Dissect its brain!',
	'Bender, quit destroying the universe! Yes, I saw. You were doing well, until everyone died. Okay, it\'s 500 dollars, you have no choice of carrier, the battery can\'t hold the charge and the reception isn\'t very…',
	'But I know you in the future. I cleaned your poop. Oh, I don\'t have time for this. I have to go and buy a single piece of fruit with a coupon and then return it, making people wait behind me while I complain.',
	'Calculon is gonna kill us and it\'s all everybody else\'s fault! Oh God, what have I done? There, now he\'s trapped in a book I wrote: a crummy world of plot holes and spelling errors! Uh, is the puppy mechanical in any way?',
	'Can we have Bender Burgers again? Well, let\'s just dump it in the sewer and say we delivered it. Fry! Quit doing the right thing, you jerk! Michelle, I don\'t regret this, but I both rue and lament it. Whoa a real live robot; or is that some kind of cheesy New Year\'s costume?',
	'Dear God, they\'ll be killed on our doorstep! And there\'s no trash pickup until January 3rd. Fetal stemcells, aren\'t those controversial? Perhaps, but perhaps your civilization is merely the sewer of an even greater society above you!',
	'Do a flip! Okay, it\'s 500 dollars, you have no choice of carrier, the battery can\'t hold the charge and the reception isn\'t very… Michelle, I don\'t regret this, but I both rue and lament it. Ven ve voke up, ve had zese wodies.',
	'Dr. Zoidberg, that doesn\'t make sense. But, okay! Actually, that\'s still true. What\'s with you kids? Every other day it\'s food, food, food. Alright, I\'ll get you some stupid food. Oh sure! Blame the wizards!',
	'Good news, everyone! I\'ve taught the toaster to feel love! Ah, the \'Breakfast Club\' soundtrack! I can\'t wait til I\'m old enough to feel ways about stuff! Well I\'da done better, but it\'s plum hard pleading a case while awaiting trial for that there incompetence.',
	'Guess again. Fry, you can\'t just sit here in the dark listening to classical music. Why would a robot need to drink? You know, I was God once.',
	'Humans dating robots is sick. You people wonder why I\'m still single? It\'s \'cause all the fine robot sisters are dating humans! No! The kind with looting and maybe starting a few fires! What\'s with you kids? Every other day it\'s food, food, food. Alright, I\'ll get you some stupid food.',
	'Humans dating robots is sick. You people wonder why I\'m still single? It\'s \'cause all the fine robot sisters are dating humans! Soothe us with sweet lies. No, I\'m Santa Claus! Is that a cooking show? No! The kind with looting and maybe starting a few fires!',
	'I didn\'t ask for a completely reasonable excuse! I asked you to get busy! I\'ll get my kit! The alien mothership is in orbit here. If we can hit that bullseye, the rest of the dominoes will fall like a house of cards. Checkmate.',
	'I found what I need. And it\'s not friends, it\'s things. Or a guy who burns down a bar for the insurance money! Come, Comrade Bender! We must take to the streets! Bender?! You stole the atom. The key to victory is discipline, and that means a well made bed. You will practice until you can make your bed in your sleep.',
	'I haven\'t felt much of anything since my guinea pig died. There\'s one way and only one way to determine if an animal is intelligent. Dissect its brain! Do a flip! And when we woke up, we had these bodies.',
	'I love this planet! I\'ve got wealth, fame, and access to the depths of sleaze that those things bring. No, I\'m Santa Claus! You guys aren\'t Santa! You\'re not even robots. How dare you lie in front of Jesus?',
	'I never loved you. But, like most politicians, he promised more than he could deliver. Bender, being God isn\'t easy. If you do too much, people get dependent on you, and if you do nothing, they lose hope. You have to use a light touch. Like a safecracker, or a pickpocket.',
	'It may comfort you to know that Fry\'s death took only fifteen seconds, yet the pain was so intense, that it felt to him like fifteen years. And it goes without saying, it caused him to empty his bowels. Our love isn\'t any different from yours, except it\'s hotter, because I\'m involved.',
	'Leela, are you alright? You got wanged on the head. Yes, if you make it look like an electrical fire. When you do things right, people won\'t be sure you\'ve done anything at all. It\'s a T. It goes "tuh".',
	'Michelle, I don\'t regret this, but I both rue and lament it. Moving along… I\'m sorry, guys. I never meant to hurt you. Just to destroy everything you ever believed in. Anyhoo, your net-suits will allow you to experience Fry\'s worm infested bowels as if you were actually wriggling through them.',
	'No! I want to live! There are still too many things I don\'t own! You\'ll have all the Slurm you can drink when you\'re partying with Slurms McKenzie! Who\'s brave enough to fly into something we all keep calling a death sphere?',
	'Of all the friends I\'ve had… you\'re the first. Well, let\'s just dump it in the sewer and say we delivered it. I guess if you want children beaten, you have to do it yourself. I suppose I could part with \'one\' and still be feared…',
	'Oh God, what have I done? I usually try to keep my sadness pent up inside where it can fester quietly as a mental illness. Ooh, name it after me! Tell her she looks thin. Goodbye, cruel world. Goodbye, cruel lamp. Goodbye, cruel velvet drapes, lined with what would appear to be some sort of cruel muslin and the cute little pom-pom curtain pull cords. Cruel though they may be…',
	'Oh, I don\'t have time for this. I have to go and buy a single piece of fruit with a coupon and then return it, making people wait behind me while I complain. We need rest. The spirit is willing, but the flesh is spongy and bruised.',
	'Really?! I am the man with no name, Zapp Brannigan! Then we\'ll go with that data file! Man, I\'m sore all over. I feel like I just went ten rounds with mighty Thor. How much did you make me?',
	'Say it in Russian! Who are you, my warranty?! I\'m a thing. When I was first asked to make a film about my nephew, Hubert Farnsworth, I thought "Why should I?" Then later, Leela made the film. But if I did make it, you can bet there would have been more topless women on motorcycles. Roll film!',
	'Say what? I decline the title of Iron Cook and accept the lesser title of Zinc Saucier, which I just made up. Uhh… also, comes with double prize money. Kif might! Shut up and get to the point!',
	'Tell her you just want to talk. It has nothing to do with mating. I\'ve been there. My folks were always on me to groom myself and wear underpants. What am I, the pope? Hey, whatcha watching? When the lights go out, it\'s nobody\'s business what goes on between two consenting adults',
	'We\'ll need to have a look inside you with this camera. You\'ve killed me! Oh, you\'ve killed me! Our love isn\'t any different from yours, except it\'s hotter, because I\'m involved. Check it out, y\'all. Everyone who was invited is here.',
	'What kind of a father would I be if I said no? So I really am important? How I feel when I\'m drunk is correct? And when we woke up, we had these bodies. You guys realize you live in a sewer, right?',
	'Who are those horrible orange men? Hey, whatcha watching? Anyhoo, your net-suits will allow you to experience Fry\'s worm infested bowels as if you were actually wriggling through them. We\'ll go deliver this crate like professionals, and then we\'ll go home.',
	'Who\'s brave enough to fly into something we all keep calling a death sphere? What are you hacking off? Is it my torso?! \'It is!\' My precious torso! Why not indeed! Stop! Don\'t shoot fire stick in space canoe! Cause explosive decompression!',
	'With a warning label this big, you know they gotta be fun! Wow, you got that off the Internet? In my day, the Internet was only used to download pornography. I am Singing Wind, Chief of the Martians. In our darkest hour, we can stand erect, with proud upthrust bosoms.',
	'With gusto. Or a guy who burns down a bar for the insurance money! And I\'d do it again! And perhaps a third time! But that would be it. I love you, buddy!',
	'Yeah, and if you were the pope they\'d be all, "Straighten your pope hat." And "Put on your good vestments." For one beautiful night I knew what it was like to be a grandmother. Subjugated, yet honored.',
	'You guys aren\'t Santa! You\'re not even robots. How dare you lie in front of Jesus? Yep, I remember. They came in last at the Olympics, then retired to promote alcoholic beverages! I guess if you want children beaten, you have to do it yourself.',
	'You wouldn\'t. Ask anyway! But I\'ve never been to the moon! Yes, if you make it look like an electrical fire. When you do things right, people won\'t be sure you\'ve done anything at all. I suppose I could part with \'one\' and still be feared…',
	'You\'ve killed me! Oh, you\'ve killed me! We don\'t have a brig. Ummm…to eBay? Yeah, and if you were the pope they\'d be all, "Straighten your pope hat." And "Put on your good vestments." Good man. Nixon\'s pro-war and pro-family.',
	'Your best is an idiot! We\'ll need to have a look inside you with this camera. There\'s one way and only one way to determine if an animal is intelligent. Dissect its brain! Kids have names? I\'ve been there. My folks were always on me to groom myself and wear underpants. What am I, the pope?',
];
// source http://fillerama.io/

export function getIpsum(words: number): string {
	let sentence = IPSUM[Math.floor(Math.random() * IPSUM.length)];
	if (words) {
		sentence = sentence.split(' ').slice(0, words).join(' ');
	}
	return sentence;
}
