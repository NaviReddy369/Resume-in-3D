import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'
import { CaseStudyBlock } from '@/components/caseStudy/CaseStudyBlock'
import { gnkContinuum as product } from '@/data/productDetails/gnkContinuum'
import { sections } from '@/data/sections'

const productsMeta = sections.find((section) => section.id === 'products')!

export default function GnkContinuumCaseStudy() {
  return (
    <CaseStudyLayout moduleId={product.moduleId} label={product.label} hue={productsMeta.hue}>
      <p className="kicker">{product.kicker}</p>
      <h1 className="display-heading">{product.title}</h1>
      <p className="body-copy">{product.summary}</p>
      <a className="secondary-action" href={product.url} target="_blank" rel="noreferrer">
        Visit live site →
      </a>

      <CaseStudyBlock heading="Problem">
        <p className="body-copy">{product.caseStudy.problem}</p>
      </CaseStudyBlock>

      <CaseStudyBlock heading="Constraints">
        <ul className="bullet-list">
          {product.caseStudy.constraints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CaseStudyBlock>

      <CaseStudyBlock heading="Decisions">
        <ul className="bullet-list">
          {product.caseStudy.decisions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CaseStudyBlock>

      <CaseStudyBlock heading="Architecture">
        <p className="body-copy">{product.caseStudy.architecture}</p>
      </CaseStudyBlock>

      <CaseStudyBlock heading="Outcome">
        <p className="body-copy">{product.caseStudy.outcome}</p>
      </CaseStudyBlock>
    </CaseStudyLayout>
  )
}
