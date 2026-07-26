"use strict";

// Version 4 English worksheet data. This file extends the existing application
// without replacing the established math and rewriting worksheet code.

const finalizedMakeAdjectiveQuestions = {
  basic: [
    { ja: "その知らせは私をうれしくしました。", answer: "The news made me happy.", words: ["happy", "the news", "me", "made"] },
    { ja: "その話は彼女を悲しくしました。", answer: "The story made her sad.", words: ["her", "sad", "the story", "made"] },
    { ja: "彼の言葉は私を怒らせました。", answer: "His words made me angry.", words: ["angry", "his words", "made", "me"] },
    { ja: "この音楽は私を穏やかな気持ちにします。", answer: "This music makes me calm.", words: ["calm", "makes", "this music", "me"] },
    { ja: "その火で部屋は暖かくなりました。", answer: "The fire made the room warm.", words: ["warm", "the room", "made", "the fire"] },
    { ja: "その風で私の手は冷たくなりました。", answer: "The wind made my hands cold.", words: ["cold", "my hands", "made", "the wind"] },
    { ja: "そのおもしろい話は母をうれしい気持ちにしました。", answer: "The funny story made my mother glad.", words: ["my mother", "the funny story", "glad", "made"] },
    { ja: "その大きな窓は部屋を明るくしています。", answer: "The large window makes the room bright.", words: ["bright", "the large window", "makes", "the room"] },
    { ja: "黒い雲で空は暗くなりました。", answer: "The black clouds made the sky dark.", words: ["the sky", "dark", "the black clouds", "made"] },
    { ja: "その先生は授業をおもしろくしました。", answer: "The teacher made the lesson interesting.", words: ["interesting", "the lesson", "made", "the teacher"] },
    { ja: "その地図のおかげで、私たちの旅行はより楽になりました。", answer: "The map made our trip easier.", words: ["our trip", "easier", "the map", "made"] },
    { ja: "明るい照明のおかげで、その通りはより安全になりました。", answer: "The bright lights made the street safer.", words: ["safer", "the street", "the bright lights", "made"] }
  ],
  standard: [
    { ja: "その結果は彼を自信に満ちた気持ちにしました。", answer: "The result made him confident.", words: ["confident", "the result", "him", "made"] },
    { ja: "その突然の知らせは、若い選手たちを不安にしました。", answer: "The sudden news made the young players anxious.", words: ["anxious", "sudden", "the", "young", "news", "players", "made", "the"] },
    { ja: "彼女の説明はその問題を明確にしました。", answer: "Her explanation made the problem clear.", words: ["her explanation", "the problem", "clear", "made"] },
    { ja: "その長い待ち時間は乗客たちをいら立たせました。", answer: "The long wait made the passengers impatient.", words: ["passengers", "long", "impatient", "the", "wait", "made", "the"] },
    { ja: "新しい制度によって、その手続きはより簡単になりました。", answer: "The new system made the process simpler.", words: ["the process", "the new system", "simpler", "made"] },
    { ja: "彼の失礼な態度は、新しい生徒たちを不快な気持ちにしました。", answer: "His rude attitude made the new students uncomfortable.", words: ["students", "rude", "uncomfortable", "his", "the", "attitude", "new", "made"] },
    { ja: "その励ましのメッセージによって、私は前向きな気持ちになりました。", answer: "The encouraging message made me optimistic.", words: ["optimistic", "the encouraging message", "me", "made"] },
    { ja: "彼女の両親は、その大成功を誇りに思いました。", answer: "The great success made her parents proud.", words: ["success", "proud", "her", "great", "parents", "the", "made"] },
    { ja: "その新しい情報は、状況をさらに複雑にしました。", answer: "The new information made the situation more complicated.", words: ["the situation", "the new information", "more complicated", "made"] },
    { ja: "彼の親切な言葉で、その少女は希望に満ちた気持ちになりました。", answer: "His kind words made the girl hopeful.", words: ["hopeful", "girl", "kind", "his", "the", "words", "made"] },
    { ja: "大雨によって、その道路は危険な状態になりました。", answer: "The heavy rain made the road dangerous.", words: ["the heavy rain", "dangerous", "the road", "made"] },
    { ja: "この貴重な経験は、彼をより慎重にしました。", answer: "This valuable experience made him more careful.", words: ["careful", "experience", "him", "valuable", "this", "more", "made"] }
  ],
  advanced: [
    { ja: "その経験によって、彼女はより自立しました。", answer: "The experience made her more independent.", words: ["independent", "experience", "her", "more", "the", "made"] },
    { ja: "その突然の変化は多くの住民を不安にしました。", answer: "The sudden change made many residents anxious.", words: ["anxious", "change", "many", "residents", "sudden", "the", "made"] },
    { ja: "その詳しい説明は複雑な仕組みを明確にしました。", answer: "The detailed explanation made the complex system clear.", words: ["clear", "complex", "detailed", "explanation", "made", "system", "the", "the"] },
    { ja: "その失敗によって、彼は自分の弱点を自覚しました。", answer: "The failure made him aware of his weaknesses.", words: ["aware", "failure", "him", "his", "made", "of", "the", "weaknesses"] },
    { ja: "新しい技術によって、この作業工程はより効率的になりました。", answer: "The new technology made this process more efficient.", words: ["efficient", "made", "more", "new", "process", "technology", "the", "this"] },
    { ja: "その深刻な問題によって、地域の人々はより慎重になりました。", answer: "The serious problem made the local people more cautious.", words: ["cautious", "local", "made", "more", "people", "problem", "serious", "the", "the"] },
    { ja: "先生の励ましによって、彼女は自分の能力に自信を持つようになりました。", answer: "The teacher’s encouragement made her confident in her abilities.", words: ["abilities", "confident", "encouragement", "her", "her", "in", "made", "teacher’s", "the"] },
    { ja: "その予想外の結果は、研究者たちの好奇心をさらに強くしました。", answer: "The unexpected result made the researchers even more curious.", words: ["curious", "even", "made", "more", "researchers", "result", "the", "the", "unexpected"] },
    { ja: "詳しい調査によって、私たちの計画はより現実的になりました。", answer: "Detailed research made our plan more realistic.", words: ["detailed", "made", "more", "our", "plan", "realistic", "research"] },
    { ja: "その新しい証拠によって、彼の説明は以前ほど説得力のあるものではなくなりました。", answer: "The new evidence made his explanation less convincing.", words: ["convincing", "evidence", "explanation", "his", "less", "made", "new", "the"] },
    { ja: "その困難な状況によって、チームは以前より協力的になりました。", answer: "The difficult situation made the team more cooperative.", words: ["cooperative", "difficult", "made", "more", "situation", "team", "the", "the"] },
    { ja: "海外で生活したことで、彼女は異なる文化に対してより寛容になりました。", answer: "Living overseas made her more tolerant of different cultures.", words: ["cultures", "different", "her", "living", "made", "more", "of", "overseas", "tolerant"] }
  ],
  hard: [
    { ja: "その経験によって、彼女は将来についてより楽観的になりました。", answer: "The experience made her more optimistic about the future.", words: ["about", "experience", "future", "her", "made", "more", "optimistic", "the", "the", "remained"], unused: "remained" },
    { ja: "その予期しない発表は、多くの従業員を不安にしました。", answer: "The unexpected announcement made many employees anxious.", words: ["announcement", "anxious", "anxiety", "employees", "many", "made", "the", "unexpected"], unused: "anxiety" },
    { ja: "その追加情報によって、その状況はさらに複雑になりました。", answer: "The additional information made the situation even more complicated.", words: ["additional", "complicated", "even", "information", "made", "more", "situation", "the", "the", "very"], unused: "very" },
    { ja: "その調査結果によって、私たちはその問題の深刻さを認識しました。", answer: "The findings made us aware of the seriousness of the problem.", words: ["aware", "awareness", "findings", "made", "of", "of", "problem", "seriousness", "the", "the", "the", "us"], unused: "awareness" },
    { ja: "新しい方針によって、その制度はより公平になりました。", answer: "The new policy made the system fairer.", words: ["fairer", "fairness", "made", "new", "policy", "system", "the", "the"], unused: "fairness" },
    { ja: "彼の詳しい説明によって、その複雑な議論は理解しやすくなりました。", answer: "His detailed explanation made the complex argument easier to understand.", words: ["argument", "complex", "detailed", "easier", "explanation", "his", "made", "the", "to", "understand", "understanding"], unused: "understanding" },
    { ja: "その失敗によって、彼は自分の判断についてより慎重になりました。", answer: "The failure made him more cautious about his decisions.", words: ["about", "caution", "cautious", "decisions", "failure", "his", "him", "made", "more", "the"], unused: "caution" },
    { ja: "地域社会からの支援によって、その計画はより実現可能になりました。", answer: "The support from the community made the plan more feasible.", words: ["community", "feasible", "from", "made", "more", "plan", "possibility", "support", "the", "the", "the"], unused: "possibility" },
    { ja: "その新しい証拠によって、彼の主張は以前ほど説得力のあるものではなくなりました。", answer: "The new evidence made his argument less convincing.", words: ["argument", "convincing", "evidence", "his", "less", "made", "new", "strength", "the"], unused: "strength" },
    { ja: "彼女の海外での経験によって、彼女は文化の違いに対してより寛容になりました。", answer: "Her overseas experience made her more tolerant of cultural differences.", words: ["cultural", "differences", "experience", "her", "her", "made", "more", "of", "overseas", "tolerance", "tolerant"], unused: "tolerance" },
    { ja: "その予算削減によって、計画の実行はさらに困難になりました。", answer: "The budget reduction made the implementation of the plan even more difficult.", words: ["budget", "difficult", "difficulty", "even", "implementation", "made", "more", "of", "plan", "reduction", "the", "the", "the"], unused: "difficulty" },
    { ja: "その率直な発言によって、議論の目的がより明確になりました。", answer: "The honest comment made the purpose of the discussion clearer.", words: ["clearer", "clarity", "comment", "discussion", "honest", "made", "of", "purpose", "the", "the", "the"], unused: "clarity" }
  ]
};

const makePastParticipleQuestions = {
  basic: [
    { ja: "マイクのおかげで、彼女の声は会場で聞こえました。", answer: "The microphone made her voice heard in the hall.", words: ["her voice", "heard", "in the hall", "made", "the microphone"] },
    { ja: "インターネットによって、そのニュースは世界中に知られるようになりました。", answer: "The Internet made the news known around the world.", words: ["around the world", "known", "made", "the Internet", "the news"] },
    { ja: "その新聞記事によって、真実は多くの人に知られるようになりました。", answer: "The newspaper article made the truth known to many people.", words: ["known", "made", "the newspaper article", "the truth", "to many people"] },
    { ja: "その報告書によって、事実は全員に知られるようになりました。", answer: "The report made the facts known to everyone.", words: ["known", "made", "the facts", "the report", "to everyone"] },
    { ja: "分かりやすい絵のおかげで、その規則は生徒たちにいっそうよく理解されるようになりました。", answer: "The clear picture made the rule better understood by the students.", words: ["better understood", "by the students", "made", "the clear picture", "the rule"] },
    { ja: "簡単な例によって、その考えはよりよく理解されるようになりました。", answer: "The simple example made the idea better understood.", words: ["better understood", "made", "the idea", "the simple example"] },
    { ja: "私は英語で自分の言いたいことを理解してもらいました。", answer: "I made myself understood in English.", words: ["I", "in English", "made", "myself", "understood"] },
    { ja: "私たちは会議で自分たちの言いたいことを理解してもらいました。", answer: "We made ourselves understood at the meeting.", words: ["at the meeting", "made", "ourselves", "understood", "we"] },
    { ja: "彼女は広い部屋で自分の声を聞いてもらいました。", answer: "She made herself heard in the large room.", words: ["heard", "in the large room", "made", "herself", "she"] },
    { ja: "彼は騒がしい部屋で自分の声を聞いてもらいました。", answer: "He made himself heard in the noisy room.", words: ["heard", "himself", "in the noisy room", "made", "he"] },
    { ja: "学校のウェブサイトによって、その行事は多くの生徒に知られるようになりました。", answer: "The school website made the event known to many students.", words: ["known", "made", "the event", "the school website", "to many students"] },
    { ja: "ラジオによって、彼の声は国中で聞かれるようになりました。", answer: "The radio made his voice heard across the country.", words: ["across the country", "heard", "his voice", "made", "the radio"] }
  ],
  standard: [
    { ja: "そのマイクのおかげで、彼女の声は会場全体に届きました。", answer: "The microphone made her voice heard throughout the hall.", words: ["her voice", "throughout the hall", "made", "the microphone", "heard"] },
    { ja: "そのニュース報道によって、その事実は多くの市民に知られるようになりました。", answer: "The news report made the fact known to many citizens.", words: ["citizens", "fact", "known", "made", "many", "news", "report", "the", "the", "to"] },
    { ja: "その詳しい説明のおかげで、参加者全員が計画の目的をよりよく理解できるようになりました。", answer: "The detailed explanation made the purpose of the plan better understood by all the participants.", words: ["the detailed explanation", "better understood", "the purpose of the plan", "by all the participants", "made"] },
    { ja: "インターネットによって、彼の名前は海外でも広く知られるようになりました。", answer: "The Internet made his name widely known abroad.", words: ["abroad", "his", "Internet", "known", "made", "name", "the", "widely"] },
    { ja: "会社のウェブサイトによって、その方針が全従業員に知られるようになりました。", answer: "The company website made the policy known to all the employees.", words: ["the company website", "the policy", "known to all the employees", "made"] },
    { ja: "字幕のおかげで、外国人の観客も映画の物語をよりよく理解できるようになりました。", answer: "The subtitles made the story better understood by foreign audiences.", words: ["audiences", "better", "by", "foreign", "made", "story", "subtitles", "the", "the", "understood"] },
    { ja: "私は短い発表で、自分の言いたいことを理解してもらいました。", answer: "I made myself understood during the short presentation.", words: ["during the short presentation", "understood", "I", "made", "myself"] },
    { ja: "私たちは英語で、自分たちの言いたいことをはっきり理解してもらいました。", answer: "We made ourselves clearly understood in English.", words: ["clearly", "English", "in", "made", "ourselves", "understood", "we"] },
    { ja: "彼女は大勢の聴衆の前で、自分の声を聞き取ってもらいました。", answer: "She made herself heard in front of a large audience.", words: ["in front of a large audience", "herself", "made", "she", "heard"] },
    { ja: "彼は騒がしい会場で、自分の声を全員に聞き取ってもらいました。", answer: "He made himself heard by everyone in the noisy hall.", words: ["everyone", "hall", "heard", "himself", "in", "made", "noisy", "the", "by", "he"] },
    { ja: "その公式発表によって、新しい規則が地域全体に知られるようになりました。", answer: "The official announcement made the new rule known throughout the area.", words: ["the official announcement", "throughout the area", "known", "the new rule", "made"] },
    { ja: "その写真のおかげで、世界中の人々が災害の影響をよりよく理解するようになりました。", answer: "The photograph made the effects of the disaster better understood worldwide.", words: ["better", "disaster", "effects", "made", "of", "photograph", "the", "the", "understood", "worldwide"] }
  ],
  advanced: [
    { ja: "そのオンラインキャンペーンによって、その問題は若者の間で広く知られるようになりました。", answer: "The online campaign made the issue widely known among young people.", words: ["among", "campaign", "issue", "known", "made", "online", "people", "the", "the", "widely", "young"] },
    { ja: "そのドキュメンタリーのおかげで、一般の人々が環境被害をよりよく理解できるようになりました。", answer: "The documentary made the environmental damage better understood by the public.", words: ["better", "by", "damage", "documentary", "environmental", "made", "public", "the", "the", "the", "understood"] },
    { ja: "マイクのおかげで、話し手の声は広い会場全体にはっきりと届きました。", answer: "The microphone made the speaker’s voice clearly heard throughout the large hall.", words: ["clearly", "hall", "heard", "large", "made", "microphone", "speaker’s", "the", "the", "the", "throughout", "voice"] },
    { ja: "その詳しい報告書によって、事故の原因についての理解が深まりました。", answer: "The detailed report made the causes of the accident better understood.", words: ["accident", "better", "causes", "detailed", "made", "of", "report", "the", "the", "the", "understood"] },
    { ja: "そのソーシャルメディアの投稿によって、その行事は地域住民の間で広く知られるようになりました。", answer: "The social media post made the event widely known among local residents.", words: ["among", "event", "known", "local", "made", "media", "post", "residents", "social", "the", "the", "widely"] },
    { ja: "その分かりやすい説明のおかげで、全員がその計画の目的を十分に理解できるようになりました。", answer: "The clear explanation made the purpose of the project fully understood by everyone.", words: ["by", "clear", "everyone", "explanation", "fully", "made", "of", "project", "purpose", "the", "the", "the", "understood"] },
    { ja: "私は語彙が限られていましたが、自分の言いたいことを理解してもらいました。", answer: "I made myself understood despite my limited vocabulary.", words: ["despite", "I", "limited", "made", "myself", "my", "understood", "vocabulary"] },
    { ja: "私たちは白熱した議論の中で、自分たちの意見を聞いてもらいました。", answer: "We made ourselves heard during the heated discussion.", words: ["discussion", "during", "heated", "heard", "made", "ourselves", "the", "we"] },
    { ja: "彼女は簡単な例を使って、自分の言いたいことを理解してもらいました。", answer: "She made herself understood by using simple examples.", words: ["by", "examples", "herself", "made", "she", "simple", "understood", "using"] },
    { ja: "彼は群衆の騒音に負けず、自分の声を聞いてもらいました。", answer: "He made himself heard over the noise of the crowd.", words: ["crowd", "he", "heard", "himself", "made", "noise", "of", "over", "the", "the"] },
    { ja: "その国際会議によって、その問題は専門家の間で広く知られるようになりました。", answer: "The international conference made the problem widely known among experts.", words: ["among", "conference", "experts", "international", "known", "made", "problem", "the", "the", "widely"] },
    { ja: "その衝撃的な映像によって、視聴者は被害者の苦しみをよりよく理解するようになりました。", answer: "The shocking images made the suffering of the victims better understood by viewers.", words: ["better", "by", "images", "made", "of", "shocking", "suffering", "the", "the", "the", "understood", "victims", "viewers"] }
  ],
  hard: [
    { ja: "その大規模な報道によって、危機の規模が広く知られるようになりました。", answer: "The extensive media coverage made the scale of the crisis widely known.", words: ["coverage", "crisis", "extensive", "knowledge", "known", "made", "media", "of", "scale", "the", "the", "the", "widely"], unused: "knowledge" },
    { ja: "その詳細な調査によって、事故の原因に対する一般の人々の理解が深まりました。", answer: "The detailed investigation made the causes of the accident better understood by the public.", words: ["accident", "better", "by", "causes", "detailed", "investigation", "made", "of", "public", "the", "the", "the", "the", "understood", "understanding"], unused: "understanding" },
    { ja: "その高性能な音響設備によって、話し手の声が講堂全体にはっきり届きました。", answer: "The advanced sound system made the speaker’s voice clearly heard throughout the auditorium.", words: ["advanced", "auditorium", "clearly", "heard", "hearing", "made", "sound", "speaker’s", "system", "the", "the", "the", "throughout", "voice"], unused: "hearing" },
    { ja: "その国際的な運動によって、その問題は政策立案者に広く認識されるようになりました。", answer: "The international campaign made the issue widely recognized by policymakers.", words: ["by", "campaign", "international", "issue", "made", "policymakers", "recognition", "recognized", "the", "the", "widely"], unused: "recognition" },
    { ja: "新たに公表された証拠によって、その理論は研究者の間で以前より広く受け入れられるようになりました。", answer: "The newly released evidence made the theory more widely accepted by researchers.", words: ["acceptance", "accepted", "by", "evidence", "made", "more", "newly", "released", "researchers", "the", "the", "theory", "widely"], unused: "acceptance" },
    { ja: "そのドキュメンタリーによって、世界中の視聴者が、避難を余儀なくされた家族の経験をよりよく理解するようになりました。", answer: "The documentary made the experiences of displaced families better understood by viewers worldwide.", words: ["better", "by", "displaced", "documentary", "experiences", "families", "made", "of", "the", "the", "understood", "understanding", "viewers", "worldwide"], unused: "understanding" },
    { ja: "私は専門英語を十分に使いこなせませんでしたが、自分の言いたいことを理解してもらいました。", answer: "I made myself understood despite my limited command of technical English.", words: ["command", "despite", "English", "I", "limited", "made", "my", "myself", "of", "technical", "understood", "understanding"], unused: "understanding" },
    { ja: "私たちは白熱した公開討論の中で、自分たちの意見を聞いてもらいました。", answer: "We made ourselves heard during the heated public debate.", words: ["debate", "during", "heard", "hearing", "heated", "made", "ourselves", "public", "the", "we"], unused: "hearing" },
    { ja: "彼女は言葉を慎重に選ぶことで、自分の意図を明確に理解してもらいました。", answer: "She made herself clearly understood by carefully choosing her words.", words: ["by", "carefully", "choosing", "clearly", "clarity", "her", "herself", "made", "she", "understood", "words"], unused: "clarity" },
    { ja: "彼は機械の絶え間ない騒音に負けず、自分の声を聞いてもらいました。", answer: "He made himself heard over the constant noise of the machinery.", words: ["constant", "he", "heard", "hearing", "himself", "machinery", "made", "noise", "of", "over", "the", "the"], unused: "hearing" },
    { ja: "その公式声明によって、政府の立場が国際社会に知られるようになりました。", answer: "The official statement made the government’s position known to the international community.", words: ["community", "government’s", "international", "knowledge", "known", "made", "official", "position", "statement", "the", "the", "to"], unused: "knowledge" },
    { ja: "それらの写真によって、状況の緊急性が広く認識されるようになりました。", answer: "The photographs made the urgency of the situation widely recognized.", words: ["made", "photographs", "recognition", "recognized", "situation", "the", "the", "the", "urgency", "widely", "of"], unused: "recognition" }
  ]
};

Object.assign(makeAdjectiveQuestions, finalizedMakeAdjectiveQuestions);

worksheetDefinitions["make-adjective-order"].label = "物主構文 make（目的語＋形容詞・整序英作文）";
worksheetDefinitions["make-adjective-order"].title = "物主構文 make＋O＋形容詞　整序英作文";
worksheetDefinitions["make-adjective-order"].difficulties = {
  basic: { label: "基礎", counts: [5, 10, 12], description: "中学修了語彙。語句単位を中心に、make＋O＋形容詞の語順を確認します。" },
  standard: { label: "標準", counts: [5, 10, 12], description: "高校初級語彙。語句単位6問と単語単位6問を混在させます。" },
  advanced: { label: "発展", counts: [5, 10, 12], description: "英検準2級程度。全問を単語単位に分割します。" },
  hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト程度。全問を単語単位にし、不要語を1語加えます。" }
};

worksheetDefinitions["make-past-participle-order"] = {
  label: "物主構文 make（目的語＋過去分詞・整序英作文）",
  title: "物主構文 make＋O＋過去分詞　整序英作文",
  instruction: "日本語に合う英文になるように、（　）内の語句を並べ替えなさい。文頭に来る語も小文字で示しています。難関編には不要語が1語あります。",
  answerNote: "語順は「主語＋make／makes／made＋目的語＋過去分詞」です。目的語と過去分詞には受け身の関係があります。",
  type: "english-order-past",
  difficulties: {
    basic: { label: "基礎", counts: [5, 10, 12], description: "中学修了語彙。物主構文を中心に、make oneself understood／heardも扱います。" },
    standard: { label: "標準", counts: [5, 10, 12], description: "高校初級語彙。語句単位6問と単語単位6問を混在させます。" },
    advanced: { label: "発展", counts: [5, 10, 12], description: "英検準2級程度。全問を単語単位に分割します。" },
    hard: { label: "難関", counts: [5, 10, 12], description: "高校卒業・共通テスト程度。全問を単語単位にし、不要語を1語加えます。" }
  }
};

const adjectiveOption = worksheetTypeSelect.querySelector('option[value="make-adjective-order"]');
if (adjectiveOption) {
  adjectiveOption.textContent = "物主構文 make（目的語＋形容詞）― 整序英作文";
  const pastOption = document.createElement("option");
  pastOption.value = "make-past-participle-order";
  pastOption.textContent = "物主構文 make（目的語＋過去分詞）― 整序英作文";
  adjectiveOption.insertAdjacentElement("afterend", pastOption);
}

const hardOption = document.createElement("option");
hardOption.value = "hard";
hardOption.textContent = "難関";
difficultySelect.appendChild(hardOption);

function syncDifficultyOptions() {
  const definition = worksheetDefinitions[worksheetTypeSelect.value];
  if (!definition) return;
  [...difficultySelect.options].forEach((option) => {
    option.disabled = !Object.hasOwn(definition.difficulties, option.value);
  });
  if (!definition.difficulties[difficultySelect.value]) {
    difficultySelect.value = Object.hasOwn(definition.difficulties, "standard") ? "standard" : Object.keys(definition.difficulties)[0];
  }
}

worksheetTypeSelect.addEventListener("change", syncDifficultyOptions, true);

const originalBuildQuestionPool = buildQuestionPool;
buildQuestionPool = function buildQuestionPoolV4() {
  if (worksheetTypeSelect.value === "make-past-participle-order") {
    return makePastParticipleQuestions[difficultySelect.value];
  }
  return originalBuildQuestionPool();
};

appendEnglishAnswer = function appendEnglishAnswerV4(fragment, question, number, type) {
  const item = document.createElement("div");
  item.className = "english-answer-item";
  const answer = document.createElement("p");
  answer.innerHTML = `<b>${number}. ${question.answer}</b>`;
  const structure = document.createElement("p");
  structure.className = "answer-explanation";
  if (type === "english-rewrite") {
    structure.textContent = `空欄：${question.blanks}`;
  } else if (type === "english-order-past") {
    structure.textContent = `主語＋make／makes／made＋目的語＋過去分詞${question.unused ? `（不要語：${question.unused}）` : ""}`;
  } else {
    structure.textContent = `主語＋make／makes／made＋目的語＋形容詞${question.unused ? `（不要語：${question.unused}）` : ""}`;
  }
  item.append(answer, structure);
  fragment.appendChild(item);
};

syncDifficultyOptions();
updateControls();
