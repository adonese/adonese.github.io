---
layout: "page"
url: "/bio"
title: Extended resume, anecdotes and stories
---

You can download my resume [here](/cv.pdf). If you want a longer more detailed with a little bit of anecdotes from here and there you can proceed with reading this page.

My intention is to document some stories that might go usually unnoticed and not quite suitable for the industry's resume format. 

## Independent Projects, 2021-Present

After leaving Sudan due to the civil unrest in April 2021 and resettling in the UAE, I embarked on a series of self-directed ventures. These included:

- Further development of Sharik's mobile banking app, building on the KYC check feature to enhance security.
- Networking with SempoBlockchain and ConsenSys, leveraging these connections to gain recognition from MSX and SUI.
- Continuation of the project using blockchain and EMV chip technology to facilitate secure offline transactions in Sudan.
- These projects showcase my resilience and adaptability, as well as my commitment to leveraging technology to address pressing societal challenges.


## Sharik, Co-Founder and Tech Advisor, 2021-Present

In my role as a Tech Advisor for Sharik, I provided crucial technical consultations to teams in Sudan. Despite the challenging circumstances of working in a country facing civil unrest, my expertise in software engineering allowed me to design efficient software solutions for surveying and data collection.

One of my significant achievements includes the development of an Android mobile banking app, built using the modern toolkit Jetpack Compose and Jetpack Compose experimental APIs. The app ensures easy and secure money transactions, catering to the fintech needs of the region.

Additionally, I developed a robust digital ledger software, written in Go and deployed on AWS. The software is designed to maintain solid backend financial records and uses technologies such as DynamoDB, AWS Lambda Functions, SES, and SNS for optimal performance.

For secure user authorization, I designed an authentication system using the Android Trust Platform Module. The system creates a public/private key pair, with the private key securely stored in the TPM. This method offers a higher level of security than JWT or other authentication methods, as it prevents the private key from being tampered with.

In collaboration with the World Bank and Catholic Refugee Services, I advocated for the launch of specific funding dedicated to Sudanese immigrants and internally displaced persons (IDPs) through our platform. This involved thorough meetings with the World Bank, spanning several hours, and the creation of detailed processes and procedures (both technical and non-technical). We provided factual figures to support our claims, leading to a successful collaboration.

I also worked with 249 Startups, Sudan's largest Venture Capital, to build a digital funds platform for their internal system. The platform tracks cash-based humanitarian aid and ensures a safe and secure way of transacting money.

I leveraged my network to meet with the CEO of MSX, a prominent Abu-Dhabi based blockchain, and stable coin currency provider. I presented a convincing case for them to avail MSX currency in Sudan. The work is currently in progress and being carried out in partnership with 249.

Furthermore, we had a successful meeting with SUI, a permission-less layer 1 blockchain, while working with MSX. I was able to present a strong case for both SUI and MSX to enroll us as a business partner.

In the midst of these projects, I continued to devote time and energy to our new mobile banking app, introducing a KYC check that uses ML-Kit to capture various compulsory KYC requirements such as face and ID verification.

These achievements were recognized by MSX and SUI, in part due to my previous networking with SempoBlockchain and ConsenSys, and the implementation of blockchain in combination with EMV chip to offer a secure way to do offline transactions in Sudan. Despite the challenges brought on by the civil unrest in Sudan, I was able to leverage my skills and experience to create impactful solutions and foster valuable partnerships.


## 2021-NOW Tuti Tech Investment
Co-founded and led the technical vision of Tuti Tech Investment, a cloud-based payment platform with cross-border operations
- Built and managed a diverse technical team, delivering innovative solutions for mobile, web and POS payments
- Ensured the technical and regulatory compliance of the platform, adhering to PCI DSS and financial authorities' standards
- Collaborated with business stakeholders and partners, developing proposals, presentations and projections for new opportunities
- Oversaw the social media strategy and soft-launch of the flagship payment app, generating user feedback and engagement
As a Senior Software Engineer at Tuti Tech Investment, I had the privilege of leading the development and implementation of a groundbreaking solution that combined Ethereum's blockchain technology with a Point of Sale (POS) network to offer offline transactions in conjunction with EMV chip cards. This innovative approach allowed us to address the challenges faced by individuals in areas with limited connectivity or infrastructure, ensuring secure and reliable transactions even in such circumstances. At tuti tech, I cofounded the company, built rigorous processs and workflows to ensure seamless work experience within different teams. grown the company from 1 engineer to 15 engineers, migrated myself legacy android java with multiple activities and xml views to jetpack compose, I also had tov work on as low level as getting to understand how jetpack compose implements listeners and how they have implemented the keyboard since we have our own secure and customised keyboard. On the backend, I also wrote the core backend system for the chat messaging, the system uses Redis for publishing and subscribing, and web sockets. we had ways to distribute the active clients and ensure online ones, ways to ensure message delivery, backing up messages in database in such a way to ensure offline users will "fetch" the messages when they are get back online and really lots of work to ensure that the chat works smoothly. another thing major contribution we worked on is an event driven system that uses streams. the streams are transactions streams for micorfinance system. the system fans out (sns topic on aws) fans out the subscriber varies, from lambda function (that does take the data to an internal dashboard system), an e-payment Microservices on SQS aws component that queues the transactions and relays them to an online switch system, an Microservices sqs system that connects to the core Microfinance system. They suggest to always quantify your skills, so include that I managed to increase technical team from 1 to 15 and by that I helped the organisation to cut time to market and by 2 quarters, i also managed internal and hire internal team to deliver an agency banking solution that only costs us 10K per 3 months, managed to convince the company we can do that as oppose of subscribing to a software from a company that they suggested it would cost $900K USD (by working with the CEO and CFO since I was CTO to align my team plan for the next year with the organisation objectives, I also managed to pull that off within our current resources and without affecting our running tasks, by smartly architecting our code to be reusable across different businesses). the chat service managed to give us an edge in terms of competitors, and also since we developed the systems internally we reduced substantial costs and another aspect is that we were not so sure about the business use cases of it so not putting a huge investment in it was good. A third thing is that the same code of the chat we created a library for it, open sourced it and reused it again in our platform to power other features (e.g., the chat for us is interesting in its realtime aspects and the web socket multi-way connection, so we used that for p2p direct payments where our users can create a qr and then the other user will scan it and via the library we can share all info including payment / transaction status)


## 2019-2021 Solus ltd 

after gauging sufficient traction for noebs via Linkedin, events, meetups, and word of mouth, it became next to logical to incorporate noebs and build a business around it, that was in the first quarter of 2019. We ran through hiccups in the start with failed partnerships, but in the end I managed to form a group of fully dedicated founders that believe in open source values and building a responsible company, down to in the company mandate we decided that the company would support unions AND also that our startup would have a package for employees benefits from stock options, to health insurance and supporting unions as well. Solus truly had opened my eyes to some aspects that being too technical and geek would cloud your judgement from seeing them. We hired an accountant, a secrteriate, and an advisor to the board. They were all seniors, part-timing with us but they brought in their stories. I learned to become a better human.

Solus was truly a labor of love, we were 4 cofounders and 7 non-shareholders employees. Solus establishment coincided with Sudan's revolution, the situation was truly bumpy in every way. Our seed was $10K and we had an agreement of a guaranteed funding of $100K in case we get the CBOS approval.
- We get the approval from the first round, and that got us a recognition from the regulator for being the first vendor ever to pass from the first round of testing.
- Our open source system has became known to the regulator and we have had meetings with the Head of Electronic Payment Department discussing various aspects of our system: security, clarification as to why open source is the right approach for payment services, logging and retention periods, durability of the system logs, it was ultimately a great set of sessions where to my knowledge was the first time a fintech company was introduced to have these enlightening meetings with the regulator. Not far after that, the old regime had fallen, a coup and tragic massacare occured and internet was shut for several months across Sudan. That hit us deeply since we were just about to plan for our release of POS and app. Two of the cofounders have decided to leave, all of our team had left due to us unable to pay their salaries and I remained with a non-programmer cofounder, we only had our licenses and there was a sunk cost to it, we didn't want to abandon it. Solus was truly a labor of love. I worked on the whole stack for 18 months, i was working on the backend core system with Go, i developed our dashboard using react, i added analytics and instrumentation using prometheus and grafana dashboard. I also took over our mobile app responsibility and the web portal (Angular). I was also using my social media accounts on Linkedin and Blog to attract customers to us. That helped us landed a client (Sudanese / Omani telecom provider) who was interested in having a payment system, they had old POS and they hired me (Solus, but actually me) to aim them integrate noebs APIs to their POS. With my previous POS experience and C and bit of Googling, we were able to get a working demo within a month. Challenges we faced:
- the strict timeline, if we didn't make a successful transaction within a month timeframe, we won't be able to recieve our money
- the pos had far more issues than they described to us
- the pos tls stack was using ssl v3 which doesn't meet PCI DSS
- as with the case with many POS providers, no support and little to no documentations
- their developer was all the way in Canada and the timezone was not really helping, but in the end and through a lot of wireshark sessions we were able to identifiy the problem was in the TLS handshake, so we started looking left and right and in the end we implemented tls from scratch in that ancient POS.
- Another funny story is that the POS build can only happen in a windows XP, and they lost access to the SDK and the signature programs, so they have this sacred PC and when we started the development they had to send it from Oman to Canada.

- in the end we managed to get a successful demo, we got the contract and then Covid-19 hit. Again, the country had to put to halt for several months. The payment stopped, and everything stopped. 
- During Covid i worked with the mininstry of health to build a rapid response system that links between the call center systems and the isolation centers (https://github.com/gndi/tracker), it is a PHP project and has interesting GIS features and analysis
- I also worked with Ministry of trading and industry on a design of a system that tracks the flour from the importers to the grinders and all the way to the bakery, the government was subsidizing flour and a lot of corrupt was happening (https://github.com/adonese/mit) i wrote the backend system, while the frontend was written by another team
- in the time i also worked as a freelancer and built some apps including a service app and a real-time ride sharing app. The realtime sharing app was using AWS infrastructure from DynamoDB, DNS and a fanout channel to mobile and sms and dashboard for call center. 
- we also won a bid for building a software for the ministry of petroleum to implement an enterprise management system for fuel stations. Essentially, the government was subsidizing fuel and they wanted to only subsidize a portion (e.g., 4 galons per car per month). So our proposal included a microcontroller device that would be connected to the dispenser, the microcontroller will be connected to our middleware and receives inputs from the POS regarding the owner (via their ATM card number, which we reverse look it to fetch the mobile number) and then the microcontroller will set the fuel recieved to the car given their monthly quota
- the project was halted due to a political change in policies, they changed the whole ministries and eventually the new government decided to stop all of subsidation
- i grew interests in finding more angles to our business by offering saving and loan products by working with microfinance institutions (since banks stopped offering these products), that led me to be involved with COOP movement in Sudan. I was hosting all of initial meetings that led into COOP mandates in my office and we were brainstorming for months. 
- UNDP got interested in our efforts and they suggested we join forces and that they can fund our coops projects
At Solus, a very interesting technical project i led and worked on was this: we were working on building an offline-first payment system to help with areas in sudan where no internet access and or featured phones. Our solution involved leveraging the power of Ethereum's blockchain technology to provide a decentralized and tamper-proof ledger for recording transactions. Smart contracts played a crucial role in defining the rules and logic for validating and recording each transaction securely. By utilizing Ethereum's smart contract capabilities, we ensured that transactions were executed based on predefined conditions and automatically recorded in a tamper-proof manner.

To enable offline transactions, we integrated the POS network with EMV chip card technology. EMV chip cards, also known as chip and PIN cards, provide an added layer of security compared to traditional magnetic stripe cards. By incorporating EMV chip card technology into our POS system, we enabled users to conduct secure and encrypted offline transactions even in areas with limited internet connectivity.

The POS network acted as a bridge between the EMV chip cards and the Ethereum blockchain. When a transaction was initiated offline using an EMV chip card, the POS device securely stored the transaction data locally. Once an internet connection was established, the POS device connected to the Ethereum network and broadcasted the transaction data to the blockchain for verification and recording. This approach ensured that transactions could be seamlessly executed offline and later synchronized with the blockchain when connectivity was available.

The combination of Ethereum's blockchain technology, EMV chip cards, and the POS network allowed us to provide a comprehensive solution for offline transactions. It offered users the convenience of conducting secure transactions using their EMV chip cards, regardless of their geographical location or the availability of internet connectivity. This solution was particularly valuable in regions with limited infrastructure or intermittent internet access, empowering individuals to access essential financial tools and services without limitations.

I take great pride in this achievement as it showcases my ability to think innovatively, integrate diverse technologies, and create solutions that have a positive impact on people's lives. It demonstrates my proficiency in blockchain technology, particularly in the context of Ethereum, as well as my expertise in POS systems and EMV chip card integration.

2021 Working with UNDP and getting a long-term contractor with UNDP
I worked as a fintech and tech consultant to UNDP. I worked as a consultant for UNDP Sudan to offer technical consultations for fintech and SACCOS (credit unions). My work involves reviewing policies, disk reviews, policies brief, and avail the findings in papers for roundtable discussions and presentations for various stakeholders. The technical part is about recommendations for the technical platforms for the SACCOS from SACCOS registration systems, integrations with other platforms (National ID system), to internal requirements to run SACCOS (ERP solutions, invoicing, and loan applications). The last part of the consultation is about using fintech to power the SACCOS and help with e-SACCOS in Sudan. That involves the technical requirements to integrate with payment processors, compliance and risk assessment, and building a reference implementation system for e-SACCOS loaning applications.


## Ashrafcom: 2018-2019
- i got a job at Ashrafcom as a python / backend developer
- Ashrafcom is one of the largest and oldest tech companies in Sudan
- Ashrafcom was the sole contractor to the government of Sudan to provide technonlogy solutions for collecting the government invoices, including taxes, customs, and VAS
- There was a huge organization mess when i joined ashrafcom:
	- the company bought a payment system (Django based) from a prominent payment company from the UK
	- the company didn't have a tech staff to properly hand-over the software
	- there was a mess everywhere, POS SDKs are not available, no proper code handover was implemented, vendors are there for the software and the hardware but no ones knows what were the problems so they could reach out
	- when i first came, i was assigned to "make the core system works", that was it! But in reality, there were plethora of problems that i had to see for the first time:
		- deploying django, following best practices by using nginx and hosting static files in Amazon S3
		- setting up gunicorn for django and learning about letsencrypt -- i had to do all of that with only google provisioning
		- for a payment system, we also have to connect with the Central Bank of Sudan Switch, that was also an area that i had no clue about in terms of setting up a VPN, ensuring a reliable connectivity, complying with the config requirements from Central Bank of Sudan and debugging connectivity issues. i used to do all of that, the actual coding and the follow up and communication with Central Bank of Sudan infrastructure department
		- After setting up the platform, i was involved directly in the mobile app PCI DSS tests. We had to go through 10 rounds of testing
			- in part, it was my first encounter with security tests
			- i was doing two parts:
				- fixing backend security issues
				- and acting as a project coordinator to facilitate between Central Bank of Sudan Security team and the mobile development team
			- after successfully finishing the app certification process and acquiring the license, i was then moved to work on the POS
			- the pos had one big issue: there was no SDK documentations and the SDK we have had, had missing pieces (e.g., we didn't have access to the POS printer SDK)
			- it was sleepless nights, i didn't have any experience with C language at all
			- i had to get myself comfortable with the build environment, so that i could at least be able to get whatever code is there built and signed to the device. 
			- we had a large (thousands) of POS that was not working, and we only have part of the SDK without training and no documentations whatsoever, for example the POS SDK for the printer was not available! That was part of the challenge. Another dimension to it was that the source code was written by different teams and no control version OR code documentations was in-place, there were all sources of challenges and it made for such a great experience that horned not only my technical excellency, but also communication and management skills. We had shared lovely moments and i have seen the quirkiness of software at its best:
				- one example is that the POS would fail in certain cases, i remember we figured this issue out as we were about to deliver the test POS to Central Bank of Sudan to test it, i was there in the car, my friend was driving and my first-thought was it could be a memory allocation bug. The POS was allocating just enough memory for the response -- and in a corner case, (e.g., a field called ResponseMessage returns a very long text when the Switch test server is down). So, as we were driving, i pulled my laptop and changed the server response in that issue to make the response smaller.
				- we also had to implement http/1.1 protocol in the pos to send and manually parse json responses AND later migrated that mess by using libcurl and cJSON
			- I was also assigned to start a project of moving our pos fleet to a different POS provider, to modernize our Linux-based POS and explore other options
			- I was also responsible for fetching new POS vendors, prepare a short-list and arrange interviews with them to ensure that our hardware partners are solid and mitigate for any vendor lock-in.
			- I had to take a break after a year at Ashrafcom, i learned a lot:
				- Ashrafcom was a big enterprise, but they made sure that the software department is very flxeible and agile 
				- it was exciting technical issue, since i worked on various projects (in addition to the ones i mentioned, I was reporting directly to the CEO and he appointed me to review other software projects with the government and report on their status and progress, e.g., Flour project with the governemnt, Khartoum-state subsisdary project for commodities, Fuel subsidation project)
				- it was also a great exposure to regulations, fintech industry and working with a large team 
				- i participated in interviewing candidates, setting up their job descriptions, preparing tech specs in contracts and when working with vendors, writing tech proposals, writing software requirements specifications
				- i exercised with system architecture and system design and system design document for projects that are managed by other teams or delegated to out source companies.
i left ashrafcom for personal ambitious to have my own business, but to this day i keep good contact with Ashrafcom and we even partnered in some projects. I left Ashrafcom in December 31. I took a hiatus for two months, the job at Ashrafcom was mentally stressing and affected my health. I started working on noebs: an open source payment gateway. 

noebs: 2018-Current
noebs is a suite of open source projects and libraries to integrate with payment systems via standard financial systems protocols. The core of system is written in Go and includes the main system components, that are financial transactions via a consistent RESTful API layer. Noebs core has adapters to different financial system messages, but the focus was on TWO, Compass Plus Plus system with its ISO8583 (1987 version). It has adapters and supports to newer systems such as ISO20022 protocol. The design started with a simple library that interacts with Central Bank of Sudan switch with the aim to provide a SaaS solution that other companies can subscribe to and use. Noebs has grown in popularity and it now features:
	- SDKs for android and flutter
	- ecommerce plugin
	- POS integration
	- RESTful API layer to interact with the system components
	- Thorough documentations for system API endpoints
	- optional authentication framework layer
	- optional websocket to facilitate peer-to-peer transactions (we call them real-time payments)
	- dashboard for overseeing all system transactions
	- prometheus and grafana dashboard for system health reports and api endpoints metrics and general system instrumentation
	- verified linux image for in-house deployments, it includes a harnessed version of ubuntu that passes CBOS PCI DSS requirements
	- ansible scripts to automate the whole process of setting up a new noebs installation
	- noebs follows a classical 3 tier architecture, with an nginx reverse proxy doing the tls termination and load balancing, while noebs represents the logic tier, and we have a database. We believe that the three-tier architecture has proven to be very successful in this scenario, as it allowed for an organic growth of each of these layers without little to no interlapping between them. It also helped with the development of noebs itself, noebs became just a program, it doesn't really care much about the persistent storage, nor does it do any logic regarding http, tls, authentication or whatsoever -- with that, as the requirements changed, we were able to hire people to work on the infrastructure part and later hired another engineer to work on the database / persistent storage layer, while all of them work asynchronously without blocking each others
All of that had made noebs the largest open source project in fintech, with constant contributions since 2018. The project is adapted by different fintech companies in Sudan some of them I have had affiliation with whilst others have just found it more convenient to adapt it. I only use noebs exclusively for open source since a paid job would have conflicted with my employers

## 2017 - NOW Geo and Innovation (G&I) / ACTS
We rent a small office in ACTS (a highly reputable Telecom provider company, established in 1991). Inititally, the goal was to work as a software company and offer training courses to help us with the cash flow. To that end, we rent an office from ACTS a highly reputable Telecom company that got hit real hard by Huawei and Ericsson and they eventually rendered it out of business. We were very young and ACTS last remaining owners literally adopted us, to the point they didn't take rent fees for the first 6 months. ACTS CEO and deputy believed in Software they tried before to pivot from hardware to software but they never succeeded. As the year passes by, ACTS seized its operation and their business was practically dead. We reached an agreement that led into me becoming one of the shareholders and that we can use ACTS name and brand. Using ACTS name has allowed to achieve great mutual benefits especially when working with NGOs
	- The initial goal was to offer specialized advanced training courses, including: 
		- Excel for telecoms and government agencies
		- Programming courses (web development and Python)
		- GIS courses, including web GIS and using machine learning with GIS
	- Lead the company efforts to build a machine learning system to identify roads, buildings and other features from satellite imagery -- that was my first serious (and unfortunately last) encounter with machine learning.
	- i worked with models on theano and caffe to train u-map on available satellite imagery 
	- we were able to sell a prototype to a company that was a contractor to Sudan's National Intelligence. The goal was to "allocate military vehicles in areas in Western Sudan". It was both exciting opportunity, since i was the tech lead of that project and also the main point of communication and business dev, but also was worrying in two aspects:
		- we didn't want to be involved with the military, we were rightfully scared to touch these areas
		- we were so desperate to land and opportunity that we didn't mind to do it for free (under no legal contracts)
		- i was worried since the hardware and investment needed to train models on Airbus satellite imagery with 30cm accuracy, it was REALLY complicated from just infrastructure point of view, the storage, computation complexity and all of that.
		- i had to teach myself spark and hadoop just to have a grasp on what its like to deal with GB-scale data
		- we made a successful prototype, we were able to identify roads and buildings, and shared all of our findings and recommendations to the client (including our machine learning archetcture which was a modification on umap to handle satellite imagery AND tricks to handle the complexity of satellite imagery; they came with different bands and good care needs to be taken)
		- the client changes their requirements and the project halted as a result
		- we learned a lot and we were able to build a name for ourselves and better experinece to handle clients 
	- I was responsible of preparing all tenders and proposals to NGOs, where i managed to land ACTS a contract with UNDP of more than $1M to become the implementer company for Sharik Project.
	- I also prepared and presented our portfolio as the main tech project lead for our Sandoog project with Mercy Corps. Sandoog is a saving group platform that empowers low income beneficiaries by giving them access to a simple mobile based app that they can use to create saving groups, manage them, and provide financial reports
	- so far, Sandoog doesn't support epayment but the plan is to rollout epayment soon
	- I also prepared and highlighted the tech requirements for our proposal to land Mahsool project
	- Mahsool is a platform to empower small farmers by allowing them to:
		- using Sandoog to create a saving group that they can use to fund their farming activities
		- an online platform where they can get instant feedback about best practices and insights related to farming practices in their area
		- a platform where they can get access to market via it, a mini ecommerce where they can sell their products
I'm focusing only in the NGOs, proposals, system design in my work at ACTS / G&I. I don't active day to day tasks, but only as a contractor and advisor, in addition to my shareholder and board rights.

- in 2015-2018, in my 4th year in university, i with my colleague have created EEBAx, our services were two things:
- website design (we started with wordpress) and then moved to Adobe Muse and finally to write HTML / CSS directly)
- we didn't make much money, but it was a good starting point
- in our final year, our graduation project was an android app, GeoidApp, which calculates very accurately using spherical harmonics, basically it helps to calculate a point height with great accuracy and almost zero costs. We participated with our graduation project (which then went on to win the best graduation project), in a nation-wide competition held by the British Council and we made it to top 10 projects out of thousands participants
- After that, in late December 2016, i finished my university got an engineering degree with the best graduation project and a record A+ and got admitted as a Teaching Assistant and Research Assistant in University of Khartoum.
- One of my department alumni suggested we could be partners with him in a software house / training center. We formed G&I (Geo and Innovation) in March 2017
