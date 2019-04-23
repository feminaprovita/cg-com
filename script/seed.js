'use strict'

const db = require('../server/db')
const {greenBright, magentaBright} = require('chalk')
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
    // imageUrl: 'https://cdn-images-1.medium.com/max/1600/1*7P1FchNLHq7fHjCOrY0wPw.png',
    imageUrl: 'https://i.imgur.com/jhxCzGv.jpg',
    date: '2019-01-28',
    teaser:
      'So you’ve written a function/program/website, and it doesn’t work. Hopefully it’s giving you an error message somewhere...'
  },
  {
    title:
      'Pair Programming after Bootcamp: Unintentionally a Great Learning Experience',
    postUrl:
      'https://medium.com/@feminaprovita/pair-programming-after-bootcamp-unintentionally-a-great-learning-experience-2201223413d',
    // imageUrl: 'https://cdn-images-1.medium.com/max/1200/1*PT4sFPxT3P_HKSXReGD1Fw.png',
    imageUrl: 'https://i.imgur.com/cmVXobL.jpg',
    date: '2019-03-12',
    summary:
      'In which I learn that 1) pair programming with an experienced developer is a pretty different experience from pair programming with a peer who knows about as little as I do, and also that 2) I actually *can* pair program with an experienced developer and not be a waste of space but make actual, worthwhile contributions.',
    teaser:
      'It was just a couple days before my bootcamp graduation when the other developer in my roleplaying group mentioned a side project on his radar...'
  }
]

const categoryData = [
  {
    name: 'Code',
    id: 1
  },
  {
    name: 'Editorial',
    id: 2
  },
  {
    name: 'Theology',
    id: 3
  },
  {
    name: 'Hobbies',
    id: 4
  }
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
      'Served in additional service, leadership, and liturgical roles as needed'
    ],
    paragraph:
      'Coordinated, designed, and led bible studies for young adults in NYC, in three sessions of ten weeks each throughout the year. Also served in additional service, leadership, and liturgical roles as needed.',
    lectures: [
      'The Psalms',
      'The Beatitudes',
      'The Spiritual Works of Mercy',
      'The Corporal Works of Mercy',
      'What is a Jubilee?',
      "Jesus' Lesser-Known Parables",
      'Easter Vigil Readings: Discussion and Reflection',
      'The Small Books: Diving into the Old Testament'
    ],
    volunteer: true
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
      'Duties included preparing and executing workshops and training sessions, mostly for parish liturgical leaders; answering questions from pastors, parish staffs, and parishioners; planning major archdiocesan liturgies; designing website updates; organizing and working with various committees and groups in promoting the liturgical life of the archdiocese. Major events included the annual Southeastern Liturgical Music Symposium, wake and funeral services for an archbishop emeritus, and hosting a USCCB Plenary Assembly.',
    lectures: [
      'Crash Course on Latin and Chant',
      'Theology of Liturgical Music for Cantors',
      'Shadow, Image, Reality: Liturgical Background for Altar Server Programs',
      'Theology and Rite: Visiting the Sick and Bringing Them Communion'
    ]
  },
  {
    company: 'Various choirs',
    url: 'http://nymcc.org/about-us',
    jobTitle: 'Vocalist / Alto',
    monthStart: 'September 1996',
    bullets: [
      'Have sung in over a dozen choirs (breaks: July 2014–Aug 2017; June 2018–Feb 2019)',
      'Usually alto, but roles have included cantor, soprano, tenor, and “make up a new harmony now, please”',
      'Mostly church choirs, at varying skill levels (inc. professional), across a wide range of styles and languages',
      'Currently: Metropolitan Catholic Chorale (based in Bronx, NY)'
    ],
    paragraph:
      'Have sung in over a dozen choirs with breaks rarely longer than a few months (exceptions: July 2014–Aug 2017; June 2018–Feb 2019). Usually an alto, but roles have also included cantor, soprano, tenor, and “make up a new harmony now, please.” Mostly church choirs, at varying skill levels (up to professional), across a wide range of styles and languages. Currently in NYC’s Metropolitan Catholic Chorale.',
    volunteer: true
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
    dateStart: '2012-02-12',
    details:
      'Delivered to the directors of music ministry of nearly all the parishes in the archdiocese, and their prominent cantors, with the intention of bridging the gap between technical (musical) expertise and theological expertise.'
  }
]

const projectData = [
  {
    name: 'Portfolio Website',
    role: 'Engineer',
    bullets: [
      'Database-driven portfolio site with buttons that filter data into or out of render',
      'Built with Node, Express, PostgreSQL, Sequelize, React, and Redux, and hosted on Heroku',
      'Used a combination of responsive design and media queries to style for desktop and mobile',
      'Planned expansion: individual pages for each component that showcase database relationships',
      // 'Learned that git is case-insensitive (and how to fix that), repurposed data with RegEx, added HTML meta tags',
      // 'Did a lot of post-deployment troubleshooting',
    ],
    paragraph: '',
    url: 'http://www.clairegilligan.com',
    github: 'https://github.com/feminaprovita/cg-com'
  },
  {
    name: 'Bacon Friday (annual party)',
    role: 'Co-Founder, Co-Host, Event Planner',
    bullets: [
      'Planned and threw a silly meat-themed Easter party for about 50 people (after six successive meatlesss Fridays during Lent)',
      'Crafted several unique bacon/meat-themed quizzes and/or games each year',
      'Designed and led various meat-themed party games and activities'
    ],
    paragraph: 'After Catholics spend Fridays of Lent abstaining from meat, the Friday of Easter week is the perfect time to feast upon meat! Organized logistics for 50-person party, hosted at someone else\'s house; created and/or commissioned unique meat-themed games and activities each year.'
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
    name: 'Website Copy',
    role: 'Editor',
    // paragraph: '',
    bullets: [
      'Requested edit permissions for bookstore website to correct obvious errors',
      'Harmonized copy and formatting, improved links, in HTML of product pages'
    ],
    url: 'http://bookstore.magnificat.net'
  },
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
  },
  {
    name: 'New Translation Analysis',
    role: 'Solo Analyst',
    paragraph:
      'After Rome released a new translation of the Mass, closely examined the instructional texts at the beginning of the missal (~200p) for changes in vocabulary and style (mostly capitalization), and returned a spreadsheet for office use. Corrected a few misplaced periods and commas in the official final edition, to boot.'
    // bullets: []
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
    name: 'blessed N.',
    role: 'Solo Analyst',
    paragraph:
      'A recurring question had come up, when the liturgical books the magazine took its texts from didn\'t have all 3 prayers for the saint of the day, but rather had only one, and sent us to the "commons" for the other two. In the commons, the phrase "blessed N." appeared, with the "N." to be replaced by the saint of the day. But how the magazine settled this had been questioned several times, so an analysis of the book of origin was due. \n\nDid they want "blessed Saint Catherine", since Catherine (or whichever saint) was indeed canonized, and "Blessed" is a technical designation for someone who\'s almost (but not quite) a saint? Or was "Blessed Catherine" sufficient? \n\nTo determine this, a thorough analysis was needed not only of all the instances of "blessed N." but also of all paralle instances for prayers whose saints are named, several hundred in all.\n\nDuring analysis, another question came up: Should she be "Catherine" or "Catherine of Alexandria"? And is the answer the same for all 3 prayers, or do the prayers behave differently based on their function? \n\nIn the end, after looking at carefully organized data, the decision was a consistent: full name, no "Saint" (a departure from previous inconsistent policy).',
    bullets: [
      'Problem: twofold question of how exactly to fill in blanks marked "N." in the Roman Missal (include title? full name or abbreviated?)',
      'Carefully identified and analyzed 157 prayers containing "N." in comparison to 426 parallel instances containing names throughout the missal',
      'Identified trends in the data, prepared handouts to demonstrate said trends, and presented on the question, which was then quickly settled'
    ]
  },
  {
    name: 'Timelink Travel Services',
    role: 'Fullstack Software Engineer',
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
    name: 'PostgreSQL',
    level: 'familiar'
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
    name: 'Axios',
    level: 'proficient'
  },
  {
    name: 'Postman',
    level: 'proficient'
  },
  {
    name: 'Agile',
    level: 'proficient'
  },
  {
    name: 'RegEx',
    level: 'familiar'
  }
]

// eslint-disable-next-line max-statements
async function seed() {
  await db.sync({force: true})
  console.log(greenBright('db synced!'))

  const affiliations = await Promise.all(
    affiliationData.map(async affiliation => {
      const allAffiliations = await Affiliation.create(affiliation)
      return allAffiliations
    })
  )
  console.log(magentaBright(`seeded ${affiliations.length} affiliations`))

  const blogs = await Promise.all(
    blogData.map(async blog => {
      const allBlogs = await Blog.create(blog)
      return allBlogs
    })
  )
  console.log(magentaBright(`seeded ${blogs.length} blogs`))

  const categories = await Promise.all(
    categoryData.map(async category => {
      const allCategories = await Category.create(category)
      return allCategories
    })
  )
  console.log(magentaBright(`seeded ${categories.length} categories`))

  const jobs = await Promise.all(
    jobData.map(async job => {
      const allJobs = await Job.create(job)
      return allJobs
    })
  )
  console.log(magentaBright(`seeded ${jobs.length} jobs`))

  const presentations = await Promise.all(
    presentationData.map(async presentation => {
      const allPresentations = await Presentation.create(presentation)
      return allPresentations
    })
  )
  console.log(magentaBright(`seeded ${presentations.length} presentations`))

  const projects = await Promise.all(
    projectData.map(async project => {
      const allProjects = await Project.create(project)
      return allProjects
    })
  )
  console.log(magentaBright(`seeded ${projects.length} projects`))

  const publications = await Promise.all(
    publicationData.map(async publication => {
      const allPublications = await Publication.create(publication)
      return allPublications
    })
  )
  console.log(magentaBright(`seeded ${publications.length} publications`))

  const schools = await Promise.all(
    schoolData.map(async school => {
      const allSchools = await School.create(school)
      return allSchools
    })
  )
  console.log(magentaBright(`seeded ${schools.length} schools`))

  const skills = await Promise.all(
    skillData.map(async skill => {
      const allSkill = await Skill.create(skill)
      return allSkill
    })
  )
  console.log(magentaBright(`seeded ${skills.length} skills`))

  // associations here
  const [scl, cmaa, aces] = affiliations
  const [errors, masks] = blogs
  const [code, editorial, theology, hobbies] = categories
  const [freelance, mag, ttf, frassati, atl, choir] = jobs
  const [arsCelebrandi, parables, tertiumQuid, bxvi, chant] = presentations
  const [
    portfolio,
    bacon,
    moodify,
    website,
    masksRescue,
    girm,
    kfbc,
    blessedN,
    timelink
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
    pg,
    react,
    redux,
    html,
    css,
    flexbox,
    git,
    excel,
    vscode,
    heroku,
    puppeteer,
    python,
    json,
    chalk,
    axios,
    postman,
    agile,
    regex
  ] = skills

  await Promise.all([
    // categories
    scl.setCategory(theology),
    cmaa.setCategory(theology),
    aces.setCategory(editorial),

    errors.setCategory(code),
    masks.setCategory(code),

    freelance.setCategories(editorial),
    freelance.setCategories(theology),
    mag.setCategories(editorial),
    mag.setCategories(theology),
    ttf.setCategories(hobbies),
    frassati.setCategories(theology),
    frassati.setCategories(hobbies),
    atl.setCategories(theology),
    choir.setCategories(theology),
    choir.setCategories(hobbies),

    // affiliations
    latin.setAffiliations(scl),
    latin.setAffiliations(cmaa),
    proofing.setAffiliations(aces),
    copyediting.setAffiliations(aces),

    // blogs
    js.setBlogs(errors),
    node.setBlogs(errors),
    git.setBlogs(errors),

    masks.setProject(masksRescue),
    js.setBlogs(masks),
    node.setBlogs(masks),
    puppeteer.setBlogs(masks),
    vscode.setBlogs(masks),
    json.setBlogs(masks),

    // jobs
    tertiumQuid.setJob(freelance),
    bxvi.setJob(freelance),
    proofing.setJobs(freelance),
    copyediting.setJobs(freelance),

    scl.setJobs(mag),
    aces.setJobs(mag),
    proofing.setJobs(mag),
    copyediting.setJobs(mag),
    excel.setJobs(mag),
    html.setJobs(mag),
    french.setJobs(mag),
    latin.setJobs(mag),

    parables.setJob(frassati),
    frassati.setSkills(excel),

    scl.setJobs(atl),
    cmaa.setJobs(atl),
    chant.setJob(atl),
    latin.setJobs(atl),

    cmaa.setJobs(choir),
    latin.setJobs(choir),

    // presentations
    arsCelebrandi.setCategory(theology),
    antiphon.setPresentation(arsCelebrandi),
    latin.setPresentations(arsCelebrandi),

    parables.setCategory(theology),
    excel.setPresentations(parables),

    tertiumQuid.setCategory(theology),
    bxvi.setCategory(theology),

    chant.setCategory(theology),
    chant.setJob(atl),
    latin.setPresentations(chant),

    // projects
    freelance.setProject(girm),
    mag.setProject(blessedN),
    mag.setProject(website),

    portfolio.setCategory(code),
    js.setProjects(portfolio),
    node.setProjects(portfolio),
    express.setProjects(portfolio),
    sequelize.setProjects(portfolio),
    pg.setProjects(portfolio),
    react.setProjects(portfolio),
    redux.setProjects(portfolio),
    html.setProjects(portfolio),
    css.setProjects(portfolio),
    flexbox.setProjects(portfolio),
    git.setProjects(portfolio),
    vscode.setProjects(portfolio),
    heroku.setProjects(portfolio),
    chalk.setProjects(portfolio),
    axios.setProjects(portfolio),
    postman.setProjects(portfolio),
    regex.setProjects(portfolio),

    bacon.setCategory(hobbies),

    moodify.setCategory(code),
    js.setProjects(moodify),
    node.setProjects(moodify),
    express.setProjects(moodify),
    axios.setProjects(moodify),
    postman.setProjects(moodify),
    react.setProjects(moodify),
    css.setProjects(moodify),
    git.setProjects(moodify),
    vscode.setProjects(moodify),
    heroku.setProjects(moodify),
    agile.setProjects(moodify),

    website.setCategory(editorial),
    proofing.setProjects(website),
    copyediting.setProjects(website),
    html.setProjects(website),

    masksRescue.setCategory(code),
    js.setProjects(masksRescue),
    node.setProjects(masksRescue),
    git.setProjects(masksRescue),
    puppeteer.setProjects(masksRescue),
    vscode.setProjects(masksRescue),
    json.setProjects(masksRescue),
    regex.setProjects(masksRescue),

    girm.setCategory(editorial),
    proofing.setProjects(girm),
    excel.setProjects(girm),

    kfbc.setCategory(code),
    js.setProjects(kfbc),
    node.setProjects(kfbc),
    express.setProjects(kfbc),
    axios.setProjects(kfbc),
    sequelize.setProjects(kfbc),
    react.setProjects(kfbc),
    redux.setProjects(kfbc),
    css.setProjects(kfbc),
    flexbox.setProjects(kfbc),
    git.setProjects(kfbc),
    pg.setProjects(kfbc),
    vscode.setProjects(kfbc),
    heroku.setProjects(kfbc),
    puppeteer.setProjects(kfbc),
    chalk.setProjects(kfbc),

    blessedN.setCategory(theology),
    proofing.setProjects(blessedN),
    excel.setProjects(blessedN),

    timelink.setCategory(code),
    js.setProjects(timelink),
    node.setProjects(timelink),
    express.setProjects(timelink),
    axios.setProjects(timelink),
    postman.setProjects(timelink),
    sequelize.setProjects(timelink),
    react.setProjects(timelink),
    redux.setProjects(timelink),
    css.setProjects(timelink),
    flexbox.setProjects(timelink),
    git.setProjects(timelink),
    pg.setProjects(timelink),
    vscode.setProjects(timelink),
    heroku.setProjects(timelink),
    agile.setProjects(timelink),

    // publications
    antiphon.setCategory(theology),
    antiphon.setPresentation(arsCelebrandi),
    latin.setPublications(antiphon),

    spiritualCommunion.setCategory(theology),
    spiritualCommunion.setJob(mag),

    bookOfBlessings.setCategory(theology),
    bookOfBlessings.setJob(freelance),

    // schools
    fus.setCategory(theology),

    li.setCategory(theology),

    gh.setCategory(code),
    timelink.setSchool(gh),
    kfbc.setSchool(gh),
    moodify.setSchool(gh),

    // skills
    js.setCategory(code),
    node.setCategory(code),
    express.setCategory(code),
    axios.setCategory(code),
    postman.setCategory(code),
    sequelize.setCategory(code),
    react.setCategory(code),
    redux.setCategory(code),
    html.setCategory(code),
    css.setCategory(code),
    flexbox.setCategory(code),
    git.setCategory(code),
    pg.setCategory(code),
    excel.setCategory(code),
    vscode.setCategory(code),
    heroku.setCategory(code),
    puppeteer.setCategory(code),
    python.setCategory(code),
    json.setCategory(code),
    chalk.setCategory(code),
    agile.setCategory(code),
    regex.setCategory(code),
    proofing.setCategory(editorial),
    copyediting.setCategory(editorial),
    french.setCategory(theology),
    latin.setCategory(theology)
  ])
  console.log(greenBright.bold(`seeded successfully`))
}

async function runSeed() {
  console.log(greenBright('seeding...'))
  try {
    await seed()
  } catch (err) {
    console.error(err)
    // console.error(whiteBright.bold(err))
    // coloring the console.error simplifies the output from an object to a single line
    process.exitCode = 1
  } finally {
    console.log(greenBright('closing db connection'))
    await db.close()
    console.log(greenBright('db connection closed'))
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
