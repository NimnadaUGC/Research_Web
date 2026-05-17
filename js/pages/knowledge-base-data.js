// Generated from Final Research - Proposal QnAs' Document.md.
// Keep this file as the hardcoded Knowledge Base content source for the static page.
export const knowledgeBaseSections = [
  {
    "id": "section-1",
    "number": "1",
    "title": "BUSINESS ANALYSIS FUNDAMENTALS",
    "primary": [
      {
        "id": "q-1-1",
        "number": "1.1",
        "question": "What is a Business Analyst (BA)?",
        "answer": "\"A Business Analyst acts as the bridge between stakeholders and technical teams. Their role is to understand business needs, reduce requirement ambiguity, and transform stakeholder expectations into developer-ready requirements.\"",
        "groups": [
          {
            "id": "q-1-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-1-1-group-1-item-1",
                "question": "What does a BA actually do in SDLC?",
                "answer": "BAs mainly work in:\n\n* Requirements engineering  \n* Stakeholder communication  \n* Requirement validation  \n* Agile coordination\n\nTypical responsibilities:\n\n* Gather requirements  \n* Clarify ambiguities  \n* Create user stories  \n* Define acceptance criteria  \n* Support developer alignment\n\n\"The BA ensures developers clearly understand what should be built before implementation begins.\""
              },
              {
                "id": "q-1-1-group-1-item-2",
                "question": "Why are BAs important in software engineering?",
                "answer": "\"Many software failures happen because teams build the wrong solution, not because developers cannot code.\"\n\nBAs help by:\n\n* Reducing misunderstandings  \n* Aligning business goals  \n* Clarifying requirements  \n* Preventing rework"
              },
              {
                "id": "q-1-1-group-1-item-3",
                "question": "How are BAs different from developers?",
                "answer": "| Developers | Business Analysts |\n| ----- | ----- |\n| Focus on implementation | Focus on requirements |\n| Solve technical problems | Solve business understanding problems |\n| Build systems | Define what systems should do |\n\n\"Developers ensure the system works correctly. BAs ensure the correct system is being built.\""
              },
              {
                "id": "q-1-1-group-1-item-4",
                "question": "Why can't developers gather requirements themselves and continue the project?",
                "answer": "\"They can in smaller projects, but real-world Agile environments involve changing requirements, stakeholder ambiguity, and business constraints.\"\n\nBAs specialize in:\n\n* Stakeholder communication  \n* Requirement clarification  \n* Conflict resolution  \n* Business interpretation\n\nThis helps reduce:\n\n* Miscommunication  \n* Requirement gaps  \n* Sprint rework"
              },
              {
                "id": "q-1-1-group-1-item-5",
                "question": "Is BA mainly documentation work?",
                "answer": "\"No. Documentation is only an output of BA work.\"\n\nThe real role involves:\n\n* Communication  \n* Analysis  \n* Clarification  \n* Validation  \n* Requirement alignment\n\n\"The main goal is reducing misunderstanding before development begins.\""
              }
            ]
          },
          {
            "id": "q-1-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-1-1-group-2-item-1",
                "question": "What is requirements' engineering?",
                "answer": "Requirements Engineering is the process of:\n\n* Gathering requirements  \n* Analyzing requirements  \n* Validating requirements  \n* Managing requirement changes\n\nGoal:\n\n\"Ensure the correct software solution is built with clear and testable requirements.\""
              },
              {
                "id": "q-1-1-group-2-item-2",
                "question": "What are user stories and acceptance criteria?",
                "answer": "### User Stories\n\nDescribe features from the user's perspective.\n\nFormat:\n\n\"As a user, I want [feature], so that [business value].\"\n\n### Acceptance Criteria\n\nDefine:\n\n* Completion conditions  \n* Expected behavior  \n* Validation rules\n\nPurpose:\n\n* Reduce ambiguity  \n* Improve testing  \n* Improve implementation clarity"
              },
              {
                "id": "q-1-1-group-2-item-3",
                "question": "How do BAs work in Agile environments?",
                "answer": "In Agile, BAs:\n\n* Refine user stories  \n* Clarify sprint requirements  \n* Support backlog refinement  \n* Handle changing requirements  \n* Maintain stakeholder alignment\n\n\"The BA continuously supports iterative requirement evolution during sprint cycles.\""
              },
              {
                "id": "q-1-1-group-2-item-4",
                "question": "What kinds of communication and project-related problems do BAs solve?",
                "answer": "BAs help solve:\n\n* Requirement ambiguity  \n* Stakeholder misunderstandings  \n* Conflicting expectations  \n* Incomplete requirements  \n* Developer-business communication gaps\n\nThis improves:\n\n* Team alignment  \n* Requirement clarity  \n* Delivery consistency"
              },
              {
                "id": "q-1-1-group-2-item-5",
                "question": "How do BAs reduce project failure risk?",
                "answer": "\"Requirement mistakes become expensive when discovered late in development.\"\n\nBAs reduce risk by:\n\n* Identifying ambiguities early  \n* Validating business expectations  \n* Clarifying workflows  \n* Improving requirement completeness\n\nThis helps reduce:\n\n* Rework  \n* Sprint delays  \n* Incorrect implementations"
              },
              {
                "id": "q-1-1-group-2-item-6",
                "question": "How important is a BA's role to SMEs?",
                "answer": "In SMEs:\n\n* Teams are smaller  \n* Budgets are tighter  \n* Requirement mistakes are more costly\n\nBAs help SMEs by:\n\n* Reducing rework  \n* Improving communication efficiency  \n* Supporting Agile coordination  \n* Maintaining project alignment\n\n\"Strong requirement management is especially important in resource-constrained SME environments.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-2",
    "number": "2",
    "title": "REQUIREMENTS ENGINEERING PROBLEM SPACE",
    "primary": [
      {
        "id": "q-2-1",
        "number": "2.1",
        "question": "Why is requirements engineering difficult?",
        "answer": "\"Requirements engineering is difficult because stakeholder needs are often incomplete, ambiguous, changing, and interpreted differently by technical and business teams.\"\n\nMain challenges include:\n\n* Ambiguous communication  \n* Changing requirements  \n* Hidden business rules  \n* Conflicting stakeholder expectations  \n* Lack of technical clarity\n\n\"Even small misunderstandings at the requirement stage can propagate throughout the entire SDLC.\"",
        "groups": [
          {
            "id": "q-2-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-2-1-group-1-item-1",
                "question": "What causes requirement ambiguity?",
                "answer": "Requirement ambiguity usually happens because:\n\n* Stakeholders describe needs informally  \n* Business terms are interpreted differently  \n* Important constraints are missing  \n* Assumptions are unstated\n\nExamples:\n\n* \"Fast system\"  \n* \"User-friendly interface\"  \n* \"Secure payment flow\"\n\n\"These statements sound clear to stakeholders but are technically incomplete for implementation.\""
              },
              {
                "id": "q-2-1-group-1-item-2",
                "question": "Why do software projects fail due to requirements?",
                "answer": "\"Many projects fail because teams build features that do not fully match stakeholder expectations.\"\n\nCommon requirement-related failures:\n\n* Misunderstood business goals  \n* Incomplete requirements  \n* Weak stakeholder communication  \n* Poor change management  \n* Missing acceptance criteria\n\nThis often leads to:\n\n* Rework  \n* Delays  \n* Budget overruns  \n* Stakeholder dissatisfaction"
              },
              {
                "id": "q-2-1-group-1-item-3",
                "question": "How do unclear requirements affect developers?",
                "answer": "Unclear requirements force developers to:\n\n* Make assumptions  \n* Interpret missing details  \n* Repeatedly seek clarification  \n* Rework implemented features\n\nThis creates:\n\n* Development delays  \n* Inconsistent implementations  \n* Increased bugs  \n* Sprint inefficiencies\n\n\"Even strong developers struggle when requirements lack clarity.\""
              },
              {
                "id": "q-2-1-group-1-item-4",
                "question": "What happens when acceptance criteria are weak?",
                "answer": "Weak acceptance criteria create:\n\n* Unclear completion conditions  \n* Testing confusion  \n* QA inconsistencies  \n* Developer misunderstandings\n\nAs a result:\n\n* Features may technically work  \n* But still fail stakeholder expectations\n\n\"Acceptance criteria define what 'done' actually means.\""
              },
              {
                "id": "q-2-1-group-1-item-5",
                "question": "How expensive are requirement mistakes?",
                "answer": "\"Requirement mistakes become significantly more expensive when discovered later in development.\"\n\nEarly-stage requirement errors can propagate into:\n\n* Development  \n* Testing  \n* Deployment  \n* Maintenance\n\nThis increases:\n\n* Rework cost  \n* Time loss  \n* Operational risk\n\n\"Fixing a requirement issue before development is far cheaper than fixing it after implementation.\""
              }
            ]
          },
          {
            "id": "q-2-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-2-1-group-2-item-1",
                "question": "How do Agile requirement changes create complexity?",
                "answer": "In Agile:\n\n* Requirements evolve continuously  \n* Stakeholder priorities change frequently  \n* Sprint goals may shift rapidly\n\nThis creates complexity in:\n\n* Requirement tracking  \n* Artifact consistency  \n* Sprint alignment  \n* Developer communication\n\n\"Agile improves flexibility, but it also increases the need for continuous requirement refinement.\""
              },
              {
                "id": "q-2-1-group-2-item-2",
                "question": "How do communication gaps occur between stakeholders and developers?",
                "answer": "Stakeholders usually communicate in:\n\n* Business language  \n* Operational goals  \n* User expectations\n\nDevelopers think in:\n\n* Technical logic  \n* System behavior  \n* Implementation constraints\n\nThis creates interpretation gaps.\n\nBAs help bridge this gap by:\n\n* Clarifying intent  \n* Structuring requirements  \n* Translating business needs into technical artifacts"
              },
              {
                "id": "q-2-1-group-2-item-3",
                "question": "Why is traceability important?",
                "answer": "Traceability helps track:\n\n* Where requirements originated  \n* How they changed  \n* Which features they affect  \n* How implementation aligns with stakeholder needs\n\nThis improves:\n\n* Change management  \n* Impact analysis  \n* Validation  \n* Accountability\n\n\"Traceability helps maintain consistency across evolving Agile workflows.\""
              },
              {
                "id": "q-2-1-group-2-item-4",
                "question": "What is requirement refinement?",
                "answer": "Requirement refinement is the process of:\n\n* Improving requirement clarity  \n* Adding missing details  \n* Resolving ambiguities  \n* Updating requirements iteratively\n\nThis includes:\n\n* Refining user stories  \n* Updating acceptance criteria  \n* Clarifying business rules\n\n\"Requirement refinement helps transform raw stakeholder ideas into developer-ready artifacts.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-3",
    "number": "3",
    "title": "AI IN SOFTWARE ENGINEERING",
    "primary": [
      {
        "id": "q-3-1",
        "number": "3.1",
        "question": "Why use AI in Business Analysis?",
        "answer": "\"AI can help BAs reduce repetitive operational workload, improve requirement refinement, and support faster requirement analysis in Agile environments.\"\n\nAI is useful for:\n\n* Requirement summarization  \n* User story generation  \n* Acceptance criteria drafting  \n* Ambiguity identification  \n* Traceability assistance  \n* Documentation refinement\n\n\"The goal is not replacing BAs, but augmenting BA workflows through structured AI assistance.\"",
        "groups": [
          {
            "id": "q-3-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-3-1-group-1-item-1",
                "question": "Why not just use ChatGPT/Gemini etc. directly?",
                "answer": "\"Raw LLMs provide general intelligence, but they are not specialized for structured BA workflows.\"\n\nProblems with direct usage:\n\n* Inconsistent outputs  \n* No workflow governance  \n* No traceability  \n* No validation process  \n* No BA-specific orchestration\n\n\"My research focuses on building a middleware orchestration framework that guides AI systematically for requirements engineering.\""
              },
              {
                "id": "q-3-1-group-1-item-2",
                "question": "Why does a BA need AI assistance?",
                "answer": "BAs handle:\n\n* Repetitive refinement  \n* Requirement updates  \n* Sprint documentation  \n* Traceability maintenance  \n* Agile coordination\n\nAI helps reduce:\n\n* Manual overhead  \n* Repeated drafting work  \n* Operational inefficiencies\n\n\"The framework supports BAs operationally while preserving human decision-making.\""
              },
              {
                "id": "q-3-1-group-1-item-3",
                "question": "Are current AI tools insufficient?",
                "answer": "\"Current AI tools are powerful, but they are mostly general-purpose systems.\"\n\nMost tools:\n\n* Focus on coding assistance  \n* Lack BA-oriented workflows  \n* Do not enforce governance  \n* Do not support structured requirement refinement\n\n\"The problem is not AI capability, but operationalizing AI reliably for BA workflows.\""
              },
              {
                "id": "q-3-1-group-1-item-4",
                "question": "Isn't ChatGPT/Gemini etc. already powerful enough?",
                "answer": "\"Yes, modern LLMs are powerful in language understanding, but raw intelligence alone does not guarantee workflow consistency, governance, or requirement quality.\"\n\nSimilar example:\n\n* Cursor  \n* Copilot  \n* Codex\n\nThese systems succeed because they:\n\n* Orchestrate workflows  \n* Manage context  \n* Guide AI behavior\n\n\"My research applies a similar orchestration concept to Business Analysis workflows.\""
              },
              {
                "id": "q-3-1-group-1-item-5",
                "question": "Are you trying to replace BAs?",
                "answer": "\"No. The framework is designed to augment BAs, not replace them.\"\n\nThe BA still handles:\n\n* Validation  \n* Decision-making  \n* Stakeholder communication  \n* Requirement approval  \n* Business interpretation\n\n\"The AI assists operational tasks, while humans maintain governance and control.\""
              },
              {
                "id": "q-3-1-group-1-item-6",
                "question": "Can't experienced BAs perform requirement engineering well?",
                "answer": "\"Experienced BAs already perform requirement engineering effectively. The framework is intended to improve operational consistency, reduce repetitive workload, and support scalable Agile coordination.\"\n\nEven experienced BAs still handle:\n\n* Continuous refinement  \n* Documentation overhead  \n* Traceability updates  \n* Sprint-level changes\n\n\"The framework augments expertise rather than replacing it.\""
              }
            ]
          },
          {
            "id": "q-3-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-3-1-group-2-item-1",
                "question": "What limitations exist in raw LLM usage?",
                "answer": "Raw LLM usage often lacks:\n\n* Workflow structure  \n* Context persistence  \n* Validation mechanisms  \n* Requirement governance  \n* Traceability support\n\nThis can lead to:\n\n* Inconsistent outputs  \n* Missing constraints  \n* Weak refinement  \n* Hallucinated assumptions\n\n\"Raw AI intelligence alone is not enough for operational SDLC workflows.\""
              },
              {
                "id": "q-3-1-group-2-item-2",
                "question": "Why are generic prompts unreliable?",
                "answer": "Generic prompts depend heavily on:\n\n* User prompting skill  \n* Prompt wording  \n* Context quality  \n* Missing stakeholder information\n\nSmall prompt differences can produce:\n\n* Different outputs  \n* Inconsistent requirements  \n* Missing details\n\n\"The framework standardizes and structures the prompting workflow.\""
              },
              {
                "id": "q-3-1-group-2-item-3",
                "question": "Why do outputs become inconsistent?",
                "answer": "Outputs become inconsistent because:\n\n* Stakeholder input varies  \n* Prompt quality varies  \n* Context may be incomplete  \n* AI interprets ambiguity differently\n\nWithout orchestration:\n\n* Requirement quality fluctuates  \n* Artifact consistency decreases\n\n\"The framework improves consistency through structured refinement and validation workflows.\""
              },
              {
                "id": "q-3-1-group-2-item-4",
                "question": "How does the experience level of BAs affect the output?",
                "answer": "Experienced BAs:\n\n* Ask better clarification questions  \n* Detect ambiguities faster  \n* Structure requirements more effectively\n\nJunior BAs may struggle with:\n\n* Requirement completeness  \n* Traceability  \n* Refinement consistency\n\n\"The framework helps standardize workflow quality regardless of experience level.\""
              },
              {
                "id": "q-3-1-group-2-item-5",
                "question": "What are hallucination risks in requirements engineering?",
                "answer": "Hallucinations can cause AI to:\n\n* Invent business rules  \n* Assume missing requirements  \n* Generate incorrect workflows  \n* Misinterpret stakeholder intent\n\nIn requirements engineering, this is dangerous because:\n\n\"Incorrect requirements can misdirect the entire project.\"\n\nThat is why:\n\n* Validation  \n* Traceability  \n* Human review  \n  are critical."
              },
              {
                "id": "q-3-1-group-2-item-6",
                "question": "Why is governance needed?",
                "answer": "Governance is needed because AI-generated artifacts affect:\n\n* Development decisions  \n* Sprint planning  \n* Business expectations  \n* System behavior\n\nWithout governance:\n\n* Outputs may become inconsistent  \n* Assumptions may go unchecked  \n* Requirement quality may degrade\n\n\"The framework introduces structured orchestration, validation, and human oversight to make AI usage operationally reliable.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-4",
    "number": "4",
    "title": "YOUR CORE RESEARCH IDEA",
    "primary": [
      {
        "id": "q-4-1",
        "number": "4.1",
        "question": "What exactly is your research contribution?",
        "answer": "\"The core contribution of this research is a human-governed middleware orchestration framework that operationalizes generative AI for Business Analysis workflows.\"\n\nThe framework combines:\n\n* Adaptive prompting  \n* Requirement refinement workflows  \n* Ethical validation  \n* Traceability support  \n* Human-in-the-loop governance\n\n\"The contribution is not creating another AI model, but designing a structured methodology for reliable AI-assisted requirements engineering.\"",
        "groups": [
          {
            "id": "q-4-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-4-1-group-1-item-1",
                "question": "Are you creating a new AI model?",
                "answer": "\"No. I am not training a new foundational AI model.\"\n\nThe research uses existing LLMs such as:\n\n* ChatGPT  \n* Gemini  \n* Claude\n\nThe contribution is:\n\n* Workflow orchestration  \n* Structured BA guidance  \n* Governance mechanisms  \n* Adaptive requirement workflows"
              },
              {
                "id": "q-4-1-group-1-item-2",
                "question": "Is this just another chatbot/AI wrapper?",
                "answer": "\"No. A simple wrapper only forwards prompts to an AI model.\"\n\nThis framework additionally provides:\n\n* Workflow orchestration  \n* Requirement refinement  \n* Ethical checks  \n* Traceability handling  \n* Human validation layers\n\n\"The focus is operational governance, not simple AI access.\""
              },
              {
                "id": "q-4-1-group-1-item-3",
                "question": "Is this simply prompt engineering?",
                "answer": "\"Prompt engineering is only one component of the framework.\"\n\nThe actual contribution includes:\n\n* Adaptive orchestration  \n* Workflow structuring  \n* Validation pipelines  \n* Human-in-the-loop governance  \n* Agile requirement alignment\n\n\"The novelty lies in how AI is operationalized systematically for BA workflows.\""
              },
              {
                "id": "q-4-1-group-1-item-4",
                "question": "What gap/problem are you solving?",
                "answer": "Current AI usage in BA workflows is often:\n\n* Informal  \n* Inconsistent  \n* Ungoverned  \n* Highly dependent on individual prompting skill\n\nThis creates problems in:\n\n* Requirement consistency  \n* Traceability  \n* Agile coordination  \n* Output reliability\n\n\"The research addresses the lack of structured AI orchestration specifically for Business Analysis workflows.\""
              },
              {
                "id": "q-4-1-group-1-item-5",
                "question": "What makes your framework novel?",
                "answer": "The novelty comes from combining:\n\n* Adaptive elicitation workflows  \n* Ethical validation  \n* Human-in-the-loop governance  \n* Agile-oriented orchestration  \n* BA-specific requirement refinement\n\n\"Existing AI systems are mostly general-purpose or developer-focused, while this framework specifically operationalizes AI for requirements engineering.\""
              },
              {
                "id": "q-4-1-group-1-item-6",
                "question": "What makes your research important?",
                "answer": "\"Requirements engineering problems affect the entire SDLC.\"\n\nThis research is important because it aims to:\n\n* Reduce requirement ambiguity  \n* Improve workflow consistency  \n* Support Agile coordination  \n* Reduce operational overhead  \n* Help SMEs adopt AI responsibly\n\n\"The research focuses on improving how AI is used operationally in software engineering environments.\""
              }
            ]
          },
          {
            "id": "q-4-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-4-1-group-2-item-1",
                "question": "What is a middleware orchestration framework?",
                "answer": "\"A middleware orchestration framework acts as a structured layer between users and raw AI models.\"\n\nInstead of directly prompting the AI:\n\n* The framework manages workflows  \n* Structures interactions  \n* Maintains context  \n* Applies validation rules  \n* Guides output refinement\n\n\"It operationalizes AI behavior for a specific domain.\""
              },
              {
                "id": "q-4-1-group-2-item-2",
                "question": "How does the framework guide LLMs?",
                "answer": "The framework guides LLMs through:\n\n* Structured prompting  \n* Context-aware refinement  \n* Workflow sequencing  \n* Validation checkpoints  \n* Artifact-aware generation\n\nExample:\n\n* Detect ambiguity  \n* Generate clarification prompts  \n* Refine requirements iteratively  \n* Validate outputs before finalization\n\n\"The framework controls how AI participates in the workflow.\""
              },
              {
                "id": "q-4-1-group-2-item-3",
                "question": "What does \"workflow orchestration\" mean?",
                "answer": "Workflow orchestration means:\n\n\"Managing how multiple workflow steps interact systematically.\"\n\nIn this research, orchestration includes:\n\n* Requirement elicitation  \n* Ambiguity refinement  \n* Ethical validation  \n* Documentation generation  \n* Human approval\n\nInstead of isolated prompting:\n\n* the framework coordinates the entire workflow process."
              },
              {
                "id": "q-4-1-group-2-item-4",
                "question": "How is this similar to Cursor/Codex/Copilot-like technologies?",
                "answer": "\"Cursor, Copilot, and Codex are not just raw AI models — they are orchestration systems built around LLMs.\"\n\nThey:\n\n* Manage context  \n* Guide AI behavior  \n* Structure workflows  \n* Improve operational usability\n\nSimilarly:\n\n\"My research applies this orchestration concept to Business Analysis and requirements engineering workflows.\""
              },
              {
                "id": "q-4-1-group-2-item-5",
                "question": "Why are specialized frameworks needed around LLMs?",
                "answer": "Raw LLMs are:\n\n* General-purpose  \n* Context-sensitive  \n* Non-deterministic\n\nReal-world workflows require:\n\n* Consistency  \n* Governance  \n* Validation  \n* Domain specialization  \n* Workflow control\n\nThat is why systems like:\n\n* Copilot  \n* Cursor  \n* Claude Code  \n  exist.\n\n\"Specialized orchestration frameworks make raw AI operationally usable for domain-specific workflows.\""
              },
              {
                "id": "q-4-1-group-2-item-6",
                "question": "How does this middle framework actually help BAs?",
                "answer": "The framework helps BAs by:\n\n* Reducing repetitive documentation work  \n* Supporting requirement refinement  \n* Identifying ambiguities  \n* Maintaining traceability  \n* Improving workflow consistency  \n* Supporting Agile coordination\n\nIt also helps standardize:\n\n* Requirement quality  \n* Refinement workflows  \n* Artifact generation\n\n\"The framework augments BA workflows while preserving human governance and decision-making.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-5",
    "number": "5",
    "title": "FRAMEWORK ARCHITECTURE",
    "primary": [
      {
        "id": "q-5-1",
        "number": "5.1",
        "question": "How does your framework work?",
        "answer": "\"The framework acts as a middleware orchestration layer between the BA and the LLM.\"\n\nWorkflow:\n\n1. Stakeholder input is captured  \n2. Ambiguities are identified  \n3. Clarification prompts are generated  \n4. Requirements are refined iteratively  \n5. Ethical and traceability checks are applied  \n6. BA validates outputs before finalization\n\n\"The framework operationalizes AI systematically for Business Analysis workflows instead of relying on raw prompting.\"",
        "groups": [
          {
            "id": "q-5-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-5-1-group-1-item-1",
                "question": "What are the framework components?",
                "answer": "Main components include:\n\n* Stakeholder Input Layer  \n* Adaptive Prompt Engine  \n* Ambiguity Detection Layer  \n* Ethical Validation Layer  \n* Documentation Generator  \n* Traceability Manager  \n* Human-in-the-loop Review Layer\n\n\"Each component supports a specific stage of the requirements engineering workflow.\""
              },
              {
                "id": "q-5-1-group-1-item-2",
                "question": "What happens after stakeholder input?",
                "answer": "After stakeholder input:\n\n1. The framework analyzes the requirement context  \n2. Detects ambiguities or missing information  \n3. Generates clarification questions  \n4. Refines outputs iteratively  \n5. Produces developer-ready artifacts\n\n\"The system transforms raw stakeholder communication into structured requirement artifacts.\""
              },
              {
                "id": "q-5-1-group-1-item-3",
                "question": "How does ambiguity detection work?",
                "answer": "The framework identifies:\n\n* Vague wording  \n* Missing constraints  \n* Incomplete business logic  \n* Unclear stakeholder intent\n\nExamples:\n\n* \"Fast system\"  \n* \"User-friendly\"  \n* \"Secure platform\"\n\nThe framework then:\n\n* Generates clarification prompts  \n* Requests missing details  \n* Refines requirements iteratively\n\n\"The goal is reducing interpretation uncertainty before development.\""
              },
              {
                "id": "q-5-1-group-1-item-4",
                "question": "How are prompts generated dynamically?",
                "answer": "Prompts are generated based on:\n\n* Requirement context  \n* Artifact type  \n* Missing information  \n* Ambiguity level  \n* Workflow stage\n\nDifferent situations trigger different prompts:\n\n* Clarification prompts  \n* Refinement prompts  \n* Validation prompts  \n* Ethical review prompts\n\n\"The framework adapts prompting behavior according to workflow needs.\""
              },
              {
                "id": "q-5-1-group-1-item-5",
                "question": "How does refinement occur?",
                "answer": "Refinement happens iteratively through:\n\n* Clarification cycles  \n* Context-aware prompting  \n* BA feedback  \n* Validation checks\n\nOutputs gradually evolve from:\n\n* Raw stakeholder statements  \n  to:  \n* Structured developer-ready requirements\n\n\"The framework supports continuous requirement improvement rather than one-time generation.\""
              },
              {
                "id": "q-5-1-group-1-item-6",
                "question": "How does this AI-enhanced methodology and agents align in the middle framework?",
                "answer": "The framework coordinates:\n\n* AI assistance  \n* Workflow logic  \n* Human governance  \n* Validation mechanisms\n\nAI agents support:\n\n* Requirement analysis  \n* Refinement  \n* Documentation generation  \n* Ethical checking\n\nThe orchestration layer ensures:\n\n* Structured interaction  \n* Workflow consistency  \n* Controlled AI participation\n\n\"The framework aligns AI capabilities with operational BA processes.\""
              }
            ]
          },
          {
            "id": "q-5-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-5-1-group-2-item-1",
                "question": "What is adaptive prompting?",
                "answer": "Adaptive prompting means:\n\n\"The framework changes prompting behavior dynamically based on workflow context.\"\n\nThe prompts adapt according to:\n\n* Requirement ambiguity  \n* Artifact type  \n* Missing details  \n* Stakeholder context  \n* Refinement stage\n\n\"Instead of static prompting, the framework continuously adjusts AI interaction during the workflow.\""
              },
              {
                "id": "q-5-1-group-2-item-2",
                "question": "How does the ethics layer function in general and specific SME contexts?",
                "answer": "The ethics layer checks for:\n\n* Biased wording  \n* Unsafe assumptions  \n* Missing stakeholder coverage  \n* Lack of transparency  \n* Incomplete rationale\n\nIn SME contexts, it also helps:\n\n* Maintain lightweight governance  \n* Improve requirement transparency  \n* Reduce operational misunderstandings\n\n\"The ethics layer introduces responsible AI usage within practical Agile workflows.\""
              },
              {
                "id": "q-5-1-group-2-item-3",
                "question": "How is traceability maintained?",
                "answer": "The framework maintains links between:\n\n* Stakeholder input  \n* Refined requirements  \n* User stories  \n* Acceptance criteria  \n* Generated artifacts\n\nThis supports:\n\n* Change tracking  \n* Impact analysis  \n* Requirement validation  \n* Agile consistency\n\n\"Traceability helps maintain alignment across evolving project requirements.\""
              },
              {
                "id": "q-5-1-group-2-item-4",
                "question": "How does the documentation generator work?",
                "answer": "The documentation generator transforms:\n\n* Refined requirement data  \n  into:  \n* User stories  \n* Acceptance criteria  \n* Requirement summaries  \n* Developer handover artifacts\n\nGeneration is guided through:\n\n* Structured templates  \n* Workflow context  \n* Validation rules\n\n\"The system produces developer-oriented artifacts from refined stakeholder requirements.\""
              },
              {
                "id": "q-5-1-group-2-item-5",
                "question": "How do those generations align with different SMEs with different practices and templates?",
                "answer": "The framework is designed to be:\n\n* Template-aware  \n* Context-adaptive  \n* Workflow-configurable\n\nDifferent SMEs may use:\n\n* Different Agile styles  \n* Different documentation formats  \n* Different refinement practices\n\nThe orchestration layer adapts generation behavior according to:\n\n* Organizational workflows  \n* Artifact structures  \n* SME-specific practices\n\n\"The framework supports flexibility while maintaining workflow consistency.\""
              },
              {
                "id": "q-5-1-group-2-item-6",
                "question": "How are artifacts validated?",
                "answer": "Artifacts are validated through:\n\n* Ambiguity checks  \n* Traceability verification  \n* Ethical review  \n* BA approval  \n* Iterative refinement\n\nValidation focuses on:\n\n* Clarity  \n* Completeness  \n* Consistency  \n* Testability\n\n\"Human validation remains a critical governance mechanism within the framework.\""
              },
              {
                "id": "q-5-1-group-2-item-7",
                "question": "How does this framework actually affect BA's workflow?",
                "answer": "The framework helps BAs by:\n\n* Reducing repetitive documentation work  \n* Supporting faster refinement  \n* Improving consistency  \n* Maintaining traceability  \n* Assisting Agile coordination\n\nIt does not replace BA decision-making.\n\n\"The framework augments operational workflow efficiency while preserving human governance and expertise.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-6",
    "number": "6",
    "title": "HUMAN-IN-THE-LOOP",
    "primary": [
      {
        "id": "q-6-1",
        "number": "6.1",
        "question": "Why keep humans in the loop?",
        "answer": "\"Requirements engineering involves business judgment, stakeholder interpretation, and contextual decision-making that AI cannot fully validate independently.\"\n\nThe human-in-the-loop mechanism ensures:\n\n* Governance  \n* Validation  \n* Accountability  \n* Requirement accuracy\n\n\"The framework augments BA workflows while keeping humans responsible for final decisions.\"",
        "groups": [
          {
            "id": "q-6-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-6-1-group-1-item-1",
                "question": "Why not fully automate the process?",
                "answer": "\"Fully automating requirements engineering is risky because stakeholder needs are often ambiguous, contextual, and business-sensitive.\"\n\nAI may:\n\n* Misinterpret intent  \n* Assume missing details  \n* Generate incorrect business logic\n\nThat is why:\n\n* Human validation  \n* Stakeholder understanding  \n* Business judgment  \n  remain essential."
              },
              {
                "id": "q-6-1-group-1-item-2",
                "question": "Doesn't human review reduce efficiency?",
                "answer": "\"The framework reduces repetitive operational workload, not human governance.\"\n\nAI handles:\n\n* Draft generation  \n* Requirement refinement  \n* Documentation assistance  \n* Traceability support\n\nHumans still handle:\n\n* Validation  \n* Approval  \n* Business decisions\n\n\"The goal is balanced augmentation, not uncontrolled automation.\""
              },
              {
                "id": "q-6-1-group-1-item-3",
                "question": "Why can't AI finalize requirements?",
                "answer": "AI lacks:\n\n* Organizational context  \n* Business judgment  \n* Stakeholder awareness  \n* Accountability\n\nRequirements affect:\n\n* Project direction  \n* Business operations  \n* Development priorities\n\n\"Incorrect requirements can misdirect the entire SDLC, so final validation must remain human-controlled.\""
              },
              {
                "id": "q-6-1-group-1-item-4",
                "question": "What decisions still require BAs?",
                "answer": "BAs still handle:\n\n* Requirement approval  \n* Stakeholder negotiation  \n* Business prioritization  \n* Clarification decisions  \n* Workflow validation  \n* Conflict resolution\n\n\"The framework assists operational tasks while humans maintain strategic and business control.\""
              }
            ]
          },
          {
            "id": "q-6-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-6-1-group-2-item-1",
                "question": "What governance role does the BA play?",
                "answer": "The BA acts as:\n\n* Validator  \n* Decision-maker  \n* Workflow supervisor  \n* Stakeholder representative\n\nThe BA ensures:\n\n* Requirements align with business goals  \n* Outputs are correct  \n* Assumptions are validated  \n* AI outputs are safe and usable\n\n\"The BA governs how AI-generated artifacts are operationally used.\""
              },
              {
                "id": "q-6-1-group-2-item-2",
                "question": "How does the BA validate outputs?",
                "answer": "The BA reviews:\n\n* Requirement clarity  \n* Business correctness  \n* Missing details  \n* Acceptance criteria  \n* Stakeholder alignment\n\nValidation includes:\n\n* Refinement  \n* Correction  \n* Approval  \n* Requirement confirmation\n\n\"AI-generated outputs are treated as assistive drafts, not final authoritative artifacts.\""
              },
              {
                "id": "q-6-1-group-2-item-3",
                "question": "How does the framework prevent unsafe outputs?",
                "answer": "The framework introduces:\n\n* Ethical validation  \n* Traceability checks  \n* Ambiguity refinement  \n* Human approval layers\n\nUnsafe outputs such as:\n\n* Hallucinated assumptions  \n* Biased wording  \n* Missing constraints  \n  are flagged before finalization.\n\n\"Human oversight acts as the final governance checkpoint.\""
              },
              {
                "id": "q-6-1-group-2-item-4",
                "question": "How does this framework reduce BA's workload?",
                "answer": "The framework reduces:\n\n* Repetitive drafting  \n* Documentation overhead  \n* Manual refinement work  \n* Traceability maintenance effort  \n* Requirement summarization effort\n\nThis allows BAs to focus more on:\n\n* Stakeholder interaction  \n* Decision-making  \n* Requirement validation\n\n\"The framework reduces operational burden while preserving human expertise.\""
              },
              {
                "id": "q-6-1-group-2-item-5",
                "question": "How does this manage output consistency regardless of BA experience levels?",
                "answer": "The framework standardizes:\n\n* Prompting workflows  \n* Requirement refinement  \n* Artifact generation  \n* Validation processes\n\nThis helps:\n\n* Junior BAs produce more structured outputs  \n* Maintain workflow consistency  \n* Reduce dependency on individual prompting skill\n\n\"The framework operationalizes best practices into structured workflows.\""
              },
              {
                "id": "q-6-1-group-2-item-6",
                "question": "How are hallucinations handled?",
                "answer": "Hallucinations are handled through:\n\n* Clarification cycles  \n* Traceability mechanisms  \n* Human review  \n* Validation checkpoints\n\nThe framework attempts to:\n\n* Detect missing information  \n* Flag assumptions  \n* Request clarification before finalization\n\n\"Human governance is critical because AI can still generate incorrect or fabricated information.\""
              },
              {
                "id": "q-6-1-group-2-item-7",
                "question": "What responsibilities remain human-controlled?",
                "answer": "Humans remain responsible for:\n\n* Final requirement approval  \n* Stakeholder communication  \n* Business interpretation  \n* Prioritization decisions  \n* Requirement validation  \n* Ethical accountability\n\n\"The framework supports AI-assisted workflows, but strategic responsibility remains human-controlled.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-7",
    "number": "7",
    "title": "AGILE & SME CONTEXT",
    "primary": [
      {
        "id": "q-7-1",
        "number": "7.1",
        "question": "Why is this useful for Agile teams?",
        "answer": "\"Agile environments involve continuously changing requirements, rapid sprint cycles, and ongoing stakeholder communication.\"\n\nThe framework helps Agile teams by:\n\n* Supporting iterative refinement  \n* Improving requirement clarity  \n* Maintaining traceability  \n* Reducing communication gaps  \n* Assisting sprint-level requirement management\n\n\"The framework acts as an intelligent support layer within Agile requirement workflows.\"",
        "groups": [
          {
            "id": "q-7-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-7-1-group-1-item-1",
                "question": "How does this integrate into Agile workflows?",
                "answer": "The framework integrates into:\n\n* Backlog refinement  \n* Sprint planning  \n* Requirement clarification  \n* User story refinement  \n* Acceptance criteria generation\n\nIt supports Agile processes without replacing them.\n\n\"The framework augments existing Agile workflows rather than introducing a completely new process.\""
              },
              {
                "id": "q-7-1-group-1-item-2",
                "question": "How does it help during sprint refinement?",
                "answer": "During sprint refinement, the framework helps:\n\n* Clarify vague requirements  \n* Refine user stories  \n* Generate acceptance criteria  \n* Identify missing details  \n* Maintain requirement consistency\n\n\"It supports faster and more structured refinement cycles.\""
              },
              {
                "id": "q-7-1-group-1-item-3",
                "question": "Can Agile teams already do this manually?",
                "answer": "\"Yes, Agile teams already perform these activities manually.\"\n\nHowever, manual workflows often create:\n\n* Repetitive effort  \n* Inconsistent documentation  \n* Traceability gaps  \n* Refinement delays\n\nThe framework helps standardize and accelerate these workflows operationally."
              },
              {
                "id": "q-7-1-group-1-item-4",
                "question": "How does it help changing requirements?",
                "answer": "The framework supports:\n\n* Iterative refinement  \n* Requirement updates  \n* Traceability tracking  \n* Sprint artifact consistency\n\nAs requirements evolve:\n\n* related artifacts can be refined systematically.\n\n\"This improves requirement adaptability in Agile environments.\""
              },
              {
                "id": "q-7-1-group-1-item-5",
                "question": "How does it align with the SME's context and practices?",
                "answer": "SMEs often use:\n\n* Lightweight Agile workflows  \n* Small teams  \n* Informal communication  \n* Rapid iterations\n\nThe framework is designed to be:\n\n* Lightweight  \n* Flexible  \n* Workflow-adaptive  \n* Operationally practical\n\n\"The goal is supporting Agile SMEs without introducing heavy process overhead.\""
              }
            ]
          },
          {
            "id": "q-7-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-7-1-group-2-item-1",
                "question": "How does the framework support iterative development?",
                "answer": "The framework supports iterative development through:\n\n* Continuous refinement  \n* Dynamic prompting  \n* Requirement updates  \n* Traceability management  \n* Sprint-level artifact evolution\n\n\"The framework evolves requirements incrementally alongside Agile sprint cycles.\""
              },
              {
                "id": "q-7-1-group-2-item-2",
                "question": "How are sprint artifacts updated?",
                "answer": "When requirements change:\n\n* User stories can be refined  \n* Acceptance criteria can be regenerated  \n* Related artifacts can be updated  \n* Traceability links can be maintained\n\n\"The framework helps maintain artifact consistency across iterative sprint changes.\""
              },
              {
                "id": "q-7-1-group-2-item-3",
                "question": "How does it improve BA-developer alignment?",
                "answer": "The framework improves alignment by:\n\n* Structuring requirements clearly  \n* Reducing ambiguities  \n* Maintaining consistent artifacts  \n* Supporting traceability  \n* Improving handover quality\n\n\"Clearer requirements reduce interpretation differences between BAs and developers.\""
              },
              {
                "id": "q-7-1-group-2-item-4",
                "question": "How does it help and increase the efficiency of BAs?",
                "answer": "The framework reduces:\n\n* Manual refinement effort  \n* Documentation repetition  \n* Traceability maintenance workload  \n* Requirement drafting overhead\n\nThis allows BAs to focus more on:\n\n* Stakeholder communication  \n* Validation  \n* Decision-making\n\n\"The framework improves operational efficiency rather than replacing BA expertise.\""
              },
              {
                "id": "q-7-1-group-2-item-5",
                "question": "How does it reduce rework?",
                "answer": "The framework reduces rework by:\n\n* Detecting ambiguities earlier  \n* Improving requirement clarity  \n* Supporting iterative validation  \n* Maintaining artifact consistency\n\n\"Better requirements early in SDLC reduce implementation corrections later.\""
              },
              {
                "id": "q-7-1-group-2-item-6",
                "question": "How does it reduce other project risks?",
                "answer": "The framework helps reduce:\n\n* Requirement misunderstandings  \n* Sprint misalignment  \n* Communication gaps  \n* Traceability loss  \n* Inconsistent documentation\n\nThis improves:\n\n* Workflow stability  \n* Requirement reliability  \n* Agile coordination"
              }
            ]
          }
        ]
      },
      {
        "id": "q-7-2",
        "number": "7.2",
        "question": "Why focus on SMEs?",
        "answer": "\"SMEs often operate with limited resources, smaller teams, and faster delivery expectations, making requirement mistakes more operationally costly.\"\n\nThe framework focuses on SMEs because they:\n\n* Need lightweight AI adoption  \n* Often lack structured BA tooling  \n* Face higher rework risk  \n* Require cost-effective workflow support\n\n\"The research aims to provide practical AI-assisted requirement support for resource-constrained software teams.\"",
        "groups": [
          {
            "id": "q-7-2-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-7-2-group-1-item-1",
                "question": "Why specifically Sri Lankan SMEs/SMEs?",
                "answer": "Sri Lankan SMEs represent:\n\n* Growing software development environments  \n* Resource-constrained Agile teams  \n* Increasing AI adoption interest  \n* Limited access to enterprise-grade AI systems\n\n\"They provide a practical and relevant context for evaluating lightweight AI-assisted workflows.\""
              },
              {
                "id": "q-7-2-group-1-item-2",
                "question": "What SME problems are you targeting?",
                "answer": "The research targets:\n\n* Requirement ambiguity  \n* Rework  \n* Communication gaps  \n* Inconsistent documentation  \n* Limited AI expertise  \n* Agile coordination difficulties\n\n\"These operational problems are more impactful in smaller teams with limited resources.\""
              },
              {
                "id": "q-7-2-group-1-item-3",
                "question": "Why would SMEs adopt this?",
                "answer": "The framework offers SMEs:\n\n* Lightweight workflow support  \n* Faster refinement processes  \n* Reduced documentation effort  \n* Improved requirement consistency  \n* Cost-effective AI assistance\n\n\"The framework aims to improve operational efficiency without requiring expensive infrastructure.\""
              },
              {
                "id": "q-7-2-group-1-item-4",
                "question": "How does this help resource-constrained teams?",
                "answer": "The framework helps by:\n\n* Reducing repetitive workload  \n* Supporting smaller BA teams  \n* Improving workflow consistency  \n* Assisting Agile coordination  \n* Reducing rework effort\n\n\"This is especially valuable when teams have limited time and personnel.\""
              },
              {
                "id": "q-7-2-group-1-item-5",
                "question": "How would this actually support SMEs?",
                "answer": "The framework supports SMEs through:\n\n* AI-assisted refinement  \n* Requirement standardization  \n* Traceability support  \n* Faster artifact generation  \n* Workflow consistency\n\n\"The goal is practical operational support rather than heavy enterprise process transformation.\""
              }
            ]
          },
          {
            "id": "q-7-2-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-7-2-group-2-item-1",
                "question": "How does the framework reduce operational overhead?",
                "answer": "The framework reduces:\n\n* Manual drafting effort  \n* Repeated refinement work  \n* Documentation maintenance  \n* Traceability management effort\n\nThis improves:\n\n* Workflow speed  \n* Requirement consistency  \n* Agile coordination efficiency"
              },
              {
                "id": "q-7-2-group-2-item-2",
                "question": "How does it support junior BAs?",
                "answer": "The framework helps junior BAs by:\n\n* Structuring workflows  \n* Standardizing prompting  \n* Supporting refinement  \n* Maintaining requirement consistency\n\n\"It operationalizes structured BA practices into guided workflows.\""
              },
              {
                "id": "q-7-2-group-2-item-3",
                "question": "How does it support senior BAs?",
                "answer": "For senior BAs, the framework helps reduce:\n\n* Operational repetition  \n* Documentation overhead  \n* Manual refinement workload\n\nThis allows them to focus more on:\n\n* Stakeholder negotiation  \n* Strategic decisions  \n* Business analysis activities"
              },
              {
                "id": "q-7-2-group-2-item-4",
                "question": "How does it standardize workflows while aligning with the SME's context?",
                "answer": "The framework standardizes:\n\n* Requirement refinement  \n* Artifact generation  \n* Validation workflows  \n* Traceability management\n\nAt the same time, it remains:\n\n* Configurable  \n* Workflow-adaptive  \n* Template-aware\n\n\"This balance supports consistency without forcing rigid enterprise-style processes.\""
              },
              {
                "id": "q-7-2-group-2-item-5",
                "question": "How is this cost-effective?",
                "answer": "The framework is designed as:\n\n* Lightweight  \n* API-based  \n* Scalable  \n* Operationally practical\n\nIt avoids:\n\n* Expensive infrastructure  \n* Custom model training  \n* Complex enterprise deployments\n\n\"The research focuses on practical AI adoption for smaller software teams.\""
              },
              {
                "id": "q-7-2-group-2-item-6",
                "question": "What benefits can SMEs guarantee from adopting this?",
                "answer": "Potential benefits include:\n\n* Improved requirement clarity  \n* Reduced rework  \n* Faster refinement cycles  \n* Better Agile coordination  \n* Reduced documentation overhead  \n* More consistent workflows\n\n\"The framework aims to improve operational efficiency and requirement reliability in SME software environments.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-8",
    "number": "8",
    "title": "RESEARCH METHODOLOGY",
    "primary": [
      {
        "id": "q-8-1",
        "number": "8.1",
        "question": "What research methodology are you using?",
        "answer": "\"The research uses a mixed-method approach combining Design Science prototype development with empirical evaluation.\"\n\nThe methodology includes:\n\n* Framework design  \n* Prototype implementation  \n* Quantitative evaluation  \n* Qualitative feedback analysis\n\n\"This allows both technical validation and practical workflow evaluation.\"",
        "groups": [
          {
            "id": "q-8-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-8-1-group-1-item-1",
                "question": "Why use a mixed-method approach?",
                "answer": "\"The research evaluates both technical performance and human workflow impact.\"\n\nQuantitative methods help measure:\n\n* Efficiency  \n* Clarity  \n* Traceability  \n* Rework reduction\n\nQualitative methods help evaluate:\n\n* User experience  \n* Trust  \n* Workflow usability  \n* Adoption readiness\n\n\"Both technical and human perspectives are important in AI-assisted BA workflows.\""
              },
              {
                "id": "q-8-1-group-1-item-2",
                "question": "Why combine prototype development with empirical evaluation?",
                "answer": "The prototype demonstrates:\n\n* Technical feasibility  \n* Workflow orchestration  \n* AI-assisted refinement\n\nEmpirical evaluation validates:\n\n* Real-world usefulness  \n* Workflow effectiveness  \n* User acceptance\n\n\"The research evaluates both system functionality and practical operational impact.\""
              },
              {
                "id": "q-8-1-group-1-item-3",
                "question": "Why is Design Science suitable here?",
                "answer": "\"Design Science is suitable because the research focuses on designing and evaluating a practical artifact.\"\n\nThe artifact includes:\n\n* Middleware orchestration  \n* Adaptive prompting workflows  \n* Human-in-the-loop governance  \n* Requirement refinement mechanisms\n\n\"The goal is not only analysis, but building and validating a solution.\""
              },
              {
                "id": "q-8-1-group-1-item-4",
                "question": "Why include qualitative evaluation?",
                "answer": "Qualitative evaluation helps understand:\n\n* BA perceptions  \n* Workflow usability  \n* Adoption barriers  \n* Trust in AI outputs  \n* Practical Agile integration\n\n\"Human feedback is important because the framework directly affects operational BA workflows.\""
              }
            ]
          },
          {
            "id": "q-8-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-8-1-group-2-item-1",
                "question": "What are the phases of your methodology?",
                "answer": "Main phases include:\n\n1. Literature review  \n2. Problem analysis  \n3. Framework design  \n4. Prototype development  \n5. Data collection  \n6. Experimental evaluation  \n7. Quantitative and qualitative analysis\n\n\"The methodology combines iterative development with structured evaluation.\""
              },
              {
                "id": "q-8-1-group-2-item-2",
                "question": "How will data collection happen?",
                "answer": "Data collection will include:\n\n* BA interviews  \n* Surveys  \n* Requirement artifacts  \n* Controlled evaluation tasks  \n* Beta testing feedback\n\nData may come from:\n\n* SMEs  \n* Simulated projects  \n* Controlled experimental environments"
              },
              {
                "id": "q-8-1-group-2-item-3",
                "question": "How will interviews be conducted?",
                "answer": "Interviews will be:\n\n* Semi-structured  \n* Focused on BA workflows  \n* Focused on Agile requirement challenges  \n* Focused on AI adoption perspectives\n\nThe goal is to understand:\n\n* Real operational problems  \n* Workflow pain points  \n* Practical usability concerns"
              },
              {
                "id": "q-8-1-group-2-item-4",
                "question": "How will artifacts be collected?",
                "answer": "Artifacts may include:\n\n* User stories  \n* Acceptance criteria  \n* Requirement summaries  \n* Sprint refinement documents  \n* Change requests\n\nWhere necessary:\n\n* Simulated datasets  \n* Anonymized examples  \n  will be used.\n\n\"Sensitive organizational data will be anonymized and handled ethically.\""
              },
              {
                "id": "q-8-1-group-2-item-5",
                "question": "How will the prototype be iteratively refined?",
                "answer": "The prototype will be refined through:\n\n* Pilot testing  \n* BA feedback  \n* Controlled evaluations  \n* Workflow observations  \n* Experimental findings\n\n\"The framework evolves iteratively based on evaluation feedback and operational testing.\""
              }
            ]
          }
        ]
      },
      {
        "id": "q-8-2",
        "number": "8.2",
        "question": "Why is mixed-method suitable?",
        "answer": "\"The research evaluates both measurable workflow improvements and human operational experience.\"\n\nAI-assisted BA workflows involve:\n\n* Technical performance  \n* Human interaction  \n* Organizational usability  \n* Workflow adoption\n\n\"A mixed-method approach captures both quantitative and qualitative dimensions.\"",
        "groups": [
          {
            "id": "q-8-2-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-8-2-group-1-item-1",
                "question": "Why not purely quantitative or experimental?",
                "answer": "Purely quantitative evaluation may measure:\n\n* Speed  \n* Clarity  \n* Artifact quality\n\nBut it may miss:\n\n* User trust  \n* Workflow usability  \n* Adoption challenges  \n* Human operational experience\n\n\"This research involves both technical systems and human-centered workflows.\""
              },
              {
                "id": "q-8-2-group-1-item-2",
                "question": "Why include human feedback?",
                "answer": "Human feedback helps evaluate:\n\n* Practical usability  \n* Workflow integration  \n* BA acceptance  \n* Real-world operational value\n\n\"The framework is designed for human-AI collaboration, so human evaluation is essential.\""
              },
              {
                "id": "q-8-2-group-1-item-3",
                "question": "Why include BA interviews?",
                "answer": "BA interviews help identify:\n\n* Real workflow challenges  \n* Requirement engineering pain points  \n* Agile coordination issues  \n* AI adoption barriers\n\n\"The interviews ground the research in real operational BA environments.\""
              }
            ]
          },
          {
            "id": "q-8-2-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-8-2-group-2-item-1",
                "question": "How does qualitative feedback improve validity?",
                "answer": "Qualitative feedback helps validate:\n\n* Whether improvements are practically meaningful  \n* Whether workflows are usable  \n* Whether outputs are trusted  \n* Whether the framework fits Agile practices\n\n\"It helps connect technical evaluation with real operational usefulness.\""
              },
              {
                "id": "q-8-2-group-2-item-2",
                "question": "How do interviews support evaluation?",
                "answer": "Interviews support evaluation by:\n\n* Identifying workflow problems  \n* Validating practical relevance  \n* Revealing adoption concerns  \n* Providing contextual understanding\n\n\"They help evaluate how the framework performs in realistic BA environments.\""
              },
              {
                "id": "q-8-2-group-2-item-3",
                "question": "Why are SMEs appropriate evaluation environments?",
                "answer": "SMEs are appropriate because they:\n\n* Operate with limited resources  \n* Use lightweight Agile workflows  \n* Experience higher impact from requirement mistakes  \n* Need practical and cost-effective AI adoption\n\n\"SMEs provide realistic environments for evaluating lightweight AI-assisted workflow systems.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-9",
    "number": "9",
    "title": "EXPERIMENTAL DESIGN",
    "primary": [
      {
        "id": "q-9-1",
        "number": "9.1",
        "question": "How will you test the framework?",
        "answer": "\"The framework will be tested using a combination of controlled A/B testing and beta testing in realistic BA workflow scenarios.\"\n\nThe evaluation focuses on:\n\n* Requirement quality  \n* Workflow efficiency  \n* Requirement clarity  \n* Traceability  \n* User experience  \n* Operational usability\n\n\"This allows both controlled comparison and practical real-world evaluation.\"",
        "groups": [
          {
            "id": "q-9-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-9-1-group-1-item-1",
                "question": "What tasks will participants perform?",
                "answer": "Participants may perform:\n\n* Requirement elicitation  \n* User story generation  \n* Acceptance criteria refinement  \n* Sprint artifact refinement  \n* Requirement clarification tasks\n\nThe tasks simulate:\n\n* Real Agile BA workflows  \n* Stakeholder-driven requirement scenarios"
              },
              {
                "id": "q-9-1-group-1-item-2",
                "question": "How will comparisons be made?",
                "answer": "Comparisons will be made between:\n\n* Traditional BA workflows  \n  and  \n* Framework-assisted workflows\n\nEvaluation compares:\n\n* Artifact quality  \n* Requirement clarity  \n* Time efficiency  \n* Consistency  \n* Rework indicators\n\n\"The goal is measuring workflow impact rather than raw AI capability.\""
              },
              {
                "id": "q-9-1-group-1-item-3",
                "question": "What is your beta testing approach?",
                "answer": "Beta testing focuses on:\n\n* Realistic workflow usage  \n* BA feedback  \n* Usability evaluation  \n* Practical Agile integration\n\nParticipants use the framework in:\n\n* Controlled project simulations  \n  or  \n* SME-oriented workflow scenarios\n\n\"Beta testing evaluates practical operational usefulness.\""
              },
              {
                "id": "q-9-1-group-1-item-4",
                "question": "What is your A/B testing approach?",
                "answer": "The A/B testing compares:\n\n* Traditional workflows  \n  vs  \n* Framework-assisted workflows\n\nGroup A:\n\n* Manual workflows  \n* Generic AI usage if needed  \n* No orchestration support\n\nGroup B:\n\n* Uses the proposed framework  \n* Adaptive prompting  \n* Structured refinement  \n* Governance layers\n\n\"The comparison evaluates whether orchestration improves workflow outcomes.\""
              },
              {
                "id": "q-9-1-group-1-item-5",
                "question": "How do those approaches affect the evaluation criteria?",
                "answer": "A/B testing mainly evaluates:\n\n* Measurable workflow improvements  \n* Artifact quality  \n* Efficiency metrics\n\nBeta testing mainly evaluates:\n\n* Practical usability  \n* Adoption readiness  \n* User experience  \n* Workflow integration\n\n\"Together they provide both technical and operational evaluation perspectives.\""
              }
            ]
          },
          {
            "id": "q-9-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-9-1-group-2-item-1",
                "question": "How will the control group work for A/B testing?",
                "answer": "The control group will:\n\n* Use traditional BA workflows  \n* Perform manual refinement  \n* Optionally use generic AI tools directly  \n* Operate without orchestration support\n\nThis creates a baseline for comparison."
              },
              {
                "id": "q-9-1-group-2-item-2",
                "question": "How will the A/B testing groups work with and without this framework?",
                "answer": "### Group A — Traditional Workflow\n\n* Manual requirement handling  \n* Generic prompting if needed  \n* No orchestration framework\n\n### Group B — Proposed Framework\n\n* Adaptive prompting  \n* Workflow orchestration  \n* Traceability support  \n* Ethical validation  \n* Human-in-the-loop governance\n\n\"The comparison measures the operational impact of structured orchestration.\""
              },
              {
                "id": "q-9-1-group-2-item-3",
                "question": "What artifacts will be evaluated?",
                "answer": "Artifacts may include:\n\n* User stories  \n* Acceptance criteria  \n* Requirement summaries  \n* Sprint refinement outputs  \n* Traceability mappings  \n* Clarification artifacts\n\nEvaluation focuses on:\n\n* Clarity  \n* Completeness  \n* Consistency  \n* Testability"
              },
              {
                "id": "q-9-1-group-2-item-4",
                "question": "How will fairness between groups be ensured?",
                "answer": "Fairness will be maintained through:\n\n* Similar project scenarios  \n* Comparable task complexity  \n* Controlled evaluation conditions  \n* Standardized instructions\n\n\"Both groups will work under similar workflow constraints.\""
              },
              {
                "id": "q-9-1-group-2-item-5",
                "question": "How will experimental bias be minimized?",
                "answer": "Bias will be minimized through:\n\n* Standardized tasks  \n* Controlled datasets  \n* Structured evaluation rubrics  \n* Multiple participant perspectives  \n* Consistent testing environments\n\nWhere possible:\n\n* Evaluators may assess artifacts independently."
              },
              {
                "id": "q-9-1-group-2-item-6",
                "question": "How will both beta testing and controlled A/B testing be collectively evaluated?",
                "answer": "A/B testing provides:\n\n* Quantitative workflow comparison\n\nBeta testing provides:\n\n* Qualitative operational feedback\n\nThe combined evaluation helps assess:\n\n* Technical effectiveness  \n* Workflow practicality  \n* User acceptance  \n* Real-world usability\n\n\"The evaluation balances measurable performance with operational relevance.\""
              }
            ]
          }
        ]
      },
      {
        "id": "q-9-2",
        "number": "9.2",
        "question": "What is your A/B testing structure?",
        "answer": "The A/B testing structure compares:\n\n* Traditional BA workflows  \n  with  \n* Framework-assisted workflows\n\nThe goal is evaluating whether structured orchestration improves:\n\n* Requirement quality  \n* Workflow consistency  \n* Refinement efficiency  \n* Agile coordination\n\n\n# Group A — Traditional Workflow\n\n## Structure\n\nParticipants use:\n\n* Manual BA workflows  \n* Traditional refinement methods  \n* Generic AI usage if desired  \n* No orchestration framework\n\nThis represents:\n\n\"Current common workflow practices.\"\n\n\n# Group B — Proposed Framework\n\n## Structure\n\nParticipants use:\n\n* Adaptive prompting  \n* Workflow orchestration  \n* Ethical validation  \n* Traceability support  \n* Human-in-the-loop refinement\n\nThis represents:\n\n\"The proposed AI-assisted orchestration methodology.\"",
        "groups": [
          {
            "id": "q-9-2-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-9-2-group-1-item-1",
                "question": "How will participants be selected?",
                "answer": "Participants may include:\n\n* Business Analysts  \n* Junior analysts  \n* Agile practitioners  \n* Software engineering participants with BA exposure\n\nSelection focuses on:\n\n* Relevant workflow familiarity  \n* Agile requirement experience"
              },
              {
                "id": "q-9-2-group-1-item-2",
                "question": "How many participants?",
                "answer": "The exact number depends on:\n\n* Resource availability  \n* Evaluation scope  \n* Time constraints\n\nThe goal is obtaining:\n\n* Sufficient comparative workflow data  \n* Meaningful qualitative feedback\n\n\"The focus is controlled evaluation quality rather than very large-scale sampling.\""
              },
              {
                "id": "q-9-2-group-1-item-3",
                "question": "How long will testing run?",
                "answer": "Testing duration depends on:\n\n* Workflow complexity  \n* Number of scenarios  \n* Iterative refinement cycles\n\nThe evaluation will include:\n\n* Multiple workflow iterations  \n* Controlled refinement sessions  \n* Beta feedback phases"
              },
              {
                "id": "q-9-2-group-1-item-4",
                "question": "What project scenarios will be used?",
                "answer": "Scenarios may include:\n\n* Agile sprint refinement  \n* Requirement clarification  \n* User story generation  \n* SME-oriented software projects  \n* Changing stakeholder requirements\n\n\"The scenarios aim to simulate realistic BA workflow environments.\""
              }
            ]
          }
        ]
      },
      {
        "id": "q-9-3",
        "number": "9.3",
        "question": "What is your beta testing structure?",
        "answer": "The beta testing structure focuses on:\n\n* Realistic operational usage  \n* Practical workflow integration  \n* User-centered evaluation\n\nParticipants interact with the framework in:\n\n* Simulated Agile projects  \n  or  \n* Controlled SME-oriented environments\n\n\n## Beta Testing Focus Areas\n\nThe beta testing evaluates:\n\n* Workflow usability  \n* Requirement refinement experience  \n* Practical efficiency  \n* BA satisfaction  \n* AI trust and acceptance  \n* Agile workflow compatibility\n\n\n## Beta Testing Process\n\nThe beta testing process includes:\n\n1. Framework onboarding  \n2. Task execution  \n3. Requirement refinement activities  \n4. Artifact generation  \n5. User feedback collection  \n6. Workflow observations  \n7. Iterative refinement feedback\n\n\n## Why Beta Testing is Important\n\n\"A technically functional system may still fail operationally if users find it impractical or disruptive.\"\n\nBeta testing helps evaluate:\n\n* Real-world practicality  \n* Human-AI collaboration quality  \n* Adoption readiness  \n* SME workflow compatibility\n\n\"It validates whether the framework is operationally usable beyond controlled experiments.\"",
        "groups": []
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-10",
    "number": "10",
    "title": "EVALUATION METRICS",
    "primary": [
      {
        "id": "q-10-1",
        "number": "10.1",
        "question": "How will you evaluate success?",
        "answer": "\"The framework will be evaluated using both quantitative and qualitative metrics to measure workflow effectiveness, requirement quality, and operational usability.\"\n\nEvaluation focuses on:\n\n* Requirement clarity  \n* Workflow efficiency  \n* Traceability  \n* Rework reduction  \n* BA usability  \n* AI trust and adoption\n\n\"The goal is evaluating both measurable improvements and practical workflow impact.\"",
        "groups": [
          {
            "id": "q-10-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-10-1-group-1-item-1",
                "question": "What metrics are being measured?",
                "answer": "Main evaluation metrics include:\n\n* Requirement clarity  \n* Artifact completeness  \n* Time efficiency  \n* Traceability consistency  \n* Rework reduction  \n* Workflow usability  \n* BA satisfaction  \n* AI trust levels"
              },
              {
                "id": "q-10-1-group-1-item-2",
                "question": "How will clarity be evaluated?",
                "answer": "Clarity will be evaluated based on:\n\n* Ambiguity reduction  \n* Requirement specificity  \n* Requirement completeness  \n* Developer interpretability\n\nArtifacts may be reviewed using:\n\n* Structured evaluation rubrics  \n* Comparative scoring methods\n\n\"The evaluation focuses on how understandable and implementation-ready the requirements are.\""
              },
              {
                "id": "q-10-1-group-1-item-3",
                "question": "How will efficiency improvements be measured?",
                "answer": "Efficiency improvements may be measured through:\n\n* Time-on-task reduction  \n* Faster refinement cycles  \n* Reduced manual documentation effort  \n* Reduced clarification iterations\n\n\"The goal is evaluating operational workflow improvement.\""
              },
              {
                "id": "q-10-1-group-1-item-4",
                "question": "How will ethical improvements be measured?",
                "answer": "Ethical evaluation may include:\n\n* Bias identification frequency  \n* Transparency indicators  \n* Assumption detection  \n* Requirement accountability checks\n\nThe framework evaluates whether:\n\n* Outputs remain transparent  \n* Stakeholder intent is preserved  \n* Unsafe assumptions are reduced"
              }
            ]
          },
          {
            "id": "q-10-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-10-1-group-2-item-1",
                "question": "What is the requirement quality rubric?",
                "answer": "The requirement quality rubric may evaluate:\n\n* Clarity  \n* Completeness  \n* Consistency  \n* Traceability  \n* Testability  \n* Ambiguity level\n\nArtifacts are assessed against:\n\n* Structured evaluation criteria  \n* Agile requirement quality standards"
              },
              {
                "id": "q-10-1-group-2-item-2",
                "question": "How will transparency be scored?",
                "answer": "Transparency evaluation may consider:\n\n* Explicit assumptions  \n* Requirement traceability  \n* Explanation visibility  \n* Clarification coverage\n\n\"The framework encourages visible refinement and explainable requirement generation.\""
              },
              {
                "id": "q-10-1-group-2-item-3",
                "question": "How will bias reduction be measured?",
                "answer": "Bias reduction may be measured through:\n\n* Detection of biased wording  \n* Identification of unsafe assumptions  \n* Ethical review observations  \n* Human validation feedback\n\n\"The ethics layer helps identify potentially problematic requirement interpretations.\""
              },
              {
                "id": "q-10-1-group-2-item-4",
                "question": "How will traceability be evaluated?",
                "answer": "Traceability evaluation focuses on:\n\n* Requirement linkage consistency  \n* Artifact relationship maintenance  \n* Requirement origin tracking  \n* Change tracking capability\n\n\"The framework aims to maintain consistent requirement relationships across Agile iterations.\""
              },
              {
                "id": "q-10-1-group-2-item-5",
                "question": "How will rework reduction be measured?",
                "answer": "Rework reduction may be evaluated through:\n\n* Number of clarification cycles  \n* Requirement correction frequency  \n* Sprint-level modification rates  \n* Artifact revision frequency\n\n\"Improved early-stage requirement quality should reduce downstream corrections.\""
              },
              {
                "id": "q-10-1-group-2-item-6",
                "question": "How will other aspects of the project be measured?",
                "answer": "Additional aspects may include:\n\n* Workflow usability  \n* BA trust in outputs  \n* Adoption willingness  \n* Operational practicality  \n* Agile integration quality\n\n\"The evaluation considers both technical and human operational factors.\""
              }
            ]
          }
        ]
      },
      {
        "id": "q-10-2",
        "number": "10.2",
        "question": "Quantitative Metrics",
        "answer": "Quantitative metrics focus on measurable workflow improvements.\n\n\n## Likely Metrics\n\n### Time-on-task reduction\n\nMeasures:\n\n* Requirement handling speed  \n* Refinement efficiency  \n* Documentation effort reduction\n\n\n### Requirement clarity score\n\nMeasures:\n\n* Ambiguity reduction  \n* Specificity  \n* Developer interpretability\n\n\n### Acceptance criteria completeness\n\nMeasures:\n\n* Coverage quality  \n* Validation readiness  \n* Requirement completeness\n\n\n### Number of refinement iterations\n\nMeasures:\n\n* Clarification efficiency  \n* Requirement stabilization speed\n\n\n### Traceability completeness\n\nMeasures:\n\n* Requirement linkage quality  \n* Artifact consistency  \n* Change tracking coverage\n\n\n### Bias flag counts\n\nMeasures:\n\n* Ethical issue detection  \n* Unsafe assumption identification\n\n\n### Sprint rework reduction\n\nMeasures:\n\n* Requirement-related corrections  \n* Post-refinement modifications  \n* Sprint-level requirement issues",
        "groups": []
      },
      {
        "id": "q-10-3",
        "number": "10.3",
        "question": "Qualitative Metrics",
        "answer": "Qualitative metrics evaluate:\n\n* Human experience  \n* Workflow usability  \n* Operational acceptance\n\n\n## Likely Metrics\n\n### BA satisfaction\n\nEvaluates:\n\n* Workflow experience  \n* Practical usefulness  \n* Operational comfort\n\n\n### Trust in AI outputs\n\nEvaluates:\n\n* Confidence in generated artifacts  \n* Perceived reliability  \n* Validation confidence\n\n\n### Adoption willingness\n\nEvaluates:\n\n* Whether BAs would practically use the framework  \n* SME adoption readiness\n\n\n### Perceived usefulness\n\nEvaluates:\n\n* Operational value  \n* Workflow support quality  \n* Requirement assistance effectiveness\n\n\n### Workflow usability\n\nEvaluates:\n\n* Ease of integration  \n* Workflow smoothness  \n* Operational practicality\n\n\n### Interview thematic analysis\n\nEvaluates:\n\n* Common workflow pain points  \n* User concerns  \n* Adoption barriers  \n* AI collaboration perceptions\n\n\"Qualitative analysis helps understand real operational experiences beyond numerical metrics.\"",
        "groups": []
      },
      {
        "id": "q-10-4",
        "number": "10.4",
        "question": "Explain your entire evaluation metrics process?",
        "answer": "\"The evaluation combines controlled measurement with practical workflow feedback.\"\n\nThe process includes:\n\n### Step 1 — Controlled A/B Testing\n\nCompare:\n\n* Traditional workflows  \n  vs  \n* Framework-assisted workflows\n\nMeasure:\n\n* Clarity  \n* Efficiency  \n* Traceability  \n* Rework indicators\n\n\n### Step 2 — Artifact Evaluation\n\nEvaluate:\n\n* User stories  \n* Acceptance criteria  \n* Requirement summaries  \n* Sprint artifacts\n\nUsing:\n\n* Structured requirement quality rubrics\n\n\n### Step 3 — Beta Testing\n\nCollect:\n\n* BA feedback  \n* Workflow usability insights  \n* Practical adoption observations\n\n\n### Step 4 — Qualitative Evaluation\n\nConduct:\n\n* Interviews  \n* Surveys  \n* Thematic analysis\n\nEvaluate:\n\n* Trust  \n* Workflow usability  \n* AI adoption perspectives\n\n\n### Step 5 — Comparative Analysis\n\nAnalyze:\n\n* Workflow differences  \n* Improvement patterns  \n* Operational effectiveness  \n* Human-AI collaboration quality\n\n\"The evaluation process measures both technical workflow improvement and practical operational usability.\"",
        "groups": []
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-11",
    "number": "11",
    "title": "VALIDATION & REAL-WORLD TESTING",
    "primary": [
      {
        "id": "q-11-1",
        "number": "11.1",
        "question": "How will you validate real-world applicability?",
        "answer": "\"The framework will be validated through controlled A/B testing, realistic Agile project scenarios, and beta testing with workflow-oriented participants.\"\n\nThe validation focuses on:\n\n* Practical usability  \n* Workflow integration  \n* Requirement quality  \n* Operational feasibility  \n* SME applicability\n\n\"The goal is evaluating whether the framework works effectively in realistic BA environments, not only in theory.\"",
        "groups": [
          {
            "id": "q-11-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-11-1-group-1-item-1",
                "question": "Will this be tested in actual projects?",
                "answer": "\"Where possible, realistic project scenarios and SME-oriented workflows will be used.\"\n\nDue to:\n\n* Time limitations  \n* Confidentiality concerns  \n* Research scope constraints\n\nSome evaluations may use:\n\n* Simulated Agile projects  \n* Controlled workflow environments  \n* Anonymized requirement datasets\n\n\"The focus is maintaining realistic operational conditions while ensuring controlled evaluation.\""
              },
              {
                "id": "q-11-1-group-1-item-2",
                "question": "How realistic will the test cases be?",
                "answer": "Test cases will simulate:\n\n* Agile sprint refinement  \n* Requirement clarification  \n* User story generation  \n* Stakeholder-driven requirement changes\n\nThe scenarios are designed to reflect:\n\n* Real BA workflows  \n* SME operational practices  \n* Practical Agile environments"
              },
              {
                "id": "q-11-1-group-1-item-3",
                "question": "How will beta testing occur?",
                "answer": "Beta testing will involve:\n\n* Framework usage in realistic workflows  \n* Requirement refinement tasks  \n* Artifact generation activities  \n* Feedback collection sessions\n\nParticipants will evaluate:\n\n* Workflow usability  \n* Practical usefulness  \n* AI-assisted refinement experience\n\n\"Beta testing focuses on operational usability rather than only technical performance.\""
              },
              {
                "id": "q-11-1-group-1-item-4",
                "question": "Will BAs participate in beta testing?",
                "answer": "Yes, where possible:\n\n* Business Analysts  \n* Agile practitioners  \n* Participants with BA-related experience  \n  may participate.\n\nTheir feedback helps evaluate:\n\n* Workflow practicality  \n* Requirement usability  \n* Human-AI collaboration quality"
              },
              {
                "id": "q-11-1-group-1-item-5",
                "question": "Why did A/B testing happen in our own controlled group?",
                "answer": "\"Controlled A/B testing helps maintain evaluation fairness, consistency, and comparable workflow conditions.\"\n\nA controlled environment allows:\n\n* Standardized tasks  \n* Comparable project complexity  \n* Consistent measurement conditions  \n* Reduced external variability\n\n\"The purpose is obtaining reliable comparative workflow data.\""
              }
            ]
          },
          {
            "id": "q-11-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-11-1-group-2-item-1",
                "question": "What is the closed-system A/B testing setup?",
                "answer": "The closed-system setup means:\n\n* Participants work within controlled project scenarios  \n* Workflow conditions are standardized  \n* Tasks are predefined  \n* Evaluation criteria remain consistent\n\nThis helps:\n\n* Reduce uncontrolled external variables  \n* Maintain fair comparisons  \n* Improve evaluation reliability"
              },
              {
                "id": "q-11-1-group-2-item-2",
                "question": "How will confidentiality be handled?",
                "answer": "Confidentiality will be maintained through:\n\n* Controlled datasets  \n* Anonymized artifacts  \n* Restricted participant access  \n* Ethical handling of project-related data\n\nWhere necessary:\n\n* Simulated requirement data  \n  will be used instead of sensitive organizational information."
              },
              {
                "id": "q-11-1-group-2-item-3",
                "question": "How will anonymization occur?",
                "answer": "Anonymization may include removing:\n\n* Company names  \n* Stakeholder identities  \n* Sensitive business information  \n* Project-specific confidential details\n\n\"The evaluation focuses on workflow behavior rather than organizational identity.\""
              },
              {
                "id": "q-11-1-group-2-item-4",
                "question": "How will participant bias be controlled?",
                "answer": "Bias will be minimized through:\n\n* Standardized instructions  \n* Similar task complexity  \n* Structured evaluation rubrics  \n* Controlled workflow environments\n\nWhere possible:\n\n* Multiple evaluators  \n* Comparative scoring  \n  may be used."
              },
              {
                "id": "q-11-1-group-2-item-5",
                "question": "How will beta testing results be evaluated?",
                "answer": "Beta testing results will be evaluated using:\n\n* User feedback  \n* Surveys  \n* Workflow observations  \n* Qualitative interviews  \n* Usability assessments\n\nEvaluation focuses on:\n\n* Workflow practicality  \n* BA satisfaction  \n* AI trust  \n* Adoption readiness  \n* Operational usefulness\n\n\"The beta testing evaluates whether the framework is practically usable in realistic BA workflows.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-12",
    "number": "12",
    "title": "COMPUTER SCIENCE CONTRIBUTION",
    "primary": [
      {
        "id": "q-12-1",
        "number": "12.1",
        "question": "What is the CS contribution?",
        "answer": "\"The Computer Science contribution is the design and evaluation of a human-governed AI orchestration framework specialized for requirements engineering workflows.\"\n\nThe contribution includes:\n\n* Workflow orchestration  \n* Adaptive prompting  \n* Human-AI collaboration  \n* AI governance mechanisms  \n* Ethical validation workflows\n\n\"The research focuses on operationalizing generative AI systematically within software engineering processes.\"",
        "groups": [
          {
            "id": "q-12-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-12-1-group-1-item-1",
                "question": "Is this really a Computer Science research?",
                "answer": "Yes.\n\nThe research involves:\n\n* Software architecture  \n* Human-AI interaction  \n* Intelligent workflow systems  \n* AI orchestration  \n* Software engineering processes\n\n\"The contribution is not business-focused alone; it focuses on how AI systems are structured, governed, and operationalized within software engineering workflows.\""
              },
              {
                "id": "q-12-1-group-1-item-2",
                "question": "What architectural contribution exists?",
                "answer": "The architectural contribution includes:\n\n* Middleware orchestration  \n* Modular workflow layers  \n* Adaptive prompt pipelines  \n* Validation mechanisms  \n* Human-in-the-loop governance architecture\n\n\"The framework structures how AI participates operationally within BA workflows.\""
              },
              {
                "id": "q-12-1-group-1-item-3",
                "question": "What novelty exists technically?",
                "answer": "Technical novelty includes:\n\n* Adaptive orchestration workflows  \n* Context-aware prompting  \n* BA-specific workflow alignment  \n* Ethical validation integration  \n* Traceability-aware AI interaction\n\n\"The novelty lies in combining AI orchestration with structured requirements engineering workflows.\""
              },
              {
                "id": "q-12-1-group-1-item-4",
                "question": "How is this research expected to contribute in the CS domain?",
                "answer": "The research contributes to:\n\n* Software Engineering  \n* Human-Computer Interaction  \n* Intelligent Systems  \n* AI Governance  \n* Workflow Automation\n\nIt explores:\n\n\"How generative AI can be systematically integrated into operational software engineering processes.\""
              },
              {
                "id": "q-12-1-group-1-item-5",
                "question": "What are other domains which benefit from this research and how?",
                "answer": "The orchestration approach may also support:\n\n* Project management  \n* Legal requirement workflows  \n* Healthcare documentation  \n* Compliance systems  \n* Customer support workflows\n\nBecause many domains require:\n\n* Structured refinement  \n* Human validation  \n* Workflow governance  \n* AI-assisted documentation\n\n\"The orchestration principles may generalize beyond Business Analysis.\""
              }
            ]
          },
          {
            "id": "q-12-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-12-1-group-2-item-1",
                "question": "What are adaptive orchestration workflows?",
                "answer": "Adaptive orchestration workflows dynamically adjust:\n\n* Prompt behavior  \n* Validation stages  \n* Refinement logic  \n* Workflow sequencing\n\nBased on:\n\n* Requirement context  \n* Ambiguity level  \n* Workflow stage  \n* Artifact type\n\n\"The framework adapts AI interaction according to workflow conditions.\""
              },
              {
                "id": "q-12-1-group-2-item-2",
                "question": "What is the Human-AI interaction framework?",
                "answer": "The Human-AI interaction framework defines:\n\n* How humans supervise AI  \n* How AI assists workflows  \n* How validation occurs  \n* How governance is maintained\n\nThe model emphasizes:\n\n* Collaboration  \n* Oversight  \n* Controlled automation\n\n\"The framework supports augmentation rather than autonomous replacement.\""
              },
              {
                "id": "q-12-1-group-2-item-3",
                "question": "What is the AI governance methodology?",
                "answer": "The AI governance methodology includes:\n\n* Human validation  \n* Ethical review  \n* Traceability mechanisms  \n* Workflow controls  \n* Structured refinement processes\n\nIts purpose is ensuring:\n\n* Responsible AI usage  \n* Operational reliability  \n* Controlled AI decision support"
              },
              {
                "id": "q-12-1-group-2-item-4",
                "question": "What is workflow-aware prompt engineering?",
                "answer": "Workflow-aware prompting means:\n\n\"Prompts are generated according to workflow context rather than static user input.\"\n\nThe framework adjusts prompts based on:\n\n* Requirement state  \n* Missing details  \n* Ambiguity detection  \n* Artifact type  \n* Workflow progression\n\n\"The prompts become operationally guided rather than manually improvised.\""
              },
              {
                "id": "q-12-1-group-2-item-5",
                "question": "What are ethical validation pipelines?",
                "answer": "Ethical validation pipelines are structured mechanisms that check:\n\n* Bias  \n* Unsafe assumptions  \n* Missing stakeholder representation  \n* Transparency issues  \n* Requirement inconsistencies\n\nThe pipeline supports:\n\n* Responsible AI usage  \n* Safer requirement generation  \n* Human-governed validation\n\n\"The ethical layer acts as a governance checkpoint before outputs are operationally used.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-13",
    "number": "13",
    "title": "LIMITATIONS & RISKS",
    "primary": [
      {
        "id": "q-13-1",
        "number": "13.1",
        "question": "What are the limitations?",
        "answer": "\"Like any AI-assisted system, the framework has limitations related to AI reliability, user adoption, and dependency on input quality.\"\n\nKey limitations include:\n\n* Possible hallucinations  \n* Incorrect outputs  \n* Dependency on stakeholder input quality  \n* Organizational adoption resistance  \n* Limited real-world data access\n\n\"The framework reduces these risks through governance and human validation, but cannot eliminate them completely.\"",
        "groups": [
          {
            "id": "q-13-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-13-1-group-1-item-1",
                "question": "What if the AI still hallucinates?",
                "answer": "\"Hallucinations remain a known limitation of generative AI systems.\"\n\nThe framework attempts to reduce hallucinations through:\n\n* Clarification workflows  \n* Traceability checks  \n* Validation stages  \n* Human-in-the-loop review\n\n\"Final approval remains human-controlled to prevent unsafe requirement adoption.\""
              },
              {
                "id": "q-13-1-group-1-item-2",
                "question": "What if outputs are still incorrect?",
                "answer": "Incorrect outputs are handled through:\n\n* Iterative refinement  \n* BA validation  \n* Stakeholder clarification  \n* Requirement review mechanisms\n\n\"The framework treats AI outputs as assistive drafts rather than authoritative final decisions.\""
              },
              {
                "id": "q-13-1-group-1-item-3",
                "question": "What if BAs reject adoption?",
                "answer": "Adoption resistance is possible if:\n\n* Workflows feel disruptive  \n* Trust in AI is low  \n* Teams prefer manual practices\n\nThat is why the framework is designed to:\n\n* Support existing Agile workflows  \n* Remain lightweight  \n* Preserve human control  \n* Augment rather than replace BAs\n\n\"The goal is operational assistance, not workflow replacement.\""
              },
              {
                "id": "q-13-1-group-1-item-4",
                "question": "What if data access is limited?",
                "answer": "If real organizational data is limited:\n\n* Simulated datasets  \n* Synthetic Agile scenarios  \n* Anonymized requirement artifacts  \n  may be used.\n\n\"The evaluation focuses on workflow behavior while maintaining ethical and confidentiality considerations.\""
              }
            ]
          },
          {
            "id": "q-13-1-group-2",
            "title": "Deep Clarification Questions",
            "questions": [
              {
                "id": "q-13-1-group-2-item-1",
                "question": "How does human review mitigate risks?",
                "answer": "Human review helps mitigate:\n\n* Hallucinations  \n* Incorrect assumptions  \n* Requirement inconsistencies  \n* Unsafe outputs  \n* Business misinterpretations\n\nThe BA validates:\n\n* Requirement correctness  \n* Business alignment  \n* Workflow suitability\n\n\"Human governance acts as the final operational checkpoint.\""
              },
              {
                "id": "q-13-1-group-2-item-2",
                "question": "How will synthetic datasets help?",
                "answer": "Synthetic datasets help:\n\n* Simulate realistic Agile workflows  \n* Avoid confidentiality risks  \n* Standardize testing conditions  \n* Support controlled evaluations\n\nThey allow:\n\n* Repeatable experiments  \n* Consistent comparisons  \n* Ethical testing environments"
              },
              {
                "id": "q-13-1-group-2-item-3",
                "question": "What if Agile teams resist adoption?",
                "answer": "The framework is designed to:\n\n* Integrate with existing workflows  \n* Avoid heavy process overhead  \n* Support lightweight Agile practices\n\nThe goal is:\n\n* Gradual augmentation  \n* Not forced workflow transformation\n\n\"Adoption depends on whether the framework provides practical operational value.\""
              },
              {
                "id": "q-13-1-group-2-item-4",
                "question": "How does this address other limitation factors?",
                "answer": "The framework addresses limitations through:\n\n* Human-in-the-loop governance  \n* Ethical validation  \n* Structured refinement  \n* Adaptive orchestration  \n* Traceability mechanisms\n\nHowever:\n\n\"The research acknowledges that AI-assisted workflows still require continuous human oversight and organizational adaptation.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-14",
    "number": "14",
    "title": "FUTURE DIRECTIONS",
    "primary": [
      {
        "id": "q-14-1",
        "number": "14.1",
        "question": "What future extensions exist?",
        "answer": "\"The framework is designed as a scalable foundation that can evolve into more advanced AI-assisted software engineering workflows.\"\n\nPossible future extensions include:\n\n* Multi-agent collaboration  \n* Enterprise workflow integration  \n* Advanced traceability automation  \n* Fine-tuned BA-oriented models  \n* Third-party Agile platform integrations\n\n\"The current research focuses on establishing the orchestration and governance foundation.\"",
        "groups": [
          {
            "id": "q-14-1-group-1",
            "title": "Follow-Up Questions",
            "questions": [
              {
                "id": "q-14-1-group-1-item-1",
                "question": "Multi-agent collaboration?",
                "answer": "Future versions may support:\n\n* Specialized AI agents  \n* Collaborative workflow pipelines  \n* Distributed refinement tasks\n\nExample agents:\n\n* Requirement refinement agent  \n* Traceability agent  \n* Ethical validation agent  \n* Sprint coordination agent\n\n\"Multi-agent orchestration could improve workflow specialization and scalability.\""
              },
              {
                "id": "q-14-1-group-1-item-2",
                "question": "Fine-tuned BA models?",
                "answer": "Future research may explore:\n\n* Domain-specific fine-tuning  \n* BA-oriented requirement datasets  \n* SME-specific refinement models\n\nThis could improve:\n\n* Requirement understanding  \n* Workflow consistency  \n* Domain-specific refinement quality\n\n\"The current research focuses on orchestration rather than custom model training.\""
              },
              {
                "id": "q-14-1-group-1-item-3",
                "question": "Fully automated requirement traceability?",
                "answer": "Future extensions may support:\n\n* Automated requirement linkage  \n* Real-time impact analysis  \n* Cross-artifact synchronization  \n* Sprint-level traceability automation\n\nHowever:\n\n\"Human governance would still remain important for validation and approval.\""
              },
              {
                "id": "q-14-1-group-1-item-4",
                "question": "Third-party integrations?",
                "answer": "Potential integrations may include:\n\n* Jira  \n* Confluence  \n* Azure DevOps  \n* Slack  \n* Agile management platforms\n\nThis would help:\n\n* Workflow synchronization  \n* Artifact management  \n* Sprint coordination\n\n\"The framework could evolve into a practical Agile ecosystem support layer.\""
              },
              {
                "id": "q-14-1-group-1-item-5",
                "question": "Enterprise-level customizations and workflow support?",
                "answer": "Future enterprise support may include:\n\n* Organization-specific templates  \n* Custom governance policies  \n* Department-level workflows  \n* Compliance-aware refinement pipelines  \n* Enterprise traceability management\n\n\"The orchestration framework could be adapted for larger and more complex software engineering environments.\""
              }
            ]
          }
        ]
      }
    ],
    "counterarguments": false
  },
  {
    "id": "section-15",
    "number": "15",
    "title": "OBVIOUS COUNTERARGUMENTS",
    "primary": [
      {
        "id": "q-15-1",
        "number": "15.1",
        "question": "\"This is just wrapping ChatGPT/Gemini etc.\"",
        "answer": "\"No. The research is not about simple AI access. It focuses on structured orchestration, workflow governance, adaptive refinement, and operationalizing AI specifically for Business Analysis workflows.\"\n\n\"The contribution lies in how AI is systematically guided and integrated into requirements engineering processes.\"",
        "groups": []
      },
      {
        "id": "q-15-2",
        "number": "15.2",
        "question": "\"Experienced BAs already do this.\"",
        "answer": "\"Experienced BAs already perform requirement engineering effectively. The framework is intended to augment operational consistency, reduce repetitive workload, and support scalable Agile coordination.\"\n\nEven experienced BAs still deal with:\n\n* Refinement overhead  \n* Documentation maintenance  \n* Traceability management  \n* Rapid Agile changes\n\n\"The framework supports workflow efficiency rather than replacing expertise.\"",
        "groups": []
      },
      {
        "id": "q-15-3",
        "number": "15.3",
        "question": "\"Prompt engineering alone is not research.\"",
        "answer": "\"The research is not limited to prompt engineering.\"\n\nThe contribution includes:\n\n* Workflow orchestration  \n* Human-AI interaction design  \n* Governance mechanisms  \n* Adaptive refinement workflows  \n* Ethical validation pipelines\n\n\"Prompting is only one component of the orchestration architecture.\"",
        "groups": []
      },
      {
        "id": "q-15-4",
        "number": "15.4",
        "question": "\"AI tools already exist.\"",
        "answer": "\"Existing AI tools are mostly general-purpose or developer-focused.\"\n\nMost tools:\n\n* Assist coding workflows  \n* Do not specialize in BA processes  \n* Lack structured requirement governance  \n* Do not operationalize Agile requirement refinement\n\n\"This research focuses specifically on requirements engineering orchestration.\"",
        "groups": []
      },
      {
        "id": "q-15-5",
        "number": "15.5",
        "question": "\"Why not just use winning-style prompting?\"",
        "answer": "\"Manual prompting still depends heavily on individual experience, context handling, and workflow consistency.\"\n\nThe framework introduces:\n\n* Structured orchestration  \n* Dynamic refinement  \n* Validation mechanisms  \n* Traceability support  \n* Workflow standardization\n\n\"The goal is transforming ad hoc prompting into a systematic operational workflow.\"",
        "groups": []
      },
      {
        "id": "q-15-6",
        "number": "15.6",
        "question": "\"Where is the novelty?\"",
        "answer": "The novelty comes from combining:\n\n* Adaptive orchestration  \n* BA-specific workflow support  \n* Human-in-the-loop governance  \n* Ethical validation  \n* Traceability-aware refinement\n\n\"The research focuses on operationalizing generative AI within requirements engineering rather than generic AI usage.\"",
        "groups": []
      },
      {
        "id": "q-15-7",
        "number": "15.7",
        "question": "\"Why is human-in-the-loop needed?\"",
        "answer": "\"Requirements engineering involves business judgment, stakeholder interpretation, and contextual decision-making that AI cannot fully validate independently.\"\n\nHuman involvement is needed for:\n\n* Validation  \n* Approval  \n* Prioritization  \n* Stakeholder alignment  \n* Accountability\n\n\"The framework augments workflows while preserving human governance.\"",
        "groups": []
      },
      {
        "id": "q-15-8",
        "number": "15.8",
        "question": "\"How is this similar to the Cursor/Copilot/Claude Code/Claude Design/Codex like technological milestones?\"",
        "answer": "\"Those systems are not merely raw LLMs — they are orchestration frameworks built around LLMs.\"\n\nThey improve usability through:\n\n* Context management  \n* Workflow guidance  \n* Operational specialization  \n* Structured interaction\n\nSimilarly:\n\n\"My research applies orchestration principles to Business Analysis and requirements engineering workflows.\"",
        "groups": []
      },
      {
        "id": "q-15-9",
        "number": "15.9",
        "question": "\"How do you prove actual improvement?\"",
        "answer": "The framework will be evaluated through:\n\n* Controlled A/B testing  \n* Artifact quality analysis  \n* Workflow efficiency metrics  \n* Beta testing  \n* Qualitative BA feedback\n\nMetrics include:\n\n* Requirement clarity  \n* Traceability quality  \n* Rework reduction  \n* Workflow usability\n\n\"The evaluation measures both technical and operational improvements.\"",
        "groups": []
      },
      {
        "id": "q-15-10",
        "number": "15.10",
        "question": "\"What if the framework creates dependency on AI?\"",
        "answer": "\"The framework is designed around augmentation rather than replacement.\"\n\nHumans still remain responsible for:\n\n* Requirement approval  \n* Validation  \n* Business interpretation  \n* Stakeholder communication\n\n\"The goal is reducing repetitive workload while preserving critical human decision-making.\"",
        "groups": []
      },
      {
        "id": "q-15-11",
        "number": "15.11",
        "question": "\"What exactly is your research contribution?\"",
        "answer": "\"The research contribution is a human-governed orchestration framework that operationalizes generative AI for Business Analysis workflows through adaptive refinement, governance, traceability, and Agile-oriented requirement support.\"",
        "groups": []
      },
      {
        "id": "q-15-12",
        "number": "15.12",
        "question": "\"What makes this publishable research?\"",
        "answer": "The research contributes to:\n\n* Software Engineering  \n* Human-AI Interaction  \n* AI Governance  \n* Workflow Orchestration  \n* Intelligent Requirement Engineering\n\nIt combines:\n\n* Technical architecture  \n* Human-centered evaluation  \n* Workflow experimentation  \n* AI-assisted operational processes\n\n\"The research explores how generative AI can be systematically integrated into software engineering workflows.\"",
        "groups": []
      },
      {
        "id": "q-15-13",
        "number": "15.13",
        "question": "\"Are you creating a new methodology or just a tool?\"",
        "answer": "\"The research proposes both a workflow methodology and a supporting orchestration framework.\"\n\nThe contribution is not only software implementation, but also:\n\n* Structured AI-assisted workflows  \n* Governance mechanisms  \n* Operational orchestration strategies\n\n\"The framework operationalizes the methodology technically.\"",
        "groups": []
      },
      {
        "id": "q-15-14",
        "number": "15.14",
        "question": "\"What problem exists here that current advanced AI tools like ChatGPT/Gemini/Claude etc. cannot solve?\"",
        "answer": "Current LLMs provide:\n\n* Raw intelligence  \n* General-purpose language generation\n\nBut they do not inherently provide:\n\n* Workflow governance  \n* Requirement traceability  \n* Structured refinement  \n* Agile workflow orchestration  \n* Human validation pipelines\n\n\"The research addresses the gap between raw AI capability and operational software engineering workflows.\"",
        "groups": []
      },
      {
        "id": "q-15-15",
        "number": "15.15",
        "question": "\"Why should this be considered as research?\"",
        "answer": "\"The research investigates how generative AI can be systematically governed, orchestrated, and operationalized within requirements engineering workflows.\"\n\nIt includes:\n\n* Framework design  \n* Experimental evaluation  \n* Workflow analysis  \n* Human-AI interaction  \n* AI governance mechanisms\n\n\"The contribution extends beyond implementation into workflow methodology, orchestration architecture, and operational AI integration within Software Engineering.\"",
        "groups": []
      }
    ],
    "counterarguments": true
  }
];
