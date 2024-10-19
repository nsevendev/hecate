import { ConditionGeneral } from './condition-general.entity'

describe('ConditionGeneral', () => {
  it('ConditionGeneral : est defini', () => {
    expect(new ConditionGeneral()).toBeDefined()
  })

  it("ConditionGeneral : creation de l'objet condition general et test les valeurs", () => {
    const cg = new ConditionGeneral()
    cg.title = 'titre'
    cg.intro = 'intro'

    expect(cg.title).toBe('titre')
    expect(cg.intro).toBe('intro')
  })
})
