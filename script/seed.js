'use strict'

const db = require('../server/db')
const {
  Affiliation,
  Blog,
  Category,
  Job,
  Presentation,
  Project,
  Publication,
  School,
  Skill
} = require('../server/db/models')

const affiliationData = [
  {
    name: 'Society for Catholic Liturgy',
    url: 'http://liturgysociety.org',
    monthStart: 'October 2012'
  },
  {
    name: 'Church Music Association of America',
    url: 'https://musicasacra.com',
    monthStart: 'September 2011'
  },
  {
    name: 'American Copy Editors Society',
    url: 'https://aceseditors.org',
    monthStart: 'October 2011',
    monthEnd: 'October 2016'
  }
]

const blogData = [
  {
    title:
      'New to Programming? Here’s How to Better Parse the Results from Googling Your Error Messages',
    postUrl:
      'https://medium.com/@feminaprovita/new-to-programming-heres-how-to-better-parse-the-results-from-googling-your-error-messages-8c9b0081fef4',
    imageUrl:
      'https://cdn-images-1.medium.com/max/1600/1*7P1FchNLHq7fHjCOrY0wPw.png',
    date: '2019-01-28',
    teaser:
      'So you’ve written a function/program/website, and it doesn’t work. Hopefully it’s giving you an error message somewhere...'
  },
  {
    title:
      'Pair Programming after Bootcamp: Unintentionally a Great Learning Experience',
    postUrl:
      'https://medium.com/@feminaprovita/pair-programming-after-bootcamp-unintentionally-a-great-learning-experience-2201223413d',
    imageUrl:
      'https://cdn-images-1.medium.com/max/1200/1*PT4sFPxT3P_HKSXReGD1Fw.png',
    date: '2019-03-12',
    summary:
      'In which I learn that 1) pair programming with an experienced developer is a pretty different experience from pair programming with a peer who knows about as little as I do, and also that 2) I actually *can* pair program with an experienced developer and not be a waste of space but make actual, worthwhile contributions.',
    teaser:
      'It was just a couple days before my bootcamp graduation when the other developer in my roleplaying group mentioned a side project on his radar...'
  }
]

const categoryData = [
  {name: 'Code'},
  {name: 'Editorial'},
  {name: 'Theology'},
  {name: 'Hobbies'}
]

const jobData = [
  {
    jobTitle: 'Freelance Editorial Consultant',
    monthStart: 'March 2011',
    bullets: [
      'Edit/proofread books in final stage before publication for publishers, nonprofits, authors, grad students',
      'Fix grammar and usage errors, apply style guides, add indexing, format footnotes, analyze data'
    ],
    paragraph:
      'Copyediting, proofreading, indexing, stylizing, marketing, writing, and other tasks as requested. Projects have included theology books—scholarly, popular, and devotional; analyses of liturgical data; theses and dissertations; and teacher’s manuals. Ongoing clients include Word On Fire, Liturgy Training Publications, their academic imprint Hillenbrand Books, and Illuminare Publications. Past clients include the Archdiocese of Chicago, C-FAM, Faith and Life, Magnificat, King Richard’s Liturgical Design & Consulting, Liturgical Press, and private persons.',
    always: true
  },
  {
    company: 'Magnificat',
    url: 'http://us.magnificat.net',
    location: 'Yonkers, NY',
    jobTitle: 'Assistant Editor',
    monthStart: 'February 2013',
    monthEnd: 'August 2018',
    bullets: [
      'Editorial miscellany for monthly Catholic devotional (circ. 270,000), books for kids and adults',
      'Created several in-house spreadsheets to improve or optimize repeat tasks for self and others',
      'Merged marketing texts to harmonize copy across platforms, notably editing the website'
    ],
    paragraph:
      'Proofread, fact-checked, and applied style guide to monthly Catholic worship aid reaching about 270,000 subscribers; also chose hymns for daily offices, suggested/organized occasional liturgical improvements, and aided with translation and marketing tasks. Edited, compiled, and proofread various book projects as needed. Since 2017, also edited bookstore website and ebooks, developed new books, and creatively expanded marketing efforts at minimal expense.',
    always: true
  },
  {
    company: 'Turn to Flesh Productions',
    url: 'http://www.turntoflesh.org/',
    location: 'New York, NY',
    jobTitle: 'Advisory Board Member',
    monthStart: 'January 2018',
    monthEnd: 'March 2019',
    bullets: [
      'Attend company’s readings, workshops, and theatrical productions, helping out as needed',
      'Attend quarterly board meetings, advising from the perspective of an audience member (focus: how to better serve our non-industry audience, how to draw in new audiences)'
    ],
    paragraph: `Turn to Flesh is an innovative theatre company in New York, building a community of actors, directors, playwrights, and theatre lovers to develop new works with heightened texts with a lot of roles for women (so, think Shakespeare, but with more gals). It's been a delight to serve as the audience member on its board!`,
    always: true,
    volunteer: true
  },
  {
    company: 'Frassati Fellowship of NYC',
    url: 'http://frassati.nyc',
    location: 'New York, NY',
    jobTitle: 'Bible Study Coordinator',
    monthStart: 'February 2014',
    monthEnd: 'April 2018',
    bullets: [
      'Coordinated, designed, and led bible studies for young adults in NYC, in 3 sessions of 10 weeks each throughout the year',
      'Served in additional service, leadership, and liturgical roles as needed.'
    ],
    paragraph:
      'Coordinated, designed, and led bible studies for young adults in NYC, in three sessions of ten weeks each throughout the year. Also served in additional service, leadership, and liturgical roles as needed.'
  },
  {
    company: 'Archdiocese of Atlanta',
    url: 'https://www.archatl.com',
    location: 'Smyrna, GA',
    jobTitle: 'Associate Director, Office for Divine Worship',
    monthStart: 'August 2011',
    monthEnd: 'June 2012',
    bullets: [
      'Prepared and executed training workshops for local leaders, major archdiocesan liturgies, a conference',
      'Served as ongoing resource for pastors and staffs, worked with other committees and groups, including national bishops conference'
    ],
    paragraph:
      'Duties included preparing and executing workshops and training sessions, mostly for parish liturgical leaders; answering questions from pastors, parish staffs, and parishioners; planning major archdiocesan liturgies; designing website updates; organizing and working with various committees and groups in promoting the liturgical life of the archdiocese. Major events included the annual Southeastern Liturgical Music Symposium, wake and funeral services for an archbishop emeritus, and hosting a USCCB Plenary Assembly.'
  }
]

const presentationData = [
  {
    name:
      'Ars Celebrandi as Asceticism: Reverence in Celebration and Active Participation',
    org: 'Society for Catholic Liturgy Conference',
    url: 'http://liturgysociety.org',
    location: 'St Louis, MO',
    dateStart: '2012-01-27',
    details:
      'A thirty-minute academic presentation on how each participant\'s "art of celebrating" the liturgy impacts the prayer of the others praying the same. Highlighted how Rome has always asked for internal/external unity in how we pray the Mass: do the things as the Church has asked us to, and understand/pray what we do.'
  },
  {
    name: `Jesus' Lesser-Known Parables`,
    // org: 'Frassati Fellowship of NYC',
    // url: 'http://frassati.nyc',
    // location: 'New York, NY',
    // all 3 of these should come through via the foreign key
    dateStart: '2015-06-08',
    dateEnd: '2015-08-31',
    details: `A thirteen-week series encouraging discussion with context on those parables that do not appear in the Lectionary, those that are often overshadowed by the 'more important' parables they reside next to, and those that are just plain difficult, no matter what.`
  },
  {
    name: 'Tertium Quid: Sacrosanctum Concilium',
    org: 'Georgia Institute of Technology Catholic Center',
    url: 'http://www.gtcatholic.org/',
    location: 'Atlanta, GA',
    dateStart: '2013-04-08',
    details:
      "Spoke at the Catholic Center's monthly \"Third Way\" lecture series about Vatican II's document on the liturgy and its relevance to the life of today's young Catholic."
  },
  {
    name: 'Pope Benedict XVI on Liturgy',
    org: 'Franciscan University of Steubenville',
    url: 'https://www.franciscan.edu',
    location: 'Steubenville, OH',
    dateStart: '2011-02-08'
  },
  {
    name: 'Crash Course on Latin and Chant',
    // org: 'Archdiocese of Atlanta',
    // url: 'http://archatl.com',
    // location: 'Smyrna, GA',
    dateStart: '2012-02-12',
    details:
      'Delivered to the directors of music ministry of nearly all the parishes in the archdiocese, and their prominent cantors, with the intention of bridging the gap between technical (musical) expertise and theological expertise.'
  }
]

const projectData = [
  {
    name: 'Masks Google Plus Rescue',
    role: 'Engineer',
    paragraph:
      'Scraped, organized, and cleaned up data from a Google Plus community before Google pulled the plug on Plus. It went so well, we did the same for other communities run by the same game company!',
    bullets: [
      'Co-wrote functions and scraped data from active Google+ community in advance of planned shutdown',
      'Analyzed then captured full archive (posts, comments, uploaded photos, links), scraping with Puppeteer'
    ],
    github: 'https://github.com/feminaprovita/masks-rescue'
    // other: 'blog post'
  },
  {
    name: 'Moodify',
    role: 'Fullstack Software Engineer',
    paragraph:
      "The user takes a selfie, or uploads a photo, which we then upload to Google Cloud Vision. Cloud Vision returns to us an image analysis object, which we run through our own home-brewed function (transforming Google's word data into numerical values, crunching them based on positivity or negativity and importance, and using a fixed-point radius to get a range for Spotify). This yields a search query that we pass to Spotify along with the relevant user data, permitting the user to play the songs and/or save the playlist to their account.",
    bullets: [
      'User takes or uploads a selfie, and receives a unique Spotify playlist matching image’s mood',
      `Wrote/updated function mapping Google Cloud Vision's analysis object to a string for Spotify’s search`
    ],
    url: 'https://my-moodify.herokuapp.com',
    github: 'https://github.com/grape-emu/my-moodify',
    video: 'http://bit.ly/moodify-presentation'
  },
  {
    name: 'Keeping Facebook Cheerful',
    role: 'Solo Engineer',
    paragraph:
      "Since I was a child, I've never liked politics; usually after an election, people calm down and start getting along again. But after the 2016 election, nobody calmed down. Rather than leaving facebook (and missing the delightful photos of my friends' babies and dogs), I instead started asking one question every day. Some are silly, some outlandish, some simply noncontroversial. People have really enjoyed having an oasis where nobody's confronting anybody, but I've asked over 800 questions by now! It seemed time to build an archive that people besides me could peruse.",
    bullets: [
      'Display of longstanding personal project, asking silly/creative questions daily',
      'Populating archive required scraping the DOM 800x in real time',
      'Future features: archive search by keyword, tag, date; display five random questions; submit suggestion',
      'Future script: scrape facebook daily, updating database and front page with latest question'
    ],
    // url: 'kfbc.herokuapp.com OR clairegilligan.com/kfbc',
    github: 'https://github.com/feminaprovita/kfbc-website',
    video: 'http://bit.ly/kfbc'
  },
  {
    name: 'Timelink Travel Services',
    role: 'Fullstack Softwear Engineer',
    paragraph:
      'Premise: our client had recently outgrown their etsy shop, and needed a functional e-commerce site that could display their wares.',
    bullets: [
      'E-commerce site with integrated payment option, built in under two weeks',
      'Practiced Agile workflow and maintained excellent Git hygiene',
      'CRUD app built in Node with Express, Sequelize, React, and Redux',
      'Involved with all facets of production, styled with CSS and Bootstrap'
    ],
    url: 'https://pm-grace-shopper.herokuapp.com',
    github: 'https://github.com/pigMercury/grace-shopper'
  },
  {
    name: 'blessed N.',
    role: 'Solo Analyst',
    paragraph:
      'A recurring question had come up, when the liturgical books the magazine took its texts from didn\'t have all 3 prayers for the saint of the day, but rather had only one, and sent us to the "commons" for the other two. In the commons, the phrase "blessed N." appeared, with the "N." to be replaced by the saint of the day. But how the magazine settled this had been questioned several times, so an analysis of the book of origin was due. \n\nDid they want "blessed Saint Catherine", since Catherine (or whichever saint) was indeed canonized, and "Blessed" is a technical designation for someone who\'s almost (but not quite) a saint? Or was "Blessed Catherine" sufficient? \n\nTo determine this, a thorough analysis was needed not only of all the instances of "blessed N." but also of all paralle instances for prayers whose saints are named, several hundred in all.\n\nDuring analysis, another question came up: Should she be "Catherine" or "Catherine of Alexandria"? And is the answer the same for all 3 prayers, or do the prayers behave differently based on their function? \n\nIn the end, after looking at carefully organized data, the decision was a consistent: full name, no "Saint" (a departure from previous inconsistent policy).',
    bullets: []
    // job: magnificat
  },
  {
    name: 'Website Copy',
    role: 'Editor',
    // paragraph: '',
    bullets: [
      'Requested edit permissions for bookstore website to correct obvious errors',
      'Harmonized copy and formatting, improved links, in HTML of product pages'
    ],
    url: 'http://bookstore.magnificat.net'
    // job: magnificat
  },
  {
    name: 'New Translation Analysis',
    role: 'Solo Analyst',
    paragraph:
      'After Rome released a new translation of the Mass, closely examined the instructional texts at the beginning of the missal (~200p) for changes in vocabulary and style (mostly capitalization), and returned a spreadsheet for office use. Corrected a few misplaced periods and commas in the official final edition, to boot.'
    // bullets: []
    // job: freelance
  }
]

const publicationData = [
  {
    title: 'Ars Celebrandi as Asceticism',
    book: 'Antiphon: A Journal for Liturgical Renewal',
    footnote: 'Vol. 16 No. 2 (Summer 2012), 114–129',
    summary:
      'Paper after thirty-minute academic presentation on how each participant\'s "art of celebrating" the liturgy impacts the prayer of the others praying the same. Highlighted how Rome has always asked for internal/external unity in how we pray the Mass: do the things as the Church has asked us to, and understand/pray what we do.',
    url: 'http://liturgysociety.org/journal/volume-16'
    // details: ''
  },
  {
    title: 'Spiritual Communion',
    book: 'Magnificat',
    footnote: '(June 2014), 330–331',
    summary:
      'A reflection on the traditional Catholic practice of spiritual communion. ',
    url: 'http://us.magnificat.net'
    // details: ''
  },
  {
    title: 'An Overview of the Book of Blessings: General Introduction',
    book: 'The Liturgy Documents, Volume II',
    footnote: '(Chicago: Liturgy Training Publications, 2012): 438–442',
    summary:
      'In this book on the major documents about the celebration of the liturgy, this essay introduces and gives context to the theological and practical introduction of the Book of Blessings, one of the rites that was revised most heavily after the Council.',
    url:
      'https://www.ltp.org/products/details/LD2V2/liturgy-documents-volume-two-second-edition'
    // details: ''
  }
]

const schoolData = [
  {
    fullName: 'Franciscan University of Steubenville',
    shortName: 'Franciscan University',
    url: 'https://www.franciscan.edu',
    location: 'Steubenville, OH',
    degree: 'B.A.',
    major: 'Catechetics',
    graduation: 2008,
    thesis:
      'Liturgical signs and symbols and the importance of understanding them for active participation',
    advisor: 'James Pauley, M.A., S.T.D.',
    detail:
      'Great Books honors program. French minor. Semester in Gaming, Austria.'
  },
  {
    fullName:
      'Liturgical Institute of the University of Saint Mary of the Lake',
    shortName: 'Liturgical Institute',
    url: 'https://www.liturgicalinstitute.org/',
    location: 'Mundelein, IL',
    degree: 'M.A.',
    major: 'Liturgical Studies',
    graduation: 2011,
    thesis:
      'The Ars Celebrandi of the Mystical Body: Applications for Postconciliar Liturgical Praxis',
    advisor: 'Denis R. McNamara, M.Arch.H., Ph.D.',
    detail: 'Graduated cum laude.'
  },
  {
    fullName: 'Grace Hopper Program at Fullstack Academy of Code',
    shortName: 'Grace Hopper',
    url: 'https://www.gracehopper.com',
    location: 'New York, NY',
    degree: 'Web Development Certification',
    graduation: 2019
  }
]

const skillData = [
  {
    name: 'French',
    level: 'proficient'
  },
  {
    name: 'Latin',
    level: 'familiar'
  },
  {
    name: 'Proofreading',
    level: 'expert'
  },
  {
    name: 'Copyediting',
    level: 'expert'
  },
  {
    name: 'JavaScript/ES6',
    level: 'proficient'
  },
  {
    name: 'Node',
    level: 'proficient'
  },
  {
    name: 'Express',
    level: 'proficient'
  },
  {
    name: 'Sequelize',
    level: 'proficient'
  },
  {
    name: 'React',
    level: 'proficient'
  },
  {
    name: 'Redux',
    level: 'proficient'
  },
  {
    name: 'HTML5',
    level: 'proficient'
  },
  {
    name: 'CSS3',
    level: 'familiar'
  },
  {
    name: 'Flexbox',
    level: 'proficient'
  },
  {
    name: 'Git/Github',
    level: 'proficient'
  },
  {
    name: 'PostgreSQL',
    level: 'postgres'
  },
  {
    name: 'Microsoft Excel',
    level: 'expert'
  },
  {
    name: 'Visual Studio Code',
    level: 'proficient'
  },
  {
    name: 'Heroku',
    level: 'familiar'
  },
  {
    name: 'Puppeteer',
    level: 'familiar'
  },
  {
    name: 'Python',
    level: 'familiar'
  },
  {
    name: 'JSON',
    level: 'familiar'
  },
  {
    name: 'Chalk',
    level: 'familiar'
  },
  {
    name: 'Agile',
    level: 'proficient'
  }
]

// eslint-disable-next-line max-statements
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const affiliations = await Promise.all(
    affiliationData.map(async affiliation => {
      const allAffiliations = await Affiliation.create(affiliation)
      return allAffiliations
    })
  )
  console.log(`seeded ${affiliations.length} affiliations`)

  const blogs = await Promise.all(
    blogData.map(async blog => {
      const allBlogs = await Blog.create(blog)
      return allBlogs
    })
  )
  console.log(`seeded ${blogs.length} blogs`)

  const categories = await Promise.all(
    categoryData.map(async category => {
      const allCategories = await Category.create(category)
      return allCategories
    })
  )
  console.log(`seeded ${categorys.length} categorys`)

  const jobs = await Promise.all(
    jobData.map(async job => {
      const allJobs = await Job.create(job)
      return allJobs
    })
  )
  console.log(`seeded ${jobs.length} jobs`)

  const presentations = await Promise.all(
    presentationData.map(async presentation => {
      const allPresentations = await Presentation.create(presentation)
      return allPresentations
    })
  )
  console.log(`seeded ${presentations.length} presentations`)

  const projects = await Promise.all(
    projectData.map(async project => {
      const allProjects = await Project.create(project)
      return allProjects
    })
  )
  console.log(`seeded ${projects.length} projects`)

  const publications = await Promise.all(
    publicationData.map(async publication => {
      const allPublications = await Publication.create(publication)
      return allPublications
    })
  )
  console.log(`seeded ${publications.length} publications`)

  const schools = await Promise.all(
    schoolData.map(async school => {
      const allSchools = await School.create(school)
      return allSchools
    })
  )
  console.log(`seeded ${schools.length} schools`)

  const skills = await Promise.all(
    skillData.map(async skill => {
      const allSkill = await Skill.create(skill)
      return allSkill
    })
  )
  console.log(`seeded ${skills.length} skills`)

  // associations here
  const [scl, cmaa, aces] = affiliations
  const [errors, masks] = blogs
  const [code, editorial, theology, hobbies] = categories
  const [freelance, mag, ttf, frassati, atl] = jobs
  const [arsCelebrandi, parables, tertiumQuid, bxvi, chant] = presentations
  const [
    masksRescue,
    moodify,
    kfbc,
    timelink,
    blessedN,
    website,
    girm
  ] = projects
  const [antiphon, spiritualCommunion, bookOfBlessings] = publications
  const [fus, li, gh] = schools
  const [
    french,
    latin,
    proofing,
    copyediting,
    js,
    node,
    express,
    sequelize,
    react,
    redux,
    html,
    css,
    flexbox,
    git,
    pg,
    excel,
    vscode,
    heroku,
    puppeteer,
    python,
    json,
    chalk,
    agile
  ] = skills

  await Promise.all([
    scl.setCategory(theology),
    scl.setJob(atl),
    scl.setJob(mag),
    scl.setSkill(latin),
    cmaa.setCategory(theology),
    cmaa.setJob(atl),
    cmaa.setSkill(latin),
    aces.setCategory(editorial),
    aces.setJob(mag),
    aces.setSkill(proofing),
    aces.setSkill(copyediting),

    errors.setCategory(code),
    errors.setSkill(js),
    masks.setCategory(code),
    masks.setProject(masksRescue),
    masks.setSkill(js),
    masks.setSkill(node),
    masks.setSkill(puppeteer),
    masks.setSkill(vscode),
    masks.setSkill(json),

    freelance.setCategory(theology),
    freelance.setCategory(editorial),
    freelance.setPresentation(tertiumQuid),
    freelance.setPresentation(bxvi),
    freelance.setProject(girm),
    freelance.setPublication(bookOfBlessings),
    freelance.setSkill(proofing),
    freelance.setSkill(copyediting),
    mag.setCategory(editorial),
    mag.setCategory(theology),
    mag.setProject(blessedN),
    mag.setProject(website),
    mag.setPublication(spiritualCommunion),
    mag.setSkill(french),
    mag.setSkill(latin),
    mag.setSkill(proofing),
    mag.setSkill(copyediting),
    mag.setSchool(html),
    mag.setSkill(excel),
    ttf.setCategory(hobbies),
    frassati.setCategory(theology),
    frassati.setPresentation(parables),
    atl.setCategory(theology),
    atl.setPresentation(chant),

    arsCelebrandi.setCategory(theology),
    arsCelebrandi.setPublication(antiphon),
    arsCelebrandi.setSkill(latin),
    parables.setCategory(theology),
    parables.setJob(frassati),
    parables.setSkill(excel),
    tertiumQuid.setCategory(theology),
    bxvi.setCategory(theology),
    chant.setCategory(theology),
    chant.setJob(atl),
    chant.setSkill(latin),

    masksRescue.setCategory(code),
    masksRescue.setBlog(masks),
    masksRescue.setSkill(js),
    masksRescue.setSkill(node),
    masksRescue.setSkill(puppeteer),
    masksRescue.setSkill(vscode),
    masksRescue.setSkill(json),
    moodify.setCategory(code),
    moodify.setSchool(gh),
    moodify.setSkill(js),
    moodify.setSkill(node),
    moodify.setSkill(express),
    moodify.setSkill(react),
    moodify.setSkill(css),
    moodify.setSkill(git),
    moodify.setSkill(agile),
    moodify.setSkill(vscode),
    moodify.setSkill(heroku),

    kfbc.setCategory(code),
    kfbc.setSchool(gh),
    kfbc.setSkill(js),
    kfbc.setSkill(node),
    kfbc.setSkill(express),
    kfbc.setSkill(sequelize),
    kfbc.setSkill(react),
    kfbc.setSkill(redux),
    kfbc.setSkill(css),
    kfbc.setSkill(flexbox),
    kfbc.setSkill(git),
    kfbc.setSkill(pg),
    kfbc.setSkill(vscode),
    kfbc.setSkill(heroku),
    kfbc.setSkill(puppeteer),
    timelink.setCategory(code),
    timelink.setSchool(gh),
    timelink.setSkill(js),
    timelink.setSkill(node),
    timelink.setSkill(express),
    timelink.setSkill(sequelize),
    timelink.setSkill(react),
    timelink.setSkill(redux),
    timelink.setSkill(css),
    timelink.setSkill(flexbox),
    timelink.setSkill(git),
    timelink.setSkill(pg),
    timelink.setSkill(vscode),
    timelink.setSkill(heroku),
    timelink.setSkill(agile),
    blessedN.setCategory(theology),
    blessedN.setJob(mag),
    blessedN.setSkill(proofing),
    blessedN.setSkill(excel),
    website.setCategory(editorial),
    website.setJob(mag),
    website.setSkill(proofing),
    website.setSkill(copyediting),
    website.setSkill(html),
    girm.setCategory(editorial),
    girm.setJob(freelance),
    girm.setSkill(proofing),
    girm.setSkill(excel),

    antiphon.setCategory(theology),
    antiphon.setPresentation(arsCelebrandi),
    antiphon.setSkill(latin),
    spiritualCommunion.setCategory(theology),
    spiritualCommunion.setJob(mag),
    bookOfBlessings.setCategory(theology),
    bookOfBlessings.setJob(freelance),

    fus.setCategory(theology),
    li.setCategory(theology),
    gh.setCategory(code),
    gh.setBlog(errors),
    gh.setProject(timelink),
    gh.setProject(kfbc),
    gh.setProject(moodify),

    french.setCategory(theology),
    french.setJob(mag),
    latin.setCategory(theology),
    latin.setAffiliation(scl),
    latin.setAffiliation(cmaa),
    latin.setPresentation(arsCelebrandi),
    latin.setPublication(antiphon),
    proofing.setCategory(editorial),
    proofing.setAffiliation(aces),
    proofing.setJob(freelance),
    proofing.setJob(mag),
    proofing.setProject(blessedN),
    proofing.setProject(website),
    proofing.setProject(girm),
    copyediting.setCategory(editorial),
    copyediting.setAffiliation(aces),
    copyediting.setJob(freelance),
    copyediting.setJob(mag),
    copyediting.setProject(website),
    js.setCategory(code),
    js.setBlog(errors),
    js.setBlog(masks),
    js.setProject(timelink),
    js.setProject(kfbc),
    js.setProject(moodify),
    js.setProject(masksRescue),
    node.setCategory(code),
    node.setBlog(errors),
    node.setBlog(masks),
    node.setProject(timelink),
    node.setProject(kfbc),
    node.setProject(moodify),
    node.setProject(masksRescue),
    express.setCategory(code),
    express.setProject(timelink),
    express.setProject(kfbc),
    express.setProject(moodify),
    sequelize.setCategory(code),
    sequelize.setProject(timelink),
    sequelize.setProject(kfbc),
    react.setCategory(code),
    react.setProject(timelink),
    react.setProject(kfbc),
    react.setProject(moodify),
    redux.setCategory(code),
    redux.setProject(timelink),
    redux.setProject(kfbc),
    html.setCategory(code),
    html.setJob(mag),
    html.setProject(website),
    css.setCategory(code),
    css.setProject(timelink),
    css.setProject(kfbc),
    css.setProject(moodify),
    flexbox.setCategory(code),
    flexbox.setProject(timelink),
    flexbox.setProject(kfbc),
    git.setCategory(code),
    git.setBlog(errors),
    git.setProject(timelink),
    git.setProject(kfbc),
    git.setProject(moodify),
    git.setProject(masksRescue),
    pg.setCategory(code),
    pg.setProject(timelink),
    pg.setProject(kfbc),
    excel.setCategory(code),
    excel.setJob(mag),
    excel.setPresentation(parables),
    excel.setProject(blessedN),
    excel.setProject(girm),
    vscode.setCategory(code),
    vscode.setProject(timelink),
    vscode.setProject(kfbc),
    vscode.setProject(moodify),
    vscode.setProject(masksRescue),
    heroku.setCategory(code),
    heroku.setProject(timelink),
    heroku.setProject(kfbc),
    heroku.setProject(moodify),
    puppeteer.setCategory(code),
    puppeteer.setBlog(masks),
    puppeteer.setProject(masksRescue),
    puppeteer.setProject(kfbc),
    python.setCategory(code),
    json.setCategory(code),
    json.setBlog(masks),
    json.setProject(masksRescue),
    chalk.setCategory(code),
    chalk.setProject(kfbc),
    agile.setCategory(code),
    agile.setProject(timelink),
    agile.setProject(moodify)
  ])
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
