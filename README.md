# [Decentralized Library Dapp](https://decentralized-library.vercel.app/) 

## Introduction
The need to implement more web2 solutions into web3 have necesitated this idea. Decentralized library is a no-censorship library where users go to read books and watch video books using the web3 wallet.

The following benefit awaits users of this project
1.  Hundreds of Academic E-Books: The Library has more books that you could imagine. E-books repository are decentralized (IPFS Storage).
2. Lot of Video-Books: The full video books are here for you. if you cannot read the ebook format, you can read you favorite textbooks by watching them (IPFS Storage).
3. No Political Censorship: No fear from government of your country not allowing certain books. You can read or watch them here.
4. Learn and Earn: The very First decentralized Library where you LEARN and EARN.
5. Live Class Streaming: Lecturers / Teachers can use this platform to shedule live teaching and learning. just contact us
6. No Loss of Books: Prevent the accidental or intentional loss of information from human consciousness


## Getting Started

Choose one of the following options to get started:

- [Download the latest release](https://github.com/holyaustin/DecentralizedLibrary.zip) or
- Clone the repo: `git clone https://github.com/holyaustin/DecentralizedLibrary.git` or 
- Fork the repo

## Running the frontpage

- cd DecentralizedLibrary
- cd client
- run npm install >>> (to install the node modules)
- then run "npm run dev"

## Spin a localhost blockchain with hardhat

- From root directory,
- cd smart_contract
- npx hardhat node
- npx hardhat run scripts/deploy.js --network localhost
- npm run dev

## Before testing on localhost do the following
- Using your IDE or text editor,
- Go to client>>src>>pages>>csbooks>>csbooks.jsx and change the JsonRpcProvider to http://localhost:8545 on line 32
- do same for pages>>csvideo>>csvideo.jsx
- do same for pages>>reading>>reading.jsx
- do same for pages>>watching>>watching.jsx

once the jsonRpcProvider is changed to localhost, you can test the Dapp.

Happy testing

## dependancies
npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers web3modal @openzeppelin/contracts axios

## Deployment on polygon Mumbai testnet or Polygon Mainnet

- npx hardhat run scripts/deploy.js --network mumbai
- or
- npx hardhat run scripts/deploy.js --network polygon

## Quiz Url
Quiz url is https://delibrary-quiz-5vdhj9oa-holyaustin.4everland.app/

repo for quiz is: 

## Creator

[Decentralized Library](https://decentralized-library.vercel.app/) was coded and modified by and is maintained by **[me](https://github.com/holyaustin/)**, twitter contact is [holyaustin](https://twitter.com/holyaustin)

## Copyright and License

Code released under the MIT license.

## Categories of Books /  Videos
Various categories of books are be available in the following areas.

1 Humanities

1.1 Performing arts

1.2 Visual arts

1.3 History

1.4 Languages and literature

1.5 Law

1.6 Philosophy

1.7 Theology

2 Social science

2.1 Anthropology

2.2 Archaeology

2.3 Economics

2.4 Geography

2.5 Political science

2.6 Psychology

2.7 Sociology

2.8 Social work

3 Natural science

3.1 Biology

3.2 Chemistry

3.3 Earth science

3.4 Space science

3.5 Physics

4 Formal science

4.1 Computer science

4.2 Mathematics

5 Applied science

5.1 Agriculture

5.2 Architecture and design

5.3 Business

5.4 Divinity

5.5 Education

5.6 Engineering and technology

5.7 Environmental studies and forestry

5.8 Family and consumer science

5.9 Human physical performance and recreation

5.10 Journalism, media studies and communication

5.11 Law

5.12 Library and museum studies

5.13 Medicine and health

5.14 Military sciences

5.15 Public administration

5.15.1 Public policy

5.16 Social work

5.17 Transportation

- [ ] More features loading
# Decentralized_Library_V2-
