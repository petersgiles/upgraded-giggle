exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('commitment')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('commitment').insert([
				{
					title: 'Youth Music',
					description:
						'Labor has committed $7.6 million over three years in extra support for music education and music teachers. The funding will go towards expanding school programs such as SongMakers, which brings musicians into schools, and Song Room, dedicated to providing music and art lessons to disadvantaged kids.',
					cost: '$7.6 million over 3 years',
					date: '30/11/2018',
				},
				{
					title: 'Bursaries to Encourage Australian Students to Study Teaching',
					description:
						'Labor has committed $45 million over five years to&nbsp;<span style="font-size: 12pt; font-family: Helvetica, sans-serif;">give our nation�s top achievers bursaries of up to $40,000 to encourage\nthe best and brightest Australians into teaching.</span><div><span style="font-size: 12pt; font-family: Helvetica, sans-serif;"><br></span></div><div><span style="font-size: 12pt; font-family: Helvetica, sans-serif;">Year 12 students with exceptional marks and people with outstanding\nachievement at university or in the workforce will compete for up to 1,000 of\nthe cash bonuses each year.&nbsp;</span><span style="font-size: 12pt; font-family: Helvetica, sans-serif;"><br></span></div><div><span style="font-size: 12pt; font-family: Helvetica, sans-serif;"><br></span></div><div><span style="font-size: 12pt; font-family: Helvetica, sans-serif;">The tax-free bursaries of $10,000 per year will be paid to recipients\nfor the duration of a teaching degree, up to a maximum of four years.&nbsp;</span><span style="font-size: 12pt; font-family: Helvetica, sans-serif;"><br></span></div>',
					cost: '$45 million over 5 years',
					date: '18/02/2019',
				},
				{
					title: 'Preschool and Kindy Program - Program Overview',
					description:
						"Labor has committed to a National Preschool and Kindy Program, which will:<div><ul><li>Guarantee every three and four year old can access 15 hours a week of affordable early childhood education.</li><li>Be available for long day care, sessional preschools and kindergartens with parents able to choose the services that best meet their needs.</li><li>Provide permanent ongoing funding for the four year old program, with the three year old component to commence in 2021.</li></ul><div><br></div><div>The Program includes a $100 million 'facilitation fund' to support the roll out of the program and $20 million for quality and safety standards.</div><div><br></div><div>The Program includes a goal of 90 per cent three year old preschool enrolment by 2023 and a commitment to work with the states and sector to build on the Early Years Learning Framework to develop a world class two-year play based program.</div></div>",
					cost: '$1.75 billion over the forward estimates',
					date: '4/10/2018',
				},
				{
					title: 'Preschool and Kindy Program facilitation fund',
					description:
						"Labor has committed $100 million for a&nbsp; 'facilitation fund' to support the roll-out of the Preschool and Kindy Program.",
					cost: '$100 million over the forward estimates',
					date: '4/10/2018',
				},
				{
					title: 'Preschool and Kindy Program Quality and Safety Standards',
					description:
						'Labor has committed $20 million over the forward estimates to ensure early learning centres are high quality and safe.',
					cost: '$20 million over the forward estimates',
					date: '4/10/2018',
				},
				{
					title: 'Public School Funding Boost',
					description:
						'Labor has committed to an extra $14.1 billion to be invested in public schools over the decade to 2028-29, with $3.3 billion provided over the first three years, which equates to an extra 8250 teacher placements.<div><br></div><div>The new national plan will set clear performance goals and targets for states and territories to lift school performance.</div><div><br></div>',
					cost: '$14.1 billion over 10 years',
					date: '11/10/2018',
				},
				{
					title: "First Nation's Girls' Education Program",
					description:
						"Labor has committed $19.5 million to boost to intensive in-school mentoring designed to lift school attendance, Year 12 completions, and employment rates for First Nation's Girls. This will create almost 8,000 new places in the Stars Foundation, tripling the number of girls supported each year.<div><br></div><div>The investment is to be funded from the Education Portfolio.</div>",
					cost: '$19.5 million',
					date: '22/11/2018',
				},
				{
					title: 'Sexual Assault Taskforce',
					description:
						'Labor has committed to establish a new independent taskforce to crack down on sexual harassment and assault at universities and residential colleges. The taskforce will be set up for a three year period, and will provide policy leadership and advice on evidence based prevention measures, track action by universities, and recommend ways responses can be strengthened.<div><br></div><div>All universities will have to publish data on sexual harassment and assault to improve transparency and better track progress.</div>',
					cost: '',
					date: '30/11/2018',
				},
				{
					title: 'TAFE Package - Overview',
					description:
						'<div>Labor has committed $473 million over the forward estimates and $708 million over the medium term to boost TAFE, apprenticeships and skills for Australians.<br></div><div><br></div><div>The TAFE Package will:</div><div><ul><li>waive upfront fees for 100,000 students</li><li><p>invest $100 million in modernising TAFE facilities around the country</p></li><li><p>guarantee at least two out of three government training dollars goes to TAFE</p></li><li><p>ensure one in every ten jobs on Commonwealth priority projects are filled by Australians apprentices</p></li><li><p>provide 10,000 pre-apprentice programs for young people who want to learn a trade</p></li><li><p>provide 20,000 adult apprentice programs for older workers who need to retrain.</p></li></ul><div><br></div></div>',
					cost: '$473 million over the forward estimates',
					date: '11/05/2018',
				},
				{
					title: 'Waiving of Upfront Fees for Vocational Education',
					description:
						'Labor has committed to waive upfront fees for 100,000 TAFE students who choose to learn the skills that Australia needs.<div><br></div><div>5 October 2018 - Labor further committed to allocate 10,000 of these fee-free TAFE placements to early education courses. In addition, at least 200 of these places are to go to Indigenous students seeking qualifications in early childhood education.</div>',
					cost: '',
					date: '11/05/2018',
				},
				{
					title: 'Modernising TAFE Facilities',
					description:
						'Labor has committed $100 million modernising TAFEs around the country.',
					cost: '$100 million',
					date: '11/05/2018',
				},
				{
					title: '200,000 Additional University Places',
					description:
						'Labor has committed almost $10 billion to uncap student places at university, which will provide an extra 200,000 places.',
					cost: 'Almost $10 billion',
					date: '10/05/2018',
				},
				{
					title: "Supporting Australia's Energy Workforce - Overview",
					description:
						'<div>Labor has committed $18.5 million to support local workers as Australia�s energy mix changes, helping them to plan for the future and take advantage of the tens of thousands of jobs available in renewable energy.\n\nLabor will implement a long-term plan to ensure workers are supported and are first in line for new job opportunities.<br></div><div><br></div><div>Labor will:&nbsp;</div><div><ul><li>Train workers in the skills they need.</li><li>Work with TAFEs, RTOs, unions, and industry, to make sure workers have the skills they need to benefit from Labor�s Plan for More Renewables and Cheaper Power.</li><li>Ensure any closures are managed to minimise community impacts.</li><li>Establish an independent Just Transition Authority to help plan for and coordinate the response to the eventual closure of coal-fired power stations in the future.</li></ul></div>',
					cost: '$18.5 million',
					date: '22/11/2018',
				},
				{
					title: 'Clean Energy Training Fund',
					description:
						'Labor has committed $10 million to a Clean Energy Training Fund to train workers in clean energy industries, from solar and battery installers, to energy management system professionals.',
					cost: '$10 million',
					date: '22/11/2018',
				},
				{
					title:
						'Restoration of Funding Cut from the Asian Education Foundation',
					description:
						'Labor has committed $1.5 million to restore funding cut from the Asian Education Foundation, while working with the states and territories through COAG to lift the focus on Asian languages.',
					cost: '$1.5 million',
					date: '3/10/2018',
				},
				{
					title: 'Establish the Australian-ASEAN Studies Centre',
					description:
						'Labor has committed to establish an Australian-ASEAN Studies Centre.',
					cost: '',
					date: '3/10/2018',
				},
				{
					title:
						'Seek an Agreement to Establish an Internship Program with China',
					description:
						'Labor has committed to seek an agreement to establish an internship program with China.',
					cost: '',
					date: '3/10/2018',
				},
				{
					title: 'Swim Smart Program',
					description:
						'<p class="MsoNormal">Labor has committed $46 million over three years to fund additional swimming lessons for schools that need it, catch-up lessons for kids needing extra support, and more support for the cost of transport and pool entry fees. The program will start from the 2020 school year.</p><p class="MsoNormal">The policy has been costed by the independent Parliamentary Budget Office to have a budget impact of $46 million over the forward estimates, and will be in addition to existing state and territory programs.</p>',
					cost: '$46 million over 3 years',
					date: '20/01/2019',
				},
				{
					title: 'Government Support for TAFE',
					description:
						'Labor has committed to guaranteeing at least two out of three government training dollars goes to TAFE.',
					cost: '',
					date: '10/05/2018',
				},
				{
					title: 'Australian Apprentices on Commonwealth Projects',
					description:
						'Labor has committed to ensuring that one in every 10 jobs on Commonwealth priority projects are filled by Australian apprentices.',
					cost: '',
					date: '10/05/2018',
				},
				{
					title: 'New Pre-apprentice Programs',
					description:
						'Labor has committed to providing 10,000 pre-apprentice programs for young people who want to learn a trade.',
					cost: '',
					date: '10/05/2018',
				},
				{
					title: 'New Adult Apprenticeships',
					description:
						'Labor has committed to providing 20,000 adult apprentice programs for older workers who need to retrain.',
					cost: '',
					date: '10/05/2018',
				},
				{
					title: 'National Inquiry into Post-Secondary Education ',
					description:
						"Labor has committed to a once-in-a-generation review of the post-secondary education system. To make sure the next generation of Australians are getting the right skills and knowledge and information and problem solving capacities to compete and win in the new economy.<div><br></div><div>The National Commission of Review will examine and make recommendations about how vocational and higher education systems address the country's economic and societal needs. It will commence with an inquiry into the structure of the vocational education and training system, including qualifications, curriculum, pedagogy, assessment, funding, regulation and quality assurance.</div><div><br></div><div>(Ch.7 Para 79 National Platform)</div><div><br></div><div>Labor will also appoint a dedicated Regional and Remote Commissioner to advise the National Inquiry into Post-Secondary Education.</div>",
					cost: '',
					date: '13/02/2019',
				},
				{
					title: 'Scholarships for Mining Engineering',
					description:
						"Labor has committed $2 million to provide 100 scholarships to arrest the dramatic decline in mining engineering degree commencements. Consistent with Labor's commitment to equality for women of Australia, no less than half of these places will be awarded to women.<div><br></div><div>On 20 March 2019, Labor further committed that 50 of these scholarships, each worth $20,000, will be provided to Australian students attending WA universities. Half of these will be awarded to women.<br></div>",
					cost: '$2 million',
					date: '13/02/2019',
				},
				{
					title: 'University Future Fund - Fund Overview',
					description:
						"Labor has committed to establish a $300 million University Future Fund. The fund will invest in new university research and teaching buildings, as well as projects that will drive our economy and support jobs and communities right around Australia. Out of the fund, Labor has committed:<div><div><ul><li>$20 million to establish a new agri-technology research centre at Western Sydney University's Hawkesbury campus in Richmond.</li><li>$20 million for Australia's first Indigenous residential college at the University of Technology, Sydney.</li><li>$12.3 million to establish a National Institute for Flood Resilience at Southern Cross University, Lismore.</li><li>$3 million for technology upgrades at Curtin University.</li></ul></div></div>",
					cost: '$300 million',
					date: '25/09/2018',
				},
				{
					title: 'Agri-technology Research Centre at Western Sydney University',
					description:
						"Labor has committed $20 million, as part of the University Future Fund, to establish a new agri-technology research centre at Western Sydney University's Hawkesbury campus in Richmond.",
					cost: '$20 million',
					date: '25/09/2018',
				},
				{
					title: 'New Indigenous Residential College',
					description:
						"Labor has committed $20 million as part of the University Future Fund, towards establishing Australia's first Indigenous residential college at the University of Technology, Sydney.",
					cost: '$20 million',
					date: '14/12/2018',
				},
				{
					title: 'Investing in Community Language Schools',
					description:
						'Labor has committed an extra $8 million for community language schools so more Australian children get the chance to learn other languages.<div><br></div><div>Grants of up to $25,000 per school will allow language programs to be expanded to preschool children. The grants could also go towards the costs of setting up a new school, better teacher training or classroom resources.</div>',
					cost: '$8 million',
					date: '15/02/2019',
				},
				{
					title: 'New Stage at Kadina High School',
					description:
						'Labor has committed to deliver a brand new $80,000 stage at Kadina High School for music, dance and drama productions.',
					cost: '$80,000',
					date: '5/02/2019',
				},
				{
					title: 'A National Institute for Flood Resilience',
					description:
						"<div>Labor has committed $12.3 million, as part of the University Future Fund, to establish a National Institute for Flood Resilience at Southern Cross University, Lismore. The Institute will include the creation of a flagship emergency Flood Response Centre for the Northern Rivers.</div><div><br></div><div>To complement the work of the National Institute, Southern Cross University will establish Australia's first Bachelor degree in Coastal Systems Engineering.</div>",
					cost: '$12.3 million from 2020-2021',
					date: '5/02/2019',
				},
				{
					title: "Establishing a National Principals' Academy",
					description:
						"Labor has committed to set up a new National Principals' Academy to provide thousands of Australian principals advanced leadership and training support.",
					cost: '',
					date: '20/02/2019',
				},
				{
					title: 'Funding Boost for Students with a Disability',
					description:
						'Labor has committed an extra $300 million to ensure students with a disability get the support they need at school. The commitment is in addition to the disability loading included as part of needs based school funding. It will be allocated on a per student basis consistent with the current disability loading.',
					cost: '$300 million',
					date: '20/02/2019',
				},
				{
					title: 'Restoring integrity to the Australian Research Council',
					description:
						"Labor has committed to legislating to restore the integrity of the Australian Research Council.<div><br></div><div>Labor's legislation will place an explicit reference to an Australian interpretation of the Haldane principle � that politicians should not pick and choose individual research projects based on political whim � into the objects of the Australian Research Council Act.</div><div><br></div><div>Labor will also legislate a requirement that Ministers must table an explanation in Parliament within 15 sitting days of rejecting an recommendation of funding by the Chief Executive Officer.</div>",
					cost: '',
					date: '28/11/2018',
				},
				{
					title:
						'Science, Technology, Engineering, Arts and Mathematics (STEAM) Innovations Centre',
					description:
						'<p style="box-sizing: border-box; color: rgb(80, 80, 84); font-family: proxima-nova, sans-serif; font-size: 15px;">Labor has committed $10 million to build a Science, Technology, Engineering, Arts and Mathematics (STEAM) Innovations Centre in Preston, to best prepare the students of northern Melbourne for the jobs of the future.</p><p style="box-sizing: border-box; color: rgb(80, 80, 84); font-family: proxima-nova, sans-serif; font-size: 15px;">The Centre, based at the Northern College of the Arts and Technology (NCAT) in Preston, will be the first of its kind.</p>',
					cost: '$10 million',
					date: '27/02/2018',
				},
				{
					title: 'Establish an Australian Skills Authority',
					description:
						'Labor has committed to establish an Australian Skills Authority - an independent, labour market testing body.<div><br></div><div>The Authority will determine genuine skills needs and restrict temporary work visas to only those areas, by creating a single Skills Shortage Occupation List and advising government on current skills shortages and future skills needs.</div>',
					cost: '',
					date: '3/05/2017',
				},
				{
					title: 'More local apprentices and boosting local TAFEs',
					description:
						"Labor has committed to the requirement that one in 10 workers on major projects be apprentices from the local area to ensure we are giving young locals the chance to learn the skills they need for a job, and help older workers retrain for new jobs.<div><br></div><div>This commitment forms part of Labor's Local Projects, Local Jobs plan, and is in addition to Labor's existing commitments on TAFE.</div>",
					cost: '',
					date: '21/01/2019',
				},
				{
					title: 'Access to Playgroups and Toy Libraries',
					description:
						'Labor has committed $6.1 million to expand community based playgroups and toy libraries.<div><br></div><div>The funding will provide $50,000 each to Playgroups Australia and Toy Libraries Australia to expand and improve their resources and eligible groups with one-off grants of:</div><div><ul><li>$15,000 to establish new or expand existing Toy Libraries or Playgroups, or undertake minor capital works</li><li>$5,000 for existing organisations to purchase new toys, books, paints, craft materials or other consumables</li></ul></div>',
					cost: '$6.1 million',
					date: '9/02/2019',
				},
				{
					title: 'Railcar Training Workshops for Midland TAFE',
					description:
						"Labor has committed to invest $3 million to redevelop railcar training workshops at Midland TAFE, giving local students skills to work on the rollout of METRONET and future maintenance of the project.<div><br></div><div>The re-equipped workshops will create a specialist training centre to provide technical and support skills required by METRONET and the wider railcar industry.</div><div><br></div><div>The Midland TAFE redevelopment is part of Federal Labor's $100 million Building TAFE for the Future Fund aimed at revitalising TAFE campuses across Australia.<br><div><div><div><br></div><div><br></div></div></div></div>",
					cost: '$3 million',
					date: '28/02/2019',
				},
				{
					title: 'Programs for Regional and Remote Students',
					description:
						'Labor has committed $3.2 million for programs that work with students in country areas to encourage them to go to university or TAFE. The programs will include mentoring and tutorials designed to build confidence and aspiration amoung country kids.&nbsp;<div><br></div><div>They will be delivered through the 22 new community-owned Regional Study Hubs, separately announced.</div><div><br></div><div>Labor will also work with universities to develop online pathway and enabling courses so that country students who need additional time to build confidence and skills for study can do so.</div>',
					cost: '$3.2 million',
					date: '27/02/2019',
				},
				{
					title: 'Establish an Apprentice Advocate',
					description:
						'Labor has committed to establish an Apprentice Advocate to ensure Australia has an excellent, high quality and inclusive apprenticeship system. The Advocate and their office will provide advice to the government on strategies to reduce the exploitation of apprentices and trainees and improve their safety.<div><br></div><div>(Ch. 7 Para 98)</div>',
					cost: '',
					date: '18/12/2018',
				},
				{
					title: 'Tech upgrades for Curtin University',
					description:
						"Labor has committed to invest $3 million towards upgraded technology for Curtin University's Hub for Immersive Visualisation and eResearch (HIVE). Labor's investment will also support industry training at Curtin, allowing mining, oil, gas and agriculture businesses to more easily partner with the university on training, research and development.<div><br></div><div>This commitment forms part of Labor's University Future Fund.</div>",
					cost: '$3 million',
					date: '27/02/2019',
				},
				{
					title:
						'Restore Funding for Stephanie Alexander Kitchen Garden Program',
					description:
						'<div>Labor has committed $6 million to restore funding for the Stephanie Alexander Kitchen Garden Program in schools to tackle childhood obesity. School children learn about fruit, vegetables and herbs - how to grow them and how to use them to make healthy food.&nbsp;</div><div><br></div><div>This commitment will restore federal support for around 800 schools that have already implemented the program. It will also support at least 1,200 additional schools and early learning centres to implement the Stephanie Alexander Kitchen Garden Program. Of these, around 180 schools in three disadvantaged regions will receive intense services and supports. Labor will announce these regions after further consultations.</div>',
					cost: '$6 million',
					date: '5/03/2019',
				},
				{
					title: 'New Hall for Strathfield Girls High School',
					description:
						'Labor has committed to contribute $2.5 million towards a new school hall for Strathfield Girls High School, matching a NSW Labor commitment.',
					cost: '$2.5 million',
					date: '31/01/2019',
				},
				{
					title: 'Grant to Playgroup NSW',
					description:
						'Labor has committed a $15,000 grant to Playgroup NSW to expand the St. George zone area, creating greater access to 12 local playgroups for families.<div><br></div><div>The St. George zone area of playgroups provides over 40 sessions of Playgroup a week, providing access to early education and learning to children in a welcoming, and safe environment which gives children access to a range of educational toys and developmental experiences at low or no cost.<div><br></div><div><br></div></div>',
					cost: '',
					date: '13/03/2019',
				},
				{
					title: 'Primary Industries Education Foundation Australia',
					description:
						'Labor has committed to reverse the decision to withdraw $100,000 funding to the Primary Industries Education Foundation.',
					cost: '',
					date: '7/02/2019',
				},
				{
					title: 'Cairns Asia-Pacific Aviation Hub',
					description:
						'Labor has committed to invest $10 million to allow CQUniversity to deliver the final stage of its Asia-Pacific Aviation Hub in Cairns.&nbsp;<div><br></div><div>The funding will go towards a flight simulator, aviation sensors, tracking equipment, as well as new aircraft hangers and training facilities at Cairns airport. An aerospace lab will also be established to lead research into pilot fatigue and air traffic control. Cairns will be able to train up to 150 aviation students per year.</div>',
					cost: '$10 million',
					date: '12/03/2019',
				},
				{
					title: 'New Shade Sail for Cairns West State School',
					description:
						'Labor has committed $35,000 for a new shade sail for Cairns West State School.',
					cost: '$35,000',
					date: '12/03/2019',
				},
				{
					title: 'Additional funding for Walliston Primary School',
					description:
						'Labor has committed $50,000 for Walliston Primary School to build an outdoor shelter in their early childhood education centre and upgrade their cricket nets.',
					cost: '$50,000',
					date: '26/02/2019',
				},
				{
					title: 'Strengthen Asian Language and Literacy Education in Schools',
					description:
						'<div>Labor has committed $32 million to strengthen Asian language and literacy education in schools.</div><div>&nbsp;</div><div>Labor will:&nbsp;</div><div><ol><li>Boost the supply of Asian language teachers - Up to 100 scholarships a year for Australians who are Asian language native speakers and for top performers in priority Asian languages in Year 12, to go on to study a teaching qualification.</li><li>Establish a new nationwide FutureAsia � Asia Capable Schools program - Intensive training for 5,000 principals and senior teachers.</li><li>Improve Asian languages curriculum materials from pre-school to Year 12 - This would build on the existing Early Language Literacy App and Language Learning Space.&nbsp; Hindi will be added as the first priority.</li><li>Set ambitious targets and goals for Asian languages - Working with the state and territories through COAG, and with non-government schools.</li><li>Collect better data about the take up of Asian languages in Australia - So we can more easily track the progress and takeup of Asian languages</li><li>Establish an Advisory Council on Asia Capabilities - Headed up by experts from academia, the education sector, business, and not-for-profits to drive research and generate new ideas to boost teaching and learning about Asia across all levels of Australia�s education system</li><li>Undertake a whole-of-government audit of Australian and state government policies and programs on Asian literacy and languages education - To stop costly duplication and to ensure government money is well targeted at achieving improved Asia capability.</li><li>Convene regular meetings of Indo-Pacific Education Ministers - To further strengthen educational links between Australia and our Asian neighbours.&nbsp; The meetings will discuss collaborative education initiatives, scholarships, and strengthening ties across school and post-secondary education systems.</li></ol></div><div>&nbsp;</div>',
					cost: '$32 million',
					date: '25/10/2018',
				},
				{
					title: 'Funding for Moreton Bay Campus ',
					description:
						'Labor has committed $120 million in the University of the Sunshine Coast�s new Moreton Bay Campus.&nbsp;<div><ul><li>$50 million of Labor�s investment will help build a state-of-the-art super laboratory that will transform the\nMoreton Bay region into a high tech education hub.&nbsp;</li><li>The remaining $70 million&nbsp;will guarantee funding for every single Australian undergraduate student enrolled at the\nMoreton Bay Campus.&nbsp;</li></ul></div>',
					cost: '$120 million ',
					date: '22/06/2019',
				},
				{
					title: 'Disability and Aged Care Vocational Education Centres',
					description:
						'Labor has committed $4.85 million to establish three new Disability and Aged Care Vocational Centres to help more Western Australians get the skills they need to get a job in aged care and disability support.<div><br></div><div>The centres will be built at the Joondalup, Rockingham and Mount Lawley TAFE campuses, with the campuses to be upgraded with simulated and direct care facilities for training in aged care and disability. The new centres will include high-tech interactive mannequins that simulate actual patients. The centres will also be open to members of the senior and disability community for day services to enable direct interaction between clients and students.</div>',
					cost: '$4.85 million',
					date: '20/03/2019',
				},
			])
		})
}
