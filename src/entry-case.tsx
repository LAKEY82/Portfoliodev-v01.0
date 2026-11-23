import { mount } from './client.tsx'
import { caseStudies } from './data/case-studies.ts'
import CaseStudyPage from './pages/CaseStudyPage.tsx'

// One entry for every case-study page; each work/*.html sets <body data-case="slug">.
const slug = document.body.dataset.case ?? ''
const study = caseStudies[slug]
if (!study) throw new Error(`Unknown case study "${slug}"`)

mount(<CaseStudyPage study={study} />)
