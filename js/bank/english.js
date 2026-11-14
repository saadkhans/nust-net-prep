// English question bank — SAT-style NET English (40 MCQs): vocabulary, analogies, grammar, sentence completion, reading.
// All items and passages are original.
import { mcq, fromPool } from './util.js';

const S = 'English';

// [word, synonym, antonym]
const VOCAB = [
  ['abundant', 'plentiful', 'scarce'], ['candid', 'frank', 'evasive'], ['diligent', 'hardworking', 'lazy'], ['benevolent', 'kind', 'malicious'],
  ['frugal', 'thrifty', 'extravagant'], ['obsolete', 'outdated', 'modern'], ['meticulous', 'careful', 'sloppy'], ['ambiguous', 'unclear', 'explicit'],
  ['brevity', 'conciseness', 'wordiness'], ['concur', 'agree', 'dissent'], ['deter', 'discourage', 'encourage'], ['eloquent', 'articulate', 'inarticulate'],
  ['feeble', 'weak', 'robust'], ['hostile', 'unfriendly', 'amiable'], ['impartial', 'unbiased', 'prejudiced'], ['lucid', 'clear', 'obscure'],
  ['mitigate', 'alleviate', 'aggravate'], ['novice', 'beginner', 'expert'], ['ominous', 'threatening', 'auspicious'], ['placid', 'calm', 'turbulent'],
  ['prudent', 'wise', 'reckless'], ['reluctant', 'unwilling', 'eager'], ['scrutinize', 'examine', 'overlook'], ['tenacious', 'persistent', 'yielding'],
  ['transient', 'temporary', 'permanent'], ['vindicate', 'clear', 'incriminate'], ['zealous', 'enthusiastic', 'apathetic'], ['affluent', 'wealthy', 'impoverished'],
  ['augment', 'increase', 'diminish'], ['banal', 'trite', 'original'], ['cordial', 'warm', 'frosty'], ['culpable', 'guilty', 'innocent'],
  ['dearth', 'shortage', 'surplus'], ['docile', 'obedient', 'unruly'], ['ephemeral', 'fleeting', 'enduring'], ['exacerbate', 'worsen', 'improve'],
  ['fortify', 'strengthen', 'weaken'], ['gregarious', 'sociable', 'reclusive'], ['haughty', 'arrogant', 'humble'], ['indolent', 'idle', 'industrious'],
  ['jubilant', 'joyful', 'sorrowful'], ['laudable', 'praiseworthy', 'blameworthy'], ['lethargic', 'sluggish', 'energetic'], ['magnanimous', 'generous', 'petty'],
  ['nonchalant', 'unconcerned', 'anxious'], ['opulent', 'luxurious', 'austere'], ['pragmatic', 'practical', 'idealistic'], ['proficient', 'skilled', 'inept'],
  ['rebuke', 'reprimand', 'praise'], ['resilient', 'tough', 'fragile'], ['sporadic', 'occasional', 'constant'], ['superfluous', 'unnecessary', 'essential'],
  ['tranquil', 'peaceful', 'agitated'], ['trivial', 'insignificant', 'crucial'], ['venerate', 'revere', 'despise'], ['verbose', 'wordy', 'terse'],
  ['wary', 'cautious', 'careless'], ['adversity', 'hardship', 'prosperity'], ['alleviate', 'ease', 'intensify'], ['arduous', 'difficult', 'effortless'],
  ['astute', 'shrewd', 'naive'], ['belligerent', 'aggressive', 'peaceable'], ['commend', 'praise', 'criticize'], ['complacent', 'smug', 'dissatisfied'],
  ['conspicuous', 'noticeable', 'inconspicuous'], ['copious', 'ample', 'meagre'], ['credible', 'believable', 'implausible'], ['detrimental', 'harmful', 'beneficial'],
  ['discreet', 'tactful', 'indiscreet'], ['disparity', 'difference', 'similarity'], ['elated', 'delighted', 'dejected'], ['emulate', 'imitate', 'neglect'],
  ['enhance', 'improve', 'impair'], ['erratic', 'unpredictable', 'consistent'], ['exemplary', 'ideal', 'deplorable'], ['fallacy', 'misconception', 'truth'],
  ['fervent', 'passionate', 'indifferent'], ['futile', 'useless', 'fruitful'], ['hamper', 'hinder', 'facilitate'], ['immaculate', 'spotless', 'filthy'],
  ['imminent', 'impending', 'distant'], ['inevitable', 'unavoidable', 'avoidable'], ['innate', 'inborn', 'acquired'], ['intrepid', 'fearless', 'timid'],
  ['lenient', 'tolerant', 'strict'], ['malevolent', 'spiteful', 'benign'], ['mundane', 'ordinary', 'extraordinary'], ['negligent', 'careless', 'attentive'],
  ['obstinate', 'stubborn', 'flexible'], ['pacify', 'calm', 'provoke'], ['paramount', 'supreme', 'minor'], ['perilous', 'dangerous', 'safe'],
  ['plausible', 'reasonable', 'unlikely'], ['precarious', 'unstable', 'secure'], ['profound', 'deep', 'superficial'], ['prolific', 'productive', 'unproductive'],
  ['quell', 'suppress', 'incite'], ['rectify', 'correct', 'spoil'], ['relinquish', 'surrender', 'retain'], ['replenish', 'refill', 'deplete'],
  ['sagacious', 'wise', 'foolish'], ['serene', 'tranquil', 'disturbed'], ['solemn', 'serious', 'frivolous'], ['stringent', 'rigorous', 'lax'],
  ['subtle', 'delicate', 'obvious'], ['tedious', 'boring', 'interesting'], ['thrive', 'flourish', 'decline'], ['ubiquitous', 'omnipresent', 'rare'],
  ['valiant', 'brave', 'cowardly'], ['vigilant', 'watchful', 'inattentive'], ['vivid', 'bright', 'dull'], ['volatile', 'unstable', 'steady'],
  ['ameliorate', 'improve', 'worsen'], ['animosity', 'hostility', 'goodwill'], ['censure', 'condemn', 'approve'], ['coherent', 'logical', 'incoherent'],
  ['diminutive', 'tiny', 'enormous'], ['frivolous', 'silly', 'serious'], ['hypothetical', 'theoretical', 'actual'], ['inquisitive', 'curious', 'uninterested'],
  ['jeopardize', 'endanger', 'protect'], ['loquacious', 'talkative', 'taciturn'], ['notorious', 'infamous', 'unknown'], ['reticent', 'reserved', 'outspoken'],
];

const ROOTS = [
  { q: 'The root "chron" (as in chronology) relates to:', a: 'Time', w: ['Colour', 'Sound', 'Light'] },
  { q: 'The prefix "bene-" (as in benefit) means:', a: 'Good', w: ['Bad', 'Before', 'Against'] },
  { q: 'The root "spect" (as in spectator) means:', a: 'To look', w: ['To carry', 'To write', 'To speak'] },
  { q: 'The prefix "mal-" (as in malfunction) means:', a: 'Bad', w: ['Large', 'Many', 'Again'] },
  { q: 'The root "port" (as in transport) means:', a: 'To carry', w: ['To break', 'To see', 'To believe'] },
  { q: 'The root "scrib/script" means:', a: 'To write', w: ['To hear', 'To run', 'To build'] },
  { q: 'The prefix "omni-" (as in omnivore) means:', a: 'All', w: ['None', 'One', 'Half'] },
  { q: 'The root "cred" (as in credible) means:', a: 'To believe', w: ['To lend', 'To create', 'To fly'] },
  { q: 'The root "phil" (as in philosophy) means:', a: 'Love', w: ['Fear', 'Knowledge', 'Wisdom'] },
  { q: 'The prefix "circum-" (as in circumference) means:', a: 'Around', w: ['Under', 'Across', 'Within'] },
  { q: 'The root "dict" (as in dictate) means:', a: 'To say', w: ['To lead', 'To hide', 'To give'] },
  { q: 'The suffix "-cide" (as in pesticide) means:', a: 'Killing', w: ['Study of', 'Fear of', 'Belief in'] },
];

const ANALOGIES = [
  { q: 'PEN : WRITER :: BRUSH : ?', a: 'Painter', w: ['Canvas', 'Colour', 'Gallery'], e: 'Tool : user who works with it.' },
  { q: 'THERMOMETER : TEMPERATURE :: BAROMETER : ?', a: 'Air pressure', w: ['Humidity', 'Wind speed', 'Rainfall'], e: 'Instrument : what it measures.' },
  { q: 'FLOCK : SHEEP :: SWARM : ?', a: 'Bees', w: ['Lions', 'Fish', 'Cattle'], e: 'Group name : members.' },
  { q: 'DROUGHT : RAIN :: FAMINE : ?', a: 'Food', w: ['Water', 'Crops', 'Hunger'], e: 'Condition : what is lacking.' },
  { q: 'AUTHOR : NOVEL :: COMPOSER : ?', a: 'Symphony', w: ['Orchestra', 'Piano', 'Audience'], e: 'Creator : creation.' },
  { q: 'INCH : FOOT :: MILLIMETRE : ?', a: 'Metre', w: ['Kilogram', 'Mile', 'Litre'], e: 'Smaller unit : larger unit of length.' },
  { q: 'CUB : BEAR :: FOAL : ?', a: 'Horse', w: ['Goat', 'Cow', 'Dog'], e: 'Young : adult.' },
  { q: 'DOCTOR : HOSPITAL :: TEACHER : ?', a: 'School', w: ['Student', 'Lesson', 'Book'], e: 'Worker : workplace.' },
  { q: 'ARID : MOIST :: BRIGHT : ?', a: 'Dim', w: ['Shiny', 'Light', 'Clear'], e: 'Antonyms.' },
  { q: 'GERMINATE : SEED :: HATCH : ?', a: 'Egg', w: ['Bird', 'Nest', 'Shell'], e: 'Process : what undergoes it.' },
  { q: 'LIBRARY : BOOKS :: ARSENAL : ?', a: 'Weapons', w: ['Soldiers', 'Money', 'Paintings'], e: 'Place : what it stores.' },
  { q: 'GLOVE : HAND :: SOCK : ?', a: 'Foot', w: ['Shoe', 'Leg', 'Wool'], e: 'Covering : body part covered.' },
  { q: 'SCALPEL : SURGEON :: GAVEL : ?', a: 'Judge', w: ['Lawyer', 'Carpenter', 'Auctioneer\'s hammer'], e: 'Tool : professional.' },
  { q: 'HYDROGEN : GAS :: MERCURY : ?', a: 'Liquid', w: ['Solid', 'Planet', 'Metal ore'], e: 'Element : state at room temperature.' },
  { q: 'PROLOGUE : BOOK :: OVERTURE : ?', a: 'Opera', w: ['Painting', 'Poem', 'Statue'], e: 'Opening part : whole work.' },
  { q: 'BIBLIOPHILE : BOOKS :: AUDIOPHILE : ?', a: 'Sound', w: ['Films', 'Food', 'Travel'], e: 'Lover of : object of love.' },
  { q: 'VOLT : POTENTIAL DIFFERENCE :: OHM : ?', a: 'Resistance', w: ['Current', 'Power', 'Charge'], e: 'Unit : quantity.' },
  { q: 'CATERPILLAR : BUTTERFLY :: TADPOLE : ?', a: 'Frog', w: ['Fish', 'Snake', 'Lizard'], e: 'Larva : adult.' },
  { q: 'GENEROUS : MISERLY :: BRAVE : ?', a: 'Cowardly', w: ['Bold', 'Strong', 'Heroic'], e: 'Antonyms.' },
  { q: 'MOUNTAIN : PEAK :: WAVE : ?', a: 'Crest', w: ['Trough', 'Ocean', 'Tide'], e: 'Thing : its highest point.' },
  { q: 'COBBLER : SHOES :: TAILOR : ?', a: 'Clothes', w: ['Needles', 'Fabric shop', 'Buttons only'], e: 'Craftsman : product.' },
  { q: 'RECKLESS : CAUTION :: RUDE : ?', a: 'Courtesy', w: ['Anger', 'Speech', 'Honesty'], e: 'Person lacking : quality lacked.' },
  { q: 'CHAPTER : BOOK :: SCENE : ?', a: 'Play', w: ['Actor', 'Stage', 'Script writer'], e: 'Part : whole.' },
  { q: 'MICROSCOPE : SMALL :: TELESCOPE : ?', a: 'Distant', w: ['Large', 'Bright', 'Hidden'], e: 'Instrument : what it helps see.' },
  { q: 'FAMINE : STARVATION :: FLOOD : ?', a: 'Inundation', w: ['Drought', 'Rain', 'River'], e: 'Event : effect.' },
  { q: 'WORDS : DICTIONARY :: MAPS : ?', a: 'Atlas', w: ['Globe', 'Compass', 'Encyclopedia'], e: 'Content : collection.' },
  { q: 'SLOTH : SLOW :: FOX : ?', a: 'Cunning', w: ['Loyal', 'Lazy', 'Huge'], e: 'Animal : characteristic trait.' },
  { q: 'EXTINGUISH : FIRE :: QUENCH : ?', a: 'Thirst', w: ['Water', 'Hunger', 'Heat'], e: 'Action : what it ends.' },
];

const GRAMMAR = [
  { q: 'Choose the correct sentence.', a: 'Neither the teacher nor the students were present.', w: ['Neither the teacher nor the students was present.', 'Neither the teacher or the students were present.', 'Neither of the teacher nor the students were present.'], e: 'With neither…nor, the verb agrees with the nearer subject (students → were).' },
  { q: 'Choose the correct sentence.', a: 'Each of the boys has a bicycle.', w: ['Each of the boys have a bicycle.', 'Each of the boys are having a bicycle.', 'Each boys has a bicycle.'], e: '"Each" is singular.' },
  { q: 'Choose the correct sentence.', a: 'She has been living in Islamabad since 2019.', w: ['She is living in Islamabad since 2019.', 'She lives in Islamabad since 2019.', 'She has been living in Islamabad for 2019.'], e: 'Present perfect continuous with "since" + point in time.' },
  { q: 'Choose the correct sentence.', a: 'If I were you, I would accept the offer.', w: ['If I was you, I will accept the offer.', 'If I am you, I would accept the offer.', 'If I were you, I will accept the offer.'], e: 'Second conditional (subjunctive "were" + would).' },
  { q: 'Choose the correct sentence.', a: 'The number of applicants is increasing every year.', w: ['The number of applicants are increasing every year.', 'A number of applicants is increasing every year.', 'The number of applicant are increasing every year.'], e: '"The number" takes a singular verb; "a number" takes a plural verb.' },
  { q: 'Choose the correct sentence.', a: 'He is one of the students who have passed.', w: ['He is one of the students who has passed.', 'He is one of the student who have passed.', 'He is one of the students which have passed.'], e: '"who" refers to "students" (plural).' },
  { q: 'Choose the correct sentence.', a: 'Between you and me, the exam was easy.', w: ['Between you and I, the exam was easy.', 'Among you and me, the exam was easy.', 'Between you and myself, the exam was easy.'], e: 'Prepositions take object pronouns.' },
  { q: 'Choose the correct sentence.', a: 'Hardly had he arrived when it started raining.', w: ['Hardly had he arrived than it started raining.', 'Hardly he had arrived when it started raining.', 'Hardly had he arrived then it started raining.'], e: '"Hardly … when" with inversion.' },
  { q: 'Choose the correct sentence.', a: 'No sooner did the bell ring than the students left.', w: ['No sooner did the bell ring when the students left.', 'No sooner the bell rang than the students left.', 'No sooner did the bell rang than the students left.'], e: '"No sooner … than" with inversion.' },
  { q: 'Choose the correct sentence.', a: 'I prefer tea to coffee.', w: ['I prefer tea than coffee.', 'I prefer tea over than coffee.', 'I prefer tea from coffee.'], e: '"Prefer" takes "to".' },
  { q: 'Choose the correct sentence.', a: 'He is senior to me by two years.', w: ['He is senior than me by two years.', 'He is senior from me by two years.', 'He is more senior to me by two years.'], e: 'Latin comparatives (senior, junior, superior) take "to".' },
  { q: 'Choose the correct sentence.', a: 'The committee has submitted its report.', w: ['The committee have submitted its report.', 'The committee has submitted their report.', 'The committee are submitted its report.'], e: 'A collective noun acting as one unit is singular.' },
  { q: 'Choose the correct sentence.', a: 'Physics is my favourite subject.', w: ['Physics are my favourite subject.', 'Physics were my favourite subject.', 'The physics are my favourite subjects.'], e: 'Subjects ending in -ics are singular.' },
  { q: 'Choose the correct sentence.', a: 'She did not know where he lived.', w: ['She did not know where did he live.', 'She did not know where he does live.', 'She did not knew where he lived.'], e: 'Indirect questions use statement word order; "did not" + base verb.' },
  { q: 'Choose the correct sentence.', a: 'He told me that he was tired.', w: ['He told me that he is tired yesterday.', 'He said me that he was tired.', 'He told to me that he was tired.'], e: '"Tell" takes an object directly; "say" does not.' },
  { q: 'Choose the correct sentence.', a: 'The data were analysed carefully.', w: ['The datas were analysed carefully.', 'The data was analysed carefully by datas.', 'The data were analyse carefully.'], e: 'Formally, "data" is plural; passive needs the past participle.' },
  { q: 'Choose the correct sentence.', a: 'Neither of the two answers is correct.', w: ['Neither of the two answers are correct.', 'None of the two answers is correct.', 'Neither of the two answer is correct.'], e: '"Neither of" + plural noun takes a singular verb.' },
  { q: 'Choose the correct sentence.', a: 'By the time we reached, the train had left.', w: ['By the time we reached, the train has left.', 'By the time we reached, the train left already.', 'By the time we had reached, the train leaves.'], e: 'Past perfect for the earlier of two past actions.' },
  { q: 'Choose the correct sentence.', a: 'I look forward to meeting you.', w: ['I look forward to meet you.', 'I am looking forward to meet you.', 'I look forward for meeting you.'], e: '"Look forward to" + -ing.' },
  { q: 'Choose the correct sentence.', a: 'It is high time we left.', w: ['It is high time we leave.', 'It is high time we will leave.', 'It is high time we have left.'], e: '"It is high time" + past tense.' },
  { q: 'Identify the part with an error: "The furnitures (A) in the hall (B) were (C) very old (D)."', a: 'A', w: ['B', 'C', 'D'], e: '"Furniture" is uncountable (no -s); with that correction the verb should be "was".' },
  { q: 'Identify the part with an error: "She is (A) more cleverer (B) than (C) her sister (D)."', a: 'B', w: ['A', 'C', 'D'], e: 'Double comparative — use "cleverer" or "more clever".' },
  { q: 'Identify the part with an error: "One of my friend (A) has (B) won (C) the prize (D)."', a: 'A', w: ['B', 'C', 'D'], e: '"One of" takes a plural noun: "one of my friends".' },
  { q: 'Identify the part with an error: "He did not (A) went (B) to school (C) yesterday (D)."', a: 'B', w: ['A', 'C', 'D'], e: '"Did not" + base form "go".' },
  { q: 'Identify the part with an error: "The news (A) are (B) very (C) encouraging (D)."', a: 'B', w: ['A', 'C', 'D'], e: '"News" is singular — "is".' },
  { q: 'Identify the part with an error: "I have (A) seen him (B) yesterday (C) at the market (D)."', a: 'A', w: ['B', 'C', 'D'], e: 'Present perfect cannot be used with "yesterday" — use "saw".' },
  { q: 'Identify the part with an error: "Everyone (A) must bring (B) their (C) own books (D)." (formal usage)', a: 'C', w: ['A', 'B', 'D'], e: 'In strict formal grammar, "everyone" takes "his or her".' },
  { q: 'Identify the part with an error: "He is (A) an (B) university (C) student (D)."', a: 'B', w: ['A', 'C', 'D'], e: '"University" begins with a "yoo" sound — "a university".' },
  { q: 'Identify the part with an error: "She has (A) an (B) unique (C) style (D)."', a: 'B', w: ['A', 'C', 'D'], e: '"Unique" begins with a "yoo" sound — "a unique".' },
  { q: 'Identify the part with an error: "Ali and his brother (A) is (B) coming (C) tomorrow (D)."', a: 'B', w: ['A', 'C', 'D'], e: 'Compound subject joined by "and" takes "are".' },
  { q: 'Choose the correctly punctuated sentence.', a: 'However, the results were not as expected.', w: ['However the results, were not as expected.', 'However; the results were not as expected.', 'However the results were not, as expected.'], e: 'Introductory transition word followed by a comma.' },
  { q: 'Choose the correctly punctuated sentence.', a: 'The lab needs three things: time, money and patience.', w: ['The lab needs three things; time, money and patience.', 'The lab needs: three things time, money and patience.', 'The lab needs three things, time; money; and patience.'], e: 'A colon introduces a list after a complete clause.' },
  { q: 'Choose the correctly punctuated sentence.', a: 'It\'s clear that the company changed its policy.', w: ['Its clear that the company changed it\'s policy.', 'It\'s clear that the company changed it\'s policy.', 'Its clear that the company changed its policy.'], e: 'It\'s = it is; its = possessive.' },
  { q: 'Choose the word that best completes: "The children ____ playing in the garden when it began to rain."', a: 'were', w: ['was', 'are', 'have been'], e: 'Past continuous, plural subject.' },
  { q: 'Choose the word that best completes: "She is good ____ mathematics."', a: 'at', w: ['in', 'on', 'with'], e: '"Good at" a skill or subject.' },
  { q: 'Choose the word that best completes: "He insisted ____ paying the bill."', a: 'on', w: ['to', 'for', 'at'], e: '"Insist on" + -ing.' },
  { q: 'Choose the word that best completes: "This book is different ____ that one."', a: 'from', w: ['than', 'to', 'with'], e: '"Different from" is the standard form.' },
  { q: 'Choose the word that best completes: "The thief was accused ____ stealing a car."', a: 'of', w: ['for', 'with', 'about'], e: '"Accused of".' },
  { q: 'Choose the word that best completes: "We have been waiting ____ two hours."', a: 'for', w: ['since', 'from', 'by'], e: '"For" + a period of time.' },
  { q: 'Choose the word that best completes: "He is the ____ of the two brothers."', a: 'taller', w: ['tallest', 'more tall', 'most tall'], e: 'Comparative for two.' },
  { q: 'Choose the word that best completes: "Scarcely ____ the station when the train arrived."', a: 'had we reached', w: ['we had reached', 'we reached', 'did we reached'], e: 'Inversion after "scarcely".' },
  { q: 'Choose the word that best completes: "The letter ____ by the clerk yesterday."', a: 'was typed', w: ['typed', 'has been typed', 'is typed'], e: 'Simple past passive.' },
  { q: 'Choose the word that best completes: "Unless you ____ hard, you will fail."', a: 'work', w: ['will work', 'worked', 'don\'t work'], e: '"Unless" already means "if not" — no extra negative.' },
  { q: 'Choose the word that best completes: "I wish I ____ a bird."', a: 'were', w: ['am', 'was being', 'will be'], e: 'Subjunctive after "wish".' },
  { q: 'Choose the word that best completes: "Ten kilometres ____ a long distance to walk."', a: 'is', w: ['are', 'were', 'have been'], e: 'An amount treated as a single quantity is singular.' },
];

const COMPLETION = [
  { q: 'Despite his ____ efforts, the experiment failed to produce the expected results.', a: 'strenuous', w: ['lethargic', 'trivial', 'reluctant'], e: '"Despite" signals contrast — the effort was great.' },
  { q: 'The scientist was ____ about her findings, refusing to announce them until every test was repeated.', a: 'cautious', w: ['careless', 'boastful', 'indifferent'], e: 'Refusing to announce early shows caution.' },
  { q: 'The once ____ village has now become a crowded city.', a: 'tranquil', w: ['bustling', 'noisy', 'congested'], e: '"Once" + contrast with "crowded".' },
  { q: 'Because the instructions were so ____, many students misunderstood the task.', a: 'ambiguous', w: ['explicit', 'lucid', 'concise'], e: 'Unclear instructions cause misunderstanding.' },
  { q: 'His ____ remarks offended everyone in the room.', a: 'tactless', w: ['diplomatic', 'courteous', 'gracious'], e: 'Offensive remarks are tactless.' },
  { q: 'The professor\'s lecture was so ____ that several students fell asleep.', a: 'tedious', w: ['captivating', 'riveting', 'stimulating'], e: 'Boring lectures put people to sleep.' },
  { q: 'Water is ____ to life; no organism can survive without it.', a: 'essential', w: ['superfluous', 'harmful', 'irrelevant'], e: 'Cannot survive without ⇒ essential.' },
  { q: 'The medicine ____ the pain but did not cure the disease.', a: 'alleviated', w: ['aggravated', 'caused', 'ignored'], e: 'Relieved but did not cure.' },
  { q: 'Though he was ____ in public, he was quite talkative among friends.', a: 'reticent', w: ['loquacious', 'gregarious', 'vocal'], e: '"Though" contrasts with talkative.' },
  { q: 'The evidence was so ____ that the jury reached a verdict within minutes.', a: 'conclusive', w: ['dubious', 'flimsy', 'contradictory'], e: 'Quick verdict ⇒ strong evidence.' },
  { q: 'Fossil fuels are ____ resources; once used, they cannot be replaced.', a: 'non-renewable', w: ['inexhaustible', 'renewable', 'abundant'], e: 'Cannot be replaced ⇒ non-renewable.' },
  { q: 'The athlete\'s ____ training schedule left little time for rest.', a: 'rigorous', w: ['lenient', 'casual', 'sporadic'], e: 'Little rest ⇒ demanding schedule.' },
  { q: 'The manager tried to ____ the angry customers by offering refunds.', a: 'pacify', w: ['provoke', 'ignore', 'irritate'], e: 'Refunds calm people down.' },
  { q: 'Her ____ for detail made her an excellent proofreader.', a: 'eye', w: ['ear', 'hand', 'nose'], e: 'Idiom: an eye for detail.' },
  { q: 'Rather than ____ the problem, the committee chose to ignore it.', a: 'address', w: ['overlook', 'dismiss', 'neglect'], e: '"Rather than" contrasts with ignoring.' },
  { q: 'The bridge was declared ____ after engineers found cracks in its pillars.', a: 'unsafe', w: ['sturdy', 'secure', 'robust'], e: 'Cracks ⇒ unsafe.' },
  { q: 'Many inventions that seem ____ today were considered impossible a century ago.', a: 'commonplace', w: ['unthinkable', 'unprecedented', 'rare'], e: 'Contrast between today and a century ago.' },
  { q: 'The speaker\'s argument was ____: each point followed logically from the last.', a: 'coherent', w: ['disjointed', 'rambling', 'contradictory'], e: 'Logical flow ⇒ coherent.' },
  { q: 'The ____ student asked so many questions that the teacher extended the class.', a: 'inquisitive', w: ['apathetic', 'indifferent', 'drowsy'], e: 'Many questions ⇒ curious.' },
  { q: 'Although the task seemed ____ at first, it turned out to be quite simple.', a: 'daunting', w: ['effortless', 'trivial', 'easy'], e: '"Although" contrasts with simple.' },
  { q: 'The company\'s profits ____ after it launched the new product, rising by forty per cent.', a: 'soared', w: ['plummeted', 'stagnated', 'dwindled'], e: 'Rising by forty per cent ⇒ soared.' },
  { q: 'Good leaders ____ responsibility for mistakes instead of blaming others.', a: 'accept', w: ['evade', 'deny', 'shift'], e: 'Contrast with blaming others.' },
  { q: 'The desert receives ____ rainfall, so few plants can grow there.', a: 'scant', w: ['copious', 'abundant', 'heavy'], e: 'Few plants ⇒ little rain.' },
  { q: 'Her explanation was so ____ that even beginners understood it.', a: 'lucid', w: ['obscure', 'convoluted', 'vague'], e: 'Easy to understand ⇒ clear.' },
  { q: 'The rumours proved to be ____; not a single claim was true.', a: 'baseless', w: ['accurate', 'verified', 'credible'], e: 'No claim true ⇒ baseless.' },
  { q: 'The old law was ____ and replaced with a modern one.', a: 'repealed', w: ['enacted', 'enforced', 'upheld'], e: 'Replaced ⇒ cancelled.' },
  { q: 'Scientists remain ____ about the claim until it is independently verified.', a: 'sceptical', w: ['convinced', 'credulous', 'certain'], e: 'Until verified ⇒ doubtful.' },
  { q: 'The ____ of the new policy were felt across the entire country.', a: 'effects', w: ['affects', 'effect', 'affections'], e: 'Noun plural "effects".' },
  { q: 'He was ____ to resign after the scandal became public.', a: 'compelled', w: ['delighted', 'reluctant to refuse', 'invited'], e: 'Scandal forced resignation.' },
  { q: 'The two theories are ____: if one is true, the other must be false.', a: 'incompatible', w: ['identical', 'complementary', 'interchangeable'], e: 'Cannot both be true.' },
  { q: 'A good engineer must be both ____ and creative: careful with details yet open to new ideas.', a: 'meticulous', w: ['careless', 'hasty', 'negligent'], e: 'Careful with details.' },
  { q: 'The documentary was praised for its ____ portrayal, which avoided taking sides.', a: 'impartial', w: ['biased', 'one-sided', 'partisan'], e: 'Avoided taking sides ⇒ impartial.' },
  { q: 'Instead of ____ the budget, the government increased spending further.', a: 'curtailing', w: ['inflating', 'expanding', 'doubling'], e: '"Instead of" contrasts with increased.' },
  { q: 'The storm was so ____ that it uprooted hundreds of trees.', a: 'violent', w: ['mild', 'gentle', 'brief'], e: 'Uprooting trees ⇒ violent.' },
  { q: 'Her ____ nature made her popular with everyone she met.', a: 'amiable', w: ['hostile', 'aloof', 'surly'], e: 'Popular ⇒ friendly.' },
  { q: 'The ancient manuscript was so ____ that it crumbled when touched.', a: 'fragile', w: ['durable', 'sturdy', 'resilient'], e: 'Crumbled ⇒ fragile.' },
];

// Original passages (each with questions)
const PASSAGES = [
  { title: 'Desalination', text: 'Across many dry regions, governments are turning to desalination — removing salt from seawater — to meet rising demand for fresh water. The most common method today is reverse osmosis, in which seawater is pushed at high pressure through membranes that let water molecules pass but block dissolved salts. The technique works, but it is expensive: pumping water against such pressures consumes large amounts of electricity, and the concentrated brine left behind must be disposed of carefully, because dumping it back into shallow coastal waters can harm marine life. Engineers are therefore pursuing two goals at once. The first is efficiency: newer membranes and energy-recovery devices have already cut the electricity needed per cubic metre by more than half compared with plants built a few decades ago. The second is integration with renewable energy, so that solar or wind power can drive plants during the day while stored water supplies the night. Critics argue that conservation and the repair of leaking city pipes would be cheaper first steps. Supporters reply that in places with almost no rainfall, desalination is not a luxury but a necessity.',
    qs: [
      { q: 'The passage is mainly concerned with:', a: 'The benefits, costs and improvements of desalination', w: ['The history of water pipes in cities', 'How marine life adapts to salty water', 'Why rainfall is decreasing worldwide'] },
      { q: 'According to the passage, reverse osmosis works by:', a: 'Forcing seawater through membranes that block salts', w: ['Boiling seawater and condensing the vapour', 'Adding chemicals that dissolve salt', 'Freezing seawater to separate ice'] },
      { q: 'Brine must be disposed of carefully because it:', a: 'Can harm marine life in shallow coastal waters', w: ['Is radioactive', 'Blocks the membranes permanently', 'Evaporates too quickly'] },
      { q: 'The critics mentioned in the passage believe that:', a: 'Fixing leaks and conserving water should come first', w: ['Desalination should be banned', 'Solar power cannot run any machine', 'Rainfall will soon increase'] },
      { q: 'The tone of the passage is best described as:', a: 'Balanced and informative', w: ['Angry and accusing', 'Humorous', 'Nostalgic'] },
    ] },
  { title: 'The habit of reading slowly', text: 'In an age of endless scrolling, the idea of reading slowly can sound almost rebellious. Yet some teachers argue that slow reading is a skill worth practising deliberately. When we skim, we collect headlines and impressions; when we read slowly, we notice how an argument is built, where the evidence is thin, and which word choices push us toward a conclusion. This does not mean every text deserves the same attention. A train timetable needs only a glance, while a contract or a scientific paper may need several careful passes. The point is to choose the speed consciously rather than letting habit choose it for us. Students who practise this often report an unexpected benefit: examinations feel less rushed, because they spend less time re-reading questions they misunderstood the first time. Slow reading, it turns out, can save time.',
    qs: [
      { q: 'The central idea of the passage is that:', a: 'Readers should choose their reading speed deliberately', w: ['All texts must be read slowly', 'Skimming is always harmful', 'Timetables are difficult to read'] },
      { q: 'The word "rebellious" in the first sentence suggests that slow reading:', a: 'Goes against a common modern habit', w: ['Is illegal', 'Is violent', 'Is old-fashioned and useless'] },
      { q: 'According to the passage, slow reading helps a reader to:', a: 'Notice weak evidence and persuasive word choices', w: ['Memorise every word', 'Read twice as many books', 'Avoid scientific papers'] },
      { q: 'The "unexpected benefit" mentioned is that students:', a: 'Feel less rushed in examinations', w: ['Need fewer textbooks', 'Stop using phones', 'Get longer exam time'] },
      { q: 'The final sentence of the passage is an example of:', a: 'A paradox', w: ['A simile', 'An exaggeration about trains', 'A question'] },
    ] },
  { title: 'Bees and pollination', text: 'Roughly three-quarters of the world\'s leading food crops depend to some degree on animal pollinators, and bees are the most important of them. As a bee moves from flower to flower collecting nectar, pollen sticks to its hairy body and is carried to the next bloom, allowing plants to produce fruit and seeds. In recent decades, beekeepers in several countries have reported unusually high losses of colonies. Researchers have identified no single cause. Instead, a combination of factors appears to be at work: the loss of wildflower habitats, certain pesticides, parasitic mites and diseases, and changes in weather patterns. Because the causes are many, so are the proposed solutions. Farmers are being encouraged to leave strips of wild plants along field edges, regulators have restricted some chemicals, and city dwellers are planting flowering gardens on rooftops. Scientists caution that wild bees, which receive far less attention than honeybees kept by farmers, may be the most vulnerable of all.',
    qs: [
      { q: 'According to the passage, the decline in bee colonies is caused by:', a: 'Several interacting factors', w: ['A single new disease', 'Rooftop gardens', 'Excessive wildflowers'] },
      { q: 'The passage suggests that leaving wild plants along field edges would:', a: 'Provide habitat and food for bees', w: ['Increase pesticide use', 'Reduce crop pollination', 'Spread mites'] },
      { q: 'The word "vulnerable" in the last sentence most nearly means:', a: 'At risk', w: ['Valuable', 'Aggressive', 'Numerous'] },
      { q: 'Which statement would the author most likely agree with?', a: 'Protecting pollinators supports food production', w: ['Bees are unimportant to agriculture', 'Honeybees are the only bees that matter', 'Pesticides have no effect on insects'] },
      { q: 'Why does the author mention rooftop gardens?', a: 'As an example of how city residents can help bees', w: ['To criticise urban farming', 'To explain how pesticides spread', 'To show that bees avoid cities'] },
    ] },
  { title: 'The engineer\'s notebook', text: 'Before computers stored every calculation automatically, engineers kept bound notebooks in which they recorded measurements, sketches and failed attempts in ink, with dates on every page. The practice was not merely tidy; it was a form of protection. In disputes over who had invented something first, a dated notebook could serve as evidence. It also protected engineers from their own memories, which tend to rewrite failures as near-successes. Today many teams use shared digital documents instead, which are easier to search and impossible to lose in a flood. Yet some experienced engineers still advise students to keep a paper notebook alongside their software. Writing by hand, they say, forces you to slow down and decide what is worth recording, and the act of choosing is itself a kind of thinking.',
    qs: [
      { q: 'According to the passage, dated notebooks were useful in disputes because they:', a: 'Provided evidence of when something was done', w: ['Were written in pencil', 'Could be searched easily', 'Contained only successful results'] },
      { q: 'The phrase "protected engineers from their own memories" means that notebooks:', a: 'Kept an honest record that memory might distort', w: ['Helped engineers forget mistakes', 'Stopped engineers from remembering anything', 'Replaced the need for experiments'] },
      { q: 'One advantage of digital documents mentioned is that they:', a: 'Are easier to search', w: ['Force people to slow down', 'Are written in ink', 'Cannot be shared'] },
      { q: 'The experienced engineers value handwriting mainly because it:', a: 'Encourages careful selection and thinking', w: ['Looks more professional', 'Is faster than typing', 'Is required by law'] },
      { q: 'The author\'s attitude toward paper notebooks is:', a: 'Appreciative but not dismissive of digital tools', w: ['Completely hostile', 'Mocking', 'Indifferent'] },
    ] },
  { title: 'Urban heat islands', text: 'On a summer afternoon, the centre of a large city can be several degrees warmer than the surrounding countryside. Scientists call this the urban heat island effect. Dark roofs and asphalt roads absorb sunlight and release the stored heat slowly, even after sunset, while the shortage of trees removes the cooling that comes from shade and the evaporation of water from leaves. Air conditioners add to the problem by pumping warm air outdoors. The consequences are more than uncomfortable: hotter nights reduce sleep quality, raise electricity demand and increase health risks for the elderly. Some cities are responding by painting roofs white or light grey, which reflects a larger share of sunlight, and by planting trees along streets. Such measures are relatively cheap, but they work best when applied across whole neighbourhoods rather than to a few isolated buildings.',
    qs: [
      { q: 'The urban heat island effect refers to:', a: 'Cities being warmer than nearby rural areas', w: ['Islands being hotter than mainland', 'Heat rising from the ocean', 'Cold winters in cities'] },
      { q: 'According to the passage, trees cool the surroundings through:', a: 'Shade and evaporation from leaves', w: ['Absorbing asphalt', 'Producing electricity', 'Reflecting all sunlight'] },
      { q: 'White roofs help because they:', a: 'Reflect more sunlight', w: ['Absorb more heat', 'Are cheaper to build', 'Block wind'] },
      { q: 'It can be inferred that isolated cool roofs are:', a: 'Less effective than neighbourhood-wide measures', w: ['Harmful to residents', 'More effective than trees everywhere', 'Banned in most cities'] },
      { q: 'Which is NOT mentioned as a consequence of hotter nights?', a: 'Lower water prices', w: ['Poorer sleep', 'Higher electricity demand', 'Health risks for the elderly'] },
    ] },
  { title: 'Learning from mistakes', text: 'Psychologists who study learning have repeatedly found that testing yourself is more effective than re-reading. When students close the book and try to recall an idea, they struggle — and that struggle, though uncomfortable, strengthens memory. Even getting an answer wrong can help, provided the correct answer is checked soon afterwards. The error seems to prepare the mind to notice and hold on to the right information. This finding runs against a common instinct. Many students avoid practice questions until they "feel ready", fearing that mistakes will discourage them. Yet waiting for confidence often means waiting too long. A better approach, researchers suggest, is to begin testing early, accept that the first scores will be low, and treat each mistake as a signpost pointing to what needs work.',
    qs: [
      { q: 'The main purpose of the passage is to:', a: 'Recommend early self-testing as a study method', w: ['Criticise psychologists', 'Argue that mistakes should be avoided', 'Describe how textbooks are written'] },
      { q: 'According to the passage, the struggle to recall information:', a: 'Strengthens memory', w: ['Weakens memory', 'Has no effect', 'Should always be avoided'] },
      { q: 'A wrong answer is helpful only if:', a: 'The correct answer is checked soon afterwards', w: ['It is repeated many times', 'Nobody notices it', 'The student stops studying'] },
      { q: 'The word "signpost" in the last sentence is used to suggest that mistakes:', a: 'Show the direction for further study', w: ['Are signs of failure', 'Should be hidden', 'Are road accidents'] },
      { q: 'The "common instinct" mentioned in the passage is to:', a: 'Delay practice until feeling confident', w: ['Test oneself every day', 'Read books aloud', 'Study in groups'] },
    ] },
  { title: 'The printing press', text: 'When the movable-type printing press spread across Europe in the fifteenth century, books that had once taken months to copy by hand could be produced by the hundreds in weeks. The immediate effect was a fall in price, which put books within reach of merchants, students and craftsmen rather than only wealthy institutions. Over time the consequences went much further. Standardised texts allowed scholars in different cities to refer to the same page and the same diagram, which made scientific debate more precise. Spelling and grammar gradually became more uniform. Not everyone welcomed the change: some authorities worried that cheap pamphlets would spread rumours and dangerous ideas faster than they could be answered. Historians note that similar hopes and fears have accompanied every major new communication technology since.',
    qs: [
      { q: 'An immediate effect of the printing press was:', a: 'A fall in the price of books', w: ['The end of handwriting', 'The invention of paper', 'A decline in literacy'] },
      { q: 'Standardised texts made scientific debate more precise because scholars could:', a: 'Refer to identical pages and diagrams', w: ['Meet in person more often', 'Avoid writing anything', 'Use secret codes'] },
      { q: 'Some authorities feared that cheap pamphlets would:', a: 'Spread rumours quickly', w: ['Make books expensive', 'Reduce trade', 'Improve spelling'] },
      { q: 'The final sentence implies that:', a: 'New communication technologies often provoke both optimism and anxiety', w: ['The printing press was a failure', 'Modern technology has no critics', 'Historians dislike technology'] },
      { q: 'The word "uniform" in the passage most nearly means:', a: 'Consistent', w: ['Clothing', 'Colourful', 'Complicated'] },
    ] },
  { title: 'Electric vehicles and the grid', text: 'Electric cars are often described as having zero emissions, but that description is only partly accurate. The car itself releases nothing from a tailpipe; however, the electricity that charges it must be generated somewhere. Where that electricity comes mainly from coal, the overall emissions benefit is smaller, though studies generally still find some advantage because electric motors convert energy far more efficiently than petrol engines. Where the grid relies on hydro, solar or wind power, the benefit is much larger. A second challenge is timing. If millions of drivers plug in at the same hour after work, demand can spike sharply. Engineers are therefore designing "smart charging" systems that delay charging until late at night, when demand is low, or that adjust charging speed according to the state of the grid.',
    qs: [
      { q: 'The author considers the description "zero emissions" to be:', a: 'Only partly accurate', w: ['Completely accurate', 'Completely false', 'Irrelevant'] },
      { q: 'Electric cars still offer some advantage on coal-heavy grids because:', a: 'Electric motors are more efficient than petrol engines', w: ['Coal produces no emissions', 'They do not need electricity', 'They are lighter'] },
      { q: '"Smart charging" is designed to:', a: 'Shift or adjust charging to reduce peak demand', w: ['Charge every car at the same time', 'Eliminate the need for power plants', 'Increase charging cost'] },
      { q: 'The emissions benefit of electric cars is largest where electricity comes from:', a: 'Hydro, solar or wind', w: ['Coal', 'Diesel generators', 'Petrol'] },
      { q: 'The word "spike" as used in the passage means to:', a: 'Rise suddenly', w: ['Pierce', 'Fall slowly', 'Remain steady'] },
    ] },
];

// Near-synonym clusters, so a distractor is never secretly another correct answer.
const CLUSTERS = {
  calm: ['calm', 'tranquil', 'peaceful', 'placid', 'serene', 'peaceable', 'pacify'],
  careful: ['careful', 'cautious', 'wary', 'meticulous', 'vigilant', 'watchful', 'attentive', 'prudent', 'discreet', 'tactful'],
  careless: ['careless', 'sloppy', 'negligent', 'reckless', 'inattentive', 'lax', 'indiscreet'],
  wise: ['wise', 'prudent', 'sagacious', 'astute', 'shrewd'],
  improve: ['improve', 'enhance', 'ameliorate', 'rectify', 'correct', 'alleviate', 'ease', 'mitigate', 'facilitate'],
  worsen: ['worsen', 'exacerbate', 'aggravate', 'intensify', 'impair', 'spoil', 'deteriorate'],
  grow: ['increase', 'augment', 'thrive', 'flourish', 'replenish', 'refill', 'fortify', 'strengthen'],
  shrink: ['diminish', 'deplete', 'decline', 'weaken'],
  clear: ['clear', 'lucid', 'explicit', 'obvious', 'coherent', 'logical', 'noticeable', 'conspicuous', 'vivid', 'bright'],
  unclear: ['unclear', 'ambiguous', 'obscure', 'vague', 'incoherent', 'subtle', 'delicate', 'inconspicuous', 'dull'],
  lazy: ['lazy', 'indolent', 'idle', 'lethargic', 'sluggish'],
  active: ['hardworking', 'diligent', 'industrious', 'energetic', 'productive', 'prolific'],
  kind: ['kind', 'benevolent', 'magnanimous', 'generous', 'benign', 'amiable', 'cordial', 'warm', 'goodwill', 'sociable', 'gregarious'],
  hostile: ['hostile', 'unfriendly', 'malevolent', 'malicious', 'spiteful', 'belligerent', 'aggressive', 'hostility', 'animosity', 'frosty', 'harmful', 'detrimental'],
  brave: ['brave', 'valiant', 'intrepid', 'fearless'],
  timid: ['cowardly', 'timid'],
  rich: ['wealthy', 'affluent', 'opulent', 'luxurious', 'extravagant'],
  temporary: ['temporary', 'transient', 'ephemeral', 'fleeting', 'occasional', 'sporadic'],
  lasting: ['permanent', 'enduring', 'constant', 'consistent', 'steady', 'secure', 'stable'],
  praise: ['praise', 'commend', 'laudable', 'praiseworthy', 'venerate', 'revere', 'approve', 'ideal', 'exemplary'],
  blame: ['rebuke', 'reprimand', 'criticize', 'censure', 'condemn', 'despise', 'blameworthy', 'deplorable'],
  stubborn: ['stubborn', 'obstinate', 'tenacious', 'persistent'],
  yielding: ['yielding', 'flexible', 'docile', 'obedient', 'lenient', 'tolerant'],
  talkative: ['talkative', 'loquacious', 'verbose', 'wordy', 'wordiness', 'outspoken'],
  quiet: ['terse', 'taciturn', 'reticent', 'reserved', 'conciseness', 'reclusive'],
  unstable: ['unstable', 'volatile', 'precarious', 'erratic', 'unpredictable', 'turbulent', 'agitated', 'disturbed'],
  useless: ['useless', 'futile', 'superfluous', 'unnecessary', 'trivial', 'insignificant', 'minor'],
  important: ['essential', 'crucial', 'paramount', 'supreme', 'fruitful'],
  happy: ['joyful', 'jubilant', 'elated', 'delighted'],
  sad: ['sorrowful', 'dejected'],
  danger: ['dangerous', 'perilous', 'threatening', 'ominous', 'endanger', 'jeopardize'],
  safe: ['safe', 'protect', 'auspicious'],
  boring: ['boring', 'tedious', 'mundane', 'ordinary', 'banal', 'trite'],
  scarce: ['scarce', 'shortage', 'dearth', 'meagre', 'rare', 'scant', 'impoverished', 'austere', 'thrifty', 'frugal'],
  plenty: ['plentiful', 'abundant', 'copious', 'ample', 'surplus', 'omnipresent'],
  proud: ['arrogant', 'haughty', 'smug', 'complacent'],
  strong: ['robust', 'resilient', 'tough'],
  weak: ['weak', 'feeble', 'fragile'],
  eager: ['eager', 'zealous', 'enthusiastic', 'fervent', 'passionate', 'curious', 'inquisitive', 'anxious'],
  indifferent: ['indifferent', 'apathetic', 'nonchalant', 'unconcerned', 'uninterested'],
  believable: ['believable', 'credible', 'plausible', 'reasonable'],
  unbelievable: ['implausible', 'unlikely'],
  hinder: ['hinder', 'hamper', 'deter', 'discourage', 'suppress', 'quell', 'neglect', 'overlook'],
  provoke: ['provoke', 'incite', 'encourage'],
  serious: ['serious', 'solemn', 'deep', 'profound'],
  silly: ['silly', 'frivolous', 'superficial', 'foolish', 'naive'],
  guilty: ['guilty', 'culpable', 'incriminate', 'infamous', 'notorious'],
  skilled: ['skilled', 'proficient', 'expert', 'articulate', 'eloquent'],
  unskilled: ['inept', 'novice', 'beginner', 'inarticulate'],
  unfair: ['prejudiced', 'biased'],
};
const CLUSTER_OF = {};
for (const [k, words] of Object.entries(CLUSTERS)) for (const w of words) if (!CLUSTER_OF[w]) CLUSTER_OF[w] = k;
const cl = (w) => CLUSTER_OF[w] || w;
const clash = (a, b) => cl(a) === cl(b) || a === b;

// ---- generators ----
const syn = (r) => {
  const [w, s] = r.pick(VOCAB);
  const others = [...new Set(VOCAB.filter(v => v[0] !== w).map(v => v[1]))].filter(x => !clash(x, s) && !clash(x, w));
  return mcq(r, { q: `Choose the word closest in meaning to ${w.toUpperCase()}.`, correct: s, wrong: r.sample(others, 6), expl: `${w} = ${s}.`, subject: S, topic: 'Vocabulary' });
};
const ant = (r) => {
  const [w, s, a] = r.pick(VOCAB);
  const others = [...new Set(VOCAB.filter(v => v[0] !== w).flatMap(v => [v[2], v[1]]))].filter(x => !clash(x, a) && !clash(x, s));
  return mcq(r, { q: `Choose the word most nearly OPPOSITE in meaning to ${w.toUpperCase()}.`, correct: a, wrong: [s, ...r.sample(others, 5)], expl: `${w} (${s}) ↔ ${a}.`, subject: S, topic: 'Vocabulary' });
};
const root = (r) => fromPool(r, r.pick(ROOTS), S, 'Vocabulary');
const analogy = (r) => fromPool(r, r.pick(ANALOGIES), S, 'Analogies');
const grammar = (r) => fromPool(r, r.pick(GRAMMAR), S, 'Grammar & Sentence Correction');
const completion = (r) => fromPool(r, r.pick(COMPLETION), S, 'Sentence Completion');

export function passageQuestions(r, passageIndex, count = 5) {
  const p = PASSAGES[passageIndex];
  const chosen = r.sample(p.qs, count);
  return chosen.map(item => ({ ...fromPool(r, item, S, 'Reading Comprehension'), passage: p.title }));
}
export const PASSAGE_TEXT = Object.fromEntries(PASSAGES.map(p => [p.title, p.text]));
export const PASSAGE_COUNT = PASSAGES.length;

export const ENGLISH_TOPICS = [
  { id: 'e-vocab', name: 'Vocabulary', book: 'Word list + roots', gens: [syn, syn, ant, ant, root], weight: 10,
    notes: ['Learn 15–20 words a day with a synonym AND an antonym for each.', 'Use roots: bene (good), mal (bad), chron (time), spect (look), port (carry), cred (believe), dict (say).', 'Eliminate options with the wrong charge (positive vs negative) first.', 'For antonym questions, beware the synonym planted as a distractor.'] },
  { id: 'e-analogy', name: 'Analogies', book: 'SAT-style verbal reasoning', gens: [analogy], weight: 4,
    notes: ['Make a bridge sentence: "A pen is a tool used by a writer."', 'Common relations: tool–user, part–whole, young–adult, group–member, unit–quantity, antonyms, cause–effect.', 'Apply the same bridge sentence to each option; only one should fit exactly.'] },
  { id: 'e-grammar', name: 'Grammar & Sentence Correction', book: 'High School English Grammar (Wren & Martin)', gens: [grammar], weight: 10,
    notes: ['Subject–verb agreement: each/every/neither/either/one of + singular verb; "the number" singular, "a number" plural.', 'Neither…nor / either…or: verb agrees with the nearer subject.', 'Tenses: since (point in time) vs for (period); past perfect for the earlier past action; no present perfect with "yesterday".', 'Fixed patterns: prefer…to, senior to, look forward to + -ing, hardly…when, no sooner…than, it is high time + past.', 'Articles by sound: a university, an hour; it\'s vs its.'] },
  { id: 'e-completion', name: 'Sentence Completion', book: 'SAT-style sentence completion', gens: [completion], weight: 8,
    notes: ['Find the clue words: although/despite/rather than (contrast), because/so (cause), and/also (continuation).', 'Predict your own word before looking at the options.', 'For two blanks, solve the easier blank first and eliminate.'] },
  { id: 'e-reading', name: 'Reading Comprehension', book: 'Short academic passages', gens: [], weight: 8,
    notes: ['Read the questions first, then the passage with a purpose.', 'Main-idea answers cover the WHOLE passage, not one detail.', 'Inference answers must be supported by the text — avoid extreme words (always, never, completely).', 'For word-in-context, substitute each option back into the sentence.'] },
];
