The game is to be set up on a fresh install of the default carbon registry as on https://github.com/undp/carbon-registry

Introduction:

Namibia is opening its Carbon Market! But beware: Not everyone here has good intentions. Try to fight climate change or line your own pockets with a genious scam!

The game uses simplified versions of real-life carbon market templates and processes. It serves both as an educational tool for market participants and a design tool for regulators to detect possible loopholes. The players take the role of one of a set of pre-defined characters covering the various roles and job descriptions involved over the lifetime of a carbon market project. Then they engage in dialog and negotiations to close up to five carbon project deals. 

Gameplay summary: There is a profit to be made in the international carbon markets today. How much? - Well, the answer depends on how well we cooperaate.
 
But who will take home how much of the profits? In this simulation, there is a trade off between the objectives of the international market and those of the national treasury. Depending on the characters alignment, your team goal is thus either to maximize national or international profits. The alignment of each character is public knowledge.

Additionally, each character has a set of private goals and abilities. Some of those goals may be in conflict with the team goal. And who knows, maybe some characters are even flat out corrupt?

Requirements:
- This is an online game that can be played from any desktop or laptop with an internet browser. Microphone and audio out are recommended. It is played in two separate browser tabs. 
The players use one tab to have audio- and chat conversations in fluid groups, chat & direct messages as well as exchange and co-edit files. It can be run on any system capable of those three requirements. The Demo uses a Nextcloud Hub for those functions.  

- Minimum of six players, >20 recommended. Included: 28 pre-made character sheets.

TO BE COMPLETED: their cards and several possible narrative forks and forseen interactions between them with the game. The number of players can be extended by adding more rows to the state sheet, character sheets and corresponding cards.

- At least one game host, investing approximately one full day for preperation (including hosting). For large groups, it may be advisable to have two game hosts.

- To play the game, players need to pick their character in advance, giving the game hosts enough to time to adjust the setup to the the players choices. Recommended at least two days between character choice and play. The play itself takes approximately half a day.

Customization:
The game cards are designed to echo the carbon market ecosystem in Namibia. Try to customise the narrative on the cards to the player audience as appropriate before setting up. All images are created using Stable Diffusion XL an under Creative Commons CC BY. All characters are purely fictional and any resemblance of real people is accidential and unintentional.

Setup:
The game requires at least one life game host. Create a game host account with admin privileges on the Carbon Registry and the Cloud. You can e.g. create two virtual machines on Linode and install Nextcloud Hub on one and the Carbon Registry on the other and have a user called "GameHost" as admin account on both. It's recommended to use proper certificates, DNS entries and https to avoid issues with browsers refusing connection.
(GOING FORWARD: RESTORE FROM BACKUP TO HAVE ALL CHARACTERS AND "PRE-GAME" STATE IN CLOUD AND REGISTRY, skip to "Gameplay")


Upload the SimCarbon folder to the Cloud. 
The SimCarbon Folder contains the following sub-folders:
- Public (Character Selection and Carbon Market Templates)
- Player Inventories (private folder with cards and private character sheet)
- State Sheet (Game Host Secret - tracks events outside the carbon registry)

Create users for all played characters on both the Cloud and the Registry. 

Setting up Character Accounts
- The host sets up the logins and passwords in the carbon registry. You can find the data for the registry entry at the top right of each public character sheet (FOLDER). We recommend using a throwaway email service to do so, as the registry will require one valid email per account as a security measure.

- The host creates logins and passwords for the Nextcloud. The host shares the folder with corresponding name with the characters. 

We recommend using the same login and password for both the registry and the cloud to keep things easy and communicable in one email.


Gameplay:
User actions outside the carbon registry are taken by describing them in a DM to the game host on the cloud chat.
e.g. Alice in Nextcloud Talk: "@GameHost - I'm sending 1000 Dollars to @Bob"
-> the GameHost adjusts +1000 in the "Money" value in the Bob row and -1000 for Alice in the state sheet. 

To sign a Carbon Market Contract, the players have to fill out the template (defining the Terms resp. Investment conditions). Then all signatories have to agree in chat with a link to the filled template.
e.g. Alice in chat "@GameHost @Bob @Eve We are signing this term sheet (link)" + thumbs up emoji reaction from Bob and Eve") 
-> GameHost sets Variable "Term Sheet" in the state sheet from 0 to 1 for Players A, B and C
-> Now Alice, Bob and Eve can request creation of their program in the Carbon Registry with co-ownership over the credits as defined in the Term Sheet.

Players can also play cards by sending the link to the card to the game host. Playing cards can unlock information about corruption, other cards or change values in the state sheet. 

GameHost Instructions during the rounds:

Rotate between the various groups, listen in how things are going. If players are too stuck or solving everything too smoothly, you can make a holy interventions (you win the lottery! an earthquake damages your installation! etc. pp.). Mostly, you will be busy entering player choices from chat into the state sheet & copying newly unlocked cards into their inventories. If you are playing on Nextcloud Hub 6 as recommended resp. another tool with talk-time tracker, occasionally remind players with over-proportional talking time to keep it short and encourage those with very little talking time to step forward.


Round Zero:
Character Choice (recommended asynchronous, pre-game)

Each user selects a character from this list:
(FOLDER - "public profiles only")

Make sure to have at least one character from each of the categories in the set. If that is impossible, the game host has to take over the missing role with an NPC (e.g. announce to the group: "There is no auditor playing today. You can hire an automatic auditor by sending me a message. 30k USD for a validation and 15k USD for a verification.". 

The categories are:
- Carbon Owners 
- Technology Suppliers 
- Equity Financiers
- Credit Financiers
- Auditors
- Buyers
- National Regulators 

The Game Host can decide / let the players decide on their corruption status. The game is more fun if there are enough "corrupted" players in the game to have a chance to get away with corruption. Only put one of the character sheets into the folder (either "regular" or "corrupt"). Make sure that only corrupt characters get the cards marked as "corrupt".


- The host activates the character by ticking the box next to the name in the game [[state sheet]] and marks their corruption status by ticking the "corruption" box.


Round One: Marketplace opening - 2023

Setting: You are in the courtyard of the new Embassy. The event is titled "Opening Ceremony Namibian Carbon Market"

The players have 25 minutes to find business opportunities. 

They can use the [[TODO: market document templates]] to make deals and progress in the carbon project cycle. Actions in the registry are approved by the players playing as "regulator", while actions outside the registry are implemented by the game host in the [[state sheet]]. The host makes sure nobody violates their constrains (e.g. institutional investors require 1 years between agreement completion and signature).

Close round two: 
- In Game News ("Fraudsters are among us!")
- The game host takes enough time to update the [[state sheet]]

Round 3: Annual Carbon Market Fair - 2024

Repeat round two

Play as many rounds as you like and as the players need to settle and play out their cards. You can make it more exiting by making the rounds shorter, as projects gain more ITMOs if it registers earlier.

You can fast-forward the last rounds once the deals are closed and only projects running and no more cards are played.

TODO:
The state sheet will evaluate the % of total deals closed and the share between national & international profit.


