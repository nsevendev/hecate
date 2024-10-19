import { ArticleCg } from './article-cg.entity'

describe('ArticleCg', () => {
  it('ArtcileCg : est defini', () => {
    expect(new ArticleCg()).toBeDefined()
  })

  it("ArtcileCg : creation d'objet article cg et test des valeurs", () => {
    const cg = new ArticleCg()
    cg.title = 'titre'
    cg.description = 'desc'

    expect(cg.title).toBe('titre')
    expect(cg.description).toBe('desc')
  })
})
