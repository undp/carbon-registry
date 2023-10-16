# National Carbon Market Game Setup

**Installation:** Set up on a fresh install of the default carbon registry [here](https://github.com/undp/carbon-registry)

## 🌍 Introduction

Your country Namibia is opening its Carbon Market! But beware: Not everyone here has good intentions. Dive into a world where you can either fight climate change or mastermind a genius scam! 

🎮 **Purpose of the Game**
- The game uses simplified real-life carbon market templates and processes.
- Acts as an educational tool for market participants and as a design tool for regulators to identify potential loopholes.

## 🕹 Gameplay Summary

There is a profit to be made in the international carbon markets today. How much? Well, the answer depends on how well we cooperaate.
- Engage in dialogs and negotiations to close up to five carbon project deals.
- Players take on roles with various objectives and abilities, navigating between personal, national, and international goals.
- Navigate through a web of public knowledge and private goals, where some characters may even be corrupt!

## 💻 Requirements

- An online game playable from any desktop or laptop with an internet browser.
- Microphone and audio out recommended.
- **Players:** Minimum of six, >20 recommended.
- **Hosts:** At least one game host needed.

## 🎨 Customization

Customize game cards to resonate with the carbon market ecosystem in Namibia. Try to customize the narrative on the cards to suit the player audience as appropriate before setting up. All images are created using Stable Diffusion XL and are available under the [Creative Commons CC BY](https://creativecommons.org/licenses/by/4.0/) license. All characters are fictional, and any resemblance to real people is unintentional. 

## 🛠 Setup

- **Virtual Machines:** Consider setting up virtual machines on Linode, installing Nextcloud Hub and Carbon Registry.
- **Host Account:** Create a game host account with admin privileges on the Carbon Registry training cloud installation.

### 📂 Folders and Files

Upload the **SimCarbon** folder containing:
   - Public  (Character Selection and Carbon Market Templates)
   - Player Inventories (private folder with cards and private character sheet)
   - State Sheet (Game Host Secret - tracks events outside the carbon registry)

## 🖥 Setting up Character Accounts

- Setup logins and passwords in the Carbon Registry and Nextcloud.
- We recommend using the same login credentials for both platforms.

## 🎲 Gameplay

### **User Actions:**
   - Outside actions are communicated directly to the game host.
   - To sign a Carbon Market Contract, players fill out the template, and all parties must agree.
   - eg. "@GameHost - I'm sending 1000 Dollars to @Bob" -> the GameHost adjusts +1000 in the "Money" value in the Bob row and -1000 for Alice in the state sheet."

To sign a Carbon Market Contract, the players have to fill out the template (defining the Terms resp. Investment conditions). Then all signatories have to agree in chat with a link to the filled template. e.g. Alice in chat "@GameHost @Bob @Eve We are signing this term sheet (link)" + thumbs up emoji reaction from Bob and Eve") -> GameHost sets Variable "Term Sheet" in the state sheet from 0 to 1 for Players A, B and C -> Now Alice, Bob and Eve can request creation of their program in the Carbon Registry with co-ownership over the credits as defined in the Term Sheet.

Players can also play cards by sending the link to the card to the game host. Playing cards can unlock information about corruption, other cards or change values in the state sheet.

### **Game Host Instructions:**
   - Rotate between groups, making necessary adjustments and interventions to maintain game flow.

If players are too stuck or solving everything too smoothly, you can make a executive interventions (you win the lottery! an earthquake damages your installation! etc. pp.). Mostly, you will be busy entering player choices from chat into the state sheet & copying newly unlocked cards into their inventories. If you are playing on Nextcloud Hub 6 as recommended resp. another tool with talk-time tracker, occasionally remind players with over-proportional talking time to keep it short and encourage those with very little talking time to step forward.

## 🔄 Game Rounds

### **Round Zero:** Character Choice
   - Selection from a list with various character categories.  (recommended asynchronous, pre-game)

## 🎭 Character Selection

- **List Selection:** Users select a character from the specified list.
  - (FOLDER - "public profiles only")

Ensure to have at least one character from each category:
- Carbon Owners
- Technology Suppliers
- Equity Financiers
- Credit Financiers
- Auditors
- Buyers
- National Regulators

**NPC Assistance:** Game hosts can assume roles if certain categories lack players, ensuring all roles are filled for a comprehensive gaming experience.
- (e.g. announce to the group: "There is no auditor playing today. You can hire an automatic auditor by sending me a message. 30k USD for a validation and 15k USD for a verification.".

### 🤔 Corruption Status
- The host or players decide the corruption status of characters, ensuring the game retains an exciting unpredictability.
- The host activates the character by ticking the box next to the name in the game [[state sheet]] and marks their corruption status by ticking the "corruption" box.

### **Round One: Marketplace Opening - 2023**

🏰 **Setting:** In the courtyard of the new Embassy, celebrating the "Opening Ceremony Namibian Carbon Market".

🕵️ **Objective:** Players have 25 minutes to explore business opportunities, making deals and advancing in the carbon project cycle.

They can use the [[TODO: market document templates]] to make deals and progress in the carbon project cycle. Actions in the registry are approved by the players playing as "regulator", while actions outside the registry are implemented by the game host in the [[state sheet]]. The host makes sure nobody violates their constrains (e.g. institutional investors require 1 years between agreement completion and signature).

### **Round Two:**

📰 **Updates:** In-game news brings new developments.
   - _"Fraudsters are among us!"_

🔒 **Closure:** Host updates the state sheets reflecting the developments of the round.

### **Round Three: Annual Carbon Market Fair - 2024**

🔄 **Objective:** Repeat the processes of round two, continue making deals, and playing out strategies.

🚀 **Progression:** Play as many rounds as needed. For heightened excitement, consider making rounds shorter, allowing projects to gain more ITMOs if registered earlier.

---

## 📊 Evaluation

- **TODO:** The state sheet will assess the percentage of total deals closed and distribute profits between national and international participants.

---

> Ensure continuous engagement, strategic play, and adherence to the provided instructions for a rewarding gaming experience!
