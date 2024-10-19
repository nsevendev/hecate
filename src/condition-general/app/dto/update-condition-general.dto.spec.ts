import { UpdateConditionGeneralDto } from './update-condition-general.dto'

describe('UpdateConditionGeneralDto', () => {
  it('UpdateConditionGeneralDto : est defini ', () => {
    expect(new UpdateConditionGeneralDto()).toBeDefined()
  })

  it('UpdateConditionGeneralDto : les proprietés sont defini sans definir activate', () => {
    const updateConditionGeneralDto = new UpdateConditionGeneralDto()
    updateConditionGeneralDto.title = 'Titre'
    updateConditionGeneralDto.intro = 'Petit intro'

    expect(updateConditionGeneralDto.title).toBeDefined()
    expect(updateConditionGeneralDto.intro).toBeDefined()
    expect(updateConditionGeneralDto.activate).toBe(false)
  })

  it('UpdateConditionGeneralDto : les proprietés sont defini sans definir activate', () => {
    const updateConditionGeneralDto = new UpdateConditionGeneralDto()
    updateConditionGeneralDto.title = 'Titre'
    updateConditionGeneralDto.intro = 'Petit intro'
    updateConditionGeneralDto.activate = true

    expect(updateConditionGeneralDto.title).toBeDefined()
    expect(updateConditionGeneralDto.intro).toBeDefined()
    expect(updateConditionGeneralDto.activate).toBe(true)
  })
})
