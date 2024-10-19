import { ConditionGeneral } from './condition-general.entity'

describe('ConditionGeneral', () => {
  it('ConditionGeneral : est defini', () => {
    expect(new ConditionGeneral()).toBeDefined()
  })

  it("ConditionGeneral : creation de l'objet condition general et test les valeurs sans activate", () => {
    const cg = new ConditionGeneral()
    cg.title = 'titre'
    cg.intro = 'intro'

    expect(cg.title).toBe('titre')
    expect(cg.intro).toBe('intro')
  })

  it("ConditionGeneral : creation de l'objet condition general et test les valeurs avec activate", () => {
    const cg = new ConditionGeneral()
    cg.title = 'titre'
    cg.intro = 'intro'
    cg.activate = true

    expect(cg.title).toBe('titre')
    expect(cg.intro).toBe('intro')
    expect(cg.activate).toBe(true)
  })
})
