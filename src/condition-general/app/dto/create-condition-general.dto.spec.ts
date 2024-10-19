import { CreateConditionGeneralDto } from './create-condition-general.dto'

describe('CreateConditionGeneralDto', () => {
  it('CreateConditionGeneralDto : est defini ', () => {
    expect(new CreateConditionGeneralDto()).toBeDefined()
  })

  it('CreateConditionGeneralDto : les proprietés sont defini sans definir activate', () => {
    const createConditionGeneralDto = new CreateConditionGeneralDto()
    createConditionGeneralDto.title = 'Titre'
    createConditionGeneralDto.intro = 'Petit intro'

    expect(createConditionGeneralDto.title).toBeDefined()
    expect(createConditionGeneralDto.intro).toBeDefined()
    expect(createConditionGeneralDto.activate).toBe(false)
  })

  it('CreateConditionGeneralDto : les proprietés sont defini sans definir activate', () => {
    const createConditionGeneralDto = new CreateConditionGeneralDto()
    createConditionGeneralDto.title = 'Titre'
    createConditionGeneralDto.intro = 'Petit intro'
    createConditionGeneralDto.activate = true

    expect(createConditionGeneralDto.title).toBeDefined()
    expect(createConditionGeneralDto.intro).toBeDefined()
    expect(createConditionGeneralDto.activate).toBe(true)
  })
})
